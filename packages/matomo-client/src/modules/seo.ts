/**
 * SEO API Module
 * Provides access to SEO metrics for a specified URL
 */

import { CoreReportingClient } from './core.js';

export class SeoModule {
  /**
   * @param core Core reporting client instance
   */
  constructor(private core: CoreReportingClient) {}

  /**
   * Get SEO rank data for a URL
   * This provides metrics like Bing indexed pages and domain age
   *
   * @param url The URL to get SEO metrics for
   */
  async getRank(url: string): Promise<any> {
    return this.core.request<any>('SEO.getRank', { url });
  }
}
