/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Article } from "./data/sampleArticles";
import { useEffect, useState } from "react";
import { sampleArticles } from "./data/sampleArticles";

const PAGE_SIZE = 6;

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const load = async (nextPage: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/qiita?per_page=${PAGE_SIZE}&page=${nextPage}`,
        { cache: "no-store" },
      );
      if (!res.ok) {
        throw new Error("Failed to fetch Qiita articles");
      }
      const data = (await res.json()) as Article[];
      setArticles((prev) => [...prev, ...data]);
      setHasMore(data.length === PAGE_SIZE);
      setPage(nextPage);
    } catch (error) {
      console.error(error);
      // フォールバックとしてサンプルデータを表示する
      if (articles.length === 0) {
        setArticles(sampleArticles);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  };

  // サーバー側で取得して props で渡すより楽かな？
  useEffect(() => {
    load(1);
  }, []);

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
            <button
              className="btn btn-outline"
              onClick={() => load(page + 1)}
              disabled={loading}
            >
              {loading ? "読み込み中..." : "もっとみる"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
