/**
 * Matomo AdvertisingConversionExport Module
 * Provides methods to manage advertising conversion exports
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class AdvertisingConversionExportModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get a list of all conversion exports for a site
   *
   * @param idSite Site ID to get conversion exports for (empty for all sites)
   * @returns List of conversion exports
   */
  async getConversionExports(idSite: string | number = ''): Promise<any> {
    const params: RequestParams = {};
    if (idSite !== '') params.idSite = idSite;

    return this.client.request(
      'AdvertisingConversionExport.getConversionExports',
      params
    );
  }

  /**
   * Get details for a specific conversion export
   *
   * @param idExport Export ID to get details for
   * @returns Conversion export details
   */
  async getConversionExport(idExport: string | number): Promise<any> {
    return this.client.request(
      'AdvertisingConversionExport.getConversionExport',
      {
        idExport,
      }
    );
  }

  /**
   * Delete a conversion export
   *
   * @param idExport Export ID to delete
   * @param idSite Site ID the export belongs to
   * @returns Success status of the operation
   */
  async deleteConversionExport(
    idExport: string | number,
    idSite: string | number
  ): Promise<any> {
    return this.client.request(
      'AdvertisingConversionExport.deleteConversionExport',
      {
        idExport,
        idSite,
      }
    );
  }

  /**
   * Add a new conversion export
   *
   * @param idSite Site ID to add conversion export to
   * @param name Name of the conversion export
   * @param type Type of the conversion export
   * @param parameters Configuration parameters for the export
   * @param description Optional description of the export
   * @returns Created conversion export details
   */
  async addConversionExport(
    idSite: string | number,
    name: string,
    type: string,
    parameters: Record<string, any> | string,
    description: string = ''
  ): Promise<any> {
    return this.client.request(
      'AdvertisingConversionExport.addConversionExport',
      {
        idSite,
        name,
        type,
        parameters:
          typeof parameters === 'object'
            ? JSON.stringify(parameters)
            : parameters,
        description,
      }
    );
  }

  /**
   * Regenerate access token for a conversion export
   *
   * @param idExport Export ID to regenerate access token for
   * @returns New access token
   */
  async regenerateAccessToken(idExport: string | number): Promise<any> {
    return this.client.request(
      'AdvertisingConversionExport.regenerateAccessToken',
      {
        idExport,
      }
    );
  }

  /**
   * Update an existing conversion export
   *
   * @param idExport Export ID to update
   * @param idSite Site ID the export belongs to
   * @param name New name for the conversion export
   * @param type New type for the conversion export
   * @param parameters New configuration parameters
   * @param description New description
   * @returns Updated conversion export details
   */
  async updateConversionExport(
    idExport: string | number,
    idSite: string | number,
    name: string,
    type: string,
    parameters: Record<string, any> | string,
    description: string = ''
  ): Promise<any> {
    return this.client.request(
      'AdvertisingConversionExport.updateConversionExport',
      {
        idExport,
        idSite,
        name,
        type,
        parameters:
          typeof parameters === 'object'
            ? JSON.stringify(parameters)
            : parameters,
        description,
      }
    );
  }
}
