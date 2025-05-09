import { describe, it, expect, vi, beforeEach } from "vitest";
import { TagManagerModule, CoreReportingClient } from "../../src/index";

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

describe("TagManagerModule", () => {
  let tagManagerModule: TagManagerModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and TagManager module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    tagManagerModule = new TagManagerModule(clientInstance);
  });

  describe("getAvailableContexts", () => {
    it("should call the API without parameters", async () => {
      const mockResponse = ["web", "android", "ios"];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getAvailableContexts();

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getAvailableContexts",
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableEnvironments", () => {
    it("should call the API without parameters", async () => {
      const mockResponse = ["live", "dev", "staging"];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getAvailableEnvironments();

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getAvailableEnvironments",
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableEnvironmentsWithPublishCapability", () => {
    it("should call the API with idSite parameter", async () => {
      const mockResponse = ["live", "staging"];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await tagManagerModule.getAvailableEnvironmentsWithPublishCapability({
          idSite: 1,
        });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getAvailableEnvironmentsWithPublishCapability",
        { idSite: 1 }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableTagFireLimits", () => {
    it("should call the API without parameters", async () => {
      const mockResponse = [
        "unlimited",
        "once",
        "once_per_page",
        "once_per_event",
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getAvailableTagFireLimits();

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getAvailableTagFireLimits",
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableComparisons", () => {
    it("should call the API without parameters", async () => {
      const mockResponse = [
        "equals",
        "contains",
        "startsWith",
        "endsWith",
        "regexp",
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getAvailableComparisons();

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getAvailableComparisons",
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableTagTypesInContext", () => {
    it("should call the API with idContext parameter", async () => {
      const mockResponse = [
        "CustomHtml",
        "Matomo",
        "MatomoEventTracking",
        "GoogleAnalytics",
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getAvailableTagTypesInContext({
        idContext: "web",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getAvailableTagTypesInContext",
        { idContext: "web" }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableTriggerTypesInContext", () => {
    it("should call the API with idContext parameter", async () => {
      const mockResponse = ["PageView", "DomReady", "Click", "FormSubmit"];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getAvailableTriggerTypesInContext({
        idContext: "web",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getAvailableTriggerTypesInContext",
        { idContext: "web" }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableVariableTypesInContext", () => {
    it("should call the API with idContext parameter", async () => {
      const mockResponse = ["DataLayer", "Cookie", "CustomJs", "Dom"];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getAvailableVariableTypesInContext({
        idContext: "web",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getAvailableVariableTypesInContext",
        { idContext: "web" }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContainerEmbedCode", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        code: "<!-- Matomo Tag Manager --><script>/* Code */</script>",
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getContainerEmbedCode({
        idSite: 1,
        idContainer: "abcdef",
        environment: "live",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getContainerEmbedCode",
        {
          idSite: 1,
          idContainer: "abcdef",
          environment: "live",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContainerInstallInstructions", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { code: "<!-- Instructions for installation -->" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getContainerInstallInstructions({
        idSite: 1,
        idContainer: "abcdef",
        environment: "live",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getContainerInstallInstructions",
        {
          idSite: 1,
          idContainer: "abcdef",
          environment: "live",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = {
        code: "<!-- Instructions for installation with React -->",
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getContainerInstallInstructions({
        idSite: 1,
        idContainer: "abcdef",
        environment: "live",
        jsFramework: "react",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getContainerInstallInstructions",
        {
          idSite: 1,
          idContainer: "abcdef",
          environment: "live",
          jsFramework: "react",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContainerTags", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        { idtag: 1, name: "Analytics", type: "Matomo" },
        { idtag: 2, name: "Custom Script", type: "CustomHtml" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getContainerTags({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getContainerTags",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("createDefaultContainerForSite", () => {
    it("should call the API with idSite parameter", async () => {
      const mockResponse = { idContainer: "abcdef" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.createDefaultContainerForSite({
        idSite: 1,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.createDefaultContainerForSite",
        { idSite: 1 }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("addContainerTag", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true, idTag: 3 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.addContainerTag({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        type: "Matomo",
        name: "Analytics Tag",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.addContainerTag",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          type: "Matomo",
          name: "Analytics Tag",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { success: true, idTag: 3 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.addContainerTag({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        type: "Matomo",
        name: "Analytics Tag",
        parameters: { siteId: 1, trackingType: "pageview" },
        fireTriggerIds: ["trigger1", "trigger2"],
        blockTriggerIds: ["blocktrigger1"],
        fireLimit: "once_per_page",
        fireDelay: "500",
        priority: "100",
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        description: "Tag description",
        status: "active",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.addContainerTag",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          type: "Matomo",
          name: "Analytics Tag",
          parameters: { siteId: 1, trackingType: "pageview" },
          fireTriggerIds: ["trigger1", "trigger2"],
          blockTriggerIds: ["blocktrigger1"],
          fireLimit: "once_per_page",
          fireDelay: "500",
          priority: "100",
          startDate: "2023-01-01",
          endDate: "2023-12-31",
          description: "Tag description",
          status: "active",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateContainerTag", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.updateContainerTag({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        idTag: "tag123",
        name: "Updated Analytics Tag",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.updateContainerTag",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          idTag: "tag123",
          name: "Updated Analytics Tag",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.updateContainerTag({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        idTag: "tag123",
        name: "Updated Analytics Tag",
        parameters: { siteId: 1, trackingType: "event" },
        fireTriggerIds: ["trigger1", "trigger3"],
        blockTriggerIds: ["blocktrigger2"],
        fireLimit: "once_per_event",
        fireDelay: "300",
        priority: "200",
        startDate: "2023-02-01",
        endDate: "2024-01-31",
        description: "Updated tag description",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.updateContainerTag",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          idTag: "tag123",
          name: "Updated Analytics Tag",
          parameters: { siteId: 1, trackingType: "event" },
          fireTriggerIds: ["trigger1", "trigger3"],
          blockTriggerIds: ["blocktrigger2"],
          fireLimit: "once_per_event",
          fireDelay: "300",
          priority: "200",
          startDate: "2023-02-01",
          endDate: "2024-01-31",
          description: "Updated tag description",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteContainerTag", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.deleteContainerTag({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        idTag: "tag123",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.deleteContainerTag",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          idTag: "tag123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("pauseContainerTag", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.pauseContainerTag({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        idTag: "tag123",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.pauseContainerTag",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          idTag: "tag123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("resumeContainerTag", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.resumeContainerTag({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        idTag: "tag123",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.resumeContainerTag",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          idTag: "tag123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContainerTag", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        idTag: "tag123",
        name: "Analytics Tag",
        type: "Matomo",
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getContainerTag({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        idTag: "tag123",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getContainerTag",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          idTag: "tag123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContainerTriggerReferences", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        { idTag: "tag1", name: "Analytics" },
        { idTag: "tag2", name: "Custom Script" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getContainerTriggerReferences({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        idTrigger: "trigger123",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getContainerTriggerReferences",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          idTrigger: "trigger123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContainerTriggers", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        { idTrigger: "trigger1", name: "Page View", type: "PageView" },
        { idTrigger: "trigger2", name: "Click", type: "Click" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getContainerTriggers({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getContainerTriggers",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("addContainerTrigger", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true, idTrigger: "trig123" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.addContainerTrigger({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        type: "Click",
        name: "Button Click",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.addContainerTrigger",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          type: "Click",
          name: "Button Click",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { success: true, idTrigger: "trig123" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.addContainerTrigger({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        type: "Click",
        name: "Button Click",
        parameters: { clickElementId: "submit-button" },
        conditions: [{ type: "contains", attribute: "id", value: "submit" }],
        description: "Trigger when submit button is clicked",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.addContainerTrigger",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          type: "Click",
          name: "Button Click",
          parameters: { clickElementId: "submit-button" },
          conditions: [{ type: "contains", attribute: "id", value: "submit" }],
          description: "Trigger when submit button is clicked",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateContainerTrigger", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.updateContainerTrigger({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        idTrigger: "trigger123",
        name: "Updated Button Click",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.updateContainerTrigger",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          idTrigger: "trigger123",
          name: "Updated Button Click",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.updateContainerTrigger({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        idTrigger: "trigger123",
        name: "Updated Button Click",
        parameters: { clickElementId: "cta-button" },
        conditions: [{ type: "equals", attribute: "id", value: "cta-button" }],
        description: "Trigger when CTA button is clicked",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.updateContainerTrigger",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          idTrigger: "trigger123",
          name: "Updated Button Click",
          parameters: { clickElementId: "cta-button" },
          conditions: [
            { type: "equals", attribute: "id", value: "cta-button" },
          ],
          description: "Trigger when CTA button is clicked",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteContainerTrigger", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.deleteContainerTrigger({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        idTrigger: "trigger123",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.deleteContainerTrigger",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          idTrigger: "trigger123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContainerTrigger", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        idTrigger: "trigger123",
        name: "Button Click",
        type: "Click",
        conditions: [{ type: "equals", attribute: "id", value: "button" }],
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getContainerTrigger({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        idTrigger: "trigger123",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getContainerTrigger",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          idTrigger: "trigger123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContainerVariableReferences", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        { idTag: "tag1", name: "Analytics" },
        { idTrigger: "trigger1", name: "Page View" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getContainerVariableReferences({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        idVariable: "var123",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getContainerVariableReferences",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          idVariable: "var123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContainerVariables", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        { idVariable: "var1", name: "Page URL", type: "PageUrl" },
        { idVariable: "var2", name: "User ID", type: "DataLayer" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getContainerVariables({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getContainerVariables",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableContainerVariables", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        { idVariable: "var1", name: "Page URL", type: "PageUrl" },
        { idVariable: "var2", name: "User ID", type: "DataLayer" },
        { type: "BuiltIn", name: "Click ID", id: "ClickId" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getAvailableContainerVariables({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getAvailableContainerVariables",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("addContainerVariable", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true, idVariable: "var123" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.addContainerVariable({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        type: "DataLayer",
        name: "User ID Variable",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.addContainerVariable",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          type: "DataLayer",
          name: "User ID Variable",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { success: true, idVariable: "var123" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.addContainerVariable({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        type: "DataLayer",
        name: "User ID Variable",
        parameters: { dataLayerName: "userId" },
        defaultValue: "unknown",
        lookupTable: [
          {
            matchValue: "admin",
            outValue: "Administrator",
            comparison: "equals",
          },
        ],
        description: "Variable to get user ID from data layer",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.addContainerVariable",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          type: "DataLayer",
          name: "User ID Variable",
          parameters: { dataLayerName: "userId" },
          defaultValue: "unknown",
          lookupTable: [
            {
              matchValue: "admin",
              outValue: "Administrator",
              comparison: "equals",
            },
          ],
          description: "Variable to get user ID from data layer",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateContainerVariable", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.updateContainerVariable({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        idVariable: "var123",
        name: "Updated User ID",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.updateContainerVariable",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          idVariable: "var123",
          name: "Updated User ID",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.updateContainerVariable({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        idVariable: "var123",
        name: "Updated User ID",
        parameters: { dataLayerName: "user.id" },
        defaultValue: "guest",
        lookupTable: [
          {
            matchValue: "admin",
            outValue: "Administrator",
            comparison: "equals",
          },
          { matchValue: "mod", outValue: "Moderator", comparison: "equals" },
        ],
        description: "Updated variable description",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.updateContainerVariable",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          idVariable: "var123",
          name: "Updated User ID",
          parameters: { dataLayerName: "user.id" },
          defaultValue: "guest",
          lookupTable: [
            {
              matchValue: "admin",
              outValue: "Administrator",
              comparison: "equals",
            },
            { matchValue: "mod", outValue: "Moderator", comparison: "equals" },
          ],
          description: "Updated variable description",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteContainerVariable", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.deleteContainerVariable({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        idVariable: "var123",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.deleteContainerVariable",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          idVariable: "var123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContainerVariable", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        idVariable: "var123",
        name: "User ID",
        type: "DataLayer",
        parameters: { dataLayerName: "userId" },
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getContainerVariable({
        idSite: 1,
        idContainer: "abcdef",
        idContainerVersion: 5,
        idVariable: "var123",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getContainerVariable",
        {
          idSite: 1,
          idContainer: "abcdef",
          idContainerVersion: 5,
          idVariable: "var123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContainers", () => {
    it("should call the API with idSite parameter", async () => {
      const mockResponse = [
        { idContainer: "cont1", name: "Web Container", context: "web" },
        { idContainer: "cont2", name: "Mobile Container", context: "android" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getContainers({
        idSite: 1,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getContainers",
        { idSite: 1 }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("addContainer", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true, idContainer: "cont123" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.addContainer({
        idSite: 1,
        context: "web",
        name: "New Web Container",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.addContainer",
        {
          idSite: 1,
          context: "web",
          name: "New Web Container",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { success: true, idContainer: "cont123" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.addContainer({
        idSite: 1,
        context: "web",
        name: "New Web Container",
        description: "Container description",
        ignoreGtmDataLayer: "1",
        isTagFireLimitAllowedInPreviewMode: "1",
        activelySyncGtmDataLayer: "1",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.addContainer",
        {
          idSite: 1,
          context: "web",
          name: "New Web Container",
          description: "Container description",
          ignoreGtmDataLayer: "1",
          isTagFireLimitAllowedInPreviewMode: "1",
          activelySyncGtmDataLayer: "1",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateContainer", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.updateContainer({
        idSite: 1,
        idContainer: "cont123",
        name: "Updated Container Name",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.updateContainer",
        {
          idSite: 1,
          idContainer: "cont123",
          name: "Updated Container Name",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.updateContainer({
        idSite: 1,
        idContainer: "cont123",
        name: "Updated Container Name",
        description: "Updated description",
        ignoreGtmDataLayer: "1",
        isTagFireLimitAllowedInPreviewMode: "1",
        activelySyncGtmDataLayer: "1",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.updateContainer",
        {
          idSite: 1,
          idContainer: "cont123",
          name: "Updated Container Name",
          description: "Updated description",
          ignoreGtmDataLayer: "1",
          isTagFireLimitAllowedInPreviewMode: "1",
          activelySyncGtmDataLayer: "1",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("createContainerVersion", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true, idContainerVersion: 6 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.createContainerVersion({
        idSite: 1,
        idContainer: "cont123",
        name: "v1.0",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.createContainerVersion",
        {
          idSite: 1,
          idContainer: "cont123",
          name: "v1.0",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { success: true, idContainerVersion: 6 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.createContainerVersion({
        idSite: 1,
        idContainer: "cont123",
        name: "v1.0",
        description: "First stable version",
        idContainerVersion: "5",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.createContainerVersion",
        {
          idSite: 1,
          idContainer: "cont123",
          name: "v1.0",
          description: "First stable version",
          idContainerVersion: "5",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateContainerVersion", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.updateContainerVersion({
        idSite: 1,
        idContainer: "cont123",
        idContainerVersion: 6,
        name: "v1.1",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.updateContainerVersion",
        {
          idSite: 1,
          idContainer: "cont123",
          idContainerVersion: 6,
          name: "v1.1",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.updateContainerVersion({
        idSite: 1,
        idContainer: "cont123",
        idContainerVersion: 6,
        name: "v1.1",
        description: "Updated version description",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.updateContainerVersion",
        {
          idSite: 1,
          idContainer: "cont123",
          idContainerVersion: 6,
          name: "v1.1",
          description: "Updated version description",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContainerVersions", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        { idContainerVersion: 5, name: "v1.0" },
        { idContainerVersion: 6, name: "v1.1" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getContainerVersions({
        idSite: 1,
        idContainer: "cont123",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getContainerVersions",
        {
          idSite: 1,
          idContainer: "cont123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContainerVersion", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        idContainerVersion: 6,
        name: "v1.1",
        description: "Updated version",
        created: "2023-04-01",
        updated: "2023-04-05",
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getContainerVersion({
        idSite: 1,
        idContainer: "cont123",
        idContainerVersion: 6,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getContainerVersion",
        {
          idSite: 1,
          idContainer: "cont123",
          idContainerVersion: 6,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteContainerVersion", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.deleteContainerVersion({
        idSite: 1,
        idContainer: "cont123",
        idContainerVersion: 6,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.deleteContainerVersion",
        {
          idSite: 1,
          idContainer: "cont123",
          idContainerVersion: 6,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("publishContainerVersion", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.publishContainerVersion({
        idSite: 1,
        idContainer: "cont123",
        idContainerVersion: 6,
        environment: "live",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.publishContainerVersion",
        {
          idSite: 1,
          idContainer: "cont123",
          idContainerVersion: 6,
          environment: "live",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteContainer", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.deleteContainer({
        idSite: 1,
        idContainer: "cont123",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.deleteContainer",
        {
          idSite: 1,
          idContainer: "cont123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getContainer", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        idContainer: "cont123",
        name: "Web Container",
        context: "web",
        description: "Main website container",
        versions: [
          { idContainerVersion: 5, name: "v1.0" },
          { idContainerVersion: 6, name: "v1.1" },
        ],
        releases: [
          { environment: "live", idContainerVersion: 5 },
          { environment: "staging", idContainerVersion: 6 },
        ],
        draft: {
          idContainerVersion: 7,
          name: "Draft",
          isDraft: true,
        },
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.getContainer({
        idSite: 1,
        idContainer: "cont123",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.getContainer",
        {
          idSite: 1,
          idContainer: "cont123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("enablePreviewMode", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.enablePreviewMode({
        idSite: 1,
        idContainer: "cont123",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.enablePreviewMode",
        {
          idSite: 1,
          idContainer: "cont123",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.enablePreviewMode({
        idSite: 1,
        idContainer: "cont123",
        idContainerVersion: "6",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.enablePreviewMode",
        {
          idSite: 1,
          idContainer: "cont123",
          idContainerVersion: "6",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("disablePreviewMode", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.disablePreviewMode({
        idSite: 1,
        idContainer: "cont123",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.disablePreviewMode",
        {
          idSite: 1,
          idContainer: "cont123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("changeDebugUrl", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.changeDebugUrl({
        idSite: 1,
        url: "https://example.org/checkout",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.changeDebugUrl",
        {
          idSite: 1,
          url: "https://example.org/checkout",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("exportContainerVersion", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        container: { name: "Web Container", context: "web" },
        version: { name: "v1.0" },
        tags: [{ name: "Analytics", type: "Matomo" }],
        triggers: [{ name: "PageView", type: "PageView" }],
        variables: [{ name: "PageUrl", type: "PageUrl" }],
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.exportContainerVersion({
        idSite: 1,
        idContainer: "cont123",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.exportContainerVersion",
        {
          idSite: 1,
          idContainer: "cont123",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = {
        container: { name: "Web Container", context: "web" },
        version: { name: "v1.0" },
        tags: [{ name: "Analytics", type: "Matomo" }],
        triggers: [{ name: "PageView", type: "PageView" }],
        variables: [{ name: "PageUrl", type: "PageUrl" }],
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.exportContainerVersion({
        idSite: 1,
        idContainer: "cont123",
        idContainerVersion: "6",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.exportContainerVersion",
        {
          idSite: 1,
          idContainer: "cont123",
          idContainerVersion: "6",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("importContainerVersion", () => {
    it("should call the API with required parameters", async () => {
      const containerJson = JSON.stringify({
        container: { name: "Web Container", context: "web" },
        version: { name: "v1.0" },
        tags: [{ name: "Analytics", type: "Matomo" }],
      });

      const mockResponse = { success: true, idContainerVersion: 8 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.importContainerVersion({
        idSite: 1,
        idContainer: "cont123",
        exportedContainerVersion: containerJson,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.importContainerVersion",
        {
          idSite: 1,
          idContainer: "cont123",
          exportedContainerVersion: containerJson,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const containerJson = JSON.stringify({
        container: { name: "Web Container", context: "web" },
        version: { name: "v1.0" },
        tags: [{ name: "Analytics", type: "Matomo" }],
      });

      const mockResponse = { success: true, idContainerVersion: 8 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await tagManagerModule.importContainerVersion({
        idSite: 1,
        idContainer: "cont123",
        exportedContainerVersion: containerJson,
        backupName: "Backup before import",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.importContainerVersion",
        {
          idSite: 1,
          idContainer: "cont123",
          exportedContainerVersion: containerJson,
          backupName: "Backup before import",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
