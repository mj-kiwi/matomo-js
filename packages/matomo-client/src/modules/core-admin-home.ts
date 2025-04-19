/**
 * Matomo CoreAdminHome Module
 * Provides methods for core administration tasks
 */

import { CoreReportingClient, RequestParams } from "./core.js";

/**
 * Parameters for tracking failure operations
 */
export interface TrackingFailureParams extends RequestParams {
  /** Site ID the tracking failure belongs to */
  idSite: string | number;
  /** ID of the tracking failure to delete */
  idFailure: string | number;
}

export class CoreAdminHomeModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Delete all tracking failures
   *
   * @returns Success status of the operation
   */
  async deleteAllTrackingFailures(): Promise<any> {
    return this.client.request("CoreAdminHome.deleteAllTrackingFailures");
  }

  /**
   * Delete a specific tracking failure
   *
   * @param params Parameters containing site ID and failure ID
   * @returns Success status of the operation
   */
  async deleteTrackingFailure(params: TrackingFailureParams): Promise<any> {
    return this.client.request("CoreAdminHome.deleteTrackingFailure", params);
  }

  /**
   * Get all tracking failures
   *
   * @returns List of tracking failures in the system
   */
  async getTrackingFailures(): Promise<any> {
    return this.client.request("CoreAdminHome.getTrackingFailures");
  }
}
