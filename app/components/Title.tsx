type TitleProps = {
  text: string;
};

export default function Title({ text }: TitleProps) {
  // 見出し文言を受け取り、装飾付きで表示するだけの小さなコンポーネント
  return <h1 className="text-3xl font-bold underline">{text}</h1>;
}
