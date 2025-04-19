/**
 * Multi Channel Conversion Attribution API Module
 * Supports attribution analysis for conversions across multiple channels
 */

import { CoreReportingClient, RequestParams } from "./core.js";

/**
 * Parameters for site-specific operations
 */
export interface SiteParams extends RequestParams {
  /** The ID of the site */
  idSite: number | string;
}

/**
 * Parameters for goal attribution operations
 */
export interface GoalAttributionParams extends SiteParams {
  /** The ID of the goal */
  idGoal: number | string;
}

/**
 * Parameters for setting goal attribution
 */
export interface SetGoalAttributionParams extends GoalAttributionParams {
  /** Whether to enable attribution for this goal */
  isEnabled: boolean;
}

/**
 * Parameters for channel attribution data
 */
export interface ChannelAttributionParams extends GoalAttributionParams {
  /** The period to analyze */
  period: string;
  /** The date to analyze */
  date: string;
  /** Campaign dimension combination ID */
  idCampaignDimensionCombination?: string;
  /** Segment to apply */
  segment?: string;
  /** Whether to retrieve expanded data */
  expanded?: string;
  /** Whether to return flat data */
  flat?: string;
  /** ID of the subtable */
  idSubtable?: string;
}

export class MultiChannelConversionAttributionModule {
  /**
   * @param core Core reporting client instance
   */
  constructor(private core: CoreReportingClient) {}

  /**
   * Set goal attribution for a specific site and goal
   *
   * @param params Parameters for setting goal attribution
   */
  async setGoalAttribution(params: SetGoalAttributionParams): Promise<boolean> {
    return this.core.request<boolean>(
      "MultiChannelConversionAttribution.setGoalAttribution",
      params
    );
  }

  /**
   * Get goal attribution status for a specific site and goal
   *
   * @param params Parameters for goal attribution
   */
  async getGoalAttribution(params: GoalAttributionParams): Promise<boolean> {
    return this.core.request<boolean>(
      "MultiChannelConversionAttribution.getGoalAttribution",
      params
    );
  }

  /**
   * Get channel attribution data for a specific site, period, date and goal
   *
   * @param params Parameters for channel attribution data
   */
  async getChannelAttribution(params: ChannelAttributionParams): Promise<any> {
    return this.core.request(
      "MultiChannelConversionAttribution.getChannelAttribution",
      params
    );
  }

  /**
   * Get available campaign dimension combinations
   */
  async getAvailableCampaignDimensionCombinations(): Promise<any[]> {
    return this.core.request<any[]>(
      "MultiChannelConversionAttribution.getAvailableCampaignDimensionCombinations"
    );
  }

  /**
   * Get site attribution goals
   *
   * @param params Parameters containing the site ID
   */
  async getSiteAttributionGoals(params: SiteParams): Promise<any[]> {
    return this.core.request<any[]>(
      "MultiChannelConversionAttribution.getSiteAttributionGoals",
      params
    );
  }
}
