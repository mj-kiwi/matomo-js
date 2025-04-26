/**
 * Matomo API Module
 * Provides access to general API information and metadata
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for API.get method
 */
export interface ApiGetParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for (day, week, month, year, range) */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
  /** Optional columns to restrict the returned data */
  columns?: string;
}

/**
 * Parameters for API.getMetadata method
 */
export interface MetadataParams extends RequestParams {
  /** Site ID */
  idSite?: number | string;
  /** API module name */
  apiModule?: string;
  /** API action name */
  apiAction?: string;
  /** API parameters */
  apiParameters?: Record<string, any> | string;
  /** Language */
  language?: string;
  /** Period to request data for */
  period?: string;
  /** Date string */
  date?: string;
  /** Whether to hide metrics documentation */
  hideMetricsDoc?: boolean;
  /** Whether to show subtable reports */
  showSubtableReports?: boolean;
}

/**
 * Parameters for API.getReportPagesMetadata and API.getWidgetMetadata methods
 */
export interface SiteIdParam extends RequestParams {
  /** Site ID */
  idSite?: number | string;
}

/**
 * Parameters for API.getSuggestedValuesForSegment method
 */
export interface SegmentSuggestionParams extends RequestParams {
  /** Segment name */
  segmentName: string;
  /** Site ID */
  idSite?: number | string;
}

/**
 * Parameters for API.getGlossaryReports and API.getGlossaryMetrics methods
 */
export interface GlossaryParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
}

/**
 * Parameters for API.getSegmentsMetadata method
 */
export interface SegmentsMetadataParams extends RequestParams {
  /** Site IDs to get segments for */
  idSites?: number[] | string;
}

/**
 * Parameters for API.isPluginActivated method
 */
export interface PluginActivatedParams extends RequestParams {
  /** Name of the plugin to check */
  pluginName: string;
}

/**
 * Parameters for API.getBulkRequest method
 */
export interface BulkRequestParams extends RequestParams {
  /** Array of API request URLs or request objects */
  urls: string[] | Record<string, any>[];
}

/**
 * Empty parameters interface for methods that don't require specific parameters
 */
export interface EmptyParams extends RequestParams {}

