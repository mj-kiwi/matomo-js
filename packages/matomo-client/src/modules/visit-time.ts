/**
 * Matomo VisitTime Module
 * VisitTime API lets you access reports by Hour (Server time), and by Hour Local Time of your visitors.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for VisitTime API methods
 */
export interface VisitTimeParams extends RequestParams {
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
 * Parameters for server time reports
 */
export interface ServerTimeParams extends VisitTimeParams {
  /** Whether to hide future hours when date is today */
  hideFutureHoursWhenToday?: string | boolean;
}

export class VisitTimeModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get visitor times by local time (browser's local time)
   *
   * @param params Parameters for getting visitor time by local time
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
   * Get visitor times by server time
   *
   * @param params Parameters for getting visitor time by server time
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
   * Get visits by day of week
   *
   * @param params Parameters for getting visits by day of week
   */
  async getByDayOfWeek(params: VisitTimeParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("VisitTime.getByDayOfWeek", params);
    }
    return await this.client.request("VisitTime.getByDayOfWeek", params);
  }
}
