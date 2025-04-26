/**
 * Matomo TwoFactorAuth Module
 * API for the Two Factor Authentication plugin
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

export class TwoFactorAuthModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Reset a user's two-factor authentication
   *
   * @param options Object containing parameters
   * @param options.userLogin Login name of the user to reset
   * @param options.passwordConfirmation User's password for confirmation
   */
  async resetTwoFactorAuth(options: {
    userLogin: string;
    passwordConfirmation?: string;
  }): Promise<any> {
    const params: RequestParams = {
      userLogin: options.userLogin,
    };

    if (options.passwordConfirmation)
      params.passwordConfirmation = options.passwordConfirmation;

    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TwoFactorAuth.resetTwoFactorAuth", params);
    }
    return await this.client.request(
      "TwoFactorAuth.resetTwoFactorAuth",
      params
    );
  }
}
