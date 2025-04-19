/**
 * Matomo ScheduledReports Module
 *
 * The ScheduledReports API lets you manage Scheduled Email reports, as well as generate,
 * download or email any existing report. "generateReport" will generate the requested report
 * (for a specific date range, website and in the requested language). "sendReport" will
 * send the report by email to the recipients specified for this report. You can also
 * get the list of all existing reports via "getReports", create new reports via "addReport",
 * or manage existing reports with "updateReport" and "deleteReport". See also the documentation
 * about Scheduled Email reports in Matomo.
 */

import { CoreReportingClient, RequestParams } from "./core.js";

/**
 * Parameters for deleteReport method
 */
export interface DeleteReportParams extends RequestParams {
  /** ID of the report to delete */
  idReport: number | string;
}

/**
 * Parameters for addReport method
 */
export interface AddReportParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Report description */
  description: string;
  /** Report period (day, week, month, year) */
  period: string;
  /** Hour when the report should be sent */
  hour: number | string;
  /** Type of the report */
  reportType: string;
  /** Format of the report */
  reportFormat: string;
  /** Reports to include */
  reports: string | string[] | Record<string, any>;
  /** Additional parameters */
  parameters: string | Record<string, any>;
  /** Optional segment ID */
  idSegment?: string;
  /** Evolution period metric */
  evolutionPeriodFor?: string;
  /** Evolution period value */
  evolutionPeriodN?: string | number;
  /** Additional period parameter */
  periodParam?: string;
}

/**
 * Parameters for updateReport method
 */
export interface UpdateReportParams extends AddReportParams {
  /** ID of the report to update */
  idReport: number | string;
}

/**
 * Parameters for getReports method
 */
export interface GetReportsParams extends RequestParams {
  /** Optional Site ID */
  idSite?: number | string;
  /** Optional report period */
  period?: string;
  /** Optional report ID */
  idReport?: number | string;
  /** Optional parameter to filter reports */
  ifSuperUserReturnOnlySuperUserReports?: boolean | string;
  /** Optional segment ID */
  idSegment?: string;
}

/**
 * Parameters for generateReport method
 */
export interface GenerateReportParams extends RequestParams {
  /** ID of the report to generate */
  idReport: number | string;
  /** Date string for the report */
  date: string;
  /** Optional language for the report */
  language?: string;
  /** Optional output type */
  outputType?: string;
  /** Optional period */
  period?: string;
  /** Optional report format */
  reportFormat?: string;
  /** Optional additional parameters */
  parameters?: string | Record<string, any>;
}

/**
 * Parameters for sendReport method
 */
export interface SendReportParams extends RequestParams {
  /** ID of the report to send */
  idReport: number | string;
  /** Optional period for the report */
  period?: string;
  /** Optional date for the report */
  date?: string;
  /** Optional parameter to force sending the report */
  force?: boolean | string;
}

export class ScheduledReportsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Add a new scheduled report
   *
   * @param params Parameters for adding a new report
   * @returns Promise with the result of the API call
   */
  async addReport(params: AddReportParams): Promise<any> {
    const formattedParams = { ...params };

    if (
      typeof formattedParams.reports === "object" &&
      !Array.isArray(formattedParams.reports)
    ) {
      formattedParams.reports = JSON.stringify(formattedParams.reports);
    }

    if (typeof formattedParams.parameters === "object") {
      formattedParams.parameters = JSON.stringify(formattedParams.parameters);
    }

    return this.client.request("ScheduledReports.addReport", formattedParams);
  }

  /**
   * Update an existing scheduled report
   *
   * @param params Parameters for updating an existing report
   * @returns Promise with the result of the API call
   */
  async updateReport(params: UpdateReportParams): Promise<any> {
    const formattedParams = { ...params };

    if (
      typeof formattedParams.reports === "object" &&
      !Array.isArray(formattedParams.reports)
    ) {
      formattedParams.reports = JSON.stringify(formattedParams.reports);
    }

    if (typeof formattedParams.parameters === "object") {
      formattedParams.parameters = JSON.stringify(formattedParams.parameters);
    }

    return this.client.request(
      "ScheduledReports.updateReport",
      formattedParams
    );
  }

  /**
   * Delete an existing scheduled report
   *
   * @param params Parameters containing the report ID to delete
   * @returns Promise with the result of the API call
   */
  async deleteReport(params: DeleteReportParams): Promise<any> {
    return this.client.request("ScheduledReports.deleteReport", params);
  }

  /**
   * Get scheduled reports
   *
   * @param params Parameters for getting reports
   * @returns Promise with the list of reports
   */
  async getReports(params: GetReportsParams = {}): Promise<any> {
    return this.client.request("ScheduledReports.getReports", params);
  }

  /**
   * Generate a scheduled report
   *
   * @param params Parameters for generating a report
   * @returns Promise with the generated report
   */
  async generateReport(params: GenerateReportParams): Promise<any> {
    const formattedParams = { ...params };

    if (
      formattedParams.parameters &&
      typeof formattedParams.parameters === "object"
    ) {
      formattedParams.parameters = JSON.stringify(formattedParams.parameters);
    }

    return this.client.request(
      "ScheduledReports.generateReport",
      formattedParams
    );
  }

  /**
   * Send a scheduled report
   *
   * @param params Parameters for sending a report
   * @returns Promise with the result of the API call
   */
  async sendReport(params: SendReportParams): Promise<any> {
    return this.client.request("ScheduledReports.sendReport", params);
  }
}
