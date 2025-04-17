/**
 * RollUpReporting API Module
 * API for plugin RollUpReporting to manage roll-up reporting features
 */

import { CoreReportingClient } from './core.js';

export class RollUpReportingModule {
  /**
   * @param core Core reporting client instance
   */
  constructor(private core: CoreReportingClient) {}

  /**
   * Add a new roll-up
   *
   * @param name Name of the roll-up
   * @param sourceIdSites Array of site IDs to include in the roll-up
   * @param timezone Timezone for the roll-up
   * @param currency Currency code for the roll-up
   */
  async addRollUp(
    name: string,
    sourceIdSites: (number | string)[],
    timezone: string,
    currency: string
  ): Promise<any> {
    return this.core.request<any>('RollUpReporting.addRollUp', {
      name,
      sourceIdSites,
      timezone,
      currency,
    });
  }

  /**
   * Update an existing roll-up
   *
   * @param idSite ID of the roll-up site
   * @param name New name for the roll-up
   * @param sourceIdSites New array of site IDs to include
   * @param timezone New timezone
   * @param currency New currency code
   */
  async updateRollUp(
    idSite: number | string,
    name: string = '',
    sourceIdSites: (number | string)[] = [],
    timezone: string = '',
    currency: string = ''
  ): Promise<any> {
    return this.core.request<any>('RollUpReporting.updateRollUp', {
      idSite,
      name,
      sourceIdSites,
      timezone,
      currency,
    });
  }

  /**
   * Get all roll-ups
   */
  async getRollUps(): Promise<any[]> {
    return this.core.request<any[]>('RollUpReporting.getRollUps');
  }
}
