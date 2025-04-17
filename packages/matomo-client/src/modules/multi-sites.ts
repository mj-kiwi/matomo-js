/**
 * MultiSites API Module
 * Lets you request key metrics (visits, page views, revenue) for all Websites in Matomo
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class MultiSitesModule {
  /**
   * @param core Core reporting client instance
   */
  constructor(private core: CoreReportingClient) {}

  /**
   * Get metrics for all sites
   *
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   * @param enhanced Whether to include enhanced metrics
   * @param pattern Pattern to filter sites by
   * @param showColumns Columns to include in the response
   */
  async getAll(
    period: string,
    date: string,
    segment?: string,
    enhanced: boolean = false,
    pattern?: string,
    showColumns: string[] = []
  ): Promise<any[]> {
    return this.core.request<any[]>('MultiSites.getAll', {
      period,
      date,
      segment,
      enhanced,
      pattern,
      showColumns,
    });
  }

  /**
   * Get metrics for a specific site
   *
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   * @param enhanced Whether to include enhanced metrics
   */
  async getOne(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string,
    enhanced: boolean = false
  ): Promise<any> {
    return this.core.request<any>('MultiSites.getOne', {
      idSite,
      period,
      date,
      segment,
      enhanced,
    });
  }

  /**
   * Get metrics for all sites grouped by site groups
   *
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   * @param pattern Pattern to filter sites by
   * @param filter_limit Limit the number of results
   */
  async getAllWithGroups(
    period?: string,
    date?: string,
    segment?: string,
    pattern: string = '',
    filter_limit: number = 0
  ): Promise<any[]> {
    return this.core.request<any[]>('MultiSites.getAllWithGroups', {
      period,
      date,
      segment,
      pattern,
      filter_limit,
    });
  }
}
