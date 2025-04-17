/**
 * Matomo Contents Module
 * API for the Contents plugin which tracks content impressions and interactions
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class ContentsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get content names with their metrics
   *
   * @param idSite Site ID to get content names for
   * @param period Period to request data for (day, week, month, year, range)
   * @param date Date or date range
   * @param segment Optional segment definition
   * @param idSubtable Optional subtable ID for drilldown
   * @returns Content names with metrics
   */
  async getContentNames(
    idSite: string | number,
    period: string,
    date: string,
    segment: string = '',
    idSubtable: string | number = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (idSubtable !== '') params.idSubtable = idSubtable;

    return this.client.request('Contents.getContentNames', params);
  }

  /**
   * Get content pieces with their metrics
   *
   * @param idSite Site ID to get content pieces for
   * @param period Period to request data for (day, week, month, year, range)
   * @param date Date or date range
   * @param segment Optional segment definition
   * @param idSubtable Optional subtable ID for drilldown
   * @returns Content pieces with metrics
   */
  async getContentPieces(
    idSite: string | number,
    period: string,
    date: string,
    segment: string = '',
    idSubtable: string | number = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (idSubtable !== '') params.idSubtable = idSubtable;

    return this.client.request('Contents.getContentPieces', params);
  }
}
