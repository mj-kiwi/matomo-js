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

import { CoreReportingClient, RequestParams } from './core.js';

export class ScheduledReportsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Add a new scheduled report
   *
   * @param idSite Site ID
   * @param description Report description
   * @param period Report period (day, week, month, year)
   * @param hour Hour when the report should be sent
   * @param reportType Type of the report
   * @param reportFormat Format of the report
   * @param reports Reports to include
   * @param parameters Additional parameters
   * @param idSegment Optional segment ID
   * @param evolutionPeriodFor Evolution period metric
   * @param evolutionPeriodN Evolution period value
   * @param periodParam Additional period parameter
   * @returns Promise with the result of the API call
   */
  async addReport(
    idSite: number | string,
    description: string,
    period: string,
    hour: number | string,
    reportType: string,
    reportFormat: string,
    reports: string | string[] | Record<string, any>,
    parameters: Record<string, any>,
    idSegment: string = '',
    evolutionPeriodFor: string = 'prev',
    evolutionPeriodN: string | number = '',
    periodParam: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      description,
      period,
      hour,
      reportType,
      reportFormat,
      reports: typeof reports === 'object' ? JSON.stringify(reports) : reports,
      parameters: JSON.stringify(parameters),
    };

    if (idSegment) params.idSegment = idSegment;
    if (evolutionPeriodFor !== 'prev')
      params.evolutionPeriodFor = evolutionPeriodFor;
    if (evolutionPeriodN !== '') params.evolutionPeriodN = evolutionPeriodN;
    if (periodParam) params.periodParam = periodParam;

    return this.client.request('ScheduledReports.addReport', params);
  }

  /**
   * Update an existing scheduled report
   *
   * @param idReport ID of the report to update
   * @param idSite Site ID
   * @param description Report description
   * @param period Report period (day, week, month, year)
   * @param hour Hour when the report should be sent
   * @param reportType Type of the report
   * @param reportFormat Format of the report
   * @param reports Reports to include
   * @param parameters Additional parameters
   * @param idSegment Optional segment ID
   * @param evolutionPeriodFor Evolution period metric
   * @param evolutionPeriodN Evolution period value
   * @param periodParam Additional period parameter
   * @returns Promise with the result of the API call
   */
  async updateReport(
    idReport: number | string,
    idSite: number | string,
    description: string,
    period: string,
    hour: number | string,
    reportType: string,
    reportFormat: string,
    reports: string | string[] | Record<string, any>,
    parameters: Record<string, any>,
    idSegment: string = '',
    evolutionPeriodFor: string = 'prev',
    evolutionPeriodN: string | number = '',
    periodParam: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idReport,
      idSite,
      description,
      period,
      hour,
      reportType,
      reportFormat,
      reports: typeof reports === 'object' ? JSON.stringify(reports) : reports,
      parameters: JSON.stringify(parameters),
    };

    if (idSegment) params.idSegment = idSegment;
    if (evolutionPeriodFor !== 'prev')
      params.evolutionPeriodFor = evolutionPeriodFor;
    if (evolutionPeriodN !== '') params.evolutionPeriodN = evolutionPeriodN;
    if (periodParam) params.periodParam = periodParam;

    return this.client.request('ScheduledReports.updateReport', params);
  }

  /**
   * Delete an existing scheduled report
   *
   * @param idReport ID of the report to delete
   * @returns Promise with the result of the API call
   */
  async deleteReport(idReport: number | string): Promise<any> {
    return this.client.request('ScheduledReports.deleteReport', {
      idReport,
    });
  }

  /**
   * Get scheduled reports
   *
   * @param idSite Optional Site ID
   * @param period Optional report period
   * @param idReport Optional report ID
   * @param ifSuperUserReturnOnlySuperUserReports Optional parameter to filter reports
   * @param idSegment Optional segment ID
   * @returns Promise with the list of reports
   */
  async getReports(
    idSite: number | string = '',
    period: string = '',
    idReport: number | string = '',
    ifSuperUserReturnOnlySuperUserReports: boolean | string = '',
    idSegment: string = ''
  ): Promise<any> {
    const params: RequestParams = {};

    if (idSite !== '') params.idSite = idSite;
    if (period) params.period = period;
    if (idReport !== '') params.idReport = idReport;
    if (ifSuperUserReturnOnlySuperUserReports !== '')
      params.ifSuperUserReturnOnlySuperUserReports =
        ifSuperUserReturnOnlySuperUserReports;
    if (idSegment) params.idSegment = idSegment;

    return this.client.request('ScheduledReports.getReports', params);
  }

  /**
   * Generate a scheduled report
   *
   * @param idReport ID of the report to generate
   * @param date Date string for the report
   * @param language Optional language for the report
   * @param outputType Optional output type
   * @param period Optional period
   * @param reportFormat Optional report format
   * @param parameters Optional additional parameters
   * @returns Promise with the generated report
   */
  async generateReport(
    idReport: number | string,
    date: string,
    language: string = '',
    outputType: string = '',
    period: string = '',
    reportFormat: string = '',
    parameters: string | Record<string, any> = ''
  ): Promise<any> {
    const params: RequestParams = {
      idReport,
      date,
    };

    if (language) params.language = language;
    if (outputType) params.outputType = outputType;
    if (period) params.period = period;
    if (reportFormat) params.reportFormat = reportFormat;
    if (parameters) {
      params.parameters =
        typeof parameters === 'object'
          ? JSON.stringify(parameters)
          : parameters;
    }

    return this.client.request('ScheduledReports.generateReport', params);
  }

  /**
   * Send a scheduled report
   *
   * @param idReport ID of the report to send
   * @param period Optional period for the report
   * @param date Optional date for the report
   * @param force Optional parameter to force sending the report
   * @returns Promise with the result of the API call
   */
  async sendReport(
    idReport: number | string,
    period: string = '',
    date: string = '',
    force: boolean | string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idReport,
    };

    if (period) params.period = period;
    if (date) params.date = date;
    if (force !== '') params.force = force;

    return this.client.request('ScheduledReports.sendReport', params);
  }
}
