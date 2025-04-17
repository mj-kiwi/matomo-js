/**
 * Matomo UsersFlow Module
 * API for Users Flow. The API lets you explore details about how your users
 * or visitors navigate through your website.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class UsersFlowModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get a formatted user flow report
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the flow
   * @param flat Whether to return a flattened report
   * @param idSubtable If set, get data for this subtable
   * @param dataSource Data source for the flow report
   */
  async getUsersFlowPretty(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | boolean = '',
    flat: string | boolean = '',
    idSubtable: string | number = '',
    dataSource: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (expanded !== '') params.expanded = expanded;
    if (flat !== '') params.flat = flat;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (dataSource) params.dataSource = dataSource;

    return this.client.request('UsersFlow.getUsersFlowPretty', params);
  }

  /**
   * Get the raw user flow data
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param limitActionsPerStep Maximum number of actions per step
   * @param exploreStep Step number to explore
   * @param exploreUrl URL to explore
   * @param segment Optional segment definition
   * @param expanded Whether to expand the flow
   * @param dataSource Data source for the flow report
   */
  async getUsersFlow(
    idSite: number | string,
    period: string,
    date: string,
    limitActionsPerStep: string | number = '5',
    exploreStep: string | number = '',
    exploreUrl: string = '',
    segment: string = '',
    expanded: string | boolean = '',
    dataSource: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (limitActionsPerStep !== '5')
      params.limitActionsPerStep = limitActionsPerStep;
    if (exploreStep !== '') params.exploreStep = exploreStep;
    if (exploreUrl) params.exploreUrl = exploreUrl;
    if (segment) params.segment = segment;
    if (expanded !== '') params.expanded = expanded;
    if (dataSource) params.dataSource = dataSource;

    return this.client.request('UsersFlow.getUsersFlow', params);
  }

  /**
   * Get details about interactions at a specific position
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param interactionPosition Position of the interaction
   * @param offsetActionsPerStep Offset for actions per step
   * @param segment Optional segment definition
   * @param idSubtable If set, get data for this subtable
   * @param dataSource Data source for the report
   */
  async getInteractionActions(
    idSite: number | string,
    period: string,
    date: string,
    interactionPosition: string | number,
    offsetActionsPerStep: string | number = '',
    segment: string = '',
    idSubtable: string | number = '',
    dataSource: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      interactionPosition,
    };

    if (offsetActionsPerStep !== '')
      params.offsetActionsPerStep = offsetActionsPerStep;
    if (segment) params.segment = segment;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (dataSource) params.dataSource = dataSource;

    return this.client.request('UsersFlow.getInteractionActions', params);
  }

  /**
   * Get the available data sources for users flow reports
   */
  async getAvailableDataSources(): Promise<any> {
    return this.client.request('UsersFlow.getAvailableDataSources', {});
  }
}
