// filepath: /Users/mingjian.liang/MyProjects/matomo-js/packages/reporting-client/tests/custom-variables.spec.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CustomVariablesModule } from "../../src/index";

describe("CustomVariablesModule", () => {
  let mockClient: any;
  let module: CustomVariablesModule;

  beforeEach(() => {
    mockClient = {
      request: vi.fn().mockResolvedValue({}),
    };
    module = new CustomVariablesModule(mockClient);
  });

  it("should get custom variables with required parameters", async () => {
    await module.getCustomVariables({
      idSite: 1,
      period: "day",
      date: "yesterday",
    });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomVariables.getCustomVariables",
      {
        idSite: 1,
        period: "day",
        date: "yesterday",
      }
    );
  });

  it("should get custom variables with all parameters", async () => {
    await module.getCustomVariables({
      idSite: 1,
      period: "day",
      date: "yesterday",
      segment: "country==FR",
      expanded: 1,
      flat: 1,
    });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomVariables.getCustomVariables",
      {
        idSite: 1,
        period: "day",
        date: "yesterday",
        segment: "country==FR",
        expanded: 1,
        flat: 1,
      }
    );
  });

  it("should get custom variable values from name id", async () => {
    await module.getCustomVariablesValuesFromNameId({
      idSite: 1,
      period: "day",
      date: "yesterday",
      idSubtable: 2,
    });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomVariables.getCustomVariablesValuesFromNameId",
      {
        idSite: 1,
        period: "day",
        date: "yesterday",
        idSubtable: 2,
      }
    );
  });

  it("should get custom variable values from name id with segment", async () => {
    await module.getCustomVariablesValuesFromNameId({
      idSite: 1,
      period: "day",
      date: "yesterday",
      idSubtable: 2,
      segment: "country==FR",
    });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomVariables.getCustomVariablesValuesFromNameId",
      {
        idSite: 1,
        period: "day",
        date: "yesterday",
        idSubtable: 2,
        segment: "country==FR",
      }
    );
  });

  it("should get usages of slots", async () => {
    await module.getUsagesOfSlots({
      idSite: 1,
    });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomVariables.getUsagesOfSlots",
      {
        idSite: 1,
      }
    );
  });
});
