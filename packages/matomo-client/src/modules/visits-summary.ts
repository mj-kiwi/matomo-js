/**
 * Matomo VisitsSummary Module
 *
 * API for VisitsSummary module which lets you access core web analytics metrics:
 * visits, unique visitors, count of actions (page views, downloads, clicks on outlinks),
 * time on site, bounces and converted visits.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for VisitsSummary API methods
 */
export interface VisitsSummaryParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for (day, week, month, year, range) */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for the get method
 */
export interface VisitsSummaryGetParams extends VisitsSummaryParams {
  /** Optional columns to restrict the returned data */
  columns?: string;
}

export class VisitsSummaryModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get core web analytics metrics
   *
   * @param params Parameters for getting core web analytics metrics
   * @returns Promise with the API response containing visit metrics
   */
  async get(params: VisitsSummaryGetParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("VisitsSummary.get", params);
    }
    return await this.client.request("VisitsSummary.get", params);
  }

  /**
   * Get the number of visits
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
   * Get the number of unique visitors
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
   * Get the number of users
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
   * Get the number of actions (page views, downloads, etc.)
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
   * Get the maximum number of actions in a visit
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
   * Get the number of bounced visits
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
   * Get the number of visits that converted a goal
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
   * Get the total time spent by all visits
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
   * Get the total visit time formatted as a pretty string
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
