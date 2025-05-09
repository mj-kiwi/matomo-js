import { describe, it, expect, vi, beforeEach } from "vitest";
import { ResolutionModule, CoreReportingClient } from "../../src/index";

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

describe("ResolutionModule", () => {
  let resolutionModule: ResolutionModule;
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
    resolutionModule = new ResolutionModule(clientInstance);
  });

  describe("getResolution", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        { label: "1920x1080", nb_visits: 100 },
        { label: "1366x768", nb_visits: 50 },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await resolutionModule.getResolution({
        idSite: 1,
        period: "day",
        date: "2023-01-01",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Resolution.getResolution",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = [
        { label: "1920x1080", nb_visits: 60 },
        { label: "1366x768", nb_visits: 30 },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await resolutionModule.getResolution({
        idSite: 1,
        period: "day",
        date: "2023-01-01",
        segment: "browserName==Chrome",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Resolution.getResolution",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: "browserName==Chrome",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getConfiguration", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        { label: "Windows / Chrome / 1920x1080", nb_visits: 40 },
        { label: "macOS / Safari / 2560x1440", nb_visits: 30 },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await resolutionModule.getConfiguration({
        idSite: 1,
        period: "day",
        date: "2023-01-01",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Resolution.getConfiguration",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = [
        { label: "Windows / Chrome / 1920x1080", nb_visits: 25 },
        { label: "macOS / Safari / 2560x1440", nb_visits: 20 },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await resolutionModule.getConfiguration({
        idSite: 1,
        period: "day",
        date: "2023-01-01",
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Resolution.getConfiguration",
        {
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
