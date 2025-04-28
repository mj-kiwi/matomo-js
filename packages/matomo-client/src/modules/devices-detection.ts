/**
 * Matomo DevicesDetection Module
 *
 * The DevicesDetection API provides detailed information about your visitors' devices and software:
 * - Device types (desktop, mobile, tablet)
 * - Device brands and models
 * - Operating systems and versions
 * - Browsers and versions
 * - Browser engines
 *
 * This module helps you understand your audience's technology stack and optimize
 * your website for the most common devices and browsers used by your visitors.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for DevicesDetection API methods
 * @property {number|string} [idSite] - The integer id of your website, or 'all' for all websites
 * @property {string} period - The period to request data for (day, week, month, year, range)
 * @property {string} date - The date string in YYYY-MM-DD format, or magic keywords (today, yesterday, lastWeek, lastMonth, lastYear)
 * @property {string} [segment] - Optional segment definition to filter the data
 */
export interface DevicesDetectionParams extends RequestParams {
  /** Site ID */
  idSite?: number | string;
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
   * Get visitor distribution by device type
   * Returns a report showing the number of visits from different device types:
   * desktop, mobile, tablet, etc.
   *
   * @param params Parameters for getting device types
   * @returns Promise with the API response containing device type distribution
   */
  async getType(params: DevicesDetectionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("DevicesDetection.getType", params);
    }
    return await this.client.request("DevicesDetection.getType", params);
  }

  /**
   * Get visitor distribution by device brand
   * Returns a report showing the number of visits from different device brands
   * (e.g., Apple, Samsung, Huawei, etc.)
   *
   * @param params Parameters for getting device brands
   * @returns Promise with the API response containing device brand distribution
   */
  async getBrand(params: DevicesDetectionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("DevicesDetection.getBrand", params);
    }
    return await this.client.request("DevicesDetection.getBrand", params);
  }

  /**
   * Get visitor distribution by device model
   * Returns a report showing the number of visits from specific device models
   * (e.g., iPhone 12, Galaxy S21, etc.)
   *
   * @param params Parameters for getting device models
   * @returns Promise with the API response containing device model distribution
   */
  async getModel(params: DevicesDetectionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("DevicesDetection.getModel", params);
    }
    return await this.client.request("DevicesDetection.getModel", params);
  }

  /**
   * Get visitor distribution by operating system family
   * Returns a report showing the number of visits from different OS families
   * (e.g., Windows, macOS, iOS, Android, etc.)
   *
   * @param params Parameters for getting OS families
   * @returns Promise with the API response containing OS family distribution
   */
  async getOsFamilies(params: DevicesDetectionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("DevicesDetection.getOsFamilies", params);
    }
    return await this.client.request("DevicesDetection.getOsFamilies", params);
  }

  /**
   * Get visitor distribution by operating system version
   * Returns a report showing the number of visits from different OS versions
   * (e.g., Windows 10, iOS 15, Android 12, etc.)
   *
   * @param params Parameters for getting OS versions
   * @returns Promise with the API response containing OS version distribution
   */
  async getOsVersions(params: DevicesDetectionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("DevicesDetection.getOsVersions", params);
    }
    return await this.client.request("DevicesDetection.getOsVersions", params);
  }

  /**
   * Get visitor distribution by browser
   * Returns a report showing the number of visits from different browsers
   * (e.g., Chrome, Firefox, Safari, Edge, etc.)
   *
   * @param params Parameters for getting browsers
   * @returns Promise with the API response containing browser distribution
   */
  async getBrowsers(params: DevicesDetectionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("DevicesDetection.getBrowsers", params);
    }
    return await this.client.request("DevicesDetection.getBrowsers", params);
  }

  /**
   * Get visitor distribution by browser version
   * Returns a report showing the number of visits from different browser versions
   * (e.g., Chrome 98, Firefox 97, Safari 15, etc.)
   *
   * @param params Parameters for getting browser versions
   * @returns Promise with the API response containing browser version distribution
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
   * Get visitor distribution by browser engine
   * Returns a report showing the number of visits from different browser engines
   * (e.g., Blink, Gecko, WebKit, etc.)
   *
   * @param params Parameters for getting browser engines
   * @returns Promise with the API response containing browser engine distribution
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
