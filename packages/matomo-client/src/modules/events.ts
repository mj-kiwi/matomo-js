/**
 * Matomo Events Module
 * This API lets you request reports about your users' Custom Events tracked using the Javascript
 * Tracker trackEvent() function or the Tracking HTTP API.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class EventsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get event categories
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the categories
   * @param secondaryDimension Secondary dimension (eventAction or eventName)
   * @param flat Whether to return a flattened report
   * @returns Promise with the API response
   */
  async getCategory(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    expanded: string = '',
    secondaryDimension: string = '',
    flat: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (expanded) params.expanded = expanded;
    if (secondaryDimension) params.secondaryDimension = secondaryDimension;
    if (flat) params.flat = flat;

    return this.client.request('Events.getCategory', params);
  }

  /**
   * Get event actions
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the actions
   * @param secondaryDimension Secondary dimension (eventName or eventCategory)
   * @param flat Whether to return a flattened report
   * @returns Promise with the API response
   */
  async getAction(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    expanded: string = '',
    secondaryDimension: string = '',
    flat: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (expanded) params.expanded = expanded;
    if (secondaryDimension) params.secondaryDimension = secondaryDimension;
    if (flat) params.flat = flat;

    return this.client.request('Events.getAction', params);
  }

  /**
   * Get event names
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the names
   * @param secondaryDimension Secondary dimension (eventAction or eventCategory)
   * @param flat Whether to return a flattened report
   * @returns Promise with the API response
   */
  async getName(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    expanded: string = '',
    secondaryDimension: string = '',
    flat: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (expanded) params.expanded = expanded;
    if (secondaryDimension) params.secondaryDimension = secondaryDimension;
    if (flat) params.flat = flat;

    return this.client.request('Events.getName', params);
  }

  /**
   * Get action from category ID
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idSubtable Subtable ID
   * @param segment Optional segment definition
   * @returns Promise with the API response
   */
  async getActionFromCategoryId(
    idSite: number | string,
    period: string,
    date: string,
    idSubtable: string | number,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idSubtable,
    };

    if (segment) params.segment = segment;

    return this.client.request('Events.getActionFromCategoryId', params);
  }

  /**
   * Get name from category ID
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idSubtable Subtable ID
   * @param segment Optional segment definition
   * @returns Promise with the API response
   */
  async getNameFromCategoryId(
    idSite: number | string,
    period: string,
    date: string,
    idSubtable: string | number,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idSubtable,
    };

    if (segment) params.segment = segment;

    return this.client.request('Events.getNameFromCategoryId', params);
  }

  /**
   * Get category from action ID
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idSubtable Subtable ID
   * @param segment Optional segment definition
   * @returns Promise with the API response
   */
  async getCategoryFromActionId(
    idSite: number | string,
    period: string,
    date: string,
    idSubtable: string | number,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idSubtable,
    };

    if (segment) params.segment = segment;

    return this.client.request('Events.getCategoryFromActionId', params);
  }

  /**
   * Get name from action ID
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idSubtable Subtable ID
   * @param segment Optional segment definition
   * @returns Promise with the API response
   */
  async getNameFromActionId(
    idSite: number | string,
    period: string,
    date: string,
    idSubtable: string | number,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idSubtable,
    };

    if (segment) params.segment = segment;

    return this.client.request('Events.getNameFromActionId', params);
  }

  /**
   * Get action from name ID
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idSubtable Subtable ID
   * @param segment Optional segment definition
   * @returns Promise with the API response
   */
  async getActionFromNameId(
    idSite: number | string,
    period: string,
    date: string,
    idSubtable: string | number,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idSubtable,
    };

    if (segment) params.segment = segment;

    return this.client.request('Events.getActionFromNameId', params);
  }

  /**
   * Get category from name ID
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idSubtable Subtable ID
   * @param segment Optional segment definition
   * @returns Promise with the API response
   */
  async getCategoryFromNameId(
    idSite: number | string,
    period: string,
    date: string,
    idSubtable: string | number,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idSubtable,
    };

    if (segment) params.segment = segment;

    return this.client.request('Events.getCategoryFromNameId', params);
  }
}
