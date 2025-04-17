/**
 * Matomo Live Module
 *
 * The Live! API lets you access complete visit level information about your visitors. Combined with the
 * power of Segmentation, you will be able to request visits filtered by any criteria. The method
 * "getLastVisitsDetails" will return extensive RAW data for each visit, which includes: server time, visitId,
 * visitorId, visitorType (new or returning), number of pages, list of all pages (and events, file downloaded and
 * outlinks clicked), custom variables names and values set to this visit, number of goal conversions (and
 * list of all Goal conversions for this visit, with time of conversion, revenue, URL, etc.), but also other
 * attributes such as: days since last visit, days since first visit, country, continent, visitor IP, provider,
 * referrer used (referrer name, keyword if it was a search engine, full URL), campaign name and keyword, operating
 * system, browser, type of screen, resolution, supported browser plugins (flash, java, silverlight, pdf, etc.),
 * various dates & times format to make it easier for API users... and more!
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class LiveModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get visitor counters
   *
   * @param idSite Site ID
   * @param lastMinutes Number of minutes to look back when retrieving counters
   * @param segment Optional segment definition
   * @param showColumns Optional columns to show
   * @param hideColumns Optional columns to hide
   * @returns Promise with visitor counters
   */
  async getCounters(
    idSite: number | string,
    lastMinutes: number | string,
    segment: string = '',
    showColumns: string | string[] = '',
    hideColumns: string | string[] = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      lastMinutes,
    };

    if (segment) params.segment = segment;
    if (showColumns) {
      params.showColumns = Array.isArray(showColumns)
        ? showColumns.join(',')
        : showColumns;
    }
    if (hideColumns) {
      params.hideColumns = Array.isArray(hideColumns)
        ? hideColumns.join(',')
        : hideColumns;
    }

    return this.client.request('Live.getCounters', params);
  }

  /**
   * Check if visitor profile is enabled
   *
   * @param idSite Site ID
   * @returns Promise with boolean result indicating if visitor profile is enabled
   */
  async isVisitorProfileEnabled(idSite: number | string): Promise<any> {
    return this.client.request('Live.isVisitorProfileEnabled', {
      idSite,
    });
  }

  /**
   * Get details about the last visits
   *
   * @param idSite Site ID
   * @param period Optional period to request data for
   * @param date Optional date string
   * @param segment Optional segment definition
   * @param countVisitorsToFetch Optional number of visitors to fetch
   * @param minTimestamp Optional minimum timestamp
   * @param flat Optional flat parameter
   * @param doNotFetchActions Optional parameter to skip fetching actions
   * @param enhanced Optional parameter to get enhanced data
   * @returns Promise with visit details
   */
  async getLastVisitsDetails(
    idSite: number | string,
    period: string = '',
    date: string = '',
    segment: string = '',
    countVisitorsToFetch: number | string = '',
    minTimestamp: number | string = '',
    flat: boolean | string = '',
    doNotFetchActions: boolean | string = '',
    enhanced: boolean | string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
    };

    if (period) params.period = period;
    if (date) params.date = date;
    if (segment) params.segment = segment;
    if (countVisitorsToFetch !== '')
      params.countVisitorsToFetch = countVisitorsToFetch;
    if (minTimestamp !== '') params.minTimestamp = minTimestamp;
    if (flat !== '') params.flat = flat;
    if (doNotFetchActions !== '') params.doNotFetchActions = doNotFetchActions;
    if (enhanced !== '') params.enhanced = enhanced;

    return this.client.request('Live.getLastVisitsDetails', params);
  }

  /**
   * Get visitor profile information
   *
   * @param idSite Site ID
   * @param visitorId Optional visitor ID
   * @param segment Optional segment definition
   * @param limitVisits Optional limit on number of visits
   * @returns Promise with visitor profile information
   */
  async getVisitorProfile(
    idSite: number | string,
    visitorId: string = '',
    segment: string = '',
    limitVisits: number | string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
    };

    if (visitorId) params.visitorId = visitorId;
    if (segment) params.segment = segment;
    if (limitVisits !== '') params.limitVisits = limitVisits;

    return this.client.request('Live.getVisitorProfile', params);
  }

  /**
   * Get the most recent visitor ID
   *
   * @param idSite Site ID
   * @param segment Optional segment definition
   * @returns Promise with the most recent visitor ID
   */
  async getMostRecentVisitorId(
    idSite: number | string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
    };

    if (segment) params.segment = segment;

    return this.client.request('Live.getMostRecentVisitorId', params);
  }

  /**
   * Get most recent visits date time
   *
   * @param idSite Site ID
   * @param period Optional period to request data for
   * @param date Optional date string
   * @returns Promise with the most recent visits date time
   */
  async getMostRecentVisitsDateTime(
    idSite: number | string,
    period: string | null = null,
    date: string | null = null
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
    };

    if (period !== null) params.period = period;
    if (date !== null) params.date = date;

    return this.client.request('Live.getMostRecentVisitsDateTime', params);
  }
}
