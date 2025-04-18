import { describe, it, expect, vi, beforeEach } from "vitest";
import { TwoFactorAuthModule, CoreReportingClient } from "../../../src/index";

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

describe("TwoFactorAuthModule", () => {
  let twoFactorAuthModule: TwoFactorAuthModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and TwoFactorAuth module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    twoFactorAuthModule = new TwoFactorAuthModule(clientInstance);
  });

  describe("resetTwoFactorAuth", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await twoFactorAuthModule.resetTwoFactorAuth("user1");

      expect(mockClient.request).toHaveBeenCalledWith(
        "TwoFactorAuth.resetTwoFactorAuth",
        {
          userLogin: "user1",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await twoFactorAuthModule.resetTwoFactorAuth(
        "user1",
        "password123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "TwoFactorAuth.resetTwoFactorAuth",
        {
          userLogin: "user1",
          passwordConfirmation: "password123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
