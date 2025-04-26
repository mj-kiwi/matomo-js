/**
 * Matomo Tour Module
 * API for Tour plugin which helps you getting familiar with Matomo.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for challenge operations
 */
export interface ChallengeParams extends RequestParams {
  /** The ID of the challenge */
  id: string | number;
}

export class TourModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get the list of challenges
   */
  async getChallenges(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Tour.getChallenges", {});
    }
    return this.client.request("Tour.getChallenges", {});
  }

  /**
   * Skip a challenge
   *
   * @param params Parameters containing the challenge ID to skip
   */
  async skipChallenge(params: ChallengeParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Tour.skipChallenge", params);
    }
    return this.client.request("Tour.skipChallenge", params);
  }

  /**
   * Get the current level
   */
  async getLevel(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Tour.getLevel", {});
    }
    return this.client.request("Tour.getLevel", {});
  }
}
