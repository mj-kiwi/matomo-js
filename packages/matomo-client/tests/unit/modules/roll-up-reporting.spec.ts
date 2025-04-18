import { describe, it, expect, vi, beforeEach } from "vitest";
import { RollUpReportingModule, CoreReportingClient } from "../../../src/index";

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

describe("RollUpReportingModule", () => {
  let rollUpReportingModule: RollUpReportingModule;
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
    rollUpReportingModule = new RollUpReportingModule(clientInstance);
  });

  describe("addRollUp", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true, idSite: 10 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await rollUpReportingModule.addRollUp(
        "Combined Sites",
        [1, 2, 3],
        "UTC",
        "USD"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "RollUpReporting.addRollUp",
        {
          name: "Combined Sites",
          sourceIdSites: [1, 2, 3],
          timezone: "UTC",
          currency: "USD",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateRollUp", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await rollUpReportingModule.updateRollUp(10);

      expect(mockClient.request).toHaveBeenCalledWith(
        "RollUpReporting.updateRollUp",
        {
          idSite: 10,
          name: "",
          sourceIdSites: [],
          timezone: "",
          currency: "",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await rollUpReportingModule.updateRollUp(
        10,
        "Updated Roll-Up",
        [1, 2, 4],
        "Europe/Berlin",
        "EUR"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "RollUpReporting.updateRollUp",
        {
          idSite: 10,
          name: "Updated Roll-Up",
          sourceIdSites: [1, 2, 4],
          timezone: "Europe/Berlin",
          currency: "EUR",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getRollUps", () => {
    it("should call the API correctly", async () => {
      const mockResponse = [
        {
          idsite: 10,
          name: "Roll-Up 1",
          timezone: "UTC",
          currency: "USD",
          sources: [1, 2, 3],
        },
        {
          idsite: 11,
          name: "Roll-Up 2",
          timezone: "Europe/Berlin",
          currency: "EUR",
          sources: [4, 5],
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await rollUpReportingModule.getRollUps();

      expect(mockClient.request).toHaveBeenCalledWith(
        "RollUpReporting.getRollUps"
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
