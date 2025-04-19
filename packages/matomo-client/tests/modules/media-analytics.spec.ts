import { describe, it, expect, vi, beforeEach } from "vitest";
import { MediaAnalyticsModule, CoreReportingClient } from "../../src/index";

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

describe("MediaAnalyticsModule", () => {
  let mediaModule: MediaAnalyticsModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and MediaAnalytics module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    mediaModule = new MediaAnalyticsModule(clientInstance);
  });

  describe("hasRecords", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { result: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.hasRecords({ idSite: 1 });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.hasRecords",
        {
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("get", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.get({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith("MediaAnalytics.get", {
        idSite: 1,
        period: "day",
        date: "today",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.get({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        columns: "nb_plays,nb_impressions",
      });

      expect(mockClient.request).toHaveBeenCalledWith("MediaAnalytics.get", {
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        columns: "nb_plays,nb_impressions",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCurrentNumPlays", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { value: 42 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.getCurrentNumPlays({
        idSite: 1,
        lastMinutes: 30,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getCurrentNumPlays",
        {
          idSite: 1,
          lastMinutes: 30,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { value: 42 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.getCurrentNumPlays({
        idSite: 1,
        lastMinutes: 30,
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getCurrentNumPlays",
        {
          idSite: 1,
          lastMinutes: 30,
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCurrentSumTimeSpent", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { value: 3600 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.getCurrentSumTimeSpent({
        idSite: 1,
        lastMinutes: 30,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getCurrentSumTimeSpent",
        {
          idSite: 1,
          lastMinutes: 30,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { value: 3600 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.getCurrentSumTimeSpent({
        idSite: 1,
        lastMinutes: 30,
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getCurrentSumTimeSpent",
        {
          idSite: 1,
          lastMinutes: 30,
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCurrentMostPlays", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.getCurrentMostPlays({
        idSite: 1,
        lastMinutes: 30,
        filter_limit: "5",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getCurrentMostPlays",
        {
          idSite: 1,
          lastMinutes: 30,
          filter_limit: "5",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.getCurrentMostPlays({
        idSite: 1,
        lastMinutes: 30,
        filter_limit: 10,
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getCurrentMostPlays",
        {
          idSite: 1,
          lastMinutes: 30,
          filter_limit: 10,
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getVideoResources", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.getVideoResources({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getVideoResources",
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

      const result = await mediaModule.getVideoResources({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        idSubtable: 5,
        secondaryDimension: "resolution",
        expanded: true,
        flat: true,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getVideoResources",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          idSubtable: 5,
          secondaryDimension: "resolution",
          expanded: true,
          flat: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAudioResources", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.getAudioResources({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getAudioResources",
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

      const result = await mediaModule.getAudioResources({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        idSubtable: 5,
        secondaryDimension: "player",
        expanded: true,
        flat: true,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getAudioResources",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          idSubtable: 5,
          secondaryDimension: "player",
          expanded: true,
          flat: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getVideoTitles", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.getVideoTitles({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getVideoTitles",
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

      const result = await mediaModule.getVideoTitles({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        idSubtable: 5,
        secondaryDimension: "resolution",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getVideoTitles",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          idSubtable: 5,
          secondaryDimension: "resolution",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAudioTitles", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.getAudioTitles({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getAudioTitles",
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

      const result = await mediaModule.getAudioTitles({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        idSubtable: 5,
        secondaryDimension: "player",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getAudioTitles",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          idSubtable: 5,
          secondaryDimension: "player",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getGroupedVideoResources", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.getGroupedVideoResources({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getGroupedVideoResources",
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

      const result = await mediaModule.getGroupedVideoResources({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        idSubtable: 5,
        secondaryDimension: "resolution",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getGroupedVideoResources",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          idSubtable: 5,
          secondaryDimension: "resolution",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getGroupedAudioResources", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.getGroupedAudioResources({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getGroupedAudioResources",
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

      const result = await mediaModule.getGroupedAudioResources({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        idSubtable: 5,
        secondaryDimension: "player",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getGroupedAudioResources",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          idSubtable: 5,
          secondaryDimension: "player",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getVideoHours", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.getVideoHours({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getVideoHours",
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

      const result = await mediaModule.getVideoHours({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getVideoHours",
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

  describe("getAudioHours", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.getAudioHours({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getAudioHours",
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

      const result = await mediaModule.getAudioHours({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getAudioHours",
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

  describe("getVideoResolutions", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.getVideoResolutions({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getVideoResolutions",
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

      const result = await mediaModule.getVideoResolutions({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getVideoResolutions",
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

  describe("getPlayers", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mediaModule.getPlayers({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getPlayers",
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

      const result = await mediaModule.getPlayers({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "MediaAnalytics.getPlayers",
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
});
