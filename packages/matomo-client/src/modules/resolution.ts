/**
 * Matomo Resolution Module
 *
 * The Resolution API provides detailed information about your visitors' screen and device configurations:
 * - Screen resolutions
 * - Device configurations
 * - Display settings
 *
 * This module helps you understand your visitors' viewing environment and can be used to:
 * - Optimize your website's responsive design
 * - Identify common screen sizes for better layout decisions
 * - Plan for device-specific optimizations
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for Resolution API methods
 * @property {number|string} [idSite] - The integer id of your website, or 'all' for all websites
 * @property {string} period - The period to request data for (day, week, month, year, range)
 * @property {string} date - The date string in YYYY-MM-DD format, or magic keywords (today, yesterday, lastWeek, lastMonth, lastYear)
 * @property {string} [segment] - Optional segment definition to filter the data
 */
export interface ResolutionParams extends RequestParams {
  /** The ID of the site */
  idSite?: number | string;
  /** The period to analyze */
  period: string;
  /** The date to analyze */
  date: string;
  /** Segment to apply */
  segment?: string;
}

export class ResolutionModule {
  /**
   * @param core Core reporting client instance or batch request
   */
  constructor(private core: CoreReportingClient | BatchRequest) {}

  /**
   * Get screen resolution data
   * Returns a report showing the distribution of screen resolutions used by your visitors
   * (e.g., 1920x1080, 1366x768, 1440x900, etc.)
   *
   * @param params Parameters for getting screen resolution data
   * @returns Promise with the API response containing screen resolution distribution
   */
  async getResolution(params: ResolutionParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Resolution.getResolution", params);
    }
    return await this.core.request<any>("Resolution.getResolution", params);
  }

  /**
   * Get device configuration data
   * Returns a report showing detailed device configuration information including:
   * - Screen resolution
   * - Color depth
   * - Browser window size
   * - Device pixel ratio
   *
   * @param params Parameters for getting device configuration data
   * @returns Promise with the API response containing device configuration details
   */
  async getConfiguration(params: ResolutionParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Resolution.getConfiguration", params);
    }
    return await this.core.request<any>("Resolution.getConfiguration", params);
  }
}
