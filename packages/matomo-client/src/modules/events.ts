/**
 * Matomo Events Module
 *
 * The Events API provides comprehensive tracking and analysis of custom events:
 * - Event categories
 * - Event actions
 * - Event names
 * - Event metrics
 *
 * This module helps you track and analyze:
 * - User interactions with specific elements
 * - Custom conversion events
 * - Feature usage patterns
 * - Engagement metrics
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for Event module methods
 * @property {number|string} [idSite] - The integer id of your website, or 'all' for all websites
 * @property {string} period - The period to request data for (day, week, month, year, range)
 * @property {string} date - The date string in YYYY-MM-DD format, or magic keywords (today, yesterday, lastWeek, lastMonth, lastYear)
 * @property {string} [segment] - Optional segment definition to filter the data
 */
export interface EventReportParams extends RequestParams {
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
 * Parameters for dimension reports (category, action, name)
 * @property {string} [expanded] - Whether to expand the results (show all details)
 * @property {string} [secondaryDimension] - Secondary dimension to group by (eventAction, eventName or eventCategory)
 * @property {string} [flat] - Whether to return a flattened report structure
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
 * @property {string|number} idSubtable - The ID of the subtable to fetch data for
 */
export interface EventSubtableParams extends EventReportParams {
  /** Subtable ID */
  idSubtable: string | number;
}

export class EventsModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get event categories
   * Returns a report showing all tracked event categories and their metrics
   *
   * @param params Parameters for getting event categories
   * @returns Promise with the API response containing event category data
   */
  async getCategory(params: EventDimensionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getCategory", params);
    }
    return await this.client.request("Events.getCategory", params);
  }

  /**
   * Get event actions
   * Returns a report showing all tracked event actions and their metrics
   *
   * @param params Parameters for getting event actions
   * @returns Promise with the API response containing event action data
   */
  async getAction(params: EventDimensionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getAction", params);
    }
    return await this.client.request("Events.getAction", params);
  }

  /**
   * Get event names
   * Returns a report showing all tracked event names and their metrics
   *
   * @param params Parameters for getting event names
   * @returns Promise with the API response containing event name data
   */
  async getName(params: EventDimensionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getName", params);
    }
    return await this.client.request("Events.getName", params);
  }

  /**
   * Get actions from category ID
   * Returns a report showing all actions associated with a specific event category
   *
   * @param params Parameters for getting actions from a category ID
   * @returns Promise with the API response containing category action data
   */
  async getActionFromCategoryId(params: EventSubtableParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getActionFromCategoryId", params);
    }
    return await this.client.request("Events.getActionFromCategoryId", params);
  }

  /**
   * Get names from category ID
   * Returns a report showing all names associated with a specific event category
   *
   * @param params Parameters for getting names from a category ID
   * @returns Promise with the API response containing category name data
   */
  async getNameFromCategoryId(params: EventSubtableParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getNameFromCategoryId", params);
    }
    return await this.client.request("Events.getNameFromCategoryId", params);
  }

  /**
   * Get categories from action ID
   * Returns a report showing all categories associated with a specific event action
   *
   * @param params Parameters for getting categories from an action ID
   * @returns Promise with the API response containing action category data
   */
  async getCategoryFromActionId(params: EventSubtableParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getCategoryFromActionId", params);
    }
    return await this.client.request("Events.getCategoryFromActionId", params);
  }

  /**
   * Get names from action ID
   * Returns a report showing all names associated with a specific event action
   *
   * @param params Parameters for getting names from an action ID
   * @returns Promise with the API response containing action name data
   */
  async getNameFromActionId(params: EventSubtableParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getNameFromActionId", params);
    }
    return await this.client.request("Events.getNameFromActionId", params);
  }

  /**
   * Get actions from name ID
   * Returns a report showing all actions associated with a specific event name
   *
   * @param params Parameters for getting actions from a name ID
   * @returns Promise with the API response containing name action data
   */
  async getActionFromNameId(params: EventSubtableParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getActionFromNameId", params);
    }
    return await this.client.request("Events.getActionFromNameId", params);
  }

  /**
   * Get categories from name ID
   * Returns a report showing all categories associated with a specific event name
   *
   * @param params Parameters for getting categories from a name ID
   * @returns Promise with the API response containing name category data
   */
  async getCategoryFromNameId(params: EventSubtableParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Events.getCategoryFromNameId", params);
    }
    return await this.client.request("Events.getCategoryFromNameId", params);
  }
}
