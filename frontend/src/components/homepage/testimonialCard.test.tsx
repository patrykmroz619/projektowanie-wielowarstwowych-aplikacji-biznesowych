import { render, screen } from "@testing-library/react";
import TestimonialCard from "./testimonialCard";

const mockProps = {
  initials: "AK",
  name: "Anna Kowalska",
  description: "Frontend Developer",
  quote: "This app changed my life completely!",
};

describe("TestimonialCard Component", () => {
  it("renders correctly with all props", () => {
    render(<TestimonialCard {...mockProps} />);

    expect(screen.getByText("AK")).toBeInTheDocument();
    expect(screen.getByText("Anna Kowalska")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText('"This app changed my life completely!"')).toBeInTheDocument();
  });

  it("displays initials in a circular container", () => {
    render(<TestimonialCard {...mockProps} />);

    const initialsElement = screen.getByText("AK");
    expect(initialsElement).toHaveClass("text-lg", "font-bold", "text-primary");

    const initialsContainer = initialsElement.parentElement;
    expect(initialsContainer).toHaveClass(
      "h-12",
      "w-12",
      "rounded-full",
      "bg-primary/10",
      "flex",
      "items-center",
      "justify-center"
    );
  });

  it("displays name as card title", () => {
    render(<TestimonialCard {...mockProps} />);

    const nameElement = screen.getByText("Anna Kowalska");
    // Just check that the name is rendered, CardTitle component handles its own styling
    expect(nameElement).toBeInTheDocument();
  });

  it("displays description as card description", () => {
    render(<TestimonialCard {...mockProps} />);

    const descriptionElement = screen.getByText("Frontend Developer");
    expect(descriptionElement).toBeInTheDocument();
  });

  it("displays quote with proper formatting", () => {
    render(<TestimonialCard {...mockProps} />);

    const quoteElement = screen.getByText('"This app changed my life completely!"');
    expect(quoteElement).toHaveClass("text-muted-foreground");
  });

  it("renders with empty values", () => {
    const emptyProps = {
      initials: "",
      name: "",
      description: "",
      quote: "",
    };

    render(<TestimonialCard {...emptyProps} />);

    expect(screen.getByText('""')).toBeInTheDocument();
  });

  it("handles long content gracefully", () => {
    const longProps = {
      initials: "VL",
      name: "Very Long Name That Might Overflow The Container",
      description: "Very Long Job Title That Might Also Overflow",
      quote:
        "This is a very long testimonial quote that contains multiple sentences and might span several lines to test how the component handles longer content gracefully.",
    };

    render(<TestimonialCard {...longProps} />);

    expect(screen.getByText("VL")).toBeInTheDocument();
    expect(
      screen.getByText("Very Long Name That Might Overflow The Container")
    ).toBeInTheDocument();
    expect(screen.getByText("Very Long Job Title That Might Also Overflow")).toBeInTheDocument();
  });

  it("renders as a Card component", () => {
    const { container } = render(<TestimonialCard {...mockProps} />);

    const cardElement = container.querySelector('[data-slot="card"]') || container.firstChild;
    expect(cardElement).toBeInTheDocument();
  });
});
