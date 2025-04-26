/**
 * Referrers API Module
 * Provides access to reports about Websites, Search engines, Keywords, and Campaigns
 * used to access your website.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for Referrers API methods
 */
export interface ReferrersParams extends RequestParams {
  /** The ID of the site */
  idSite: number | string;
  /** The period to analyze */
  period: string;
  /** The date to analyze */
  date: string;
  /** Segment to apply */
  segment?: string;
}

/**
 * Parameters for methods supporting expanded and flat responses
 */
export interface ReferrersExpandableParams extends ReferrersParams {
  /** Whether to include expanded data */
  expanded?: boolean;
  /** Whether to flatten nested data */
  flat?: boolean;
}

/**
 * Parameters for getting referrer type
 */
export interface ReferrerTypeParams extends ReferrersParams {
  /** Type of referrer */
  typeReferrer?: string;
  /** Subtable ID */
  idSubtable?: number | string;
  /** Whether to include expanded data */
  expanded?: boolean;
}

/**
 * Parameters for subtable methods
 */
export interface ReferrersSubtableParams extends ReferrersParams {
  /** Subtable ID */
  idSubtable: number | string;
}

/**
 * Parameters for getting columns
 */
export interface ReferrersGetParams extends ReferrersParams {
  /** Columns to include in the response */
  columns?: string;
}

/**
 * Parameters for campaign methods
 */
export interface ReferrersCampaignParams extends ReferrersParams {
  /** Whether to include expanded data */
  expanded?: boolean;
}

/**
 * Parameters for social URLs
 */
export interface SocialUrlParams extends ReferrersParams {
  /** Subtable ID */
  idSubtable?: number | string;
}

export class ReferrersModule {
  /**
   * @param core Core reporting client instance or batch request
   */
  constructor(private core: CoreReportingClient | BatchRequest) {}

  /**
   * Get referrers overview data
   *
   * @param params Parameters for getting referrer overview data
   */
  async get(params: ReferrersGetParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.get", params);
    }
    return this.core.request<any>("Referrers.get", params);
  }

  /**
   * Get referrer type data
   *
   * @param params Parameters for getting referrer type data
   */
  async getReferrerType(params: ReferrerTypeParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getReferrerType", params);
    }
    return this.core.request<any>("Referrers.getReferrerType", params);
  }

  /**
   * Get all referrers data
   *
   * @param params Parameters for getting all referrers
   */
  async getAll(params: ReferrersExpandableParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getAll", params);
    }
    return this.core.request<any>("Referrers.getAll", params);
  }

  /**
   * Get direct entry referrers data
   *
   * @param params Parameters for getting direct entries
   */
  async getDirectEntry(params: ReferrersParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getDirectEntry", params);
    }
    return this.core.request<any>("Referrers.getDirectEntry", params);
  }

  /**
   * Get search engines data
   *
   * @param params Parameters for getting search engines data
   */
  async getSearchEngines(params: ReferrersExpandableParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getSearchEngines", params);
    }
    return this.core.request<any>("Referrers.getSearchEngines", params);
  }

  /**
   * Get keywords for a search engine
   *
   * @param params Parameters for getting keywords from search engine
   */
  async getKeywordsFromSearchEngineId(
    params: ReferrersSubtableParams
  ): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "Referrers.getKeywordsFromSearchEngineId",
        params
      );
    }
    return this.core.request<any>(
      "Referrers.getKeywordsFromSearchEngineId",
      params
    );
  }

  /**
   * Get campaigns
   *
   * @param params Parameters for getting campaigns
   */
  async getCampaigns(params: ReferrersCampaignParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getCampaigns", params);
    }
    return this.core.request<any>("Referrers.getCampaigns", params);
  }

  /**
   * Get keywords for a campaign
   *
   * @param params Parameters for getting keywords from campaign
   */
  async getKeywordsFromCampaignId(
    params: ReferrersSubtableParams
  ): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "Referrers.getKeywordsFromCampaignId",
        params
      );
    }
    return this.core.request<any>(
      "Referrers.getKeywordsFromCampaignId",
      params
    );
  }

  /**
   * Get referring websites
   *
   * @param params Parameters for getting websites
   */
  async getWebsites(params: ReferrersExpandableParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getWebsites", params);
    }
    return this.core.request<any>("Referrers.getWebsites", params);
  }

  /**
   * Get URLs for a website referrer
   *
   * @param params Parameters for getting URLs from website
   */
  async getUrlsFromWebsiteId(params: ReferrersSubtableParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getUrlsFromWebsiteId", params);
    }
    return this.core.request<any>("Referrers.getUrlsFromWebsiteId", params);
  }

  /**
   * Get social network referrers
   *
   * @param params Parameters for getting social referrers
   */
  async getSocials(params: ReferrersExpandableParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getSocials", params);
    }
    return this.core.request<any>("Referrers.getSocials", params);
  }

  /**
   * Get URLs for a social network referrer
   *
   * @param params Parameters for getting URLs from social network
   */
  async getUrlsForSocial(params: SocialUrlParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getUrlsForSocial", params);
    }
    return this.core.request<any>("Referrers.getUrlsForSocial", params);
  }

  /**
   * Get number of distinct search engines
   *
   * @param params Parameters for getting number of search engines
   */
  async getNumberOfSearchEngines(params: ReferrersParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "Referrers.getNumberOfDistinctSearchEngines",
        params
      );
    }
    return this.core.request<any>(
      "Referrers.getNumberOfDistinctSearchEngines",
      params
    );
  }

  /**
   * Get number of distinct keywords
   *
   * @param params Parameters for getting number of keywords
   */
  async getNumberOfKeywords(params: ReferrersParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "Referrers.getNumberOfDistinctKeywords",
        params
      );
    }
    return this.core.request<any>(
      "Referrers.getNumberOfDistinctKeywords",
      params
    );
  }

  /**
   * Get number of distinct campaigns
   *
   * @param params Parameters for getting number of campaigns
   */
  async getNumberOfCampaigns(params: ReferrersParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "Referrers.getNumberOfDistinctCampaigns",
        params
      );
    }
    return this.core.request<any>(
      "Referrers.getNumberOfDistinctCampaigns",
      params
    );
  }

  /**
   * Get number of distinct websites
   *
   * @param params Parameters for getting number of websites
   */
  async getNumberOfWebsites(params: ReferrersParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "Referrers.getNumberOfDistinctWebsites",
        params
      );
    }
    return this.core.request<any>(
      "Referrers.getNumberOfDistinctWebsites",
      params
    );
  }

  /**
   * Get number of distinct website URLs
   *
   * @param params Parameters for getting number of website URLs
   */
  async getNumberOfWebsiteUrls(params: ReferrersParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "Referrers.getNumberOfDistinctWebsitesUrls",
        params
      );
    }
    return this.core.request<any>(
      "Referrers.getNumberOfDistinctWebsitesUrls",
      params
    );
  }
}
