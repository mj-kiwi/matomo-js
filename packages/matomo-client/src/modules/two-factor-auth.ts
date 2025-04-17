/**
 * Matomo TwoFactorAuth Module
 * API for the Two Factor Authentication plugin
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class TwoFactorAuthModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Reset a user's two-factor authentication
   * 
   * @param userLogin Login name of the user to reset
   * @param passwordConfirmation User's password for confirmation
   */
  async resetTwoFactorAuth(
    userLogin: string,
    passwordConfirmation: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      userLogin,
    };

    if (passwordConfirmation) params.passwordConfirmation = passwordConfirmation;

    return this.client.request('TwoFactorAuth.resetTwoFactorAuth', params);
  }
}