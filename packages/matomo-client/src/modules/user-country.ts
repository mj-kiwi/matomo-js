/**
 * Matomo UserCountry Module
 *
 * The UserCountry API provides access to detailed visitor location data, including:
 * - Country-level analytics
 * - Continent-level analytics
 * - Region/State-level analytics
 * - City-level analytics
 *
 * This module helps you understand your website's geographic reach and audience distribution.
 * It uses IP geolocation to determine visitor locations and provides various reports
 * to analyze your traffic by geographic location.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Common parameters for UserCountry API methods
 * @property {number|string} [idSite] - The integer id of your website, or 'all' for all websites
 * @property {string} period - The period to request data for (day, week, month, year, range)
 * @property {string} date - The date string in YYYY-MM-DD format, or magic keywords (today, yesterday, lastWeek, lastMonth, lastYear)
 * @property {string} [segment] - Optional segment definition to filter the data
 */
export interface UserCountryParams extends RequestParams {
  /** Site ID */
  idSite?: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** Optional segment definition */
  segment?: string;
}

/**
 * Parameters for IP location lookup
 * @property {string} [ip] - The IP address to look up (defaults to current visitor's IP)
 * @property {string} [provider] - The location provider to use for the lookup
 */
export interface LocationFromIPParams extends RequestParams {
  /** IP address to look up */
  ip?: string;
  /** Location provider to use */
  provider?: string;
}

/**
 * Parameters for setting location provider
 * @property {string} providerId - The ID of the location provider to use
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
   * Get visitor distribution by country
   * Returns a report showing the number of visits from each country,
   * including country codes and names
   *
   * @param params Parameters for getting location data
   * @returns Promise with the API response containing country-level visit distribution
   */
  async getCountry(params: LocationReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UserCountry.getCountry", params);
    }
    return await this.client.request("UserCountry.getCountry", params);
  }

  /**
   * Get visitor distribution by continent
   * Returns a report showing the number of visits from each continent,
   * helping you understand your global reach
   *
   * @param params Parameters for getting continent data
   * @returns Promise with the API response containing continent-level visit distribution
   */
  async getContinent(params: LocationReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UserCountry.getContinent", params);
    }
    return await this.client.request("UserCountry.getContinent", params);
  }

  /**
   * Get visitor distribution by region/state
   * Returns a report showing the number of visits from each region/state,
   * providing more granular location data within countries
   *
   * @param params Parameters for getting region data
   * @returns Promise with the API response containing region-level visit distribution
   */
  async getRegion(params: LocationReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UserCountry.getRegion", params);
    }
    return await this.client.request("UserCountry.getRegion", params);
  }

  /**
   * Get visitor distribution by city
   * Returns a report showing the number of visits from each city,
   * providing the most detailed location data available
   *
   * @param params Parameters for getting city data
   * @returns Promise with the API response containing city-level visit distribution
   */
  async getCity(params: LocationReportParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UserCountry.getCity", params);
    }
    return await this.client.request("UserCountry.getCity", params);
  }

  /**
   * Get the mapping between country codes and country names
   * Returns a list of all supported country codes and their corresponding names
   * Useful for displaying country data in a user-friendly format
   *
   * @returns Promise with the API response containing country code to name mappings
   */
  async getCountryCodeMapping(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UserCountry.getCountryCodeMapping", {});
    }
    return await this.client.request("UserCountry.getCountryCodeMapping", {});
  }

  /**
   * Get location information for a specific IP address
   * Returns detailed location data (country, region, city) for the given IP
   * Useful for testing or manual lookups
   *
   * @param params Parameters with IP address
   * @returns Promise with the API response containing location data for the IP
   */
  async getLocationFromIP(params: IpParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UserCountry.getLocationFromIP", params);
    }
    return await this.client.request("UserCountry.getLocationFromIP", params);
  }

  /**
   * Set the location provider to use for IP geolocation
   * Allows you to switch between different geolocation providers
   * (e.g., GeoIP, MaxMind, etc.)
   *
   * @param params Parameters for setting location provider
   * @returns Promise with the API response indicating success or failure
   */
  async setLocationProvider(params: SetLocationProviderParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("UserCountry.setLocationProvider", params);
    }
    return await this.client.request("UserCountry.setLocationProvider", params);
  }

  /**
   * Get the number of distinct countries that visited your website
   * Returns a count of unique countries that generated visits
   * Useful for understanding your website's global reach
   *
   * @param params Parameters for getting distinct countries
   * @returns Promise with the API response containing the count of distinct countries
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
    return await this.client.request(
      "UserCountry.getNumberOfDistinctCountries",
      params
    );
  }
}
