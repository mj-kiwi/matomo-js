/**
 * Matomo UserLanguage Module
 * The UserLanguage API lets you access reports about your Visitors language setting
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for UserLanguage API methods
 */
export interface UserLanguageParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
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
   * Get visitor language information
   *
   * @param params Parameters for getting visitor language information
   */
  async getLanguage(params: UserLanguageParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UserLanguage.getLanguage", params);
    }
    return this.client.request("UserLanguage.getLanguage", params);
  }

  /**
   * Get visitor language code information
   *
   * @param params Parameters for getting visitor language code information
   */
  async getLanguageCode(params: UserLanguageParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UserLanguage.getLanguageCode", params);
    }
    return this.client.request("UserLanguage.getLanguageCode", params);
  }
}
