import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  AdvertisingConversionExportModule,
  CoreReportingClient,
} from "../../src/index";

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

describe("AdvertisingConversionExportModule", () => {
  let advertisingConversionExportModule: AdvertisingConversionExportModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and AdvertisingConversionExport module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    advertisingConversionExportModule = new AdvertisingConversionExportModule(
      clientInstance
    );
  });

  describe("getConversionExports", () => {
    it("should call the API without site ID when not provided", async () => {
      const mockResponse = [
        { id: 1, name: "Export 1", type: "google" },
        { id: 2, name: "Export 2", type: "facebook" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await advertisingConversionExportModule.getConversionExports();

      expect(mockClient.request).toHaveBeenCalledWith(
        "AdvertisingConversionExport.getConversionExports",
        {}
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with site ID when provided", async () => {
      const mockResponse = [{ id: 1, name: "Export 1", type: "google" }];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await advertisingConversionExportModule.getConversionExports(5);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AdvertisingConversionExport.getConversionExports",
        {
          idSite: 5,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getConversionExport", () => {
    it("should call the API with the provided export ID", async () => {
      const mockResponse = {
        id: 123,
        name: "Google Ads Export",
        type: "google",
        parameters: { accountId: "12345" },
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await advertisingConversionExportModule.getConversionExport(123);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AdvertisingConversionExport.getConversionExport",
        {
          idExport: 123,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteConversionExport", () => {
    it("should call the API with the provided export ID and site ID", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await advertisingConversionExportModule.deleteConversionExport(123, 5);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AdvertisingConversionExport.deleteConversionExport",
        {
          idExport: 123,
          idSite: 5,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("addConversionExport", () => {
    it("should call the API with the provided parameters", async () => {
      const mockResponse = {
        id: 456,
        name: "Facebook Conversion API",
        type: "facebook",
        parameters: { pixelId: "987654321" },
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const parameters = { pixelId: "987654321" };
      const result =
        await advertisingConversionExportModule.addConversionExport(
          5,
          "Facebook Conversion API",
          "facebook",
          parameters
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "AdvertisingConversionExport.addConversionExport",
        {
          idSite: 5,
          name: "Facebook Conversion API",
          type: "facebook",
          parameters: JSON.stringify(parameters),
          description: "",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should include description when provided", async () => {
      const mockResponse = {
        id: 456,
        name: "Facebook Conversion API",
        type: "facebook",
        parameters: { pixelId: "987654321" },
        description: "Export conversions to Facebook",
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const parameters = { pixelId: "987654321" };
      const result =
        await advertisingConversionExportModule.addConversionExport(
          5,
          "Facebook Conversion API",
          "facebook",
          parameters,
          "Export conversions to Facebook"
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "AdvertisingConversionExport.addConversionExport",
        {
          idSite: 5,
          name: "Facebook Conversion API",
          type: "facebook",
          parameters: JSON.stringify(parameters),
          description: "Export conversions to Facebook",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("regenerateAccessToken", () => {
    it("should call the API with the provided export ID", async () => {
      const mockResponse = { token: "new-access-token-123456" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await advertisingConversionExportModule.regenerateAccessToken(123);

      expect(mockClient.request).toHaveBeenCalledWith(
        "AdvertisingConversionExport.regenerateAccessToken",
        {
          idExport: 123,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateConversionExport", () => {
    it("should call the API with the provided parameters", async () => {
      const mockResponse = {
        id: 123,
        name: "Updated Google Ads Export",
        type: "google",
        parameters: { accountId: "98765" },
        description: "Updated description",
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const parameters = { accountId: "98765" };
      const result =
        await advertisingConversionExportModule.updateConversionExport(
          123,
          5,
          "Updated Google Ads Export",
          "google",
          parameters,
          "Updated description"
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "AdvertisingConversionExport.updateConversionExport",
        {
          idExport: 123,
          idSite: 5,
          name: "Updated Google Ads Export",
          type: "google",
          parameters: JSON.stringify(parameters),
          description: "Updated description",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should use empty description when not provided", async () => {
      const mockResponse = {
        id: 123,
        name: "Updated Google Ads Export",
        type: "google",
        parameters: { accountId: "98765" },
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const parameters = { accountId: "98765" };
      const result =
        await advertisingConversionExportModule.updateConversionExport(
          123,
          5,
          "Updated Google Ads Export",
          "google",
          parameters
        );

      expect(mockClient.request).toHaveBeenCalledWith(
        "AdvertisingConversionExport.updateConversionExport",
        {
          idExport: 123,
          idSite: 5,
          name: "Updated Google Ads Export",
          type: "google",
          parameters: JSON.stringify(parameters),
          description: "",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
