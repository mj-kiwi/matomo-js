import { describe, it, expect, vi, beforeEach } from "vitest";
import { FunnelsModule, CoreReportingClient } from "../../src/index";

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

describe("FunnelsModule", () => {
  let funnelsModule: FunnelsModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and Funnels module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    funnelsModule = new FunnelsModule(clientInstance);
  });

  describe("getMetrics", () => {
    it("should call the API with required parameters", async () => {
      await funnelsModule.getMetrics(1, "day", "yesterday");
      expect(mockClient.request).toHaveBeenCalledWith("Funnels.getMetrics", {
        idSite: 1,
        period: "day",
        date: "yesterday",
      });
    });

    it("should include optional parameters when provided", async () => {
      await funnelsModule.getMetrics(
        1,
        "day",
        "yesterday",
        123,
        456,
        "deviceType==mobile"
      );
      expect(mockClient.request).toHaveBeenCalledWith("Funnels.getMetrics", {
        idSite: 1,
        period: "day",
        date: "yesterday",
        idFunnel: 123,
        idGoal: 456,
        segment: "deviceType==mobile",
      });
    });
  });

  describe("getFunnelFlow", () => {
    it("should call the API with required parameters", async () => {
      await funnelsModule.getFunnelFlow(1, "day", "yesterday");
      expect(mockClient.request).toHaveBeenCalledWith("Funnels.getFunnelFlow", {
        idSite: 1,
        period: "day",
        date: "yesterday",
      });
    });

    it("should include optional parameters when provided", async () => {
      await funnelsModule.getFunnelFlow(
        1,
        "day",
        "yesterday",
        123,
        456,
        "deviceType==mobile"
      );
      expect(mockClient.request).toHaveBeenCalledWith("Funnels.getFunnelFlow", {
        idSite: 1,
        period: "day",
        date: "yesterday",
        idFunnel: 123,
        idGoal: 456,
        segment: "deviceType==mobile",
      });
    });
  });

  describe("getFunnelFlowTable", () => {
    it("should call the API with required parameters", async () => {
      await funnelsModule.getFunnelFlowTable(1, "day", "yesterday");
      expect(mockClient.request).toHaveBeenCalledWith(
        "Funnels.getFunnelFlowTable",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
        }
      );
    });

    it("should include optional parameters when provided", async () => {
      await funnelsModule.getFunnelFlowTable(
        1,
        "day",
        "yesterday",
        123,
        456,
        "deviceType==mobile"
      );
      expect(mockClient.request).toHaveBeenCalledWith(
        "Funnels.getFunnelFlowTable",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idFunnel: 123,
          idGoal: 456,
          segment: "deviceType==mobile",
        }
      );
    });
  });

  describe("getFunnelStepSubtable", () => {
    it("should call the API with required parameters", async () => {
      await funnelsModule.getFunnelStepSubtable(1, "day", "yesterday", 2);
      expect(mockClient.request).toHaveBeenCalledWith(
        "Funnels.getFunnelStepSubtable",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          stepPosition: 2,
        }
      );
    });

    it("should include optional parameters when provided", async () => {
      await funnelsModule.getFunnelStepSubtable(
        1,
        "day",
        "yesterday",
        2,
        123,
        456,
        "deviceType==mobile"
      );
      expect(mockClient.request).toHaveBeenCalledWith(
        "Funnels.getFunnelStepSubtable",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          stepPosition: 2,
          idFunnel: 123,
          idGoal: 456,
          segment: "deviceType==mobile",
        }
      );
    });
  });

  describe("getFunnelEntries", () => {
    it("should call the API with required parameters", async () => {
      await funnelsModule.getFunnelEntries(1, "day", "yesterday", 123);
      expect(mockClient.request).toHaveBeenCalledWith(
        "Funnels.getFunnelEntries",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idFunnel: 123,
        }
      );
    });

    it("should include optional parameters when provided", async () => {
      await funnelsModule.getFunnelEntries(
        1,
        "day",
        "yesterday",
        123,
        "deviceType==mobile",
        2,
        true,
        456,
        true
      );
      expect(mockClient.request).toHaveBeenCalledWith(
        "Funnels.getFunnelEntries",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idFunnel: 123,
          segment: "deviceType==mobile",
          step: 2,
          expanded: true,
          idSubtable: 456,
          flat: true,
        }
      );
    });
  });

  describe("getFunnelExits", () => {
    it("should call the API with required parameters", async () => {
      await funnelsModule.getFunnelExits(1, "day", "yesterday", 123);
      expect(mockClient.request).toHaveBeenCalledWith(
        "Funnels.getFunnelExits",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idFunnel: 123,
        }
      );
    });

    it("should include optional parameters when provided", async () => {
      await funnelsModule.getFunnelExits(
        1,
        "day",
        "yesterday",
        123,
        "deviceType==mobile",
        2
      );
      expect(mockClient.request).toHaveBeenCalledWith(
        "Funnels.getFunnelExits",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idFunnel: 123,
          segment: "deviceType==mobile",
          step: 2,
        }
      );
    });
  });

  describe("getGoalFunnel", () => {
    it("should call the API with required parameters", async () => {
      await funnelsModule.getGoalFunnel(1, 123);
      expect(mockClient.request).toHaveBeenCalledWith("Funnels.getGoalFunnel", {
        idSite: 1,
        idGoal: 123,
      });
    });
  });

  describe("getSalesFunnelForSite", () => {
    it("should call the API with required parameters", async () => {
      await funnelsModule.getSalesFunnelForSite(1);
      expect(mockClient.request).toHaveBeenCalledWith(
        "Funnels.getSalesFunnelForSite",
        {
          idSite: 1,
        }
      );
    });
  });

  describe("getFunnel", () => {
    it("should call the API with required parameters", async () => {
      await funnelsModule.getFunnel(1, 123);
      expect(mockClient.request).toHaveBeenCalledWith("Funnels.getFunnel", {
        idSite: 1,
        idFunnel: 123,
      });
    });
  });

  describe("getAllActivatedFunnelsForSite", () => {
    it("should call the API with required parameters", async () => {
      await funnelsModule.getAllActivatedFunnelsForSite(1);
      expect(mockClient.request).toHaveBeenCalledWith(
        "Funnels.getAllActivatedFunnelsForSite",
        {
          idSite: 1,
        }
      );
    });
  });

  describe("hasAnyActivatedFunnelForSite", () => {
    it("should call the API with required parameters", async () => {
      await funnelsModule.hasAnyActivatedFunnelForSite(1);
      expect(mockClient.request).toHaveBeenCalledWith(
        "Funnels.hasAnyActivatedFunnelForSite",
        {
          idSite: 1,
        }
      );
    });
  });

  describe("deleteGoalFunnel", () => {
    it("should call the API with required parameters", async () => {
      await funnelsModule.deleteGoalFunnel(1, 123);
      expect(mockClient.request).toHaveBeenCalledWith(
        "Funnels.deleteGoalFunnel",
        {
          idSite: 1,
          idGoal: 123,
        }
      );
    });
  });

  describe("deleteNonGoalFunnel", () => {
    it("should call the API with required parameters", async () => {
      await funnelsModule.deleteNonGoalFunnel(1, 123);
      expect(mockClient.request).toHaveBeenCalledWith(
        "Funnels.deleteNonGoalFunnel",
        {
          idSite: 1,
          idFunnel: 123,
        }
      );
    });
  });

  describe("setGoalFunnel", () => {
    it("should call the API with required parameters", async () => {
      const steps = [
        { pattern: "/checkout/cart", pattern_type: "contains" },
        { pattern: "/checkout/delivery", pattern_type: "contains" },
        { pattern: "/checkout/payment", pattern_type: "contains" },
      ];

      await funnelsModule.setGoalFunnel(1, 123, true, steps);
      expect(mockClient.request).toHaveBeenCalledWith("Funnels.setGoalFunnel", {
        idSite: 1,
        idGoal: 123,
        isActivated: true,
        steps: steps,
      });
    });
  });

  describe("saveNonGoalFunnel", () => {
    it("should call the API with required parameters", async () => {
      const steps = [
        { pattern: "/landing", pattern_type: "contains" },
        { pattern: "/product", pattern_type: "contains" },
        { pattern: "/checkout", pattern_type: "contains" },
      ];

      await funnelsModule.saveNonGoalFunnel(1, 123, "Purchase Funnel", steps);
      expect(mockClient.request).toHaveBeenCalledWith(
        "Funnels.saveNonGoalFunnel",
        {
          idSite: 1,
          idFunnel: 123,
          funnelName: "Purchase Funnel",
          steps: steps,
        }
      );
    });
  });

  describe("getAvailablePatternMatches", () => {
    it("should call the API with no parameters", async () => {
      await funnelsModule.getAvailablePatternMatches();
      expect(mockClient.request).toHaveBeenCalledWith(
        "Funnels.getAvailablePatternMatches"
      );
    });
  });

  describe("testUrlMatchesSteps", () => {
    it("should call the API with required parameters", async () => {
      const steps = [
        { pattern: "/checkout/cart", pattern_type: "contains" },
        { pattern: "/checkout/delivery", pattern_type: "contains" },
      ];

      await funnelsModule.testUrlMatchesSteps(
        "https://example.org/checkout/cart",
        steps
      );
      expect(mockClient.request).toHaveBeenCalledWith(
        "Funnels.testUrlMatchesSteps",
        {
          url: "https://example.org/checkout/cart",
          steps: steps,
        }
      );
    });
  });
});
