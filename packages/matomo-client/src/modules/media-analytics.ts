/**
 * Matomo MediaAnalytics Module
 * Access to video and audio analytics data for websites and apps
 */

import { CoreReportingClient, RequestParams } from "./core.js";

/**
 * Parameters for site-specific operations
 */
export interface SiteParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
}

/**
 * Basic parameters for media reports
 */
export interface MediaReportParams extends SiteParams {
  /** Period to request data for (day, week, month, year, range) */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for media analytics data
 */
export interface MediaAnalyticsParams extends MediaReportParams {
  /** Optional columns to restrict the returned data */
  columns?: string;
}

/**
 * Parameters for current media metrics
 */
export interface CurrentMediaParams extends SiteParams {
  /** Number of minutes to look back */
  lastMinutes: number | string;
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for current most plays
 */
export interface CurrentMostPlaysParams extends CurrentMediaParams {
  /** Maximum number of results to return */
  filter_limit?: number | string;
}

/**
 * Parameters for media resources
 */
export interface MediaResourcesParams extends MediaReportParams {
  /** Optional subtable ID */
  idSubtable?: string | number;
  /** Optional secondary dimension */
  secondaryDimension?: string;
  /** Whether to expand the resources report */
  expanded?: string | boolean;
  /** Whether to return a flattened report */
  flat?: string | boolean;
}

/**
 * Parameters for media titles
 */
export interface MediaTitlesParams extends MediaReportParams {
  /** Optional subtable ID */
  idSubtable?: string | number;
  /** Optional secondary dimension */
  secondaryDimension?: string;
}

export class MediaAnalyticsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Check if there are any recorded media analytics data
   *
   * @param params Parameters containing the site ID
   */
  async hasRecords(params: SiteParams): Promise<any> {
    return this.client.request("MediaAnalytics.hasRecords", params);
  }

  /**
   * Get media analytics data
   *
   * @param params Parameters for media analytics data
   */
  async get(params: MediaAnalyticsParams): Promise<any> {
    return this.client.request("MediaAnalytics.get", params);
  }

  /**
   * Get the number of media plays in the last N minutes
   *
   * @param params Parameters for current media metrics
   */
  async getCurrentNumPlays(params: CurrentMediaParams): Promise<any> {
    return this.client.request("MediaAnalytics.getCurrentNumPlays", params);
  }

  /**
   * Get the sum of time spent watching media in the last N minutes
   *
   * @param params Parameters for current media metrics
   */
  async getCurrentSumTimeSpent(params: CurrentMediaParams): Promise<any> {
    return this.client.request("MediaAnalytics.getCurrentSumTimeSpent", params);
  }

  /**
   * Get the most played media in the last N minutes
   *
   * @param params Parameters for current most plays
   */
  async getCurrentMostPlays(params: CurrentMostPlaysParams): Promise<any> {
    const requestParams = {
      filter_limit: "5",
      ...params,
    };
    return this.client.request(
      "MediaAnalytics.getCurrentMostPlays",
      requestParams
    );
  }

  /**
   * Get video resources
   *
   * @param params Parameters for media resources
   */
  async getVideoResources(params: MediaResourcesParams): Promise<any> {
    return this.client.request("MediaAnalytics.getVideoResources", params);
  }

  /**
   * Get audio resources
   *
   * @param params Parameters for media resources
   */
  async getAudioResources(params: MediaResourcesParams): Promise<any> {
    return this.client.request("MediaAnalytics.getAudioResources", params);
  }

  /**
   * Get video titles
   *
   * @param params Parameters for media titles
   */
  async getVideoTitles(params: MediaTitlesParams): Promise<any> {
    return this.client.request("MediaAnalytics.getVideoTitles", params);
  }

  /**
   * Get audio titles
   *
   * @param params Parameters for media titles
   */
  async getAudioTitles(params: MediaTitlesParams): Promise<any> {
    return this.client.request("MediaAnalytics.getAudioTitles", params);
  }

  /**
   * Get grouped video resources
   *
   * @param params Parameters for media titles
   */
  async getGroupedVideoResources(params: MediaTitlesParams): Promise<any> {
    return this.client.request(
      "MediaAnalytics.getGroupedVideoResources",
      params
    );
  }

  /**
   * Get grouped audio resources
   *
   * @param params Parameters for media titles
   */
  async getGroupedAudioResources(params: MediaTitlesParams): Promise<any> {
    return this.client.request(
      "MediaAnalytics.getGroupedAudioResources",
      params
    );
  }

  /**
   * Get video hours (videos watched by hour)
   *
   * @param params Parameters for media report
   */
  async getVideoHours(params: MediaReportParams): Promise<any> {
    return this.client.request("MediaAnalytics.getVideoHours", params);
  }

  /**
   * Get audio hours (audio listened by hour)
   *
   * @param params Parameters for media report
   */
  async getAudioHours(params: MediaReportParams): Promise<any> {
    return this.client.request("MediaAnalytics.getAudioHours", params);
  }

  /**
   * Get video resolutions
   *
   * @param params Parameters for media report
   */
  async getVideoResolutions(params: MediaReportParams): Promise<any> {
    return this.client.request("MediaAnalytics.getVideoResolutions", params);
  }

  /**
   * Get players used for media playback
   *
   * @param params Parameters for media report
   */
  async getPlayers(params: MediaReportParams): Promise<any> {
    return this.client.request("MediaAnalytics.getPlayers", params);
  }
}
