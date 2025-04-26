/**
 * Matomo DevicePlugins Module
 * This API lets you access reports about device plugins such as browser plugins.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for device plugin reports
 */
export interface DevicePluginParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
}

export class DevicePluginsModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get browser plugin usage
   *
   * @param params Parameters for device plugin report
   * @returns Promise with the API response containing plugin usage data
   */
  async getPlugin(params: DevicePluginParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("DevicePlugins.getPlugin", params);
    }
    return this.client.request("DevicePlugins.getPlugin", params);
  }
}
