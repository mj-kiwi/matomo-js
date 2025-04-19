/**
 * Matomo CustomReports Module
 * The Custom Reports API lets you 1) create custom reports within Matomo and 2) view the created reports in the Matomo Reporting UI or consume them via the API.
 * You can choose between different visualizations (eg table or evolution graph) and combine hundreds of dimensions and metrics to get the data you need.
 */

import { CoreReportingClient, RequestParams } from "./core.js";

export interface CustomReport {
  idcustomreport: string;
  idsite: string | number;
  name: string;
  report_type: string;
  description?: string;
  segment_filter?: string;
  metrics: string[];
  dimensions?: string[];
  category_id?: string;
  subcategory_id?: string;
}

export interface Category {
  id: string;
  name: string;
  order: number;
}

export interface ReportType {
  id: string;
  name: string;
  description?: string;
}

export interface Dimension {
  id: string;
  name: string;
  category?: string;
}

export interface Metric {
  id: string;
  name: string;
  category?: string;
}

/**
 * Common parameters for CustomReports API methods
 */
export interface CustomReportsParams extends RequestParams {
  /** Site ID */
  idSite: string | number;
}

/**
 * Parameters for adding a custom report
 */
export interface AddCustomReportParams extends CustomReportsParams {
  /** Name of the report */
  name: string;
  /** Type of the report */
  reportType: string;
  /** Array of metric IDs */
  metricIds: string[];
  /** Optional category ID */
  categoryId?: string;
  /** Optional array of dimension IDs */
  dimensionIds?: string[];
  /** Optional subcategory ID */
  subcategoryId?: string;
  /** Optional description */
  description?: string;
  /** Optional segment filter */
  segmentFilter?: string;
  /** Optional array of site IDs (for multi-site reports) */
  multipleIdSites?: string[] | number[];
}

/**
 * Parameters for updating a custom report
 */
export interface UpdateCustomReportParams extends AddCustomReportParams {
  /** ID of the custom report to update */
  idCustomReport: string | number;
  /** Optional subcategory report IDs */
  subCategoryReportIds?: string[];
}

/**
 * Parameters for getting configured reports
 */
export interface GetConfiguredReportsParams extends CustomReportsParams {
  /** Optional parameter to skip category metadata */
  skipCategoryMetadata?: string | boolean;
}

/**
 * Parameters for operations on a specific custom report
 */
export interface CustomReportIdParams extends CustomReportsParams {
  /** ID of the custom report */
  idCustomReport: string | number;
}

/**
 * Parameters for getting custom report data
 */
export interface GetCustomReportDataParams extends CustomReportIdParams {
  /** Period for the report */
  period: string;
  /** Date for the report */
  date: string;
  /** Optional segment */
  segment?: string;
  /** Optional expanded parameter */
  expanded?: string | number;
  /** Optional flat parameter */
  flat?: string | number;
  /** Optional idSubtable parameter */
  idSubtable?: string | number;
  /** Optional columns parameter */
  columns?: string;
}

export class CustomReportsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Add a new custom report
   *
   * @param params Parameters for adding a new custom report
   * @returns Promise with the new report details
   */
  addCustomReport(params: AddCustomReportParams): Promise<any> {
    return this.client.request("CustomReports.addCustomReport", params);
  }

  /**
   * Update an existing custom report
   *
   * @param params Parameters for updating an existing custom report
   * @returns Promise with the updated report details
   */
  updateCustomReport(params: UpdateCustomReportParams): Promise<any> {
    return this.client.request("CustomReports.updateCustomReport", params);
  }

  /**
   * Get all configured custom reports for a site
   *
   * @param params Parameters for getting configured reports
   * @returns Promise with the list of configured custom reports
   */
  getConfiguredReports(
    params: GetConfiguredReportsParams
  ): Promise<CustomReport[]> {
    return this.client.request("CustomReports.getConfiguredReports", params);
  }

  /**
   * Get a specific configured custom report
   *
   * @param params Parameters containing site ID and custom report ID
   * @returns Promise with the custom report details
   */
  getConfiguredReport(params: CustomReportIdParams): Promise<CustomReport> {
    return this.client.request("CustomReports.getConfiguredReport", params);
  }

  /**
   * Delete a custom report
   *
   * @param params Parameters containing site ID and custom report ID
   * @returns Promise with the deletion status
   */
  deleteCustomReport(params: CustomReportIdParams): Promise<any> {
    return this.client.request("CustomReports.deleteCustomReport", params);
  }

  /**
   * Pause a custom report
   *
   * @param params Parameters containing site ID and custom report ID
   * @returns Promise with the pause status
   */
  pauseCustomReport(params: CustomReportIdParams): Promise<any> {
    return this.client.request("CustomReports.pauseCustomReport", params);
  }

  /**
   * Resume a paused custom report
   *
   * @param params Parameters containing site ID and custom report ID
   * @returns Promise with the resume status
   */
  resumeCustomReport(params: CustomReportIdParams): Promise<any> {
    return this.client.request("CustomReports.resumeCustomReport", params);
  }

  /**
   * Get available categories for custom reports
   *
   * @param params Parameters containing the site ID
   * @returns Promise with the list of available categories
   */
  getAvailableCategories(params: CustomReportsParams): Promise<Category[]> {
    return this.client.request("CustomReports.getAvailableCategories", params);
  }

  /**
   * Get available report types for custom reports
   *
   * @returns Promise with the list of available report types
   */
  getAvailableReportTypes(): Promise<ReportType[]> {
    return this.client.request("CustomReports.getAvailableReportTypes", {});
  }

  /**
   * Get available dimensions for custom reports
   *
   * @param params Parameters containing the site ID
   * @returns Promise with the list of available dimensions
   */
  getAvailableDimensions(params: CustomReportsParams): Promise<Dimension[]> {
    return this.client.request("CustomReports.getAvailableDimensions", params);
  }

  /**
   * Get available metrics for custom reports
   *
   * @param params Parameters containing the site ID
   * @returns Promise with the list of available metrics
   */
  getAvailableMetrics(params: CustomReportsParams): Promise<Metric[]> {
    return this.client.request("CustomReports.getAvailableMetrics", params);
  }

  /**
   * Get custom report data
   *
   * @param params Parameters for getting custom report data
   * @returns Promise with the custom report data
   */
  getCustomReport(params: GetCustomReportDataParams): Promise<any> {
    return this.client.request("CustomReports.getCustomReport", params);
  }
}
