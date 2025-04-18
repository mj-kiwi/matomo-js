import { describe, it, expect, vi, beforeEach } from "vitest";
import { ContentsModule, CoreReportingClient } from "@mj-kiwi/matomo-client";

// Mock CoreReportingClient
vi.mock(import("@mj-kiwi/matomo-client"), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe("ContentsModule", () => {
  let contentsModule: ContentsModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and Contents module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    contentsModule = new ContentsModule(clientInstance);
  });

  describe("getContentNames", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        { label: "Product Details", nb_impressions: 500, nb_interactions: 150 },
        { label: "Hero Banner", nb_impressions: 1000, nb_interactions: 200 },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await contentsModule.getContentNames(
        1,
        "day",
        "2023-05-15"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Contents.getContentNames",
        {
          idSite: 1,
          period: "day",
          date: "2023-05-15",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all optional parameters", async () => {
      const mockResponse = [
        { label: "Home Banner", nb_impressions: 800, nb_interactions: 120 },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await contentsModule.getContentNames(
        1,
        "week",
        "last7",
        "deviceType==desktop",
        5
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Contents.getContentNames",
        {
          idSite: 1,
          period: "week",
          date: "last7",
          segment: "deviceType==desktop",
          idSubtable: 5,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContentPieces", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        { label: "summer-promo.jpg", nb_impressions: 300, nb_interactions: 80 },
        {
          label: "new-collection.jpg",
          nb_impressions: 450,
          nb_interactions: 120,
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await contentsModule.getContentPieces(
        1,
        "month",
        "2023-05"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Contents.getContentPieces",
        {
          idSite: 1,
          period: "month",
          date: "2023-05",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all optional parameters", async () => {
      const mockResponse = [
        {
          label: "featured-product.jpg",
          nb_impressions: 200,
          nb_interactions: 45,
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await contentsModule.getContentPieces(
        1,
        "range",
        "2023-05-01,2023-05-15",
        "countryCode==US",
        3
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Contents.getContentPieces",
        {
          idSite: 1,
          period: "range",
          date: "2023-05-01,2023-05-15",
          segment: "countryCode==US",
          idSubtable: 3,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
