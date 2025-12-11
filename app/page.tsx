import Link from "next/link";
import { sampleArticles } from "./data/sampleArticles";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-200">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Qiita サンプル記事</h1>
          <p className="text-sm text-base-content/70">
            DaisyUI の Card と Tailwind の grid で記事カードを並べたサンプルです。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sampleArticles.map((item) => (
            <div key={item.url} className="card w-full bg-base-100 shadow-xl">
              <figure>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p className="text-sm text-base-content/70">{item.date}</p>
                <div className="card-actions justify-end">
                  <Link href={item.url} className="btn btn-primary" target="_blank">
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
