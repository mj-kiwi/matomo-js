/**
 * Matomo VisitTime Module
 * VisitTime API lets you access reports by Hour (Server time), and by Hour Local Time of your visitors.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class VisitTimeModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get visit by local time (visitor's time)
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getVisitInformationPerLocalTime(
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
      'VisitTime.getVisitInformationPerLocalTime',
      params
    );
  }

  /**
   * Get visit by server time
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param hideFutureHoursWhenToday Whether to hide future hours when date is today
   */
  async getVisitInformationPerServerTime(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    hideFutureHoursWhenToday: string | boolean = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (hideFutureHoursWhenToday !== '')
      params.hideFutureHoursWhenToday = hideFutureHoursWhenToday;

    return this.client.request(
      'VisitTime.getVisitInformationPerServerTime',
      params
    );
  }

  /**
   * Get visits by day of week
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getByDayOfWeek(
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

    return this.client.request('VisitTime.getByDayOfWeek', params);
  }
}
