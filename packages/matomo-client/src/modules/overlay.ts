/**
 * Overlay API Module
 * Provides access to page overlay features
 */

import { CoreReportingClient, RequestParams } from "./core.js";

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
   * @param core Core reporting client instance
   */
  constructor(private core: CoreReportingClient) {}

  /**
   * Get translations for overlay
   *
   * @param params Parameters containing the site ID
   */
  async getTranslations(params: SiteParams): Promise<any> {
    return this.core.request<any>("Overlay.getTranslations", params);
  }

  /**
   * Get following pages for a URL
   *
   * @param params Parameters for getting following pages
   */
  async getFollowingPages(params: FollowingPagesParams): Promise<any> {
    return this.core.request<any>("Overlay.getFollowingPages", params);
  }
}
