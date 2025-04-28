/**
 * Matomo VisitsSummary Module
 *
 * The VisitsSummary API provides access to core web analytics metrics that help you understand:
 * - Visitor engagement and behavior patterns
 * - Content effectiveness and user interaction
 * - Conversion rates and goal completion
 * - Site performance and user experience
 *
 * Key metrics include:
 * - Visits: Total number of sessions on your site
 * - Unique visitors: Number of distinct individuals visiting
 * - Actions: Total interactions (page views, downloads, outlinks)
 * - Time on site: Average duration of visits
 * - Bounces: Single-page visits without interaction
 * - Converted visits: Sessions that completed defined goals
 *
 * All metrics are calculated based on your website's configured time zone.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for VisitsSummary API methods
 * @property {number|string} [idSite] - The integer id of your website, or 'all' for all websites
 * @property {string} period - The period to request data for (day, week, month, year, range)
 * @property {string} date - The date string in YYYY-MM-DD format, or magic keywords (today, yesterday, lastWeek, lastMonth, lastYear)
 * @property {string} [segment] - Optional segment definition to filter the data
 * @property {string} [columns] - Optional columns to restrict the returned data
 */
export interface VisitsSummaryParams extends RequestParams {
  /** Site ID */
  idSite?: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
  /** Optional columns to restrict the returned data */
  columns?: string;
}

/**
 * Parameters for the get method
 * @property {string} [columns] - Optional columns to restrict the returned data
 */
export interface VisitsSummaryGetParams extends VisitsSummaryParams {
  /** Optional columns to restrict the returned data */
  columns?: string;
}

export class VisitsSummaryModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get all core web analytics metrics in a single request
   * Returns a comprehensive overview of visitor behavior, including:
   * - Total visits and unique visitors
   * - Action counts and maximum actions per visit
   * - Bounce rates and conversion metrics
   * - Total time spent on site
   * 
   * This method is ideal for getting a complete snapshot of your site's performance.
   *
   * @param params Parameters for getting core web analytics metrics
   * @returns Promise with the API response containing all visit metrics
   */
  async get(params: VisitsSummaryGetParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("VisitsSummary.get", params);
    }
    return await this.client.request("VisitsSummary.get", params);
  }

  /**
   * Get the number of visits for the specified period
   * A visit is defined as a series of page views by the same visitor within 30 minutes
   * This metric helps you understand:
   * - Overall site traffic patterns
   * - Peak usage times
   * - Growth trends over time
   *
   * @param params Parameters for getting visit counts
   * @returns Promise with the API response containing visit counts
   */
  async getVisits(params: VisitsSummaryParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("VisitsSummary.getVisits", params);
    }
    return await this.client.request("VisitsSummary.getVisits", params);
  }

  /**
   * Get the number of unique visitors for the specified period
   * A unique visitor is identified by their unique visitor ID cookie
   * This metric helps you understand:
   * - Your actual audience size
   * - New vs. returning visitor ratios
   * - Visitor loyalty patterns
   *
   * @param params Parameters for getting unique visitor counts
   * @returns Promise with the API response containing unique visitor counts
   */
  async getUniqueVisitors(params: VisitsSummaryParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("VisitsSummary.getUniqueVisitors", params);
    }
    return await this.client.request("VisitsSummary.getUniqueVisitors", params);
  }

  /**
   * Get the number of users for the specified period
   * Users are identified by their user ID when User ID tracking is enabled
   * This metric helps you understand:
   * - Registered user activity
   * - User engagement levels
   * - Account-based analytics
   *
   * @param params Parameters for getting user counts
   * @returns Promise with the API response containing user counts
   */
  async getUsers(params: VisitsSummaryParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("VisitsSummary.getUsers", params);
    }
    return await this.client.request("VisitsSummary.getUsers", params);
  }

  /**
   * Get the total number of actions (page views, downloads, outlinks) for the specified period
   * An action is any interaction with your website that you track
   * This metric helps you understand:
   * - Content engagement levels
   * - User interaction patterns
   * - Resource popularity
   *
   * @param params Parameters for getting action counts
   * @returns Promise with the API response containing action counts
   */
  async getActions(params: VisitsSummaryParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("VisitsSummary.getActions", params);
    }
    return await this.client.request("VisitsSummary.getActions", params);
  }

  /**
   * Get the maximum number of actions performed in a single visit
   * This helps identify the most engaged visitors and understand:
   * - Peak engagement levels
   * - Content depth exploration
   * - User interaction limits
   *
   * @param params Parameters for getting maximum actions per visit
   * @returns Promise with the API response containing maximum actions per visit
   */
  async getMaxActions(params: VisitsSummaryParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("VisitsSummary.getMaxActions", params);
    }
    return await this.client.request("VisitsSummary.getMaxActions", params);
  }

  /**
   * Get the number of bounced visits for the specified period
   * A bounce is a visit that only viewed one page and left without any interaction
   * This metric helps you understand:
   * - Content relevance
   * - User experience issues
   * - Landing page effectiveness
   *
   * @param params Parameters for getting bounce counts
   * @returns Promise with the API response containing bounce counts
   */
  async getBounceCount(params: VisitsSummaryParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("VisitsSummary.getBounceCount", params);
    }
    return await this.client.request("VisitsSummary.getBounceCount", params);
  }

  /**
   * Get the number of visits that converted at least one goal
   * A converted visit is one where the visitor completed a goal you defined
   * This metric helps you understand:
   * - Conversion rates
   * - Goal completion patterns
   * - Marketing effectiveness
   *
   * @param params Parameters for getting counts of converted visits
   * @returns Promise with the API response containing counts of converted visits
   */
  async getVisitsConverted(params: VisitsSummaryParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("VisitsSummary.getVisitsConverted", params);
    }
    return await this.client.request(
      "VisitsSummary.getVisitsConverted",
      params
    );
  }

  /**
   * Get the total time spent by all visits in seconds
   * This is the sum of all visit durations and helps you understand:
   * - Overall engagement levels
   * - Content consumption patterns
   * - User attention span
   *
   * @param params Parameters for getting total visit time
   * @returns Promise with the API response containing total visit time in seconds
   */
  async getSumVisitsLength(params: VisitsSummaryParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("VisitsSummary.getSumVisitsLength", params);
    }
    return await this.client.request(
      "VisitsSummary.getSumVisitsLength",
      params
    );
  }

  /**
   * Get the total visit time formatted as a human-readable string
   * The time is formatted based on the total duration (e.g., "2h 30m" or "45m")
   * This provides an easily interpretable view of:
   * - Total engagement time
   * - Average visit duration
   * - Time distribution patterns
   *
   * @param params Parameters for getting formatted total visit time
   * @returns Promise with the API response containing formatted total visit time
   */
  async getSumVisitsLengthPretty(params: VisitsSummaryParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "VisitsSummary.getSumVisitsLengthPretty",
        params
      );
    }
    return await this.client.request(
      "VisitsSummary.getSumVisitsLengthPretty",
      params
    );
  }
}
