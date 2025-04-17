/**
 * Matomo ActivityLog Module
 * Provides access to user activity logs in the Matomo instance
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class ActivityLogModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get activity log entries
   *
   * Returns a list of the activities done by users in your Matomo instance.
   * The results depend on authentication:
   * - Super User: returns activity logs for all users
   * - User with view/admin access or anonymous: returns only this user's activity
   *
   * @param offset Result offset (default: 0)
   * @param limit Number of records to return (default: 25)
   * @param filterByUserLogin Filter activities by specific user login
   * @param filterByActivityType Filter by activity type
   * @param period Period to filter by
   * @param date Date to filter by
   */
  async getEntries(
    offset: string | number = '0',
    limit: string | number = '25',
    filterByUserLogin: string = '',
    filterByActivityType: string = '',
    period: string = '',
    date: string = ''
  ): Promise<any> {
    const params: RequestParams = {};

    if (offset !== undefined) params.offset = offset;
    if (limit !== undefined) params.limit = limit;
    if (filterByUserLogin) params.filterByUserLogin = filterByUserLogin;
    if (filterByActivityType)
      params.filterByActivityType = filterByActivityType;
    if (period) params.period = period;
    if (date) params.date = date;

    return this.client.request('ActivityLog.getEntries', params);
  }

  /**
   * Get count of activity log entries
   *
   * Returns the total number of activities matching the specified filters
   *
   * @param filterByUserLogin Filter count by specific user login
   * @param filterByActivityType Filter count by activity type
   * @param period Period to filter by
   * @param date Date to filter by
   */
  async getEntryCount(
    filterByUserLogin: string = '',
    filterByActivityType: string = '',
    period: string = '',
    date: string = ''
  ): Promise<number> {
    const params: RequestParams = {};

    if (filterByUserLogin) params.filterByUserLogin = filterByUserLogin;
    if (filterByActivityType)
      params.filterByActivityType = filterByActivityType;
    if (period) params.period = period;
    if (date) params.date = date;

    const result = await this.client.request<{ value: number }>(
      'ActivityLog.getEntryCount',
      params
    );
    return result.value;
  }

  /**
   * Get all available activity types
   *
   * Returns a list of all possible activity types that can be used for filtering
   *
   * @param filterLimit Number of activity types to return (-1 for all)
   */
  async getAllActivityTypes(
    filterLimit: string | number = '-1'
  ): Promise<string[]> {
    const params: RequestParams = {};
    if (filterLimit !== undefined) params.filterLimit = filterLimit;

    return this.client.request<string[]>(
      'ActivityLog.getAllActivityTypes',
      params
    );
  }
}
