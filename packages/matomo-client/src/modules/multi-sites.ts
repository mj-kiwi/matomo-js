/**
 * MultiSites API Module
 * Lets you request key metrics (visits, page views, revenue) for all Websites in Matomo
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for MultiSites API methods
 */
export interface MultiSitesParams extends RequestParams {
  /** The period to analyze */
  period?: string;
  /** The date to analyze */
  date?: string;
  /** Segment to apply */
  segment?: string;
}

/**
 * Parameters for getting metrics for all sites
 */
export interface GetAllParams extends MultiSitesParams {
  /** Whether to include enhanced metrics */
  enhanced?: boolean;
  /** Pattern to filter sites by */
  pattern?: string;
  /** Columns to include in the response */
  showColumns?: string[];
}

/**
 * Parameters for getting metrics for a specific site
 */
export interface GetOneParams extends MultiSitesParams {
  /** The ID of the site */
  idSite: number | string;
  /** Whether to include enhanced metrics */
  enhanced?: boolean;
}

/**
 * Parameters for getting metrics for all sites grouped by site groups
 */
export interface GetAllWithGroupsParams extends MultiSitesParams {
  /** Pattern to filter sites by */
  pattern?: string;
  /** Limit the number of results */
  filter_limit?: number;
}

export class MultiSitesModule {
  /**
   * @param core Core reporting client instance or batch request
   */
  constructor(private core: CoreReportingClient | BatchRequest) {}

  /**
   * Get metrics for all sites
   *
   * @param params Parameters for getting metrics for all sites
   */
  async getAll(params: GetAllParams): Promise<any[] | BatchRequest> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("MultiSites.getAll", params);
    }
    return await this.core.request<any[]>("MultiSites.getAll", params);
  }

  /**
   * Get metrics for a specific site
   *
   * @param params Parameters for getting metrics for a specific site
   */
  async getOne(params: GetOneParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("MultiSites.getOne", params);
    }
    return await this.core.request<any>("MultiSites.getOne", params);
  }

  /**
   * Get metrics for all sites grouped by site groups
   *
   * @param params Parameters for getting metrics for all sites grouped by site groups
   */
  async getAllWithGroups(
    params: GetAllWithGroupsParams = {}
  ): Promise<any[] | BatchRequest> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("MultiSites.getAllWithGroups", params);
    }
    return await this.core.request<any[]>(
      "MultiSites.getAllWithGroups",
      params
    );
  }
}
