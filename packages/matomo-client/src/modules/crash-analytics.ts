/**
 * Matomo CrashAnalytics Module
 * Provides access to the crash analytics functionality in Matomo
 */

import { CoreReportingClient, RequestParams } from "./core.js";

/**
 * Parameters for site-specific operations
 */
export interface SiteParams extends RequestParams {
  /** Site ID */
  idSite: string | number;
}

/**
 * Parameters for search crash messages for merge
 */
export interface SearchCrashMessagesForMergeParams extends SiteParams {
  /** Optional resource URI filter */
  resourceUri?: string;
  /** Optional search term to filter crash messages */
  searchTerm?: string;
  /** Maximum number of results to return */
  limit?: string | number;
  /** Offset for pagination */
  offset?: string | number;
  /** Array of crash IDs to exclude from results */
  excludeIdLogCrashes?: string | any[];
}

/**
 * Parameters for merging crashes
 */
export interface MergeCrashesParams extends SiteParams {
  /** Array of crash IDs to merge */
  idLogCrashes: string | any[];
}

/**
 * Parameters for unmerging a crash group
 */
export interface UnmergeCrashGroupParams extends SiteParams {
  /** ID of the crash group to unmerge */
  idLogCrash: string | number;
}

/**
 * Parameters for getting crash types
 */
export interface GetCrashTypesParams extends SiteParams {
  /** Optional limit on the number of results */
  filter_limit?: string | number;
}

/**
 * Parameters for setting ignore crash status
 */
export interface SetIgnoreCrashParams extends SiteParams {
  /** Crash ID to ignore/unignore */
  idLogCrash: string | number;
  /** 1 to ignore, 0 to unignore */
  ignore?: string | number;
}

/**
 * Parameters for getting crash summary
 */
export interface GetCrashSummaryParams extends SiteParams {
  /** Crash ID */
  idLogCrash: string | number;
}

/**
 * Parameters for getting crash visit context
 */
export interface GetCrashVisitContextParams extends RequestParams {
  /** Crash ID */
  idLogCrash: string | number;
  /** Site ID */
  idSite: string | number;
  /** Period to look for context (day, week, month, year, etc.) */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
  /** Maximum number of actions to return */
  filter_limit?: string | number;
  /** Offset for pagination */
  filter_offset?: string | number;
  /** Whether to fetch recent actions before the crash */
  fetchRecentActions?: string | number;
}

/**
 * Parameters for getting all crashes
 */
export interface GetAllCrashesParams extends SiteParams {
  /** Column to sort by */
  filter_sort_column?: string;
  /** Sort order (asc or desc) */
  filter_sort_order?: string;
  /** Maximum number of results */
  filter_limit?: string | number;
  /** Offset for pagination */
  filter_offset?: string | number;
}

/**
 * Common parameters for crash reports
 */
export interface CrashReportParams extends SiteParams {
  /** Period (day, week, month, year, etc.) */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for general crash analytics
 */
export interface GetCrashAnalyticsParams extends CrashReportParams {
  /** Optional columns to restrict the returned data */
  columns?: string;
}

/**
 * Parameters for crashes by URL or title reports
 */
export interface CrashesByParams extends CrashReportParams {
  /** Whether to expand the results */
  expanded?: string | number;
  /** Whether to return a flat array */
  flat?: string | number;
}

/**
 * Parameters for crashes for specific subtable
 */
export interface CrashesForParams extends CrashReportParams {
  /** Subtable ID */
  idSubtable: string | number;
}

/**
 * Parameters for getting recent crashes
 */
export interface RecentCrashesParams extends SiteParams {
  /** Optional segment definition */
  segment?: string;
  /** Number of minutes to look back */
  lastMinutes?: string | number;
  /** Maximum number of results */
  filter_limit?: string | number;
}

export class CrashAnalyticsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Search for crash messages that could be merged
   *
   * @param params Parameters for searching crash messages for merge
   * @returns List of crash messages that could be merged
   */
  async searchCrashMessagesForMerge(
    params: SearchCrashMessagesForMergeParams
  ): Promise<any> {
    return this.client.request(
      "CrashAnalytics.searchCrashMessagesForMerge",
      params
    );
  }

  /**
   * Merge multiple crashes into a single crash group
   *
   * @param params Parameters for merging crashes
   * @returns Result of the merge operation
   */
  async mergeCrashes(params: MergeCrashesParams): Promise<any> {
    return this.client.request("CrashAnalytics.mergeCrashes", params);
  }

