/**
 * Multi Channel Conversion Attribution API Module
 * Supports attribution analysis for conversions across multiple channels
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class MultiChannelConversionAttributionModule {
  /**
   * @param core Core reporting client instance
   */
  constructor(private core: CoreReportingClient) {}

  /**
   * Set goal attribution for a specific site and goal
   *
   * @param idSite The ID of the site
   * @param idGoal The ID of the goal
   * @param isEnabled Whether to enable attribution for this goal
   */
  async setGoalAttribution(
    idSite: number | string,
    idGoal: number | string,
    isEnabled: boolean
  ): Promise<boolean> {
    return this.core.request<boolean>(
      'MultiChannelConversionAttribution.setGoalAttribution',
      {
        idSite,
        idGoal,
        isEnabled,
      }
    );
  }

  /**
   * Get goal attribution status for a specific site and goal
   *
   * @param idSite The ID of the site
   * @param idGoal The ID of the goal
   */
  async getGoalAttribution(
    idSite: number | string,
    idGoal: number | string
  ): Promise<boolean> {
    return this.core.request<boolean>(
      'MultiChannelConversionAttribution.getGoalAttribution',
      {
        idSite,
        idGoal,
      }
    );
  }

  /**
   * Get channel attribution data for a specific site, period, date and goal
   *
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param idGoal The ID of the goal
   * @param idCampaignDimensionCombination Campaign dimension combination ID
   * @param segment Segment to apply
   * @param expanded Whether to retrieve expanded data
   * @param flat Whether to return flat data
   * @param idSubtable ID of the subtable
   */
  async getChannelAttribution(
    idSite: number | string,
    period: string,
    date: string,
    idGoal: number | string,
    idCampaignDimensionCombination: string = '0',
    segment: string = '',
    expanded: string = '',
    flat: string = '',
    idSubtable: string = ''
  ): Promise<any> {
    return this.core.request(
      'MultiChannelConversionAttribution.getChannelAttribution',
      {
        idSite,
        period,
        date,
        idGoal,
        idCampaignDimensionCombination,
        segment,
        expanded,
        flat,
        idSubtable,
      }
    );
  }

  /**
   * Get available campaign dimension combinations
   */
  async getAvailableCampaignDimensionCombinations(): Promise<any[]> {
    return this.core.request<any[]>(
      'MultiChannelConversionAttribution.getAvailableCampaignDimensionCombinations'
    );
  }

  /**
   * Get site attribution goals
   *
   * @param idSite The ID of the site
   */
  async getSiteAttributionGoals(idSite: number | string): Promise<any[]> {
    return this.core.request<any[]>(
      'MultiChannelConversionAttribution.getSiteAttributionGoals',
      {
        idSite,
      }
    );
  }
}
