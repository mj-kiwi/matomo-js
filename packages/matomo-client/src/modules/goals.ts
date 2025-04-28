/**
 * Matomo Goals Module
 *
 * The Goals API provides comprehensive goal tracking and management capabilities:
 * - Goal creation and configuration
 * - Conversion tracking
 * - Ecommerce analytics
 * - Abandoned cart analysis
 *
 * This module helps you:
 * - Define and track business objectives
 * - Measure conversion rates
 * - Analyze purchase behavior
 * - Optimize conversion funnels
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for Goals API methods
 * @property {number|string} [idSite] - The integer id of your website, or 'all' for all websites
 */
export interface GoalParams extends RequestParams {
  /** Site ID */
  idSite?: number | string;
}

/**
 * Parameters for retrieving a specific goal
 * @property {number|string} idGoal - The ID of the goal to retrieve
 */
export interface GetGoalParams extends GoalParams {
  /** Goal ID */
  idGoal: number | string;
}

/**
 * Parameters for retrieving all goals
 * @property {boolean} [orderByName] - Optional flag to order goals by name
 */
export interface GetGoalsParams extends GoalParams {
  /** Optional flag to order goals by name */
  orderByName?: boolean;
}

/**
 * Parameters for adding or updating a goal
 * @property {string} name - The name of the goal
 * @property {string} matchAttribute - The attribute to match (url, title, file, event, etc.)
 * @property {string} pattern - The pattern to match against
 * @property {string} patternType - The type of pattern matching (contains, exact, regex, etc.)
 * @property {boolean|string} [caseSensitive] - Whether the pattern matching should be case sensitive
 * @property {number|string} [revenue] - The revenue value associated with the goal
 * @property {boolean|string} [allowMultipleConversionsPerVisit] - Whether to allow multiple conversions per visit
 * @property {string} [description] - Optional description of the goal
 * @property {boolean|string} [useEventValueAsRevenue] - Whether to use the event value as revenue
 */
export interface GoalDefinitionParams extends GoalParams {
  /** Goal name */
  name: string;
  /** Attribute to match (manually, file, url, title, etc.) */
  matchAttribute: string;
  /** Pattern to match */
  pattern: string;
  /** Type of pattern (contains, exact, regex, etc.) */
  patternType: string;
  /** Optional case sensitivity flag */
  caseSensitive?: boolean | string;
  /** Optional revenue amount associated with the goal */
  revenue?: number | string;
  /** Optional flag to allow multiple conversions per visit */
  allowMultipleConversionsPerVisit?: boolean | string;
  /** Optional goal description */
  description?: string;
  /** Optional flag to use event value as revenue */
  useEventValueAsRevenue?: boolean | string;
}

/**
 * Parameters for updating a goal
 * @property {number|string} idGoal - The ID of the goal to update
 */
export interface UpdateGoalParams extends GoalDefinitionParams {
  /** Goal ID */
  idGoal: number | string;
}

/**
 * Common parameters for ecommerce item reports
 * @property {number|string} [idSite] - The integer id of your website, or 'all' for all websites
 * @property {string} period - The period to request data for (day, week, month, year, range)
 * @property {string} date - The date string in YYYY-MM-DD format, or magic keywords (today, yesterday, lastWeek, lastMonth, lastYear)
 * @property {boolean|string} [abandonedCarts] - Whether to get data for abandoned carts instead of orders
 * @property {string} [segment] - Optional segment definition to filter the data
 */
