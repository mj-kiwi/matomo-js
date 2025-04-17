/**
 * Matomo VisitorInterest Module
 * VisitorInterest API lets you access two Visitor Engagement reports: number of visits per number of pages,
 * and number of visits per visit duration.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class VisitorInterestModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get number of visits per visit duration
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getNumberOfVisitsPerVisitDuration(
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

    return this.client.request(
      'VisitorInterest.getNumberOfVisitsPerVisitDuration',
      params
    );
  }

  /**
   * Get number of visits per number of pages viewed
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getNumberOfVisitsPerPage(
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

    return this.client.request(
      'VisitorInterest.getNumberOfVisitsPerPage',
      params
    );
  }

  /**
   * Get number of days elapsed since last visit
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getNumberOfVisitsByDaysSinceLast(
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

    return this.client.request(
      'VisitorInterest.getNumberOfVisitsByDaysSinceLast',
      params
    );
  }

  /**
   * Get number of visits by visit count (first time, returning, etc.)
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getNumberOfVisitsByVisitCount(
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

    return this.client.request(
      'VisitorInterest.getNumberOfVisitsByVisitCount',
      params
    );
  }
}
