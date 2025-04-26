/**
 * Matomo Login Module
 *
 * API for plugin Login. Provides methods for managing login-related security features.
 */

import { CoreReportingClient } from "./core.js";
import { BatchRequest } from "../batch-request.js";

export class LoginModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Unblock all IPs that were blocked due to brute force protection
   *
   * @returns Promise with success information
   */
  async unblockBruteForceIPs(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Login.unblockBruteForceIPs", {});
    }
    return this.client.request("Login.unblockBruteForceIPs");
  }
}
