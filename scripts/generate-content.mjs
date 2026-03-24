/**
 * Pre-build script: Reads all MDX articles, compiles to HTML,
 * and generates a JSON index for runtime use on Cloudflare Workers.
 *
 * Performance note: The unified processor is created ONCE at module
 * level and reused for all articles to avoid re-initializing shiki's
 * WASM highlighter on every file (which caused OOM on Cloudflare Pages).
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

const CONTENT_DIR = path.join(process.cwd(), "content");
const OUTPUT_DIR = path.join(process.cwd(), "src", "generated");

/**
 * Single shared processor — created once so shiki is initialized only once.
 * Calling .freeze() makes it safe to call .process() concurrently/repeatedly.
 */
const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypePrettyCode, {
    theme: {
      dark: "github-dark-dimmed",
      light: "github-light",
    },
    keepBackground: false,
  })
  .use(rehypeStringify)
  .freeze();

/**
 * Convert Callout syntax in MDX to HTML before markdown processing.
 * Transforms <Callout type="info"> ... </Callout> to styled HTML divs.
 */
function processCallouts(content) {
  const calloutIcons = {
    info: "ℹ️",
    warning: "⚠️",
    tip: "💡",
    danger: "🚨",
  };

  return content.replace(
    /<Callout\s+type="(\w+)">\s*([\s\S]*?)\s*<\/Callout>/g,
    (_, type, body) => {
      const icon = calloutIcons[type] || "ℹ️";
      return `<div class="callout callout-${type}"><span class="callout-icon">${icon}</span><div>${body.trim()}</div></div>`;
    }
  );
}

async function compileMarkdown(content) {
  // Process custom components first
  const processed = processCallouts(content);
  const result = await processor.process(processed);
  return String(result);
}

