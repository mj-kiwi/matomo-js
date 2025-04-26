/**
 * Matomo A/B Testing Module
 * Provides access to A/B Testing data
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for the getMetricsOverview method
 */
export interface GetMetricsOverviewParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for (day, week, month, year, range) */
  period: string;
  /** Date string */
  date: string;
  /** Experiment ID */
  idExperiment: number | string;
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for the getMetricDetails method
 */
export interface GetMetricDetailsParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for (day, week, month, year, range) */
  period: string;
  /** Date string */
  date: string;
  /** Experiment ID */
  idExperiment: number | string;
  /** Success metric to analyze */
  successMetric: string;
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for the addExperiment method
 */
export interface AddExperimentParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Experiment name */
  name: string;
  /** Experiment hypothesis */
  hypothesis: string;
  /** Experiment description */
  description: string;
  /** Array of experiment variations */
  variations: any[];
  /** Targeting rules for including visitors in the experiment */
  includedTargets: any[];
  /** Array of metrics to measure success */
  successMetrics: any[];
}

/**
 * Parameters for the updateExperiment method
 */
export interface UpdateExperimentParams extends RequestParams {
  /** Experiment ID */
  idExperiment: number | string;
  /** Site ID */
  idSite: number | string;
  /** Experiment name */
  name: string;
  /** Experiment description */
  description: string;
  /** Experiment hypothesis */
  hypothesis: string;
  /** Array of experiment variations */
  variations: any[];
  /** Confidence threshold for statistical significance */
  confidenceThreshold: number;
  /** Minimum detectable effect (relative) */
  mdeRelative: number;
  /** Percentage of visitors to include in experiment */
  percentageParticipants: number;
  /** Array of metrics to measure success */
  successMetrics: any[];
  /** Targeting rules for including visitors */
  includedTargets: any[];
  /** Targeting rules for excluding visitors */
  excludedTargets?: any[];
  /** Optional start date */
  startDate?: string;
  /** Optional end date */
  endDate?: string;
  /** Whether to forward UTM params */
  forwardUtmParams?: boolean | string;
  /** Whether to forward all query params */
  forwardAllQueryParams?: boolean | string;
}

/**
 * Parameters for experiment operations (start, finish, archive, delete, etc.)
 */
export interface ExperimentOperationParams extends RequestParams {
  /** Experiment ID */
  idExperiment: number | string;
  /** Site ID */
  idSite: number | string;
}

/**
 * Parameters for the getExperimentsByStatuses method
 */
export interface GetExperimentsByStatusesParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Array of status strings */
  statuses: string[];
}

/**
 * Parameters for site-specific operations
 */
export interface SiteParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
}

/**
 * Parameters for methods that don't require any specific parameters
 */
export interface EmptyParams extends RequestParams {}

