import { describe, it, expect, vi, beforeEach } from "vitest";
import { ConnectAccountsModule, CoreReportingClient } from "../../src/index";

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

describe("ConnectAccountsModule", () => {
  let connectAccountsModule: ConnectAccountsModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and ConnectAccounts module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    connectAccountsModule = new ConnectAccountsModule(clientInstance);
  });

  describe("getGtmContainersList", () => {
    it("should call the API with the account ID", async () => {
      const mockResponse = [
        { id: "GTM-ABC123", name: "Web Container" },
        { id: "GTM-XYZ789", name: "Mobile App Container" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await connectAccountsModule.getGtmContainersList({
        accountId: "123456789",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "ConnectAccounts.getGtmContainersList",
        {
          accountId: "123456789",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getGtmWorkspaceList", () => {
    it("should call the API with the account ID and container ID", async () => {
      const mockResponse = [
        { id: "ws1", name: "Default Workspace" },
        { id: "ws2", name: "Development Workspace" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await connectAccountsModule.getGtmWorkspaceList({
        accountId: "123456789",
        containerId: "GTM-ABC123",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "ConnectAccounts.getGtmWorkspaceList",
        {
          accountId: "123456789",
          containerId: "GTM-ABC123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("createMatomoTag", () => {
    it("should call the API with all required parameters and JSON stringify the parentInfo object", async () => {
      const mockResponse = {
        tagId: "tag123",
        success: true,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const parentInfo = {
        accountId: "123456789",
        trackingId: "UA-123456-1",
        variableNames: ["matomo-url", "matomo-site-id"],
      };

      const result = await connectAccountsModule.createMatomoTag({
        accountId: "123456789",
        containerId: "GTM-ABC123",
        workspaceId: "ws1",
        parentInfo: parentInfo,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "ConnectAccounts.createMatomoTag",
        {
          accountId: "123456789",
          containerId: "GTM-ABC123",
          workspaceId: "ws1",
          parentInfo: JSON.stringify(parentInfo),
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should handle parentInfo as array", async () => {
      const mockResponse = {
        tagId: "tag123",
        success: true,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const parentInfo = [
        { name: "matomo-url", value: "https://analytics.example.com" },
        { name: "matomo-site-id", value: "1" },
      ];

      const result = await connectAccountsModule.createMatomoTag({
        accountId: "123456789",
        containerId: "GTM-ABC123",
        workspaceId: "ws1",
        parentInfo: parentInfo,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "ConnectAccounts.createMatomoTag",
        {
          accountId: "123456789",
          containerId: "GTM-ABC123",
          workspaceId: "ws1",
          parentInfo: JSON.stringify(parentInfo),
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
