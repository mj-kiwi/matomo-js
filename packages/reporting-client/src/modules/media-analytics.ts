/**
 * Matomo MediaAnalytics Module
 * Access to video and audio analytics data for websites and apps
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class MediaAnalyticsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Check if there are any recorded media analytics data
   *
   * @param idSite Site ID
   */
  async hasRecords(idSite: number | string): Promise<any> {
    const params: RequestParams = {
      idSite,
    };

    return this.client.request('MediaAnalytics.hasRecords', params);
  }

  /**
   * Get media analytics data
   *
   * @param idSite Site ID
   * @param period Period to request data for (day, week, month, year, range)
   * @param date Date string
   * @param segment Optional segment definition
   * @param columns Optional columns to restrict the returned data
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

    return this.client.request('MediaAnalytics.get', params);
  }

  /**
   * Get the number of media plays in the last N minutes
   *
   * @param idSite Site ID
   * @param lastMinutes Number of minutes to look back
   * @param segment Optional segment definition
   */
  async getCurrentNumPlays(
    idSite: number | string,
    lastMinutes: number | string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      lastMinutes,
    };

    if (segment) params.segment = segment;

    return this.client.request('MediaAnalytics.getCurrentNumPlays', params);
  }

  /**
   * Get the sum of time spent watching media in the last N minutes
   *
   * @param idSite Site ID
   * @param lastMinutes Number of minutes to look back
   * @param segment Optional segment definition
   */
  async getCurrentSumTimeSpent(
    idSite: number | string,
    lastMinutes: number | string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      lastMinutes,
    };

    if (segment) params.segment = segment;

    return this.client.request('MediaAnalytics.getCurrentSumTimeSpent', params);
  }

  /**
   * Get the most played media in the last N minutes
   *
   * @param idSite Site ID
   * @param lastMinutes Number of minutes to look back
   * @param filter_limit Maximum number of results to return
   * @param segment Optional segment definition
   */
  async getCurrentMostPlays(
    idSite: number | string,
    lastMinutes: number | string,
    filter_limit: number | string = '5',
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      lastMinutes,
      filter_limit,
    };

    if (segment) params.segment = segment;

    return this.client.request('MediaAnalytics.getCurrentMostPlays', params);
  }

  /**
   * Get video resources
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param idSubtable Optional subtable ID
   * @param secondaryDimension Optional secondary dimension
   * @param expanded Whether to expand the resources report
   * @param flat Whether to return a flattened report
   */
  async getVideoResources(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    idSubtable: string | number = '',
    secondaryDimension: string = '',
    expanded: string | boolean = '',
    flat: string | boolean = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (secondaryDimension) params.secondaryDimension = secondaryDimension;
    if (expanded !== '') params.expanded = expanded;
    if (flat !== '') params.flat = flat;

    return this.client.request('MediaAnalytics.getVideoResources', params);
  }

  /**
   * Get audio resources
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param idSubtable Optional subtable ID
   * @param secondaryDimension Optional secondary dimension
   * @param expanded Whether to expand the resources report
   * @param flat Whether to return a flattened report
   */
  async getAudioResources(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    idSubtable: string | number = '',
    secondaryDimension: string = '',
    expanded: string | boolean = '',
    flat: string | boolean = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (secondaryDimension) params.secondaryDimension = secondaryDimension;
    if (expanded !== '') params.expanded = expanded;
    if (flat !== '') params.flat = flat;

    return this.client.request('MediaAnalytics.getAudioResources', params);
  }

  /**
   * Get video titles
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param idSubtable Optional subtable ID
   * @param secondaryDimension Optional secondary dimension
   */
  async getVideoTitles(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    idSubtable: string | number = '',
    secondaryDimension: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (secondaryDimension) params.secondaryDimension = secondaryDimension;

    return this.client.request('MediaAnalytics.getVideoTitles', params);
  }

  /**
   * Get audio titles
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param idSubtable Optional subtable ID
   * @param secondaryDimension Optional secondary dimension
   */
  async getAudioTitles(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    idSubtable: string | number = '',
    secondaryDimension: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (secondaryDimension) params.secondaryDimension = secondaryDimension;

    return this.client.request('MediaAnalytics.getAudioTitles', params);
  }

  /**
   * Get grouped video resources
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param idSubtable Optional subtable ID
   * @param secondaryDimension Optional secondary dimension
   */
  async getGroupedVideoResources(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    idSubtable: string | number = '',
    secondaryDimension: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (secondaryDimension) params.secondaryDimension = secondaryDimension;

    return this.client.request(
      'MediaAnalytics.getGroupedVideoResources',
      params
    );
  }

  /**
   * Get grouped audio resources
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param idSubtable Optional subtable ID
   * @param secondaryDimension Optional secondary dimension
   */
  async getGroupedAudioResources(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    idSubtable: string | number = '',
    secondaryDimension: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (secondaryDimension) params.secondaryDimension = secondaryDimension;

    return this.client.request(
      'MediaAnalytics.getGroupedAudioResources',
      params
    );
  }

  /**
   * Get video hours (videos watched by hour)
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getVideoHours(
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

    return this.client.request('MediaAnalytics.getVideoHours', params);
  }

  /**
   * Get audio hours (audio listened by hour)
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getAudioHours(
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

    return this.client.request('MediaAnalytics.getAudioHours', params);
  }

  /**
   * Get video resolutions
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getVideoResolutions(
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

    return this.client.request('MediaAnalytics.getVideoResolutions', params);
  }

  /**
   * Get players used for media playback
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getPlayers(
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

    return this.client.request('MediaAnalytics.getPlayers', params);
  }
}
