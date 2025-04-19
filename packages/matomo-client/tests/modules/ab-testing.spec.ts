import { AbTestingModule } from "../../src/modules/ab-testing";
import { CoreReportingClient } from "../../src/modules/core";
import { expect, describe, it, beforeEach, vi } from "vitest";

describe("AbTestingModule", () => {
  let abTestingModule: AbTestingModule;
  let mockClient: CoreReportingClient;

  beforeEach(() => {
    // Create a mock client
    mockClient = {
      request: vi.fn().mockResolvedValue({ success: true }),
    } as unknown as CoreReportingClient;

    // Initialize the AB Testing module with the mock client
    abTestingModule = new AbTestingModule(mockClient);
  });

  describe("getMetricsOverview", () => {
    it("should call request with correct method and parameters", async () => {
      const params = {
        idSite: 1,
        period: "day",
        date: "2023-01-01",
        idExperiment: 5,
        segment: "country==US",
      };

      await abTestingModule.getMetricsOverview(params);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getMetricsOverview",
        params
      );
    });
  });

  describe("getMetricDetails", () => {
    it("should call request with correct method and parameters", async () => {
      const params = {
        idSite: 1,
        period: "day",
        date: "2023-01-01",
        idExperiment: 5,
        successMetric: "revenue",
        segment: "country==US",
      };

      await abTestingModule.getMetricDetails(params);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getMetricDetails",
        params
      );
    });
  });

  describe("addExperiment", () => {
    it("should call request with correct method and parameters", async () => {
      const params = {
        idSite: 1,
        name: "Homepage Test",
        hypothesis: "New design will increase conversions",
        description: "Testing new homepage layout",
        variations: [
          { name: "Original", percentage: 50 },
          { name: "Variation A", percentage: 50 },
        ],
        includedTargets: [
          { attribute: "url", type: "contains", value: "homepage" },
        ],
        successMetrics: [{ name: "revenue", value: "increase" }],
      };

      await abTestingModule.addExperiment(params);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.addExperiment",
        params
      );
    });
  });

  describe("getExperimentsByStatuses", () => {
    it("should call request with correct method and parameters", async () => {
      const params = {
        idSite: 1,
        statuses: ["active", "finished"],
      };

      await abTestingModule.getExperimentsByStatuses(params);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getExperimentsByStatuses",
        params
      );
    });
  });

  describe("simpler operations", () => {
    it("should handle experiment operations with idExperiment and idSite", async () => {
      const params = {
        idExperiment: 5,
        idSite: 1,
      };

      await abTestingModule.startExperiment(params);
      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.startExperiment",
        params
      );

      await abTestingModule.finishExperiment(params);
      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.finishExperiment",
        params
      );

      await abTestingModule.deleteExperiment(params);
      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.deleteExperiment",
        params
      );
    });
  });

  describe("methods without parameters", () => {
    it("should handle methods that require no parameters", async () => {
      await abTestingModule.getJsIncludeTemplate({});
      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getJsIncludeTemplate",
        {} // Pass empty object
      );

      await abTestingModule.getAvailableTargetAttributes({});
      expect(mockClient.request).toHaveBeenCalledWith(
        "AbTesting.getAvailableTargetAttributes",
        {} // Pass empty object
      );
    });
  });
});
