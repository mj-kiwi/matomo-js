/**
 * Matomo CoreAdminHome Module
 * Provides methods for core administration tasks
 */

import { CoreReportingClient } from './core.js';

export class CoreAdminHomeModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Delete all tracking failures
   *
   * @returns Success status of the operation
   */
  async deleteAllTrackingFailures(): Promise<any> {
    return this.client.request('CoreAdminHome.deleteAllTrackingFailures');
  }

  /**
   * Delete a specific tracking failure
   *
   * @param idSite Site ID the tracking failure belongs to
   * @param idFailure ID of the tracking failure to delete
   * @returns Success status of the operation
   */
  async deleteTrackingFailure(
    idSite: string | number,
    idFailure: string | number
  ): Promise<any> {
    return this.client.request('CoreAdminHome.deleteTrackingFailure', {
      idSite,
      idFailure,
    });
  }

  /**
   * Get all tracking failures
   *
   * @returns List of tracking failures in the system
   */
  async getTrackingFailures(): Promise<any> {
    return this.client.request('CoreAdminHome.getTrackingFailures');
  }
}
