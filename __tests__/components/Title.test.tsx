import { render, screen } from "@testing-library/react";
import Title from "@/app/components/Title";

describe("Title component", () => {
  it("renders provided heading text", () => {
    // 見出しコンポーネントが渡された文言を表示することを確認する
    render(<Title text="Sample Heading" />);

    expect(
      screen.getByRole("heading", { name: "Sample Heading" }),
    ).toBeInTheDocument();
  });
});
