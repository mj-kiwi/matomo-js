/**
 * Matomo CustomDimensions Module
 * The Custom Dimensions API lets you manage and access reports for your configured Custom Dimensions.
 */

import { CoreReportingClient } from './core.js';

export interface CustomDimension {
  idcustomdimension: string;
  name: string;
  active: boolean;
  extractions: { dimension: string; pattern: string }[];
  scope: string;
  case_sensitive?: boolean;
}

export type ExtractionDimension = {
  value: string;
  name: string;
};

export type Scope = {
  value: string;
  name: string;
};

export class CustomDimensionsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get a specific Custom Dimension report
   * @param idDimension ID of the custom dimension
   * @param idSite Site ID
   * @param period Period for the report
   * @param date Date for the report
   * @param segment Optional segment
   * @param expanded Optional expanded parameter
   * @param flat Optional flat parameter
   * @param idSubtable Optional idSubtable parameter
   * @returns Promise with the custom dimension data
   */
  getCustomDimension(
    idDimension: string | number,
    idSite: string | number,
    period: string,
    date: string,
    segment: string = '',
    expanded: string | number = '',
    flat: string | number = '',
    idSubtable: string | number = ''
  ): Promise<any> {
    const params: Record<string, any> = {
      idDimension,
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (expanded !== '') params.expanded = expanded;
    if (flat !== '') params.flat = flat;
    if (idSubtable !== '') params.idSubtable = idSubtable;

    return this.client.request('CustomDimensions.getCustomDimension', params);
  }

  /**
   * Configure a new Custom Dimension
   * @param idSite Site ID
   * @param name Name of the custom dimension
   * @param scope Scope of the custom dimension
   * @param active Whether the custom dimension is active
   * @param extractions Optional extractions configuration
   * @param caseSensitive Optional case sensitivity setting
   * @returns Promise with the response
   */
  configureNewCustomDimension(
    idSite: string | number,
    name: string,
    scope: string,
    active: string | number | boolean,
    extractions: any = 'Array',
    caseSensitive: string | number = '1'
  ): Promise<any> {
    return this.client.request('CustomDimensions.configureNewCustomDimension', {
      idSite,
      name,
      scope,
      active: typeof active === 'boolean' ? (active ? 1 : 0) : active,
      extractions,
      caseSensitive,
    });
  }

  /**
   * Configure an existing Custom Dimension
   * @param idDimension ID of the custom dimension
   * @param idSite Site ID
   * @param name Name of the custom dimension
   * @param active Whether the custom dimension is active
   * @param extractions Optional extractions configuration
   * @param caseSensitive Optional case sensitivity setting
   * @returns Promise with the response
   */
  configureExistingCustomDimension(
    idDimension: string | number,
    idSite: string | number,
    name: string,
    active: string | number | boolean,
    extractions: any = 'Array',
    caseSensitive: string | number = ''
  ): Promise<any> {
    const params: Record<string, any> = {
      idDimension,
      idSite,
      name,
      active: typeof active === 'boolean' ? (active ? 1 : 0) : active,
      extractions,
    };

    if (caseSensitive !== '') params.caseSensitive = caseSensitive;

    return this.client.request(
      'CustomDimensions.configureExistingCustomDimension',
      params
    );
  }

  /**
   * Get all configured Custom Dimensions for a site
   * @param idSite Site ID
   * @returns Promise with the list of configured custom dimensions
   */
  getConfiguredCustomDimensions(
    idSite: string | number
  ): Promise<CustomDimension[]> {
    return this.client.request(
      'CustomDimensions.getConfiguredCustomDimensions',
      {
        idSite,
      }
    );
  }

  /**
   * Get configured Custom Dimensions for a site with a specific scope
   * @param idSite Site ID
   * @param scope Scope to filter dimensions by
   * @returns Promise with the list of configured custom dimensions with the given scope
   */
  getConfiguredCustomDimensionsHavingScope(
    idSite: string | number,
    scope: string
  ): Promise<CustomDimension[]> {
    return this.client.request(
      'CustomDimensions.getConfiguredCustomDimensionsHavingScope',
      {
        idSite,
        scope,
      }
    );
  }

  /**
   * Get available scopes for Custom Dimensions
   * @param idSite Site ID
   * @returns Promise with the list of available scopes
   */
  getAvailableScopes(idSite: string | number): Promise<Scope[]> {
    return this.client.request('CustomDimensions.getAvailableScopes', {
      idSite,
    });
  }

  /**
   * Get available extraction dimensions
   * @returns Promise with the list of available extraction dimensions
   */
  getAvailableExtractionDimensions(): Promise<ExtractionDimension[]> {
    return this.client.request(
      'CustomDimensions.getAvailableExtractionDimensions',
      {}
    );
  }
}
