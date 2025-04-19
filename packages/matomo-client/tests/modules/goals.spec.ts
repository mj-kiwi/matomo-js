import { describe, it, expect, vi, beforeEach } from "vitest";
import { GoalsModule, CoreReportingClient } from "../../src/index";

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

describe("GoalsModule", () => {
  let goalsModule: GoalsModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and Goals module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    goalsModule = new GoalsModule(clientInstance);
  });

  describe("getGoal", () => {
    it("should call the API with required parameters", async () => {
      await goalsModule.getGoal({
        idSite: 1,
        idGoal: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith("Goals.getGoal", {
        idSite: 1,
        idGoal: 123,
      });
    });
  });

  describe("getGoals", () => {
    it("should call the API with required parameters", async () => {
      await goalsModule.getGoals({
        idSite: 1,
      });
      expect(mockClient.request).toHaveBeenCalledWith("Goals.getGoals", {
        idSite: 1,
      });
    });

    it("should include orderByName when provided", async () => {
      await goalsModule.getGoals({
        idSite: 1,
        orderByName: true,
      });
      expect(mockClient.request).toHaveBeenCalledWith("Goals.getGoals", {
        idSite: 1,
        orderByName: true,
      });
    });
  });

  describe("addGoal", () => {
    it("should call the API with required parameters", async () => {
      await goalsModule.addGoal({
        idSite: 1,
        name: "Download Brochure",
        matchAttribute: "url",
        pattern: "/brochure",
        patternType: "contains",
      });
      expect(mockClient.request).toHaveBeenCalledWith("Goals.addGoal", {
        idSite: 1,
        name: "Download Brochure",
        matchAttribute: "url",
        pattern: "/brochure",
        patternType: "contains",
      });
    });

    it("should include optional parameters when provided", async () => {
      await goalsModule.addGoal({
        idSite: 1,
        name: "Download Brochure",
        matchAttribute: "url",
        pattern: "/brochure",
        patternType: "contains",
        caseSensitive: true,
        revenue: 10.5,
        allowMultipleConversionsPerVisit: false,
        description: "Brochure downloads",
        useEventValueAsRevenue: true,
      });
      expect(mockClient.request).toHaveBeenCalledWith("Goals.addGoal", {
        idSite: 1,
        name: "Download Brochure",
        matchAttribute: "url",
        pattern: "/brochure",
        patternType: "contains",
        caseSensitive: true,
        revenue: 10.5,
        allowMultipleConversionsPerVisit: false,
        description: "Brochure downloads",
        useEventValueAsRevenue: true,
      });
    });
  });

  describe("updateGoal", () => {
    it("should call the API with required parameters", async () => {
      await goalsModule.updateGoal({
        idSite: 1,
        idGoal: 123,
        name: "Download Brochure",
        matchAttribute: "url",
        pattern: "/brochure",
        patternType: "contains",
      });
      expect(mockClient.request).toHaveBeenCalledWith("Goals.updateGoal", {
        idSite: 1,
        idGoal: 123,
        name: "Download Brochure",
        matchAttribute: "url",
        pattern: "/brochure",
        patternType: "contains",
      });
    });

    it("should include optional parameters when provided", async () => {
      await goalsModule.updateGoal({
        idSite: 1,
        idGoal: 123,
        name: "Download Brochure",
        matchAttribute: "url",
        pattern: "/brochure",
        patternType: "contains",
        caseSensitive: true,
        revenue: 10.5,
        allowMultipleConversionsPerVisit: false,
        description: "Brochure downloads",
        useEventValueAsRevenue: true,
      });
      expect(mockClient.request).toHaveBeenCalledWith("Goals.updateGoal", {
        idSite: 1,
        idGoal: 123,
        name: "Download Brochure",
        matchAttribute: "url",
        pattern: "/brochure",
        patternType: "contains",
        caseSensitive: true,
        revenue: 10.5,
        allowMultipleConversionsPerVisit: false,
        description: "Brochure downloads",
        useEventValueAsRevenue: true,
      });
    });
  });

  describe("deleteGoal", () => {
    it("should call the API with required parameters", async () => {
      await goalsModule.deleteGoal({
        idSite: 1,
        idGoal: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith("Goals.deleteGoal", {
        idSite: 1,
        idGoal: 123,
      });
    });
  });

  describe("getItemsSku", () => {
    it("should call the API with required parameters", async () => {
      await goalsModule.getItemsSku({
        idSite: 1,
        period: "day",
        date: "yesterday",
      });
      expect(mockClient.request).toHaveBeenCalledWith("Goals.getItemsSku", {
        idSite: 1,
        period: "day",
        date: "yesterday",
      });
    });

    it("should include optional parameters when provided", async () => {
      await goalsModule.getItemsSku({
        idSite: 1,
        period: "day",
        date: "yesterday",
        abandonedCarts: true,
        segment: "deviceType==desktop",
      });
      expect(mockClient.request).toHaveBeenCalledWith("Goals.getItemsSku", {
        idSite: 1,
        period: "day",
        date: "yesterday",
        abandonedCarts: true,
        segment: "deviceType==desktop",
      });
    });
  });

  describe("getItemsName", () => {
    it("should call the API with required parameters", async () => {
      await goalsModule.getItemsName({
        idSite: 1,
        period: "day",
        date: "yesterday",
      });
      expect(mockClient.request).toHaveBeenCalledWith("Goals.getItemsName", {
        idSite: 1,
        period: "day",
        date: "yesterday",
      });
    });

    it("should include optional parameters when provided", async () => {
      await goalsModule.getItemsName({
        idSite: 1,
        period: "day",
        date: "yesterday",
        abandonedCarts: true,
        segment: "deviceType==desktop",
      });
      expect(mockClient.request).toHaveBeenCalledWith("Goals.getItemsName", {
        idSite: 1,
        period: "day",
        date: "yesterday",
        abandonedCarts: true,
        segment: "deviceType==desktop",
      });
    });
  });

  describe("getItemsCategory", () => {
    it("should call the API with required parameters", async () => {
      await goalsModule.getItemsCategory({
        idSite: 1,
        period: "day",
        date: "yesterday",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "Goals.getItemsCategory",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
        }
      );
    });

    it("should include optional parameters when provided", async () => {
      await goalsModule.getItemsCategory({
        idSite: 1,
        period: "day",
        date: "yesterday",
        abandonedCarts: true,
        segment: "deviceType==desktop",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "Goals.getItemsCategory",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          abandonedCarts: true,
          segment: "deviceType==desktop",
        }
      );
    });
  });

  describe("get", () => {
    it("should call the API with required parameters", async () => {
      await goalsModule.get({
        idSite: 1,
        period: "day",
        date: "yesterday",
      });
      expect(mockClient.request).toHaveBeenCalledWith("Goals.get", {
        idSite: 1,
        period: "day",
        date: "yesterday",
      });
    });

    it("should include optional parameters when provided", async () => {
      await goalsModule.get({
        idSite: 1,
        period: "day",
        date: "yesterday",
        segment: "deviceType==desktop",
        idGoal: 1,
        columns: ["nb_visits", "conversion_rate"],
        showAllGoalSpecificMetrics: true,
        compare: "previous",
      });
      expect(mockClient.request).toHaveBeenCalledWith("Goals.get", {
        idSite: 1,
        period: "day",
        date: "yesterday",
        segment: "deviceType==desktop",
        idGoal: 1,
        columns: "nb_visits,conversion_rate",
        showAllGoalSpecificMetrics: true,
        compare: "previous",
      });
    });

    it("should handle string columns correctly", async () => {
      await goalsModule.get({
        idSite: 1,
        period: "day",
        date: "yesterday",
        segment: "deviceType==desktop",
        idGoal: 1,
        columns: "nb_visits,conversion_rate",
      });
      expect(mockClient.request).toHaveBeenCalledWith("Goals.get", {
        idSite: 1,
        period: "day",
        date: "yesterday",
        segment: "deviceType==desktop",
        idGoal: 1,
        columns: "nb_visits,conversion_rate",
      });
    });
  });

  describe("getDaysToConversion", () => {
    it("should call the API with required parameters", async () => {
      await goalsModule.getDaysToConversion({
        idSite: 1,
        period: "day",
        date: "yesterday",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "Goals.getDaysToConversion",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
        }
      );
    });

    it("should include optional parameters when provided", async () => {
      await goalsModule.getDaysToConversion({
        idSite: 1,
        period: "day",
        date: "yesterday",
        segment: "deviceType==desktop",
        idGoal: 1,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "Goals.getDaysToConversion",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          segment: "deviceType==desktop",
          idGoal: 1,
        }
      );
    });
  });

  describe("getVisitsUntilConversion", () => {
    it("should call the API with required parameters", async () => {
      await goalsModule.getVisitsUntilConversion({
        idSite: 1,
        period: "day",
        date: "yesterday",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "Goals.getVisitsUntilConversion",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
        }
      );
    });

    it("should include optional parameters when provided", async () => {
      await goalsModule.getVisitsUntilConversion({
        idSite: 1,
        period: "day",
        date: "yesterday",
        segment: "deviceType==desktop",
        idGoal: 1,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "Goals.getVisitsUntilConversion",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          segment: "deviceType==desktop",
          idGoal: 1,
        }
      );
    });
  });
});
