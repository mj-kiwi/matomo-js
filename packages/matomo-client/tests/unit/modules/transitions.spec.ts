import { describe, it, expect, vi, beforeEach } from "vitest";
import { TransitionsModule, CoreReportingClient } from "../../../src/index";

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

describe("TransitionsModule", () => {
  let transitionsModule: TransitionsModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and Transitions module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    transitionsModule = new TransitionsModule(clientInstance);
  });

  describe("getTransitionsForPageTitle", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await transitionsModule.getTransitionsForPageTitle(
        "Home Page",
        1,
        "day",
        "today"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Transitions.getTransitionsForPageTitle",
        {
          pageTitle: "Home Page",
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await transitionsModule.getTransitionsForPageTitle(
        "Home Page",
        1,
        "day",
        "today",
        "deviceType==desktop",
        100
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Transitions.getTransitionsForPageTitle",
        {
          pageTitle: "Home Page",
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          limitBeforeGrouping: 100,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getTransitionsForPageUrl", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await transitionsModule.getTransitionsForPageUrl(
        "https://example.org/home",
        1,
        "day",
        "today"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Transitions.getTransitionsForPageUrl",
        {
          pageUrl: "https://example.org/home",
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await transitionsModule.getTransitionsForPageUrl(
        "https://example.org/home",
        1,
        "day",
        "today",
        "deviceType==desktop",
        100
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Transitions.getTransitionsForPageUrl",
        {
          pageUrl: "https://example.org/home",
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          limitBeforeGrouping: 100,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getTransitionsForAction", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await transitionsModule.getTransitionsForAction(
        "Home",
        "page",
        1,
        "day",
        "today"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Transitions.getTransitionsForAction",
        {
          actionName: "Home",
          actionType: "page",
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await transitionsModule.getTransitionsForAction(
        "Home",
        "page",
        1,
        "day",
        "today",
        "deviceType==desktop",
        100,
        "followingPages"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "Transitions.getTransitionsForAction",
        {
          actionName: "Home",
          actionType: "page",
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          limitBeforeGrouping: 100,
          parts: "followingPages",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getTranslations", () => {
    it("should call the API", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await transitionsModule.getTranslations();

      expect(mockClient.request).toHaveBeenCalledWith(
        "Transitions.getTranslations",
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("isPeriodAllowed", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await transitionsModule.isPeriodAllowed(1, "day", "today");

      expect(mockClient.request).toHaveBeenCalledWith(
        "Transitions.isPeriodAllowed",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
