/**
 * Matomo VisitTime Module
 *
 * The VisitTime API provides comprehensive insights into visitor activity patterns
 * across different time dimensions, helping you optimize your website's operations
 * and content strategy. Key features include:
 *
 * Time Zone Analysis:
 * - Server time patterns for operational planning
 * - Local time patterns for audience understanding
 * - Global visitor distribution
 * - Peak activity periods
 *
 * Weekly Patterns:
 * - Day-of-week traffic distribution
 * - Weekend vs. weekday behavior
 * - Content consumption patterns
 * - Engagement level variations
 *
 * Business Applications:
 * - Optimize content publishing schedules
 * - Plan server maintenance windows
 * - Schedule marketing campaigns
 * - Allocate support resources
 * - Design time-sensitive promotions
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for VisitTime API methods
 * @property {number|string} [idSite] - The integer id of your website, or 'all' for all websites
 * @property {string} period - The period to request data for (day, week, month, year, range)
 * @property {string} date - The date string in YYYY-MM-DD format, or magic keywords (today, yesterday, lastWeek, lastMonth, lastYear)
 * @property {string} [segment] - Optional segment definition to filter the data
 */
export interface VisitTimeParams extends RequestParams {
  /** Site ID */
  idSite?: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for server time reports
 * @property {string|boolean} [hideFutureHoursWhenToday] - Whether to hide future hours when the date is today
 */
export interface ServerTimeParams extends VisitTimeParams {
  /** Whether to hide future hours when date is today */
  hideFutureHoursWhenToday?: string | boolean;
}

export class VisitTimeModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get visitor activity by their local time (browser's timezone)
   * Returns detailed metrics about visitor activity patterns in their local time zones, including:
   * - Hourly visit distribution
   * - Peak activity periods
   * - Global visitor patterns
   * - Time zone distribution
   * 
   * This data helps you:
   * - Understand global audience behavior
   * - Optimize content publishing times
   * - Plan international campaigns
   * - Schedule support coverage
   * - Identify regional opportunities
   *
   * @param params Parameters for getting visitor time by local time
   * @returns Promise with the API response containing hourly visit distribution by local time
   */
  async getVisitInformationPerLocalTime(params: VisitTimeParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "VisitTime.getVisitInformationPerLocalTime",
        params
      );
    }
    return await this.client.request(
      "VisitTime.getVisitInformationPerLocalTime",
      params
    );
  }

  /**
   * Get visitor activity by server time
   * Returns metrics about visitor activity in your server's timezone, including:
   * - Server-hour visit distribution
   * - Peak server load times
   * - Maintenance window impact
   * - Content update effectiveness
   * 
   * This data helps you:
   * - Plan server maintenance
   * - Optimize resource allocation
   * - Schedule content updates
   * - Manage server load
   * - Coordinate team activities
   *
   * @param params Parameters for getting visitor time by server time
   * @returns Promise with the API response containing hourly visit distribution by server time
   */
  async getVisitInformationPerServerTime(
    params: ServerTimeParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "VisitTime.getVisitInformationPerServerTime",
        params
      );
    }
    return await this.client.request(
      "VisitTime.getVisitInformationPerServerTime",
      params
    );
  }

  /**
   * Get visitor activity by day of week
   * Returns detailed metrics about weekly visitor patterns, including:
   * - Day-of-week visit distribution
   * - Weekend vs. weekday behavior
   * - Content consumption patterns
   * - Engagement level variations
   * 
   * This data helps you:
   * - Optimize content scheduling
   * - Plan marketing campaigns
   * - Allocate support resources
   * - Design promotions
   * - Understand audience habits
   *
   * @param params Parameters for getting visits by day of week
   * @returns Promise with the API response containing visit distribution by day of week
   */
  async getByDayOfWeek(params: VisitTimeParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("VisitTime.getByDayOfWeek", params);
    }
    return await this.client.request("VisitTime.getByDayOfWeek", params);
  }
}
