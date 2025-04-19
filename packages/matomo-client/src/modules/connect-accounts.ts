/**
 * Matomo ConnectAccounts Module
 * Provides methods for connecting external accounts and integrations
 */

import { CoreReportingClient, RequestParams } from "./core.js";

/**
 * Parameters for Google account operations
 */
export interface AccountParams extends RequestParams {
  /** Google account ID */
  accountId: string;
}

/**
 * Parameters for GTM workspace operations
 */
export interface WorkspaceParams extends RequestParams {
  /** Google account ID */
  accountId: string;
  /** GTM container ID */
  containerId: string;
}

/**
 * Parameters for creating a Matomo tag
 */
export interface CreateTagParams extends RequestParams {
  /** Google account ID */
  accountId: string;
  /** GTM container ID */
  containerId: string;
  /** GTM workspace ID */
  workspaceId: string;
  /** Information about the parent tag/trigger/etc. */
  parentInfo: Record<string, any> | any[] | string;
}

export class ConnectAccountsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get a list of Google Tag Manager containers
   *
   * @param params Parameters containing the Google account ID
   * @returns List of GTM containers
   */
  async getGtmContainersList(params: AccountParams): Promise<any> {
    return this.client.request("ConnectAccounts.getGtmContainersList", params);
  }

  /**
   * Get a list of Google Tag Manager workspaces
   *
   * @param params Parameters containing account and container IDs
   * @returns List of GTM workspaces
   */
  async getGtmWorkspaceList(params: WorkspaceParams): Promise<any> {
    return this.client.request("ConnectAccounts.getGtmWorkspaceList", params);
  }

  /**
   * Create a Matomo tag in Google Tag Manager
   *
   * @param params Parameters for creating a Matomo tag
   * @returns Information about the created tag
   */
  async createMatomoTag(params: CreateTagParams): Promise<any> {
    const requestParams = { ...params };

    if (typeof params.parentInfo === "object") {
      requestParams.parentInfo = JSON.stringify(params.parentInfo);
    }

    return this.client.request(
      "ConnectAccounts.createMatomoTag",
      requestParams
    );
  }
}
