/**
 * Matomo Actions Module
 *
 * The Actions API provides comprehensive tracking and analysis of all user interactions:
 * - Page views and navigation
 * - File downloads
 * - Outbound links
 * - Site search activity
 * - Entry and exit pages
 *
 * This module helps you understand:
 * - Most viewed content
 * - User engagement patterns
 * - Content performance
 * - Navigation behavior
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for Action module methods
 * @property {number|string} [idSite] - The integer id of your website, or 'all' for all websites
 * @property {string} period - The period to request data for (day, week, month, year, range)
 * @property {string} date - The date string in YYYY-MM-DD format, or magic keywords (today, yesterday, lastWeek, lastMonth, lastYear)
 * @property {string} [segment] - Optional segment definition to filter the data
 */
export interface ActionReportParams extends RequestParams {
  /** Site ID */
  idSite?: number | string;
  /** Period to request data for (day, week, month, year, range) */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for URL and title related reports
 * @property {string|boolean} [expanded] - Whether to expand the results (show all details)
 * @property {string|number} [idSubtable] - If set, get data for this specific subtable
 * @property {string|number} [depth] - Recursion depth for tree reports (how many levels to show)
 * @property {string|boolean} [flat] - Whether to return a flattened report structure
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
 * @property {string} [pageUrl] - URL of the page to get metrics for (must be URL encoded)
 * @property {string} [pageName] - Title of the page to get metrics for (must be URL encoded)
 * @property {string} [downloadUrl] - URL of the download to get metrics for (must be URL encoded)
 * @property {string} [outlinkUrl] - URL of the outlink to get metrics for (must be URL encoded)
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
 * @property {string} [columns] - Optional columns to restrict the returned data
 */
export interface ActionsGetParams extends ActionReportParams {
  /** Optional columns to restrict the returned data */
  columns?: string;
}

export class ActionsModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get actions data for multiple periods or sites
   * Returns comprehensive data about all tracked actions including:
   * - Page views
   * - Downloads
   * - Outlinks
   * - Site search
   *
   * @param params Parameters for getting actions data
   * @returns Promise with the API response containing actions data
   */
  async get(params: ActionsGetParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.get", params);
    }
    return await this.client.request("Actions.get", params);
  }

  /**
   * Get page URLs
   * Returns a report showing all visited page URLs and their metrics
   *
   * @param params Parameters for getting page URLs
   * @returns Promise with the API response containing page URL data
   */
  async getPageUrls(params: PageReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getPageUrls", params);
    }
    return await this.client.request("Actions.getPageUrls", params);
  }

  /**
   * Get page URLs following site search
   * Returns a report showing which pages were viewed after using site search
   *
   * @param params Parameters for getting page URLs following site search
   * @returns Promise with the API response containing post-search page data
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
   * Returns a report showing which page titles were viewed after using site search
   *
   * @param params Parameters for getting page titles following site search
   * @returns Promise with the API response containing post-search page title data
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
   * Returns a report showing which URLs visitors first land on
   *
   * @param params Parameters for getting entry page URLs
   * @returns Promise with the API response containing entry page data
   */
  async getEntryPageUrls(params: PageReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getEntryPageUrls", params);
    }
    return await this.client.request("Actions.getEntryPageUrls", params);
  }

  /**
   * Get exit page URLs
   * Returns a report showing which URLs visitors last view before leaving
   *
   * @param params Parameters for getting exit page URLs
   * @returns Promise with the API response containing exit page data
   */
  async getExitPageUrls(params: PageReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getExitPageUrls", params);
    }
    return await this.client.request("Actions.getExitPageUrls", params);
  }

  /**
   * Get metrics for a specific page URL
   * Returns detailed metrics for a single page URL
   *
   * @param params Parameters for getting metrics for a specific page URL
   * @returns Promise with the API response containing specific page URL metrics
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
   * Returns a report showing all visited page titles and their metrics
   *
   * @param params Parameters for getting page titles
   * @returns Promise with the API response containing page title data
   */
  async getPageTitles(params: PageReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getPageTitles", params);
    }
    return await this.client.request("Actions.getPageTitles", params);
  }

  /**
   * Get entry page titles
   * Returns a report showing which page titles visitors first land on
   *
   * @param params Parameters for getting entry page titles
   * @returns Promise with the API response containing entry page title data
   */
  async getEntryPageTitles(params: PageReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getEntryPageTitles", params);
    }
    return await this.client.request("Actions.getEntryPageTitles", params);
  }

  /**
   * Get exit page titles
   * Returns a report showing which page titles visitors last view before leaving
   *
   * @param params Parameters for getting exit page titles
   * @returns Promise with the API response containing exit page title data
   */
  async getExitPageTitles(params: PageReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getExitPageTitles", params);
    }
    return await this.client.request("Actions.getExitPageTitles", params);
  }

  /**
   * Get metrics for a specific page title
   * Returns detailed metrics for a single page title
   *
   * @param params Parameters for getting metrics for a specific page title
   * @returns Promise with the API response containing specific page title metrics
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
   * Returns a report showing all downloaded files and their metrics
   *
   * @param params Parameters for getting file downloads
   * @returns Promise with the API response containing download data
   */
  async getDownloads(params: PageReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getDownloads", params);
    }
    return await this.client.request("Actions.getDownloads", params);
  }

  /**
   * Get metrics for a specific download
   * Returns detailed metrics for a single downloaded file
   *
   * @param params Parameters for getting metrics for a specific download
   * @returns Promise with the API response containing specific download metrics
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
   * Returns a report showing all outbound links and their metrics
   *
   * @param params Parameters for getting outlinks
   * @returns Promise with the API response containing outlink data
   */
  async getOutlinks(params: PageReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getOutlinks", params);
    }
    return await this.client.request("Actions.getOutlinks", params);
  }

  /**
   * Get metrics for a specific outlink
   * Returns detailed metrics for a single outbound link
   *
   * @param params Parameters for getting metrics for a specific outlink
   * @returns Promise with the API response containing specific outlink metrics
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
   * Returns a report showing all search terms used in site search
   *
   * @param params Parameters for getting site search keywords
   * @returns Promise with the API response containing search keyword data
   */
  async getSiteSearchKeywords(params: ActionReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getSiteSearchKeywords", params);
    }
    return await this.client.request("Actions.getSiteSearchKeywords", params);
  }

  /**
   * Get site search keywords with no results
   * Returns a report showing search terms that returned no results
   *
   * @param params Parameters for getting site search keywords with no results
   * @returns Promise with the API response containing no-result search keyword data
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
   * Returns a report showing search categories and their usage
   *
   * @param params Parameters for getting site search categories
   * @returns Promise with the API response containing search category data
   */
  async getSiteSearchCategories(params: ActionReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Actions.getSiteSearchCategories", params);
    }
    return await this.client.request("Actions.getSiteSearchCategories", params);
  }
}
