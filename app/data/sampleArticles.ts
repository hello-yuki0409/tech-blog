export type Article = {
  title: string;
  date: string; // ISO or YYYY-MM-DD
  url: string;
  thumbnail: string;
};

export const sampleArticles: Article[] = [
  {
    title: "Reactの基本",
    date: "2024-01-01",
    url: "https://qiita.com/example/react-basic",
    thumbnail: "https://cdn.qiita.com/assets/public/article-ogp-background-9f5428127621718a910c8b63951390ad.png",
  },
  {
    title: "Next.jsでSSR入門",
    date: "2024-02-10",
    url: "https://qiita.com/example/next-ssr-intro",
    thumbnail: "https://cdn.qiita.com/assets/public/article-ogp-background-9f5428127621718a910c8b63951390ad.png",
  },
  {
    title: "Firebase Hosting + Functions でデプロイ",
    date: "2024-03-05",
    url: "https://qiita.com/example/firebase-hosting-functions",
    thumbnail: "https://cdn.qiita.com/assets/public/article-ogp-background-9f5428127621718a910c8b63951390ad.png",
  },
  {
    title: "Jest + RTLでコンポーネントテスト",
    date: "2024-04-12",
    url: "https://qiita.com/example/jest-rtl-components",
    thumbnail: "https://cdn.qiita.com/assets/public/article-ogp-background-9f5428127621718a910c8b63951390ad.png",
  },
  {
    title: "TypeScript Tips集",
    date: "2024-05-20",
    url: "https://qiita.com/example/typescript-tips",
    thumbnail: "https://cdn.qiita.com/assets/public/article-ogp-background-9f5428127621718a910c8b63951390ad.png",
  },
];
