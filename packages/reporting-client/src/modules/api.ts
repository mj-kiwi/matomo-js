/**
 * Matomo API Module
 * Provides access to general API information and metadata
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class ApiModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get the Matomo version
   */
  async getMatomoVersion(): Promise<string> {
    const result = await this.client.request<{ value: string }>(
      'API.getMatomoVersion'
    );
    return result.value;
  }

  /**
   * Get the PHP version Matomo is using
   */
  async getPhpVersion(): Promise<string> {
    const result = await this.client.request<{ value: string }>(
      'API.getPhpVersion'
    );
    return result.value;
  }

  /**
   * Get the IP address from header
   * This can be useful for debugging proxy configurations
   */
  async getIpFromHeader(): Promise<string> {
    const result = await this.client.request<{ value: string }>(
      'API.getIpFromHeader'
    );
    return result.value;
  }

  /**
   * Get Matomo settings
   * Returns configuration settings of the Matomo instance
   */
  async getSettings(): Promise<any> {
    return this.client.request('API.getSettings');
  }

  /**
   * Get the list of segments metadata
   *
   * @param idSites Site IDs to get segments for
   */
  async getSegmentsMetadata(idSites?: number[] | string): Promise<any> {
    return this.client.request('API.getSegmentsMetadata', {
      idSites: idSites,
    });
  }

  /**
   * Get all available metrics that can be used
   */
  async getMetadata(
    idSite?: number | string,
    apiModule?: string,
    apiAction?: string,
    apiParameters?: Record<string, any> | string,
    language?: string,
    period?: string,
    date?: string,
    hideMetricsDoc?: boolean,
    showSubtableReports?: boolean
  ): Promise<any> {
    const params: RequestParams = {};

    if (idSite !== undefined) params.idSite = idSite;
    if (apiModule !== undefined) params.apiModule = apiModule;
    if (apiAction !== undefined) params.apiAction = apiAction;
    if (apiParameters !== undefined) params.apiParameters = apiParameters;
    if (language !== undefined) params.language = language;
    if (period !== undefined) params.period = period;
    if (date !== undefined) params.date = date;
    if (hideMetricsDoc !== undefined) params.hideMetricsDoc = hideMetricsDoc;
    if (showSubtableReports !== undefined)
      params.showSubtableReports = showSubtableReports;

    return this.client.request('API.getMetadata', params);
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
    return this.client.request('API.getReportMetadata', params);
  }

  /**
   * Get a processed report with metrics and dimension data
   */
  async getProcessedReport(params: {
    idSite: number | string;
    period: 'day' | 'week' | 'month' | 'year' | 'range';
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
    return this.client.request('API.getProcessedReport', params);
  }

  /**
   * Get all report pages
   * Returns metadata about report pages for all plugins
   */
  async getReportPagesMetadata(idSite?: number | string): Promise<any> {
    const params: RequestParams = {};
    if (idSite !== undefined) {
      params.idSite = idSite;
    }
    return this.client.request('API.getReportPagesMetadata', params);
  }

  /**
   * Get widgets metadata
   * Get the list of all available widgets with their associated parameters
   *
   * @param idSite Site ID
   */
  async getWidgetMetadata(idSite?: number | string): Promise<any> {
    const params: RequestParams = {};
    if (idSite !== undefined) {
      params.idSite = idSite;
    }
    return this.client.request('API.getWidgetMetadata', params);
  }

  /**
   * Get API data for multiple periods or sites
   *
   * @param idSite Site ID
   * @param period Period to request data for (day, week, month, year, range)
   * @param date Date string
   * @param segment Optional segment definition
   * @param columns Optional columns to restrict the returned data
   */
  async get(
    idSite: number | string,
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

    if (segment) params.segment = segment;
    if (columns) params.columns = columns;

    return this.client.request('API.get', params);
  }

  /**
   * Get row evolution data for a specific metric
   */
  async getRowEvolution(params: {
    idSite: number | string;
    period: 'day' | 'week' | 'month' | 'year' | 'range';
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
    return this.client.request('API.getRowEvolution', params);
  }

  /**
   * Execute multiple API requests in a single HTTP request
   *
   * @param urls Array of API request URLs or request objects
   */
  async getBulkRequest(urls: string[] | Record<string, any>[]): Promise<any> {
    return this.client.request('API.getBulkRequest', { urls });
  }

  /**
   * Check if a plugin is activated in Matomo
   *
   * @param pluginName Name of the plugin to check
   */
  async isPluginActivated(pluginName: string): Promise<boolean> {
    const result = await this.client.request<{ value: boolean }>(
      'API.isPluginActivated',
      { pluginName }
    );
    return result.value;
  }

  /**
   * Get API suggestions
   * Return suggested values for a specific report, segment, etc.
   *
   * @param segmentName Segment name
   * @param idSite Site ID
   */
  async getSuggestedValuesForSegment(
    segmentName: string,
    idSite?: number | string
  ): Promise<any> {
    const params: RequestParams = { segmentName };
    if (idSite !== undefined) {
      params.idSite = idSite;
    }
    return this.client.request('API.getSuggestedValuesForSegment', params);
  }

  /**
   * Get a list of pages for which comparisons are disabled
   * Returns a list of plugins that don't support comparison features
   */
  async getPagesComparisonsDisabledFor(): Promise<any> {
    return this.client.request('API.getPagesComparisonsDisabledFor');
  }

  /**
   * Get glossary for reports in Matomo
   * Returns a list of reports with their descriptions and definitions
   *
   * @param idSite Site ID
   */
  async getGlossaryReports(idSite: number | string): Promise<any> {
    return this.client.request('API.getGlossaryReports', { idSite });
  }

  /**
   * Get glossary for metrics in Matomo
   * Returns a list of metrics with their descriptions and definitions
   *
   * @param idSite Site ID
   */
  async getGlossaryMetrics(idSite: number | string): Promise<any> {
    return this.client.request('API.getGlossaryMetrics', { idSite });
  }
}
