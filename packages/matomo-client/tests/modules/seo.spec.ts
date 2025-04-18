import { describe, it, expect, vi, beforeEach } from "vitest";
import { SeoModule, CoreReportingClient } from "../../src/index";

// Mock CoreReportingClient
vi.mock(import("../../src/index"), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe("SeoModule", () => {
  let seoModule: SeoModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    seoModule = new SeoModule(clientInstance);
  });

  describe("getRank", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        bing_index: 1000,
        domain_age: "5 years, 3 months",
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await seoModule.getRank("https://example.com");

      expect(mockClient.request).toHaveBeenCalledWith("SEO.getRank", {
        url: "https://example.com",
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
