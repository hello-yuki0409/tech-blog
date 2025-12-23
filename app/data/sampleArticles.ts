export type Article = {
  id?: string;
  title: string;
  date: string; // ISO or YYYY-MM-DD
  url: string;
  thumbnail: string;
};

export const sampleArticles: Article[] = [
  {
    id: "sample-react-basic",
    title: "Reactの基本",
    date: "2024-01-01",
    url: "/blogs/sample-react-basic",
    thumbnail: "https://cdn.qiita.com/assets/public/article-ogp-background-9f5428127621718a910c8b63951390ad.png",
  },
  {
    id: "sample-next-ssr",
    title: "Next.jsでSSR入門",
    date: "2024-02-10",
    url: "/blogs/sample-next-ssr",
    thumbnail: "https://cdn.qiita.com/assets/public/article-ogp-background-9f5428127621718a910c8b63951390ad.png",
  },
  {
    id: "sample-firebase-deploy",
    title: "Firebase Hosting + Functions でデプロイ",
    date: "2024-03-05",
    url: "/blogs/sample-firebase-deploy",
    thumbnail: "https://cdn.qiita.com/assets/public/article-ogp-background-9f5428127621718a910c8b63951390ad.png",
  },
  {
    id: "sample-jest-rtl",
    title: "Jest + RTLでコンポーネントテスト",
    date: "2024-04-12",
    url: "/blogs/sample-jest-rtl",
    thumbnail: "https://cdn.qiita.com/assets/public/article-ogp-background-9f5428127621718a910c8b63951390ad.png",
  },
  {
    id: "sample-typescript-tips",
    title: "TypeScript Tips集",
    date: "2024-05-20",
    url: "/blogs/sample-typescript-tips",
    thumbnail: "https://cdn.qiita.com/assets/public/article-ogp-background-9f5428127621718a910c8b63951390ad.png",
  },
];
