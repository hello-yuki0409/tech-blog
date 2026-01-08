import Image from "next/image";
import Link from "next/link";
import type { Article } from "../data/sampleArticles";
import { sampleArticles } from "../data/sampleArticles";

const PAGE_SIZE = 100; // Qiita API の上限
const MAX_PAGES = 10; // 念のための上限（最大1000件）

async function fetchAllArticles(): Promise<Article[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const all: Article[] = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const res = await fetch(
      `${baseUrl}/api/qiita?per_page=${PAGE_SIZE}&page=${page}`,
      { cache: "no-store" },
    );
    if (!res.ok) {
      return sampleArticles;
    }
    const data = await res.json();
    if (!Array.isArray(data)) {
      return sampleArticles;
    }
    const batch = data as Article[];
    all.push(...batch);
    if (batch.length < PAGE_SIZE) {
      break;
    }
  }

  return all.length > 0 ? all : sampleArticles;
}

export default async function Blogs() {
  const articles = await fetchAllArticles();

  return (
    <main className="min-h-screen bg-base-200">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">ブログ一覧</h1>
          <p className="text-sm text-base-content/70">
            Qiita の全記事を一覧表示しています。
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
                  {item.id ? (
                    <Link href={`/blogs/${item.id}`} className="btn btn-primary">
                      記事を読む
                    </Link>
                  ) : (
                    <Link
                      href={item.url}
                      className="btn btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      記事を読む
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
