/**
 * Matomo UserCountry Module
 * The UserCountry API lets you access reports about your visitors' Countries and Continents.
 */

import { CoreReportingClient, RequestParams } from "./core.js";

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

export class UserCountryModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get country-specific visit information
   *
   * @param params Parameters for getting country data
   */
  async getCountry(params: UserCountryParams): Promise<any> {
    return this.client.request("UserCountry.getCountry", params);
  }

  /**
   * Get continent-specific visit information
   *
   * @param params Parameters for getting continent data
   */
  async getContinent(params: UserCountryParams): Promise<any> {
    return this.client.request("UserCountry.getContinent", params);
  }

  /**
   * Get region-specific visit information
   *
   * @param params Parameters for getting region data
   */
  async getRegion(params: UserCountryParams): Promise<any> {
    return this.client.request("UserCountry.getRegion", params);
  }

  /**
   * Get city-specific visit information
   *
   * @param params Parameters for getting city data
   */
  async getCity(params: UserCountryParams): Promise<any> {
    return this.client.request("UserCountry.getCity", params);
  }

  /**
   * Get the mapping between country codes and country names
   */
  async getCountryCodeMapping(): Promise<any> {
    return this.client.request("UserCountry.getCountryCodeMapping", {});
  }

  /**
   * Get the location information for a specific IP address
   *
   * @param params Parameters for getting location from IP
   */
  async getLocationFromIP(params: LocationFromIPParams = {}): Promise<any> {
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
   * Get the number of distinct countries
   *
   * @param params Parameters for getting number of distinct countries
   */
  async getNumberOfDistinctCountries(params: UserCountryParams): Promise<any> {
    return this.client.request(
      "UserCountry.getNumberOfDistinctCountries",
      params
    );
  }
}
