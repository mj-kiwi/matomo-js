/**
 * Matomo UserLanguage Module
 * The UserLanguage API lets you access reports about your Visitors language setting
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class UserLanguageModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get visitor language information
   * 
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getLanguage(
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

    return this.client.request('UserLanguage.getLanguage', params);
  }

  /**
   * Get visitor language code information
   * 
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getLanguageCode(
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

    return this.client.request('UserLanguage.getLanguageCode', params);
  }
}