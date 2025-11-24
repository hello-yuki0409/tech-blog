import Title from "./components/Title";

export default function Home() {
  return (
    <div>
      {/* 見出しはコンポーネント化してテストしやすくする */}
      <Title text="Hello world!" />
      <button
        className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
      >
        Button
      </button>
    </div>
  );
}
