/**
 * Matomo CustomDimensions Module
 * The Custom Dimensions API lets you manage and access reports for your configured Custom Dimensions.
 */

import { CoreReportingClient } from "./core.js";

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

/**
 * Parameters for getting a custom dimension report
 */
export interface GetCustomDimensionParams {
  /** ID of the custom dimension */
  idDimension: string | number;
  /** Site ID */
  idSite: string | number;
  /** Period for the report */
  period: string;
  /** Date for the report */
  date: string;
  /** Optional segment */
  segment?: string;
  /** Optional expanded parameter */
  expanded?: string | number;
  /** Optional flat parameter */
  flat?: string | number;
  /** Optional idSubtable parameter */
  idSubtable?: string | number;
}

/**
 * Parameters for configuring a new custom dimension
 */
export interface ConfigureNewCustomDimensionParams {
  /** Site ID */
  idSite: string | number;
  /** Name of the custom dimension */
  name: string;
  /** Scope of the custom dimension */
  scope: string;
  /** Whether the custom dimension is active */
  active: string | number | boolean;
  /** Optional extractions configuration */
  extractions?: any;
  /** Optional case sensitivity setting */
  caseSensitive?: string | number;
}

/**
 * Parameters for configuring an existing custom dimension
 */
export interface ConfigureExistingCustomDimensionParams {
  /** ID of the custom dimension */
  idDimension: string | number;
  /** Site ID */
  idSite: string | number;
  /** Name of the custom dimension */
  name: string;
  /** Whether the custom dimension is active */
  active: string | number | boolean;
  /** Optional extractions configuration */
  extractions?: any;
  /** Optional case sensitivity setting */
  caseSensitive?: string | number;
}

/**
 * Parameters for getting custom dimensions for a site
 */
export interface GetCustomDimensionsParams {
  /** Site ID */
  idSite: string | number;
}

/**
 * Parameters for getting custom dimensions with a specific scope
 */
export interface GetCustomDimensionsWithScopeParams {
  /** Site ID */
  idSite: string | number;
  /** Scope to filter dimensions by */
  scope: string;
}

export class CustomDimensionsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get a specific Custom Dimension report
   * @param params Parameters for getting a custom dimension report
   * @returns Promise with the custom dimension data
   */
  getCustomDimension(params: GetCustomDimensionParams): Promise<any> {
    const requestParams: Record<string, any> = {
      idDimension: params.idDimension,
      idSite: params.idSite,
      period: params.period,
      date: params.date,
    };

    if (params.segment) requestParams.segment = params.segment;
    if (params.expanded !== undefined) requestParams.expanded = params.expanded;
    if (params.flat !== undefined) requestParams.flat = params.flat;
    if (params.idSubtable !== undefined)
      requestParams.idSubtable = params.idSubtable;

    return this.client.request(
      "CustomDimensions.getCustomDimension",
      requestParams
    );
  }

  /**
   * Configure a new Custom Dimension
   * @param params Parameters for configuring a new custom dimension
   * @returns Promise with the response
   */
  configureNewCustomDimension(
    params: ConfigureNewCustomDimensionParams
  ): Promise<any> {
    return this.client.request("CustomDimensions.configureNewCustomDimension", {
      idSite: params.idSite,
      name: params.name,
      scope: params.scope,
      active:
        typeof params.active === "boolean"
          ? params.active
            ? 1
            : 0
          : params.active,
      extractions: params.extractions ?? "Array",
      caseSensitive: params.caseSensitive ?? "1",
    });
  }

  /**
   * Configure an existing Custom Dimension
   * @param params Parameters for configuring an existing custom dimension
   * @returns Promise with the response
   */
  configureExistingCustomDimension(
    params: ConfigureExistingCustomDimensionParams
  ): Promise<any> {
    const requestParams: Record<string, any> = {
      idDimension: params.idDimension,
      idSite: params.idSite,
      name: params.name,
      active:
        typeof params.active === "boolean"
          ? params.active
            ? 1
            : 0
          : params.active,
      extractions: params.extractions ?? "Array",
    };

    if (params.caseSensitive !== undefined)
      requestParams.caseSensitive = params.caseSensitive;

    return this.client.request(
      "CustomDimensions.configureExistingCustomDimension",
      requestParams
    );
  }

  /**
   * Get all configured Custom Dimensions for a site
   * @param params Parameters containing the site ID
   * @returns Promise with the list of configured custom dimensions
   */
  getConfiguredCustomDimensions(
    params: GetCustomDimensionsParams
  ): Promise<CustomDimension[]> {
    return this.client.request(
      "CustomDimensions.getConfiguredCustomDimensions",
      {
        idSite: params.idSite,
      }
    );
  }

  /**
   * Get configured Custom Dimensions for a site with a specific scope
   * @param params Parameters for getting custom dimensions with a specific scope
   * @returns Promise with the list of configured custom dimensions with the given scope
   */
  getConfiguredCustomDimensionsHavingScope(
    params: GetCustomDimensionsWithScopeParams
  ): Promise<CustomDimension[]> {
    return this.client.request(
      "CustomDimensions.getConfiguredCustomDimensionsHavingScope",
      {
        idSite: params.idSite,
        scope: params.scope,
      }
    );
  }

  /**
   * Get available scopes for Custom Dimensions
   * @param params Parameters containing the site ID
   * @returns Promise with the list of available scopes
   */
  getAvailableScopes(params: GetCustomDimensionsParams): Promise<Scope[]> {
    return this.client.request("CustomDimensions.getAvailableScopes", {
      idSite: params.idSite,
    });
  }

  /**
   * Get available extraction dimensions
   * @returns Promise with the list of available extraction dimensions
   */
  getAvailableExtractionDimensions(): Promise<ExtractionDimension[]> {
    return this.client.request(
      "CustomDimensions.getAvailableExtractionDimensions",
      {}
    );
  }
}