  /**
   * Unmerge a crash group, separating the crashes
   *
   * @param params Parameters for unmerging a crash group
   * @returns Result of the unmerge operation
   */
  async unmergeCrashGroup(params: UnmergeCrashGroupParams): Promise<any> {
    return this.client.request("CrashAnalytics.unmergeCrashGroup", params);
  }

  /**
   * Get all crash groups for a site
   *
   * @param params Parameters containing the site ID
   * @returns List of crash groups
   */
  async getCrashGroups(params: SiteParams): Promise<any> {
    return this.client.request("CrashAnalytics.getCrashGroups", params);
  }

  /**
   * Get all crash types for a site
   *
   * @param params Parameters for getting crash types
   * @returns List of crash types
   */
  async getCrashTypes(params: GetCrashTypesParams): Promise<any> {
    return this.client.request("CrashAnalytics.getCrashTypes", params);
  }

  /**
   * Set a crash to be ignored or unignored
   *
   * @param params Parameters for setting ignore status
   * @returns Result of the operation
   */
  async setIgnoreCrash(params: SetIgnoreCrashParams): Promise<any> {
    return this.client.request("CrashAnalytics.setIgnoreCrash", params);
  }

  /**
   * Get all ignored crashes for a site
   *
   * @param params Parameters containing the site ID
   * @returns List of ignored crashes
   */
  async getIgnoredCrashes(params: SiteParams): Promise<any> {
    return this.client.request("CrashAnalytics.getIgnoredCrashes", params);
  }

  /**
   * Get summary information about a specific crash
   *
   * @param params Parameters for getting crash summary
   * @returns Summary information about the crash
   */
  async getCrashSummary(params: GetCrashSummaryParams): Promise<any> {
    return this.client.request("CrashAnalytics.getCrashSummary", params);
  }

  /**
   * Get information about the visit context in which a crash occurred
   *
   * @param params Parameters for getting crash visit context
   * @returns Visit context information for the crash
   */
  async getCrashVisitContext(params: GetCrashVisitContextParams): Promise<any> {
    return this.client.request("CrashAnalytics.getCrashVisitContext", params);
  }

  /**
   * Get all crashes for a site
   *
   * @param params Parameters for getting all crashes
   * @returns List of all crashes
   */
  async getAllCrashes(params: GetAllCrashesParams): Promise<any> {
    return this.client.request("CrashAnalytics.getAllCrashes", params);
  }

  /**
   * Get crash analytics metrics
   *
   * @param params Parameters for getting crash analytics
   * @returns Crash analytics metrics
   */
  async get(params: GetCrashAnalyticsParams): Promise<any> {
    return this.client.request("CrashAnalytics.get", params);
  }

  /**
   * Get all crash messages
   *
   * @param params Parameters for getting all crash messages
   * @returns All crash messages
   */
  async getAllCrashMessages(params: CrashReportParams): Promise<any> {
    return this.client.request("CrashAnalytics.getAllCrashMessages", params);
  }

  /**
   * Get crash messages
   *
   * @param params Parameters for getting crash messages
   * @returns Crash messages
   */
  async getCrashMessages(params: CrashReportParams): Promise<any> {
    return this.client.request("CrashAnalytics.getCrashMessages", params);
  }

  /**
   * Get unidentified crash messages
   *
   * @param params Parameters for getting unidentified crash messages
   * @returns Unidentified crash messages
   */
  async getUnidentifiedCrashMessages(params: CrashReportParams): Promise<any> {
    return this.client.request(
      "CrashAnalytics.getUnidentifiedCrashMessages",
      params
    );
  }

  /**
   * Get crashes that have disappeared
   *
   * @param params Parameters for getting disappeared crashes
   * @returns Disappeared crashes
   */
  async getDisappearedCrashes(params: CrashReportParams): Promise<any> {
    return this.client.request("CrashAnalytics.getDisappearedCrashes", params);
  }

  /**
   * Get crashes that have reappeared
   *
   * @param params Parameters for getting reappeared crashes
   * @returns Reappeared crashes
   */
  async getReappearedCrashes(params: CrashReportParams): Promise<any> {
    return this.client.request("CrashAnalytics.getReappearedCrashes", params);
  }

  /**
   * Get new crashes
   *
   * @param params Parameters for getting new crashes
   * @returns New crashes
   */
  async getNewCrashes(params: CrashReportParams): Promise<any> {
    return this.client.request("CrashAnalytics.getNewCrashes", params);
  }