export interface ItemReportParams extends RequestParams {
  /** Site ID */
  idSite?: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional flag to get data for abandoned carts instead of orders */
  abandonedCarts?: boolean | string;
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for goal metrics reports
 * @property {number|string} [idSite] - The integer id of your website, or 'all' for all websites
 * @property {string} period - The period to request data for (day, week, month, year, range)
 * @property {string} date - The date string in YYYY-MM-DD format, or magic keywords (today, yesterday, lastWeek, lastMonth, lastYear)
 * @property {string} [segment] - Optional segment definition to filter the data
 * @property {string|number} [idGoal] - Optional goal ID to filter by
 * @property {string|string[]} [columns] - Optional columns to restrict the returned data
 * @property {boolean|string} [showAllGoalSpecificMetrics] - Whether to show all goal-specific metrics
 * @property {string} [compare] - Optional comparison parameters
 */
export interface GoalReportParams extends RequestParams {
  /** Site ID */
  idSite?: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
  /** Optional goal ID to filter by */
  idGoal?: string | number;
  /** Optional columns to restrict the returned data */
  columns?: string | string[];
  /** Optional flag to show all goal-specific metrics */
  showAllGoalSpecificMetrics?: boolean | string;
  /** Optional comparison parameters */
  compare?: string;
}

export class GoalsModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get a specific goal
   * Returns detailed information about a single goal, including its configuration and settings
   *
   * @param params Parameters for retrieving a specific goal
   * @returns Promise with the goal details
   */
  async getGoal(params: GetGoalParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.getGoal", params);
    }
    return await this.client.request("Goals.getGoal", params);
  }

  /**
   * Get all goals for a site
   * Returns a list of all goals configured for the site, including their basic information
   *
   * @param params Parameters for retrieving all goals
   * @returns Promise with the list of goals
   */
  async getGoals(params: GetGoalsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.getGoals", params);
    }
    return await this.client.request("Goals.getGoals", params);
  }

  /**
   * Add a new goal
   * Creates a new goal with the specified configuration and returns the created goal details
   *
   * @param params Parameters for adding a new goal
   * @returns Promise with the API response containing the new goal details
   */
  async addGoal(params: GoalDefinitionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.addGoal", params);
    }
    return await this.client.request("Goals.addGoal", params);
  }

  /**
   * Update an existing goal
   * Modifies the configuration of an existing goal and returns the updated goal details
   *
   * @param params Parameters for updating an existing goal
   * @returns Promise with the API response containing the updated goal details
   */
  async updateGoal(params: UpdateGoalParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.updateGoal", params);
    }
    return await this.client.request("Goals.updateGoal", params);
  }

  /**
   * Delete a goal
   * Removes a goal and all its associated data from the site
   *
   * @param params Parameters for deleting a goal
   * @returns Promise with the API response indicating success
   */
  async deleteGoal(params: GetGoalParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.deleteGoal", params);
    }
    return await this.client.request("Goals.deleteGoal", params);
  }

  /**
   * Get items by SKU (product codes)
   * Returns a report showing ecommerce items grouped by their SKU codes
   *
   * @param params Parameters for getting items by SKU
   * @returns Promise with the items grouped by SKU
   */
  async getItemsSku(params: ItemReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.getItemsSku", params);
    }
    return await this.client.request("Goals.getItemsSku", params);
  }

  /**
   * Get items by name (product names)
   * Returns a report showing ecommerce items grouped by their names
   *
   * @param params Parameters for getting items by name
   * @returns Promise with the items grouped by name
   */
  async getItemsName(params: ItemReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.getItemsName", params);
    }
    return await this.client.request("Goals.getItemsName", params);
  }

  /**
   * Get items by category (product categories)
   * Returns a report showing ecommerce items grouped by their categories
   *
   * @param params Parameters for getting items by category
   * @returns Promise with the items grouped by category
   */
  async getItemsCategory(params: ItemReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.getItemsCategory", params);
    }
    return await this.client.request("Goals.getItemsCategory", params);
  }

  /**
   * Get goal conversion metrics
   * Returns comprehensive metrics about goal conversions, including:
   * - Conversion rates
   * - Revenue
   * - Number of conversions
   * - Average order value
   *
   * @param params Parameters for getting goal conversion metrics
   * @returns Promise with the goal conversion metrics
   */
  async get(params: GoalReportParams): Promise<any> {
    const formattedParams = { ...params };

    // Handle array of columns if provided
    if (
      Array.isArray(formattedParams.columns) &&
      formattedParams.columns.length > 0
    ) {
      formattedParams.columns = formattedParams.columns.join(",");
    }

    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.get", formattedParams);
    }
    return await this.client.request("Goals.get", formattedParams);
  }

  /**
   * Get days to conversion report
   * Returns a report showing how many days it takes visitors to convert
   *
   * @param params Parameters for getting days to conversion report
   * @returns Promise with the days to conversion report
   */
  async getDaysToConversion(params: GoalReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.getDaysToConversion", params);
    }
    return await this.client.request("Goals.getDaysToConversion", params);
  }

  /**
   * Get visits until conversion report
   * Returns a report showing how many visits it takes visitors to convert
   *
   * @param params Parameters for getting visits until conversion report
   * @returns Promise with the visits until conversion report
   */
  async getVisitsUntilConversion(params: GoalReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.getVisitsUntilConversion", params);
    }
    return await this.client.request("Goals.getVisitsUntilConversion", params);
  }
}
