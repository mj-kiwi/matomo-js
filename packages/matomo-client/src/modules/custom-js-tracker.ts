/**
 * Matomo CustomJsTracker Module
 * API for plugin CustomJsTracker
 */

import { CoreReportingClient } from "./core.js";
import { BatchRequest } from "../batch-request.js";

export class CustomJsTrackerModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Checks if the CustomJsTracker plugin includes plugin trackers automatically
   * @returns Promise with boolean value indicating if plugin trackers are included automatically
   */
  doesIncludePluginTrackersAutomatically(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "CustomJsTracker.doesIncludePluginTrackersAutomatically",
        {}
      );
    }
    return this.client.request(
      "CustomJsTracker.doesIncludePluginTrackersAutomatically",
      {}
    );
  }
}
