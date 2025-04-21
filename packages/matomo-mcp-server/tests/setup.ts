import { vi } from "vitest";
import { env } from "./mocks/env";

// Mock the ReportingClient class
vi.mock("@mj-kiwi/matomo-client", () => {
  return {
    ReportingClient: vi.fn().mockImplementation(() => ({
      userId: {
        getUsers: vi.fn().mockResolvedValue([
          { userId: "user1", lastActionDateTime: "2023-04-21 12:00:00" },
          { userId: "user2", lastActionDateTime: "2023-04-21 14:30:00" },
        ]),
      },
      tour: {
        getTours: vi.fn().mockResolvedValue([
          { id: "tour1", name: "Introduction Tour" },
          { id: "tour2", name: "Advanced Features" },
        ]),
      },
      tagManager: {
        getContainers: vi
          .fn()
          .mockResolvedValue([{ id: "container1", name: "Website Container" }]),
      },
      sitesManager: {
        getSites: vi.fn().mockResolvedValue([
          { idsite: 1, name: "Test Site" },
          { idsite: 2, name: "Production Site" },
        ]),
      },
    })),
  };
});

// Mock environment variables
vi.mock("../src/env.js", () => {
  return { env };
});

// Optional: Set environment variables for the test process
process.env.MATOMO_URL = env.MATOMO_URL;
process.env.MATOMO_AUTH_TOKEN = env.MATOMO_AUTH_TOKEN;
process.env.MATOMO_DEFAULT_SITE_ID = env.MATOMO_DEFAULT_SITE_ID;
