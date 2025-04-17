/**
 * Matomo CustomAlerts Module
 * Provides methods to manage custom alerts in Matomo
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class CustomAlertsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get historical values for an alert
   *
   * @param idAlert Alert ID
   * @param subPeriodN The number of past periods to retrieve
   * @returns Historical alert values
   */
  async getValuesForAlertInPast(
    idAlert: string | number,
    subPeriodN: string | number
  ): Promise<any> {
    return this.client.request('CustomAlerts.getValuesForAlertInPast', {
      idAlert,
      subPeriodN,
    });
  }

  /**
   * Get details for a specific alert
   *
   * @param idAlert Alert ID
   * @returns Alert details
   */
  async getAlert(idAlert: string | number): Promise<any> {
    return this.client.request('CustomAlerts.getAlert', {
      idAlert,
    });
  }

  /**
   * Get all alerts for the specified sites
   *
   * @param idSites Site IDs to get alerts for (comma-separated string or array)
   * @param ifSuperUserReturnAllAlerts Whether to return all alerts if the user is a super user
   * @returns List of alerts
   */
  async getAlerts(
    idSites: string | number | (string | number)[],
    ifSuperUserReturnAllAlerts: string | number = ''
  ): Promise<any> {
    const params: RequestParams = {};

    if (Array.isArray(idSites)) {
      params.idSites = idSites.join(',');
    } else {
      params.idSites = idSites;
    }

    if (ifSuperUserReturnAllAlerts !== '') {
      params.ifSuperUserReturnAllAlerts = ifSuperUserReturnAllAlerts;
    }

    return this.client.request('CustomAlerts.getAlerts', params);
  }

  /**
   * Add a new alert
   *
   * @param name Alert name
   * @param idSites Site IDs to apply the alert to (comma-separated string or array)
   * @param period Period type (day, week, month, etc.)
   * @param emailMe Whether to send email to the current user
   * @param additionalEmails Additional email addresses to notify
   * @param phoneNumbers Phone numbers to send SMS alerts to
   * @param metric Metric to monitor
   * @param metricCondition Condition for comparison
   * @param metricValue Value to compare against
   * @param comparedTo Period to compare to ('previous' or specific period)
   * @param reportUniqueId Report to monitor
   * @param reportCondition Optional condition for report
   * @param reportValue Optional report value
   * @returns Information about the created alert
   */
  async addAlert(
    name: string,
    idSites: string | number | (string | number)[],
    period: string,
    emailMe: boolean | string | number,
    additionalEmails: string | string[],
    phoneNumbers: string | string[],
    metric: string,
    metricCondition: string,
    metricValue: string | number,
    comparedTo: string,
    reportUniqueId: string,
    reportCondition: string = '',
    reportValue: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      name,
      period,
      emailMe,
      metric,
      metricCondition,
      metricValue,
      comparedTo,
      reportUniqueId,
    };

    if (Array.isArray(idSites)) {
      params.idSites = idSites.join(',');
    } else {
      params.idSites = idSites;
    }

    if (Array.isArray(additionalEmails)) {
      params.additionalEmails = additionalEmails.join(',');
    } else {
      params.additionalEmails = additionalEmails;
    }

    if (Array.isArray(phoneNumbers)) {
      params.phoneNumbers = phoneNumbers.join(',');
    } else {
      params.phoneNumbers = phoneNumbers;
    }

    if (reportCondition) {
      params.reportCondition = reportCondition;
    }

    if (reportValue) {
      params.reportValue = reportValue;
    }

    return this.client.request('CustomAlerts.addAlert', params);
  }

  /**
   * Edit an existing alert
   *
   * @param idAlert Alert ID to edit
   * @param name Alert name
   * @param idSites Site IDs to apply the alert to (comma-separated string or array)
   * @param period Period type (day, week, month, etc.)
   * @param emailMe Whether to send email to the current user
   * @param additionalEmails Additional email addresses to notify
   * @param phoneNumbers Phone numbers to send SMS alerts to
   * @param metric Metric to monitor
   * @param metricCondition Condition for comparison
   * @param metricValue Value to compare against
   * @param comparedTo Period to compare to ('previous' or specific period)
   * @param reportUniqueId Report to monitor
   * @param reportCondition Optional condition for report
   * @param reportValue Optional report value
   * @returns Information about the updated alert
   */
  async editAlert(
    idAlert: string | number,
    name: string,
    idSites: string | number | (string | number)[],
    period: string,
    emailMe: boolean | string | number,
    additionalEmails: string | string[],
    phoneNumbers: string | string[],
    metric: string,
    metricCondition: string,
    metricValue: string | number,
    comparedTo: string,
    reportUniqueId: string,
    reportCondition: string = '',
    reportValue: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idAlert,
      name,
      period,
      emailMe,
      metric,
      metricCondition,
      metricValue,
      comparedTo,
      reportUniqueId,
    };

    if (Array.isArray(idSites)) {
      params.idSites = idSites.join(',');
    } else {
      params.idSites = idSites;
    }

    if (Array.isArray(additionalEmails)) {
      params.additionalEmails = additionalEmails.join(',');
    } else {
      params.additionalEmails = additionalEmails;
    }

    if (Array.isArray(phoneNumbers)) {
      params.phoneNumbers = phoneNumbers.join(',');
    } else {
      params.phoneNumbers = phoneNumbers;
    }

    if (reportCondition) {
      params.reportCondition = reportCondition;
    }

    if (reportValue) {
      params.reportValue = reportValue;
    }

    return this.client.request('CustomAlerts.editAlert', params);
  }

  /**
   * Delete an alert
   *
   * @param idAlert Alert ID to delete
   * @returns Success status
   */
  async deleteAlert(idAlert: string | number): Promise<any> {
    return this.client.request('CustomAlerts.deleteAlert', {
      idAlert,
    });
  }

  /**
   * Get triggered alerts for specified sites
   *
   * @param idSites Site IDs to get triggered alerts for (comma-separated string or array)
   * @returns List of triggered alerts
   */
  async getTriggeredAlerts(
    idSites: string | number | (string | number)[]
  ): Promise<any> {
    const params: RequestParams = {};

    if (Array.isArray(idSites)) {
      params.idSites = idSites.join(',');
    } else {
      params.idSites = idSites;
    }

    return this.client.request('CustomAlerts.getTriggeredAlerts', params);
  }
}
