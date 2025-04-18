import { describe, it, expect, vi, beforeEach } from "vitest";
import { LiveModule, CoreReportingClient } from "@mj-kiwi/matomo-client";

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

describe("LiveModule", () => {
  let liveModule: LiveModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and Live module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    liveModule = new LiveModule(clientInstance);
  });

  describe("getCounters", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        visits: 5,
        actions: 20,
        visitors: 3,
        visitsConverted: 1,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await liveModule.getCounters(1, 30);

      expect(mockClient.request).toHaveBeenCalledWith("Live.getCounters", {
        idSite: 1,
        lastMinutes: 30,
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = {
        visits: 8,
        actions: 32,
        visitors: 6,
        visitsConverted: 2,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await liveModule.getCounters(
        1,
        30,
        "deviceType==mobile",
        ["visits", "actions"],
        ["visitsConverted"]
      );

      expect(mockClient.request).toHaveBeenCalledWith("Live.getCounters", {
        idSite: 1,
        lastMinutes: 30,
        segment: "deviceType==mobile",
        showColumns: "visits,actions",
        hideColumns: "visitsConverted",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("isVisitorProfileEnabled", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = true;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await liveModule.isVisitorProfileEnabled(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "Live.isVisitorProfileEnabled",
        {
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getLastVisitsDetails", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        {
          idVisit: 123,
          visitorId: "abc123",
          visitIp: "192.168.1.1",
          actionDetails: [
            { type: "page", url: "https://example.org/home" },
            { type: "event", url: "https://example.org/event" },
          ],
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await liveModule.getLastVisitsDetails(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "Live.getLastVisitsDetails",
        {
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = [
        {
          idVisit: 123,
          visitorId: "abc123",
          visitIp: "192.168.1.1",
          actionDetails: [
            { type: "page", url: "https://example.org/home" },
            { type: "event", url: "https://example.org/event" },
          ],
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await liveModule.getLastVisitsDetails(
        1,
        "day",
        "yesterday",
        "deviceType==mobile",
        10,
        1619712000,
        true,
        false,
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Live.getLastVisitsDetails",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          segment: "deviceType==mobile",
          countVisitorsToFetch: 10,
          minTimestamp: 1619712000,
          flat: true,
          doNotFetchActions: false,
          enhanced: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getVisitorProfile", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        visitorId: "abc123",
        firstVisit: {
          date: "2023-01-15 10:30:00",
          prettyDate: "Jan 15, 2023",
        },
        lastVisit: {
          date: "2023-04-27 14:45:00",
          prettyDate: "Apr 27, 2023",
        },
        visits: 7,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await liveModule.getVisitorProfile(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "Live.getVisitorProfile",
        {
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = {
        visitorId: "abc123",
        firstVisit: {
          date: "2023-01-15 10:30:00",
          prettyDate: "Jan 15, 2023",
        },
        lastVisit: {
          date: "2023-04-27 14:45:00",
          prettyDate: "Apr 27, 2023",
        },
        visits: 7,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await liveModule.getVisitorProfile(
        1,
        "abc123",
        "deviceType==mobile",
        10
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Live.getVisitorProfile",
        {
          idSite: 1,
          visitorId: "abc123",
          segment: "deviceType==mobile",
          limitVisits: 10,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getMostRecentVisitorId", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = "abc123";
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await liveModule.getMostRecentVisitorId(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "Live.getMostRecentVisitorId",
        {
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = "def456";
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await liveModule.getMostRecentVisitorId(
        1,
        "deviceType==mobile"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Live.getMostRecentVisitorId",
        {
          idSite: 1,
          segment: "deviceType==mobile",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getMostRecentVisitsDateTime", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = "2023-04-27 15:30:45";
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await liveModule.getMostRecentVisitsDateTime(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "Live.getMostRecentVisitsDateTime",
        {
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with period and date parameters", async () => {
      const mockResponse = "2023-04-26 18:15:22";
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await liveModule.getMostRecentVisitsDateTime(
        1,
        "day",
        "yesterday"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Live.getMostRecentVisitsDateTime",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
