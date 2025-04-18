import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  MarketingCampaignsReportingModule,
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

describe("MarketingCampaignsReportingModule", () => {
  let marketingModule: MarketingCampaignsReportingModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and MarketingCampaignsReporting module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    marketingModule = new MarketingCampaignsReportingModule(clientInstance);
  });

  describe("getId", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getId(1, "day", "today");

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getId",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getId(
        1,
        "day",
        "today",
        "deviceType==desktop"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getId",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getName", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getName(1, "day", "today");

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getName",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getName(
        1,
        "day",
        "today",
        "deviceType==desktop",
        true,
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getName",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          expanded: true,
          flat: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getKeywordContentFromNameId", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getKeywordContentFromNameId(
        1,
        "day",
        "today",
        5
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getKeywordContentFromNameId",
        {
          idSite: 1,
          period: "day",
          date: "today",
          idSubtable: 5,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getKeywordContentFromNameId(
        1,
        "day",
        "today",
        5,
        "deviceType==desktop"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getKeywordContentFromNameId",
        {
          idSite: 1,
          period: "day",
          date: "today",
          idSubtable: 5,
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getKeyword", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getKeyword(1, "day", "today");

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getKeyword",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getKeyword(
        1,
        "day",
        "today",
        "deviceType==desktop"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getKeyword",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getSource", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getSource(1, "day", "today");

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getSource",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getSource(
        1,
        "day",
        "today",
        "deviceType==desktop"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getSource",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getMedium", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getMedium(1, "day", "today");

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getMedium",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getMedium(
        1,
        "day",
        "today",
        "deviceType==desktop"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getMedium",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContent", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getContent(1, "day", "today");

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getContent",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getContent(
        1,
        "day",
        "today",
        "deviceType==desktop"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getContent",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getGroup", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getGroup(1, "day", "today");

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getGroup",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getGroup(
        1,
        "day",
        "today",
        "deviceType==desktop"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getGroup",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getPlacement", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getPlacement(1, "day", "today");

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getPlacement",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getPlacement(
        1,
        "day",
        "today",
        "deviceType==desktop"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getPlacement",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getSourceMedium", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getSourceMedium(1, "day", "today");

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getSourceMedium",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getSourceMedium(
        1,
        "day",
        "today",
        "deviceType==desktop",
        true,
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getSourceMedium",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          expanded: true,
          flat: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getNameFromSourceMediumId", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getNameFromSourceMediumId(
        1,
        "day",
        "today",
        5
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getNameFromSourceMediumId",
        {
          idSite: 1,
          period: "day",
          date: "today",
          idSubtable: 5,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await marketingModule.getNameFromSourceMediumId(
        1,
        "day",
        "today",
        5,
        "deviceType==desktop"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "MarketingCampaignsReporting.getNameFromSourceMediumId",
        {
          idSite: 1,
          period: "day",
          date: "today",
          idSubtable: 5,
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
