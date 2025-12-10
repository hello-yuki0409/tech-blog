import { sampleArticles } from "./data/sampleArticles";

export default function Home() {
  return (
   <ul>
      {sampleArticles.map((item) => (
        <li key={item.url}>{item.title}</li>
      ))}
    </ul>
  );
}