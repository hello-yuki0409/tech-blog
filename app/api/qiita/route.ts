import { NextResponse } from "next/server";

type QiitaItem = {
  id: string;
  title: string;
  url: string;
  created_at: string;
};

// Qiita のサムネイルは API で取れないので固定の画像を使う
const FALLBACK_THUMBNAIL =
  "https://cdn.qiita.com/assets/public/article-ogp-background-9f5428127621718a910c8b63951390ad.png";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const perPageRaw = searchParams.get("per_page");
  const pageRaw = searchParams.get("page");

  // per_page は Qiita API の上限 100 に丸める
  const perPage = Math.min(Number(perPageRaw) || 4, 100);
  const page = Number(pageRaw) || 1;

  const token = process.env.QIITA_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "QIITA_TOKEN is not set on the server" },
      { status: 500 },
    );
  }

  const res = await fetch(
    `https://qiita.com/api/v2/authenticated_user/items?page=${page}&per_page=${perPage}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: `Qiita API error: ${res.status}` },
      { status: 500 },
    );
  }

  const items = (await res.json()) as QiitaItem[];

  const articles = items.slice(0, perPage).map((item) => ({
    id: item.id,
    title: item.title,
    date: item.created_at,
    url: item.url,
    thumbnail: FALLBACK_THUMBNAIL,
  }));

  return NextResponse.json(articles);
}
