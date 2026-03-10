/**
 * Pre-build script: Reads all MDX articles, compiles to HTML,
 * and generates a JSON index for runtime use on Cloudflare Workers.
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

  const result = await unified()
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
    .process(processed);

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

        // Compile MDX/markdown to HTML at build time
        const html = await compileMarkdown(content);

        result[locale].push({
          title: data.title || "",
          slug,
          category,
          level: data.level || "beginner",
          date: data.date || "",
          updated: data.updated || null,
          author: data.author || "Claude Lab",
          description: data.description || "",
          tags: data.tags || [],
          premium: data.premium || false,
          featured: data.featured || false,
          content: html,
        });
      }
    }

    // Sort: by creation date (newest on top).
    // Within the same date, featured articles come first,
    // then by updated time.
    result[locale].sort((a, b) => {
      const aDate = a.date || "";
      const bDate = b.date || "";
      if (aDate !== bDate) return aDate > bDate ? -1 : 1;
      // Same creation date: featured articles come first
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      // Same creation date & featured: sort by updated time (most recent first)
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

      const html = await compileMarkdown(content);

      result[locale].push({
        title: data.title || "",
        slug,
        date: data.date || "",
        author: data.author || "Claude Lab",
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
