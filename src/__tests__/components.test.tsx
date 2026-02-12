/**
 * Tests para componentes React - DateInput, LiveCounter, FunFacts
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DateInput from "@/components/DateInput";
import LiveCounter from "@/components/LiveCounter";
import FunFacts from "@/components/FunFacts";
import type { FunFactData } from "@/lib/calculations";

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock i18n context
vi.mock("@/lib/i18n-context", () => ({
  useI18n: () => ({
    locale: "en" as const,
    setLocale: vi.fn(),
    t: {
      dateInput: {
        label: "📅 Enter your birth date",
        placeholder: "Select date",
        submit: "✨ Show My Life Stats",
        loading: "Calculating your life...",
        privacy: "🔒 Your data stays in your browser.",
        errorEmpty: "Please select your birth date",
        errorFuture: "Birth date cannot be in the future!",
        errorInvalid: "Please enter a valid birth date",
      },
      liveCounter: {
        prefix: "⏱️ You've been alive for",
        suffix: "seconds and counting...",
        live: "Live",
      },
      funFacts: {
        title: "🎲 Fun Facts About Your Life",
        moonTrips: (n: string) => `You've traveled ${n} times the distance to the Moon! 🌙`,
        sunTrips: (n: string) => `That's ${n} round trips to the Sun! ☀️`,
        heartBillion: (n: string) => `Your heart has beaten over ${n} BILLION times! ❤️`,
        heartMillion: (n: string) => `Your heart has beaten ${n} million times! ❤️`,
        books: (n: string) => `You could've read ${n} books! 📚`,
        pizza: (n: string) => `You've eaten around ${n} slices of pizza! 🍕`,
        hair: (n: string) => `Your hair has grown approximately ${n} meters! 💇`,
        nails: (n: string) => `Your nails have grown about ${n} cm! 💅`,
        words: (n: string) => `You've spoken approximately ${n} million words! 🗣️`,
      },
    },
  }),
}));

describe("DateInput", () => {
  it("should render the form", () => {
    render(<DateInput />);
    expect(screen.getByText("📅 Enter your birth date")).toBeInTheDocument();
    expect(screen.getByText("✨ Show My Life Stats")).toBeInTheDocument();
  });

  it("should render the date input element", () => {
    render(<DateInput />);
    const input = document.querySelector('input[type="date"]');
    expect(input).toBeTruthy();
  });

  it("should show privacy notice", () => {
    render(<DateInput />);
    expect(screen.getByText("🔒 Your data stays in your browser.")).toBeInTheDocument();
  });

  it("should navigate on valid date submit", () => {
    mockPush.mockClear();
    render(<DateInput />);
    const input = document.querySelector('input[type="date"]') as HTMLInputElement;
    expect(input).toBeTruthy();

    fireEvent.change(input, { target: { value: "2000-01-01" } });
    expect(input.value).toBe("2000-01-01");

    const form = document.querySelector("form") as HTMLFormElement;
    fireEvent.submit(form);
    expect(mockPush).toHaveBeenCalledWith("/stats?birth=2000-01-01");
  });
});

describe("LiveCounter", () => {
  it("should render the counter with translated labels", () => {
    render(<LiveCounter birthDate="2000-01-01" />);
    expect(screen.getByText("⏱️ You've been alive for")).toBeInTheDocument();
    expect(screen.getByText("seconds and counting...")).toBeInTheDocument();
    expect(screen.getByText("Live")).toBeInTheDocument();
  });

  it("should display a formatted number of seconds", () => {
    render(<LiveCounter birthDate="2000-01-01" />);
    const counterElement = document.querySelector(".gradient-text.font-mono");
    expect(counterElement).toBeTruthy();
    if (counterElement) {
      const text = counterElement.textContent || "";
      expect(text).toMatch(/[\d,]+/);
    }
  });
});

describe("FunFacts", () => {
  const mockFacts: FunFactData[] = [
    { key: "moonTrips", value: "5" },
    { key: "pizza", value: "3,000" },
    { key: "hair", value: "1.2" },
  ];

  it("should render the title", () => {
    render(<FunFacts facts={mockFacts} />);
    expect(screen.getByText("🎲 Fun Facts About Your Life")).toBeInTheDocument();
  });

  it("should render translated fun facts", () => {
    render(<FunFacts facts={mockFacts} />);
    expect(
      screen.getByText("You've traveled 5 times the distance to the Moon! 🌙"),
    ).toBeInTheDocument();
    expect(screen.getByText("You've eaten around 3,000 slices of pizza! 🍕")).toBeInTheDocument();
    expect(
      screen.getByText("Your hair has grown approximately 1.2 meters! 💇"),
    ).toBeInTheDocument();
  });

  it("should render correct number of fact items", () => {
    const { container } = render(<FunFacts facts={mockFacts} />);
    // Each fact is inside a div with text
    const factTexts = container.querySelectorAll(".grid.gap-3 > div");
    expect(factTexts.length).toBe(3);
  });
});
