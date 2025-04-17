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

import { CoreReportingClient, RequestParams } from './core.js';

export class HeatmapSessionRecordingModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Add a new heatmap
   *
   * @param idSite Site ID
   * @param name Heatmap name
   * @param matchPageRules Page matching rules
   * @param sampleLimit Sample limit
   * @param sampleRate Sample rate
   * @param excludedElements Excluded elements
   * @param screenshotUrl Screenshot URL
   * @param breakpointMobile Breakpoint for mobile devices
   * @param breakpointTablet Breakpoint for tablet devices
   * @param captureDomManually Flag to capture DOM manually
   * @returns Promise with the API response
   */
  addHeatmap(
    idSite: number | string,
    name: string,
    matchPageRules: string | string[],
    sampleLimit: number | string = '1000',
    sampleRate: number | string = '5',
    excludedElements: string = '',
    screenshotUrl: string = '',
    breakpointMobile: string = '',
    breakpointTablet: string = '',
    captureDomManually: boolean | string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      name,
      matchPageRules,
      sampleLimit,
      sampleRate,
    };

    if (excludedElements) params.excludedElements = excludedElements;
    if (screenshotUrl) params.screenshotUrl = screenshotUrl;
    if (breakpointMobile) params.breakpointMobile = breakpointMobile;
    if (breakpointTablet) params.breakpointTablet = breakpointTablet;
    if (captureDomManually !== '')
      params.captureDomManually = captureDomManually;

    return this.client.request('HeatmapSessionRecording.addHeatmap', params);
  }

  /**
   * Update an existing heatmap
   *
   * @param idSite Site ID
   * @param idSiteHsr Heatmap configuration ID
   * @param name Heatmap name
   * @param matchPageRules Page matching rules
   * @param sampleLimit Sample limit
   * @param sampleRate Sample rate
   * @param excludedElements Excluded elements
   * @param screenshotUrl Screenshot URL
   * @param breakpointMobile Breakpoint for mobile devices
   * @param breakpointTablet Breakpoint for tablet devices
   * @param captureDomManually Flag to capture DOM manually
   * @returns Promise with the API response
   */
  updateHeatmap(
    idSite: number | string,
    idSiteHsr: number | string,
    name: string,
    matchPageRules: string | string[],
    sampleLimit: number | string = '1000',
    sampleRate: number | string = '5',
    excludedElements: string = '',
    screenshotUrl: string = '',
    breakpointMobile: string = '',
    breakpointTablet: string = '',
    captureDomManually: boolean | string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      idSiteHsr,
      name,
      matchPageRules,
      sampleLimit,
      sampleRate,
    };

    if (excludedElements) params.excludedElements = excludedElements;
    if (screenshotUrl) params.screenshotUrl = screenshotUrl;
    if (breakpointMobile) params.breakpointMobile = breakpointMobile;
    if (breakpointTablet) params.breakpointTablet = breakpointTablet;
    if (captureDomManually !== '')
      params.captureDomManually = captureDomManually;

    return this.client.request('HeatmapSessionRecording.updateHeatmap', params);
  }

  /**
   * Delete a heatmap screenshot
   *
   * @param idSite Site ID
   * @param idSiteHsr Heatmap configuration ID
   * @returns Promise with the API response
   */
  deleteHeatmapScreenshot(
    idSite: number | string,
    idSiteHsr: number | string
  ): Promise<any> {
    return this.client.request(
      'HeatmapSessionRecording.deleteHeatmapScreenshot',
      {
        idSite,
        idSiteHsr,
      }
    );
  }

  /**
   * Add a new session recording
   *
   * @param idSite Site ID
   * @param name Session recording name
   * @param matchPageRules Page matching rules
   * @param sampleLimit Sample limit
   * @param sampleRate Sample rate
   * @param minSessionTime Minimum session time
   * @param requiresActivity Whether activity is required
   * @param captureKeystrokes Whether to capture keystrokes
   * @returns Promise with the API response
   */
  addSessionRecording(
    idSite: number | string,
    name: string,
    matchPageRules: string | string[] = 'Array',
    sampleLimit: number | string = '1000',
    sampleRate: number | string = '10',
    minSessionTime: number | string = '0',
    requiresActivity: boolean | string = '1',
    captureKeystrokes: boolean | string = '1'
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      name,
      matchPageRules,
      sampleLimit,
      sampleRate,
      minSessionTime,
      requiresActivity,
      captureKeystrokes,
    };

    return this.client.request(
      'HeatmapSessionRecording.addSessionRecording',
      params
    );
  }

  /**
   * Update an existing session recording
   *
   * @param idSite Site ID
   * @param idSiteHsr Session recording configuration ID
   * @param name Session recording name
   * @param matchPageRules Page matching rules
   * @param sampleLimit Sample limit
   * @param sampleRate Sample rate
   * @param minSessionTime Minimum session time
   * @param requiresActivity Whether activity is required
   * @param captureKeystrokes Whether to capture keystrokes
   * @returns Promise with the API response
   */
  updateSessionRecording(
    idSite: number | string,
    idSiteHsr: number | string,
    name: string,
    matchPageRules: string | string[] = 'Array',
    sampleLimit: number | string = '1000',
    sampleRate: number | string = '10',
    minSessionTime: number | string = '0',
    requiresActivity: boolean | string = '1',
    captureKeystrokes: boolean | string = '1'
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      idSiteHsr,
      name,
      matchPageRules,
      sampleLimit,
      sampleRate,
      minSessionTime,
      requiresActivity,
      captureKeystrokes,
    };

    return this.client.request(
      'HeatmapSessionRecording.updateSessionRecording',
      params
    );
  }

  /**
   * Get a specific heatmap
   *
   * @param idSite Site ID
   * @param idSiteHsr Heatmap configuration ID
   * @returns Promise with the heatmap details
   */
  getHeatmap(
    idSite: number | string,
    idSiteHsr: number | string
  ): Promise<any> {
    return this.client.request('HeatmapSessionRecording.getHeatmap', {
      idSite,
      idSiteHsr,
    });
  }

  /**
   * Get a specific session recording
   *
   * @param idSite Site ID
   * @param idSiteHsr Session recording configuration ID
   * @returns Promise with the session recording details
   */
  getSessionRecording(
    idSite: number | string,
    idSiteHsr: number | string
  ): Promise<any> {
    return this.client.request('HeatmapSessionRecording.getSessionRecording', {
      idSite,
      idSiteHsr,
    });
  }

  /**
   * Pause a heatmap
   *
   * @param idSite Site ID
   * @param idSiteHsr Heatmap configuration ID
   * @returns Promise with the API response
   */
  pauseHeatmap(
    idSite: number | string,
    idSiteHsr: number | string
  ): Promise<any> {
    return this.client.request('HeatmapSessionRecording.pauseHeatmap', {
      idSite,
      idSiteHsr,
    });
  }

  /**
   * Resume a paused heatmap
   *
   * @param idSite Site ID
   * @param idSiteHsr Heatmap configuration ID
   * @returns Promise with the API response
   */
  resumeHeatmap(
    idSite: number | string,
    idSiteHsr: number | string
  ): Promise<any> {
    return this.client.request('HeatmapSessionRecording.resumeHeatmap', {
      idSite,
      idSiteHsr,
    });
  }

  /**
   * Delete a heatmap
   *
   * @param idSite Site ID
   * @param idSiteHsr Heatmap configuration ID
   * @returns Promise with the API response
   */
  deleteHeatmap(
    idSite: number | string,
    idSiteHsr: number | string
  ): Promise<any> {
    return this.client.request('HeatmapSessionRecording.deleteHeatmap', {
      idSite,
      idSiteHsr,
    });
  }

  /**
   * End a heatmap (mark it as completed)
   *
   * @param idSite Site ID
   * @param idSiteHsr Heatmap configuration ID
   * @returns Promise with the API response
   */
  endHeatmap(
    idSite: number | string,
    idSiteHsr: number | string
  ): Promise<any> {
    return this.client.request('HeatmapSessionRecording.endHeatmap', {
      idSite,
      idSiteHsr,
    });
  }

  /**
   * Pause a session recording
   *
   * @param idSite Site ID
   * @param idSiteHsr Session recording configuration ID
   * @returns Promise with the API response
   */
  pauseSessionRecording(
    idSite: number | string,
    idSiteHsr: number | string
  ): Promise<any> {
    return this.client.request(
      'HeatmapSessionRecording.pauseSessionRecording',
      {
        idSite,
        idSiteHsr,
      }
    );
  }

  /**
   * Resume a paused session recording
   *
   * @param idSite Site ID
   * @param idSiteHsr Session recording configuration ID
   * @returns Promise with the API response
   */
  resumeSessionRecording(
    idSite: number | string,
    idSiteHsr: number | string
  ): Promise<any> {
    return this.client.request(
      'HeatmapSessionRecording.resumeSessionRecording',
      {
        idSite,
        idSiteHsr,
      }
    );
  }

  /**
   * Delete a session recording
   *
   * @param idSite Site ID
   * @param idSiteHsr Session recording configuration ID
   * @returns Promise with the API response
   */
  deleteSessionRecording(
    idSite: number | string,
    idSiteHsr: number | string
  ): Promise<any> {
    return this.client.request(
      'HeatmapSessionRecording.deleteSessionRecording',
      {
        idSite,
        idSiteHsr,
      }
    );
  }

  /**
   * End a session recording (mark it as completed)
   *
   * @param idSite Site ID
   * @param idSiteHsr Session recording configuration ID
   * @returns Promise with the API response
   */
  endSessionRecording(
    idSite: number | string,
    idSiteHsr: number | string
  ): Promise<any> {
    return this.client.request('HeatmapSessionRecording.endSessionRecording', {
      idSite,
      idSiteHsr,
    });
  }

  /**
   * Get all heatmaps for a site
   *
   * @param idSite Site ID
   * @param includePageTreeMirror Whether to include page tree mirror information
   * @returns Promise with the list of heatmaps
   */
  getHeatmaps(
    idSite: number | string,
    includePageTreeMirror: boolean | string = '1'
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
    };

    if (includePageTreeMirror !== '1')
      params.includePageTreeMirror = includePageTreeMirror;

    return this.client.request('HeatmapSessionRecording.getHeatmaps', params);
  }

  /**
   * Get all session recordings for a site
   *
   * @param idSite Site ID
   * @returns Promise with the list of session recordings
   */
  getSessionRecordings(idSite: number | string): Promise<any> {
    return this.client.request('HeatmapSessionRecording.getSessionRecordings', {
      idSite,
    });
  }

  /**
   * Get recorded sessions for a specific session recording configuration
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idSiteHsr Session recording configuration ID
   * @param segment Optional segment definition
   * @param idSubtable Optional subtable ID
   * @returns Promise with the list of recorded sessions
   */
  getRecordedSessions(
    idSite: number | string,
    period: string,
    date: string,
    idSiteHsr: number | string,
    segment: string = '',
    idSubtable: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idSiteHsr,
    };

    if (segment) params.segment = segment;
    if (idSubtable) params.idSubtable = idSubtable;

    return this.client.request(
      'HeatmapSessionRecording.getRecordedSessions',
      params
    );
  }

  /**
   * Get details of a specific recorded session
   *
   * @param idSite Site ID
   * @param idSiteHsr Session recording configuration ID
   * @param idLogHsr Recorded session ID
   * @returns Promise with the recorded session details
   */
  getRecordedSession(
    idSite: number | string,
    idSiteHsr: number | string,
    idLogHsr: number | string
  ): Promise<any> {
    return this.client.request('HeatmapSessionRecording.getRecordedSession', {
      idSite,
      idSiteHsr,
      idLogHsr,
    });
  }

  /**
   * Delete a recorded session
   *
   * @param idSite Site ID
   * @param idSiteHsr Session recording configuration ID
   * @param idVisit Visit ID
   * @returns Promise with the API response
   */
  deleteRecordedSession(
    idSite: number | string,
    idSiteHsr: number | string,
    idVisit: number | string
  ): Promise<any> {
    return this.client.request(
      'HeatmapSessionRecording.deleteRecordedSession',
      {
        idSite,
        idSiteHsr,
        idVisit,
      }
    );
  }

  /**
   * Delete a recorded pageview
   *
   * @param idSite Site ID
   * @param idSiteHsr Recording configuration ID
   * @param idLogHsr Recorded pageview ID
   * @returns Promise with the API response
   */
  deleteRecordedPageview(
    idSite: number | string,
    idSiteHsr: number | string,
    idLogHsr: number | string
  ): Promise<any> {
    return this.client.request(
      'HeatmapSessionRecording.deleteRecordedPageview',
      {
        idSite,
        idSiteHsr,
        idLogHsr,
      }
    );
  }

  /**
   * Get metadata for a recorded heatmap
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idSiteHsr Heatmap configuration ID
   * @param segment Optional segment definition
   * @returns Promise with the heatmap metadata
   */
  getRecordedHeatmapMetadata(
    idSite: number | string,
    period: string,
    date: string,
    idSiteHsr: number | string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idSiteHsr,
    };

    if (segment) params.segment = segment;

    return this.client.request(
      'HeatmapSessionRecording.getRecordedHeatmapMetadata',
      params
    );
  }

  /**
   * Get recorded heatmap data
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idSiteHsr Heatmap configuration ID
   * @param heatmapType Heatmap type
   * @param deviceType Device type
   * @param segment Optional segment definition
   * @returns Promise with the heatmap data
   */
  getRecordedHeatmap(
    idSite: number | string,
    period: string,
    date: string,
    idSiteHsr: number | string,
    heatmapType: string,
    deviceType: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idSiteHsr,
      heatmapType,
      deviceType,
    };

    if (segment) params.segment = segment;

    return this.client.request(
      'HeatmapSessionRecording.getRecordedHeatmap',
      params
    );
  }

  /**
   * Get embed information for a session
   *
   * @param idSite Site ID
   * @param idSiteHsr Session recording configuration ID
   * @param idLogHsr Recorded session ID
   * @returns Promise with embedding info
   */
  getEmbedSessionInfo(
    idSite: number | string,
    idSiteHsr: number | string,
    idLogHsr: number | string
  ): Promise<any> {
    return this.client.request('HeatmapSessionRecording.getEmbedSessionInfo', {
      idSite,
      idSiteHsr,
      idLogHsr,
    });
  }

  /**
   * Test if a URL matches the specified page rules
   *
   * @param url URL to test
   * @param matchPageRules Page matching rules
   * @returns Promise with test results
   */
  testUrlMatchPages(
    url: string,
    matchPageRules: string | string[] = 'Array'
  ): Promise<any> {
    return this.client.request('HeatmapSessionRecording.testUrlMatchPages', {
      url,
      matchPageRules,
    });
  }

  /**
   * Get available statuses for heatmaps and session recordings
   *
   * @returns Promise with available statuses
   */
  getAvailableStatuses(): Promise<any> {
    return this.client.request('HeatmapSessionRecording.getAvailableStatuses');
  }

  /**
   * Get available target page rules
   *
   * @returns Promise with available target page rules
   */
  getAvailableTargetPageRules(): Promise<any> {
    return this.client.request(
      'HeatmapSessionRecording.getAvailableTargetPageRules'
    );
  }

  /**
   * Get available device types
   *
   * @returns Promise with available device types
   */
  getAvailableDeviceTypes(): Promise<any> {
    return this.client.request(
      'HeatmapSessionRecording.getAvailableDeviceTypes'
    );
  }

  /**
   * Get available heatmap types
   *
   * @returns Promise with available heatmap types
   */
  getAvailableHeatmapTypes(): Promise<any> {
    return this.client.request(
      'HeatmapSessionRecording.getAvailableHeatmapTypes'
    );
  }

  /**
   * Get available sample limits for session recordings
   *
   * @returns Promise with available sample limits
   */
  getAvailableSessionRecordingSampleLimits(): Promise<any> {
    return this.client.request(
      'HeatmapSessionRecording.getAvailableSessionRecordingSampleLimits'
    );
  }

  /**
   * Get event types for session recordings
   *
   * @returns Promise with available event types
   */
  getEventTypes(): Promise<any> {
    return this.client.request('HeatmapSessionRecording.getEventTypes');
  }
}
