/**
 * Matomo FormAnalytics Module
 *
 * The Form Analytics API lets you manage forms within Matomo and request all your form analytics
 * reports and metrics about how users interact with your forms.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for form-specific operations
 */
export interface FormParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
}

/**
 * Parameters for getting a specific form
 */
export interface FormIdParams extends FormParams {
  /** Form ID */
  idForm: number | string;
}

/**
 * Parameters for adding a new form
 */
export interface AddFormParams extends FormParams {
  /** Form name */
  name: string;
  /** Optional form description */
  description?: string;
  /** Optional rules to match forms */
  matchFormRules?: string;
  /** Optional rules to match pages */
  matchPageRules?: string;
  /** Optional conversion rule option */
  conversionRuleOption?: string;
  /** Optional conversion rules */
  conversionRules?: string;
}

/**
 * Parameters for updating a form
 */
export interface UpdateFormParams extends FormIdParams {
  /** Form name */
  name: string;
  /** Optional form description */
  description?: string;
  /** Optional rules to match forms */
  matchFormRules?: string;
  /** Optional rules to match pages */
  matchPageRules?: string;
  /** Optional conversion rule option */
  conversionRuleOption?: string;
  /** Optional conversion rules */
  conversionRules?: string;
}

/**
 * Parameters for form report methods
 */
export interface FormReportParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Form ID */
  idForm: number | string;
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for general form analytics data
 */
export interface FormAnalyticsParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional form ID to filter by */
  idForm?: string | number;
  /** Optional segment definition */
  segment?: string;
  /** Optional columns to restrict the returned data */
  columns?: string;
}

/**
 * Parameters for form counters
 */
export interface FormCountersParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Number of minutes to look back */
  lastMinutes: number | string;
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for popular forms
 */
export interface PopularFormsParams extends FormCountersParams {
  /** Optional limit of forms to return */
  filter_limit?: number | string;
}

/**
 * Parameters for updating field display names
 */
export interface UpdateFieldDisplayNameParams extends FormIdParams {
  /** Object with field name/display name pairs */
  fields: Record<string, string>;
}

/**
 * Parameters for forms by statuses
 */
export interface FormsByStatusesParams extends FormParams {
  /** Array of status values */
  statuses: string[] | string;
}

