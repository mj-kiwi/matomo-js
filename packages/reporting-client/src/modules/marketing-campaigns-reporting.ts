/**
 * Matomo MarketingCampaignsReporting Module
 * API for plugin MarketingCampaignsReporting providing access to campaign data
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class MarketingCampaignsReportingModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get campaign IDs
   *
   * @param idSite Site ID
   * @param period Period to request data for (day, week, month, year, range)
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getId(
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

    return this.client.request('MarketingCampaignsReporting.getId', params);
  }

  /**
   * Get campaign names
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the campaign names
   * @param flat Whether to return a flattened report
   */
  async getName(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | boolean = '',
    flat: string | boolean = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (expanded !== '') params.expanded = expanded;
    if (flat !== '') params.flat = flat;

    return this.client.request('MarketingCampaignsReporting.getName', params);
  }

  /**
   * Get keyword content from name ID
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idSubtable Subtable ID
   * @param segment Optional segment definition
   */
  async getKeywordContentFromNameId(
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

    return this.client.request(
      'MarketingCampaignsReporting.getKeywordContentFromNameId',
      params
    );
  }

  /**
   * Get campaign keywords
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getKeyword(
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
      'MarketingCampaignsReporting.getKeyword',
      params
    );
  }

  /**
   * Get campaign sources
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getSource(
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

    return this.client.request('MarketingCampaignsReporting.getSource', params);
  }

  /**
   * Get campaign mediums
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getMedium(
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

    return this.client.request('MarketingCampaignsReporting.getMedium', params);
  }

  /**
   * Get campaign content
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getContent(
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
      'MarketingCampaignsReporting.getContent',
      params
    );
  }

  /**
   * Get campaign group
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getGroup(
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

    return this.client.request('MarketingCampaignsReporting.getGroup', params);
  }

  /**
   * Get campaign placement
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getPlacement(
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
      'MarketingCampaignsReporting.getPlacement',
      params
    );
  }

  /**
   * Get campaign source/medium combinations
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the report
   * @param flat Whether to return a flattened report
   */
  async getSourceMedium(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | boolean = '',
    flat: string | boolean = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (expanded !== '') params.expanded = expanded;
    if (flat !== '') params.flat = flat;

    return this.client.request(
      'MarketingCampaignsReporting.getSourceMedium',
      params
    );
  }

  /**
   * Get campaign names from source/medium ID
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idSubtable Subtable ID
   * @param segment Optional segment definition
   */
  async getNameFromSourceMediumId(
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

    return this.client.request(
      'MarketingCampaignsReporting.getNameFromSourceMediumId',
      params
    );
  }
}
