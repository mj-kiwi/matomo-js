import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CoreReportingClient } from '../src/modules/core';
import { FeedbackModule } from '../src/modules/feedback';

describe('Feedback Module', () => {
  // Mock CoreReportingClient with a spy on the request method
  const mockClient = {
    request: vi.fn().mockImplementation(() => Promise.resolve({})),
  } as unknown as CoreReportingClient;

  const feedback = new FeedbackModule(mockClient);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('sendFeedbackForFeature should make correct API call with all parameters', async () => {
    await feedback.sendFeedbackForFeature(
      'segmentation',
      'yes',
      'option1',
      'Great feature!'
    );

    expect(mockClient.request).toHaveBeenCalledWith(
      'Feedback.sendFeedbackForFeature',
      {
        featureName: 'segmentation',
        like: 'yes',
        choice: 'option1',
        message: 'Great feature!',
      }
    );
  });

  it('sendFeedbackForFeature should handle required parameters only', async () => {
    await feedback.sendFeedbackForFeature('segmentation');

    expect(mockClient.request).toHaveBeenCalledWith(
      'Feedback.sendFeedbackForFeature',
      {
        featureName: 'segmentation',
      }
    );
  });

  it('sendFeedbackForSurvey should make correct API call with all parameters', async () => {
    await feedback.sendFeedbackForSurvey(
      'How satisfied are you?',
      'Very satisfied!'
    );

    expect(mockClient.request).toHaveBeenCalledWith(
      'Feedback.sendFeedbackForSurvey',
      {
        question: 'How satisfied are you?',
        message: 'Very satisfied!',
      }
    );
  });

  it('sendFeedbackForSurvey should handle required parameters only', async () => {
    await feedback.sendFeedbackForSurvey('How satisfied are you?');

    expect(mockClient.request).toHaveBeenCalledWith(
      'Feedback.sendFeedbackForSurvey',
      {
        question: 'How satisfied are you?',
      }
    );
  });

  it('updateFeedbackReminderDate should make correct API call', async () => {
    await feedback.updateFeedbackReminderDate();

    expect(mockClient.request).toHaveBeenCalledWith(
      'Feedback.updateFeedbackReminderDate',
      {}
    );
  });
});
