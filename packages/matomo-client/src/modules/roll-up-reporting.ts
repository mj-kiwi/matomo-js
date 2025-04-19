/**
 * RollUpReporting API Module
 * API for plugin RollUpReporting to manage roll-up reporting features
 */

import { CoreReportingClient, RequestParams } from "./core.js";

/**
 * Parameters for adding a roll-up
 */
export interface AddRollUpParams extends RequestParams {
  /** Name of the roll-up */
  name: string;
  /** Array of site IDs to include in the roll-up */
  sourceIdSites: (number | string)[];
  /** Timezone for the roll-up */
  timezone: string;
  /** Currency code for the roll-up */
  currency: string;
}

/**
 * Parameters for updating a roll-up
 */
export interface UpdateRollUpParams extends RequestParams {
  /** ID of the roll-up site */
  idSite: number | string;
  /** New name for the roll-up */
  name?: string;
  /** New array of site IDs to include */
  sourceIdSites?: (number | string)[];
  /** New timezone */
  timezone?: string;
  /** New currency code */
  currency?: string;
}

export class RollUpReportingModule {
  /**
   * @param core Core reporting client instance
   */
  constructor(private core: CoreReportingClient) {}

  /**
   * Add a new roll-up
   *
   * @param params Parameters for adding a roll-up
   */
  async addRollUp(params: AddRollUpParams): Promise<any> {
    return this.core.request<any>("RollUpReporting.addRollUp", params);
  }

  /**
   * Update an existing roll-up
   *
   * @param params Parameters for updating a roll-up
   */
  async updateRollUp(params: UpdateRollUpParams): Promise<any> {
    return this.core.request<any>("RollUpReporting.updateRollUp", params);
  }

  /**
   * Get all roll-ups
   */
  async getRollUps(): Promise<any[]> {
    return this.core.request<any[]>("RollUpReporting.getRollUps");
  }
}
