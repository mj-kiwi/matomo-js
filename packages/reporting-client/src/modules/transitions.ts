/**
 * Matomo Transitions Module
 * API for analyzing the navigation paths between pages
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class TransitionsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get transitions for a page title
   * 
   * @param pageTitle The page title to analyze
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param limitBeforeGrouping Maximum number of rows to return before grouping
   */
  async getTransitionsForPageTitle(
    pageTitle: string,
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    limitBeforeGrouping: string | number = '0'
  ): Promise<any> {
    const params: RequestParams = {
      pageTitle,
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (limitBeforeGrouping !== '0') params.limitBeforeGrouping = limitBeforeGrouping;

    return this.client.request('Transitions.getTransitionsForPageTitle', params);
  }

  /**
   * Get transitions for a page URL
   * 
   * @param pageUrl The URL of the page to analyze
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param limitBeforeGrouping Maximum number of rows to return before grouping
   */
  async getTransitionsForPageUrl(
    pageUrl: string,
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    limitBeforeGrouping: string | number = '0'
  ): Promise<any> {
    const params: RequestParams = {
      pageUrl,
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (limitBeforeGrouping !== '0') params.limitBeforeGrouping = limitBeforeGrouping;

    return this.client.request('Transitions.getTransitionsForPageUrl', params);
  }

  /**
   * Get transitions for a specific action
   * 
   * @param actionName The name of the action
   * @param actionType The type of the action
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param limitBeforeGrouping Maximum number of rows to return before grouping
   * @param parts Which parts of the report to fetch ('all' for everything)
   */
  async getTransitionsForAction(
    actionName: string,
    actionType: string,
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    limitBeforeGrouping: string | number = '0',
    parts: string = 'all'
  ): Promise<any> {
    const params: RequestParams = {
      actionName,
      actionType,
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (limitBeforeGrouping !== '0') params.limitBeforeGrouping = limitBeforeGrouping;
    if (parts !== 'all') params.parts = parts;

    return this.client.request('Transitions.getTransitionsForAction', params);
  }

  /**
   * Get translations for transition metrics
   */
  async getTranslations(): Promise<any> {
    return this.client.request('Transitions.getTranslations', {});
  }

  /**
   * Check if a period is allowed for transitions analysis
   * 
   * @param idSite Site ID
   * @param period Period to check
   * @param date Date string
   */
  async isPeriodAllowed(
    idSite: number | string,
    period: string,
    date: string
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    return this.client.request('Transitions.isPeriodAllowed', params);
  }
}