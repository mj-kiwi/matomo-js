import { describe, it, expect, vi, beforeEach } from "vitest";
import { InsightsModule, CoreReportingClient } from "../../src/index";

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

describe("InsightsModule", () => {
  let insightsModule: InsightsModule;
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
    insightsModule = new InsightsModule(clientInstance);
  });

  describe("canGenerateInsights", () => {
    it("should call the API with required parameters", async () => {
      await insightsModule.canGenerateInsights({
        date: "yesterday",
        period: "day",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "Insights.canGenerateInsights",
        {
          date: "yesterday",
          period: "day",
        }
      );
    });
  });

  describe("getInsightsOverview", () => {
    it("should call the API with required parameters", async () => {
      await insightsModule.getInsightsOverview({
        idSite: 1,
        period: "day",
        date: "yesterday",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "Insights.getInsightsOverview",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
        }
      );
    });

    it("should include segment when provided", async () => {
      await insightsModule.getInsightsOverview({
        idSite: 1,
        period: "day",
        date: "yesterday",
        segment: "deviceType==desktop",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "Insights.getInsightsOverview",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          segment: "deviceType==desktop",
        }
      );
    });
  });

  describe("getMoversAndShakersOverview", () => {
    it("should call the API with required parameters", async () => {
      await insightsModule.getMoversAndShakersOverview({
        idSite: 1,
        period: "day",
        date: "yesterday",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "Insights.getMoversAndShakersOverview",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
        }
      );
    });

    it("should include segment when provided", async () => {
      await insightsModule.getMoversAndShakersOverview({
        idSite: 1,
        period: "day",
        date: "yesterday",
        segment: "deviceType==desktop",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "Insights.getMoversAndShakersOverview",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          segment: "deviceType==desktop",
        }
      );
    });
  });

  describe("getMoversAndShakers", () => {
    it("should call the API with required parameters", async () => {
      await insightsModule.getMoversAndShakers({
        idSite: 1,
        period: "day",
        date: "yesterday",
        reportUniqueId: "Actions.getPageUrls",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "Insights.getMoversAndShakers",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          reportUniqueId: "Actions.getPageUrls",
        }
      );
    });

    it("should include optional parameters when provided", async () => {
      await insightsModule.getMoversAndShakers({
        idSite: 1,
        period: "day",
        date: "yesterday",
        reportUniqueId: "Actions.getPageUrls",
        segment: "deviceType==desktop",
        comparedToXPeriods: "2",
        limitIncreaser: "5",
        limitDecreaser: "3",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "Insights.getMoversAndShakers",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          reportUniqueId: "Actions.getPageUrls",
          segment: "deviceType==desktop",
          comparedToXPeriods: "2",
          limitIncreaser: "5",
          limitDecreaser: "3",
        }
      );
    });
  });

  describe("getInsights", () => {
    it("should call the API with required parameters", async () => {
      await insightsModule.getInsights({
        idSite: 1,
        period: "day",
        date: "yesterday",
        reportUniqueId: "Actions.getPageUrls",
      });
      expect(mockClient.request).toHaveBeenCalledWith("Insights.getInsights", {
        idSite: 1,
        period: "day",
        date: "yesterday",
        reportUniqueId: "Actions.getPageUrls",
      });
    });

    it("should include optional parameters when provided", async () => {
      await insightsModule.getInsights({
        idSite: 1,
        period: "day",
        date: "yesterday",
        reportUniqueId: "Actions.getPageUrls",
        segment: "deviceType==desktop",
        limitIncreaser: "10",
        limitDecreaser: "8",
        filterBy: "movers",
        minImpactPercent: "5",
        minGrowthPercent: "25",
        comparedToXPeriods: "3",
        orderBy: "percent",
      });
      expect(mockClient.request).toHaveBeenCalledWith("Insights.getInsights", {
        idSite: 1,
        period: "day",
        date: "yesterday",
        reportUniqueId: "Actions.getPageUrls",
        segment: "deviceType==desktop",
        limitIncreaser: "10",
        limitDecreaser: "8",
        filterBy: "movers",
        minImpactPercent: "5",
        minGrowthPercent: "25",
        comparedToXPeriods: "3",
        orderBy: "percent",
      });
    });
  });
});
