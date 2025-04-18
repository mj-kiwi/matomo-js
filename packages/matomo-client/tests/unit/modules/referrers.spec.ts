import { describe, it, expect, vi, beforeEach } from "vitest";
import { ReferrersModule, CoreReportingClient } from "../../../src/index";

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

describe("ReferrersModule", () => {
  let referrersModule: ReferrersModule;
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
    referrersModule = new ReferrersModule(clientInstance);
  });

  describe("get", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.get(1, "day", "2023-01-01");

      expect(mockClient.request).toHaveBeenCalledWith("Referrers.get", {
        idSite: 1,
        period: "day",
        date: "2023-01-01",
        segment: undefined,
        columns: "",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.get(
        1,
        "day",
        "2023-01-01",
        "userId==123",
        "nb_visits,nb_actions"
      );

      expect(mockClient.request).toHaveBeenCalledWith("Referrers.get", {
        idSite: 1,
        period: "day",
        date: "2023-01-01",
        segment: "userId==123",
        columns: "nb_visits,nb_actions",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getReferrerType", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getReferrerType(
        1,
        "day",
        "2023-01-01"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getReferrerType",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: undefined,
          typeReferrer: "",
          idSubtable: undefined,
          expanded: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getReferrerType(
        1,
        "day",
        "2023-01-01",
        "userId==123",
        "search",
        2,
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getReferrerType",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: "userId==123",
          typeReferrer: "search",
          idSubtable: 2,
          expanded: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAll", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getAll(1, "day", "2023-01-01");

      expect(mockClient.request).toHaveBeenCalledWith("Referrers.getAll", {
        idSite: 1,
        period: "day",
        date: "2023-01-01",
        segment: undefined,
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getAll(
        1,
        "day",
        "2023-01-01",
        "userId==123"
      );

      expect(mockClient.request).toHaveBeenCalledWith("Referrers.getAll", {
        idSite: 1,
        period: "day",
        date: "2023-01-01",
        segment: "userId==123",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getKeywords", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getKeywords(1, "day", "2023-01-01");

      expect(mockClient.request).toHaveBeenCalledWith("Referrers.getKeywords", {
        idSite: 1,
        period: "day",
        date: "2023-01-01",
        segment: undefined,
        expanded: undefined,
        flat: undefined,
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getKeywords(
        1,
        "day",
        "2023-01-01",
        "userId==123",
        true,
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith("Referrers.getKeywords", {
        idSite: 1,
        period: "day",
        date: "2023-01-01",
        segment: "userId==123",
        expanded: true,
        flat: true,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getSearchEnginesFromKeywordId", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getSearchEnginesFromKeywordId(
        1,
        "day",
        "2023-01-01",
        5
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getSearchEnginesFromKeywordId",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          idSubtable: 5,
          segment: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getSearchEnginesFromKeywordId(
        1,
        "day",
        "2023-01-01",
        5,
        "userId==123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getSearchEnginesFromKeywordId",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          idSubtable: 5,
          segment: "userId==123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getSearchEngines", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getSearchEngines(
        1,
        "day",
        "2023-01-01"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getSearchEngines",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: undefined,
          expanded: undefined,
          flat: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getSearchEngines(
        1,
        "day",
        "2023-01-01",
        "userId==123",
        true,
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getSearchEngines",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: "userId==123",
          expanded: true,
          flat: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getKeywordsFromSearchEngineId", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getKeywordsFromSearchEngineId(
        1,
        "day",
        "2023-01-01",
        5
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getKeywordsFromSearchEngineId",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          idSubtable: 5,
          segment: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getKeywordsFromSearchEngineId(
        1,
        "day",
        "2023-01-01",
        5,
        "userId==123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getKeywordsFromSearchEngineId",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          idSubtable: 5,
          segment: "userId==123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCampaigns", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getCampaigns(1, "day", "2023-01-01");

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getCampaigns",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: undefined,
          expanded: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getCampaigns(
        1,
        "day",
        "2023-01-01",
        "userId==123",
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getCampaigns",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: "userId==123",
          expanded: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getKeywordsFromCampaignId", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getKeywordsFromCampaignId(
        1,
        "day",
        "2023-01-01",
        5
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getKeywordsFromCampaignId",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          idSubtable: 5,
          segment: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getKeywordsFromCampaignId(
        1,
        "day",
        "2023-01-01",
        5,
        "userId==123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getKeywordsFromCampaignId",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          idSubtable: 5,
          segment: "userId==123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getWebsites", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getWebsites(1, "day", "2023-01-01");

      expect(mockClient.request).toHaveBeenCalledWith("Referrers.getWebsites", {
        idSite: 1,
        period: "day",
        date: "2023-01-01",
        segment: undefined,
        expanded: undefined,
        flat: undefined,
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getWebsites(
        1,
        "day",
        "2023-01-01",
        "userId==123",
        true,
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith("Referrers.getWebsites", {
        idSite: 1,
        period: "day",
        date: "2023-01-01",
        segment: "userId==123",
        expanded: true,
        flat: true,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getUrlsFromWebsiteId", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getUrlsFromWebsiteId(
        1,
        "day",
        "2023-01-01",
        5
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getUrlsFromWebsiteId",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          idSubtable: 5,
          segment: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getUrlsFromWebsiteId(
        1,
        "day",
        "2023-01-01",
        5,
        "userId==123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getUrlsFromWebsiteId",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          idSubtable: 5,
          segment: "userId==123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getSocials", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getSocials(1, "day", "2023-01-01");

      expect(mockClient.request).toHaveBeenCalledWith("Referrers.getSocials", {
        idSite: 1,
        period: "day",
        date: "2023-01-01",
        segment: undefined,
        expanded: undefined,
        flat: undefined,
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getSocials(
        1,
        "day",
        "2023-01-01",
        "userId==123",
        true,
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith("Referrers.getSocials", {
        idSite: 1,
        period: "day",
        date: "2023-01-01",
        segment: "userId==123",
        expanded: true,
        flat: true,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getUrlsForSocial", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getUrlsForSocial(
        1,
        "day",
        "2023-01-01"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getUrlsForSocial",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: undefined,
          idSubtable: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { result: "success" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getUrlsForSocial(
        1,
        "day",
        "2023-01-01",
        "userId==123",
        5
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getUrlsForSocial",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: "userId==123",
          idSubtable: 5,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getNumberOfDistinctSearchEngines", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { value: 5 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getNumberOfDistinctSearchEngines(
        1,
        "day",
        "2023-01-01"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getNumberOfDistinctSearchEngines",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { value: 3 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getNumberOfDistinctSearchEngines(
        1,
        "day",
        "2023-01-01",
        "userId==123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getNumberOfDistinctSearchEngines",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: "userId==123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getNumberOfDistinctSocialNetworks", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { value: 5 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getNumberOfDistinctSocialNetworks(
        1,
        "day",
        "2023-01-01"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getNumberOfDistinctSocialNetworks",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { value: 3 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getNumberOfDistinctSocialNetworks(
        1,
        "day",
        "2023-01-01",
        "userId==123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getNumberOfDistinctSocialNetworks",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: "userId==123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getNumberOfDistinctKeywords", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { value: 50 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getNumberOfDistinctKeywords(
        1,
        "day",
        "2023-01-01"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getNumberOfDistinctKeywords",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { value: 30 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getNumberOfDistinctKeywords(
        1,
        "day",
        "2023-01-01",
        "userId==123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getNumberOfDistinctKeywords",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: "userId==123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getNumberOfDistinctCampaigns", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { value: 10 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getNumberOfDistinctCampaigns(
        1,
        "day",
        "2023-01-01"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getNumberOfDistinctCampaigns",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { value: 5 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getNumberOfDistinctCampaigns(
        1,
        "day",
        "2023-01-01",
        "userId==123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getNumberOfDistinctCampaigns",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: "userId==123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getNumberOfDistinctWebsites", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { value: 25 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getNumberOfDistinctWebsites(
        1,
        "day",
        "2023-01-01"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getNumberOfDistinctWebsites",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { value: 15 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getNumberOfDistinctWebsites(
        1,
        "day",
        "2023-01-01",
        "userId==123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getNumberOfDistinctWebsites",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: "userId==123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getNumberOfDistinctWebsitesUrls", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { value: 100 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getNumberOfDistinctWebsitesUrls(
        1,
        "day",
        "2023-01-01"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getNumberOfDistinctWebsitesUrls",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { value: 50 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getNumberOfDistinctWebsitesUrls(
        1,
        "day",
        "2023-01-01",
        "userId==123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Referrers.getNumberOfDistinctWebsitesUrls",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: "userId==123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
