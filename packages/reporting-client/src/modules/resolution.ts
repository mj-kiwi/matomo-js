/**
 * Resolution API Module
 * Provides access to screen resolution analytics
 */

import { CoreReportingClient } from './core.js';

export class ResolutionModule {
  /**
   * @param core Core reporting client instance
   */
  constructor(private core: CoreReportingClient) {}

  /**
   * Get screen resolution data
   *
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   */
  async getResolution(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string
  ): Promise<any> {
    return this.core.request<any>('Resolution.getResolution', {
      idSite,
      period,
      date,
      segment,
    });
  }

  /**
   * Get device configuration data
   *
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   */
  async getConfiguration(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string
  ): Promise<any> {
    return this.core.request<any>('Resolution.getConfiguration', {
      idSite,
      period,
      date,
      segment,
    });
  }
}
