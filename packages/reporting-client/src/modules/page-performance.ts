/**
 * PagePerformance API Module
 * Provides methods for page performance metrics
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class PagePerformanceModule {
  /**
   * @param core Core reporting client instance
   */
  constructor(private core: CoreReportingClient) {}

  /**
   * Get page performance metrics
   *
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   */
  async get(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    return this.core.request<any>('PagePerformance.get', {
      idSite,
      period,
      date,
      segment,
    });
  }
}
