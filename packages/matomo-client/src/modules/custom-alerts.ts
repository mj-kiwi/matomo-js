/**
 * Matomo CustomAlerts Module
 * Provides methods to manage custom alerts in Matomo
 */

import { CoreReportingClient, RequestParams } from "./core.js";

/**
 * Parameters for alert-specific operations
 */
export interface AlertParams extends RequestParams {
  /** Alert ID */
  idAlert: string | number;
}

/**
 * Parameters for retrieving historical alert values
 */
export interface AlertHistoryParams extends RequestParams {
  /** Alert ID */
  idAlert: string | number;
  /** The number of past periods to retrieve */
  subPeriodN: string | number;
}

/**
 * Parameters for getting all alerts
 */
export interface GetAlertsParams extends RequestParams {
  /** Site IDs to get alerts for (comma-separated string or array) */
  idSites: string | number | (string | number)[];
  /** Whether to return all alerts if the user is a super user */
  ifSuperUserReturnAllAlerts?: string | number;
}

/**
 * Parameters for adding a new alert
 */
export interface AddAlertParams extends RequestParams {
  /** Alert name */
  name: string;
  /** Site IDs to apply the alert to (comma-separated string or array) */
  idSites: string | number | (string | number)[];
  /** Period type (day, week, month, etc.) */
  period: string;
  /** Whether to send email to the current user */
  emailMe: boolean | string | number;
  /** Additional email addresses to notify */
  additionalEmails: string | string[];
  /** Phone numbers to send SMS alerts to */
  phoneNumbers: string | string[];
  /** Metric to monitor */
  metric: string;
  /** Condition for comparison */
  metricCondition: string;
  /** Value to compare against */
  metricValue: string | number;
  /** Period to compare to ('previous' or specific period) */
  comparedTo: string;
  /** Report to monitor */
  reportUniqueId: string;
  /** Optional condition for report */
  reportCondition?: string;
  /** Optional report value */
  reportValue?: string;
}

/**
 * Parameters for editing an existing alert
 */
export interface EditAlertParams extends AddAlertParams {
  /** Alert ID to edit */
  idAlert: string | number;
}

/**
 * Parameters for getting triggered alerts
 */
export interface GetTriggeredAlertsParams extends RequestParams {
  /** Site IDs to get triggered alerts for (comma-separated string or array) */
  idSites: string | number | (string | number)[];
}

export class CustomAlertsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get historical values for an alert
   *
   * @param params Parameters for retrieving historical alert values
   * @returns Historical alert values
   */
  async getValuesForAlertInPast(params: AlertHistoryParams): Promise<any> {
    return this.client.request("CustomAlerts.getValuesForAlertInPast", params);
  }

  /**
   * Get details for a specific alert
   *
   * @param params Parameters containing the alert ID
   * @returns Alert details
   */
  async getAlert(params: AlertParams): Promise<any> {
    return this.client.request("CustomAlerts.getAlert", params);
  }

  /**
   * Get all alerts for the specified sites
   *
   * @param params Parameters for getting alerts
   * @returns List of alerts
   */
  async getAlerts(params: GetAlertsParams): Promise<any> {
    const requestParams: RequestParams = {};

    if (Array.isArray(params.idSites)) {
      requestParams.idSites = params.idSites.join(",");
    } else {
      requestParams.idSites = params.idSites;
    }

    if (params.ifSuperUserReturnAllAlerts !== undefined) {
      requestParams.ifSuperUserReturnAllAlerts =
        params.ifSuperUserReturnAllAlerts;
    }

    return this.client.request("CustomAlerts.getAlerts", requestParams);
  }

  /**
   * Add a new alert
   *
   * @param params Parameters for adding a new alert
   * @returns Information about the created alert
   */
  async addAlert(params: AddAlertParams): Promise<any> {
    const requestParams: RequestParams = {
      name: params.name,
      period: params.period,
      emailMe: params.emailMe,
      metric: params.metric,
      metricCondition: params.metricCondition,
      metricValue: params.metricValue,
      comparedTo: params.comparedTo,
      reportUniqueId: params.reportUniqueId,
    };

    if (Array.isArray(params.idSites)) {
      requestParams.idSites = params.idSites.join(",");
    } else {
      requestParams.idSites = params.idSites;
    }

    if (Array.isArray(params.additionalEmails)) {
      requestParams.additionalEmails = params.additionalEmails.join(",");
    } else {
      requestParams.additionalEmails = params.additionalEmails;
    }

    if (Array.isArray(params.phoneNumbers)) {
      requestParams.phoneNumbers = params.phoneNumbers.join(",");
    } else {
      requestParams.phoneNumbers = params.phoneNumbers;
    }

    if (params.reportCondition) {
      requestParams.reportCondition = params.reportCondition;
    }

    if (params.reportValue) {
      requestParams.reportValue = params.reportValue;
    }

    return this.client.request("CustomAlerts.addAlert", requestParams);
  }

  /**
   * Edit an existing alert
   *
   * @param params Parameters for editing an alert
   * @returns Information about the updated alert
   */
  async editAlert(params: EditAlertParams): Promise<any> {
    const requestParams: RequestParams = {
      idAlert: params.idAlert,
      name: params.name,
      period: params.period,
      emailMe: params.emailMe,
      metric: params.metric,
      metricCondition: params.metricCondition,
      metricValue: params.metricValue,
      comparedTo: params.comparedTo,
      reportUniqueId: params.reportUniqueId,
    };

    if (Array.isArray(params.idSites)) {
      requestParams.idSites = params.idSites.join(",");
    } else {
      requestParams.idSites = params.idSites;
    }

    if (Array.isArray(params.additionalEmails)) {
      requestParams.additionalEmails = params.additionalEmails.join(",");
    } else {
      requestParams.additionalEmails = params.additionalEmails;
    }

    if (Array.isArray(params.phoneNumbers)) {
      requestParams.phoneNumbers = params.phoneNumbers.join(",");
    } else {
      requestParams.phoneNumbers = params.phoneNumbers;
    }

    if (params.reportCondition) {
      requestParams.reportCondition = params.reportCondition;
    }

    if (params.reportValue) {
      requestParams.reportValue = params.reportValue;
    }

    return this.client.request("CustomAlerts.editAlert", requestParams);
  }

  /**
   * Delete an alert
   *
   * @param params Parameters containing the alert ID to delete
   * @returns Success status
   */
  async deleteAlert(params: AlertParams): Promise<any> {
    return this.client.request("CustomAlerts.deleteAlert", params);
  }

  /**
   * Get triggered alerts for specified sites
   *
   * @param params Parameters for getting triggered alerts
   * @returns List of triggered alerts
   */
  async getTriggeredAlerts(params: GetTriggeredAlertsParams): Promise<any> {
    const requestParams: RequestParams = {};

    if (Array.isArray(params.idSites)) {
      requestParams.idSites = params.idSites.join(",");
    } else {
      requestParams.idSites = params.idSites;
    }

    return this.client.request(
      "CustomAlerts.getTriggeredAlerts",
      requestParams
    );
  }
}
