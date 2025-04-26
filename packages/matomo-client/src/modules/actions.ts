/**
 * Matomo Actions Module
 * Provides access to all page tracking data such as page views, page titles, downloads, outlinks
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for Action module methods
 */
export interface ActionReportParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for (day, week, month, year, range) */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for URL and title related reports
 */
export interface PageReportParams extends ActionReportParams {
  /** Whether to expand the results */
  expanded?: string | boolean;
  /** If set, get data for this subtable */
  idSubtable?: string | number;
  /** Recursion depth for tree reports */
  depth?: string | number;
  /** Whether to return a flattened report */
  flat?: string | boolean;
}

/**
 * Parameters for specific page URL/title lookup
 */
export interface SpecificPageParams extends ActionReportParams {
  /** URL of the page to get metrics for (must be URL encoded) */
  pageUrl?: string;
  /** Title of the page to get metrics for (must be URL encoded) */
  pageName?: string;
  /** URL of the download to get metrics for (must be URL encoded) */
  downloadUrl?: string;
  /** URL of the outlink to get metrics for (must be URL encoded) */
  outlinkUrl?: string;
}

/**
 * Parameters for the get method
 */
export interface ActionsGetParams extends ActionReportParams {
  /** Optional columns to restrict the returned data */
  columns?: string;
}

export class ActionsModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get actions data for multiple periods or sites
   *
   * @param params Parameters for getting actions data
   */
  async get(params: ActionsGetParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.get", params);
    }
    return await this.client.request("Actions.get", params);
  }

  /**
   * Get page URLs
   *
   * @param params Parameters for getting page URLs
   */
  async getPageUrls(params: PageReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getPageUrls", params);
    }
    return await this.client.request("Actions.getPageUrls", params);
  }

  /**
   * Get page URLs following site search
   *
   * @param params Parameters for getting page URLs following site search
   */
  async getPageUrlsFollowingSiteSearch(params: PageReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "Actions.getPageUrlsFollowingSiteSearch",
        params
      );
    }
    return await this.client.request(
      "Actions.getPageUrlsFollowingSiteSearch",
      params
    );
  }

  /**
   * Get page titles following site search
   *
   * @param params Parameters for getting page titles following site search
   */
  async getPageTitlesFollowingSiteSearch(
    params: PageReportParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "Actions.getPageTitlesFollowingSiteSearch",
        params
      );
    }
    return await this.client.request(
      "Actions.getPageTitlesFollowingSiteSearch",
      params
    );
  }

  /**
   * Get entry page URLs
   *
   * @param params Parameters for getting entry page URLs
   */
  async getEntryPageUrls(params: PageReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getEntryPageUrls", params);
    }
    return await this.client.request("Actions.getEntryPageUrls", params);
  }

  /**
   * Get exit page URLs
   *
   * @param params Parameters for getting exit page URLs
   */
  async getExitPageUrls(params: PageReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getExitPageUrls", params);
    }
    return await this.client.request("Actions.getExitPageUrls", params);
  }

  /**
   * Get metrics for a specific page URL
   *
   * @param params Parameters for getting metrics for a specific page URL
   */
  async getPageUrl(
    params: SpecificPageParams & { pageUrl: string }
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getPageUrl", params);
    }
    return await this.client.request("Actions.getPageUrl", params);
  }

  /**
   * Get page titles
   *
   * @param params Parameters for getting page titles
   */
  async getPageTitles(params: PageReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getPageTitles", params);
    }
    return await this.client.request("Actions.getPageTitles", params);
  }

  /**
   * Get entry page titles
   *
   * @param params Parameters for getting entry page titles
   */
  async getEntryPageTitles(params: PageReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getEntryPageTitles", params);
    }
    return await this.client.request("Actions.getEntryPageTitles", params);
  }

  /**
   * Get exit page titles
   *
   * @param params Parameters for getting exit page titles
   */
  async getExitPageTitles(params: PageReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getExitPageTitles", params);
    }
    return await this.client.request("Actions.getExitPageTitles", params);
  }

  /**
   * Get metrics for a specific page title
   *
   * @param params Parameters for getting metrics for a specific page title
   */
  async getPageTitle(
    params: SpecificPageParams & { pageName: string }
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getPageTitle", params);
    }
    return await this.client.request("Actions.getPageTitle", params);
  }

  /**
   * Get file downloads
   *
   * @param params Parameters for getting file downloads
   */
  async getDownloads(params: PageReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getDownloads", params);
    }
    return await this.client.request("Actions.getDownloads", params);
  }

  /**
   * Get metrics for a specific download
   *
   * @param params Parameters for getting metrics for a specific download
   */
  async getDownload(
    params: SpecificPageParams & { downloadUrl: string }
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getDownload", params);
    }
    return await this.client.request("Actions.getDownload", params);
  }

  /**
   * Get outlinks
   *
   * @param params Parameters for getting outlinks
   */
  async getOutlinks(params: PageReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getOutlinks", params);
    }
    return await this.client.request("Actions.getOutlinks", params);
  }

  /**
   * Get metrics for a specific outlink
   *
   * @param params Parameters for getting metrics for a specific outlink
   */
  async getOutlink(
    params: SpecificPageParams & { outlinkUrl: string }
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getOutlink", params);
    }
    return await this.client.request("Actions.getOutlink", params);
  }

  /**
   * Get site search keywords
   *
   * @param params Parameters for getting site search keywords
   */
  async getSiteSearchKeywords(params: ActionReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getSiteSearchKeywords", params);
    }
    return await this.client.request("Actions.getSiteSearchKeywords", params);
  }

  /**
   * Get site search keywords with no results
   *
   * @param params Parameters for getting site search keywords with no results
   */
  async getSiteSearchNoResultKeywords(
    params: ActionReportParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "Actions.getSiteSearchNoResultKeywords",
        params
      );
    }
    return await this.client.request(
      "Actions.getSiteSearchNoResultKeywords",
      params
    );
  }

  /**
   * Get site search categories
   *
   * @param params Parameters for getting site search categories
   */
  async getSiteSearchCategories(params: ActionReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getSiteSearchCategories", params);
    }
    return await this.client.request("Actions.getSiteSearchCategories", params);
  }
}
