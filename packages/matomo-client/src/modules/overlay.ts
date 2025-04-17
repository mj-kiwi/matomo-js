/**
 * Overlay API Module
 * Provides access to page overlay features
 */

import { CoreReportingClient } from './core.js';

export class OverlayModule {
  /**
   * @param core Core reporting client instance
   */
  constructor(private core: CoreReportingClient) {}

  /**
   * Get translations for overlay
   *
   * @param idSite The ID of the site
   */
  async getTranslations(idSite: number | string): Promise<any> {
    return this.core.request<any>('Overlay.getTranslations', {
      idSite,
    });
  }

  /**
   * Get following pages for a URL
   *
   * @param url The URL to get following pages for
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
    segment?: string
  ): Promise<any> {
    return this.core.request<any>('Overlay.getFollowingPages', {
      url,
      idSite,
      period,
      date,
      segment,
    });
  }
}
