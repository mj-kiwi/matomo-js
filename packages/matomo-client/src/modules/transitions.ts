/**
 * Matomo Transitions Module
 *
 * The Transitions API provides detailed analysis of how visitors navigate between pages:
 * - Page-to-page navigation patterns
 * - Entry and exit points
 * - Common paths and flows
 * - Action transitions
 *
 * This module helps you understand:
 * - How users move through your website
 * - Which pages lead to conversions
 * - Where users drop off
 * - Optimal content placement
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for Transitions API methods
 * @property {number|string} [idSite] - The integer id of your website, or 'all' for all websites
 * @property {string} period - The period to request data for (day, week, month, year, range)
 * @property {string} date - The date string in YYYY-MM-DD format, or magic keywords (today, yesterday, lastWeek, lastMonth, lastYear)
 * @property {string} [segment] - Optional segment definition to filter the data
 * @property {string|number} [limitBeforeGrouping] - Maximum number of rows to return before grouping similar transitions
 */
export interface TransitionsCommonParams extends RequestParams {
  /** Site ID */
  idSite?: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
  /** Maximum number of rows to return before grouping */
  limitBeforeGrouping?: string | number;
}

/**
 * Parameters for page title transitions
 * @property {string} pageTitle - The title of the page to analyze transitions for
 */
export interface PageTitleTransitionsParams extends TransitionsCommonParams {
  /** The page title to analyze */
  pageTitle: string;
}

/**
 * Parameters for page URL transitions
 * @property {string} pageUrl - The URL of the page to analyze transitions for
 */
export interface PageUrlTransitionsParams extends TransitionsCommonParams {
  /** The URL of the page to analyze */
  pageUrl: string;
}

/**
 * Parameters for action transitions
 * @property {string} actionName - The name of the action to analyze
 * @property {string} actionType - The type of the action (e.g., 'pageview', 'event', 'download')
 * @property {string} [parts] - Which parts of the report to fetch ('all' for everything)
 */
export interface ActionTransitionsParams extends TransitionsCommonParams {
  /** The name of the action */
  actionName: string;
  /** The type of the action */
  actionType: string;
  /** Which parts of the report to fetch ('all' for everything) */
  parts?: string;
}

/**
 * Parameters for period check
 * @property {number|string} [idSite] - The integer id of your website, or 'all' for all websites
 * @property {string} period - The period to check
 * @property {string} date - The date string in YYYY-MM-DD format
 */
export interface PeriodAllowedParams extends RequestParams {
  /** Site ID */
  idSite?: number | string;
  /** Period to check */
  period: string;
  /** Date string */
  date: string;
}

export class TransitionsModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get transitions for a page title
   * Returns detailed information about how visitors navigate to and from a specific page title,
   * including previous and next pages, entry points, and exit points
   *
   * @param params Parameters for getting transitions for a page title
   * @returns Promise with the API response containing page title transitions
   */
  async getTransitionsForPageTitle(
    params: PageTitleTransitionsParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "Transitions.getTransitionsForPageTitle",
        params
      );
    }
    return await this.client.request(
      "Transitions.getTransitionsForPageTitle",
      params
    );
  }

  /**
   * Get transitions for a page URL
   * Returns detailed information about how visitors navigate to and from a specific URL,
   * including previous and next pages, entry points, and exit points
   *
   * @param params Parameters for getting transitions for a page URL
   * @returns Promise with the API response containing page URL transitions
   */
  async getTransitionsForPageUrl(
    params: PageUrlTransitionsParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "Transitions.getTransitionsForPageUrl",
        params
      );
    }
    return await this.client.request(
      "Transitions.getTransitionsForPageUrl",
      params
    );
  }

  /**
   * Get transitions for a specific action
   * Returns detailed information about how visitors interact with a specific action,
   * including what they did before and after the action
   *
   * @param params Parameters for getting transitions for an action
   * @returns Promise with the API response containing action transitions
   */
  async getTransitionsForAction(params: ActionTransitionsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "Transitions.getTransitionsForAction",
        params
      );
    }
    return await this.client.request(
      "Transitions.getTransitionsForAction",
      params
    );
  }

  /**
   * Get translations for transition metrics
   * Returns localized strings for transition-related metrics and labels
   *
   * @returns Promise with the API response containing transition translations
   */
  async getTranslations(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Transitions.getTranslations", {});
    }
    return await this.client.request("Transitions.getTranslations", {});
  }

  /**
   * Check if a period is allowed for transitions analysis
   * Verifies if the specified period can be used for transitions analysis
   *
   * @param params Parameters for checking if a period is allowed
   * @returns Promise with the API response indicating if the period is allowed
   */
  async isPeriodAllowed(params: PeriodAllowedParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Transitions.isPeriodAllowed", params);
    }
    return await this.client.request("Transitions.isPeriodAllowed", params);
  }
}
