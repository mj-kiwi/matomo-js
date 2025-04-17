/**
 * Matomo ConnectAccounts Module
 * Provides methods for connecting external accounts and integrations
 */

import { CoreReportingClient } from './core.js';

export class ConnectAccountsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get a list of Google Tag Manager containers
   *
   * @param accountId Google account ID
   * @returns List of GTM containers
   */
  async getGtmContainersList(accountId: string): Promise<any> {
    return this.client.request('ConnectAccounts.getGtmContainersList', {
      accountId,
    });
  }

  /**
   * Get a list of Google Tag Manager workspaces
   *
   * @param accountId Google account ID
   * @param containerId GTM container ID
   * @returns List of GTM workspaces
   */
  async getGtmWorkspaceList(
    accountId: string,
    containerId: string
  ): Promise<any> {
    return this.client.request('ConnectAccounts.getGtmWorkspaceList', {
      accountId,
      containerId,
    });
  }

  /**
   * Create a Matomo tag in Google Tag Manager
   *
   * @param accountId Google account ID
   * @param containerId GTM container ID
   * @param workspaceId GTM workspace ID
   * @param parentInfo Information about the parent tag/trigger/etc.
   * @returns Information about the created tag
   */
  async createMatomoTag(
    accountId: string,
    containerId: string,
    workspaceId: string,
    parentInfo: Record<string, any> | any[]
  ): Promise<any> {
    return this.client.request('ConnectAccounts.createMatomoTag', {
      accountId,
      containerId,
      workspaceId,
      parentInfo:
        typeof parentInfo === 'object'
          ? JSON.stringify(parentInfo)
          : parentInfo,
    });
  }
}
