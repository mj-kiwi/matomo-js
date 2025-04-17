/**
 * Matomo Feedback Module
 * API for plugin Feedback
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class FeedbackModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Send feedback for a feature
   *
   * @param featureName Name of the feature
   * @param like Whether the user likes the feature
   * @param choice User's choice
   * @param message Additional message from the user
   * @returns Promise with the API response
   */
  async sendFeedbackForFeature(
    featureName: string,
    like: string = '',
    choice: string = '',
    message: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      featureName,
    };

    if (like) params.like = like;
    if (choice) params.choice = choice;
    if (message) params.message = message;

    return this.client.request('Feedback.sendFeedbackForFeature', params);
  }

  /**
   * Send feedback for a survey
   *
   * @param question The survey question
   * @param message Additional message from the user
   * @returns Promise with the API response
   */
  async sendFeedbackForSurvey(
    question: string,
    message: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      question,
    };

    if (message) params.message = message;

    return this.client.request('Feedback.sendFeedbackForSurvey', params);
  }

  /**
   * Update feedback reminder date
   *
   * @returns Promise with the API response
   */
  async updateFeedbackReminderDate(): Promise<any> {
    return this.client.request('Feedback.updateFeedbackReminderDate', {});
  }
}
