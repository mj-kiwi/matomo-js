/**
 * Matomo Feedback Module
 * API for plugin Feedback
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for sending feature feedback
 */
export interface SendFeatureFeedbackParams {
  /** Name of the feature */
  featureName: string;
  /** Whether the user likes the feature */
  like?: string;
  /** User's choice */
  choice?: string;
  /** Additional message from the user */
  message?: string;
}

/**
 * Parameters for sending survey feedback
 */
export interface SendSurveyFeedbackParams {
  /** The survey question */
  question: string;
  /** Additional message from the user */
  message?: string;
}

export class FeedbackModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Send feedback for a feature
   *
   * @param params Parameters for sending feedback for a feature
   * @returns Promise with the API response
   */
  async sendFeedbackForFeature(
    params: SendFeatureFeedbackParams
  ): Promise<any> {
    const requestParams: RequestParams = {
      featureName: params.featureName,
    };

    if (params.like) requestParams.like = params.like;
    if (params.choice) requestParams.choice = params.choice;
    if (params.message) requestParams.message = params.message;

    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "Feedback.sendFeedbackForFeature",
        requestParams
      );
    }
    return this.client.request(
      "Feedback.sendFeedbackForFeature",
      requestParams
    );
  }

  /**
   * Send feedback for a survey
   *
   * @param params Parameters for sending feedback for a survey
   * @returns Promise with the API response
   */
  async sendFeedbackForSurvey(params: SendSurveyFeedbackParams): Promise<any> {
    const requestParams: RequestParams = {
      question: params.question,
    };

    if (params.message) requestParams.message = params.message;

    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "Feedback.sendFeedbackForSurvey",
        requestParams
      );
    }
    return this.client.request("Feedback.sendFeedbackForSurvey", requestParams);
  }

  /**
   * Update feedback reminder date
   *
   * @returns Promise with the API response
   */
  async updateFeedbackReminderDate(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Feedback.updateFeedbackReminderDate", {});
    }
    return this.client.request("Feedback.updateFeedbackReminderDate", {});
  }
}
