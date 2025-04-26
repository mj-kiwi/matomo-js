/**
 * Matomo CoreAdminHome Module
 * Provides methods for core administration tasks
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

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
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Delete all tracking failures
   *
   * @returns Success status of the operation
   */
  async deleteAllTrackingFailures(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "CoreAdminHome.deleteAllTrackingFailures",
        {}
      );
    }
    return this.client.request("CoreAdminHome.deleteAllTrackingFailures");
  }

  /**
   * Delete a specific tracking failure
   *
   * @param params Parameters containing site ID and failure ID
   * @returns Success status of the operation
   */
  async deleteTrackingFailure(params: TrackingFailureParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "CoreAdminHome.deleteTrackingFailure",
        params
      );
    }
    return this.client.request("CoreAdminHome.deleteTrackingFailure", params);
  }

  /**
   * Get all tracking failures
   *
   * @returns List of tracking failures in the system
   */
  async getTrackingFailures(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("CoreAdminHome.getTrackingFailures", {});
    }
    return this.client.request("CoreAdminHome.getTrackingFailures");
  }
}
