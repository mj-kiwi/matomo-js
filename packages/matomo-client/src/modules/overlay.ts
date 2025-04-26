/**
 * Overlay API Module
 * Provides access to page overlay features
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for the getTranslations method
 */
export interface SiteParams extends RequestParams {
  /** The ID of the site */
  idSite: number | string;
}

/**
 * Parameters for the getFollowingPages method
 */
export interface FollowingPagesParams extends RequestParams {
  /** The URL to get following pages for */
  url: string;
  /** The ID of the site */
  idSite: number | string;
  /** The period to analyze */
  period: string;
  /** The date to analyze */
  date: string;
  /** Segment to apply */
  segment?: string;
}

export class OverlayModule {
  /**
   * @param core Core reporting client instance or batch request
   */
  constructor(private core: CoreReportingClient | BatchRequest) {}

  /**
   * Get translations for overlay
   *
   * @param params Parameters containing the site ID
   */
  async getTranslations(params: SiteParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Overlay.getTranslations", params);
    }
    return this.core.request<any>("Overlay.getTranslations", params);
  }

  /**
   * Get following pages for a URL
   *
   * @param params Parameters for getting following pages
   */
  async getFollowingPages(params: FollowingPagesParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Overlay.getFollowingPages", params);
    }
    return this.core.request<any>("Overlay.getFollowingPages", params);
  }
}
