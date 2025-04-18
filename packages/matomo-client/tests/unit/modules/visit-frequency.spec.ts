import { describe, it, expect, vi, beforeEach } from "vitest";
import { VisitFrequencyModule, CoreReportingClient } from "../../../src/index";

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

describe("VisitFrequencyModule", () => {
  let visitFrequencyModule: VisitFrequencyModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and VisitFrequency module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    visitFrequencyModule = new VisitFrequencyModule(clientInstance);
  });

  describe("get", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await visitFrequencyModule.get(1, "day", "today");

      expect(mockClient.request).toHaveBeenCalledWith("VisitFrequency.get", {
        idSite: 1,
        period: "day",
        date: "today",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await visitFrequencyModule.get(
        1,
        "day",
        "today",
        "deviceType==desktop",
        "nb_visits,nb_actions"
      );

      expect(mockClient.request).toHaveBeenCalledWith("VisitFrequency.get", {
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        columns: "nb_visits,nb_actions",
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
