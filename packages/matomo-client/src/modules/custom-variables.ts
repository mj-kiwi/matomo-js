/**
 * Matomo CustomVariables Module
 * The Custom Variables API lets you access reports for your Custom Variables names and values.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

export interface SlotUsage {
  name: string;
  scope: string;
}

/**
 * Parameters for getting custom variables
 */
export interface CustomVariablesParams extends RequestParams {
  /** Site ID */
  idSite: string | number;
  /** Period (day, week, month, year, etc.) */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
  /** Whether to expand the results */
  expanded?: string | number;
  /** Whether to return a flat array */
  flat?: string | number;
}

/**
 * Parameters for getting custom variable values
 */
export interface CustomVariableValuesParams extends CustomVariablesParams {
  /** Subtable ID (custom variable ID) */
  idSubtable: string | number;
}

/**
 * Parameters for getting usage of slots
 */
export interface SlotsUsageParams extends RequestParams {
  /** Site ID */
  idSite: string | number;
}

export class CustomVariablesModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get custom variables reports
   *
   * @param params Parameters for getting custom variables
   * @returns Custom variables report data
   */
  async getCustomVariables(params: CustomVariablesParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "CustomVariables.getCustomVariables",
        params
      );
    }
    return this.client.request("CustomVariables.getCustomVariables", params);
  }

  /**
   * Get custom variable values for a specific variable ID
   *
   * @param params Parameters for getting custom variable values
   * @returns Custom variable values data
   */
  async getCustomVariablesValuesFromNameId(
    params: CustomVariableValuesParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "CustomVariables.getCustomVariablesValuesFromNameId",
        params
      );
    }
    return this.client.request(
      "CustomVariables.getCustomVariablesValuesFromNameId",
      params
    );
  }

  /**
   * Get information about the usage of custom variable slots
   *
   * @param params Parameters containing site ID
   * @returns Information about custom variable slots usage
   */
  async getUsagesOfSlots(params: SlotsUsageParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("CustomVariables.getUsagesOfSlots", params);
    }
    return this.client.request("CustomVariables.getUsagesOfSlots", params);
  }
}
