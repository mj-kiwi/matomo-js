/**
 * Matomo SitesManager Module
 * Provides access to site management functionality
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class SitesManagerModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get site data for given site IDs
   *
   * @param idSites Array of site IDs or comma-separated string
   */
  async getSitesInfo(idSites?: number[] | string): Promise<any> {
    const params: RequestParams = {};

    if (idSites) {
      params.idSite = idSites;
    }

    return this.client.request(
      'SitesManager.getSitesWithAtLeastViewAccess',
      params
    );
  }
}
