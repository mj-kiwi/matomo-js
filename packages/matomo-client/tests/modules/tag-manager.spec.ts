import { describe, it, expect, vi, beforeEach } from "vitest";
import { TagManagerModule, CoreReportingClient } from "@mj-kiwi/matomo-client";

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
        await tagManagerModule.getAvailableEnvironmentsWithPublishCapability(1);

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

      const result =
        await tagManagerModule.getAvailableTagTypesInContext("web");

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

      const result =
        await tagManagerModule.getAvailableTriggerTypesInContext("web");

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

      const result =
        await tagManagerModule.getAvailableVariableTypesInContext("web");

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

      const result = await tagManagerModule.getContainerEmbedCode(
        1,
        "abcdef",
        "live"
      );

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

      const result = await tagManagerModule.getContainerInstallInstructions(
        1,
        "abcdef",
        "live"
      );

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

      const result = await tagManagerModule.getContainerInstallInstructions(
        1,
        "abcdef",
        "live",
        "react"
      );

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

      const result = await tagManagerModule.getContainerTags(1, "abcdef", 5);

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

      const result = await tagManagerModule.createDefaultContainerForSite(1);

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

      const result = await tagManagerModule.addContainerTag(
        1,
        "abcdef",
        5,
        "Matomo",
        "Analytics Tag"
      );

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

      const result = await tagManagerModule.addContainerTag(
        1,
        "abcdef",
        5,
        "Matomo",
        "Analytics Tag",
        { siteId: 1, trackingType: "pageview" },
        ["trigger1", "trigger2"],
        ["blocktrigger1"],
        "once_per_page",
        "500",
        "100",
        "2023-01-01",
        "2023-12-31",
        "Tag description",
        "active"
      );

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

      const result = await tagManagerModule.updateContainerTag(
        1,
        "abcdef",
        5,
        "tag123",
        "Updated Analytics Tag"
      );

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

      const result = await tagManagerModule.updateContainerTag(
        1,
        "abcdef",
        5,
        "tag123",
        "Updated Analytics Tag",
        { siteId: 1, trackingType: "event" },
        ["trigger1", "trigger3"],
        ["blocktrigger2"],
        "once_per_event",
        "300",
        "200",
        "2023-02-01",
        "2024-01-31",
        "Updated tag description"
      );

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

      const result = await tagManagerModule.deleteContainerTag(
        1,
        "abcdef",
        5,
        "tag123"
      );

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

      const result = await tagManagerModule.pauseContainerTag(
        1,
        "abcdef",
        5,
        "tag123"
      );

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

      const result = await tagManagerModule.resumeContainerTag(
        1,
        "abcdef",
        5,
        "tag123"
      );

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

      const result = await tagManagerModule.getContainerTag(
        1,
        "abcdef",
        5,
        "tag123"
      );

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

      const result = await tagManagerModule.getContainerTriggerReferences(
        1,
        "abcdef",
        5,
        "trigger123"
      );

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

      const result = await tagManagerModule.getContainerTriggers(
        1,
        "abcdef",
        5
      );

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

      const result = await tagManagerModule.addContainerTrigger(
        1,
        "abcdef",
        5,
        "Click",
        "Button Click"
      );

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

      const result = await tagManagerModule.addContainerTrigger(
        1,
        "abcdef",
        5,
        "Click",
        "Button Click",
        { clickElementId: "submit-button" },
        [{ type: "contains", attribute: "id", value: "submit" }],
        "Trigger when submit button is clicked"
      );

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

      const result = await tagManagerModule.updateContainerTrigger(
        1,
        "abcdef",
        5,
        "trigger123",
        "Updated Button Click"
      );

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

      const result = await tagManagerModule.updateContainerTrigger(
        1,
        "abcdef",
        5,
        "trigger123",
        "Updated Button Click",
        { clickElementId: "cta-button" },
        [{ type: "equals", attribute: "id", value: "cta-button" }],
        "Trigger when CTA button is clicked"
      );

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

      const result = await tagManagerModule.deleteContainerTrigger(
        1,
        "abcdef",
        5,
        "trigger123"
      );

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

      const result = await tagManagerModule.getContainerTrigger(
        1,
        "abcdef",
        5,
        "trigger123"
      );

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

      const result = await tagManagerModule.getContainerVariableReferences(
        1,
        "abcdef",
        5,
        "var123"
      );

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

      const result = await tagManagerModule.getContainerVariables(
        1,
        "abcdef",
        5
      );

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

      const result = await tagManagerModule.getAvailableContainerVariables(
        1,
        "abcdef",
        5
      );

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

      const result = await tagManagerModule.addContainerVariable(
        1,
        "abcdef",
        5,
        "DataLayer",
        "User ID Variable"
      );

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

      const result = await tagManagerModule.addContainerVariable(
        1,
        "abcdef",
        5,
        "DataLayer",
        "User ID Variable",
        { dataLayerName: "userId" },
        "unknown",
        [
          {
            matchValue: "admin",
            outValue: "Administrator",
            comparison: "equals",
          },
        ],
        "Variable to get user ID from data layer"
      );

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

      const result = await tagManagerModule.updateContainerVariable(
        1,
        "abcdef",
        5,
        "var123",
        "Updated User ID"
      );

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

      const result = await tagManagerModule.updateContainerVariable(
        1,
        "abcdef",
        5,
        "var123",
        "Updated User ID",
        { dataLayerName: "user.id" },
        "guest",
        [
          {
            matchValue: "admin",
            outValue: "Administrator",
            comparison: "equals",
          },
          { matchValue: "mod", outValue: "Moderator", comparison: "equals" },
        ],
        "Updated variable description"
      );

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

      const result = await tagManagerModule.deleteContainerVariable(
        1,
        "abcdef",
        5,
        "var123"
      );

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

      const result = await tagManagerModule.getContainerVariable(
        1,
        "abcdef",
        5,
        "var123"
      );

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

      const result = await tagManagerModule.getContainers(1);

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

      const result = await tagManagerModule.addContainer(
        1,
        "web",
        "New Web Container"
      );

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

      const result = await tagManagerModule.addContainer(
        1,
        "web",
        "New Web Container",
        "Container description",
        "1",
        "1",
        "1"
      );

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

      const result = await tagManagerModule.updateContainer(
        1,
        "cont123",
        "Updated Container Name"
      );

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

      const result = await tagManagerModule.updateContainer(
        1,
        "cont123",
        "Updated Container Name",
        "Updated description",
        "1",
        "1",
        "1"
      );

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

      const result = await tagManagerModule.createContainerVersion(
        1,
        "cont123",
        "v1.0"
      );

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

      const result = await tagManagerModule.createContainerVersion(
        1,
        "cont123",
        "v1.0",
        "First stable version",
        "5"
      );

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

      const result = await tagManagerModule.updateContainerVersion(
        1,
        "cont123",
        6,
        "v1.1"
      );

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

      const result = await tagManagerModule.updateContainerVersion(
        1,
        "cont123",
        6,
        "v1.1",
        "Updated version description"
      );

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

      const result = await tagManagerModule.getContainerVersions(1, "cont123");

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

      const result = await tagManagerModule.getContainerVersion(
        1,
        "cont123",
        6
      );

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

      const result = await tagManagerModule.deleteContainerVersion(
        1,
        "cont123",
        6
      );

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

      const result = await tagManagerModule.publishContainerVersion(
        1,
        "cont123",
        6,
        "live"
      );

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

      const result = await tagManagerModule.deleteContainer(1, "cont123");

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

      const result = await tagManagerModule.getContainer(1, "cont123");

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

      const result = await tagManagerModule.enablePreviewMode(1, "cont123");

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

      const result = await tagManagerModule.enablePreviewMode(
        1,
        "cont123",
        "6"
      );

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

      const result = await tagManagerModule.disablePreviewMode(1, "cont123");

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

      const result = await tagManagerModule.changeDebugUrl(
        1,
        "https://example.org/checkout"
      );

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

      const result = await tagManagerModule.exportContainerVersion(
        1,
        "cont123"
      );

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

      const result = await tagManagerModule.exportContainerVersion(
        1,
        "cont123",
        "6"
      );

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

      const result = await tagManagerModule.importContainerVersion(
        containerJson,
        1,
        "cont123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.importContainerVersion",
        {
          exportedContainerVersion: containerJson,
          idSite: 1,
          idContainer: "cont123",
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

      const result = await tagManagerModule.importContainerVersion(
        containerJson,
        1,
        "cont123",
        "Backup before import"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "TagManager.importContainerVersion",
        {
          exportedContainerVersion: containerJson,
          idSite: 1,
          idContainer: "cont123",
          backupName: "Backup before import",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
