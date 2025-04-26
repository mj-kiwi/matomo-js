/**
 * Resolution API Module
 * Provides access to screen resolution analytics
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for Resolution API methods
 */
export interface ResolutionParams extends RequestParams {
  /** The ID of the site */
  idSite: number | string;
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
   *
   * @param params Parameters for getting screen resolution data
   */
  async getResolution(params: ResolutionParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Resolution.getResolution", params);
    }
    return await this.core.request<any>("Resolution.getResolution", params);
  }

  /**
   * Get device configuration data
   *
   * @param params Parameters for getting device configuration data
   */
  async getConfiguration(params: ResolutionParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Resolution.getConfiguration", params);
    }
    return await this.core.request<any>("Resolution.getConfiguration", params);
  }
}