  /**
   * Get crashes by page URL
   *
   * @param params Parameters for getting crashes by page URL
   * @returns Crashes by page URL
   */
  async getCrashesByPageUrl(params: CrashesByParams): Promise<any> {
    return this.client.request("CrashAnalytics.getCrashesByPageUrl", params);
  }

  /**
   * Get crashes for a specific page URL
   *
   * @param params Parameters for getting crashes for page URL
   * @returns Crashes for the specified page URL
   */
  async getCrashesForPageUrl(params: CrashesForParams): Promise<any> {
    return this.client.request("CrashAnalytics.getCrashesForPageUrl", params);
  }

  /**
   * Get crashes by page title
   *
   * @param params Parameters for getting crashes by page title
   * @returns Crashes by page title
   */
  async getCrashesByPageTitle(params: CrashesByParams): Promise<any> {
    return this.client.request("CrashAnalytics.getCrashesByPageTitle", params);
  }

  /**
   * Get crashes for a specific page title
   *
   * @param params Parameters for getting crashes for page title
   * @returns Crashes for the specified page title
   */
  async getCrashesForPageTitle(params: CrashesForParams): Promise<any> {
    return this.client.request("CrashAnalytics.getCrashesForPageTitle", params);
  }

  /**
   * Get crashes by source file
   *
   * @param params Parameters for getting crashes by source
   * @returns Crashes by source file
   */
  async getCrashesBySource(params: CrashesByParams): Promise<any> {
    return this.client.request("CrashAnalytics.getCrashesBySource", params);
  }

  /**
   * Get crashes for a specific source file
   *
   * @param params Parameters for getting crashes for source
   * @returns Crashes for the specified source file
   */
  async getCrashesForSource(params: CrashesForParams): Promise<any> {
    return this.client.request("CrashAnalytics.getCrashesForSource", params);
  }

  /**
   * Get crashes by category
   *
   * @param params Parameters for getting crashes by category
   * @returns Crashes by category
   */
  async getCrashesByCategory(params: CrashesByParams): Promise<any> {
    return this.client.request("CrashAnalytics.getCrashesByCategory", params);
  }

  /**
   * Get crashes for a specific category
   *
   * @param params Parameters for getting crashes for category
   * @returns Crashes for the specified category
   */
  async getCrashesForCategory(params: CrashesForParams): Promise<any> {
    return this.client.request("CrashAnalytics.getCrashesForCategory", params);
  }

  /**
   * Get crashes from first-party sources
   *
   * @param params Parameters for getting first-party crashes
   * @returns First-party crashes
   */
  async getCrashesByFirstParty(params: CrashReportParams): Promise<any> {
    return this.client.request("CrashAnalytics.getCrashesByFirstParty", params);
  }

  /**
   * Get crashes from third-party sources
   *
   * @param params Parameters for getting third-party crashes
   * @returns Third-party crashes
   */
  async getCrashesByThirdParty(params: CrashReportParams): Promise<any> {
    return this.client.request("CrashAnalytics.getCrashesByThirdParty", params);
  }

  /**
   * Get an overview of recent crashes
   *
   * @param params Parameters for getting last crashes overview
   * @returns Overview of recent crashes
   */
  async getLastCrashesOverview(params: RecentCrashesParams): Promise<any> {
    return this.client.request("CrashAnalytics.getLastCrashesOverview", params);
  }

  /**
   * Get the most frequent recent crashes
   *
   * @param params Parameters for getting top recent crashes
   * @returns Most frequent recent crashes
   */
  async getLastTopCrashes(params: RecentCrashesParams): Promise<any> {
    return this.client.request("CrashAnalytics.getLastTopCrashes", params);
  }

  /**
   * Get new crashes that occurred recently
   *
   * @param params Parameters for getting recent new crashes
   * @returns New crashes that occurred recently
   */
  async getLastNewCrashes(params: RecentCrashesParams): Promise<any> {
    return this.client.request("CrashAnalytics.getLastNewCrashes", params);
  }

  /**
   * Get crashes that reappeared recently
   *
   * @param params Parameters for getting recent reappeared crashes
   * @returns Crashes that reappeared recently
   */
  async getLastReappearedCrashes(params: RecentCrashesParams): Promise<any> {
    return this.client.request(
      "CrashAnalytics.getLastReappearedCrashes",
      params
    );
  }

  /**
   * Get crashes that disappeared recently
   *
   * @param params Parameters for getting recent disappeared crashes
   * @returns Crashes that disappeared recently
   */
  async getLastDisappearedCrashes(params: RecentCrashesParams): Promise<any> {
    return this.client.request(
      "CrashAnalytics.getLastDisappearedCrashes",
      params
    );
  }
}
