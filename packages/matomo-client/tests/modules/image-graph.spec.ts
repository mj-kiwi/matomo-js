import { describe, it, expect, vi, beforeEach } from "vitest";
import { ImageGraphModule, CoreReportingClient } from "../../src/index";

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

describe("ImageGraphModule", () => {
  let imageGraphModule: ImageGraphModule;
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
    imageGraphModule = new ImageGraphModule(clientInstance);
  });

  describe("get", () => {
    it("should call the API with required parameters", async () => {
      await imageGraphModule.get({
        idSite: 1,
        period: "day",
        date: "yesterday",
        apiModule: "VisitsSummary",
        apiAction: "get",
      });

      expect(mockClient.request).toHaveBeenCalledWith("ImageGraph.get", {
        idSite: 1,
        period: "day",
        date: "yesterday",
        apiModule: "VisitsSummary",
        apiAction: "get",
      });
    });

    it("should include optional parameters when provided", async () => {
      await imageGraphModule.get({
        idSite: 1,
        period: "day",
        date: "yesterday",
        apiModule: "VisitsSummary",
        apiAction: "get",
        graphType: "evolution",
        outputType: "1",
        columns: "nb_visits",
        labels: "Visits",
        showLegend: false,
        width: "800",
        height: "400",
        fontSize: "12",
        legendFontSize: "10",
        aliasedGraph: false,
        idGoal: "1",
        colors: "ff0000,00ff00,0000ff",
        textColor: "333333",
        backgroundColor: "F3F3F3",
        gridColor: "DDDDDD",
        idSubtable: "1",
        legendAppendMetric: false,
        segment: "deviceType==desktop",
        idDimension: "1",
      });

      expect(mockClient.request).toHaveBeenCalledWith("ImageGraph.get", {
        idSite: 1,
        period: "day",
        date: "yesterday",
        apiModule: "VisitsSummary",
        apiAction: "get",
        graphType: "evolution",
        outputType: "1",
        columns: "nb_visits",
        labels: "Visits",
        showLegend: false,
        width: "800",
        height: "400",
        fontSize: "12",
        legendFontSize: "10",
        aliasedGraph: false,
        idGoal: "1",
        colors: "ff0000,00ff00,0000ff",
        textColor: "333333",
        backgroundColor: "F3F3F3",
        gridColor: "DDDDDD",
        idSubtable: "1",
        legendAppendMetric: false,
        segment: "deviceType==desktop",
        idDimension: "1",
      });
    });

    it("should use default values for optional parameters when not provided", async () => {
      await imageGraphModule.get({
        idSite: 1,
        period: "day",
        date: "yesterday",
        apiModule: "VisitsSummary",
        apiAction: "get",
        graphType: "pie",
      });

      expect(mockClient.request).toHaveBeenCalledWith("ImageGraph.get", {
        idSite: 1,
        period: "day",
        date: "yesterday",
        apiModule: "VisitsSummary",
        apiAction: "get",
        graphType: "pie",
      });
    });
  });
});
