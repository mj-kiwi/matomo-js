/**
 * Matomo UserCountry Module
 * Provides access to visitor location data
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for UserCountry API methods
 */
export interface UserCountryParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for IP location lookup
 */
export interface LocationFromIPParams extends RequestParams {
  /** IP address to look up */
  ip?: string;
  /** Location provider to use */
  provider?: string;
}

/**
 * Parameters for setting location provider
 */
export interface SetLocationProviderParams extends RequestParams {
  /** The ID of the provider to use */
  providerId: string;
}

/**
 * Parameters for location report methods
 */
export interface LocationReportParams extends UserCountryParams {}

/**
 * Parameters for IP methods
 */
export interface IpParams extends LocationFromIPParams {}

export class UserCountryModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get visitor location data
   *
   * @param params Parameters for getting location data
   */
  async getCountry(params: LocationReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UserCountry.getCountry", params);
    }
    return this.client.request("UserCountry.getCountry", params);
  }

  /**
   * Get visitor continent data
   *
   * @param params Parameters for getting continent data
   */
  async getContinent(params: LocationReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UserCountry.getContinent", params);
    }
    return this.client.request("UserCountry.getContinent", params);
  }

  /**
   * Get visitor region data
   *
   * @param params Parameters for getting region data
   */
  async getRegion(params: LocationReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UserCountry.getRegion", params);
    }
    return this.client.request("UserCountry.getRegion", params);
  }

  /**
   * Get visitor city data
   *
   * @param params Parameters for getting city data
   */
  async getCity(params: LocationReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UserCountry.getCity", params);
    }
    return this.client.request("UserCountry.getCity", params);
  }

  /**
   * Get the mapping between country codes and country names
   */
  async getCountryCodeMapping(): Promise<any> {
    return this.client.request("UserCountry.getCountryCodeMapping", {});
  }

  /**
   * Get location from IP address
   *
   * @param params Parameters with IP address
   */
  async getLocationFromIP(params: IpParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UserCountry.getLocationFromIP", params);
    }
    return this.client.request("UserCountry.getLocationFromIP", params);
  }

  /**
   * Set the location provider to use
   *
   * @param params Parameters for setting location provider
   */
  async setLocationProvider(params: SetLocationProviderParams): Promise<any> {
    return this.client.request("UserCountry.setLocationProvider", params);
  }

  /**
   * Get number of distinct countries
   *
   * @param params Parameters for getting distinct countries
   */
  async getNumberOfDistinctCountries(
    params: LocationReportParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "UserCountry.getNumberOfDistinctCountries",
        params
      );
    }
    return this.client.request(
      "UserCountry.getNumberOfDistinctCountries",
      params
    );
  }
}