export class ApiModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get the Matomo version
   *
   * @param params Empty parameters object
   */
  async getMatomoVersion(params: EmptyParams = {}): Promise<string> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "API.getMatomoVersion",
        params
      ) as unknown as Promise<string>;
    }

    const result = await this.client.request<{ value: string }>(
      "API.getMatomoVersion",
      params
    );
    return result.value;
  }

  /**
   * Get the PHP version Matomo is using
   *
   * @param params Empty parameters object
   */
  async getPhpVersion(params: EmptyParams = {}): Promise<string> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "API.getPhpVersion",
        params
      ) as unknown as Promise<string>;
    }

    const result = await this.client.request<{ value: string }>(
      "API.getPhpVersion",
      params
    );
    return result.value;
  }

  /**
   * Get the IP address from header
   * This can be useful for debugging proxy configurations
   *
   * @param params Empty parameters object
   */
  async getIpFromHeader(params: EmptyParams = {}): Promise<string> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "API.getIpFromHeader",
        params
      ) as unknown as Promise<string>;
    }

    const result = await this.client.request<{ value: string }>(
      "API.getIpFromHeader",
      params
    );
    return result.value;
  }

  /**
   * Get Matomo settings
   * Returns configuration settings of the Matomo instance
   *
   * @param params Empty parameters object
   */
  async getSettings(params: EmptyParams = {}): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("API.getSettings", params);
    }

    return this.client.request("API.getSettings", params);
  }

  /**
   * Get the list of segments metadata
   *
   * @param params Parameters with optional site IDs
   */
  async getSegmentsMetadata(params: SegmentsMetadataParams = {}): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("API.getSegmentsMetadata", params);
    }

    return this.client.request("API.getSegmentsMetadata", params);
  }

  /**
   * Get all available metrics that can be used
   *
   * @param params Parameters for getting metadata
   */
  async getMetadata(params: MetadataParams = {}): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("API.getMetadata", params);
    }

    return this.client.request("API.getMetadata", params);
  }

  /**
   * Get report metadata for available reports
   */
  async getReportMetadata(
    params: {
      idSites?: number[] | string;
      period?: string;
      date?: string;
      hideMetricsDoc?: boolean;
      showSubtableReports?: boolean;
    } = {}
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("API.getReportMetadata", params);
    }

    return this.client.request("API.getReportMetadata", params);
  }

  /**
   * Get a processed report with metrics and dimension data
   */
  async getProcessedReport(params: {
    idSite: number | string;
    period: "day" | "week" | "month" | "year" | "range";
    date: string;
    apiModule: string;
    apiAction: string;
    segment?: string;
    apiParameters?: string | Record<string, any>;
    idGoal?: string | number;
    language?: string;
    showTimer?: string | boolean;
    hideMetricsDoc?: string | boolean;
    idSubtable?: string | number;
    showRawMetrics?: string | boolean;
    format_metrics?: string | boolean;
    idDimension?: string | number;
  }): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("API.getProcessedReport", params);
    }

    return this.client.request("API.getProcessedReport", params);
  }

  /**
   * Get all report pages
   * Returns metadata about report pages for all plugins
   *
   * @param params Parameters with optional site ID
   */
  async getReportPagesMetadata(params: SiteIdParam = {}): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("API.getReportPagesMetadata", params);
    }

    return this.client.request("API.getReportPagesMetadata", params);
  }

  /**
   * Get widgets metadata
   * Get the list of all available widgets with their associated parameters
   *
   * @param params Parameters with optional site ID
   */
  async getWidgetMetadata(params: SiteIdParam = {}): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("API.getWidgetMetadata", params);
    }

    return this.client.request("API.getWidgetMetadata", params);
  }

  /**
   * Get API data for multiple periods or sites
   *
   * @param params Parameters for getting API data
   */
  async get(params: ApiGetParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("API.get", params);
    }

    return this.client.request("API.get", params);
  }

  /**
   * Get row evolution data for a specific metric
   */
  async getRowEvolution(params: {
    idSite: number | string;
    period: "day" | "week" | "month" | "year" | "range";
    date: string;
    apiModule: string;
    apiAction: string;
    label?: string;
    segment?: string;
    column?: string;
    language?: string;
    idGoal?: string | number;
    legendAppendMetric?: string | boolean;
    labelUseAbsoluteUrl?: string | boolean;
    idDimension?: string | number;
    labelSeries?: string;
    showGoalMetricsForGoal?: string | number;
  }): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("API.getRowEvolution", params);
    }

    return this.client.request("API.getRowEvolution", params);
  }

  /**
   * Execute multiple API requests in a single HTTP request
   *
   * @param params Parameters containing the array of API requests
   */
  async getBulkRequest(params: BulkRequestParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("API.getBulkRequest", {
        urls: params.urls,
      });
    }

    return this.client.request("API.getBulkRequest", { urls: params.urls });
  }

  /**
   * Check if a plugin is activated in Matomo
   *
   * @param params Parameters containing the plugin name
   */
  async isPluginActivated(params: PluginActivatedParams): Promise<boolean> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("API.isPluginActivated", {
        pluginName: params.pluginName,
      }) as unknown as Promise<boolean>;
    }

    const result = await this.client.request<{ value: boolean }>(
      "API.isPluginActivated",
      { pluginName: params.pluginName }
    );
    return result.value;
  }

  /**
   * Get API suggestions
   * Return suggested values for a specific report, segment, etc.
   *
   * @param params Parameters for getting segment suggestions
   */
  async getSuggestedValuesForSegment(
    params: SegmentSuggestionParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("API.getSuggestedValuesForSegment", params);
    }

    return this.client.request("API.getSuggestedValuesForSegment", params);
  }

  /**
   * Get a list of pages for which comparisons are disabled
   * Returns a list of plugins that don't support comparison features
   *
   * @param params Empty parameters object
   */
  async getPagesComparisonsDisabledFor(params: EmptyParams = {}): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "API.getPagesComparisonsDisabledFor",
        params
      );
    }

    return this.client.request("API.getPagesComparisonsDisabledFor", params);
  }

  /**
   * Get glossary for reports in Matomo
   * Returns a list of reports with their descriptions and definitions
   *
   * @param params Parameters containing the site ID
   */
  async getGlossaryReports(params: GlossaryParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("API.getGlossaryReports", params);
    }

    return this.client.request("API.getGlossaryReports", params);
  }

  /**
   * Get glossary for metrics in Matomo
   * Returns a list of metrics with their descriptions and definitions
   *
   * @param params Parameters containing the site ID
   */
  async getGlossaryMetrics(params: GlossaryParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("API.getGlossaryMetrics", params);
    }

    return this.client.request("API.getGlossaryMetrics", params);
  }
}
