/**
 * Matomo CustomVariables Module
 * The Custom Variables API lets you access reports for your Custom Variables names and values.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export interface SlotUsage {
  name: string;
  scope: string;
}

export class CustomVariablesModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get custom variables reports
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param segment Optional segment definition
   * @param expanded Whether to expand the results
   * @param flat Whether to return a flat array
   * @returns Custom variables report data
   */
  async getCustomVariables(
    idSite: string | number,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | number = '',
    flat: string | number = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) {
      params.segment = segment;
    }

    if (expanded !== '') {
      params.expanded = expanded;
    }

    if (flat !== '') {
      params.flat = flat;
    }

    return this.client.request('CustomVariables.getCustomVariables', params);
  }

  /**
   * Get custom variable values for a specific variable ID
   *
   * @param idSite Site ID
   * @param period Period (day, week, month, year, etc.)
   * @param date Date string
   * @param idSubtable Subtable ID (custom variable ID)
   * @param segment Optional segment definition
   * @returns Custom variable values data
   */
  async getCustomVariablesValuesFromNameId(
    idSite: string | number,
    period: string,
    date: string,
    idSubtable: string | number,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idSubtable,
    };

    if (segment) {
      params.segment = segment;
    }

    return this.client.request(
      'CustomVariables.getCustomVariablesValuesFromNameId',
      params
    );
  }

  /**
   * Get information about the usage of custom variable slots
   *
   * @param idSite Site ID
   * @returns Information about custom variable slots usage
   */
  async getUsagesOfSlots(
    idSite: string | number
  ): Promise<Record<string, SlotUsage>> {
    return this.client.request('CustomVariables.getUsagesOfSlots', {
      idSite,
    });
  }
}
