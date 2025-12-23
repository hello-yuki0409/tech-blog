import { NextResponse } from "next/server";

const FALLBACK_THUMBNAIL =
  "https://cdn.qiita.com/assets/public/article-ogp-background-9f5428127621718a910c8b63951390ad.png";

export const dynamic = "force-dynamic";

type MicroCMSContent = {
  id: string;
  title?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  thumbnail?: { url?: string };
  eyecatch?: { url?: string };
};

export async function GET(req: Request) {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  const endpoint = process.env.MICROCMS_ENDPOINT || "blogs";

  if (!serviceDomain || !apiKey) {
    return NextResponse.json(
      { error: "MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY is not set" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("per_page")) || 10, 100);
  const page = Math.max(Number(searchParams.get("page")) || 1, 1);
  const offset = (page - 1) * limit;

  const url = `https://${serviceDomain}/api/v1/${endpoint}?limit=${limit}&offset=${offset}`;

  const res = await fetch(url, {
    headers: {
      "X-MICROCMS-API-KEY": apiKey,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `microCMS API error: ${res.status}` },
      { status: 500 },
    );
  }

  const data = await res.json();
  const contents: MicroCMSContent[] = Array.isArray(data.contents)
    ? data.contents
    : [];

  const articles = contents.map((item) => ({
    id: item.id,
    title: item.title ?? "(no title)",
    date:
      item.publishedAt ||
      item.updatedAt ||
      item.createdAt ||
      new Date().toISOString(),
    url: `/blogs/${item.id}`,
    thumbnail:
      item.thumbnail?.url || item.eyecatch?.url || FALLBACK_THUMBNAIL,
  }));

  return NextResponse.json({
    articles,
    totalCount: data.totalCount ?? articles.length,
  });
}
