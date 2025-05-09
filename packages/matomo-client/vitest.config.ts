import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    testTimeout: 10000, // Increased timeout for integration tests
    hookTimeout: 10000,
    isolate: true, // Ensure tests run in isolation to prevent leakage
  },
});
