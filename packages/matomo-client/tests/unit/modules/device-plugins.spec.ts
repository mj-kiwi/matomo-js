import { beforeEach, describe, expect, it, vi } from "vitest";
import { CoreReportingClient, DevicePluginsModule } from "../../../src/index";

describe("DevicePlugins Module", () => {
  // Mock CoreReportingClient with a spy on the request method
  const mockClient = {
    request: vi.fn().mockImplementation(() => Promise.resolve({})),
  } as unknown as CoreReportingClient;

  const devicePlugins = new DevicePluginsModule(mockClient);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("getPlugin should make correct API call with all parameters", async () => {
    await devicePlugins.getPlugin(1, "day", "2022-01-01", "deviceType==mobile");

    expect(mockClient.request).toHaveBeenCalledWith("DevicePlugins.getPlugin", {
      idSite: 1,
      period: "day",
      date: "2022-01-01",
      segment: "deviceType==mobile",
    });
  });

  it("getPlugin should handle default parameters", async () => {
    await devicePlugins.getPlugin(1, "day", "2022-01-01");

    expect(mockClient.request).toHaveBeenCalledWith("DevicePlugins.getPlugin", {
      idSite: 1,
      period: "day",
      date: "2022-01-01",
    });
  });
});
