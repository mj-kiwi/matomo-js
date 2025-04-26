/**
 * Matomo DevicesDetection Module
 * This API lets you access reports on your visitors devices, brands, models, Operating system, Browsers.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for DevicesDetection API methods
 */
export interface DevicesDetectionParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
}

export class DevicesDetectionModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get device types
   *
   * @param params Parameters for getting device types
   * @returns Promise with the API response containing device type data
   */
  async getType(params: DevicesDetectionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("DevicesDetection.getType", params);
    }
    return await this.client.request("DevicesDetection.getType", params);
  }

  /**
   * Get device brands
   *
   * @param params Parameters for getting device brands
   * @returns Promise with the API response containing device brand data
   */
  async getBrand(params: DevicesDetectionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("DevicesDetection.getBrand", params);
    }
    return await this.client.request("DevicesDetection.getBrand", params);
  }

  /**
   * Get device models
   *
   * @param params Parameters for getting device models
   * @returns Promise with the API response containing device model data
   */
  async getModel(params: DevicesDetectionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("DevicesDetection.getModel", params);
    }
    return await this.client.request("DevicesDetection.getModel", params);
  }

  /**
   * Get OS families
   *
   * @param params Parameters for getting OS families
   * @returns Promise with the API response containing OS family data
   */
  async getOsFamilies(params: DevicesDetectionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("DevicesDetection.getOsFamilies", params);
    }
    return await this.client.request("DevicesDetection.getOsFamilies", params);
  }

  /**
   * Get OS versions
   *
   * @param params Parameters for getting OS versions
   * @returns Promise with the API response containing OS version data
   */
  async getOsVersions(params: DevicesDetectionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("DevicesDetection.getOsVersions", params);
    }
    return await this.client.request("DevicesDetection.getOsVersions", params);
  }

  /**
   * Get browsers
   *
   * @param params Parameters for getting browsers
   * @returns Promise with the API response containing browser data
   */
  async getBrowsers(params: DevicesDetectionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("DevicesDetection.getBrowsers", params);
    }
    return await this.client.request("DevicesDetection.getBrowsers", params);
  }

  /**
   * Get browser versions
   *
   * @param params Parameters for getting browser versions
   * @returns Promise with the API response containing browser version data
   */
  async getBrowserVersions(params: DevicesDetectionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "DevicesDetection.getBrowserVersions",
        params
      );
    }
    return await this.client.request(
      "DevicesDetection.getBrowserVersions",
      params
    );
  }

  /**
   * Get browser engines
   *
   * @param params Parameters for getting browser engines
   * @returns Promise with the API response containing browser engine data
   */
  async getBrowserEngines(params: DevicesDetectionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "DevicesDetection.getBrowserEngines",
        params
      );
    }
    return await this.client.request(
      "DevicesDetection.getBrowserEngines",
      params
    );
  }
}
