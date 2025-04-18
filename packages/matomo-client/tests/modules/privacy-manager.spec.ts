import { describe, it, expect, vi, beforeEach } from "vitest";
import { PrivacyManagerModule, CoreReportingClient } from "../../src/index";

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

describe("PrivacyManagerModule", () => {
  let privacyManagerModule: PrivacyManagerModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    privacyManagerModule = new PrivacyManagerModule(clientInstance);
  });

  describe("deleteDataSubjects", () => {
    it("should call the API with required parameters", async () => {
      const visits = [{ id: 123, visitorId: "abc" }];
      const mockResponse = { success: true, count: 1 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await privacyManagerModule.deleteDataSubjects(visits);

      expect(mockClient.request).toHaveBeenCalledWith(
        "PrivacyManager.deleteDataSubjects",
        { visits }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("exportDataSubjects", () => {
    it("should call the API with required parameters", async () => {
      const visits = [{ id: 123, visitorId: "abc" }];
      const mockResponse = { data: [{ visit_id: 123, visitor_id: "abc" }] };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await privacyManagerModule.exportDataSubjects(visits);

      expect(mockClient.request).toHaveBeenCalledWith(
        "PrivacyManager.exportDataSubjects",
        { visits }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("findDataSubjects", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { visits: [{ id: 123, visitorId: "abc" }] };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await privacyManagerModule.findDataSubjects(
        1,
        "userId==abc"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "PrivacyManager.findDataSubjects",
        { idSite: 1, segment: "userId==abc" }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("anonymizeSomeRawData", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { processed: 10 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await privacyManagerModule.anonymizeSomeRawData(
        [1, 2],
        "2023-01-01"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "PrivacyManager.anonymizeSomeRawData",
        {
          idSites: [1, 2],
          date: "2023-01-01",
          anonymizeIp: "",
          anonymizeLocation: "",
          anonymizeUserId: "",
          unsetVisitColumns: [],
          unsetLinkVisitActionColumns: [],
          passwordConfirmation: "",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { processed: 10 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await privacyManagerModule.anonymizeSomeRawData(
        [1, 2],
        "2023-01-01",
        "1",
        "1",
        "1",
        ["user_id", "config_id"],
        ["action_name"],
        "password123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "PrivacyManager.anonymizeSomeRawData",
        {
          idSites: [1, 2],
          date: "2023-01-01",
          anonymizeIp: "1",
          anonymizeLocation: "1",
          anonymizeUserId: "1",
          unsetVisitColumns: ["user_id", "config_id"],
          unsetLinkVisitActionColumns: ["action_name"],
          passwordConfirmation: "password123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableVisitColumnsToAnonymize", () => {
    it("should call the API correctly", async () => {
      const mockResponse = ["user_id", "config_id", "location_ip"];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await privacyManagerModule.getAvailableVisitColumnsToAnonymize();

      expect(mockClient.request).toHaveBeenCalledWith(
        "PrivacyManager.getAvailableVisitColumnsToAnonymize"
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableLinkVisitActionColumnsToAnonymize", () => {
    it("should call the API correctly", async () => {
      const mockResponse = ["action_name", "action_url"];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await privacyManagerModule.getAvailableLinkVisitActionColumnsToAnonymize();

      expect(mockClient.request).toHaveBeenCalledWith(
        "PrivacyManager.getAvailableLinkVisitActionColumnsToAnonymize"
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
