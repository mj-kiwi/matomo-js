import { describe, it, expect, vi, beforeEach } from "vitest";
import { VisitTimeModule, CoreReportingClient } from "@mj-kiwi/matomo-client";

// Mock CoreReportingClient
vi.mock(import("@mj-kiwi/matomo-client"), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe("VisitTimeModule", () => {
  let visitTimeModule: VisitTimeModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and VisitTime module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    visitTimeModule = new VisitTimeModule(clientInstance);
  });

  describe("getVisitInformationPerLocalTime", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await visitTimeModule.getVisitInformationPerLocalTime(
        1,
        "day",
        "today"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "VisitTime.getVisitInformationPerLocalTime",
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

      const result = await visitTimeModule.getVisitInformationPerLocalTime(
        1,
        "day",
        "today",
        "deviceType==desktop"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "VisitTime.getVisitInformationPerLocalTime",
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

  describe("getVisitInformationPerServerTime", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await visitTimeModule.getVisitInformationPerServerTime(
        1,
        "day",
        "today"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "VisitTime.getVisitInformationPerServerTime",
        {
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

      const result = await visitTimeModule.getVisitInformationPerServerTime(
        1,
        "day",
        "today",
        "deviceType==desktop",
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "VisitTime.getVisitInformationPerServerTime",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          hideFutureHoursWhenToday: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getByDayOfWeek", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await visitTimeModule.getByDayOfWeek(1, "day", "today");

      expect(mockClient.request).toHaveBeenCalledWith(
        "VisitTime.getByDayOfWeek",
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

      const result = await visitTimeModule.getByDayOfWeek(
        1,
        "day",
        "today",
        "deviceType==desktop"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "VisitTime.getByDayOfWeek",
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
