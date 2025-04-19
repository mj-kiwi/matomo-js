/**
 * Matomo MarketingCampaignsReporting Module
 * API for plugin MarketingCampaignsReporting providing access to campaign data
 */

import { CoreReportingClient, RequestParams } from "./core.js";

/**
 * Basic marketing campaign report parameters
 */
export interface MarketingCampaignParams extends RequestParams {
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
 * Extended marketing campaign report parameters with expanded and flat options
 */
export interface ExtendedMarketingCampaignParams
  extends MarketingCampaignParams {
  /** Whether to expand the campaign names */
  expanded?: string | boolean;
  /** Whether to return a flattened report */
  flat?: string | boolean;
}

/**
 * Subtable marketing campaign report parameters
 */
export interface SubtableMarketingCampaignParams
  extends MarketingCampaignParams {
  /** Subtable ID */
  idSubtable: string | number;
}

export class MarketingCampaignsReportingModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get campaign IDs
   *
   * @param params Parameters for campaign report
   */
  async getId(params: MarketingCampaignParams): Promise<any> {
    return this.client.request("MarketingCampaignsReporting.getId", params);
  }

  /**
   * Get campaign names
   *
   * @param params Parameters for campaign report
   */
  async getName(params: ExtendedMarketingCampaignParams): Promise<any> {
    return this.client.request("MarketingCampaignsReporting.getName", params);
  }

  /**
   * Get keyword content from name ID
   *
   * @param params Parameters for subtable campaign report
   */
  async getKeywordContentFromNameId(
    params: SubtableMarketingCampaignParams
  ): Promise<any> {
    return this.client.request(
      "MarketingCampaignsReporting.getKeywordContentFromNameId",
      params
    );
  }

  /**
   * Get campaign keywords
   *
   * @param params Parameters for campaign report
   */
  async getKeyword(params: MarketingCampaignParams): Promise<any> {
    return this.client.request(
      "MarketingCampaignsReporting.getKeyword",
      params
    );
  }

  /**
   * Get campaign sources
   *
   * @param params Parameters for campaign report
   */
  async getSource(params: MarketingCampaignParams): Promise<any> {
    return this.client.request("MarketingCampaignsReporting.getSource", params);
  }

  /**
   * Get campaign mediums
   *
   * @param params Parameters for campaign report
   */
  async getMedium(params: MarketingCampaignParams): Promise<any> {
    return this.client.request("MarketingCampaignsReporting.getMedium", params);
  }

  /**
   * Get campaign content
   *
   * @param params Parameters for campaign report
   */
  async getContent(params: MarketingCampaignParams): Promise<any> {
    return this.client.request(
      "MarketingCampaignsReporting.getContent",
      params
    );
  }

  /**
   * Get campaign group
   *
   * @param params Parameters for campaign report
   */
  async getGroup(params: MarketingCampaignParams): Promise<any> {
    return this.client.request("MarketingCampaignsReporting.getGroup", params);
  }

  /**
   * Get campaign placement
   *
   * @param params Parameters for campaign report
   */
  async getPlacement(params: MarketingCampaignParams): Promise<any> {
    return this.client.request(
      "MarketingCampaignsReporting.getPlacement",
      params
    );
  }

  /**
   * Get campaign source/medium combinations
   *
   * @param params Parameters for campaign report
   */
  async getSourceMedium(params: ExtendedMarketingCampaignParams): Promise<any> {
    return this.client.request(
      "MarketingCampaignsReporting.getSourceMedium",
      params
    );
  }

  /**
   * Get campaign names from source/medium ID
   *
   * @param params Parameters for subtable campaign report
   */
  async getNameFromSourceMediumId(
    params: SubtableMarketingCampaignParams
  ): Promise<any> {
    return this.client.request(
      "MarketingCampaignsReporting.getNameFromSourceMediumId",
      params
    );
  }
}
