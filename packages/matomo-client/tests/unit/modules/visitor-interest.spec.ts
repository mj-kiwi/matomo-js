import { describe, it, expect, vi, beforeEach } from "vitest";
import { VisitorInterestModule, CoreReportingClient } from "../../../src/index";

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

describe("VisitorInterestModule", () => {
  let visitorInterestModule: VisitorInterestModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and VisitorInterest module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    visitorInterestModule = new VisitorInterestModule(clientInstance);
  });

  describe("getNumberOfVisitsPerVisitDuration", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await visitorInterestModule.getNumberOfVisitsPerVisitDuration(
          1,
          "day",
          "today"
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "VisitorInterest.getNumberOfVisitsPerVisitDuration",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await visitorInterestModule.getNumberOfVisitsPerVisitDuration(
          1,
          "day",
          "today",
          "deviceType==desktop"
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "VisitorInterest.getNumberOfVisitsPerVisitDuration",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getNumberOfVisitsPerPage", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await visitorInterestModule.getNumberOfVisitsPerPage(
        1,
        "day",
        "today"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "VisitorInterest.getNumberOfVisitsPerPage",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await visitorInterestModule.getNumberOfVisitsPerPage(
        1,
        "day",
        "today",
        "deviceType==desktop"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "VisitorInterest.getNumberOfVisitsPerPage",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getNumberOfVisitsByDaysSinceLast", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await visitorInterestModule.getNumberOfVisitsByDaysSinceLast(
          1,
          "day",
          "today"
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "VisitorInterest.getNumberOfVisitsByDaysSinceLast",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await visitorInterestModule.getNumberOfVisitsByDaysSinceLast(
          1,
          "day",
          "today",
          "deviceType==desktop"
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "VisitorInterest.getNumberOfVisitsByDaysSinceLast",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getNumberOfVisitsByVisitCount", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await visitorInterestModule.getNumberOfVisitsByVisitCount(
        1,
        "day",
        "today"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "VisitorInterest.getNumberOfVisitsByVisitCount",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await visitorInterestModule.getNumberOfVisitsByVisitCount(
        1,
        "day",
        "today",
        "deviceType==desktop"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "VisitorInterest.getNumberOfVisitsByVisitCount",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
