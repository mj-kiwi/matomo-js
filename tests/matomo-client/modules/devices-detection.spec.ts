import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  CoreReportingClient,
  DevicesDetectionModule,
} from "@mj-kiwi/matomo-client";

describe("DevicesDetection Module", () => {
  // Mock CoreReportingClient with a spy on the request method
  const mockClient = {
    request: vi.fn().mockImplementation(() => Promise.resolve({})),
  } as unknown as CoreReportingClient;

  const devicesDetection = new DevicesDetectionModule(mockClient);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("getType should make correct API call", async () => {
    await devicesDetection.getType(
      1,
      "day",
      "2022-01-01",
      "deviceType==mobile"
    );

    expect(mockClient.request).toHaveBeenCalledWith(
      "DevicesDetection.getType",
      {
        idSite: 1,
        period: "day",
        date: "2022-01-01",
        segment: "deviceType==mobile",
      }
    );
  });

  it("getBrand should make correct API call", async () => {
    await devicesDetection.getBrand(
      1,
      "day",
      "2022-01-01",
      "deviceType==mobile"
    );

    expect(mockClient.request).toHaveBeenCalledWith(
      "DevicesDetection.getBrand",
      {
        idSite: 1,
        period: "day",
        date: "2022-01-01",
        segment: "deviceType==mobile",
      }
    );
  });

  it("getModel should make correct API call", async () => {
    await devicesDetection.getModel(
      1,
      "day",
      "2022-01-01",
      "deviceType==mobile"
    );

    expect(mockClient.request).toHaveBeenCalledWith(
      "DevicesDetection.getModel",
      {
        idSite: 1,
        period: "day",
        date: "2022-01-01",
        segment: "deviceType==mobile",
      }
    );
  });

  it("getOsFamilies should make correct API call", async () => {
    await devicesDetection.getOsFamilies(
      1,
      "day",
      "2022-01-01",
      "deviceType==mobile"
    );

    expect(mockClient.request).toHaveBeenCalledWith(
      "DevicesDetection.getOsFamilies",
      {
        idSite: 1,
        period: "day",
        date: "2022-01-01",
        segment: "deviceType==mobile",
      }
    );
  });

  it("getOsVersions should make correct API call", async () => {
    await devicesDetection.getOsVersions(
      1,
      "day",
      "2022-01-01",
      "deviceType==mobile"
    );

    expect(mockClient.request).toHaveBeenCalledWith(
      "DevicesDetection.getOsVersions",
      {
        idSite: 1,
        period: "day",
        date: "2022-01-01",
        segment: "deviceType==mobile",
      }
    );
  });

  it("getBrowsers should make correct API call", async () => {
    await devicesDetection.getBrowsers(
      1,
      "day",
      "2022-01-01",
      "deviceType==mobile"
    );

    expect(mockClient.request).toHaveBeenCalledWith(
      "DevicesDetection.getBrowsers",
      {
        idSite: 1,
        period: "day",
        date: "2022-01-01",
        segment: "deviceType==mobile",
      }
    );
  });

  it("getBrowserVersions should make correct API call", async () => {
    await devicesDetection.getBrowserVersions(
      1,
      "day",
      "2022-01-01",
      "deviceType==mobile"
    );

    expect(mockClient.request).toHaveBeenCalledWith(
      "DevicesDetection.getBrowserVersions",
      {
        idSite: 1,
        period: "day",
        date: "2022-01-01",
        segment: "deviceType==mobile",
      }
    );
  });

  it("getBrowserEngines should make correct API call", async () => {
    await devicesDetection.getBrowserEngines(
      1,
      "day",
      "2022-01-01",
      "deviceType==mobile"
    );

    expect(mockClient.request).toHaveBeenCalledWith(
      "DevicesDetection.getBrowserEngines",
      {
        idSite: 1,
        period: "day",
        date: "2022-01-01",
        segment: "deviceType==mobile",
      }
    );
  });
});
