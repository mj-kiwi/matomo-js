/**
 * Matomo Dashboard Module
 * This API gives information about dashboards.
 */

import { CoreReportingClient, RequestParams } from "./core.js";

/**
 * Parameters for getting dashboards
 */
export interface GetDashboardsParams extends RequestParams {
  /** Optional user login */
  login?: string;
  /** Return default dashboard if no dashboards found ('1' by default) */
  returnDefaultIfEmpty?: string;
}

/**
 * Parameters for creating a new dashboard
 */
export interface CreateNewDashboardParams extends RequestParams {
  /** User login */
  login: string;
  /** Dashboard name */
  dashboardName?: string;
  /** Whether to add default widgets ('1' by default) */
  addDefaultWidgets?: string;
}

/**
 * Parameters for removing a dashboard
 */
export interface RemoveDashboardParams extends RequestParams {
  /** Dashboard ID */
  idDashboard: string | number;
  /** Optional user login */
  login?: string;
}

/**
 * Parameters for copying a dashboard
 */
export interface CopyDashboardParams extends RequestParams {
  /** Dashboard ID to copy */
  idDashboard: string | number;
  /** Target user login to copy to */
  copyToUser: string;
  /** New dashboard name */
  dashboardName?: string;
}

/**
 * Parameters for resetting dashboard layout
 */
export interface ResetDashboardLayoutParams extends RequestParams {
  /** Dashboard ID */
  idDashboard: string | number;
  /** Optional user login */
  login?: string;
}

export class DashboardModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get available dashboards
   *
   * @param params Parameters for getting dashboards
   * @returns Promise with the API response containing dashboards
   */
  async getDashboards(params: GetDashboardsParams = {}): Promise<any> {
    return this.client.request("Dashboard.getDashboards", params);
  }

  /**
   * Create a new dashboard for a user
   *
   * @param params Parameters for creating a new dashboard
   * @returns Promise with the API response
   */
  async createNewDashboardForUser(
    params: CreateNewDashboardParams
  ): Promise<any> {
    return this.client.request("Dashboard.createNewDashboardForUser", params);
  }

  /**
   * Remove a dashboard
   *
   * @param params Parameters for removing a dashboard
   * @returns Promise with the API response
   */
  async removeDashboard(params: RemoveDashboardParams): Promise<any> {
    return this.client.request("Dashboard.removeDashboard", params);
  }

  /**
   * Copy a dashboard to another user
   *
   * @param params Parameters for copying a dashboard
   * @returns Promise with the API response
   */
  async copyDashboardToUser(params: CopyDashboardParams): Promise<any> {
    return this.client.request("Dashboard.copyDashboardToUser", params);
  }

  /**
   * Reset dashboard layout to default
   *
   * @param params Parameters for resetting dashboard layout
   * @returns Promise with the API response
   */
  async resetDashboardLayout(params: ResetDashboardLayoutParams): Promise<any> {
    return this.client.request("Dashboard.resetDashboardLayout", params);
  }
}
