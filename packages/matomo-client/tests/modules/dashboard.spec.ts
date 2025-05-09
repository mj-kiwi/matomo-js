import { beforeEach, describe, expect, it, vi } from "vitest";
import { CoreReportingClient, DashboardModule } from "../../src/index";

describe("Dashboard Module", () => {
  // Mock CoreReportingClient with a spy on the request method
  const mockClient = {
    request: vi.fn().mockImplementation(() => Promise.resolve({})),
  } as unknown as CoreReportingClient;

  const dashboard = new DashboardModule(mockClient);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("getDashboards should make correct API call", async () => {
    await dashboard.getDashboards({
      login: "user1",
      returnDefaultIfEmpty: "0",
    });

    expect(mockClient.request).toHaveBeenCalledWith("Dashboard.getDashboards", {
      login: "user1",
      returnDefaultIfEmpty: "0",
    });
  });

  it("getDashboards should handle default parameters", async () => {
    await dashboard.getDashboards({});

    expect(mockClient.request).toHaveBeenCalledWith(
      "Dashboard.getDashboards",
      {}
    );
  });

  it("createNewDashboardForUser should make correct API call", async () => {
    await dashboard.createNewDashboardForUser({
      login: "user1",
      dashboardName: "My Dashboard",
      addDefaultWidgets: "0",
    });

    expect(mockClient.request).toHaveBeenCalledWith(
      "Dashboard.createNewDashboardForUser",
      {
        login: "user1",
        dashboardName: "My Dashboard",
        addDefaultWidgets: "0",
      }
    );
  });

  it("createNewDashboardForUser should handle default parameters", async () => {
    await dashboard.createNewDashboardForUser({ login: "user1" });

    expect(mockClient.request).toHaveBeenCalledWith(
      "Dashboard.createNewDashboardForUser",
      {
        login: "user1",
      }
    );
  });

  it("removeDashboard should make correct API call", async () => {
    await dashboard.removeDashboard({ idDashboard: 5, login: "user1" });

    expect(mockClient.request).toHaveBeenCalledWith(
      "Dashboard.removeDashboard",
      {
        idDashboard: 5,
        login: "user1",
      }
    );
  });

  it("copyDashboardToUser should make correct API call", async () => {
    await dashboard.copyDashboardToUser({
      idDashboard: 5,
      copyToUser: "user2",
      dashboardName: "Copied Dashboard",
    });

    expect(mockClient.request).toHaveBeenCalledWith(
      "Dashboard.copyDashboardToUser",
      {
        idDashboard: 5,
        copyToUser: "user2",
        dashboardName: "Copied Dashboard",
      }
    );
  });

  it("resetDashboardLayout should make correct API call", async () => {
    await dashboard.resetDashboardLayout({ idDashboard: 5, login: "user1" });

    expect(mockClient.request).toHaveBeenCalledWith(
      "Dashboard.resetDashboardLayout",
      {
        idDashboard: 5,
        login: "user1",
      }
    );
  });
});
