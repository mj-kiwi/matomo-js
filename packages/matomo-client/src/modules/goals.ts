/**
 * Matomo Goals Module
 *
 * The Goals API lets you manage existing goals, create new goals, and access goal metrics
 * including ecommerce orders and abandoned carts data.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for Goals API methods
 */
export interface GoalParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
}

/**
 * Parameters for retrieving a specific goal
 */
export interface GetGoalParams extends GoalParams {
  /** Goal ID */
  idGoal: number | string;
}

/**
 * Parameters for retrieving all goals
 */
export interface GetGoalsParams extends GoalParams {
  /** Optional flag to order goals by name */
  orderByName?: boolean;
}

/**
 * Parameters for adding or updating a goal
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
 */
export interface UpdateGoalParams extends GoalDefinitionParams {
  /** Goal ID */
  idGoal: number | string;
}

/**
 * Common parameters for ecommerce item reports
 */
export interface ItemReportParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
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
 */
export interface GoalReportParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
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
   *
   * @param params Parameters for retrieving a specific goal
   * @returns Promise with the goal details
   */
  async getGoal(params: GetGoalParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.getGoal", params);
    }
    return this.client.request("Goals.getGoal", params);
  }

  /**
   * Get all goals for a site
   *
   * @param params Parameters for retrieving all goals
   * @returns Promise with the list of goals
   */
  async getGoals(params: GetGoalsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.getGoals", params);
    }
    return this.client.request("Goals.getGoals", params);
  }

  /**
   * Add a new goal
   *
   * @param params Parameters for adding a new goal
   * @returns Promise with the API response
   */
  async addGoal(params: GoalDefinitionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.addGoal", params);
    }
    return this.client.request("Goals.addGoal", params);
  }

  /**
   * Update an existing goal
   *
   * @param params Parameters for updating an existing goal
   * @returns Promise with the API response
   */
  async updateGoal(params: UpdateGoalParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.updateGoal", params);
    }
    return this.client.request("Goals.updateGoal", params);
  }

  /**
   * Delete a goal
   *
   * @param params Parameters for deleting a goal
   * @returns Promise with the API response
   */
  async deleteGoal(params: GetGoalParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.deleteGoal", params);
    }
    return this.client.request("Goals.deleteGoal", params);
  }

  /**
   * Get items by SKU (product codes)
   *
   * @param params Parameters for getting items by SKU
   * @returns Promise with the items grouped by SKU
   */
  async getItemsSku(params: ItemReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.getItemsSku", params);
    }
    return this.client.request("Goals.getItemsSku", params);
  }

  /**
   * Get items by name (product names)
   *
   * @param params Parameters for getting items by name
   * @returns Promise with the items grouped by name
   */
  async getItemsName(params: ItemReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.getItemsName", params);
    }
    return this.client.request("Goals.getItemsName", params);
  }

  /**
   * Get items by category (product categories)
   *
   * @param params Parameters for getting items by category
   * @returns Promise with the items grouped by category
   */
  async getItemsCategory(params: ItemReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.getItemsCategory", params);
    }
    return this.client.request("Goals.getItemsCategory", params);
  }

  /**
   * Get goal conversion metrics
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
    return this.client.request("Goals.get", formattedParams);
  }

  /**
   * Get days to conversion report
   *
   * @param params Parameters for getting days to conversion report
   * @returns Promise with the days to conversion report
   */
  async getDaysToConversion(params: GoalReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.getDaysToConversion", params);
    }
    return this.client.request("Goals.getDaysToConversion", params);
  }

  /**
   * Get visits until conversion report
   *
   * @param params Parameters for getting visits until conversion report
   * @returns Promise with the visits until conversion report
   */
  async getVisitsUntilConversion(params: GoalReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Goals.getVisitsUntilConversion", params);
    }
    return this.client.request("Goals.getVisitsUntilConversion", params);
  }
}
