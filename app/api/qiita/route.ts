import { NextResponse } from "next/server";

type QiitaItem = {
  title: string;
  url: string;
  created_at: string;
};

const API_URL =
  "https://qiita.com/api/v2/authenticated_user/items?page=1&per_page=4";

// Qiita のサムネイルは API で取れないので固定の画像を使う
const FALLBACK_THUMBNAIL =
  "https://cdn.qiita.com/assets/public/article-ogp-background-9f5428127621718a910c8b63951390ad.png";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.QIITA_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "QIITA_TOKEN is not set on the server" },
      { status: 500 },
    );
  }

  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `Qiita API error: ${res.status}` },
      { status: 500 },
    );
  }

  const items = (await res.json()) as QiitaItem[];

  const articles = items.slice(0, 4).map((item) => ({
    title: item.title,
    date: item.created_at,
    url: item.url,
    thumbnail: FALLBACK_THUMBNAIL,
  }));

  return NextResponse.json(articles);
}
