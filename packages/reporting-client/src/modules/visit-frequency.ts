/**
 * Matomo VisitFrequency Module
 * VisitFrequency API lets you access a list of metrics related to Returning Visitors.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class VisitFrequencyModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get metrics about new and returning visitors
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param columns Optional columns to restrict the returned data
   */
  async get(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    columns: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (columns) params.columns = columns;

    return this.client.request('VisitFrequency.get', params);
  }
}
