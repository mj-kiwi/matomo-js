/**
 * Matomo Actions Module
 * Provides access to all page tracking data such as page views, page titles, downloads, outlinks
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class ActionsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get actions data for multiple periods or sites
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

    return this.client.request('Actions.get', params);
  }

  /**
   * Get page URLs
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the page URLs
   * @param idSubtable If set, get data for this subtable
   * @param depth Recursion depth for tree reports
   * @param flat Whether to return a flattened report
   */
  async getPageUrls(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | boolean = '',
    idSubtable: string | number = '',
    depth: string | number = '',
    flat: string | boolean = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (expanded !== '') params.expanded = expanded;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (depth !== '') params.depth = depth;
    if (flat !== '') params.flat = flat;

    return this.client.request('Actions.getPageUrls', params);
  }

  /**
   * Get page URLs following site search
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the page URLs
   * @param idSubtable If set, get data for this subtable
   */
  async getPageUrlsFollowingSiteSearch(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | boolean = '',
    idSubtable: string | number = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (expanded !== '') params.expanded = expanded;
    if (idSubtable !== '') params.idSubtable = idSubtable;

    return this.client.request(
      'Actions.getPageUrlsFollowingSiteSearch',
      params
    );
  }

  /**
   * Get page titles following site search
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the page titles
   * @param idSubtable If set, get data for this subtable
   */
  async getPageTitlesFollowingSiteSearch(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | boolean = '',
    idSubtable: string | number = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (expanded !== '') params.expanded = expanded;
    if (idSubtable !== '') params.idSubtable = idSubtable;

    return this.client.request(
      'Actions.getPageTitlesFollowingSiteSearch',
      params
    );
  }

  /**
   * Get entry page URLs
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the page URLs
   * @param idSubtable If set, get data for this subtable
   * @param flat Whether to return a flattened report
   */
  async getEntryPageUrls(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | boolean = '',
    idSubtable: string | number = '',
    flat: string | boolean = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (expanded !== '') params.expanded = expanded;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (flat !== '') params.flat = flat;

    return this.client.request('Actions.getEntryPageUrls', params);
  }

  /**
   * Get exit page URLs
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the page URLs
   * @param idSubtable If set, get data for this subtable
   * @param flat Whether to return a flattened report
   */
  async getExitPageUrls(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | boolean = '',
    idSubtable: string | number = '',
    flat: string | boolean = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (expanded !== '') params.expanded = expanded;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (flat !== '') params.flat = flat;

    return this.client.request('Actions.getExitPageUrls', params);
  }

  /**
   * Get metrics for a specific page URL
   *
   * @param pageUrl URL of the page to get metrics for (must be URL encoded)
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getPageUrl(
    pageUrl: string,
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      pageUrl,
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('Actions.getPageUrl', params);
  }

  /**
   * Get page titles
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the page titles
   * @param idSubtable If set, get data for this subtable
   * @param flat Whether to return a flattened report
   */
  async getPageTitles(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | boolean = '',
    idSubtable: string | number = '',
    flat: string | boolean = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (expanded !== '') params.expanded = expanded;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (flat !== '') params.flat = flat;

    return this.client.request('Actions.getPageTitles', params);
  }

  /**
   * Get entry page titles
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the page titles
   * @param idSubtable If set, get data for this subtable
   * @param flat Whether to return a flattened report
   */
  async getEntryPageTitles(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | boolean = '',
    idSubtable: string | number = '',
    flat: string | boolean = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (expanded !== '') params.expanded = expanded;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (flat !== '') params.flat = flat;

    return this.client.request('Actions.getEntryPageTitles', params);
  }

  /**
   * Get exit page titles
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the page titles
   * @param idSubtable If set, get data for this subtable
   * @param flat Whether to return a flattened report
   */
  async getExitPageTitles(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | boolean = '',
    idSubtable: string | number = '',
    flat: string | boolean = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (expanded !== '') params.expanded = expanded;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (flat !== '') params.flat = flat;

    return this.client.request('Actions.getExitPageTitles', params);
  }

  /**
   * Get metrics for a specific page title
   *
   * @param pageName Title of the page to get metrics for (must be URL encoded)
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getPageTitle(
    pageName: string,
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      pageName,
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('Actions.getPageTitle', params);
  }

  /**
   * Get file downloads
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the downloads
   * @param idSubtable If set, get data for this subtable
   * @param flat Whether to return a flattened report
   */
  async getDownloads(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | boolean = '',
    idSubtable: string | number = '',
    flat: string | boolean = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (expanded !== '') params.expanded = expanded;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (flat !== '') params.flat = flat;

    return this.client.request('Actions.getDownloads', params);
  }

  /**
   * Get metrics for a specific download
   *
   * @param downloadUrl URL of the download to get metrics for (must be URL encoded)
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getDownload(
    downloadUrl: string,
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      downloadUrl,
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('Actions.getDownload', params);
  }

  /**
   * Get outlinks
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the outlinks
   * @param idSubtable If set, get data for this subtable
   * @param flat Whether to return a flattened report
   */
  async getOutlinks(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | boolean = '',
    idSubtable: string | number = '',
    flat: string | boolean = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (expanded !== '') params.expanded = expanded;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (flat !== '') params.flat = flat;

    return this.client.request('Actions.getOutlinks', params);
  }

  /**
   * Get metrics for a specific outlink
   *
   * @param outlinkUrl URL of the outlink to get metrics for (must be URL encoded)
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getOutlink(
    outlinkUrl: string,
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      outlinkUrl,
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('Actions.getOutlink', params);
  }

  /**
   * Get site search keywords
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getSiteSearchKeywords(
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

    return this.client.request('Actions.getSiteSearchKeywords', params);
  }

  /**
   * Get site search keywords with no results
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getSiteSearchNoResultKeywords(
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

    return this.client.request('Actions.getSiteSearchNoResultKeywords', params);
  }

  /**
   * Get site search categories
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getSiteSearchCategories(
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

    return this.client.request('Actions.getSiteSearchCategories', params);
  }
}
