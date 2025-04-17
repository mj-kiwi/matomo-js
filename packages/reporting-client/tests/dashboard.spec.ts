import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CoreReportingClient } from '../src/modules/core';
import { DashboardModule } from '../src/modules/dashboard';

describe('Dashboard Module', () => {
  // Mock CoreReportingClient with a spy on the request method
  const mockClient = {
    request: vi.fn().mockImplementation(() => Promise.resolve({})),
  } as unknown as CoreReportingClient;

  const dashboard = new DashboardModule(mockClient);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('getDashboards should make correct API call', async () => {
    await dashboard.getDashboards('user1', '0');

    expect(mockClient.request).toHaveBeenCalledWith('Dashboard.getDashboards', {
      login: 'user1',
      returnDefaultIfEmpty: '0',
    });
  });

  it('getDashboards should handle default parameters', async () => {
    await dashboard.getDashboards();

    expect(mockClient.request).toHaveBeenCalledWith(
      'Dashboard.getDashboards',
      {}
    );
  });

  it('createNewDashboardForUser should make correct API call', async () => {
    await dashboard.createNewDashboardForUser('user1', 'My Dashboard', '0');

    expect(mockClient.request).toHaveBeenCalledWith(
      'Dashboard.createNewDashboardForUser',
      {
        login: 'user1',
        dashboardName: 'My Dashboard',
        addDefaultWidgets: '0',
      }
    );
  });

  it('createNewDashboardForUser should handle default parameters', async () => {
    await dashboard.createNewDashboardForUser('user1');

    expect(mockClient.request).toHaveBeenCalledWith(
      'Dashboard.createNewDashboardForUser',
      {
        login: 'user1',
      }
    );
  });

  it('removeDashboard should make correct API call', async () => {
    await dashboard.removeDashboard(5, 'user1');

    expect(mockClient.request).toHaveBeenCalledWith(
      'Dashboard.removeDashboard',
      {
        idDashboard: 5,
        login: 'user1',
      }
    );
  });

  it('copyDashboardToUser should make correct API call', async () => {
    await dashboard.copyDashboardToUser(5, 'user2', 'Copied Dashboard');

    expect(mockClient.request).toHaveBeenCalledWith(
      'Dashboard.copyDashboardToUser',
      {
        idDashboard: 5,
        copyToUser: 'user2',
        dashboardName: 'Copied Dashboard',
      }
    );
  });

  it('resetDashboardLayout should make correct API call', async () => {
    await dashboard.resetDashboardLayout(5, 'user1');

    expect(mockClient.request).toHaveBeenCalledWith(
      'Dashboard.resetDashboardLayout',
      {
        idDashboard: 5,
        login: 'user1',
      }
    );
  });
});
