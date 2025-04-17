/**
 * Matomo Tour Module
 * API for Tour plugin which helps you getting familiar with Matomo.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class TourModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get the list of challenges
   */
  async getChallenges(): Promise<any> {
    return this.client.request('Tour.getChallenges', {});
  }

  /**
   * Skip a challenge
   * 
   * @param id The ID of the challenge to skip
   */
  async skipChallenge(id: string | number): Promise<any> {
    const params: RequestParams = {
      id,
    };

    return this.client.request('Tour.skipChallenge', params);
  }

  /**
   * Get the current level
   */
  async getLevel(): Promise<any> {
    return this.client.request('Tour.getLevel', {});
  }
}