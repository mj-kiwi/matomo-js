/**
 * Overlay API Module
 * Provides methods for the Overlay visualization feature
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class OverlayModule {
  /**
   * @param core Core reporting client instance
   */
  constructor(private core: CoreReportingClient) {}

  /**
   * Get the translations used by the Overlay
   *
   * @param idSite The ID of the site
   */
  async getTranslations(
    idSite: number | string
  ): Promise<Record<string, string>> {
    return this.core.request<Record<string, string>>(
      'Overlay.getTranslations',
      {
        idSite,
      }
    );
  }

  /**
   * Get the pages that follow a given page in navigation paths
   *
   * @param url The URL to analyze
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   */
  async getFollowingPages(
    url: string,
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any[]> {
    return this.core.request<any[]>('Overlay.getFollowingPages', {
      url,
      idSite,
      period,
      date,
      segment,
    });
  }
}
