import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  SearchEngineKeywordsPerformanceModule,
  CoreReportingClient,
} from "../../../src/index";

// Mock CoreReportingClient
vi.mock(import("../../../src/index"), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe("SearchEngineKeywordsPerformanceModule", () => {
  let searchEngineKeywordsPerformanceModule: SearchEngineKeywordsPerformanceModule;
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
    searchEngineKeywordsPerformanceModule =
      new SearchEngineKeywordsPerformanceModule(clientInstance);
  });

  describe("getKeywords", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { keywords: ["search term 1", "search term 2"] };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await searchEngineKeywordsPerformanceModule.getKeywords(
        1,
        "month",
        "last30"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "SearchEngineKeywordsPerformance.getKeywords",
        {
          idSite: 1,
          period: "month",
          date: "last30",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getKeywordsImported", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { keywords: ["imported term 1", "imported term 2"] };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await searchEngineKeywordsPerformanceModule.getKeywordsImported(
          1,
          "month",
          "last30"
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "SearchEngineKeywordsPerformance.getKeywordsImported",
        {
          idSite: 1,
          period: "month",
          date: "last30",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getKeywordsGoogle", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { keywords: ["google term 1", "google term 2"] };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await searchEngineKeywordsPerformanceModule.getKeywordsGoogle(
          1,
          "month",
          "last30"
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "SearchEngineKeywordsPerformance.getKeywordsGoogle",
        {
          idSite: 1,
          period: "month",
          date: "last30",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getKeywordsBing", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { keywords: ["bing term 1", "bing term 2"] };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await searchEngineKeywordsPerformanceModule.getKeywordsBing(
          1,
          "month",
          "last30"
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "SearchEngineKeywordsPerformance.getKeywordsBing",
        {
          idSite: 1,
          period: "month",
          date: "last30",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getKeywordsYandex", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { keywords: ["yandex term 1", "yandex term 2"] };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await searchEngineKeywordsPerformanceModule.getKeywordsYandex(
          1,
          "month",
          "last30"
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "SearchEngineKeywordsPerformance.getKeywordsYandex",
        {
          idSite: 1,
          period: "month",
          date: "last30",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getKeywordsGoogleWeb", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        keywords: ["google web term 1", "google web term 2"],
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await searchEngineKeywordsPerformanceModule.getKeywordsGoogleWeb(
          1,
          "month",
          "last30"
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "SearchEngineKeywordsPerformance.getKeywordsGoogleWeb",
        {
          idSite: 1,
          period: "month",
          date: "last30",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getKeywordsGoogleImage", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        keywords: ["google image term 1", "google image term 2"],
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await searchEngineKeywordsPerformanceModule.getKeywordsGoogleImage(
          1,
          "month",
          "last30"
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "SearchEngineKeywordsPerformance.getKeywordsGoogleImage",
        {
          idSite: 1,
          period: "month",
          date: "last30",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getKeywordsGoogleVideo", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        keywords: ["google video term 1", "google video term 2"],
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await searchEngineKeywordsPerformanceModule.getKeywordsGoogleVideo(
          1,
          "month",
          "last30"
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "SearchEngineKeywordsPerformance.getKeywordsGoogleVideo",
        {
          idSite: 1,
          period: "month",
          date: "last30",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getKeywordsGoogleNews", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        keywords: ["google news term 1", "google news term 2"],
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await searchEngineKeywordsPerformanceModule.getKeywordsGoogleNews(
          1,
          "month",
          "last30"
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "SearchEngineKeywordsPerformance.getKeywordsGoogleNews",
        {
          idSite: 1,
          period: "month",
          date: "last30",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCrawlingOverviewBing", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        crawledPages: 100,
        crawlErrors: 5,
        timeouts: 2,
        httpErrors: { "301": 3, "404": 7, "500": 1 },
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await searchEngineKeywordsPerformanceModule.getCrawlingOverviewBing(
          1,
          "month",
          "last30"
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "SearchEngineKeywordsPerformance.getCrawlingOverviewBing",
        {
          idSite: 1,
          period: "month",
          date: "last30",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCrawlingOverviewYandex", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        crawledPages: 90,
        crawlErrors: 3,
        timeouts: 1,
        httpErrors: { "301": 2, "404": 5, "500": 0 },
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await searchEngineKeywordsPerformanceModule.getCrawlingOverviewYandex(
          1,
          "month",
          "last30"
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "SearchEngineKeywordsPerformance.getCrawlingOverviewYandex",
        {
          idSite: 1,
          period: "month",
          date: "last30",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCrawlingErrorExamplesBing", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        errorExamples: [
          {
            url: "https://example.com/missing-page",
            errorCode: 404,
            date: "2023-01-15",
          },
          {
            url: "https://example.com/server-error",
            errorCode: 500,
            date: "2023-01-20",
          },
        ],
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await searchEngineKeywordsPerformanceModule.getCrawlingErrorExamplesBing(
          1
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "SearchEngineKeywordsPerformance.getCrawlingErrorExamplesBing",
        {
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
