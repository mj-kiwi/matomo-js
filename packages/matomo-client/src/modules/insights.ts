/**
 * Matomo Insights Module
 *
 * API for plugin Insights. The Insights plugin provides analytical insights about your website's data,
 * helping you to identify trends and patterns.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class InsightsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Check if insights can be generated for a specific period and date
   *
   * @param date Date string
   * @param period Period to request data for
   * @returns Promise with the result whether insights can be generated
   */
  canGenerateInsights(date: string, period: string): Promise<any> {
    return this.client.request('Insights.canGenerateInsights', {
      date,
      period,
    });
  }

  /**
   * Get insights overview for a site
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the insights overview
   */
  getInsightsOverview(
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

    return this.client.request('Insights.getInsightsOverview', params);
  }

  /**
   * Get an overview of movers and shakers for a site
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with movers and shakers overview
   */
  getMoversAndShakersOverview(
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

    return this.client.request('Insights.getMoversAndShakersOverview', params);
  }

  /**
   * Get movers and shakers data for a specific report
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param reportUniqueId Report unique ID
   * @param segment Optional segment definition
   * @param comparedToXPeriods Number of periods to compare
   * @param limitIncreaser Limit for increased values
   * @param limitDecreaser Limit for decreased values
   * @returns Promise with movers and shakers data
   */
  getMoversAndShakers(
    idSite: number | string,
    period: string,
    date: string,
    reportUniqueId: string,
    segment: string = '',
    comparedToXPeriods: number | string = '1',
    limitIncreaser: number | string = '4',
    limitDecreaser: number | string = '4'
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      reportUniqueId,
    };

    if (segment) params.segment = segment;
    if (comparedToXPeriods !== '1')
      params.comparedToXPeriods = comparedToXPeriods;
    if (limitIncreaser !== '4') params.limitIncreaser = limitIncreaser;
    if (limitDecreaser !== '4') params.limitDecreaser = limitDecreaser;

    return this.client.request('Insights.getMoversAndShakers', params);
  }

  /**
   * Get insights data for a specific report
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param reportUniqueId Report unique ID
   * @param segment Optional segment definition
   * @param limitIncreaser Limit for increased values
   * @param limitDecreaser Limit for decreased values
   * @param filterBy Filter type
   * @param minImpactPercent Minimum impact percent
   * @param minGrowthPercent Minimum growth percent
   * @param comparedToXPeriods Number of periods to compare
   * @param orderBy Order metric
   * @returns Promise with insights data
   */
  getInsights(
    idSite: number | string,
    period: string,
    date: string,
    reportUniqueId: string,
    segment: string = '',
    limitIncreaser: number | string = '5',
    limitDecreaser: number | string = '5',
    filterBy: string = '',
    minImpactPercent: number | string = '2',
    minGrowthPercent: number | string = '20',
    comparedToXPeriods: number | string = '1',
    orderBy: string = 'absolute'
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      reportUniqueId,
    };

    if (segment) params.segment = segment;
    if (limitIncreaser !== '5') params.limitIncreaser = limitIncreaser;
    if (limitDecreaser !== '5') params.limitDecreaser = limitDecreaser;
    if (filterBy) params.filterBy = filterBy;
    if (minImpactPercent !== '2') params.minImpactPercent = minImpactPercent;
    if (minGrowthPercent !== '20') params.minGrowthPercent = minGrowthPercent;
    if (comparedToXPeriods !== '1')
      params.comparedToXPeriods = comparedToXPeriods;
    if (orderBy !== 'absolute') params.orderBy = orderBy;

    return this.client.request('Insights.getInsights', params);
  }
}
