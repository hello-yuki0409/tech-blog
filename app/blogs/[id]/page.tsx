import Image from "next/image";
import { notFound } from "next/navigation";

const FALLBACK_THUMBNAIL =
  "https://cdn.qiita.com/assets/public/article-ogp-background-9f5428127621718a910c8b63951390ad.png";

type QiitaDetail = {
  id: string;
  title?: string;
  rendered_body?: string;
  body?: string;
  created_at?: string;
  updated_at?: string;
  url?: string;
};

async function fetchQiitaArticle(id: string): Promise<QiitaDetail | null> {
  const token = process.env.QIITA_TOKEN;
  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const res = await fetch(`https://qiita.com/api/v2/items/${id}`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return (await res.json()) as QiitaDetail;
}

export default async function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const detail = await fetchQiitaArticle(params.id);

  if (!detail) {
    notFound();
  }

  const title = detail?.title ?? "(no title)";
  const date = detail?.created_at || detail?.updated_at || "";
  const html = detail?.rendered_body || detail?.body || "";

  return (
    <main className="min-h-screen bg-base-200">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-6">
          <p className="text-sm text-base-content/70">
            {date ? new Date(date).toLocaleDateString() : ""}
          </p>
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>

        <div className="mb-6">
          <Image
            src={FALLBACK_THUMBNAIL}
            alt={title}
            width={1200}
            height={630}
            className="w-full rounded-lg object-cover"
          />
        </div>

        <article
          className="prose max-w-none bg-base-100 p-6 shadow"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </main>
  );
}
