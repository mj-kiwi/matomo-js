/**
 * Matomo UserId Module
 * API for plugin UserId. Allows to get User IDs table.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class UserIdModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get a list of users with their visits
   * 
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
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

    return this.client.request('UserId.getUsers', params);
  }
}