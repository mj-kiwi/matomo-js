/**
 * Matomo Live Module
 *
 * The Live! API lets you access complete visit level information about your visitors. Combined with the
 * power of Segmentation, you will be able to request visits filtered by any criteria. The method
 * "getLastVisitsDetails" will return extensive RAW data for each visit, which includes: server time, visitId,
 * visitorId, visitorType (new or returning), number of pages, list of all pages (and events, file downloaded and
 * outlinks clicked), custom variables names and values set to this visit, number of goal conversions (and
 * list of all Goal conversions for this visit, with time of conversion, revenue, URL, etc.), but also other
 * attributes such as: days since last visit, days since first visit, country, continent, visitor IP, provider,
 * referrer used (referrer name, keyword if it was a search engine, full URL), campaign name and keyword, operating
 * system, browser, type of screen, resolution, supported browser plugins (flash, java, silverlight, pdf, etc.),
 * various dates & times format to make it easier for API users... and more!
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for Live API methods
 */
export interface LiveParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
}

/**
 * Parameters for visitor counters
 */
export interface LiveCountersParams extends LiveParams {
  /** Number of minutes to look back when retrieving counters */
  lastMinutes: number | string;
  /** Optional segment definition */
  segment?: string;
  /** Optional columns to show */
  showColumns?: string | string[];
  /** Optional columns to hide */
  hideColumns?: string | string[];
}

/**
 * Parameters for getting last visit details
 */
export interface LastVisitsDetailsParams extends LiveParams {
  /** Optional period to request data for */
  period?: string;
  /** Optional date string */
  date?: string;
  /** Optional segment definition */
  segment?: string;
  /** Optional number of visitors to fetch */
  countVisitorsToFetch?: number | string;
  /** Optional minimum timestamp */
  minTimestamp?: number | string;
  /** Optional flat parameter */
  flat?: boolean | string;
  /** Optional parameter to skip fetching actions */
  doNotFetchActions?: boolean | string;
  /** Optional parameter to get enhanced data */
  enhanced?: boolean | string;
}

/**
 * Parameters for visitor profile
 */
export interface VisitorProfileParams extends LiveParams {
  /** Optional visitor ID */
  visitorId?: string;
  /** Optional segment definition */
  segment?: string;
  /** Optional limit on number of visits */
  limitVisits?: number | string;
}

/**
 * Parameters for most recent visitor ID
 */
export interface MostRecentVisitorParams extends LiveParams {
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for most recent visits date time
 */
export interface MostRecentDateTimeParams extends LiveParams {
  /** Optional period to request data for */
  period?: string | null;
  /** Optional date string */
  date?: string | null;
}

export class LiveModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get visitor counters
   *
   * @param params Parameters for getting visitor counters
   * @returns Promise with visitor counters
   */
  async getCounters(params: LiveCountersParams): Promise<any> {
    const formattedParams = { ...params };

    if (Array.isArray(formattedParams.showColumns)) {
      formattedParams.showColumns = formattedParams.showColumns.join(",");
    }

    if (Array.isArray(formattedParams.hideColumns)) {
      formattedParams.hideColumns = formattedParams.hideColumns.join(",");
    }

    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Live.getCounters", formattedParams);
    }
    return await this.client.request("Live.getCounters", formattedParams);
  }

  /**
   * Check if visitor profile is enabled
   *
   * @param params Parameters containing the site ID
   * @returns Promise with boolean result indicating if visitor profile is enabled
   */
  async isVisitorProfileEnabled(params: LiveParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Live.isVisitorProfileEnabled", params);
    }
    return await this.client.request("Live.isVisitorProfileEnabled", params);
  }

  /**
   * Get details about the last visits
   *
   * @param params Parameters for getting last visits details
   * @returns Promise with visit details
   */
  async getLastVisitsDetails(params: LastVisitsDetailsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Live.getLastVisitsDetails", params);
    }
    return await this.client.request("Live.getLastVisitsDetails", params);
  }

  /**
   * Get visitor profile information
   *
   * @param params Parameters for getting visitor profile
   * @returns Promise with visitor profile information
   */
  async getVisitorProfile(params: VisitorProfileParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Live.getVisitorProfile", params);
    }
    return await this.client.request("Live.getVisitorProfile", params);
  }

  /**
   * Get the most recent visitor ID
   *
   * @param params Parameters for getting most recent visitor ID
   * @returns Promise with the most recent visitor ID
   */
  async getMostRecentVisitorId(params: MostRecentVisitorParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Live.getMostRecentVisitorId", params);
    }
    return await this.client.request("Live.getMostRecentVisitorId", params);
  }

  /**
   * Get most recent visits date time
   *
   * @param params Parameters for getting most recent visits date time
   * @returns Promise with the most recent visits date time
   */
  async getMostRecentVisitsDateTime(
    params: MostRecentDateTimeParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Live.getMostRecentVisitsDateTime", params);
    }
    return await this.client.request(
      "Live.getMostRecentVisitsDateTime",
      params
    );
  }
}
