import { beforeEach, describe, expect, it, vi } from "vitest";
import { CoreReportingClient, EventsModule } from "../../src/index";

describe("Events Module", () => {
  // Mock CoreReportingClient with a spy on the request method
  const mockClient = {
    request: vi.fn().mockImplementation(() => Promise.resolve({})),
  } as unknown as CoreReportingClient;

  const events = new EventsModule(mockClient);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("getCategory should make correct API call", async () => {
    await events.getCategory(
      1,
      "day",
      "2022-01-01",
      "eventCategory==video",
      "expanded",
      "eventAction",
      "flat"
    );

    expect(mockClient.request).toHaveBeenCalledWith("Events.getCategory", {
      idSite: 1,
      period: "day",
      date: "2022-01-01",
      segment: "eventCategory==video",
      expanded: "expanded",
      secondaryDimension: "eventAction",
      flat: "flat",
    });
  });

  it("getAction should make correct API call", async () => {
    await events.getAction(
      1,
      "day",
      "2022-01-01",
      "eventAction==play",
      "expanded",
      "eventName",
      "flat"
    );

    expect(mockClient.request).toHaveBeenCalledWith("Events.getAction", {
      idSite: 1,
      period: "day",
      date: "2022-01-01",
      segment: "eventAction==play",
      expanded: "expanded",
      secondaryDimension: "eventName",
      flat: "flat",
    });
  });

  it("getName should make correct API call", async () => {
    await events.getName(
      1,
      "day",
      "2022-01-01",
      "eventName==intro",
      "expanded",
      "eventCategory",
      "flat"
    );

    expect(mockClient.request).toHaveBeenCalledWith("Events.getName", {
      idSite: 1,
      period: "day",
      date: "2022-01-01",
      segment: "eventName==intro",
      expanded: "expanded",
      secondaryDimension: "eventCategory",
      flat: "flat",
    });
  });

  it("getActionFromCategoryId should make correct API call", async () => {
    await events.getActionFromCategoryId(
      1,
      "day",
      "2022-01-01",
      5,
      "eventCategory==video"
    );

    expect(mockClient.request).toHaveBeenCalledWith(
      "Events.getActionFromCategoryId",
      {
        idSite: 1,
        period: "day",
        date: "2022-01-01",
        idSubtable: 5,
        segment: "eventCategory==video",
      }
    );
  });

  it("getNameFromCategoryId should make correct API call", async () => {
    await events.getNameFromCategoryId(
      1,
      "day",
      "2022-01-01",
      5,
      "eventCategory==video"
    );

    expect(mockClient.request).toHaveBeenCalledWith(
      "Events.getNameFromCategoryId",
      {
        idSite: 1,
        period: "day",
        date: "2022-01-01",
        idSubtable: 5,
        segment: "eventCategory==video",
      }
    );
  });

  it("getCategoryFromActionId should make correct API call", async () => {
    await events.getCategoryFromActionId(
      1,
      "day",
      "2022-01-01",
      5,
      "eventAction==play"
    );

    expect(mockClient.request).toHaveBeenCalledWith(
      "Events.getCategoryFromActionId",
      {
        idSite: 1,
        period: "day",
        date: "2022-01-01",
        idSubtable: 5,
        segment: "eventAction==play",
      }
    );
  });

  it("getNameFromActionId should make correct API call", async () => {
    await events.getNameFromActionId(
      1,
      "day",
      "2022-01-01",
      5,
      "eventAction==play"
    );

    expect(mockClient.request).toHaveBeenCalledWith(
      "Events.getNameFromActionId",
      {
        idSite: 1,
        period: "day",
        date: "2022-01-01",
        idSubtable: 5,
        segment: "eventAction==play",
      }
    );
  });

  it("getActionFromNameId should make correct API call", async () => {
    await events.getActionFromNameId(
      1,
      "day",
      "2022-01-01",
      5,
      "eventName==intro"
    );

    expect(mockClient.request).toHaveBeenCalledWith(
      "Events.getActionFromNameId",
      {
        idSite: 1,
        period: "day",
        date: "2022-01-01",
        idSubtable: 5,
        segment: "eventName==intro",
      }
    );
  });

  it("getCategoryFromNameId should make correct API call", async () => {
    await events.getCategoryFromNameId(
      1,
      "day",
      "2022-01-01",
      5,
      "eventName==intro"
    );

    expect(mockClient.request).toHaveBeenCalledWith(
      "Events.getCategoryFromNameId",
      {
        idSite: 1,
        period: "day",
        date: "2022-01-01",
        idSubtable: 5,
        segment: "eventName==intro",
      }
    );
  });
});
