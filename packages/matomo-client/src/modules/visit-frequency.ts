/**
 * Matomo VisitFrequency Module
 * VisitFrequency API lets you access a list of metrics related to Returning Visitors.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for VisitFrequency API methods
 */
export interface VisitFrequencyParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
  /** Optional columns to restrict the returned data */
  columns?: string;
}

export class VisitFrequencyModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get metrics about new and returning visitors
   *
   * @param params Parameters for getting visitor frequency metrics
   */
  async get(params: VisitFrequencyParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("VisitFrequency.get", params);
    }
    return await this.client.request("VisitFrequency.get", params);
  }
}