export class FormAnalyticsModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Add a new form to be tracked
   *
   * @param params Parameters for adding a new form
   * @returns Promise with the API response
   */
  async addForm(params: AddFormParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.addForm", params);
    }
    return await this.client.request("FormAnalytics.addForm", params);
  }

  /**
   * Update an existing form
   *
   * @param params Parameters for updating a form
   * @returns Promise with the API response
   */
  async updateForm(params: UpdateFormParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.updateForm", params);
    }
    return await this.client.request("FormAnalytics.updateForm", params);
  }

  /**
   * Get a specific form
   *
   * @param params Parameters containing site ID and form ID
   * @returns Promise with the form details
   */
  async getForm(params: FormIdParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.getForm", params);
    }
    return await this.client.request("FormAnalytics.getForm", params);
  }

  /**
   * Get all forms for a site
   *
   * @param params Parameters containing the site ID
   * @returns Promise with the list of forms
   */
  async getForms(params: FormParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.getForms", params);
    }
    return await this.client.request("FormAnalytics.getForms", params);
  }

  /**
   * Get forms by specific statuses
   *
   * @param params Parameters containing site ID and statuses
   * @returns Promise with the filtered list of forms
   */
  async getFormsByStatuses(params: FormsByStatusesParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.getFormsByStatuses", params);
    }
    return await this.client.request(
      "FormAnalytics.getFormsByStatuses",
      params
    );
  }

  /**
   * Delete a form
   *
   * @param params Parameters containing site ID and form ID
   * @returns Promise with the API response
   */
  async deleteForm(params: FormIdParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.deleteForm", params);
    }
    return await this.client.request("FormAnalytics.deleteForm", params);
  }

  /**
   * Archive a form
   *
   * @param params Parameters containing site ID and form ID
   * @returns Promise with the API response
   */
  async archiveForm(params: FormIdParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.archiveForm", params);
    }
    return await this.client.request("FormAnalytics.archiveForm", params);
  }

  /**
   * Get form analytics data
   *
   * @param params Parameters for the general form analytics data
   * @returns Promise with the form analytics data
   */
  async get(params: FormAnalyticsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.get", params);
    }
    return await this.client.request("FormAnalytics.get", params);
  }

  /**
   * Get entry fields report
   *
   * @param params Parameters for form report
   * @returns Promise with the entry fields report
   */
  async getEntryFields(params: FormReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.getEntryFields", params);
    }
    return await this.client.request("FormAnalytics.getEntryFields", params);
  }

  /**
   * Get drop off fields report
   *
   * @param params Parameters for form report
   * @returns Promise with the drop off fields report
   */
  async getDropOffFields(params: FormReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.getDropOffFields", params);
    }
    return await this.client.request("FormAnalytics.getDropOffFields", params);
  }

  /**
   * Get page URLs for forms
   *
   * @param params Parameters for form report
   * @returns Promise with the page URLs report
   */
  async getPageUrls(params: FormReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.getPageUrls", params);
    }
    return await this.client.request("FormAnalytics.getPageUrls", params);
  }

  /**
   * Get field timings report
   *
   * @param params Parameters for form report
   * @returns Promise with the field timings report
   */
  async getFieldTimings(params: FormReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.getFieldTimings", params);
    }
    return await this.client.request("FormAnalytics.getFieldTimings", params);
  }

  /**
   * Get field size report
   *
   * @param params Parameters for form report
   * @returns Promise with the field size report
   */
  async getFieldSize(params: FormReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.getFieldSize", params);
    }
    return await this.client.request("FormAnalytics.getFieldSize", params);
  }

  /**
   * Get unneeded fields report
   *
   * @param params Parameters for form report
   * @returns Promise with the unneeded fields report
   */
  async getUneededFields(params: FormReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.getUneededFields", params);
    }
    return await this.client.request("FormAnalytics.getUneededFields", params);
  }

  /**
   * Get most used fields report
   *
   * @param params Parameters for form report
   * @returns Promise with the most used fields report
   */
  async getMostUsedFields(params: FormReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.getMostUsedFields", params);
    }
    return await this.client.request("FormAnalytics.getMostUsedFields", params);
  }

  /**
   * Get field corrections report
   *
   * @param params Parameters for form report
   * @returns Promise with the field corrections report
   */
  async getFieldCorrections(params: FormReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "FormAnalytics.getFieldCorrections",
        params
      );
    }
    return await this.client.request(
      "FormAnalytics.getFieldCorrections",
      params
    );
  }

  /**
   * Update form field display names
   *
   * @param params Parameters for updating field display names
   * @returns Promise with the API response
   */
  async updateFormFieldDisplayName(
    params: UpdateFieldDisplayNameParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "FormAnalytics.updateFormFieldDisplayName",
        params
      );
    }
    return await this.client.request(
      "FormAnalytics.updateFormFieldDisplayName",
      params
    );
  }

  /**
   * Get form analytics counters for the specified time period
   *
   * @param params Parameters for form counters
   * @returns Promise with the counters
   */
  async getCounters(params: FormCountersParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.getCounters", params);
    }
    return await this.client.request("FormAnalytics.getCounters", params);
  }

  /**
   * Get current most popular forms
   *
   * @param params Parameters for popular forms
   * @returns Promise with the popular forms list
   */
  async getCurrentMostPopularForms(params: PopularFormsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "FormAnalytics.getCurrentMostPopularForms",
        params
      );
    }
    return await this.client.request(
      "FormAnalytics.getCurrentMostPopularForms",
      params
    );
  }

  /**
   * Get auto creation settings
   *
   * @param params Parameters containing the site ID
   * @returns Promise with the auto creation settings
   */
  async getAutoCreationSettings(params: FormParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "FormAnalytics.getAutoCreationSettings",
        params
      );
    }
    return await this.client.request(
      "FormAnalytics.getAutoCreationSettings",
      params
    );
  }

  /**
   * Get available form statuses
   *
   * @returns Promise with the list of available statuses
   */
  async getAvailableStatuses(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.getAvailableStatuses", {});
    }
    return await this.client.request("FormAnalytics.getAvailableStatuses");
  }

  /**
   * Get available form rules
   *
   * @returns Promise with the list of available form rules
   */
  async getAvailableFormRules(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.getAvailableFormRules", {});
    }
    return await this.client.request("FormAnalytics.getAvailableFormRules");
  }

  /**
   * Get available page rules
   *
   * @returns Promise with the list of available page rules
   */
  async getAvailablePageRules(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("FormAnalytics.getAvailablePageRules", {});
    }
    return await this.client.request("FormAnalytics.getAvailablePageRules");
  }

  /**
   * Get available conversion rule options
   *
   * @returns Promise with the list of available conversion rule options
   */
  async getAvailableConversionRuleOptions(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "FormAnalytics.getAvailableConversionRuleOptions",
        {}
      );
    }
    return await this.client.request(
      "FormAnalytics.getAvailableConversionRuleOptions"
    );
  }
}
