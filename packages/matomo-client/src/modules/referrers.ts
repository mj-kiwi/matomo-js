/**
 * Referrers API Module
 * 
 * The Referrers API provides comprehensive analytics about how visitors find your website, including:
 * - Search engines and keywords that led visitors to your site
 * - Websites that link to your content
 * - Social media platforms driving traffic
 * - Marketing campaigns and their performance
 * - Direct traffic and entry points
 * 
 * This data helps you understand your traffic sources, optimize marketing efforts, and improve SEO strategies.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for Referrers API methods
 * @property {number|string} [idSite] - The integer id of your website, or 'all' for all websites
 * @property {string} period - The period to request data for (day, week, month, year, range)
 * @property {string} date - The date string in YYYY-MM-DD format, or magic keywords (today, yesterday, lastWeek, lastMonth, lastYear)
 * @property {string} [segment] - Optional segment definition to filter the data
 */
export interface ReferrersParams extends RequestParams {
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
 * Parameters for methods supporting expanded and flat responses
 * @property {boolean} [expanded] - If true, returns additional details for each referrer
 * @property {boolean} [flat] - If true, returns data in a flattened format instead of nested
 */
export interface ReferrersExpandableParams extends ReferrersParams {
  /** Whether to include expanded data */
  expanded?: boolean;
  /** Whether to flatten nested data */
  flat?: boolean;
}

/**
 * Parameters for getting referrer type data
 * @property {string} [typeReferrer] - The type of referrer to filter by (e.g., 'search', 'website', 'campaign')
 * @property {number|string} [idSubtable] - The ID of the subtable to retrieve
 * @property {boolean} [expanded] - If true, returns additional details for each referrer
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
 * @property {number|string} idSubtable - The ID of the subtable to retrieve
 */
export interface ReferrersSubtableParams extends ReferrersParams {
  /** Subtable ID */
  idSubtable: number | string;
}

/**
 * Parameters for getting columns
 * @property {string} [columns] - Comma-separated list of columns to include in the response
 */
export interface ReferrersGetParams extends ReferrersParams {
  /** Columns to include in the response */
  columns?: string;
}

/**
 * Parameters for campaign methods
 * @property {boolean} [expanded] - If true, returns additional details for each campaign
 */
export interface ReferrersCampaignParams extends ReferrersParams {
  /** Whether to include expanded data */
  expanded?: boolean;
}

/**
 * Parameters for social URLs
 * @property {number|string} [idSubtable] - The ID of the subtable to retrieve
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
   * Returns a summary of all referrer types and their metrics, including:
   * - Total visits from each referrer type
   * - Conversion rates
   * - Time spent on site
   * - Bounce rates
   * 
   * @param params Parameters for getting referrer overview data
   * @returns Promise with the API response containing referrer overview metrics
   */
  async get(params: ReferrersGetParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.get", params);
    }
    return await this.core.request<any>("Referrers.get", params);
  }

  /**
   * Get referrer type data
   * Returns detailed information about a specific type of referrer, including:
   * - Individual referrer sources
   * - Visit metrics for each source
   * - Conversion data
   * - Engagement metrics
   * 
   * @param params Parameters for getting referrer type data
   * @returns Promise with the API response containing detailed referrer type metrics
   */
  async getReferrerType(params: ReferrerTypeParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getReferrerType", params);
    }
    return await this.core.request<any>("Referrers.getReferrerType", params);
  }

  /**
   * Get all referrers data
   * Returns comprehensive data about all referrer types, including:
   * - Search engines and keywords
   * - Referring websites
   * - Social media platforms
   * - Marketing campaigns
   * - Direct traffic
   * 
   * @param params Parameters for getting all referrers
   * @returns Promise with the API response containing all referrer data
   */
  async getAll(params: ReferrersExpandableParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getAll", params);
    }
    return await this.core.request<any>("Referrers.getAll", params);
  }

  /**
   * Get direct entry referrers data
   * Returns information about visitors who came directly to your site, including:
   * - Number of direct visits
   * - Entry pages
   * - Visit duration
   * - Conversion rates
   * 
   * @param params Parameters for getting direct entries
   * @returns Promise with the API response containing direct entry metrics
   */
  async getDirectEntry(params: ReferrersParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getDirectEntry", params);
    }
    return await this.core.request<any>("Referrers.getDirectEntry", params);
  }

  /**
   * Get search engines data
   * Returns detailed information about search engine traffic, including:
   * - Search engine names and market share
   * - Visit metrics per search engine
   * - Keyword performance
   * - Conversion data
   * 
   * @param params Parameters for getting search engines data
   * @returns Promise with the API response containing search engine metrics
   */
  async getSearchEngines(params: ReferrersExpandableParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getSearchEngines", params);
    }
    return await this.core.request<any>("Referrers.getSearchEngines", params);
  }

  /**
   * Get keywords for a search engine
   * Returns detailed information about keywords used in a specific search engine, including:
   * - Keyword phrases
   * - Number of visits per keyword
   * - Conversion rates
   * - Average position in search results
   * 
   * @param params Parameters for getting keywords from search engine
   * @returns Promise with the API response containing keyword metrics
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
    return await this.core.request<any>(
      "Referrers.getKeywordsFromSearchEngineId",
      params
    );
  }

  /**
   * Get campaigns
   * Returns information about marketing campaigns, including:
   * - Campaign names and sources
   * - Visit and conversion metrics
   * - ROI data
   * - Performance trends
   * 
   * @param params Parameters for getting campaigns
   * @returns Promise with the API response containing campaign metrics
   */
  async getCampaigns(params: ReferrersCampaignParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getCampaigns", params);
    }
    return await this.core.request<any>("Referrers.getCampaigns", params);
  }

  /**
   * Get keywords for a campaign
   * Returns detailed information about keywords used in a specific campaign, including:
   * - Keyword performance
   * - Click-through rates
   * - Conversion data
   * - Cost metrics
   * 
   * @param params Parameters for getting keywords from campaign
   * @returns Promise with the API response containing campaign keyword metrics
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
    return await this.core.request<any>(
      "Referrers.getKeywordsFromCampaignId",
      params
    );
  }

  /**
   * Get referring websites
   * Returns information about websites that link to your content, including:
   * - Domain names and URLs
   * - Number of visits from each site
   * - Conversion rates
   * - Content popularity
   * 
   * @param params Parameters for getting websites
   * @returns Promise with the API response containing referring website metrics
   */
  async getWebsites(params: ReferrersExpandableParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getWebsites", params);
    }
    return await this.core.request<any>("Referrers.getWebsites", params);
  }

  /**
   * Get URLs for a website referrer
   * Returns detailed information about specific URLs from a referring website, including:
   * - Exact page URLs
   * - Visit metrics per URL
   * - Content engagement
   * - Conversion paths
   * 
   * @param params Parameters for getting URLs from website
   * @returns Promise with the API response containing referring URL metrics
   */
  async getUrlsFromWebsiteId(params: ReferrersSubtableParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getUrlsFromWebsiteId", params);
    }
    return await this.core.request<any>(
      "Referrers.getUrlsFromWebsiteId",
      params
    );
  }

  /**
   * Get social network referrers
   * Returns information about social media traffic, including:
   * - Social platform names
   * - Visit and engagement metrics
   * - Content sharing patterns
   * - Conversion rates
   * 
   * @param params Parameters for getting social referrers
   * @returns Promise with the API response containing social media metrics
   */
  async getSocials(params: ReferrersExpandableParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getSocials", params);
    }
    return await this.core.request<any>("Referrers.getSocials", params);
  }

  /**
   * Get URLs for a social network referrer
   * Returns detailed information about URLs shared on a specific social platform, including:
   * - Shared content URLs
   * - Engagement metrics
   * - Sharing patterns
   * - Conversion data
   * 
   * @param params Parameters for getting URLs from social network
   * @returns Promise with the API response containing social URL metrics
   */
  async getUrlsForSocial(params: SocialUrlParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("Referrers.getUrlsForSocial", params);
    }
    return await this.core.request<any>("Referrers.getUrlsForSocial", params);
  }

  /**
   * Get number of distinct search engines
   * Returns the count of unique search engines that sent traffic to your site
   * 
   * @param params Parameters for getting number of search engines
   * @returns Promise with the API response containing the count of distinct search engines
   */
  async getNumberOfSearchEngines(params: ReferrersParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "Referrers.getNumberOfDistinctSearchEngines",
        params
      );
    }
    return await this.core.request<any>(
      "Referrers.getNumberOfDistinctSearchEngines",
      params
    );
  }

  /**
   * Get number of distinct keywords
   * Returns the count of unique keywords that led visitors to your site
   * 
   * @param params Parameters for getting number of keywords
   * @returns Promise with the API response containing the count of distinct keywords
   */
  async getNumberOfKeywords(params: ReferrersParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "Referrers.getNumberOfDistinctKeywords",
        params
      );
    }
    return await this.core.request<any>(
      "Referrers.getNumberOfDistinctKeywords",
      params
    );
  }

  /**
   * Get number of distinct campaigns
   * Returns the count of unique marketing campaigns that generated traffic
   * 
   * @param params Parameters for getting number of campaigns
   * @returns Promise with the API response containing the count of distinct campaigns
   */
  async getNumberOfCampaigns(params: ReferrersParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "Referrers.getNumberOfDistinctCampaigns",
        params
      );
    }
    return await this.core.request<any>(
      "Referrers.getNumberOfDistinctCampaigns",
      params
    );
  }

  /**
   * Get number of distinct websites
   * Returns the count of unique websites that referred traffic to your site
   * 
   * @param params Parameters for getting number of websites
   * @returns Promise with the API response containing the count of distinct websites
   */
  async getNumberOfWebsites(params: ReferrersParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "Referrers.getNumberOfDistinctWebsites",
        params
      );
    }
    return await this.core.request<any>(
      "Referrers.getNumberOfDistinctWebsites",
      params
    );
  }

  /**
   * Get number of distinct website URLs
   * Returns the count of unique URLs that referred traffic to your site
   * 
   * @param params Parameters for getting number of website URLs
   * @returns Promise with the API response containing the count of distinct website URLs
   */
  async getNumberOfWebsiteUrls(params: ReferrersParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "Referrers.getNumberOfDistinctWebsitesUrls",
        params
      );
    }
    return await this.core.request<any>(
      "Referrers.getNumberOfDistinctWebsitesUrls",
      params
    );
  }
}
