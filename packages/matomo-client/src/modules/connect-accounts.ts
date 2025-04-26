/**
 * Matomo ConnectAccounts Module
 * Provides methods for connecting external accounts and integrations
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

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

/**
 * Parameters for getting connected accounts
 */
export interface GetConnectedAccountsParams extends RequestParams {
  /** Google account ID */
  accountId: string;
}

/**
 * Parameters for getting a specific connected account
 */
export interface GetConnectedAccountParams extends RequestParams {
  /** Google account ID */
  accountId: string;
  /** Connected account ID */
  connectedAccountId: string;
}

/**
 * Parameters for deleting a connected account
 */
export interface DeleteConnectedAccountParams extends RequestParams {
  /** Google account ID */
  accountId: string;
  /** Connected account ID */
  connectedAccountId: string;
}

/**
 * Parameters for getting OAuth connect URL
 */
export interface GetOAuthConnectUrlParams extends RequestParams {
  /** Google account ID */
  accountId: string;
  /** Provider name */
  provider: string;
}

/**
 * Parameters for getting OAuth disconnect URL
 */
export interface GetOAuthDisconnectUrlParams extends RequestParams {
  /** Google account ID */
  accountId: string;
  /** Provider name */
  provider: string;
}

export class ConnectAccountsModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get a list of Google Tag Manager containers
   *
   * @param params Parameters containing the Google account ID
   * @returns List of GTM containers
   */
  async getGtmContainersList(params: AccountParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "ConnectAccounts.getGtmContainersList",
        params
      );
    }
    return this.client.request("ConnectAccounts.getGtmContainersList", params);
  }

  /**
   * Get a list of Google Tag Manager workspaces
   *
   * @param params Parameters containing account and container IDs
   * @returns List of GTM workspaces
   */
  async getGtmWorkspaceList(params: WorkspaceParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "ConnectAccounts.getGtmWorkspaceList",
        params
      );
    }
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

    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "ConnectAccounts.createMatomoTag",
        requestParams
      );
    }
    return this.client.request(
      "ConnectAccounts.createMatomoTag",
      requestParams
    );
  }

  /**
   * Get available providers
   */
  async getAvailableProviders(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "ConnectAccounts.getAvailableProviders",
        {}
      );
    }
    return this.client.request("ConnectAccounts.getAvailableProviders", {});
  }

  /**
   * Get connected accounts
   */
  async getConnectedAccounts(params: GetConnectedAccountsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "ConnectAccounts.getConnectedAccounts",
        params
      );
    }
    return this.client.request("ConnectAccounts.getConnectedAccounts", params);
  }

  /**
   * Get a specific connected account
   */
  async getConnectedAccount(params: GetConnectedAccountParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "ConnectAccounts.getConnectedAccount",
        params
      );
    }
    return this.client.request("ConnectAccounts.getConnectedAccount", params);
  }

  /**
   * Delete a connected account
   */
  async deleteConnectedAccount(
    params: DeleteConnectedAccountParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "ConnectAccounts.deleteConnectedAccount",
        params
      );
    }
    return this.client.request(
      "ConnectAccounts.deleteConnectedAccount",
      params
    );
  }

  /**
   * Get OAuth connect URL
   */
  async getOAuthConnectUrl(params: GetOAuthConnectUrlParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "ConnectAccounts.getOAuthConnectUrl",
        params
      );
    }
    return this.client.request("ConnectAccounts.getOAuthConnectUrl", params);
  }

  /**
   * Get OAuth disconnect URL
   */
  async getOAuthDisconnectUrl(
    params: GetOAuthDisconnectUrlParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "ConnectAccounts.getOAuthDisconnectUrl",
        params
      );
    }
    return this.client.request("ConnectAccounts.getOAuthDisconnectUrl", params);
  }
}
