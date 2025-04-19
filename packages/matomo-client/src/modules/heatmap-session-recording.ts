/**
 * Matomo HeatmapSessionRecording Module
 *
 * API for plugin Heatmap & Session Recording. When you request activity data for a heatmap or a recorded session,
 * please note that any X or Y coordinate, scroll reach position, and above the fold is relative and not absolute.
 * X and Y coordinate are between 0 and 2000 and are relative to the selector where 2000 means the position is at 100%
 * of the element, 1000 means the position is at 50% and 0 means the position is actually 0 pixel from the element.
 * Scroll and above the fold positions are between 0 and 1000. If for example a web page is 3000 pixel high, and scroll
 * reach is 100, it means the user has seen the content up to 300 pixels (10%, or 100 of 1000).
 *
 * We differentiate between two different IDs here:
 * - idSiteHsr represents the ID of a heatmap or session recording configuration
 * - idLogHsr represents the ID of an actually recorded / tracked session or heatmap activity
 */

import { CoreReportingClient, RequestParams } from "./core.js";

/**
 * Base parameters for site operations
 */
export interface HSRSiteParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
}

/**
 * Parameters for specific heatmap or session recording
 */
export interface HSRConfigParams extends HSRSiteParams {
  /** Heatmap or session recording configuration ID */
  idSiteHsr: number | string;
}

/**
 * Parameters for recorded session operations
 */
export interface RecordedSessionParams extends HSRConfigParams {
  /** Recorded session ID */
  idLogHsr: number | string;
}

/**
 * Parameters for visit operations
 */
export interface VisitParams extends HSRConfigParams {
  /** Visit ID */
  idVisit: number | string;
}

/**
 * Parameters for adding a heatmap
 */
export interface AddHeatmapParams extends HSRSiteParams {
  /** Heatmap name */
  name: string;
  /** Page matching rules */
  matchPageRules: string | string[];
  /** Sample limit */
  sampleLimit?: number | string;
  /** Sample rate */
  sampleRate?: number | string;
  /** Excluded elements */
  excludedElements?: string;
  /** Screenshot URL */
  screenshotUrl?: string;
  /** Breakpoint for mobile devices */
  breakpointMobile?: string;
  /** Breakpoint for tablet devices */
  breakpointTablet?: string;
  /** Flag to capture DOM manually */
  captureDomManually?: boolean | string;
}

/**
 * Parameters for updating a heatmap
 */
export interface UpdateHeatmapParams extends HSRConfigParams {
  /** Heatmap name */
  name: string;
  /** Page matching rules */
  matchPageRules: string | string[];
  /** Sample limit */
  sampleLimit?: number | string;
  /** Sample rate */
  sampleRate?: number | string;
  /** Excluded elements */
  excludedElements?: string;
  /** Screenshot URL */
  screenshotUrl?: string;
  /** Breakpoint for mobile devices */
  breakpointMobile?: string;
  /** Breakpoint for tablet devices */
  breakpointTablet?: string;
  /** Flag to capture DOM manually */
  captureDomManually?: boolean | string;
}

/**
 * Parameters for adding a session recording
 */
export interface AddSessionRecordingParams extends HSRSiteParams {
  /** Session recording name */
  name: string;
  /** Page matching rules */
  matchPageRules?: string | string[];
  /** Sample limit */
  sampleLimit?: number | string;
  /** Sample rate */
  sampleRate?: number | string;
  /** Minimum session time */
  minSessionTime?: number | string;
  /** Whether activity is required */
  requiresActivity?: boolean | string;
  /** Whether to capture keystrokes */
  captureKeystrokes?: boolean | string;
}

/**
 * Parameters for updating a session recording
 */
export interface UpdateSessionRecordingParams extends HSRConfigParams {
  /** Session recording name */
  name: string;
  /** Page matching rules */
  matchPageRules?: string | string[];
  /** Sample limit */
  sampleLimit?: number | string;
  /** Sample rate */
  sampleRate?: number | string;
  /** Minimum session time */
  minSessionTime?: number | string;
  /** Whether activity is required */
  requiresActivity?: boolean | string;
  /** Whether to capture keystrokes */
  captureKeystrokes?: boolean | string;
}

/**
 * Parameters for getting heatmaps
 */
export interface GetHeatmapsParams extends HSRSiteParams {
  /** Whether to include page tree mirror information */
  includePageTreeMirror?: boolean | string;
}

/**
 * Parameters for getting recorded sessions
 */
