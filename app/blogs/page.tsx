import Image from "next/image";
import Link from "next/link";
import type { Article } from "../data/sampleArticles";
import { sampleArticles } from "../data/sampleArticles";

const PAGE_SIZE = 100; // 一覧は最大100件までまとめて取得

async function fetchArticles(page: number): Promise<Article[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  try {
    const res = await fetch(
      `${baseUrl}/api/microcms?per_page=${PAGE_SIZE}&page=${page}`,
      { cache: "no-store" },
    );
    if (!res.ok) return sampleArticles;
    const data = await res.json();
    if (Array.isArray(data.articles)) {
      return data.articles as Article[];
    }
    return sampleArticles;
  } catch (error) {
    console.error("Failed to fetch microCMS articles", error);
    return sampleArticles;
  }
}

export default async function Blogs({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Math.max(Number(searchParams?.page) || 1, 1);
  const articles = await fetchArticles(currentPage);
  const hasMore = articles.length === PAGE_SIZE;

  return (
    <main className="min-h-screen bg-base-200">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">ブログ一覧</h1>
          <p className="text-sm text-base-content/70">
            microCMS から取得した記事を表示しています。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((item) => (
            <div key={item.url || item.id} className="card w-full bg-base-100 shadow-xl">
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
                  <Link href={`/blogs/${item.id}`} className="btn btn-primary">
                    記事を読む
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <Link href={`/blogs?page=${currentPage + 1}`} className="btn btn-outline">
              次のページ
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
