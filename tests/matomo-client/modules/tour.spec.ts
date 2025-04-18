import { describe, it, expect, vi, beforeEach } from "vitest";
import { TourModule, CoreReportingClient } from "@mj-kiwi/matomo-client";

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

describe("TourModule", () => {
  let tourModule: TourModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and Tour module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    tourModule = new TourModule(clientInstance);
  });

  describe("getChallenges", () => {
    it("should call the API", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tourModule.getChallenges();

      expect(mockClient.request).toHaveBeenCalledWith("Tour.getChallenges", {});
      expect(result).toEqual(mockResponse);
    });
  });

  describe("skipChallenge", () => {
    it("should call the API with the provided ID", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tourModule.skipChallenge("challenge1");

      expect(mockClient.request).toHaveBeenCalledWith("Tour.skipChallenge", {
        id: "challenge1",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getLevel", () => {
    it("should call the API", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tourModule.getLevel();

      expect(mockClient.request).toHaveBeenCalledWith("Tour.getLevel", {});
      expect(result).toEqual(mockResponse);
    });
  });
});
