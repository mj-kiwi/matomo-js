/**
 * SEO API Module
 * Provides access to SEO metrics for a specified URL
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for SEO rank requests
 */
export interface SeoRankParams extends RequestParams {
  /** The URL to get SEO metrics for */
  url: string;
}

export class SeoModule {
  /**
   * @param client Core reporting client or batch request instance
   */
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get SEO rank data for a URL
   * This provides metrics like Bing indexed pages and domain age
   *
   * @param params Parameters containing the URL to analyze
   */
  async getRank(params: SeoRankParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("SEO.getRank", params);
    }
    return this.client.request<any>("SEO.getRank", params);
  }
}
