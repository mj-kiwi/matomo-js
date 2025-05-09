/**
 * Matomo UserId Module
 * API for plugin UserId. Allows to get User IDs table.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for UserId API methods
 */
export interface UserIdParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
}

export class UserIdModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get a list of users with their visits
   *
   * @param params Parameters for getting users
   */
  async getUsers(params: UserIdParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UserId.getUsers", params);
    }
    return await this.client.request("UserId.getUsers", params);
  }
}
