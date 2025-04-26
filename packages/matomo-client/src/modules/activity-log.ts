/**
 * Matomo ActivityLog Module
 * Provides access to user activity logs in the Matomo instance
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

export interface GetEntriesParams {
  /** Result offset (default: 0) */
  offset?: string | number;
  /** Number of records to return (default: 25) */
  limit?: string | number;
  /** Filter activities by specific user login */
  filterByUserLogin?: string;
  /** Filter by activity type */
  filterByActivityType?: string;
  /** Period to filter by */
  period?: string;
  /** Date to filter by */
  date?: string;
}

export interface GetEntryCountParams {
  /** Filter count by specific user login */
  filterByUserLogin?: string;
  /** Filter count by activity type */
  filterByActivityType?: string;
  /** Period to filter by */
  period?: string;
  /** Date to filter by */
  date?: string;
}

export interface GetAllActivityTypesParams {
  /** Number of activity types to return (-1 for all) */
  filterLimit?: string | number;
}

export class ActivityLogModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get activity log entries
   *
   * Returns a list of the activities done by users in your Matomo instance.
   * The results depend on authentication:
   * - Super User: returns activity logs for all users
   * - User with view/admin access or anonymous: returns only this user's activity
   */
  async getEntries(params: GetEntriesParams = {}): Promise<any> {
    const requestParams: RequestParams = {
      offset: "0",
      limit: "25",
      ...params,
    };

    if (params.filterByUserLogin)
      requestParams.filterByUserLogin = params.filterByUserLogin;
    if (params.filterByActivityType)
      requestParams.filterByActivityType = params.filterByActivityType;
    if (params.period) requestParams.period = params.period;
    if (params.date) requestParams.date = params.date;

    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("ActivityLog.getEntries", requestParams);
    }
    return this.client.request("ActivityLog.getEntries", requestParams);
  }

  /**
   * Get count of activity log entries
   *
   * Returns the total number of activities matching the specified filters
   */
  async getEntryCount(params: GetEntryCountParams = {}): Promise<number> {
    const requestParams: RequestParams = {};

    if (params.filterByUserLogin)
      requestParams.filterByUserLogin = params.filterByUserLogin;
    if (params.filterByActivityType)
      requestParams.filterByActivityType = params.filterByActivityType;
    if (params.period) requestParams.period = params.period;
    if (params.date) requestParams.date = params.date;

    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("ActivityLog.getEntryCount", requestParams);
    }
    const result = await this.client.request<{ value: number }>(
      "ActivityLog.getEntryCount",
      requestParams
    );
    return result.value;
  }

  /**
   * Get all available activity types
   *
   * Returns a list of all possible activity types that can be used for filtering
   */
  async getAllActivityTypes(
    params: GetAllActivityTypesParams = {}
  ): Promise<any> {
    const requestParams: RequestParams = {
      filterLimit: "-1",
      ...params,
    };

    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "ActivityLog.getAllActivityTypes",
        requestParams
      );
    }
    return this.client.request<string[]>(
      "ActivityLog.getAllActivityTypes",
      requestParams
    );
  }
}
