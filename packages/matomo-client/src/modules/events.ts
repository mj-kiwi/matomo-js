/**
 * Matomo Events Module
 * Provides access to Events tracking data
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for Event module methods
 */
export interface EventReportParams extends RequestParams {
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
 * Parameters for dimension reports (category, action, name)
 */
export interface EventDimensionParams extends EventReportParams {
  /** Whether to expand the results */
  expanded?: string;
  /** Secondary dimension (eventAction, eventName or eventCategory) */
  secondaryDimension?: string;
  /** Whether to return a flattened report */
  flat?: string;
}

/**
 * Parameters for subtable reports
 */
export interface EventSubtableParams extends EventReportParams {
  /** Subtable ID */
  idSubtable: string | number;
}

export class EventsModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get event categories
   *
   * @param params Parameters for getting event categories
   * @returns Promise with the API response
   */
  async getCategory(params: EventDimensionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getCategory", params);
    }
    return await this.client.request("Events.getCategory", params);
  }

  /**
   * Get event actions
   *
   * @param params Parameters for getting event actions
   * @returns Promise with the API response
   */
  async getAction(params: EventDimensionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getAction", params);
    }
    return await this.client.request("Events.getAction", params);
  }

  /**
   * Get event names
   *
   * @param params Parameters for getting event names
   * @returns Promise with the API response
   */
  async getName(params: EventDimensionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getName", params);
    }
    return await this.client.request("Events.getName", params);
  }

  /**
   * Get action from category ID
   *
   * @param params Parameters for getting actions from a category ID
   * @returns Promise with the API response
   */
  async getActionFromCategoryId(params: EventSubtableParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getActionFromCategoryId", params);
    }
    return await this.client.request("Events.getActionFromCategoryId", params);
  }

  /**
   * Get name from category ID
   *
   * @param params Parameters for getting names from a category ID
   * @returns Promise with the API response
   */
  async getNameFromCategoryId(params: EventSubtableParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getNameFromCategoryId", params);
    }
    return await this.client.request("Events.getNameFromCategoryId", params);
  }

  /**
   * Get category from action ID
   *
   * @param params Parameters for getting categories from an action ID
   * @returns Promise with the API response
   */
  async getCategoryFromActionId(params: EventSubtableParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getCategoryFromActionId", params);
    }
    return await this.client.request("Events.getCategoryFromActionId", params);
  }

  /**
   * Get name from action ID
   *
   * @param params Parameters for getting names from an action ID
   * @returns Promise with the API response
   */
  async getNameFromActionId(params: EventSubtableParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getNameFromActionId", params);
    }
    return await this.client.request("Events.getNameFromActionId", params);
  }

  /**
   * Get action from name ID
   *
   * @param params Parameters for getting actions from a name ID
   * @returns Promise with the API response
   */
  async getActionFromNameId(params: EventSubtableParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getActionFromNameId", params);
    }
    return await this.client.request("Events.getActionFromNameId", params);
  }

  /**
   * Get category from name ID
   *
   * @param params Parameters for getting categories from a name ID
   * @returns Promise with the API response
   */
  async getCategoryFromNameId(params: EventSubtableParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getCategoryFromNameId", params);
    }
    return await this.client.request("Events.getCategoryFromNameId", params);
  }
}
