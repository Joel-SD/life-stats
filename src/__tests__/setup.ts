import "@testing-library/jest-dom/vitest";

// Mock IntersectionObserver for all tests
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe() {
    // Trigger immediately as if element is visible
    this.callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});
