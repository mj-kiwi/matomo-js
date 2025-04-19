/**
 * SEO API Module
 * Provides access to SEO metrics for a specified URL
 */

import { CoreReportingClient, RequestParams } from "./core.js";

/**
 * Parameters for SEO rank requests
 */
export interface SeoRankParams extends RequestParams {
  /** The URL to get SEO metrics for */
  url: string;
}

export class SeoModule {
  /**
   * @param core Core reporting client instance
   */
  constructor(private core: CoreReportingClient) {}

  /**
   * Get SEO rank data for a URL
   * This provides metrics like Bing indexed pages and domain age
   *
   * @param params Parameters containing the URL to analyze
   */
  async getRank(params: SeoRankParams): Promise<any> {
    return this.core.request<any>("SEO.getRank", params);
  }
}
