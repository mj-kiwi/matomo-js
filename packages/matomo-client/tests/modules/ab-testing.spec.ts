import { describe, it, expect, vi, beforeEach } from "vitest";
import { AbTestingModule, CoreReportingClient } from "../../src/index";

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

describe("AbTestingModule", () => {
  let abTestingModule: AbTestingModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and AbTesting module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    abTestingModule = new AbTestingModule(clientInstance);
  });

  describe("getMetricsOverview", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { metrics: { visits: 1000, conversions: 50 } };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.getMetricsOverview(
        1,
        "day",
        "today",
        123
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getMetricsOverview",
        {
          idSite: 1,
          period: "day",
          date: "today",
          idExperiment: 123,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter when provided", async () => {
      const mockResponse = { metrics: { visits: 500, conversions: 25 } };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.getMetricsOverview(
        1,
        "week",
        "2023-01-01",
        123,
        "deviceType==desktop"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getMetricsOverview",
        {
          idSite: 1,
          period: "week",
          date: "2023-01-01",
          idExperiment: 123,
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getMetricDetails", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        details: { variation1: { value: 100 }, variation2: { value: 120 } },
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.getMetricDetails(
        1,
        "month",
        "last30",
        123,
        "revenue"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getMetricDetails",
        {
          idSite: 1,
          period: "month",
          date: "last30",
          idExperiment: 123,
          successMetric: "revenue",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter when provided", async () => {
      const mockResponse = {
        details: { variation1: { value: 50 }, variation2: { value: 60 } },
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.getMetricDetails(
        1,
        "month",
        "last30",
        123,
        "revenue",
        "countryCode==US"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getMetricDetails",
        {
          idSite: 1,
          period: "month",
          date: "last30",
          idExperiment: 123,
          successMetric: "revenue",
          segment: "countryCode==US",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("addExperiment", () => {
    it("should call the API with all required parameters", async () => {
      const mockResponse = { id: 123, status: "created" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const variations = [
        { name: "Control", percentage: 50 },
        { name: "Variation A", percentage: 50 },
      ];
      const includedTargets = [
        { attribute: "url", type: "contains", value: "/checkout" },
      ];
      const successMetrics = [{ name: "revenue", primary: true }];

      const result = await abTestingModule.addExperiment(
        1,
        "Checkout Button Test",
        "Changing button color will increase conversions",
        "Testing green vs blue checkout button",
        variations,
        includedTargets,
        successMetrics
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.addExperiment",
        {
          idSite: 1,
          name: "Checkout Button Test",
          hypothesis: "Changing button color will increase conversions",
          description: "Testing green vs blue checkout button",
          variations,
          includedTargets,
          successMetrics,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateExperiment", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { status: "updated" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const variations = [
        { name: "Control", percentage: 50 },
        { name: "Variation A", percentage: 50 },
      ];
      const includedTargets = [
        { attribute: "url", type: "contains", value: "/checkout" },
      ];
      const successMetrics = [{ name: "revenue", primary: true }];

      const result = await abTestingModule.updateExperiment(
        123,
        1,
        "Updated Checkout Test",
        "Updated description",
        "Updated hypothesis",
        variations,
        95,
        10,
        100,
        successMetrics,
        includedTargets
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.updateExperiment",
        {
          idExperiment: 123,
          idSite: 1,
          name: "Updated Checkout Test",
          description: "Updated description",
          hypothesis: "Updated hypothesis",
          variations,
          confidenceThreshold: 95,
          mdeRelative: 10,
          percentageParticipants: 100,
          successMetrics,
          includedTargets,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all optional parameters", async () => {
      const mockResponse = { status: "updated" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const variations = [
        { name: "Control", percentage: 50 },
        { name: "Variation A", percentage: 50 },
      ];
      const includedTargets = [
        { attribute: "url", type: "contains", value: "/checkout" },
      ];
      const excludedTargets = [
        { attribute: "device", type: "equals", value: "mobile" },
      ];
      const successMetrics = [{ name: "revenue", primary: true }];

      const result = await abTestingModule.updateExperiment(
        123,
        1,
        "Updated Checkout Test",
        "Updated description",
        "Updated hypothesis",
        variations,
        95,
        10,
        100,
        successMetrics,
        includedTargets,
        excludedTargets,
        "2023-01-01",
        "2023-01-31",
        true,
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.updateExperiment",
        {
          idExperiment: 123,
          idSite: 1,
          name: "Updated Checkout Test",
          description: "Updated description",
          hypothesis: "Updated hypothesis",
          variations,
          confidenceThreshold: 95,
          mdeRelative: 10,
          percentageParticipants: 100,
          successMetrics,
          includedTargets,
          excludedTargets,
          startDate: "2023-01-01",
          endDate: "2023-01-31",
          forwardUtmParams: true,
          forwardAllQueryParams: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("startExperiment", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { status: "running" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.startExperiment(123, 1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.startExperiment",
        {
          idExperiment: 123,
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("finishExperiment", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { status: "finished" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.finishExperiment(123, 1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.finishExperiment",
        {
          idExperiment: 123,
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("archiveExperiment", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { status: "archived" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.archiveExperiment(123, 1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.archiveExperiment",
        {
          idExperiment: 123,
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getJsIncludeTemplate", () => {
    it("should call the API without parameters", async () => {
      const mockResponse = { code: "// JavaScript code template" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.getJsIncludeTemplate();

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getJsIncludeTemplate"
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getJsExperimentTemplate", () => {
    it("should call the API with experiment and site IDs", async () => {
      const mockResponse = { code: "// JavaScript experiment template" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.getJsExperimentTemplate(123, 1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getJsExperimentTemplate",
        {
          idExperiment: 123,
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAllExperiments", () => {
    it("should call the API with site ID", async () => {
      const mockResponse = [
        { id: 123, name: "Test 1" },
        { id: 124, name: "Test 2" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.getAllExperiments(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getAllExperiments",
        { idSite: 1 }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getActiveExperiments", () => {
    it("should call the API with site ID", async () => {
      const mockResponse = [{ id: 123, name: "Test 1", status: "running" }];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.getActiveExperiments(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getActiveExperiments",
        { idSite: 1 }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getExperimentsByStatuses", () => {
    it("should call the API with site ID and statuses array", async () => {
      const mockResponse = [
        { id: 123, name: "Test 1", status: "running" },
        { id: 124, name: "Test 2", status: "finished" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.getExperimentsByStatuses(1, [
        "running",
        "finished",
      ]);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getExperimentsByStatuses",
        {
          idSite: 1,
          statuses: ["running", "finished"],
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getExperiment", () => {
    it("should call the API with experiment and site IDs", async () => {
      const mockResponse = { id: 123, name: "Test 1", status: "running" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.getExperiment(123, 1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getExperiment",
        {
          idExperiment: 123,
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteExperiment", () => {
    it("should call the API with experiment and site IDs", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.deleteExperiment(123, 1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.deleteExperiment",
        {
          idExperiment: 123,
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableStatuses", () => {
    it("should call the API with site ID", async () => {
      const mockResponse = ["created", "running", "finished", "archived"];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.getAvailableStatuses(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getAvailableStatuses",
        { idSite: 1 }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableSuccessMetrics", () => {
    it("should call the API with site ID", async () => {
      const mockResponse = [
        "pageviews",
        "unique_visitors",
        "revenue",
        "conversion_rate",
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.getAvailableSuccessMetrics(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getAvailableSuccessMetrics",
        { idSite: 1 }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableTargetAttributes", () => {
    it("should call the API without parameters", async () => {
      const mockResponse = ["url", "device", "browser", "country", "language"];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.getAvailableTargetAttributes();

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getAvailableTargetAttributes"
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getExperimentsWithReports", () => {
    it("should call the API with site ID", async () => {
      const mockResponse = [
        { id: 123, name: "Test 1", hasReports: true },
        { id: 124, name: "Test 2", hasReports: false },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await abTestingModule.getExperimentsWithReports(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getExperimentsWithReports",
        { idSite: 1 }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
