/**
 * Matomo DevicePlugins Module
 * This API lets you access reports about device plugins such as browser plugins.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class DevicePluginsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get browser plugin usage
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing plugin usage data
   */
  async getPlugin(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('DevicePlugins.getPlugin', params);
  }
}
