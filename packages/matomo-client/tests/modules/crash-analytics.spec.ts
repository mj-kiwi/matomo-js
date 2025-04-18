import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  CrashAnalyticsModule,
  CoreReportingClient,
} from "@mj-kiwi/matomo-client";

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

describe("CrashAnalyticsModule", () => {
  let crashAnalyticsModule: CrashAnalyticsModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and CrashAnalytics module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    crashAnalyticsModule = new CrashAnalyticsModule(clientInstance);
  });

  describe("searchCrashMessagesForMerge", () => {
    it("should call the API with default parameters", async () => {
      const mockResponse = [
        {
          id: 1,
          message: "TypeError: Cannot read property 'length' of undefined",
        },
        {
          id: 2,
          message: "TypeError: Cannot read property 'size' of undefined",
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await crashAnalyticsModule.searchCrashMessagesForMerge(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "CrashAnalytics.searchCrashMessagesForMerge",
        {
          idSite: 1,
          resourceUri: "",
          searchTerm: "",
          limit: "10",
          offset: "0",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = [
        { id: 3, message: "TypeError: undefined is not a function" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await crashAnalyticsModule.searchCrashMessagesForMerge(
        1,
        "main.js",
        "TypeError",
        5,
        10,
        [1, 2]
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "CrashAnalytics.searchCrashMessagesForMerge",
        {
          idSite: 1,
          resourceUri: "main.js",
          searchTerm: "TypeError",
          limit: 5,
          offset: 10,
          excludeIdLogCrashes: [1, 2],
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("mergeCrashes", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await crashAnalyticsModule.mergeCrashes(1, [10, 11, 12]);

      expect(mockClient.request).toHaveBeenCalledWith(
        "CrashAnalytics.mergeCrashes",
        {
          idSite: 1,
          idLogCrashes: [10, 11, 12],
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("unmergeCrashGroup", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await crashAnalyticsModule.unmergeCrashGroup(1, 10);

      expect(mockClient.request).toHaveBeenCalledWith(
        "CrashAnalytics.unmergeCrashGroup",
        {
          idSite: 1,
          idLogCrash: 10,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCrashGroups", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        { id: 10, name: "Group 1", crashCount: 5 },
        { id: 11, name: "Group 2", crashCount: 3 },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await crashAnalyticsModule.getCrashGroups(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "CrashAnalytics.getCrashGroups",
        {
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCrashTypes", () => {
    it("should call the API with only required parameters", async () => {
      const mockResponse = ["TypeError", "ReferenceError", "SyntaxError"];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await crashAnalyticsModule.getCrashTypes(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "CrashAnalytics.getCrashTypes",
        {
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with filter limit", async () => {
      const mockResponse = ["TypeError", "ReferenceError"];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await crashAnalyticsModule.getCrashTypes(1, 2);

      expect(mockClient.request).toHaveBeenCalledWith(
        "CrashAnalytics.getCrashTypes",
        {
          idSite: 1,
          filter_limit: 2,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("setIgnoreCrash", () => {
    it("should call the API with default ignore parameter", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await crashAnalyticsModule.setIgnoreCrash(1, 10);

      expect(mockClient.request).toHaveBeenCalledWith(
        "CrashAnalytics.setIgnoreCrash",
        {
          idSite: 1,
          idLogCrash: 10,
          ignore: "1",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with specific ignore parameter", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await crashAnalyticsModule.setIgnoreCrash(1, 10, 0);

      expect(mockClient.request).toHaveBeenCalledWith(
        "CrashAnalytics.setIgnoreCrash",
        {
          idSite: 1,
          idLogCrash: 10,
          ignore: 0,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getIgnoredCrashes", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        { id: 10, message: "ReferenceError: x is not defined" },
        { id: 11, message: "SyntaxError: Unexpected token" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await crashAnalyticsModule.getIgnoredCrashes(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "CrashAnalytics.getIgnoredCrashes",
        {
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCrashSummary", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        id: 10,
        message: "TypeError: Cannot read property 'x' of undefined",
        count: 42,
        firstSeen: "2023-01-01",
        lastSeen: "2023-04-01",
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await crashAnalyticsModule.getCrashSummary(1, 10);

      expect(mockClient.request).toHaveBeenCalledWith(
        "CrashAnalytics.getCrashSummary",
        {
          idSite: 1,
          idLogCrash: 10,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCrashVisitContext", () => {
    it("should call the API with required parameters and defaults", async () => {
      const mockResponse = {
        actions: [
          { type: "pageview", url: "/page1" },
          { type: "pageview", url: "/page2" },
          { type: "crash", message: "TypeError: x is not defined" },
        ],
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await crashAnalyticsModule.getCrashVisitContext(
        10,
        1,
        "day",
        "2023-04-01"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "CrashAnalytics.getCrashVisitContext",
        {
          idLogCrash: 10,
          idSite: 1,
          period: "day",
          date: "2023-04-01",
          filter_limit: "5",
          filter_offset: "0",
          fetchRecentActions: "1",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = {
        actions: [{ type: "crash", message: "TypeError: x is not defined" }],
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await crashAnalyticsModule.getCrashVisitContext(
        10,
        1,
        "week",
        "last7",
        "deviceType==mobile",
        10,
        5,
        0
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "CrashAnalytics.getCrashVisitContext",
        {
          idLogCrash: 10,
          idSite: 1,
          period: "week",
          date: "last7",
          segment: "deviceType==mobile",
          filter_limit: 10,
          filter_offset: 5,
          fetchRecentActions: 0,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  // Testing a subset of remaining methods that follow the standard pattern
  describe("getAllCrashes", () => {
    it("should call the API with default parameters", async () => {
      const mockResponse = [
        { id: 1, message: "Error 1" },
        { id: 2, message: "Error 2" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await crashAnalyticsModule.getAllCrashes(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "CrashAnalytics.getAllCrashes",
        {
          idSite: 1,
          filter_sort_column: "datetime_last_seen",
          filter_sort_order: "desc",
          filter_limit: "10",
          filter_offset: "0",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("get", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        nb_crashes: 42,
        nb_crashes_unique: 10,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await crashAnalyticsModule.get(1, "day", "yesterday");

      expect(mockClient.request).toHaveBeenCalledWith("CrashAnalytics.get", {
        idSite: 1,
        period: "day",
        date: "yesterday",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getLastCrashesOverview", () => {
    it("should call the API with default parameters", async () => {
      const mockResponse = { count: 5, newCount: 1, reappearedCount: 0 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await crashAnalyticsModule.getLastCrashesOverview(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "CrashAnalytics.getLastCrashesOverview",
        {
          idSite: 1,
          lastMinutes: "30",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
