import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["**/*.test.?(c|m)[jt]s?(x)"],
    testTimeout: 15000, // Increased timeout for integration tests
    hookTimeout: 15000,
    isolate: true, // Ensure tests run in isolation to prevent leakage
    setupFiles: ["./vitest.setup.ts"], // Reference setup file for test preparation
  },
});
