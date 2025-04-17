/**
 * Matomo Dashboard Module
 * This API gives information about dashboards.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class DashboardModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get available dashboards
   *
   * @param login Optional user login
   * @param returnDefaultIfEmpty Return default dashboard if no dashboards found ('1' by default)
   * @returns Promise with the API response containing dashboards
   */
  async getDashboards(
    login: string = '',
    returnDefaultIfEmpty: string = '1'
  ): Promise<any> {
    const params: RequestParams = {};

    if (login) params.login = login;
    if (returnDefaultIfEmpty !== '1')
      params.returnDefaultIfEmpty = returnDefaultIfEmpty;

    return this.client.request('Dashboard.getDashboards', params);
  }

  /**
   * Create a new dashboard for a user
   *
   * @param login User login
   * @param dashboardName Dashboard name (optional)
   * @param addDefaultWidgets Whether to add default widgets ('1' by default)
   * @returns Promise with the API response
   */
  async createNewDashboardForUser(
    login: string,
    dashboardName: string = '',
    addDefaultWidgets: string = '1'
  ): Promise<any> {
    const params: RequestParams = {
      login,
    };

    if (dashboardName) params.dashboardName = dashboardName;
    if (addDefaultWidgets !== '1') params.addDefaultWidgets = addDefaultWidgets;

    return this.client.request('Dashboard.createNewDashboardForUser', params);
  }

  /**
   * Remove a dashboard
   *
   * @param idDashboard Dashboard ID
   * @param login Optional user login
   * @returns Promise with the API response
   */
  async removeDashboard(
    idDashboard: string | number,
    login: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idDashboard,
    };

    if (login) params.login = login;

    return this.client.request('Dashboard.removeDashboard', params);
  }

  /**
   * Copy a dashboard to another user
   *
   * @param idDashboard Dashboard ID to copy
   * @param copyToUser Target user login to copy to
   * @param dashboardName New dashboard name (optional)
   * @returns Promise with the API response
   */
  async copyDashboardToUser(
    idDashboard: string | number,
    copyToUser: string,
    dashboardName: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idDashboard,
      copyToUser,
    };

    if (dashboardName) params.dashboardName = dashboardName;

    return this.client.request('Dashboard.copyDashboardToUser', params);
  }

  /**
   * Reset dashboard layout to default
   *
   * @param idDashboard Dashboard ID
   * @param login Optional user login
   * @returns Promise with the API response
   */
  async resetDashboardLayout(
    idDashboard: string | number,
    login: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idDashboard,
    };

    if (login) params.login = login;

    return this.client.request('Dashboard.resetDashboardLayout', params);
  }
}
