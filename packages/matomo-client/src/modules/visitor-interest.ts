/**
 * Matomo VisitorInterest Module
 *
 * The VisitorInterest API provides deep insights into visitor engagement and loyalty patterns,
 * helping you understand how visitors interact with your website over time. Key metrics include:
 *
 * Engagement Metrics:
 * - Visit duration distribution: How long visitors stay on your site
 * - Page view distribution: How deeply visitors explore your content
 * - Interaction patterns: How visitors navigate through your site
 *
 * Loyalty Metrics:
 * - Return visit frequency: How often visitors come back
 * - Time between visits: Visitor retention patterns
 * - Visitor segmentation: New vs. returning visitor behavior
 *
 * These insights help you:
 * - Optimize content engagement strategies
 * - Improve visitor retention
 * - Identify loyal customer segments
 * - Measure content effectiveness
 * - Track visitor behavior changes over time
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for VisitorInterest API methods
 * @property {number|string} [idSite] - The integer id of your website, or 'all' for all websites
 * @property {string} period - The period to request data for (day, week, month, year, range)
 * @property {string} date - The date string in YYYY-MM-DD format, or magic keywords (today, yesterday, lastWeek, lastMonth, lastYear)
 * @property {string} [segment] - Optional segment definition to filter the data
 */
export interface VisitorInterestParams extends RequestParams {
  /** Site ID */
  idSite?: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
}

export class VisitorInterestModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get the distribution of visits by visit duration
   * Returns detailed metrics about how long visitors stay on your site, including:
   * - Time spent distribution (e.g., 0-30s, 30s-1m, 1m-2m, etc.)
   * - Engagement level segmentation
   * - Content consumption patterns
   * 
   * This data helps you:
   * - Identify optimal content length
   * - Measure content engagement
   * - Optimize user experience
   * - Track engagement trends
   *
   * @param params Parameters for getting visits per visit duration
   * @returns Promise with the API response containing visit duration distribution
   */
  async getNumberOfVisitsPerVisitDuration(
    params: VisitorInterestParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "VisitorInterest.getNumberOfVisitsPerVisitDuration",
        params
      );
    }
    return await this.client.request(
      "VisitorInterest.getNumberOfVisitsPerVisitDuration",
      params
    );
  }

  /**
   * Get the distribution of visits by number of pages viewed
   * Returns metrics about content exploration depth, including:
   * - Page view distribution (e.g., 1 page, 2-3 pages, 4-5 pages, etc.)
   * - Content navigation patterns
   * - User journey analysis
   * 
   * This data helps you:
   * - Optimize content structure
   * - Improve navigation flow
   * - Identify popular content paths
   * - Measure content effectiveness
   *
   * @param params Parameters for getting visits per visited pages count
   * @returns Promise with the API response containing page view distribution
   */
  async getNumberOfVisitsPerPage(params: VisitorInterestParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "VisitorInterest.getNumberOfVisitsPerPage",
        params
      );
    }
    return await this.client.request(
      "VisitorInterest.getNumberOfVisitsPerPage",
      params
    );
  }

  /**
   * Get the distribution of visits by days since last visit
   * Returns metrics about visitor return patterns, including:
   * - Return visit frequency (e.g., same day, 1 day, 2-7 days, etc.)
   * - Visitor retention rates
   * - Loyalty patterns
   * 
   * This data helps you:
   * - Measure visitor loyalty
   * - Optimize re-engagement strategies
   * - Identify retention opportunities
   * - Track loyalty program effectiveness
   *
   * @param params Parameters for getting days elapsed since last visit
   * @returns Promise with the API response containing return visit distribution
   */
  async getNumberOfVisitsByDaysSinceLast(
    params: VisitorInterestParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "VisitorInterest.getNumberOfVisitsByDaysSinceLast",
        params
      );
    }
    return await this.client.request(
      "VisitorInterest.getNumberOfVisitsByDaysSinceLast",
      params
    );
  }

  /**
   * Get the distribution of visits by visit count
   * Returns metrics about visitor frequency and loyalty, including:
   * - Visit frequency distribution (e.g., first visit, 2-5 visits, 6-10 visits, etc.)
   * - New vs. returning visitor ratios
   * - Loyal visitor segmentation
   * 
   * This data helps you:
   * - Identify loyal customer segments
   * - Measure visitor acquisition success
   * - Optimize retention strategies
   * - Track visitor lifecycle
   *
   * @param params Parameters for getting visits by visit count
   * @returns Promise with the API response containing visit frequency distribution
   */
  async getNumberOfVisitsByVisitCount(
    params: VisitorInterestParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "VisitorInterest.getNumberOfVisitsByVisitCount",
        params
      );
    }
    return await this.client.request(
      "VisitorInterest.getNumberOfVisitsByVisitCount",
      params
    );
  }
}
