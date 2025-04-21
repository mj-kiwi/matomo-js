import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { env } from "./mocks/env";

// Mock the ReportingClient module before importing
vi.mock("@mj-kiwi/matomo-client", () => {
  return {
    ReportingClient: vi.fn().mockImplementation(() => ({
      userId: { getUsers: vi.fn() },
      tour: { getTours: vi.fn() },
      tagManager: { getContainers: vi.fn() },
      sitesManager: { getSites: vi.fn() },
    })),
  };
});

// Import after mocking
import { getMatomoClient } from "../src/client.js";
import { ReportingClient } from "@mj-kiwi/matomo-client";

describe("getMatomoClient", () => {
  beforeEach(() => {
    // Clear mock call history, but don't reset modules to preserve singleton
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create a new ReportingClient instance with correct config", () => {
    const client = getMatomoClient();
    expect(client).toBeDefined();
    expect(ReportingClient).toHaveBeenCalledWith({
      url: env.MATOMO_URL,
      tokenAuth: env.MATOMO_AUTH_TOKEN,
      idSite: env.MATOMO_DEFAULT_SITE_ID,
    });
  });

  it("should return the same client instance when called multiple times", () => {
    // Reset call count for ReportingClient constructor before this test
    vi.mocked(ReportingClient).mockClear();

    const client1 = getMatomoClient();
    const client2 = getMatomoClient();

    expect(client1).toBe(client2);
    expect(ReportingClient).toHaveBeenCalledTimes(0); // Should be 0 because we already created it
  });
});
