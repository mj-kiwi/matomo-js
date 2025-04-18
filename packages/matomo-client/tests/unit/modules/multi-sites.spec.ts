import { describe, it, expect, vi, beforeEach } from "vitest";
import { MultiSitesModule, CoreReportingClient } from "../../../src/index";

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

describe("MultiSitesModule", () => {
  let multiSitesModule: MultiSitesModule;
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
    multiSitesModule = new MultiSitesModule(clientInstance);
  });

  describe("getAll", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        { label: "Site 1", nb_visits: 100 },
        { label: "Site 2", nb_visits: 200 },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await multiSitesModule.getAll("day", "2023-01-01");

      expect(mockClient.request).toHaveBeenCalledWith("MultiSites.getAll", {
        period: "day",
        date: "2023-01-01",
        segment: undefined,
        enhanced: false,
        pattern: undefined,
        showColumns: [],
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = [
        { label: "Site 1", nb_visits: 100, revenue: 1000 },
        { label: "Site 2", nb_visits: 200, revenue: 2000 },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await multiSitesModule.getAll(
        "month",
        "2023-01-01",
        "browserName==Chrome",
        true,
        "example",
        ["nb_visits", "revenue"]
      );

      expect(mockClient.request).toHaveBeenCalledWith("MultiSites.getAll", {
        period: "month",
        date: "2023-01-01",
        segment: "browserName==Chrome",
        enhanced: true,
        pattern: "example",
        showColumns: ["nb_visits", "revenue"],
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getOne", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { label: "Site 1", nb_visits: 100 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await multiSitesModule.getOne(1, "day", "2023-01-01");

      expect(mockClient.request).toHaveBeenCalledWith("MultiSites.getOne", {
        idSite: 1,
        period: "day",
        date: "2023-01-01",
        segment: undefined,
        enhanced: false,
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { label: "Site 1", nb_visits: 100, revenue: 1000 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await multiSitesModule.getOne(
        1,
        "month",
        "2023-01-01",
        "browserName==Chrome",
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith("MultiSites.getOne", {
        idSite: 1,
        period: "month",
        date: "2023-01-01",
        segment: "browserName==Chrome",
        enhanced: true,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAllWithGroups", () => {
    it("should call the API without parameters", async () => {
      const mockResponse = [
        {
          label: "Group 1",
          sites: [
            { label: "Site 1", nb_visits: 100 },
            { label: "Site 2", nb_visits: 200 },
          ],
        },
        {
          label: "Group 2",
          sites: [{ label: "Site 3", nb_visits: 300 }],
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await multiSitesModule.getAllWithGroups();

      expect(mockClient.request).toHaveBeenCalledWith(
        "MultiSites.getAllWithGroups",
        {
          period: undefined,
          date: undefined,
          segment: undefined,
          pattern: "",
          filter_limit: 0,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = [
        {
          label: "Group 1",
          sites: [
            { label: "Site 1", nb_visits: 100 },
            { label: "Site 2", nb_visits: 200 },
          ],
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await multiSitesModule.getAllWithGroups(
        "month",
        "2023-01-01",
        "browserName==Chrome",
        "example",
        10
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "MultiSites.getAllWithGroups",
        {
          period: "month",
          date: "2023-01-01",
          segment: "browserName==Chrome",
          pattern: "example",
          filter_limit: 10,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
