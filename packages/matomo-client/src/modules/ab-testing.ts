/**
 * Matomo A/B Testing Module
 * Provides access to A/B testing functionality in Matomo
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class AbTestingModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get metrics overview for an experiment
   *
   * @param idSite Site ID
   * @param period Period to request data for (day, week, month, year, range)
   * @param date Date string
   * @param idExperiment Experiment ID
   * @param segment Optional segment definition
   */
  async getMetricsOverview(
    idSite: number | string,
    period: string,
    date: string,
    idExperiment: number | string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idExperiment,
    };

    if (segment) params.segment = segment;

    return this.client.request('AbTesting.getMetricsOverview', params);
  }

  /**
   * Get detailed metrics for a specific success metric in an experiment
   *
   * @param idSite Site ID
   * @param period Period to request data for (day, week, month, year, range)
   * @param date Date string
   * @param idExperiment Experiment ID
   * @param successMetric Success metric to analyze
   * @param segment Optional segment definition
   */
  async getMetricDetails(
    idSite: number | string,
    period: string,
    date: string,
    idExperiment: number | string,
    successMetric: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idExperiment,
      successMetric,
    };

    if (segment) params.segment = segment;

    return this.client.request('AbTesting.getMetricDetails', params);
  }

  /**
   * Add a new experiment
   *
   * @param idSite Site ID
   * @param name Experiment name
   * @param hypothesis Experiment hypothesis
   * @param description Experiment description
   * @param variations Array of experiment variations
   * @param includedTargets Targeting rules for including visitors in the experiment
   * @param successMetrics Array of metrics to measure success
   */
  async addExperiment(
    idSite: number | string,
    name: string,
    hypothesis: string,
    description: string,
    variations: any[],
    includedTargets: any[],
    successMetrics: any[]
  ): Promise<any> {
    return this.client.request('AbTesting.addExperiment', {
      idSite,
      name,
      hypothesis,
      description,
      variations,
      includedTargets,
      successMetrics,
    });
  }

  /**
   * Update an existing experiment
   *
   * @param idExperiment Experiment ID
   * @param idSite Site ID
   * @param name Experiment name
   * @param description Experiment description
   * @param hypothesis Experiment hypothesis
   * @param variations Array of experiment variations
   * @param confidenceThreshold Confidence threshold for statistical significance
   * @param mdeRelative Minimum detectable effect (relative)
   * @param percentageParticipants Percentage of visitors to include in experiment
   * @param successMetrics Array of metrics to measure success
   * @param includedTargets Targeting rules for including visitors
   * @param excludedTargets Targeting rules for excluding visitors
   * @param startDate Optional start date
   * @param endDate Optional end date
   * @param forwardUtmParams Whether to forward UTM params
   * @param forwardAllQueryParams Whether to forward all query params
   */
  async updateExperiment(
    idExperiment: number | string,
    idSite: number | string,
    name: string,
    description: string,
    hypothesis: string,
    variations: any[],
    confidenceThreshold: number,
    mdeRelative: number,
    percentageParticipants: number,
    successMetrics: any[],
    includedTargets: any[],
    excludedTargets: any[] = [],
    startDate: string = '',
    endDate: string = '',
    forwardUtmParams: boolean | string = false,
    forwardAllQueryParams: boolean | string = false
  ): Promise<any> {
    const params: RequestParams = {
      idExperiment,
      idSite,
      name,
      description,
      hypothesis,
      variations,
      confidenceThreshold,
      mdeRelative,
      percentageParticipants,
      successMetrics,
      includedTargets,
    };

    if (excludedTargets.length) params.excludedTargets = excludedTargets;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (forwardUtmParams) params.forwardUtmParams = forwardUtmParams;
    if (forwardAllQueryParams)
      params.forwardAllQueryParams = forwardAllQueryParams;

    return this.client.request('AbTesting.updateExperiment', params);
  }

  /**
   * Start an experiment
   *
   * @param idExperiment Experiment ID
   * @param idSite Site ID
   */
  async startExperiment(
    idExperiment: number | string,
    idSite: number | string
  ): Promise<any> {
    return this.client.request('AbTesting.startExperiment', {
      idExperiment,
      idSite,
    });
  }

  /**
   * Finish an experiment
   *
   * @param idExperiment Experiment ID
   * @param idSite Site ID
   */
  async finishExperiment(
    idExperiment: number | string,
    idSite: number | string
  ): Promise<any> {
    return this.client.request('AbTesting.finishExperiment', {
      idExperiment,
      idSite,
    });
  }

  /**
   * Archive an experiment
   *
   * @param idExperiment Experiment ID
   * @param idSite Site ID
   */
  async archiveExperiment(
    idExperiment: number | string,
    idSite: number | string
  ): Promise<any> {
    return this.client.request('AbTesting.archiveExperiment', {
      idExperiment,
      idSite,
    });
  }

  /**
   * Get JavaScript include template for A/B testing
   * Returns the JavaScript code needed to integrate A/B testing on a site
   */
  async getJsIncludeTemplate(): Promise<any> {
    return this.client.request('AbTesting.getJsIncludeTemplate');
  }

  /**
   * Get JavaScript experiment template
   * Returns the JavaScript code for a specific experiment
   *
   * @param idExperiment Experiment ID
   * @param idSite Site ID
   */
  async getJsExperimentTemplate(
    idExperiment: number | string,
    idSite: number | string
  ): Promise<any> {
    return this.client.request('AbTesting.getJsExperimentTemplate', {
      idExperiment,
      idSite,
    });
  }

  /**
   * Get all experiments for a site
   *
   * @param idSite Site ID
   */
  async getAllExperiments(idSite: number | string): Promise<any> {
    return this.client.request('AbTesting.getAllExperiments', { idSite });
  }

  /**
   * Get active experiments for a site
   *
   * @param idSite Site ID
   */
  async getActiveExperiments(idSite: number | string): Promise<any> {
    return this.client.request('AbTesting.getActiveExperiments', { idSite });
  }

  /**
   * Get experiments by statuses
   *
   * @param idSite Site ID
   * @param statuses Array of status strings
   */
  async getExperimentsByStatuses(
    idSite: number | string,
    statuses: string[]
  ): Promise<any> {
    return this.client.request('AbTesting.getExperimentsByStatuses', {
      idSite,
      statuses,
    });
  }

  /**
   * Get a specific experiment
   *
   * @param idExperiment Experiment ID
   * @param idSite Site ID
   */
  async getExperiment(
    idExperiment: number | string,
    idSite: number | string
  ): Promise<any> {
    return this.client.request('AbTesting.getExperiment', {
      idExperiment,
      idSite,
    });
  }

  /**
   * Delete an experiment
   *
   * @param idExperiment Experiment ID
   * @param idSite Site ID
   */
  async deleteExperiment(
    idExperiment: number | string,
    idSite: number | string
  ): Promise<any> {
    return this.client.request('AbTesting.deleteExperiment', {
      idExperiment,
      idSite,
    });
  }

  /**
   * Get available experiment statuses
   *
   * @param idSite Site ID
   */
  async getAvailableStatuses(idSite: number | string): Promise<any> {
    return this.client.request('AbTesting.getAvailableStatuses', { idSite });
  }

  /**
   * Get available success metrics
   *
   * @param idSite Site ID
   */
  async getAvailableSuccessMetrics(idSite: number | string): Promise<any> {
    return this.client.request('AbTesting.getAvailableSuccessMetrics', {
      idSite,
    });
  }

  /**
   * Get available target attributes
   * Returns the list of attributes that can be used for targeting
   */
  async getAvailableTargetAttributes(): Promise<any> {
    return this.client.request('AbTesting.getAvailableTargetAttributes');
  }

  /**
   * Get experiments with reports
   *
   * @param idSite Site ID
   */
  async getExperimentsWithReports(idSite: number | string): Promise<any> {
    return this.client.request('AbTesting.getExperimentsWithReports', {
      idSite,
    });
  }
}
