/**
 * Matomo UsersFlow Module
 *
 * The UsersFlow API provides detailed insights into how visitors navigate through your website:
 * - User journey visualization
 * - Path analysis
 * - Interaction patterns
 * - Conversion funnels
 *
 * This module helps you understand:
 * - Common entry and exit points
 * - Navigation patterns
 * - User engagement paths
 * - Potential conversion bottlenecks
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for UsersFlow API methods
 * @property {number|string} [idSite] - The integer id of your website, or 'all' for all websites
 * @property {string} period - The period to request data for (day, week, month, year, range)
 * @property {string} date - The date string in YYYY-MM-DD format, or magic keywords (today, yesterday, lastWeek, lastMonth, lastYear)
 * @property {string} [segment] - Optional segment definition to filter the data
 * @property {string} [dataSource] - Optional data source for the flow report (e.g., 'visits', 'actions')
 */
export interface UsersFlowParams extends RequestParams {
  /** Site ID */
  idSite?: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
  /** Optional data source for the flow report */
  dataSource?: string;
}

/**
 * Parameters for getUsersFlowPretty method
 * @property {string|boolean} [expanded] - Whether to expand the flow visualization
 * @property {string|boolean} [flat] - Whether to return a flattened report structure
 * @property {string|number} [idSubtable] - If set, get data for this specific subtable
 */
export interface UsersFlowPrettyParams extends UsersFlowParams {
  /** Whether to expand the flow */
  expanded?: string | boolean;
  /** Whether to return a flattened report */
  flat?: string | boolean;
  /** If set, get data for this subtable */
  idSubtable?: string | number;
}

/**
 * Parameters for getUsersFlow method
 * @property {string|number} [limitActionsPerStep] - Maximum number of actions to show per step
 * @property {string|number} [exploreStep] - Step number to explore in detail
 * @property {string} [exploreUrl] - URL to explore in the flow
 * @property {string|boolean} [expanded] - Whether to expand the flow visualization
 */
export interface GetUsersFlowParams extends UsersFlowParams {
  /** Maximum number of actions per step */
  limitActionsPerStep?: string | number;
  /** Step number to explore */
  exploreStep?: string | number;
  /** URL to explore */
  exploreUrl?: string;
  /** Whether to expand the flow */
  expanded?: string | boolean;
}

/**
 * Parameters for getInteractionActions method
 * @property {string|number} interactionPosition - Position in the flow to analyze interactions
 * @property {string|number} [offsetActionsPerStep] - Offset for actions per step
 * @property {string|number} [idSubtable] - If set, get data for this specific subtable
 */
export interface InteractionActionsParams extends UsersFlowParams {
  /** Position of the interaction */
  interactionPosition: string | number;
  /** Offset for actions per step */
  offsetActionsPerStep?: string | number;
  /** If set, get data for this subtable */
  idSubtable?: string | number;
}

export class UsersFlowModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get a formatted user flow report
   * Returns a visually formatted report showing how users navigate through your website,
   * including entry points, paths, and exit points
   *
   * @param params Parameters for getting a formatted user flow
   * @returns Promise with the API response containing the formatted flow visualization
   */
  async getUsersFlowPretty(params: UsersFlowPrettyParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UsersFlow.getUsersFlowPretty", params);
    }
    return await this.client.request("UsersFlow.getUsersFlowPretty", params);
  }

  /**
   * Get the raw user flow data
   * Returns detailed raw data about user navigation patterns, suitable for custom analysis
   * or integration with other tools
   *
   * @param params Parameters for getting raw user flow data
   * @returns Promise with the API response containing raw flow data
   */
  async getUsersFlow(params: GetUsersFlowParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UsersFlow.getUsersFlow", params);
    }
    return await this.client.request("UsersFlow.getUsersFlow", params);
  }

  /**
   * Get details about interactions at a specific position
   * Returns detailed information about user interactions at a specific point in the flow,
   * including actions, clicks, and navigation patterns
   *
   * @param params Parameters for getting interaction actions
   * @returns Promise with the API response containing interaction details
   */
  async getInteractionActions(params: InteractionActionsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UsersFlow.getInteractionActions", params);
    }
    return await this.client.request("UsersFlow.getInteractionActions", params);
  }

  /**
   * Get the available data sources for users flow reports
   * Returns a list of available data sources that can be used for flow analysis
   *
   * @returns Promise with the API response containing available data sources
   */
  async getAvailableDataSources(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UsersFlow.getAvailableDataSources", {});
    }
    return await this.client.request("UsersFlow.getAvailableDataSources", {});
  }
}
