/**
 * Matomo Transitions Module
 * API for analyzing the navigation paths between pages
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for Transitions API methods
 */
export interface TransitionsCommonParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
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
 */
export interface PageTitleTransitionsParams extends TransitionsCommonParams {
  /** The page title to analyze */
  pageTitle: string;
}

/**
 * Parameters for page URL transitions
 */
export interface PageUrlTransitionsParams extends TransitionsCommonParams {
  /** The URL of the page to analyze */
  pageUrl: string;
}

/**
 * Parameters for action transitions
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
 */
export interface PeriodAllowedParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to check */
  period: string;
  /** Date string */
  date: string;
}

export class TransitionsModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get transitions for a page title
   *
   * @param params Parameters for getting transitions for a page title
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
   *
   * @param params Parameters for getting transitions for a page URL
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
   *
   * @param params Parameters for getting transitions for an action
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
   */
  async getTranslations(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Transitions.getTranslations", {});
    }
    return await this.client.request("Transitions.getTranslations", {});
  }

  /**
   * Check if a period is allowed for transitions analysis
   *
   * @param params Parameters for checking if a period is allowed
   */
  async isPeriodAllowed(params: PeriodAllowedParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Transitions.isPeriodAllowed", params);
    }
    return await this.client.request("Transitions.isPeriodAllowed", params);
  }
}
