/**
 * Matomo AdvertisingConversionExport Module
 * Provides methods to manage advertising conversion exports
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for site-specific operations
 */
export interface SiteParams extends RequestParams {
  /** Site ID to get conversion exports for (optional) */
  idSite?: string | number;
}

/**
 * Parameters for export-specific operations
 */
export interface ExportParams extends RequestParams {
  /** Export ID */
  idExport: string | number;
}

/**
 * Parameters for delete conversion export operation
 */
export interface DeleteExportParams extends RequestParams {
  /** Export ID to delete */
  idExport: string | number;
  /** Site ID the export belongs to */
  idSite: string | number;
}

/**
 * Parameters for adding a new conversion export
 */
export interface AddExportParams extends RequestParams {
  /** Site ID to add conversion export to */
  idSite: string | number;
  /** Name of the conversion export */
  name: string;
  /** Type of the conversion export */
  type: string;
  /** Configuration parameters for the export */
  parameters: Record<string, any> | string;
  /** Optional description of the export */
  description?: string;
}

/**
 * Parameters for updating a conversion export
 */
export interface UpdateExportParams extends RequestParams {
  /** Export ID to update */
  idExport: string | number;
  /** Site ID the export belongs to */
  idSite: string | number;
  /** New name for the conversion export */
  name: string;
  /** New type for the conversion export */
  type: string;
  /** New configuration parameters */
  parameters: Record<string, any> | string;
  /** New description */
  description?: string;
}

/**
 * Parameters for getting advertising conversion export data
 */
export interface GetParams extends RequestParams {
  /** Site ID to get advertising conversion export data for */
  idSite: string | number;
  /** Export ID to get advertising conversion export data for */
  idExport: string | number;
}

export class AdvertisingConversionExportModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get a list of all conversion exports for a site
   *
   * @param params Optional parameters with site ID
   * @returns List of conversion exports
   */
  async getConversionExports(params: SiteParams = {}): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "AdvertisingConversionExport.getConversionExports",
        params
      );
    }
    return this.client.request(
      "AdvertisingConversionExport.getConversionExports",
      params
    );
  }

  /**
   * Get details for a specific conversion export
   *
   * @param params Parameters containing the export ID
   * @returns Conversion export details
   */
  async getConversionExport(params: ExportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "AdvertisingConversionExport.getConversionExport",
        params
      );
    }
    return this.client.request(
      "AdvertisingConversionExport.getConversionExport",
      params
    );
  }

  /**
   * Delete a conversion export
   *
   * @param params Parameters for deleting a conversion export
   * @returns Success status of the operation
   */
  async deleteConversionExport(params: DeleteExportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "AdvertisingConversionExport.deleteConversionExport",
        params
      );
    }
    return this.client.request(
      "AdvertisingConversionExport.deleteConversionExport",
      params
    );
  }

  /**
   * Add a new conversion export
   *
   * @param params Parameters for adding a new conversion export
   * @returns Created conversion export details
   */
  async addConversionExport(params: AddExportParams): Promise<any> {
    const requestParams = { description: "", ...params };

    if (typeof params.parameters === "object") {
      requestParams.parameters = JSON.stringify(params.parameters);
    }

    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "AdvertisingConversionExport.addConversionExport",
        requestParams
      );
    }
    return this.client.request(
      "AdvertisingConversionExport.addConversionExport",
      requestParams
    );
  }

  /**
   * Regenerate access token for a conversion export
   *
   * @param params Parameters containing the export ID
   * @returns New access token
   */
  async regenerateAccessToken(params: ExportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "AdvertisingConversionExport.regenerateAccessToken",
        params
      );
    }
    return this.client.request(
      "AdvertisingConversionExport.regenerateAccessToken",
      params
    );
  }

  /**
   * Update an existing conversion export
   *
   * @param params Parameters for updating a conversion export
   * @returns Updated conversion export details
   */
  async updateConversionExport(params: UpdateExportParams): Promise<any> {
    const requestParams = { description: "", ...params };

    if (typeof params.parameters === "object") {
      requestParams.parameters = JSON.stringify(params.parameters);
    }

    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "AdvertisingConversionExport.updateConversionExport",
        requestParams
      );
    }
    return this.client.request(
      "AdvertisingConversionExport.updateConversionExport",
      requestParams
    );
  }

  /**
   * Get advertising conversion export data
   *
   * @param params Parameters for getting advertising conversion export data
   */
  async get(params: GetParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("AdvertisingConversionExport.get", params);
    }
    return this.client.request("AdvertisingConversionExport.get", params);
  }
}
