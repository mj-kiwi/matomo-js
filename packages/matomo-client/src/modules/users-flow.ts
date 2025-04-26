/**
 * Matomo UsersFlow Module
 * API for Users Flow. The API lets you explore details about how your users
 * or visitors navigate through your website.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for UsersFlow API methods
 */
export interface UsersFlowParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
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
   *
   * @param params Parameters for getting a formatted user flow
   */
  async getUsersFlowPretty(params: UsersFlowPrettyParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UsersFlow.getUsersFlowPretty", params);
    }
    return this.client.request("UsersFlow.getUsersFlowPretty", params);
  }

  /**
   * Get the raw user flow data
   *
   * @param params Parameters for getting raw user flow data
   */
  async getUsersFlow(params: GetUsersFlowParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UsersFlow.getUsersFlow", params);
    }
    return this.client.request("UsersFlow.getUsersFlow", params);
  }

  /**
   * Get details about interactions at a specific position
   *
   * @param params Parameters for getting interaction actions
   */
  async getInteractionActions(params: InteractionActionsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UsersFlow.getInteractionActions", params);
    }
    return this.client.request("UsersFlow.getInteractionActions", params);
  }

  /**
   * Get the available data sources for users flow reports
   */
  async getAvailableDataSources(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UsersFlow.getAvailableDataSources", {});
    }
    return this.client.request("UsersFlow.getAvailableDataSources", {});
  }
}
