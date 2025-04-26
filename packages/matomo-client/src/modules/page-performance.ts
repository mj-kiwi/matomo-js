/**
 * PagePerformance API Module
 * Provides access to page performance metrics
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for getting page performance metrics
 */
export interface PagePerformanceParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
}

export class PagePerformanceModule {
  /**
   * @param core Core reporting client instance or batch request
   */
  constructor(private core: CoreReportingClient | BatchRequest) {}

  /**
   * Get page performance metrics
   *
   * @param params Parameters for getting page performance metrics
   */
  async get(params: PagePerformanceParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("PagePerformance.get", params);
    }
    return this.core.request<any>("PagePerformance.get", params);
  }
}
