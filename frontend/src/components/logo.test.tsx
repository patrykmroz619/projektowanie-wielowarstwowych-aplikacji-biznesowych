import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Logo } from "./logo";

describe("Logo Component", () => {
  it("renders correctly", () => {
    const { container } = render(<Logo />);
    const logo = container.querySelector("svg");
    expect(logo).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Logo className="custom-logo" />);
    const logo = container.querySelector("svg");
    expect(logo).toHaveClass("custom-logo");
  });

  it("applies custom width and height", () => {
    const { container } = render(<Logo width="200" height="100" />);
    const logo = container.querySelector("svg");
    expect(logo).toHaveAttribute("width", "200");
    expect(logo).toHaveAttribute("height", "100");
  });

  it("has correct viewBox", () => {
    const { container } = render(<Logo />);
    const logo = container.querySelector("svg");
    expect(logo).toHaveAttribute("viewBox", "0 0 1036.000000 230.000000");
  });

  it("preserves aspect ratio", () => {
    const { container } = render(<Logo />);
    const logo = container.querySelector("svg");
    expect(logo).toHaveAttribute("preserveAspectRatio", "xMidYMid meet");
  });

  it("uses currentColor for fill", () => {
    const { container } = render(<Logo />);
    const logo = container.querySelector("svg");
    const gElement = logo?.querySelector("g");
    expect(gElement).toHaveAttribute("fill", "currentColor");
  });
});
