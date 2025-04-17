/**
 * Matomo DevicesDetection Module
 * This API lets you access reports on your visitors devices, brands, models, Operating system, Browsers.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class DevicesDetectionModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get device types
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing device type data
   */
  async getType(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('DevicesDetection.getType', params);
  }

  /**
   * Get device brands
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing device brand data
   */
  async getBrand(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('DevicesDetection.getBrand', params);
  }

  /**
   * Get device models
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing device model data
   */
  async getModel(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('DevicesDetection.getModel', params);
  }

  /**
   * Get OS families
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing OS family data
   */
  async getOsFamilies(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('DevicesDetection.getOsFamilies', params);
  }

  /**
   * Get OS versions
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing OS version data
   */
  async getOsVersions(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('DevicesDetection.getOsVersions', params);
  }

  /**
   * Get browsers
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing browser data
   */
  async getBrowsers(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('DevicesDetection.getBrowsers', params);
  }

  /**
   * Get browser versions
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing browser version data
   */
  async getBrowserVersions(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('DevicesDetection.getBrowserVersions', params);
  }

  /**
   * Get browser engines
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @returns Promise with the API response containing browser engine data
   */
  async getBrowserEngines(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;

    return this.client.request('DevicesDetection.getBrowserEngines', params);
  }
}
