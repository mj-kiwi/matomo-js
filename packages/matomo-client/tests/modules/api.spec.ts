import { describe, it, expect, vi, beforeEach } from "vitest";
import { ApiModule, CoreReportingClient } from "../../src/index";

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

describe("ApiModule", () => {
  let apiModule: ApiModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and API module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    apiModule = new ApiModule(clientInstance);
  });

  describe("getMatomoVersion", () => {
    it("should call the correct API method and return the version", async () => {
      mockClient.request.mockResolvedValueOnce({ value: "4.14.0" });

      const result = await apiModule.getMatomoVersion({});

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getMatomoVersion",
        {}
      ); // Pass empty object
      expect(result).toBe("4.14.0");
    });
  });

  describe("getPhpVersion", () => {
    it("should call the correct API method and return the PHP version", async () => {
      mockClient.request.mockResolvedValueOnce({ value: "8.1.0" });

      const result = await apiModule.getPhpVersion({});

      expect(mockClient.request).toHaveBeenCalledWith("API.getPhpVersion", {}); // Pass empty object
      expect(result).toBe("8.1.0");
    });
  });

  describe("getIpFromHeader", () => {
    it("should call the correct API method and return the IP address", async () => {
      mockClient.request.mockResolvedValueOnce({ value: "192.168.1.1" });

      const result = await apiModule.getIpFromHeader({});

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getIpFromHeader",
        {}
      ); // Pass empty object
      expect(result).toBe("192.168.1.1");
    });
  });

  describe("getSettings", () => {
    it("should call the correct API method", async () => {
      const mockSettings = { setting1: "value1", setting2: "value2" };
      mockClient.request.mockResolvedValueOnce(mockSettings);

      const result = await apiModule.getSettings({});

      expect(mockClient.request).toHaveBeenCalledWith("API.getSettings", {}); // Pass empty object
      expect(result).toEqual(mockSettings);
    });
  });

  describe("getSegmentsMetadata", () => {
    it("should call the API with correct parameters when idSites is provided", async () => {
      const mockResponse = [{ id: "segment1" }, { id: "segment2" }];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await apiModule.getSegmentsMetadata({
        idSites: [1, 2, 3],
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getSegmentsMetadata",
        {
          idSites: [1, 2, 3],
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API without parameters when idSites is not provided", async () => {
      const mockResponse = [{ id: "segment1" }, { id: "segment2" }];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await apiModule.getSegmentsMetadata({});

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getSegmentsMetadata",
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getMetadata", () => {
    it("should call the API with all provided parameters", async () => {
      const mockResponse = { metadata: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const params = {
        idSite: 1,
        apiModule: "Actions",
        apiAction: "getPageUrls",
        apiParameters: { filter_limit: 10 },
        language: "en",
        period: "day",
        date: "today",
        hideMetricsDoc: true,
        showSubtableReports: false,
      };

      const result = await apiModule.getMetadata(params);

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getMetadata",
        params
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with only required parameters", async () => {
      const mockResponse = { metadata: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await apiModule.getMetadata({});

      expect(mockClient.request).toHaveBeenCalledWith("API.getMetadata", {});
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getReportMetadata", () => {
    it("should call the API with provided parameters", async () => {
      const mockResponse = [{ report1: "data" }, { report2: "data" }];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const params = {
        idSites: [1, 2],
        period: "month",
        date: "last30",
        hideMetricsDoc: true,
      };

      const result = await apiModule.getReportMetadata(params);

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getReportMetadata",
        params
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with empty object when no parameters are provided", async () => {
      const mockResponse = [{ report1: "data" }];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await apiModule.getReportMetadata({});

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getReportMetadata",
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getProcessedReport", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { report: "processed data" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const params = {
        idSite: 1,
        period: "day" as const,
        date: "today",
        apiModule: "Actions",
        apiAction: "getPageUrls",
      };

      const result = await apiModule.getProcessedReport(params);

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getProcessedReport",
        params
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { report: "processed data" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const params = {
        idSite: 1,
        period: "day" as const,
        date: "today",
        apiModule: "Actions",
        apiAction: "getPageUrls",
        segment: "deviceType==desktop",
        apiParameters: { filter_limit: 10 },
        idGoal: 1,
        language: "en",
        showTimer: true,
        hideMetricsDoc: true,
        idSubtable: 2,
        showRawMetrics: true,
        format_metrics: true,
        idDimension: 3,
      };

      const result = await apiModule.getProcessedReport(params);

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getProcessedReport",
        params
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getReportPagesMetadata", () => {
    it("should call the API with idSite when provided", async () => {
      const mockResponse = { pages: ["page1", "page2"] };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const params = { idSite: 1 };
      const result = await apiModule.getReportPagesMetadata(params);

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getReportPagesMetadata",
        params
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API without parameters when idSite is not provided", async () => {
      const mockResponse = { pages: ["page1", "page2"] };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await apiModule.getReportPagesMetadata({});

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getReportPagesMetadata",
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getWidgetMetadata", () => {
    it("should call the API with idSite when provided", async () => {
      const mockResponse = { widgets: ["widget1", "widget2"] };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const params = { idSite: 1 };
      const result = await apiModule.getWidgetMetadata(params);

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getWidgetMetadata",
        params
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API without parameters when idSite is not provided", async () => {
      const mockResponse = { widgets: ["widget1", "widget2"] };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await apiModule.getWidgetMetadata({});

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getWidgetMetadata",
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("get", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const params = {
        idSite: 1,
        period: "day",
        date: "today",
      };

      const result = await apiModule.get(params);

      expect(mockClient.request).toHaveBeenCalledWith("API.get", params);
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const params = {
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        columns: "nb_visits,nb_actions",
      };

      const result = await apiModule.get(params);

      expect(mockClient.request).toHaveBeenCalledWith("API.get", params);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getRowEvolution", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { evolution: "data" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const params = {
        idSite: 1,
        period: "day" as const,
        date: "last30",
        apiModule: "Actions",
        apiAction: "getPageUrls",
      };

      const result = await apiModule.getRowEvolution(params);

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getRowEvolution",
        params
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getBulkRequest", () => {
    it("should call the API with array of URLs", async () => {
      const mockResponse = [{ data1: "result1" }, { data2: "result2" }];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const urls = [
        "method=Actions.getPageUrls&idSite=1&period=day&date=today",
        "method=Actions.getPageTitles&idSite=1&period=day&date=today",
      ];

      const result = await apiModule.getBulkRequest({ urls });

      expect(mockClient.request).toHaveBeenCalledWith("API.getBulkRequest", {
        urls,
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with array of request objects", async () => {
      const mockResponse = [{ data1: "result1" }, { data2: "result2" }];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const urls = [
        {
          method: "Actions.getPageUrls",
          idSite: 1,
          period: "day",
          date: "today",
        },
        {
          method: "Actions.getPageTitles",
          idSite: 1,
          period: "day",
          date: "today",
        },
      ];

      const result = await apiModule.getBulkRequest({ urls });

      expect(mockClient.request).toHaveBeenCalledWith("API.getBulkRequest", {
        urls,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("isPluginActivated", () => {
    it("should call the API with plugin name and return boolean result", async () => {
      mockClient.request.mockResolvedValueOnce({ value: true });

      const result = await apiModule.isPluginActivated({
        pluginName: "CustomDimensions",
      });

      expect(mockClient.request).toHaveBeenCalledWith("API.isPluginActivated", {
        pluginName: "CustomDimensions",
      });
      expect(result).toBe(true);
    });

    it("should handle negative plugin activation status", async () => {
      mockClient.request.mockResolvedValueOnce({ value: false });

      const result = await apiModule.isPluginActivated({
        pluginName: "NonExistentPlugin",
      });

      expect(mockClient.request).toHaveBeenCalledWith("API.isPluginActivated", {
        pluginName: "NonExistentPlugin",
      });
      expect(result).toBe(false);
    });
  });

  describe("getSuggestedValuesForSegment", () => {
    it("should call the API with segment name and idSite when provided", async () => {
      const mockResponse = ["value1", "value2"];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const params = {
        segmentName: "countryCode",
        idSite: 1,
      };

      const result = await apiModule.getSuggestedValuesForSegment(params);

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getSuggestedValuesForSegment",
        params
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with only segment name when idSite is not provided", async () => {
      const mockResponse = ["value1", "value2"];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const params = {
        segmentName: "countryCode",
      };

      const result = await apiModule.getSuggestedValuesForSegment(params);

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getSuggestedValuesForSegment",
        params
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getPagesComparisonsDisabledFor", () => {
    it("should call the API with no parameters", async () => {
      const mockResponse = ["plugin1", "plugin2"];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await apiModule.getPagesComparisonsDisabledFor({});

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getPagesComparisonsDisabledFor",
        {} // Pass empty object
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getGlossaryReports", () => {
    it("should call the API with idSite parameter", async () => {
      const mockResponse = { reports: ["report1", "report2"] };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const params = { idSite: 1 };
      const result = await apiModule.getGlossaryReports(params);

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getGlossaryReports",
        params
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getGlossaryMetrics", () => {
    it("should call the API with idSite parameter", async () => {
      const mockResponse = { metrics: ["metric1", "metric2"] };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const params = { idSite: 1 };
      const result = await apiModule.getGlossaryMetrics(params);

      expect(mockClient.request).toHaveBeenCalledWith(
        "API.getGlossaryMetrics",
        params
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
