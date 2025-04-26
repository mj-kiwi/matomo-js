/**
 * Matomo Funnels Module
 *
 * API for the Funnels plugin which lets you create, manage, and analyze conversion funnels.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for funnel reporting methods
 */
export interface FunnelReportParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional funnel ID to filter by */
  idFunnel?: string | number;
  /** Optional goal ID to filter by */
  idGoal?: string | number;
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for funnel step subtable
 */
export interface FunnelStepSubtableParams extends FunnelReportParams {
  /** Step position in the funnel */
  stepPosition: number | string;
}

/**
 * Parameters for funnel entries
 */
export interface FunnelEntriesParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Funnel ID */
  idFunnel: number | string;
  /** Optional segment definition */
  segment?: string;
  /** Optional step filter */
  step?: string | number;
  /** Optional expanded flag */
  expanded?: string | boolean;
  /** Optional subtable ID */
  idSubtable?: string | number;
  /** Optional flat report flag */
  flat?: string | boolean;
}

/**
 * Parameters for funnel exits
 */
export interface FunnelExitsParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Funnel ID */
  idFunnel: number | string;
  /** Optional segment definition */
  segment?: string;
  /** Optional step filter */
  step?: string | number;
}

/**
 * Parameters for site and ID operations
 */
export interface SiteIdParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
}

/**
 * Parameters for goal funnel operations
 */
export interface GoalFunnelParams extends SiteIdParams {
  /** Goal ID */
  idGoal: number | string;
}

/**
 * Parameters for funnel operations
 */
export interface FunnelParams extends SiteIdParams {
  /** Funnel ID */
  idFunnel: number | string;
}

/**
 * Parameters for setting a goal funnel
 */
export interface SetGoalFunnelParams extends GoalFunnelParams {
  /** Whether the funnel is activated */
  isActivated: boolean;
  /** Array of funnel steps */
  steps: any[];
}

/**
 * Parameters for saving a non-goal funnel
 */
export interface SaveNonGoalFunnelParams extends FunnelParams {
  /** Name of the funnel */
  funnelName: string;
  /** Array of funnel steps */
  steps: any[];
}

/**
 * Parameters for testing URL matches
 */
export interface TestUrlMatchesStepsParams extends RequestParams {
  /** URL to test */
  url: string;
  /** Array of funnel steps */
  steps: any[];
}

