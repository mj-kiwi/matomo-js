import { describe, it, expect, vi, beforeEach } from "vitest";
import { CustomAlertsModule, CoreReportingClient } from "../../src/index";

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

describe("CustomAlertsModule", () => {
  let customAlertsModule: CustomAlertsModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and CustomAlerts module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    customAlertsModule = new CustomAlertsModule(clientInstance);
  });

  describe("getValuesForAlertInPast", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        { date: "2023-03-01", value: 1200 },
        { date: "2023-02-01", value: 900 },
        { date: "2023-01-01", value: 800 },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await customAlertsModule.getValuesForAlertInPast({
        idAlert: 123,
        subPeriodN: 3,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "CustomAlerts.getValuesForAlertInPast",
        {
          idAlert: 123,
          subPeriodN: 3,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAlert", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        id: 123,
        name: "Traffic spike alert",
        period: "day",
        metric: "nb_visits",
        metricCondition: "greater_than",
        metricValue: "500",
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await customAlertsModule.getAlert({
        idAlert: 123,
      });

      expect(mockClient.request).toHaveBeenCalledWith("CustomAlerts.getAlert", {
        idAlert: 123,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAlerts", () => {
    it("should call the API with single site ID", async () => {
      const mockResponse = [
        { id: 123, name: "Traffic spike alert", idSites: [1] },
        { id: 124, name: "Conversion drop alert", idSites: [1] },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await customAlertsModule.getAlerts({
        idSites: 1,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "CustomAlerts.getAlerts",
        {
          idSites: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with multiple site IDs as array", async () => {
      const mockResponse = [
        { id: 123, name: "Traffic spike alert", idSites: [1, 2] },
        { id: 125, name: "New visitors alert", idSites: [1, 2] },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await customAlertsModule.getAlerts({
        idSites: [1, 2],
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "CustomAlerts.getAlerts",
        {
          idSites: "1,2",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should include superuser parameter when provided", async () => {
      const mockResponse = [
        { id: 123, name: "Traffic spike alert", idSites: [1] },
        { id: 126, name: "Global alert", idSites: [3, 4, 5] },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await customAlertsModule.getAlerts({
        idSites: "1",
        ifSuperUserReturnAllAlerts: 1,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "CustomAlerts.getAlerts",
        {
          idSites: "1",
          ifSuperUserReturnAllAlerts: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("addAlert", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true, id: 127 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await customAlertsModule.addAlert({
        name: "New Traffic Alert",
        idSites: 1,
        period: "day",
        emailMe: true,
        additionalEmails: "admin@example.com",
        phoneNumbers: "+123456789",
        metric: "nb_visits",
        metricCondition: "greater_than",
        metricValue: 100,
        comparedTo: "yesterday",
        reportUniqueId: "Actions.getPageUrls",
      });

      expect(mockClient.request).toHaveBeenCalledWith("CustomAlerts.addAlert", {
        name: "New Traffic Alert",
        idSites: 1,
        period: "day",
        emailMe: true,
        additionalEmails: "admin@example.com",
        phoneNumbers: "+123456789",
        metric: "nb_visits",
        metricCondition: "greater_than",
        metricValue: 100,
        comparedTo: "yesterday",
        reportUniqueId: "Actions.getPageUrls",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters including optional ones", async () => {
      const mockResponse = { success: true, id: 128 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await customAlertsModule.addAlert({
        name: "Page URL Alert",
        idSites: [1, 2, 3],
        period: "week",
        emailMe: false,
        additionalEmails: ["user1@example.com", "user2@example.com"],
        phoneNumbers: ["+123456789", "+987654321"],
        metric: "nb_visits",
        metricCondition: "less_than",
        metricValue: 50,
        comparedTo: "previous",
        reportUniqueId: "Actions.getPageUrls",
        reportCondition: "contains",
        reportValue: "checkout",
      });

      expect(mockClient.request).toHaveBeenCalledWith("CustomAlerts.addAlert", {
        name: "Page URL Alert",
        idSites: "1,2,3",
        period: "week",
        emailMe: false,
        additionalEmails: "user1@example.com,user2@example.com",
        phoneNumbers: "+123456789,+987654321",
        metric: "nb_visits",
        metricCondition: "less_than",
        metricValue: 50,
        comparedTo: "previous",
        reportUniqueId: "Actions.getPageUrls",
        reportCondition: "contains",
        reportValue: "checkout",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("editAlert", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await customAlertsModule.editAlert({
        idAlert: 123,
        name: "Updated Traffic Alert",
        idSites: 1,
        period: "day",
        emailMe: true,
        additionalEmails: "admin@example.com",
        phoneNumbers: "+123456789",
        metric: "nb_visits",
        metricCondition: "greater_than",
        metricValue: 150,
        comparedTo: "yesterday",
        reportUniqueId: "Actions.getPageUrls",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "CustomAlerts.editAlert",
        {
          idAlert: 123,
          name: "Updated Traffic Alert",
          idSites: 1,
          period: "day",
          emailMe: true,
          additionalEmails: "admin@example.com",
          phoneNumbers: "+123456789",
          metric: "nb_visits",
          metricCondition: "greater_than",
          metricValue: 150,
          comparedTo: "yesterday",
          reportUniqueId: "Actions.getPageUrls",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteAlert", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await customAlertsModule.deleteAlert({
        idAlert: 123,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "CustomAlerts.deleteAlert",
        {
          idAlert: 123,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getTriggeredAlerts", () => {
    it("should call the API with single site ID", async () => {
      const mockResponse = [
        {
          id: 123,
          name: "Traffic spike alert",
          triggeredAt: "2023-04-01 12:30:00",
          value: 560,
          threshold: 500,
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await customAlertsModule.getTriggeredAlerts({
        idSites: 1,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "CustomAlerts.getTriggeredAlerts",
        {
          idSites: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with multiple site IDs as array", async () => {
      const mockResponse = [
        {
          id: 123,
          name: "Traffic spike alert",
          triggeredAt: "2023-04-01 12:30:00",
          value: 560,
          threshold: 500,
        },
        {
          id: 125,
          name: "New visitors alert",
          triggeredAt: "2023-04-02 14:15:00",
          value: 320,
          threshold: 300,
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await customAlertsModule.getTriggeredAlerts({
        idSites: [1, 2, 3],
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "CustomAlerts.getTriggeredAlerts",
        {
          idSites: "1,2,3",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
