/**
 * Matomo CrashAnalytics Module
 * Provides access to the crash analytics functionality in Matomo
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class CrashAnalyticsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Search for crash messages that could be merged
   *
   * @param idSite Site ID
   * @param resourceUri Optional resource URI filter
   * @param searchTerm Optional search term to filter crash messages
   * @param limit Maximum number of results to return
   * @param offset Offset for pagination
   * @param excludeIdLogCrashes Array of crash IDs to exclude from results
   * @returns List of crash messages that could be merged
   */
  async searchCrashMessagesForMerge(
    idSite: string | number,
    resourceUri: string = '',
    searchTerm: string = '',
    limit: string | number = '10',
    offset: string | number = '0',
    excludeIdLogCrashes: string | any[] = []
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      resourceUri,
      searchTerm,
      limit,
      offset,
    };

    if (Array.isArray(excludeIdLogCrashes) && excludeIdLogCrashes.length > 0) {
      params.excludeIdLogCrashes = excludeIdLogCrashes;
    } else if (excludeIdLogCrashes && typeof excludeIdLogCrashes === 'string') {
      params.excludeIdLogCrashes = excludeIdLogCrashes;
    }

    return this.client.request(
      'CrashAnalytics.searchCrashMessagesForMerge',
      params
    );
  }

  /**
   * Merge multiple crashes into a single crash group
   *
   * @param idSite Site ID
   * @param idLogCrashes Array of crash IDs to merge
   * @returns Result of the merge operation
   */
  async mergeCrashes(
    idSite: string | number,
    idLogCrashes: string | any[]
  ): Promise<any> {
    return this.client.request('CrashAnalytics.mergeCrashes', {
      idSite,
      idLogCrashes,
    });
  }

  /**
   * Unmerge a crash group, separating the crashes
   *
   * @param idSite Site ID
   * @param idLogCrash ID of the crash group to unmerge
   * @returns Result of the unmerge operation
   */
  async unmergeCrashGroup(
    idSite: string | number,
    idLogCrash: string | number
  ): Promise<any> {
    return this.client.request('CrashAnalytics.unmergeCrashGroup', {
      idSite,
      idLogCrash,
    });
  }

  /**
   * Get all crash groups for a site
   *
   * @param idSite Site ID
   * @returns List of crash groups
   */
  async getCrashGroups(idSite: string | number): Promise<any> {
    return this.client.request('CrashAnalytics.getCrashGroups', {
      idSite,
    });
  }

  /**
   * Get all crash types for a site
   *
   * @param idSite Site ID
   * @param filter_limit Optional limit on the number of results
   * @returns List of crash types
   */
  async getCrashTypes(
    idSite: string | number,
    filter_limit: string | number = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
    };

    if (filter_limit !== '') {
      params.filter_limit = filter_limit;
    }

    return this.client.request('CrashAnalytics.getCrashTypes', params);
  }

  /**
   * Set a crash to be ignored or unignored
   *
   * @param idSite Site ID
   * @param idLogCrash Crash ID to ignore/unignore
   * @param ignore 1 to ignore, 0 to unignore
   * @returns Result of the operation
   */
  async setIgnoreCrash(
    idSite: string | number,
    idLogCrash: string | number,
    ignore: string | number = '1'
  ): Promise<any> {
    return this.client.request('CrashAnalytics.setIgnoreCrash', {
      idSite,
      idLogCrash,
      ignore,
    });
  }

  /**
   * Get all ignored crashes for a site
   *
   * @param idSite Site ID
   * @returns List of ignored crashes
   */
  async getIgnoredCrashes(idSite: string | number): Promise<any> {
    return this.client.request('CrashAnalytics.getIgnoredCrashes', {
      idSite,
    });
  }

  /**
   * Get summary information about a specific crash
   *
   * @param idSite Site ID
   * @param idLogCrash Crash ID
   * @returns Summary information about the crash
   */
  async getCrashSummary(
    idSite: string | number,
    idLogCrash: string | number
  ): Promise<any> {
    return this.client.request('CrashAnalytics.getCrashSummary', {
      idSite,
      idLogCrash,
    });
  }

  /**
   * Get information about the visit context in which a crash occurred
   *
   * @param idLogCrash Crash ID
   * @param idSite Site ID
   * @param period Period to look for context (day, week, month, year, etc.)
   * @param date Date string
   * @param segment Optional segment definition
   * @param filter_limit Maximum number of actions to return
   * @param filter_offset Offset for pagination
   * @param fetchRecentActions Whether to fetch recent actions before the crash
   * @returns Visit context information for the crash
   */
  async getCrashVisitContext(
    idLogCrash: string | number,
    idSite: string | number,
    period: string,
    date: string,
    segment: string = '',
    filter_limit: string | number = '5',
    filter_offset: string | number = '0',
    fetchRecentActions: string | number = '1'
  ): Promise<any> {
    const params: RequestParams = {
      idLogCrash,
      idSite,
      period,
      date,
      filter_limit,
      filter_offset,
      fetchRecentActions,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request('CrashAnalytics.getCrashVisitContext', params);
  }

  /**
   * Get all crashes for a site
   *
   * @param idSite Site ID
   * @param filter_sort_column Column to sort by
   * @param filter_sort_order Sort order (asc or desc)
   * @param filter_limit Maximum number of results
   * @param filter_offset Offset for pagination
   * @returns List of all crashes
   */
  async getAllCrashes(
    idSite: string | number,
    filter_sort_column: string = 'datetime_last_seen',
    filter_sort_order: string = 'desc',
    filter_limit: string | number = '10',
    filter_offset: string | number = '0'
  ): Promise<any> {
    return this.client.request('CrashAnalytics.getAllCrashes', {
      idSite,
      filter_sort_column,
      filter_sort_order,
      filter_limit,
      filter_offset,
    });
  }

  /**
   * Get crash analytics metrics
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param segment Optional segment definition
   * @param columns Optional columns to restrict the returned data
   * @returns Crash analytics metrics
   */
  async get(
    idSite: string | number,
    period: string,
    date: string,
    segment: string = '',
    columns: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) {
      params.segment = segment;
    }

    if (columns) {
      params.columns = columns;
    }

    return this.client.request('CrashAnalytics.get', params);
  }

  /**
   * Get all crash messages
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param segment Optional segment definition
   * @returns All crash messages
   */
  async getAllCrashMessages(
    idSite: string | number,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request('CrashAnalytics.getAllCrashMessages', params);
  }

  /**
   * Get crash messages
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Crash messages
   */
  async getCrashMessages(
    idSite: string | number,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request('CrashAnalytics.getCrashMessages', params);
  }

  /**
   * Get unidentified crash messages
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Unidentified crash messages
   */
  async getUnidentifiedCrashMessages(
    idSite: string | number,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request(
      'CrashAnalytics.getUnidentifiedCrashMessages',
      params
    );
  }

  /**
   * Get crashes that have disappeared
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Disappeared crashes
   */
  async getDisappearedCrashes(
    idSite: string | number,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request('CrashAnalytics.getDisappearedCrashes', params);
  }

  /**
   * Get crashes that have reappeared
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Reappeared crashes
   */
  async getReappearedCrashes(
    idSite: string | number,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request('CrashAnalytics.getReappearedCrashes', params);
  }

  /**
   * Get new crashes
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param segment Optional segment definition
   * @returns New crashes
   */
  async getNewCrashes(
    idSite: string | number,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request('CrashAnalytics.getNewCrashes', params);
  }

  /**
   * Get crashes by page URL
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the results
   * @param flat Whether to return a flat array
   * @returns Crashes by page URL
   */
  async getCrashesByPageUrl(
    idSite: string | number,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | number = '',
    flat: string | number = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) {
      params.segment = segment;
    }

    if (expanded !== '') {
      params.expanded = expanded;
    }

    if (flat !== '') {
      params.flat = flat;
    }

    return this.client.request('CrashAnalytics.getCrashesByPageUrl', params);
  }

  /**
   * Get crashes for a specific page URL
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param idSubtable Subtable ID
   * @param segment Optional segment definition
   * @returns Crashes for the specified page URL
   */
  async getCrashesForPageUrl(
    idSite: string | number,
    period: string,
    date: string,
    idSubtable: string | number,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idSubtable,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request('CrashAnalytics.getCrashesForPageUrl', params);
  }

  /**
   * Get crashes by page title
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the results
   * @param flat Whether to return a flat array
   * @returns Crashes by page title
   */
  async getCrashesByPageTitle(
    idSite: string | number,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | number = '',
    flat: string | number = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) {
      params.segment = segment;
    }

    if (expanded !== '') {
      params.expanded = expanded;
    }

    if (flat !== '') {
      params.flat = flat;
    }

    return this.client.request('CrashAnalytics.getCrashesByPageTitle', params);
  }

  /**
   * Get crashes for a specific page title
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param idSubtable Subtable ID
   * @param segment Optional segment definition
   * @returns Crashes for the specified page title
   */
  async getCrashesForPageTitle(
    idSite: string | number,
    period: string,
    date: string,
    idSubtable: string | number,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idSubtable,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request('CrashAnalytics.getCrashesForPageTitle', params);
  }

  /**
   * Get crashes by source file
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the results
   * @param flat Whether to return a flat array
   * @returns Crashes by source file
   */
  async getCrashesBySource(
    idSite: string | number,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | number = '',
    flat: string | number = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) {
      params.segment = segment;
    }

    if (expanded !== '') {
      params.expanded = expanded;
    }

    if (flat !== '') {
      params.flat = flat;
    }

    return this.client.request('CrashAnalytics.getCrashesBySource', params);
  }

  /**
   * Get crashes for a specific source file
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param idSubtable Subtable ID
   * @param segment Optional segment definition
   * @returns Crashes for the specified source file
   */
  async getCrashesForSource(
    idSite: string | number,
    period: string,
    date: string,
    idSubtable: string | number,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idSubtable,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request('CrashAnalytics.getCrashesForSource', params);
  }

  /**
   * Get crashes by category
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the results
   * @param flat Whether to return a flat array
   * @returns Crashes by category
   */
  async getCrashesByCategory(
    idSite: string | number,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | number = '',
    flat: string | number = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) {
      params.segment = segment;
    }

    if (expanded !== '') {
      params.expanded = expanded;
    }

    if (flat !== '') {
      params.flat = flat;
    }

    return this.client.request('CrashAnalytics.getCrashesByCategory', params);
  }

  /**
   * Get crashes for a specific category
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param idSubtable Subtable ID
   * @param segment Optional segment definition
   * @returns Crashes for the specified category
   */
  async getCrashesForCategory(
    idSite: string | number,
    period: string,
    date: string,
    idSubtable: string | number,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idSubtable,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request('CrashAnalytics.getCrashesForCategory', params);
  }

  /**
   * Get crashes from first-party sources
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param segment Optional segment definition
   * @returns First-party crashes
   */
  async getCrashesByFirstParty(
    idSite: string | number,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request('CrashAnalytics.getCrashesByFirstParty', params);
  }

  /**
   * Get crashes from third-party sources
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Third-party crashes
   */
  async getCrashesByThirdParty(
    idSite: string | number,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request('CrashAnalytics.getCrashesByThirdParty', params);
  }

  /**
   * Get an overview of recent crashes
   *
   * @param idSite Site ID
   * @param segment Optional segment definition
   * @param lastMinutes Number of minutes to look back
   * @returns Overview of recent crashes
   */
  async getLastCrashesOverview(
    idSite: string | number,
    segment: string = '',
    lastMinutes: string | number = '30'
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      lastMinutes,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request('CrashAnalytics.getLastCrashesOverview', params);
  }

  /**
   * Get the most frequent recent crashes
   *
   * @param idSite Site ID
   * @param segment Optional segment definition
   * @param lastMinutes Number of minutes to look back
   * @param filter_limit Maximum number of results
   * @returns Most frequent recent crashes
   */
  async getLastTopCrashes(
    idSite: string | number,
    segment: string = '',
    lastMinutes: string | number = '30',
    filter_limit: string | number = '5'
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      lastMinutes,
      filter_limit,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request('CrashAnalytics.getLastTopCrashes', params);
  }

  /**
   * Get new crashes that occurred recently
   *
   * @param idSite Site ID
   * @param segment Optional segment definition
   * @param lastMinutes Number of minutes to look back
   * @param filter_limit Maximum number of results
   * @returns New crashes that occurred recently
   */
  async getLastNewCrashes(
    idSite: string | number,
    segment: string = '',
    lastMinutes: string | number = '30',
    filter_limit: string | number = '10'
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      lastMinutes,
      filter_limit,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request('CrashAnalytics.getLastNewCrashes', params);
  }

  /**
   * Get crashes that reappeared recently
   *
   * @param idSite Site ID
   * @param segment Optional segment definition
   * @param lastMinutes Number of minutes to look back
   * @param filter_limit Maximum number of results
   * @returns Crashes that reappeared recently
   */
  async getLastReappearedCrashes(
    idSite: string | number,
    segment: string = '',
    lastMinutes: string | number = '30',
    filter_limit: string | number = '10'
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      lastMinutes,
      filter_limit,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request(
      'CrashAnalytics.getLastReappearedCrashes',
      params
    );
  }

  /**
   * Get crashes that disappeared recently
   *
   * @param idSite Site ID
   * @param segment Optional segment definition
   * @param lastMinutes Number of minutes to look back
   * @param filter_limit Maximum number of results
   * @returns Crashes that disappeared recently
   */
  async getLastDisappearedCrashes(
    idSite: string | number,
    segment: string = '',
    lastMinutes: string | number = '30',
    filter_limit: string | number = '10'
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      lastMinutes,
      filter_limit,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request(
      'CrashAnalytics.getLastDisappearedCrashes',
      params
    );
  }
}
