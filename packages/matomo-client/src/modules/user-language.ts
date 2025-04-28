/**
 * Matomo UserLanguage Module
 *
 * The UserLanguage API provides insights into your visitors' language preferences:
 * - Browser language settings
 * - Language codes
 * - Language distribution across your visitors
 *
 * This module helps you understand your international audience and can be used to:
 * - Identify potential markets for localization
 * - Optimize content for your most common visitor languages
 * - Plan multilingual support strategies
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for UserLanguage API methods
 * @property {number|string} [idSite] - The integer id of your website, or 'all' for all websites
 * @property {string} period - The period to request data for (day, week, month, year, range)
 * @property {string} date - The date string in YYYY-MM-DD format, or magic keywords (today, yesterday, lastWeek, lastMonth, lastYear)
 * @property {string} [segment] - Optional segment definition to filter the data
 */
export interface UserLanguageParams extends RequestParams {
  /** Site ID */
  idSite?: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
}

export class UserLanguageModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get visitor distribution by language
   * Returns a report showing the number of visits from different language settings
   * (e.g., English, Spanish, French, etc.)
   *
   * @param params Parameters for getting visitor language information
   * @returns Promise with the API response containing language distribution
   */
  async getLanguage(params: UserLanguageParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UserLanguage.getLanguage", params);
    }
    return await this.client.request("UserLanguage.getLanguage", params);
  }

  /**
   * Get visitor distribution by language code
   * Returns a report showing the number of visits from different language codes
   * (e.g., en, es, fr, etc.)
   *
   * @param params Parameters for getting visitor language code information
   * @returns Promise with the API response containing language code distribution
   */
  async getLanguageCode(params: UserLanguageParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UserLanguage.getLanguageCode", params);
    }
    return await this.client.request("UserLanguage.getLanguageCode", params);
  }
}