export class AbTestingModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get metrics overview for an experiment
   *
   * @param params Parameters for getting metrics overview
   */
  async getMetricsOverview(params: GetMetricsOverviewParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("AbTesting.getMetricsOverview", params);
    }
    return await this.client.request("AbTesting.getMetricsOverview", params);
  }

  /**
   * Get detailed metrics for a specific success metric in an experiment
   *
   * @param params Parameters for getting metric details
   */
  async getMetricDetails(params: GetMetricDetailsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("AbTesting.getMetricDetails", params);
    }
    return await this.client.request("AbTesting.getMetricDetails", params);
  }

  /**
   * Add a new experiment
   *
   * @param params Parameters for adding a new experiment
   */
  async addExperiment(params: AddExperimentParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("AbTesting.addExperiment", params);
    }
    return await this.client.request("AbTesting.addExperiment", params);
  }

  /**
   * Update an existing experiment
   *
   * @param params Parameters for updating an experiment
   */
  async updateExperiment(params: UpdateExperimentParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("AbTesting.updateExperiment", params);
    }
    return await this.client.request("AbTesting.updateExperiment", params);
  }

  /**
   * Start an experiment
   *
   * @param params Parameters specifying experiment and site IDs
   */
  async startExperiment(params: ExperimentOperationParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("AbTesting.startExperiment", params);
    }
    return await this.client.request("AbTesting.startExperiment", params);
  }

  /**
   * Finish an experiment
   *
   * @param params Parameters specifying experiment and site IDs
   */
  async finishExperiment(params: ExperimentOperationParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("AbTesting.finishExperiment", params);
    }
    return await this.client.request("AbTesting.finishExperiment", params);
  }

  /**
   * Archive an experiment
   *
   * @param params Parameters specifying experiment and site IDs
   */
  async archiveExperiment(params: ExperimentOperationParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("AbTesting.archiveExperiment", params);
    }
    return await this.client.request("AbTesting.archiveExperiment", params);
  }

  /**
   * Get JavaScript include template for A/B testing
   * Returns the JavaScript code needed to integrate A/B testing on a site
   *
   * @param params Empty parameters object
   */
  async getJsIncludeTemplate(params: EmptyParams = {}): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("AbTesting.getJsIncludeTemplate", params);
    }
    return await this.client.request("AbTesting.getJsIncludeTemplate", params);
  }

  /**
   * Get JavaScript experiment template
   * Returns the JavaScript code for a specific experiment
   *
   * @param params Parameters specifying experiment and site IDs
   */
  async getJsExperimentTemplate(
    params: ExperimentOperationParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "AbTesting.getJsExperimentTemplate",
        params
      );
    }
    return await this.client.request("AbTesting.getJsExperimentTemplate", params);
  }

  /**
   * Get all experiments for a site
   *
   * @param params Parameters specifying site ID
   */
  async getAllExperiments(params: SiteParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("AbTesting.getAllExperiments", params);
    }
    return await this.client.request("AbTesting.getAllExperiments", params);
  }

  /**
   * Get active experiments for a site
   *
   * @param params Parameters specifying site ID
   */
  async getActiveExperiments(params: SiteParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("AbTesting.getActiveExperiments", params);
    }
    return await this.client.request("AbTesting.getActiveExperiments", params);
  }

  /**
   * Get experiments by statuses
   *
   * @param params Parameters specifying site ID and statuses
   */
  async getExperimentsByStatuses(
    params: GetExperimentsByStatusesParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "AbTesting.getExperimentsByStatuses",
        params
      );
    }
    return await this.client.request("AbTesting.getExperimentsByStatuses", params);
  }

  /**
   * Get a specific experiment
   *
   * @param params Parameters specifying experiment and site IDs
   */
  async getExperiment(params: ExperimentOperationParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("AbTesting.getExperiment", params);
    }
    return await this.client.request("AbTesting.getExperiment", params);
  }

  /**
   * Delete an experiment
   *
   * @param params Parameters specifying experiment and site IDs
   */
  async deleteExperiment(params: ExperimentOperationParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("AbTesting.deleteExperiment", params);
    }
    return await this.client.request("AbTesting.deleteExperiment", params);
  }

  /**
   * Get available experiment statuses
   *
   * @param params Parameters specifying site ID
   */
  async getAvailableStatuses(params: SiteParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("AbTesting.getAvailableStatuses", params);
    }
    return await this.client.request("AbTesting.getAvailableStatuses", params);
  }

  /**
   * Get available success metrics
   *
   * @param params Parameters specifying site ID
   */
  async getAvailableSuccessMetrics(params: SiteParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "AbTesting.getAvailableSuccessMetrics",
        params
      );
    }
    return await this.client.request("AbTesting.getAvailableSuccessMetrics", params);
  }

  /**
   * Get available target attributes
   * Returns the list of attributes that can be used for targeting
   *
   * @param params Empty parameters object
   */
  async getAvailableTargetAttributes(params: EmptyParams = {}): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "AbTesting.getAvailableTargetAttributes",
        params
      );
    }
    return await this.client.request(
      "AbTesting.getAvailableTargetAttributes",
      params
    );
  }

  /**
   * Get experiments with reports
   *
   * @param params Parameters specifying site ID
   */
  async getExperimentsWithReports(params: SiteParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "AbTesting.getExperimentsWithReports",
        params
      );
    }
    return await this.client.request("AbTesting.getExperimentsWithReports", params);
  }
}