async function generateArticleIndex() {
  const locales = ["ja", "en"];
  const result = {};

  for (const locale of locales) {
    const articlesDir = path.join(CONTENT_DIR, "articles", locale);
    result[locale] = [];

    if (!fs.existsSync(articlesDir)) continue;

    const categories = fs.readdirSync(articlesDir);

    for (const category of categories) {
      const categoryDir = path.join(articlesDir, category);
      if (!fs.statSync(categoryDir).isDirectory()) continue;

      const files = fs
        .readdirSync(categoryDir)
        .filter((f) => f.endsWith(".mdx"));

      for (const file of files) {
        const filePath = path.join(categoryDir, file);
        const raw = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(raw);
        const slug = file.replace(/\.mdx$/, "");

        // Strip hardcoded "## 関連記事" / "## Related Articles" sections (RelatedArticles.tsx handles this dynamically)
        let cleanedContent = content;
        const relatedPattern = /\n---\s*\n+##\s*(関連記事|Related Articles)\s*\n[\s\S]*$/;
        if (relatedPattern.test(cleanedContent)) {
          console.warn(`  ⚠ AUTO-FIX: ${locale}/${category}/${file}: removed hardcoded related articles section (RelatedArticles.tsx handles this)`);
          cleanedContent = cleanedContent.replace(relatedPattern, '\n');
        }

        // Validate & auto-remove broken internal article links (links to non-existent articles cause 404)
        const internalLinkPattern = /\[([^\]]*)\]\(\/articles\/([^)#\s]+)\)/g;
        let linkMatch;
        while ((linkMatch = internalLinkPattern.exec(cleanedContent)) !== null) {
          const linkTarget = linkMatch[2].replace(/^(ja|en)\//, '');
          // linkTarget should be "category/slug" — check if that MDX file exists in any locale
          const jaPath = path.join(CONTENT_DIR, "articles", "ja", ...linkTarget.split('/')) + '.mdx';
          const enPath = path.join(CONTENT_DIR, "articles", "en", ...linkTarget.split('/')) + '.mdx';
          if (!fs.existsSync(jaPath) && !fs.existsSync(enPath)) {
            console.warn(`  ⚠ AUTO-FIX: ${locale}/${category}/${file}: removed broken link [${linkMatch[1]}](/articles/${linkMatch[2]}) — target article does not exist`);
            // Remove the entire markdown link, keeping only the link text
            cleanedContent = cleanedContent.replace(linkMatch[0], linkMatch[1]);
          }
        }

        // Compile MDX/markdown to HTML at build time
        const html = await compileMarkdown(cleanedContent);

        // Validate: warn if compiled HTML still has hardcoded locale-prefixed article links
        if (/href="\/articles\/(ja|en)\//.test(html)) {
          console.warn(`  ⚠ WARNING: ${locale}/${category}/${file}: hardcoded locale-prefixed article link found. Fix: use /articles/... (JA) or /en/articles/... (EN)`);
        }

        result[locale].push({
          title: data.title || "",
          slug,
          category,
          level: data.level || "beginner",
          date: data.date || "",
          updated: data.updated || null,
          author: data.author || "Rork Lab",
          description: data.description || "",
          tags: data.tags || [],
          premium: data.premium || false,
          content: html,
        });
      }
    }

    // Sort by creation date (newest on top), then by updated time
    result[locale].sort((a, b) => {
      const aDate = a.date || "";
      const bDate = b.date || "";
      if (aDate !== bDate) return aDate > bDate ? -1 : 1;
      // Same creation date: sort by updated time (most recent first)
      const aUpdated = a.updated || a.date || "";
      const bUpdated = b.updated || b.date || "";
      if (aUpdated !== bUpdated) return aUpdated > bUpdated ? -1 : 1;
      return a.title.localeCompare(b.title);
    });
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Write articles index
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "articles.json"),
    JSON.stringify(result, null, 2),
    "utf-8"
  );

  const totalArticles = Object.values(result).reduce(
    (sum, articles) => sum + articles.length,
    0
  );
  console.log(
    `✓ Generated article index: ${totalArticles} articles across ${locales.length} locales`
  );
}

async function generateBlogIndex() {
  const locales = ["ja", "en"];
  const result = {};

  for (const locale of locales) {
    const blogDir = path.join(CONTENT_DIR, "blog", locale);
    result[locale] = [];

    if (!fs.existsSync(blogDir)) continue;

    const files = fs
      .readdirSync(blogDir)
      .filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");

      // Strip hardcoded "## 関連記事" / "## Related Articles" sections (RelatedArticles.tsx handles this dynamically)
      let cleanedContent = content;
      const relatedPattern = /\n---\s*\n+##\s*(関連記事|Related Articles)\s*\n[\s\S]*$/;
      if (relatedPattern.test(cleanedContent)) {
        console.warn(`  ⚠ AUTO-FIX: ${locale}/${file}: removed hardcoded related articles section (RelatedArticles.tsx handles this)`);
        cleanedContent = cleanedContent.replace(relatedPattern, '\n');
      }

      const html = await compileMarkdown(cleanedContent);

      result[locale].push({
        title: data.title || "",
        slug,
        date: data.date || "",
        author: data.author || "Rork Lab",
        description: data.description || "",
        tags: data.tags || [],
        content: html,
      });
    }

    // Sort by creation date first (newest articles on top), then by updated time
    // within the same date. This prevents schedule-task updates on older articles
    // from pushing them above genuinely newer articles.
    result[locale].sort((a, b) => {
      const aDate = a.date || "";
      const bDate = b.date || "";
      if (aDate !== bDate) return aDate > bDate ? -1 : 1;
      // Same creation date: sort by updated time (most recent first)
      const aUpdated = a.updated || a.date || "";
      const bUpdated = b.updated || b.date || "";
      if (aUpdated !== bUpdated) return aUpdated > bUpdated ? -1 : 1;
      return a.title.localeCompare(b.title);
    });
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "blog.json"),
    JSON.stringify(result, null, 2),
    "utf-8"
  );

  const totalPosts = Object.values(result).reduce(
    (sum, posts) => sum + posts.length,
    0
  );
  console.log(
    `✓ Generated blog index: ${totalPosts} posts across ${locales.length} locales`
  );
}

async function main() {
  await generateArticleIndex();
  await generateBlogIndex();
}

main();
