import { beforeEach, describe, expect, it, vi } from "vitest";
import { CoreReportingClient, VisitsSummaryModule } from "../../src/index";

// Mock the CoreReportingClient
vi.mock(import("../../src/index"), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    CoreReportingClient: vi.fn().mockImplementation(() => {
      return {
        request: vi.fn().mockImplementation((method, params) => {
          return Promise.resolve({ method, params });
        }),
      };
    }),
  };
});

describe("VisitsSummaryModule", () => {
  let client: CoreReportingClient;
  let visitsSummary: VisitsSummaryModule;

  beforeEach(() => {
    client = new CoreReportingClient({
      url: "https://example.org/matomo",
      tokenAuth: "test_token",
    });
    visitsSummary = new VisitsSummaryModule(client);
  });

  it("should get overall visit summary", async () => {
    const result = await visitsSummary.get({
      idSite: 1,
      period: "day",
      date: "yesterday",
      segment: "deviceType==mobile",
      columns: "nb_visits,bounce_rate",
    });

    expect(client.request).toHaveBeenCalledWith("VisitsSummary.get", {
      idSite: 1,
      period: "day",
      date: "yesterday",
      segment: "deviceType==mobile",
      columns: "nb_visits,bounce_rate",
    });

    expect(result).toEqual({
      method: "VisitsSummary.get",
      params: {
        idSite: 1,
        period: "day",
        date: "yesterday",
        segment: "deviceType==mobile",
        columns: "nb_visits,bounce_rate",
      },
    });
  });

  it("should get visits count", async () => {
    const result = await visitsSummary.getVisits({
      idSite: 1,
      period: "week",
      date: "last7",
      segment: "country==FR",
    });

    expect(client.request).toHaveBeenCalledWith("VisitsSummary.getVisits", {
      idSite: 1,
      period: "week",
      date: "last7",
      segment: "country==FR",
    });

    expect(result).toEqual({
      method: "VisitsSummary.getVisits",
      params: {
        idSite: 1,
        period: "week",
        date: "last7",
        segment: "country==FR",
      },
    });
  });

  it("should get unique visitors", async () => {
    const result = await visitsSummary.getUniqueVisitors({
      idSite: 1,
      period: "month",
      date: "last30",
    });

    expect(client.request).toHaveBeenCalledWith(
      "VisitsSummary.getUniqueVisitors",
      {
        idSite: 1,
        period: "month",
        date: "last30",
      }
    );

    expect(result).toEqual({
      method: "VisitsSummary.getUniqueVisitors",
      params: {
        idSite: 1,
        period: "month",
        date: "last30",
      },
    });
  });

  it("should get users count", async () => {
    const result = await visitsSummary.getUsers({
      idSite: 1,
      period: "year",
      date: "2023",
    });

    expect(client.request).toHaveBeenCalledWith("VisitsSummary.getUsers", {
      idSite: 1,
      period: "year",
      date: "2023",
    });

    expect(result).toEqual({
      method: "VisitsSummary.getUsers",
      params: {
        idSite: 1,
        period: "year",
        date: "2023",
      },
    });
  });

  it("should get actions count", async () => {
    const result = await visitsSummary.getActions({
      idSite: 1,
      period: "range",
      date: "2023-01-01,2023-01-31",
    });

    expect(client.request).toHaveBeenCalledWith("VisitsSummary.getActions", {
      idSite: 1,
      period: "range",
      date: "2023-01-01,2023-01-31",
    });

    expect(result).toEqual({
      method: "VisitsSummary.getActions",
      params: {
        idSite: 1,
        period: "range",
        date: "2023-01-01,2023-01-31",
      },
    });
  });

  it("should get max actions", async () => {
    const result = await visitsSummary.getMaxActions({
      idSite: 1,
      period: "day",
      date: "yesterday",
    });

    expect(client.request).toHaveBeenCalledWith("VisitsSummary.getMaxActions", {
      idSite: 1,
      period: "day",
      date: "yesterday",
    });

    expect(result).toEqual({
      method: "VisitsSummary.getMaxActions",
      params: {
        idSite: 1,
        period: "day",
        date: "yesterday",
      },
    });
  });

  it("should get bounce count", async () => {
    const result = await visitsSummary.getBounceCount({
      idSite: 1,
      period: "day",
      date: "yesterday",
    });

    expect(client.request).toHaveBeenCalledWith(
      "VisitsSummary.getBounceCount",
      {
        idSite: 1,
        period: "day",
        date: "yesterday",
      }
    );

    expect(result).toEqual({
      method: "VisitsSummary.getBounceCount",
      params: {
        idSite: 1,
        period: "day",
        date: "yesterday",
      },
    });
  });

  it("should get visits converted", async () => {
    const result = await visitsSummary.getVisitsConverted({
      idSite: 1,
      period: "day",
      date: "yesterday",
    });

    expect(client.request).toHaveBeenCalledWith(
      "VisitsSummary.getVisitsConverted",
      {
        idSite: 1,
        period: "day",
        date: "yesterday",
      }
    );

    expect(result).toEqual({
      method: "VisitsSummary.getVisitsConverted",
      params: {
        idSite: 1,
        period: "day",
        date: "yesterday",
      },
    });
  });

  it("should get sum visits length", async () => {
    const result = await visitsSummary.getSumVisitsLength({
      idSite: 1,
      period: "day",
      date: "yesterday",
    });

    expect(client.request).toHaveBeenCalledWith(
      "VisitsSummary.getSumVisitsLength",
      {
        idSite: 1,
        period: "day",
        date: "yesterday",
      }
    );

    expect(result).toEqual({
      method: "VisitsSummary.getSumVisitsLength",
      params: {
        idSite: 1,
        period: "day",
        date: "yesterday",
      },
    });
  });

  it("should get pretty sum visits length", async () => {
    const result = await visitsSummary.getSumVisitsLengthPretty({
      idSite: 1,
      period: "day",
      date: "yesterday",
    });

    expect(client.request).toHaveBeenCalledWith(
      "VisitsSummary.getSumVisitsLengthPretty",
      {
        idSite: 1,
        period: "day",
        date: "yesterday",
      }
    );

    expect(result).toEqual({
      method: "VisitsSummary.getSumVisitsLengthPretty",
      params: {
        idSite: 1,
        period: "day",
        date: "yesterday",
      },
    });
  });
});
