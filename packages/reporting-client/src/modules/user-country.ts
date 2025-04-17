/**
 * Matomo UserCountry Module
 * The UserCountry API lets you access reports about your visitors' Countries and Continents.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class UserCountryModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get country-specific visit information
   * 
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getCountry(
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

    return this.client.request('UserCountry.getCountry', params);
  }

  /**
   * Get continent-specific visit information
   * 
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getContinent(
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

    return this.client.request('UserCountry.getContinent', params);
  }

  /**
   * Get region-specific visit information
   * 
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getRegion(
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

    return this.client.request('UserCountry.getRegion', params);
  }

  /**
   * Get city-specific visit information
   * 
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getCity(
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

    return this.client.request('UserCountry.getCity', params);
  }

  /**
   * Get the mapping between country codes and country names
   */
  async getCountryCodeMapping(): Promise<any> {
    return this.client.request('UserCountry.getCountryCodeMapping', {});
  }

  /**
   * Get the location information for a specific IP address
   * 
   * @param ip IP address to look up
   * @param provider Location provider to use
   */
  async getLocationFromIP(
    ip: string = '',
    provider: string = ''
  ): Promise<any> {
    const params: RequestParams = {};

    if (ip) params.ip = ip;
    if (provider) params.provider = provider;

    return this.client.request('UserCountry.getLocationFromIP', params);
  }

  /**
   * Set the location provider to use
   * 
   * @param providerId The ID of the provider to use
   */
  async setLocationProvider(providerId: string): Promise<any> {
    const params: RequestParams = {
      providerId,
    };

    return this.client.request('UserCountry.setLocationProvider', params);
  }

  /**
   * Get the number of distinct countries
   * 
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   */
  async getNumberOfDistinctCountries(
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

    return this.client.request('UserCountry.getNumberOfDistinctCountries', params);
  }
}