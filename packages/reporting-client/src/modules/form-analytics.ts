/**
 * Matomo FormAnalytics Module
 *
 * The Form Analytics API lets you manage forms within Matomo and request all your form analytics
 * reports and metrics about how users interact with your forms.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class FormAnalyticsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Add a new form to be tracked
   *
   * @param idSite Site ID
   * @param name Form name
   * @param description Optional form description
   * @param matchFormRules Optional rules to match forms
   * @param matchPageRules Optional rules to match pages
   * @param conversionRuleOption Optional conversion rule option
   * @param conversionRules Optional conversion rules
   * @returns Promise with the API response
   */
  addForm(
    idSite: number | string,
    name: string,
    description: string = '',
    matchFormRules: string = '',
    matchPageRules: string = '',
    conversionRuleOption: string = 'page_visit',
    conversionRules: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      name,
    };

    if (description) params.description = description;
    if (matchFormRules) params.matchFormRules = matchFormRules;
    if (matchPageRules) params.matchPageRules = matchPageRules;
    if (conversionRuleOption)
      params.conversionRuleOption = conversionRuleOption;
    if (conversionRules) params.conversionRules = conversionRules;

    return this.client.request('FormAnalytics.addForm', params);
  }

  /**
   * Update an existing form
   *
   * @param idSite Site ID
   * @param idForm Form ID
   * @param name Form name
   * @param description Optional form description
   * @param matchFormRules Optional rules to match forms
   * @param matchPageRules Optional rules to match pages
   * @param conversionRuleOption Optional conversion rule option
   * @param conversionRules Optional conversion rules
   * @returns Promise with the API response
   */
  updateForm(
    idSite: number | string,
    idForm: number | string,
    name: string,
    description: string = '',
    matchFormRules: string = '',
    matchPageRules: string = '',
    conversionRuleOption: string = 'page_visit',
    conversionRules: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      idForm,
      name,
    };

    if (description) params.description = description;
    if (matchFormRules) params.matchFormRules = matchFormRules;
    if (matchPageRules) params.matchPageRules = matchPageRules;
    if (conversionRuleOption)
      params.conversionRuleOption = conversionRuleOption;
    if (conversionRules) params.conversionRules = conversionRules;

    return this.client.request('FormAnalytics.updateForm', params);
  }

  /**
   * Get a specific form
   *
   * @param idSite Site ID
   * @param idForm Form ID
   * @returns Promise with the form details
   */
  getForm(idSite: number | string, idForm: number | string): Promise<any> {
    return this.client.request('FormAnalytics.getForm', {
      idSite,
      idForm,
    });
  }

  /**
   * Get all forms for a site
   *
   * @param idSite Site ID
   * @returns Promise with the list of forms
   */
  getForms(idSite: number | string): Promise<any> {
    return this.client.request('FormAnalytics.getForms', { idSite });
  }

  /**
   * Get forms by specific statuses
   *
   * @param idSite Site ID
   * @param statuses Array of status values
   * @returns Promise with the filtered list of forms
   */
  getFormsByStatuses(
    idSite: number | string,
    statuses: string[] | string
  ): Promise<any> {
    return this.client.request('FormAnalytics.getFormsByStatuses', {
      idSite,
      statuses,
    });
  }

  /**
   * Delete a form
   *
   * @param idSite Site ID
   * @param idForm Form ID
   * @returns Promise with the API response
   */
  deleteForm(idSite: number | string, idForm: number | string): Promise<any> {
    return this.client.request('FormAnalytics.deleteForm', {
      idSite,
      idForm,
    });
  }

  /**
   * Archive a form
   *
   * @param idSite Site ID
   * @param idForm Form ID
   * @returns Promise with the API response
   */
  archiveForm(idSite: number | string, idForm: number | string): Promise<any> {
    return this.client.request('FormAnalytics.archiveForm', {
      idSite,
      idForm,
    });
  }

  /**
   * Get form analytics data
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idForm Optional form ID to filter by
   * @param segment Optional segment definition
   * @param columns Optional columns to restrict the returned data
   * @returns Promise with the form analytics data
   */
  get(
    idSite: number | string,
    period: string,
    date: string,
    idForm: string | number = '',
    segment: string = '',
    columns: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (idForm !== '') params.idForm = idForm;
    if (segment) params.segment = segment;
    if (columns) params.columns = columns;

    return this.client.request('FormAnalytics.get', params);
  }

  /**
   * Get entry fields report
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idForm Form ID
   * @param segment Optional segment definition
   * @returns Promise with the entry fields report
   */
  getEntryFields(
    idSite: number | string,
    period: string,
    date: string,
    idForm: number | string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idForm,
    };

    if (segment) params.segment = segment;

    return this.client.request('FormAnalytics.getEntryFields', params);
  }

  /**
   * Get drop off fields report
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idForm Form ID
   * @param segment Optional segment definition
   * @returns Promise with the drop off fields report
   */
  getDropOffFields(
    idSite: number | string,
    period: string,
    date: string,
    idForm: number | string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idForm,
    };

    if (segment) params.segment = segment;

    return this.client.request('FormAnalytics.getDropOffFields', params);
  }

  /**
   * Get page URLs for forms
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idForm Form ID
   * @param segment Optional segment definition
   * @returns Promise with the page URLs report
   */
  getPageUrls(
    idSite: number | string,
    period: string,
    date: string,
    idForm: number | string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idForm,
    };

    if (segment) params.segment = segment;

    return this.client.request('FormAnalytics.getPageUrls', params);
  }

  /**
   * Get field timings report
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idForm Form ID
   * @param segment Optional segment definition
   * @returns Promise with the field timings report
   */
  getFieldTimings(
    idSite: number | string,
    period: string,
    date: string,
    idForm: number | string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idForm,
    };

    if (segment) params.segment = segment;

    return this.client.request('FormAnalytics.getFieldTimings', params);
  }

  /**
   * Get field size report
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idForm Form ID
   * @param segment Optional segment definition
   * @returns Promise with the field size report
   */
  getFieldSize(
    idSite: number | string,
    period: string,
    date: string,
    idForm: number | string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idForm,
    };

    if (segment) params.segment = segment;

    return this.client.request('FormAnalytics.getFieldSize', params);
  }

  /**
   * Get unneeded fields report
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idForm Form ID
   * @param segment Optional segment definition
   * @returns Promise with the unneeded fields report
   */
  getUneededFields(
    idSite: number | string,
    period: string,
    date: string,
    idForm: number | string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idForm,
    };

    if (segment) params.segment = segment;

    return this.client.request('FormAnalytics.getUneededFields', params);
  }

  /**
   * Get most used fields report
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idForm Form ID
   * @param segment Optional segment definition
   * @returns Promise with the most used fields report
   */
  getMostUsedFields(
    idSite: number | string,
    period: string,
    date: string,
    idForm: number | string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idForm,
    };

    if (segment) params.segment = segment;

    return this.client.request('FormAnalytics.getMostUsedFields', params);
  }

  /**
   * Get field corrections report
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idForm Form ID
   * @param segment Optional segment definition
   * @returns Promise with the field corrections report
   */
  getFieldCorrections(
    idSite: number | string,
    period: string,
    date: string,
    idForm: number | string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idForm,
    };

    if (segment) params.segment = segment;

    return this.client.request('FormAnalytics.getFieldCorrections', params);
  }

  /**
   * Update form field display names
   *
   * @param idSite Site ID
   * @param idForm Form ID
   * @param fields Object with field name/display name pairs
   * @returns Promise with the API response
   */
  updateFormFieldDisplayName(
    idSite: number | string,
    idForm: number | string,
    fields: Record<string, string> = {}
  ): Promise<any> {
    return this.client.request('FormAnalytics.updateFormFieldDisplayName', {
      idSite,
      idForm,
      fields,
    });
  }

  /**
   * Get form analytics counters for the specified time period
   *
   * @param idSite Site ID
   * @param lastMinutes Number of minutes to look back
   * @param segment Optional segment definition
   * @returns Promise with the counters
   */
  getCounters(
    idSite: number | string,
    lastMinutes: number | string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      lastMinutes,
    };

    if (segment) params.segment = segment;

    return this.client.request('FormAnalytics.getCounters', params);
  }

  /**
   * Get current most popular forms
   *
   * @param idSite Site ID
   * @param lastMinutes Number of minutes to look back
   * @param filter_limit Optional limit of forms to return
   * @param segment Optional segment definition
   * @returns Promise with the popular forms list
   */
  getCurrentMostPopularForms(
    idSite: number | string,
    lastMinutes: number | string,
    filter_limit: number | string = '5',
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      lastMinutes,
      filter_limit,
    };

    if (segment) params.segment = segment;

    return this.client.request(
      'FormAnalytics.getCurrentMostPopularForms',
      params
    );
  }

  /**
   * Get auto creation settings
   *
   * @param idSite Site ID
   * @returns Promise with the auto creation settings
   */
  getAutoCreationSettings(idSite: number | string): Promise<any> {
    return this.client.request('FormAnalytics.getAutoCreationSettings', {
      idSite,
    });
  }

  /**
   * Get available form statuses
   *
   * @returns Promise with the list of available statuses
   */
  getAvailableStatuses(): Promise<any> {
    return this.client.request('FormAnalytics.getAvailableStatuses');
  }

  /**
   * Get available form rules
   *
   * @returns Promise with the list of available form rules
   */
  getAvailableFormRules(): Promise<any> {
    return this.client.request('FormAnalytics.getAvailableFormRules');
  }

  /**
   * Get available page rules
   *
   * @returns Promise with the list of available page rules
   */
  getAvailablePageRules(): Promise<any> {
    return this.client.request('FormAnalytics.getAvailablePageRules');
  }

  /**
   * Get available conversion rule options
   *
   * @returns Promise with the list of available conversion rule options
   */
  getAvailableConversionRuleOptions(): Promise<any> {
    return this.client.request(
      'FormAnalytics.getAvailableConversionRuleOptions'
    );
  }
}
