import { describe, it, expect, vi, beforeEach } from "vitest";
import { OverlayModule, CoreReportingClient } from "../../src/index";

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

describe("OverlayModule", () => {
  let overlayModule: OverlayModule;
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
    overlayModule = new OverlayModule(clientInstance);
  });

  describe("getTranslations", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        General_Close: "Close",
        General_Next: "Next",
        General_Previous: "Previous",
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await overlayModule.getTranslations(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "Overlay.getTranslations",
        {
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getFollowingPages", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        { label: "/page1.html", visits: 42 },
        { label: "/page2.html", visits: 21 },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await overlayModule.getFollowingPages(
        "https://example.com/",
        1,
        "day",
        "2023-01-01"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Overlay.getFollowingPages",
        {
          url: "https://example.com/",
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = [
        { label: "/page1.html", visits: 20 },
        { label: "/page2.html", visits: 10 },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await overlayModule.getFollowingPages(
        "https://example.com/",
        1,
        "day",
        "2023-01-01",
        "browserName==Chrome"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Overlay.getFollowingPages",
        {
          url: "https://example.com/",
          idSite: 1,
          period: "day",
          date: "2023-01-01",
          segment: "browserName==Chrome",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
