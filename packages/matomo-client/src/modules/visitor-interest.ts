/**
 * Matomo VisitorInterest Module
 * VisitorInterest API lets you access two Visitor Engagement reports: number of visits per number of pages,
 * and number of visits per visit duration.
 */

import { CoreReportingClient, RequestParams } from "./core.js";

/**
 * Common parameters for VisitorInterest API methods
 */
export interface VisitorInterestParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
}

export class VisitorInterestModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get number of visits per visit duration
   *
   * @param params Parameters for getting visits per visit duration
   */
  async getNumberOfVisitsPerVisitDuration(
    params: VisitorInterestParams
  ): Promise<any> {
    return this.client.request(
      "VisitorInterest.getNumberOfVisitsPerVisitDuration",
      params
    );
  }

  /**
   * Get number of visits per number of visited pages
   *
   * @param params Parameters for getting visits per visited pages count
   */
  async getNumberOfVisitsPerPage(params: VisitorInterestParams): Promise<any> {
    return this.client.request(
      "VisitorInterest.getNumberOfVisitsPerPage",
      params
    );
  }

  /**
   * Get number of days elapsed since last visit
   *
   * @param params Parameters for getting days elapsed since last visit
   */
  async getNumberOfVisitsByDaysSinceLast(
    params: VisitorInterestParams
  ): Promise<any> {
    return this.client.request(
      "VisitorInterest.getNumberOfVisitsByDaysSinceLast",
      params
    );
  }

  /**
   * Get number of visits by visit count
   *
   * @param params Parameters for getting visits by visit count
   */
  async getNumberOfVisitsByVisitCount(
    params: VisitorInterestParams
  ): Promise<any> {
    return this.client.request(
      "VisitorInterest.getNumberOfVisitsByVisitCount",
      params
    );
  }
}
