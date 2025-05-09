import { describe, it, expect, vi, beforeEach } from "vitest";
import { FormAnalyticsModule, CoreReportingClient } from "../../src/index";

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
      await formAnalyticsModule.addForm({
        idSite: 1,
        name: "Contact Form",
      });
      expect(mockClient.request).toHaveBeenCalledWith("FormAnalytics.addForm", {
        idSite: 1,
        name: "Contact Form",
      });
    });

    it("should include optional parameters when provided", async () => {
      await formAnalyticsModule.addForm({
        idSite: 1,
        name: "Contact Form",
        description: "Form Description",
        matchFormRules: "form[id=contact]",
        matchPageRules: "page.url=contact",
        conversionRuleOption: "form_submit",
        conversionRules: "thank-you",
      });
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

  describe("updateForm", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.updateForm({
        idSite: 1,
        idForm: 123,
        name: "Updated Form",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.updateForm",
        {
          idSite: 1,
          idForm: 123,
          name: "Updated Form",
        }
      );
    });

    it("should include optional parameters when provided", async () => {
      await formAnalyticsModule.updateForm({
        idSite: 1,
        idForm: 123,
        name: "Updated Form",
        description: "Updated Description",
        matchFormRules: "form[id=updated]",
        matchPageRules: "page.url=updated",
        conversionRuleOption: "form_submit",
        conversionRules: "success-page",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.updateForm",
        {
          idSite: 1,
          idForm: 123,
          name: "Updated Form",
          description: "Updated Description",
          matchFormRules: "form[id=updated]",
          matchPageRules: "page.url=updated",
          conversionRuleOption: "form_submit",
          conversionRules: "success-page",
        }
      );
    });
  });

  describe("getForm", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getForm({
        idSite: 1,
        idForm: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith("FormAnalytics.getForm", {
        idSite: 1,
        idForm: 123,
      });
    });
  });

  describe("getForms", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getForms({
        idSite: 1,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getForms",
        {
          idSite: 1,
        }
      );
    });
  });

  describe("getFormsByStatuses", () => {
    it("should call the API with array of statuses", async () => {
      await formAnalyticsModule.getFormsByStatuses({
        idSite: 1,
        statuses: ["active", "archived"],
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getFormsByStatuses",
        {
          idSite: 1,
          statuses: ["active", "archived"],
        }
      );
    });

    it("should call the API with string status", async () => {
      await formAnalyticsModule.getFormsByStatuses({
        idSite: 1,
        statuses: "active",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getFormsByStatuses",
        {
          idSite: 1,
          statuses: "active",
        }
      );
    });
  });

  describe("deleteForm", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.deleteForm({
        idSite: 1,
        idForm: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.deleteForm",
        {
          idSite: 1,
          idForm: 123,
        }
      );
    });
  });

  describe("archiveForm", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.archiveForm({
        idSite: 1,
        idForm: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.archiveForm",
        {
          idSite: 1,
          idForm: 123,
        }
      );
    });
  });

  describe("get", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.get({
        idSite: 1,
        period: "day",
        date: "yesterday",
      });
      expect(mockClient.request).toHaveBeenCalledWith("FormAnalytics.get", {
        idSite: 1,
        period: "day",
        date: "yesterday",
      });
    });

    it("should include optional parameters when provided", async () => {
      await formAnalyticsModule.get({
        idSite: 1,
        period: "week",
        date: "last7",
        idForm: 123,
        segment: "deviceType==mobile",
        columns: "form_views,form_conversions",
      });
      expect(mockClient.request).toHaveBeenCalledWith("FormAnalytics.get", {
        idSite: 1,
        period: "week",
        date: "last7",
        idForm: 123,
        segment: "deviceType==mobile",
        columns: "form_views,form_conversions",
      });
    });
  });

  describe("getEntryFields", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getEntryFields({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idForm: 123,
      });
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
      await formAnalyticsModule.getEntryFields({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idForm: 123,
        segment: "deviceType==mobile",
      });
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
      await formAnalyticsModule.getDropOffFields({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idForm: 123,
      });
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

    it("should include segment parameter when provided", async () => {
      await formAnalyticsModule.getDropOffFields({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idForm: 123,
        segment: "deviceType==mobile",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getDropOffFields",
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

  describe("getPageUrls", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getPageUrls({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idForm: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getPageUrls",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idForm: 123,
        }
      );
    });

    it("should include segment parameter when provided", async () => {
      await formAnalyticsModule.getPageUrls({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idForm: 123,
        segment: "deviceType==mobile",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getPageUrls",
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

  describe("getFieldTimings", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getFieldTimings({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idForm: 123,
      });
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

    it("should include segment parameter when provided", async () => {
      await formAnalyticsModule.getFieldTimings({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idForm: 123,
        segment: "deviceType==mobile",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getFieldTimings",
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

  describe("getFieldSize", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getFieldSize({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idForm: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getFieldSize",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idForm: 123,
        }
      );
    });

    it("should include segment parameter when provided", async () => {
      await formAnalyticsModule.getFieldSize({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idForm: 123,
        segment: "deviceType==mobile",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getFieldSize",
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

  describe("getUneededFields", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getUneededFields({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idForm: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getUneededFields",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idForm: 123,
        }
      );
    });

    it("should include segment parameter when provided", async () => {
      await formAnalyticsModule.getUneededFields({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idForm: 123,
        segment: "deviceType==mobile",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getUneededFields",
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

  describe("getMostUsedFields", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getMostUsedFields({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idForm: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getMostUsedFields",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idForm: 123,
        }
      );
    });

    it("should include segment parameter when provided", async () => {
      await formAnalyticsModule.getMostUsedFields({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idForm: 123,
        segment: "deviceType==mobile",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getMostUsedFields",
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

  describe("getFieldCorrections", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getFieldCorrections({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idForm: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getFieldCorrections",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idForm: 123,
        }
      );
    });

    it("should include segment parameter when provided", async () => {
      await formAnalyticsModule.getFieldCorrections({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idForm: 123,
        segment: "deviceType==mobile",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getFieldCorrections",
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

  describe("updateFormFieldDisplayName", () => {
    it("should call the API with required parameters", async () => {
      const fields = {
        email: "Email Address",
        first_name: "First Name",
      };
      await formAnalyticsModule.updateFormFieldDisplayName({
        idSite: 1,
        idForm: 123,
        fields: fields,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.updateFormFieldDisplayName",
        {
          idSite: 1,
          idForm: 123,
          fields: fields,
        }
      );
    });

    it("should call the API with empty fields", async () => {
      await formAnalyticsModule.updateFormFieldDisplayName({
        idSite: 1,
        idForm: 123,
        fields: {},
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.updateFormFieldDisplayName",
        {
          idSite: 1,
          idForm: 123,
          fields: {},
        }
      );
    });
  });

  describe("getCounters", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getCounters({
        idSite: 1,
        lastMinutes: 30,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getCounters",
        {
          idSite: 1,
          lastMinutes: 30,
        }
      );
    });

    it("should include segment parameter when provided", async () => {
      await formAnalyticsModule.getCounters({
        idSite: 1,
        lastMinutes: 30,
        segment: "deviceType==mobile",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getCounters",
        {
          idSite: 1,
          lastMinutes: 30,
          segment: "deviceType==mobile",
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

  describe("getAvailableFormRules", () => {
    it("should call the API with no parameters", async () => {
      await formAnalyticsModule.getAvailableFormRules();
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getAvailableFormRules"
      );
    });
  });

  describe("getAvailablePageRules", () => {
    it("should call the API with no parameters", async () => {
      await formAnalyticsModule.getAvailablePageRules();
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getAvailablePageRules"
      );
    });
  });

  describe("getAvailableConversionRuleOptions", () => {
    it("should call the API with no parameters", async () => {
      await formAnalyticsModule.getAvailableConversionRuleOptions();
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getAvailableConversionRuleOptions"
      );
    });
  });

  describe("getAutoCreationSettings", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getAutoCreationSettings({
        idSite: 1,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getAutoCreationSettings",
        {
          idSite: 1,
        }
      );
    });
  });

  describe("getCurrentMostPopularForms", () => {
    it("should call the API with required parameters", async () => {
      await formAnalyticsModule.getCurrentMostPopularForms({
        idSite: 1,
        lastMinutes: 30,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "FormAnalytics.getCurrentMostPopularForms",
        {
          idSite: 1,
          lastMinutes: 30,
        }
      );
    });

    it("should include optional parameters when provided", async () => {
      await formAnalyticsModule.getCurrentMostPopularForms({
        idSite: 1,
        lastMinutes: 30,
        filter_limit: 10,
        segment: "deviceType==mobile",
      });
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
