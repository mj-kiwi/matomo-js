/**
 * Matomo Insights Module
 *
 * API for plugin Insights. The Insights plugin provides analytical insights about your website's data,
 * helping you to identify trends and patterns.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for checking generation capabilities
 */
export interface CanGenerateInsightsParams extends RequestParams {
  /** Date string */
  date: string;
  /** Period to request data for */
  period: string;
}

/**
 * Common parameters for site insights
 */
export interface SiteInsightsParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for movers and shakers data
 */
export interface MoversAndShakersParams extends SiteInsightsParams {
  /** Report unique ID */
  reportUniqueId: string;
  /** Number of periods to compare */
  comparedToXPeriods?: number | string;
  /** Limit for increased values */
  limitIncreaser?: number | string;
  /** Limit for decreased values */
  limitDecreaser?: number | string;
}

/**
 * Parameters for insights data
 */
export interface InsightsParams extends MoversAndShakersParams {
  /** Filter type */
  filterBy?: string;
  /** Minimum impact percent */
  minImpactPercent?: number | string;
  /** Minimum growth percent */
  minGrowthPercent?: number | string;
  /** Order metric */
  orderBy?: string;
}

export class InsightsModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Check if insights can be generated for a specific period and date
   *
   * @param params Parameters for checking generation capabilities
   * @returns Promise with the result whether insights can be generated
   */
  async canGenerateInsights(params: CanGenerateInsightsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Insights.canGenerateInsights", params);
    }
    return await this.client.request("Insights.canGenerateInsights", params);
  }

  /**
   * Get insights overview for a site
   *
   * @param params Parameters for site insights
   * @returns Promise with the insights overview
   */
  async getInsightsOverview(params: SiteInsightsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Insights.getInsightsOverview", params);
    }
    return await this.client.request("Insights.getInsightsOverview", params);
  }

  /**
   * Get an overview of movers and shakers for a site
   *
   * @param params Parameters for site insights
   * @returns Promise with movers and shakers overview
   */
  async getMoversAndShakersOverview(params: SiteInsightsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "Insights.getMoversAndShakersOverview",
        params
      );
    }
    return await this.client.request(
      "Insights.getMoversAndShakersOverview",
      params
    );
  }

  /**
   * Get movers and shakers data for a specific report
   *
   * @param params Parameters for movers and shakers data
   * @returns Promise with movers and shakers data
   */
  async getMoversAndShakers(params: MoversAndShakersParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Insights.getMoversAndShakers", params);
    }
    return await this.client.request("Insights.getMoversAndShakers", params);
  }

  /**
   * Get insights data for a specific report
   *
   * @param params Parameters for insights data
   * @returns Promise with insights data
   */
  async getInsights(params: InsightsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Insights.getInsights", params);
    }
    return await this.client.request("Insights.getInsights", params);
  }
}
