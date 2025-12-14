import Link from "next/link";
import type { Article } from "./data/sampleArticles";
import { sampleArticles } from "./data/sampleArticles";

const API_URL =
  "https://qiita.com/api/v2/authenticated_user/items?page=1&per_page=4";
const FALLBACK_THUMBNAIL =
  "https://cdn.qiita.com/assets/public/article-ogp-background-9f5428127621718a910c8b63951390ad.png";

type QiitaItem = {
  title: string;
  url: string;
  created_at: string;
};

async function fetchQiitaArticles(): Promise<Article[]> {
  const token = process.env.QIITA_TOKEN;
  if (!token) return sampleArticles;

  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) {
      return sampleArticles;
    }

    const items = (await res.json()) as QiitaItem[];
    return items.slice(0, 4).map((item) => ({
      title: item.title,
      date: item.created_at,
      url: item.url,
      thumbnail: FALLBACK_THUMBNAIL,
    }));
  } catch (error) {
    console.error("Failed to fetch Qiita articles", error);
    return sampleArticles;
  }
}

export default async function Home() {
  const articles = await fetchQiitaArticles();

  return (
    <main className="min-h-screen bg-base-200">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Qiita 記事一覧</h1>
          <p className="text-sm text-base-content/70">
            Qiita API から取得した記事（最大4件）を DaisyUI のカードで表示しています。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((item) => (
            <div key={item.url} className="card w-full bg-base-100 shadow-xl">
              <figure>
                <img
                  src={item.thumbnail}
                  alt={item.title}
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
      </div>
    </main>
  );
}