export class FunnelsModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get funnel metrics
   *
   * @param params Parameters for funnel report
   * @returns Promise with the funnel metrics
   */
  async getMetrics(params: FunnelReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Funnels.getMetrics", params);
    }
    return await this.client.request("Funnels.getMetrics", params);
  }

  /**
   * Get funnel flow visualization data
   *
   * @param params Parameters for funnel report
   * @returns Promise with the funnel flow data for visualization
   */
  async getFunnelFlow(params: FunnelReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Funnels.getFunnelFlow", params);
    }
    return await this.client.request("Funnels.getFunnelFlow", params);
  }

  /**
   * Get funnel flow as table data
   *
   * @param params Parameters for funnel report
   * @returns Promise with the funnel flow data in table format
   */
  async getFunnelFlowTable(params: FunnelReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Funnels.getFunnelFlowTable", params);
    }
    return await this.client.request("Funnels.getFunnelFlowTable", params);
  }

  /**
   * Get funnel step subtable
   *
   * @param params Parameters for funnel step subtable
   * @returns Promise with the funnel step subtable data
   */
  async getFunnelStepSubtable(params: FunnelStepSubtableParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Funnels.getFunnelStepSubtable", params);
    }
    return await this.client.request("Funnels.getFunnelStepSubtable", params);
  }

  /**
   * Get funnel entries
   *
   * @param params Parameters for funnel entries
   * @returns Promise with the funnel entries data
   */
  async getFunnelEntries(params: FunnelEntriesParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Funnels.getFunnelEntries", params);
    }
    return await this.client.request("Funnels.getFunnelEntries", params);
  }

  /**
   * Get funnel exits
   *
   * @param params Parameters for funnel exits
   * @returns Promise with the funnel exits data
   */
  async getFunnelExits(params: FunnelExitsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Funnels.getFunnelExits", params);
    }
    return await this.client.request("Funnels.getFunnelExits", params);
  }

  /**
   * Get funnel for a specific goal
   *
   * @param params Parameters for goal funnel
   * @returns Promise with the goal funnel configuration
   */
  async getGoalFunnel(params: GoalFunnelParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Funnels.getGoalFunnel", params);
    }
    return await this.client.request("Funnels.getGoalFunnel", params);
  }

  /**
   * Get sales funnel for a site
   *
   * @param params Parameters with site ID
   * @returns Promise with the sales funnel data
   */
  async getSalesFunnelForSite(params: SiteIdParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Funnels.getSalesFunnelForSite", params);
    }
    return await this.client.request("Funnels.getSalesFunnelForSite", params);
  }

  /**
   * Get a specific funnel
   *
   * @param params Parameters for funnel
   * @returns Promise with the funnel configuration
   */
  async getFunnel(params: FunnelParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Funnels.getFunnel", params);
    }
    return await this.client.request("Funnels.getFunnel", params);
  }

  /**
   * Get all activated funnels for a site
   *
   * @param params Parameters with site ID
   * @returns Promise with the list of activated funnels
   */
  async getAllActivatedFunnelsForSite(params: SiteIdParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "Funnels.getAllActivatedFunnelsForSite",
        params
      );
    }
    return await this.client.request(
      "Funnels.getAllActivatedFunnelsForSite",
      params
    );
  }

  /**
   * Check if site has any activated funnels
   *
   * @param params Parameters with site ID
   * @returns Promise with boolean result
   */
  async hasAnyActivatedFunnelForSite(params: SiteIdParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "Funnels.hasAnyActivatedFunnelForSite",
        params
      );
    }
    return await this.client.request(
      "Funnels.hasAnyActivatedFunnelForSite",
      params
    );
  }

  /**
   * Delete a goal funnel
   *
   * @param params Parameters for goal funnel
   * @returns Promise with the API response
   */
  async deleteGoalFunnel(params: GoalFunnelParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Funnels.deleteGoalFunnel", params);
    }
    return await this.client.request("Funnels.deleteGoalFunnel", params);
  }

  /**
   * Delete a non-goal funnel
   *
   * @param params Parameters for funnel
   * @returns Promise with the API response
   */
  async deleteNonGoalFunnel(params: FunnelParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Funnels.deleteNonGoalFunnel", params);
    }
    return await this.client.request("Funnels.deleteNonGoalFunnel", params);
  }

  /**
   * Set a goal funnel configuration
   *
   * @param params Parameters for setting a goal funnel
   * @returns Promise with the API response
   */
  async setGoalFunnel(params: SetGoalFunnelParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Funnels.setGoalFunnel", params);
    }
    return await this.client.request("Funnels.setGoalFunnel", params);
  }

  /**
   * Save a non-goal funnel
   *
   * @param params Parameters for saving a non-goal funnel
   * @returns Promise with the API response
   */
  async saveNonGoalFunnel(params: SaveNonGoalFunnelParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Funnels.saveNonGoalFunnel", params);
    }
    return await this.client.request("Funnels.saveNonGoalFunnel", params);
  }

  /**
   * Get available pattern matching methods for funnels
   *
   * @returns Promise with the list of available pattern matches
   */
  async getAvailablePatternMatches(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Funnels.getAvailablePatternMatches", {});
    }
    return await this.client.request("Funnels.getAvailablePatternMatches");
  }

  /**
   * Test if a URL matches the funnel steps
   *
   * @param params Parameters for testing URL matches
   * @returns Promise with the matching results
   */
  async testUrlMatchesSteps(params: TestUrlMatchesStepsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Funnels.testUrlMatchesSteps", params);
    }
    return await this.client.request("Funnels.testUrlMatchesSteps", params);
  }
}
