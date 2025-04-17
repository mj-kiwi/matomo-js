/**
 * Matomo CustomJsTracker Module
 * API for plugin CustomJsTracker
 */

import { CoreReportingClient } from './core.js';

export class CustomJsTrackerModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Checks if the CustomJsTracker plugin includes plugin trackers automatically
   * @returns Promise with boolean value indicating if plugin trackers are included automatically
   */
  doesIncludePluginTrackersAutomatically(): Promise<any> {
    return this.client.request(
      'CustomJsTracker.doesIncludePluginTrackersAutomatically',
      {}
    );
  }
}
