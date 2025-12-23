import { notFound } from "next/navigation";

const FALLBACK_THUMBNAIL =
  "https://cdn.qiita.com/assets/public/article-ogp-background-9f5428127621718a910c8b63951390ad.png";

type BlogDetail = {
  id: string;
  title?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  content?: string;
  body?: string;
  eyecatch?: { url?: string };
  thumbnail?: { url?: string };
};

async function fetchBlog(id: string): Promise<BlogDetail | null> {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  const endpoint = process.env.MICROCMS_ENDPOINT || "blogs";

  if (!serviceDomain || !apiKey) {
    return null;
  }

  const res = await fetch(
    `https://${serviceDomain}/api/v1/${endpoint}/${id}`,
    {
      headers: { "X-MICROCMS-API-KEY": apiKey },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return null;
  }

  return (await res.json()) as BlogDetail;
}

export default async function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const detail = await fetchBlog(params.id);

  if (!detail) {
    notFound();
  }

  const title = detail?.title ?? "(no title)";
  const date =
    detail?.publishedAt || detail?.updatedAt || detail?.createdAt || "";
  const html = detail?.content || detail?.body || "";
  const thumbnail =
    detail?.eyecatch?.url || detail?.thumbnail?.url || FALLBACK_THUMBNAIL;

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
          <img
            src={thumbnail}
            alt={title}
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
