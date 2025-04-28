/**
 * Matomo VisitFrequency Module
 *
 * The VisitFrequency API provides detailed insights into visitor loyalty and behavior patterns
 * by comparing metrics between new and returning visitors. This analysis helps you understand:
 *
 * Visitor Behavior Comparison:
 * - Engagement levels: How returning visitors interact differently from new visitors
 * - Content consumption: Differences in page views and time spent
 * - Conversion patterns: How loyalty affects goal completion
 * - Bounce rates: Differences in initial engagement
 *
 * Key Metrics Analysis:
 * - Visit frequency distribution
 * - Unique visitor ratios
 * - Action patterns
 * - Time on site comparisons
 * - Goal conversion rates
 * - Bounce rate differences
 *
 * Business Applications:
 * - Optimize first-time visitor experience
 * - Enhance returning visitor engagement
 * - Improve conversion funnel design
 * - Develop targeted retention strategies
 * - Measure loyalty program effectiveness
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for VisitFrequency API methods
 * @property {number|string} [idSite] - The integer id of your website, or 'all' for all websites
 * @property {string} period - The period to request data for (day, week, month, year, range)
 * @property {string} date - The date string in YYYY-MM-DD format, or magic keywords (today, yesterday, lastWeek, lastMonth, lastYear)
 * @property {string} [segment] - Optional segment definition to filter the data
 * @property {string} [columns] - Optional columns to restrict the returned data
 */
export interface VisitFrequencyParams extends RequestParams {
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

export class VisitFrequencyModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get comprehensive metrics comparing new and returning visitors
   * Returns detailed analytics comparing visitor behavior across different segments:
   * 
   * New vs. Returning Visitor Metrics:
   * - Visit counts and unique visitor ratios
   * - Action patterns and engagement levels
   * - Bounce rates and time on site
   * - Goal conversion performance
   * - Content consumption patterns
   * 
   * This data helps you:
   * - Identify loyalty patterns and trends
   * - Optimize visitor experience by segment
   * - Improve conversion funnel design
   * - Develop targeted engagement strategies
   * - Measure retention program success
   *
   * @param params Parameters for getting visitor frequency metrics
   * @returns Promise with the API response containing metrics for both new and returning visitors
   */
  async get(params: VisitFrequencyParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("VisitFrequency.get", params);
    }
    return await this.client.request("VisitFrequency.get", params);
  }
}
