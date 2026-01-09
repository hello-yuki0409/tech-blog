import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import type { Article } from "./data/sampleArticles";
import { sampleArticles } from "./data/sampleArticles";

const PAGE_SIZE = 6;

// サーバー側で Qiita 記事を取得（失敗時はサンプルにフォールバック）
async function fetchArticles(): Promise<Article[]> {
  const headerList = await headers();
  const host =
    headerList.get("x-forwarded-host") || headerList.get("host") || "";
  const proto = headerList.get("x-forwarded-proto") || "http";
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : host
        ? `${proto}://${host}`
        : "http://localhost:3000");

  try {
    const res = await fetch(
      `${baseUrl}/api/qiita?per_page=${PAGE_SIZE}&page=1`,
      { cache: "no-store" },
    );
    if (!res.ok) return sampleArticles;
    const data = await res.json();
    if (Array.isArray(data)) {
      return data as Article[];
    }
    return sampleArticles;
  } catch (error) {
    console.error("Failed to fetch Qiita articles", error);
    return sampleArticles;
  }
}

export default async function Home() {
  const articles = await fetchArticles();
  const hasMore = articles.length === PAGE_SIZE;

  return (
    <main className="min-h-screen bg-base-200">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Qiita 記事一覧</h1>
          <p className="text-sm text-base-content/70">
            Qiita API から取得した記事を DaisyUI のカードで表示しています。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((item) => (
            <div
              key={item.id ?? item.url}
              className="card w-full bg-base-100 shadow-xl hover:cursor-pointer"
            >
              <figure>
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={600}
                  height={300}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title line-clamp-2">{item.title}</h2>
                <p className="text-sm text-base-content/70">
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <div className="card-actions justify-end">
                  <Link
                    href={item.url}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    記事を読む
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <Link href="/blogs" className="btn btn-outline">
              もっとみる
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
