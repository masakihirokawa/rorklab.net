import { NextRequest, NextResponse } from "next/server";

const SITE_NAME = "Rork Lab";
const SITE_URL = "https://rorklab.net";
const OG_IMAGE = `${SITE_URL}/og/default.png`;

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const format = request.nextUrl.searchParams.get("format") || "json";

  if (!url) {
    return NextResponse.json({ error: "url parameter is required" }, { status: 400 });
  }

  // Validate URL belongs to this site
  if (!url.startsWith(SITE_URL)) {
    return NextResponse.json({ error: "URL not supported" }, { status: 404 });
  }

  const oembedResponse = {
    version: "1.0",
    type: "link",
    title: SITE_NAME,
    author_name: "Masaki Hirokawa",
    author_url: "https://dolice.design",
    provider_name: SITE_NAME,
    provider_url: SITE_URL,
    thumbnail_url: OG_IMAGE,
    thumbnail_width: 1200,
    thumbnail_height: 1200,
    url: url,
    width: 800,
    height: 400,
  };

  if (format === "xml") {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<oembed>
  <version>1.0</version>
  <type>link</type>
  <title>${SITE_NAME}</title>
  <author_name>Masaki Hirokawa</author_name>
  <author_url>https://dolice.design</author_url>
  <provider_name>${SITE_NAME}</provider_name>
  <provider_url>${SITE_URL}</provider_url>
  <thumbnail_url>${OG_IMAGE}</thumbnail_url>
  <thumbnail_width>1200</thumbnail_width>
  <thumbnail_height>1200</thumbnail_height>
  <url>${url}</url>
  <width>800</width>
  <height>400</height>
</oembed>`;
    return new NextResponse(xml, {
      headers: { "Content-Type": "text/xml; charset=utf-8" },
    });
  }

  return NextResponse.json(oembedResponse, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
