/**
 * Matomo Login Module
 *
 * API for plugin Login. Provides methods for managing login-related security features.
 */

import { CoreReportingClient } from './core.js';

export class LoginModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Unblock all IPs that were blocked due to brute force protection
   *
   * @returns Promise with success information
   */
  async unblockBruteForceIPs(): Promise<any> {
    return this.client.request('Login.unblockBruteForceIPs');
  }
}
