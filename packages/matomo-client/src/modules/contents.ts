/**
 * Matomo Contents Module
 * API for the Contents plugin which tracks content impressions and interactions
 */

import { CoreReportingClient, RequestParams } from "./core.js";

/**
 * Common parameters for Contents module methods
 */
export interface ContentsParams extends RequestParams {
  /** Site ID to get content data for */
  idSite: string | number;
  /** Period to request data for (day, week, month, year, range) */
  period: string;
  /** Date or date range */
  date: string;
  /** Optional segment definition */
  segment?: string;
  /** Optional subtable ID for drilldown */
  idSubtable?: string | number;
}

export class ContentsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get content names with their metrics
   *
   * @param params Parameters for getting content names
   * @returns Content names with metrics
   */
  async getContentNames(params: ContentsParams): Promise<any> {
    return this.client.request("Contents.getContentNames", params);
  }

  /**
   * Get content pieces with their metrics
   *
   * @param params Parameters for getting content pieces
   * @returns Content pieces with metrics
   */
  async getContentPieces(params: ContentsParams): Promise<any> {
    return this.client.request("Contents.getContentPieces", params);
  }
}
