import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  FormAnalyticsModule,
  CoreReportingClient,
} from "@mj-kiwi/matomo-client";

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

describe("FormAnalyticsModule", () => {
  let formAnalyticsModule: FormAnalyticsModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and FormAnalytics module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    formAnalyticsModule = new FormAnalyticsModule(clientInstance);
  });

  describe("addForm", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.addForm(1, "Contact Form");
      expect(mockClient.request).toHaveBeenCalledWith("FormAnalytics.addForm", {
        idSite: 1,
        name: "Contact Form",
        conversionRuleOption: "page_visit",
      });
    });

    it("should include optional parameters when provided", async () => {
      await formAnalyticsModule.addForm(
        1,
        "Contact Form",
        "Form Description",
        "form[id=contact]",
        "page.url=contact",
        "form_submit",
        "thank-you"
      );
      expect(mockClient.request).toHaveBeenCalledWith("FormAnalytics.addForm", {
        idSite: 1,
        name: "Contact Form",
        description: "Form Description",
        matchFormRules: "form[id=contact]",
        matchPageRules: "page.url=contact",
        conversionRuleOption: "form_submit",
        conversionRules: "thank-you",
      });
    });
  });

  describe("getForm", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getForm(1, 123);
      expect(mockClient.request).toHaveBeenCalledWith("FormAnalytics.getForm", {
        idSite: 1,
        idForm: 123,
      });
    });
  });

  describe("getForms", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getForms(1);
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getForms",
        {
          idSite: 1,
        }
      );
    });
  });

  describe("getEntryFields", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getEntryFields(1, "day", "yesterday", 123);
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getEntryFields",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idForm: 123,
        }
      );
    });

    it("should include segment parameter when provided", async () => {
      await formAnalyticsModule.getEntryFields(
        1,
        "day",
        "yesterday",
        123,
        "deviceType==mobile"
      );
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getEntryFields",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idForm: 123,
          segment: "deviceType==mobile",
        }
      );
    });
  });

  describe("getDropOffFields", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getDropOffFields(1, "day", "yesterday", 123);
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getDropOffFields",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idForm: 123,
        }
      );
    });
  });

  describe("getFieldTimings", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getFieldTimings(1, "day", "yesterday", 123);
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getFieldTimings",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idForm: 123,
        }
      );
    });
  });

  describe("getAvailableStatuses", () => {
    it("should call the API with no parameters", async () => {
      await formAnalyticsModule.getAvailableStatuses();
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getAvailableStatuses"
      );
    });
  });

  describe("getCurrentMostPopularForms", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getCurrentMostPopularForms(1, 30);
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getCurrentMostPopularForms",
        {
          idSite: 1,
          lastMinutes: 30,
          filter_limit: "5",
        }
      );
    });

    it("should include optional parameters when provided", async () => {
      await formAnalyticsModule.getCurrentMostPopularForms(
        1,
        30,
        10,
        "deviceType==mobile"
      );
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getCurrentMostPopularForms",
        {
          idSite: 1,
          lastMinutes: 30,
          filter_limit: 10,
          segment: "deviceType==mobile",
        }
      );
    });
  });
});
