/**
 * Matomo VisitsSummary Module
 *
 * API for VisitsSummary module which lets you access core web analytics metrics:
 * visits, unique visitors, count of actions (page views, downloads, clicks on outlinks),
 * time on site, bounces and converted visits.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class VisitsSummaryModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get core web analytics metrics
   *
   * @param idSite Site ID
   * @param period Period to request data for (day, week, month, year, range)
   * @param date Date string
   * @param segment Optional segment definition
   * @param columns Optional columns to restrict the returned data
   * @returns Promise with the API response containing visit metrics
   */
  async get(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    columns: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (columns) params.columns = columns;

    return this.client.request('VisitsSummary.get', params);
  }

  /**
   * Get the number of visits
   *
   * @param idSite Site ID
   * @param period Period to request data for (day, week, month, year, range)
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing visit counts
   */
  async getVisits(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('VisitsSummary.getVisits', params);
  }

  /**
   * Get the number of unique visitors
   *
   * @param idSite Site ID
   * @param period Period to request data for (day, week, month, year, range)
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing unique visitor counts
   */
  async getUniqueVisitors(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('VisitsSummary.getUniqueVisitors', params);
  }

  /**
   * Get the number of users
   *
   * @param idSite Site ID
   * @param period Period to request data for (day, week, month, year, range)
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing user counts
   */
  async getUsers(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('VisitsSummary.getUsers', params);
  }

  /**
   * Get the number of actions (page views, downloads, etc.)
   *
   * @param idSite Site ID
   * @param period Period to request data for (day, week, month, year, range)
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing action counts
   */
  async getActions(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('VisitsSummary.getActions', params);
  }

  /**
   * Get the maximum number of actions in a visit
   *
   * @param idSite Site ID
   * @param period Period to request data for (day, week, month, year, range)
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing maximum actions per visit
   */
  async getMaxActions(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('VisitsSummary.getMaxActions', params);
  }

  /**
   * Get the number of bounced visits
   *
   * @param idSite Site ID
   * @param period Period to request data for (day, week, month, year, range)
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing bounce counts
   */
  async getBounceCount(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('VisitsSummary.getBounceCount', params);
  }

  /**
   * Get the number of visits that converted a goal
   *
   * @param idSite Site ID
   * @param period Period to request data for (day, week, month, year, range)
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing counts of converted visits
   */
  async getVisitsConverted(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('VisitsSummary.getVisitsConverted', params);
  }

  /**
   * Get the total time spent by all visits
   *
   * @param idSite Site ID
   * @param period Period to request data for (day, week, month, year, range)
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing total visit time in seconds
   */
  async getSumVisitsLength(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('VisitsSummary.getSumVisitsLength', params);
  }

  /**
   * Get the total visit time formatted as a pretty string
   *
   * @param idSite Site ID
   * @param period Period to request data for (day, week, month, year, range)
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing formatted total visit time
   */
  async getSumVisitsLengthPretty(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request(
      'VisitsSummary.getSumVisitsLengthPretty',
      params
    );
  }
}
