import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserIdModule, CoreReportingClient } from "../../../src/index";

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

describe("UserIdModule", () => {
  let userIdModule: UserIdModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and UserId module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    userIdModule = new UserIdModule(clientInstance);
  });

  describe("getUsers", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await userIdModule.getUsers(1, "day", "today");

      expect(mockClient.request).toHaveBeenCalledWith("UserId.getUsers", {
        idSite: 1,
        period: "day",
        date: "today",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await userIdModule.getUsers(
        1,
        "day",
        "today",
        "deviceType==desktop"
      );

      expect(mockClient.request).toHaveBeenCalledWith("UserId.getUsers", {
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