export interface RecordedSessionsParams extends HSRSiteParams {
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Session recording configuration ID */
  idSiteHsr: number | string;
  /** Optional segment definition */
  segment?: string;
  /** Optional subtable ID */
  idSubtable?: string;
}

/**
 * Parameters for getting recorded heatmap metadata
 */
export interface RecordedHeatmapMetadataParams extends HSRSiteParams {
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Heatmap configuration ID */
  idSiteHsr: number | string;
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for getting recorded heatmap data
 */
export interface RecordedHeatmapParams extends RecordedHeatmapMetadataParams {
  /** Heatmap type */
  heatmapType: string;
  /** Device type */
  deviceType: string;
}

/**
 * Parameters for testing URL match
 */
export interface TestUrlMatchPagesParams extends RequestParams {
  /** URL to test */
  url: string;
  /** Page matching rules */
  matchPageRules?: string | string[];
}

export class HeatmapSessionRecordingModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Add a new heatmap
   *
   * @param params Parameters for adding a heatmap
   * @returns Promise with the API response
   */
  addHeatmap(params: AddHeatmapParams): Promise<any> {
    return this.client.request("HeatmapSessionRecording.addHeatmap", params);
  }

  /**
   * Update an existing heatmap
   *
   * @param params Parameters for updating a heatmap
   * @returns Promise with the API response
   */
  updateHeatmap(params: UpdateHeatmapParams): Promise<any> {
    return this.client.request("HeatmapSessionRecording.updateHeatmap", params);
  }

