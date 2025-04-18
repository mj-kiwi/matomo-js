import { describe, it, expect, vi, beforeEach } from "vitest";
import { MobileMessagingModule, CoreReportingClient } from "../../../src/index";

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

describe("MobileMessagingModule", () => {
  let mobileMessagingModule: MobileMessagingModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and MobileMessaging module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    mobileMessagingModule = new MobileMessagingModule(clientInstance);
  });

  describe("areSMSAPICredentialProvided", () => {
    it("should call the API without parameters", async () => {
      const mockResponse = true;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mobileMessagingModule.areSMSAPICredentialProvided();

      expect(mockClient.request).toHaveBeenCalledWith(
        "MobileMessaging.areSMSAPICredentialProvided"
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getSMSProvider", () => {
    it("should call the API without parameters", async () => {
      const mockResponse = "nexmo";
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mobileMessagingModule.getSMSProvider();

      expect(mockClient.request).toHaveBeenCalledWith(
        "MobileMessaging.getSMSProvider"
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("setSMSAPICredential", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = true;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mobileMessagingModule.setSMSAPICredential("nexmo");

      expect(mockClient.request).toHaveBeenCalledWith(
        "MobileMessaging.setSMSAPICredential",
        {
          provider: "nexmo",
          credentials: {},
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with credentials", async () => {
      const mockResponse = true;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const credentials = { apiKey: "key123", apiSecret: "secret456" };
      const result = await mobileMessagingModule.setSMSAPICredential(
        "nexmo",
        credentials
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "MobileMessaging.setSMSAPICredential",
        {
          provider: "nexmo",
          credentials,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("addPhoneNumber", () => {
    it("should call the API with phoneNumber parameter", async () => {
      const mockResponse = true;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mobileMessagingModule.addPhoneNumber("+1234567890");

      expect(mockClient.request).toHaveBeenCalledWith(
        "MobileMessaging.addPhoneNumber",
        {
          phoneNumber: "+1234567890",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("resendVerificationCode", () => {
    it("should call the API with phoneNumber parameter", async () => {
      const mockResponse = true;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await mobileMessagingModule.resendVerificationCode("+1234567890");

      expect(mockClient.request).toHaveBeenCalledWith(
        "MobileMessaging.resendVerificationCode",
        {
          phoneNumber: "+1234567890",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCreditLeft", () => {
    it("should call the API without parameters", async () => {
      const mockResponse = 42;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mobileMessagingModule.getCreditLeft();

      expect(mockClient.request).toHaveBeenCalledWith(
        "MobileMessaging.getCreditLeft"
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getPhoneNumbers", () => {
    it("should call the API without parameters", async () => {
      const mockResponse = {
        "+1234567890": "verified",
        "+0987654321": "pending",
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mobileMessagingModule.getPhoneNumbers();

      expect(mockClient.request).toHaveBeenCalledWith(
        "MobileMessaging.getPhoneNumbers"
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("removePhoneNumber", () => {
    it("should call the API with phoneNumber parameter", async () => {
      const mockResponse = true;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await mobileMessagingModule.removePhoneNumber("+1234567890");

      expect(mockClient.request).toHaveBeenCalledWith(
        "MobileMessaging.removePhoneNumber",
        {
          phoneNumber: "+1234567890",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("validatePhoneNumber", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = true;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mobileMessagingModule.validatePhoneNumber(
        "+1234567890",
        "123456"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "MobileMessaging.validatePhoneNumber",
        {
          phoneNumber: "+1234567890",
          verificationCode: "123456",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteSMSAPICredential", () => {
    it("should call the API without parameters", async () => {
      const mockResponse = true;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mobileMessagingModule.deleteSMSAPICredential();

      expect(mockClient.request).toHaveBeenCalledWith(
        "MobileMessaging.deleteSMSAPICredential"
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("setDelegatedManagement", () => {
    it("should call the API with delegatedManagement parameter", async () => {
      const mockResponse = true;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mobileMessagingModule.setDelegatedManagement(true);

      expect(mockClient.request).toHaveBeenCalledWith(
        "MobileMessaging.setDelegatedManagement",
        {
          delegatedManagement: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getDelegatedManagement", () => {
    it("should call the API without parameters", async () => {
      const mockResponse = true;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await mobileMessagingModule.getDelegatedManagement();

      expect(mockClient.request).toHaveBeenCalledWith(
        "MobileMessaging.getDelegatedManagement"
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
