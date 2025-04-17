/**
 * Matomo CustomReports Module
 * The Custom Reports API lets you 1) create custom reports within Matomo and 2) view the created reports in the Matomo Reporting UI or consume them via the API.
 * You can choose between different visualizations (eg table or evolution graph) and combine hundreds of dimensions and metrics to get the data you need.
 */

import { CoreReportingClient } from './core.js';

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

export class CustomReportsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Add a new custom report
   * @param idSite Site ID
   * @param name Name of the report
   * @param reportType Type of the report
   * @param metricIds Array of metric IDs
   * @param categoryId Optional category ID
   * @param dimensionIds Optional array of dimension IDs
   * @param subcategoryId Optional subcategory ID
   * @param description Optional description
   * @param segmentFilter Optional segment filter
   * @param multipleIdSites Optional array of site IDs (for multi-site reports)
   * @returns Promise with the new report details
   */
  addCustomReport(
    idSite: string | number,
    name: string,
    reportType: string,
    metricIds: string[],
    categoryId: string = '',
    dimensionIds: string[] = [],
    subcategoryId: string = '',
    description: string = '',
    segmentFilter: string = '',
    multipleIdSites: string[] | number[] = []
  ): Promise<any> {
    const params: Record<string, any> = {
      idSite,
      name,
      reportType,
      metricIds,
    };

    if (categoryId) params.categoryId = categoryId;
    if (dimensionIds.length) params.dimensionIds = dimensionIds;
    if (subcategoryId) params.subcategoryId = subcategoryId;
    if (description) params.description = description;
    if (segmentFilter) params.segmentFilter = segmentFilter;
    if (multipleIdSites.length) params.multipleIdSites = multipleIdSites;

    return this.client.request('CustomReports.addCustomReport', params);
  }

  /**
   * Update an existing custom report
   * @param idSite Site ID
   * @param idCustomReport ID of the custom report to update
   * @param name Name of the report
   * @param reportType Type of the report
   * @param metricIds Array of metric IDs
   * @param categoryId Optional category ID
   * @param dimensionIds Optional array of dimension IDs
   * @param subcategoryId Optional subcategory ID
   * @param description Optional description
   * @param segmentFilter Optional segment filter
   * @param subCategoryReportIds Optional subcategory report IDs
   * @param multipleIdSites Optional array of site IDs (for multi-site reports)
   * @returns Promise with the updated report details
   */
  updateCustomReport(
    idSite: string | number,
    idCustomReport: string | number,
    name: string,
    reportType: string,
    metricIds: string[],
    categoryId: string = '',
    dimensionIds: string[] = [],
    subcategoryId: string = '',
    description: string = '',
    segmentFilter: string = '',
    subCategoryReportIds: string[] = [],
    multipleIdSites: string[] | number[] = []
  ): Promise<any> {
    const params: Record<string, any> = {
      idSite,
      idCustomReport,
      name,
      reportType,
      metricIds,
    };

    if (categoryId) params.categoryId = categoryId;
    if (dimensionIds.length) params.dimensionIds = dimensionIds;
    if (subcategoryId) params.subcategoryId = subcategoryId;
    if (description) params.description = description;
    if (segmentFilter) params.segmentFilter = segmentFilter;
    if (subCategoryReportIds.length)
      params.subCategoryReportIds = subCategoryReportIds;
    if (multipleIdSites.length) params.multipleIdSites = multipleIdSites;

    return this.client.request('CustomReports.updateCustomReport', params);
  }

  /**
   * Get all configured custom reports for a site
   * @param idSite Site ID
   * @param skipCategoryMetadata Optional parameter to skip category metadata
   * @returns Promise with the list of configured custom reports
   */
  getConfiguredReports(
    idSite: string | number,
    skipCategoryMetadata: string | boolean = ''
  ): Promise<CustomReport[]> {
    const params: Record<string, any> = {
      idSite,
    };

    if (skipCategoryMetadata !== '') {
      params.skipCategoryMetadata = skipCategoryMetadata;
    }

    return this.client.request('CustomReports.getConfiguredReports', params);
  }

  /**
   * Get a specific configured custom report
   * @param idSite Site ID
   * @param idCustomReport ID of the custom report
   * @returns Promise with the custom report details
   */
  getConfiguredReport(
    idSite: string | number,
    idCustomReport: string | number
  ): Promise<CustomReport> {
    return this.client.request('CustomReports.getConfiguredReport', {
      idSite,
      idCustomReport,
    });
  }

  /**
   * Delete a custom report
   * @param idSite Site ID
   * @param idCustomReport ID of the custom report to delete
   * @returns Promise with the deletion status
   */
  deleteCustomReport(
    idSite: string | number,
    idCustomReport: string | number
  ): Promise<any> {
    return this.client.request('CustomReports.deleteCustomReport', {
      idSite,
      idCustomReport,
    });
  }

  /**
   * Pause a custom report
   * @param idSite Site ID
   * @param idCustomReport ID of the custom report to pause
   * @returns Promise with the pause status
   */
  pauseCustomReport(
    idSite: string | number,
    idCustomReport: string | number
  ): Promise<any> {
    return this.client.request('CustomReports.pauseCustomReport', {
      idSite,
      idCustomReport,
    });
  }

  /**
   * Resume a paused custom report
   * @param idSite Site ID
   * @param idCustomReport ID of the custom report to resume
   * @returns Promise with the resume status
   */
  resumeCustomReport(
    idSite: string | number,
    idCustomReport: string | number
  ): Promise<any> {
    return this.client.request('CustomReports.resumeCustomReport', {
      idSite,
      idCustomReport,
    });
  }

  /**
   * Get available categories for custom reports
   * @param idSite Site ID
   * @returns Promise with the list of available categories
   */
  getAvailableCategories(idSite: string | number): Promise<Category[]> {
    return this.client.request('CustomReports.getAvailableCategories', {
      idSite,
    });
  }

  /**
   * Get available report types for custom reports
   * @returns Promise with the list of available report types
   */
  getAvailableReportTypes(): Promise<ReportType[]> {
    return this.client.request('CustomReports.getAvailableReportTypes', {});
  }

  /**
   * Get available dimensions for custom reports
   * @param idSite Site ID
   * @returns Promise with the list of available dimensions
   */
  getAvailableDimensions(idSite: string | number): Promise<Dimension[]> {
    return this.client.request('CustomReports.getAvailableDimensions', {
      idSite,
    });
  }

  /**
   * Get available metrics for custom reports
   * @param idSite Site ID
   * @returns Promise with the list of available metrics
   */
  getAvailableMetrics(idSite: string | number): Promise<Metric[]> {
    return this.client.request('CustomReports.getAvailableMetrics', {
      idSite,
    });
  }

  /**
   * Get custom report data
   * @param idSite Site ID
   * @param period Period for the report
   * @param date Date for the report
   * @param idCustomReport ID of the custom report
   * @param segment Optional segment
   * @param expanded Optional expanded parameter
   * @param flat Optional flat parameter
   * @param idSubtable Optional idSubtable parameter
   * @param columns Optional columns parameter
   * @returns Promise with the custom report data
   */
  getCustomReport(
    idSite: string | number,
    period: string,
    date: string,
    idCustomReport: string | number,
    segment: string = '',
    expanded: string | number = '',
    flat: string | number = '',
    idSubtable: string | number = '',
    columns: string = ''
  ): Promise<any> {
    const params: Record<string, any> = {
      idSite,
      period,
      date,
      idCustomReport,
    };

    if (segment) params.segment = segment;
    if (expanded !== '') params.expanded = expanded;
    if (flat !== '') params.flat = flat;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (columns) params.columns = columns;

    return this.client.request('CustomReports.getCustomReport', params);
  }
}