  /**
   * Delete a heatmap screenshot
   *
   * @param params Parameters for specific heatmap or session recording
   * @returns Promise with the API response
   */
  deleteHeatmapScreenshot(params: HSRConfigParams): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.deleteHeatmapScreenshot",
      params
    );
  }

  /**
   * Add a new session recording
   *
   * @param params Parameters for adding a session recording
   * @returns Promise with the API response
   */
  addSessionRecording(params: AddSessionRecordingParams): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.addSessionRecording",
      params
    );
  }

  /**
   * Update an existing session recording
   *
   * @param params Parameters for updating a session recording
   * @returns Promise with the API response
   */
  updateSessionRecording(params: UpdateSessionRecordingParams): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.updateSessionRecording",
      params
    );
  }

  /**
   * Get a specific heatmap
   *
   * @param params Parameters for specific heatmap or session recording
   * @returns Promise with the heatmap details
   */
  getHeatmap(params: HSRConfigParams): Promise<any> {
    return this.client.request("HeatmapSessionRecording.getHeatmap", params);
  }

  /**
   * Get a specific session recording
   *
   * @param params Parameters for specific heatmap or session recording
   * @returns Promise with the session recording details
   */
  getSessionRecording(params: HSRConfigParams): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.getSessionRecording",
      params
    );
  }

  /**
   * Pause a heatmap
   *
   * @param params Parameters for specific heatmap or session recording
   * @returns Promise with the API response
   */
  pauseHeatmap(params: HSRConfigParams): Promise<any> {
    return this.client.request("HeatmapSessionRecording.pauseHeatmap", params);
  }

  /**
   * Resume a paused heatmap
   *
   * @param params Parameters for specific heatmap or session recording
   * @returns Promise with the API response
   */
  resumeHeatmap(params: HSRConfigParams): Promise<any> {
    return this.client.request("HeatmapSessionRecording.resumeHeatmap", params);
  }

  /**
   * Delete a heatmap
   *
   * @param params Parameters for specific heatmap or session recording
   * @returns Promise with the API response
   */
  deleteHeatmap(params: HSRConfigParams): Promise<any> {
    return this.client.request("HeatmapSessionRecording.deleteHeatmap", params);
  }

  /**
   * End a heatmap (mark it as completed)
   *
   * @param params Parameters for specific heatmap or session recording
   * @returns Promise with the API response
   */
  endHeatmap(params: HSRConfigParams): Promise<any> {
    return this.client.request("HeatmapSessionRecording.endHeatmap", params);
  }

  /**
   * Pause a session recording
   *
   * @param params Parameters for specific heatmap or session recording
   * @returns Promise with the API response
   */
  pauseSessionRecording(params: HSRConfigParams): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.pauseSessionRecording",
      params
    );
  }

  /**
   * Resume a paused session recording
   *
   * @param params Parameters for specific heatmap or session recording
   * @returns Promise with the API response
   */
  resumeSessionRecording(params: HSRConfigParams): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.resumeSessionRecording",
      params
    );
  }

  /**
   * Delete a session recording
   *
   * @param params Parameters for specific heatmap or session recording
   * @returns Promise with the API response
   */
  deleteSessionRecording(params: HSRConfigParams): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.deleteSessionRecording",
      params
    );
  }

  /**
   * End a session recording (mark it as completed)
   *
   * @param params Parameters for specific heatmap or session recording
   * @returns Promise with the API response
   */
  endSessionRecording(params: HSRConfigParams): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.endSessionRecording",
      params
    );
  }

  /**
   * Get all heatmaps for a site
   *
   * @param params Parameters for getting heatmaps
   * @returns Promise with the list of heatmaps
   */
  getHeatmaps(params: GetHeatmapsParams): Promise<any> {
    return this.client.request("HeatmapSessionRecording.getHeatmaps", params);
  }

  /**
   * Get all session recordings for a site
   *
   * @param params Parameters for site operations
   * @returns Promise with the list of session recordings
   */
  getSessionRecordings(params: HSRSiteParams): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.getSessionRecordings",
      params
    );
  }

  /**
   * Get recorded sessions for a specific session recording configuration
   *
   * @param params Parameters for getting recorded sessions
   * @returns Promise with the list of recorded sessions
   */
  getRecordedSessions(params: RecordedSessionsParams): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.getRecordedSessions",
      params
    );
  }

  /**
   * Get details of a specific recorded session
   *
   * @param params Parameters for recorded session operations
   * @returns Promise with the recorded session details
   */
  getRecordedSession(params: RecordedSessionParams): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.getRecordedSession",
      params
    );
  }

  /**
   * Delete a recorded session
   *
   * @param params Parameters for visit operations
   * @returns Promise with the API response
   */
  deleteRecordedSession(params: VisitParams): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.deleteRecordedSession",
      params
    );
  }

  /**
   * Delete a recorded pageview
   *
   * @param params Parameters for recorded session operations
   * @returns Promise with the API response
   */
  deleteRecordedPageview(params: RecordedSessionParams): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.deleteRecordedPageview",
      params
    );
  }

  /**
   * Get metadata for a recorded heatmap
   *
   * @param params Parameters for getting recorded heatmap metadata
   * @returns Promise with the heatmap metadata
   */
  getRecordedHeatmapMetadata(
    params: RecordedHeatmapMetadataParams
  ): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.getRecordedHeatmapMetadata",
      params
    );
  }

  /**
   * Get recorded heatmap data
   *
   * @param params Parameters for getting recorded heatmap data
   * @returns Promise with the heatmap data
   */
  getRecordedHeatmap(params: RecordedHeatmapParams): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.getRecordedHeatmap",
      params
    );
  }

  /**
   * Get embed information for a session
   *
   * @param params Parameters for recorded session operations
   * @returns Promise with embedding info
   */
  getEmbedSessionInfo(params: RecordedSessionParams): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.getEmbedSessionInfo",
      params
    );
  }

  /**
   * Test if a URL matches the specified page rules
   *
   * @param params Parameters for testing URL match
   * @returns Promise with test results
   */
  testUrlMatchPages(params: TestUrlMatchPagesParams): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.testUrlMatchPages",
      params
    );
  }

  /**
   * Get available statuses for heatmaps and session recordings
   *
   * @returns Promise with available statuses
   */
  getAvailableStatuses(): Promise<any> {
    return this.client.request("HeatmapSessionRecording.getAvailableStatuses");
  }

  /**
   * Get available target page rules
   *
   * @returns Promise with available target page rules
   */
  getAvailableTargetPageRules(): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.getAvailableTargetPageRules"
    );
  }

  /**
   * Get available device types
   *
   * @returns Promise with available device types
   */
  getAvailableDeviceTypes(): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.getAvailableDeviceTypes"
    );
  }

  /**
   * Get available heatmap types
   *
   * @returns Promise with available heatmap types
   */
  getAvailableHeatmapTypes(): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.getAvailableHeatmapTypes"
    );
  }

  /**
   * Get available sample limits for session recordings
   *
   * @returns Promise with available sample limits
   */
  getAvailableSessionRecordingSampleLimits(): Promise<any> {
    return this.client.request(
      "HeatmapSessionRecording.getAvailableSessionRecordingSampleLimits"
    );
  }

  /**
   * Get event types for session recordings
   *
   * @returns Promise with available event types
   */
  getEventTypes(): Promise<any> {
    return this.client.request("HeatmapSessionRecording.getEventTypes");
  }
}
