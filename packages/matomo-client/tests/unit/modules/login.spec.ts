import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoginModule, CoreReportingClient } from "../../../src/index";

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

describe("LoginModule", () => {
  let loginModule: LoginModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and Login module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    loginModule = new LoginModule(clientInstance);
  });

  describe("unblockBruteForceIPs", () => {
    it("should call the API correctly", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await loginModule.unblockBruteForceIPs();

      expect(mockClient.request).toHaveBeenCalledWith(
        "Login.unblockBruteForceIPs"
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
