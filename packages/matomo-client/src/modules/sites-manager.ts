/**
 * Matomo SitesManager Module
 * Provides access to site management functionality
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class SitesManagerModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get site data for given site IDs
   *
   * @param idSites Array of site IDs or comma-separated string
   */
  async getSitesInfo(idSites?: number[] | string): Promise<any> {
    const params: RequestParams = {};

    if (idSites) {
      params.idSite = idSites;
    }

    return this.client.request(
      'SitesManager.getSitesWithAtLeastViewAccess',
      params
    );
  }

  /**
   * Get JavaScript tracking code for a site
   *
   * @param idSite Site ID
   * @param piwikUrl Optional Matomo URL (uses client URL if not provided)
   * @param mergeSubdomains Set to true to track visitors across all subdomains
   * @param groupPageTitlesByDomain Set to true to group page titles by domain
   * @param mergeAliasUrls Set to true to track visitors across all alias URLs
   * @param visitorCustomVariables Custom variables for the visitor
   * @param pageCustomVariables Custom variables for the page
   * @param customCampaignNameQueryParam Custom campaign name parameter
   * @param customCampaignKeywordParam Custom campaign keyword parameter
   * @param doNotTrack Honor DoNotTrack setting in the browser
   * @param disableCookies Set to true to disable all tracking cookies
   * @param trackNoScript Set to true to include a <noscript> tag
   * @param crossDomain Set to true to enable cross-domain linking
   * @param forceMatomoEndpoint Set to true to use matomo.php instead of piwik.php
   * @param excludedQueryParams Query parameters to exclude from page URLs
   * @param excludedReferrers Referrers to exclude
   * @param disableCampaignParameters Set to true to disable campaign parameters
   */
  async getJavascriptTag(
    idSite: number,
    piwikUrl: string = '',
    mergeSubdomains: boolean = false,
    groupPageTitlesByDomain: boolean = false,
    mergeAliasUrls: boolean = false,
    visitorCustomVariables: Record<string, any> = {},
    pageCustomVariables: Record<string, any> = {},
    customCampaignNameQueryParam: string = '',
    customCampaignKeywordParam: string = '',
    doNotTrack: boolean = false,
    disableCookies: boolean = false,
    trackNoScript: boolean = false,
    crossDomain: boolean = false,
    forceMatomoEndpoint: boolean = false,
    excludedQueryParams: string = '',
    excludedReferrers: string = '',
    disableCampaignParameters: boolean = false
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
    };

    if (piwikUrl) params.piwikUrl = piwikUrl;
    if (mergeSubdomains) params.mergeSubdomains = mergeSubdomains;
    if (groupPageTitlesByDomain)
      params.groupPageTitlesByDomain = groupPageTitlesByDomain;
    if (mergeAliasUrls) params.mergeAliasUrls = mergeAliasUrls;
    if (Object.keys(visitorCustomVariables).length > 0)
      params.visitorCustomVariables = visitorCustomVariables;
    if (Object.keys(pageCustomVariables).length > 0)
      params.pageCustomVariables = pageCustomVariables;
    if (customCampaignNameQueryParam)
      params.customCampaignNameQueryParam = customCampaignNameQueryParam;
    if (customCampaignKeywordParam)
      params.customCampaignKeywordParam = customCampaignKeywordParam;
    if (doNotTrack) params.doNotTrack = doNotTrack;
    if (disableCookies) params.disableCookies = disableCookies;
    if (trackNoScript) params.trackNoScript = trackNoScript;
    if (crossDomain) params.crossDomain = crossDomain;
    if (forceMatomoEndpoint) params.forceMatomoEndpoint = forceMatomoEndpoint;
    if (excludedQueryParams) params.excludedQueryParams = excludedQueryParams;
    if (excludedReferrers) params.excludedReferrers = excludedReferrers;
    if (disableCampaignParameters)
      params.disableCampaignParameters = disableCampaignParameters;

    return this.client.request('SitesManager.getJavascriptTag', params);
  }

  /**
   * Get image tracking code for a site
   *
   * @param idSite Site ID
   * @param piwikUrl Optional Matomo URL (uses client URL if not provided)
   * @param actionName Action name for the request
   * @param idGoal Goal ID to trigger
   * @param revenue Revenue for the conversion
   * @param forceMatomoEndpoint Set to true to use matomo.php instead of piwik.php
   */
  async getImageTrackingCode(
    idSite: number,
    piwikUrl: string = '',
    actionName: string = '',
    idGoal: string | number = '',
    revenue: string | number = '',
    forceMatomoEndpoint: boolean = false
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
    };

    if (piwikUrl) params.piwikUrl = piwikUrl;
    if (actionName) params.actionName = actionName;
    if (idGoal) params.idGoal = idGoal;
    if (revenue) params.revenue = revenue;
    if (forceMatomoEndpoint) params.forceMatomoEndpoint = forceMatomoEndpoint;

    return this.client.request('SitesManager.getImageTrackingCode', params);
  }

  /**
   * Get all sites that belong to the specified group
   *
   * @param group Group to search for sites (empty string for all groups)
   */
  async getSitesFromGroup(group: string = ''): Promise<any> {
    const params: RequestParams = {};

    if (group) params.group = group;

    return this.client.request('SitesManager.getSitesFromGroup', params);
  }

  /**
   * Get all site groups available
   */
  async getSitesGroups(): Promise<any> {
    return this.client.request('SitesManager.getSitesGroups', {});
  }

  /**
   * Get detailed information about a single site
   *
   * @param idSite Site ID
   */
  async getSiteFromId(idSite: number): Promise<any> {
    return this.client.request('SitesManager.getSiteFromId', { idSite });
  }

  /**
   * Get all URLs registered for a site
   *
   * @param idSite Site ID
   */
  async getSiteUrlsFromId(idSite: number): Promise<any> {
    return this.client.request('SitesManager.getSiteUrlsFromId', { idSite });
  }

  /**
   * Get all sites
   */
  async getAllSites(): Promise<any> {
    return this.client.request('SitesManager.getAllSites', {});
  }

  /**
   * Get IDs of all available sites
   */
  async getAllSitesId(): Promise<any> {
    return this.client.request('SitesManager.getAllSitesId', {});
  }

  /**
   * Get sites where the current user has admin access
   *
   * @param fetchAliasUrls Whether to include alias URLs
   * @param pattern Filter sites by pattern
   * @param limit Maximum number of sites to return
   * @param sitesToExclude Array of site IDs to exclude
   */
  async getSitesWithAdminAccess(
    fetchAliasUrls: boolean | string = '',
    pattern: string = '',
    limit: number | string = '',
    sitesToExclude: number[] = []
  ): Promise<any> {
    const params: RequestParams = {};

    if (fetchAliasUrls) params.fetchAliasUrls = fetchAliasUrls;
    if (pattern) params.pattern = pattern;
    if (limit) params.limit = limit;
    if (sitesToExclude.length > 0) params.sitesToExclude = sitesToExclude;

    return this.client.request('SitesManager.getSitesWithAdminAccess', params);
  }

  /**
   * Get sites where the current user has view access
   */
  async getSitesWithViewAccess(): Promise<any> {
    return this.client.request('SitesManager.getSitesWithViewAccess', {});
  }

  /**
   * Get sites where the current user has at least view access
   *
   * @param limit Maximum number of sites to return
   */
  async getSitesWithAtLeastViewAccess(
    limit: number | string = ''
  ): Promise<any> {
    const params: RequestParams = {};

    if (limit) params.limit = limit;

    return this.client.request(
      'SitesManager.getSitesWithAtLeastViewAccess',
      params
    );
  }

  /**
   * Get IDs of sites where the current user has admin access
   */
  async getSitesIdWithAdminAccess(): Promise<any> {
    return this.client.request('SitesManager.getSitesIdWithAdminAccess', {});
  }

  /**
   * Get IDs of sites where the current user has view access
   */
  async getSitesIdWithViewAccess(): Promise<any> {
    return this.client.request('SitesManager.getSitesIdWithViewAccess', {});
  }

  /**
   * Get IDs of sites where the current user has write access
   */
  async getSitesIdWithWriteAccess(): Promise<any> {
    return this.client.request('SitesManager.getSitesIdWithWriteAccess', {});
  }

  /**
   * Get IDs of sites where the current user has at least view access
   */
  async getSitesIdWithAtLeastViewAccess(): Promise<any> {
    return this.client.request(
      'SitesManager.getSitesIdWithAtLeastViewAccess',
      {}
    );
  }

  /**
   * Get site IDs that match a given URL
   *
   * @param url URL to search for
   */
  async getSitesIdFromSiteUrl(url: string): Promise<any> {
    return this.client.request('SitesManager.getSitesIdFromSiteUrl', { url });
  }

  /**
   * Add a new site
   *
   * @param siteName Name of the site
   * @param urls URLs of the site
   * @param ecommerce Is an ecommerce site
   * @param siteSearch Should site search be tracked
   * @param searchKeywordParameters Parameters used for search keywords
   * @param searchCategoryParameters Parameters used for search categories
   * @param excludedIps IPs to exclude from tracking
   * @param excludedQueryParameters Query parameters to exclude from page URLs
   * @param timezone Site timezone
   * @param currency Site currency
   * @param group Site group
   * @param startDate When to start tracking data
   * @param excludedUserAgents User agents to exclude from tracking
   * @param keepURLFragments Whether to keep URL fragments (anchors)
   * @param type Site type
   * @param settingValues Additional setting values
   * @param excludeUnknownUrls Whether to exclude unknown URLs
   * @param excludedReferrers Referrers to exclude
   */
  async addSite(
    siteName: string,
    urls: string | string[] = '',
    ecommerce: boolean | string = '',
    siteSearch: boolean | string = '',
    searchKeywordParameters: string = '',
    searchCategoryParameters: string = '',
    excludedIps: string = '',
    excludedQueryParameters: string = '',
    timezone: string = '',
    currency: string = '',
    group: string = '',
    startDate: string = '',
    excludedUserAgents: string = '',
    keepURLFragments: boolean | string = '',
    type: string = '',
    settingValues: Record<string, any> = {},
    excludeUnknownUrls: boolean | string = '',
    excludedReferrers: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      siteName,
    };

    if (urls) params.urls = urls;
    if (ecommerce) params.ecommerce = ecommerce;
    if (siteSearch) params.siteSearch = siteSearch;
    if (searchKeywordParameters)
      params.searchKeywordParameters = searchKeywordParameters;
    if (searchCategoryParameters)
      params.searchCategoryParameters = searchCategoryParameters;
    if (excludedIps) params.excludedIps = excludedIps;
    if (excludedQueryParameters)
      params.excludedQueryParameters = excludedQueryParameters;
    if (timezone) params.timezone = timezone;
    if (currency) params.currency = currency;
    if (group) params.group = group;
    if (startDate) params.startDate = startDate;
    if (excludedUserAgents) params.excludedUserAgents = excludedUserAgents;
    if (keepURLFragments) params.keepURLFragments = keepURLFragments;
    if (type) params.type = type;
    if (Object.keys(settingValues).length > 0)
      params.settingValues = settingValues;
    if (excludeUnknownUrls) params.excludeUnknownUrls = excludeUnknownUrls;
    if (excludedReferrers) params.excludedReferrers = excludedReferrers;

    return this.client.request('SitesManager.addSite', params);
  }

  /**
   * Get all settings for a site
   *
   * @param idSite Site ID
   */
  async getSiteSettings(idSite: number): Promise<any> {
    return this.client.request('SitesManager.getSiteSettings', { idSite });
  }

  /**
   * Delete a site
   *
   * @param idSite Site ID
   * @param passwordConfirmation Password confirmation for security
   */
  async deleteSite(
    idSite: number,
    passwordConfirmation: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
    };

    if (passwordConfirmation)
      params.passwordConfirmation = passwordConfirmation;

    return this.client.request('SitesManager.deleteSite', params);
  }

  /**
   * Add alias URLs to a site
   *
   * @param idSite Site ID
   * @param urls URLs to add as aliases
   */
  async addSiteAliasUrls(
    idSite: number,
    urls: string | string[]
  ): Promise<any> {
    return this.client.request('SitesManager.addSiteAliasUrls', {
      idSite,
      urls,
    });
  }

  /**
   * Set alias URLs for a site (replaces existing ones)
   *
   * @param idSite Site ID
   * @param urls URLs to set as aliases
   */
  async setSiteAliasUrls(idSite: number, urls: string[] = []): Promise<any> {
    return this.client.request('SitesManager.setSiteAliasUrls', {
      idSite,
      urls,
    });
  }

  /**
   * Get IPs for a range expression
   *
   * @param ipRange IP range expression
   */
  async getIpsForRange(ipRange: string): Promise<any> {
    return this.client.request('SitesManager.getIpsForRange', { ipRange });
  }

  /**
   * Set globally excluded IPs
   *
   * @param excludedIps Comma-separated list of IPs or IP ranges to exclude
   */
  async setGlobalExcludedIps(excludedIps: string): Promise<any> {
    return this.client.request('SitesManager.setGlobalExcludedIps', {
      excludedIps,
    });
  }

  /**
   * Set global search parameters
   *
   * @param searchKeywordParameters Comma-separated list of search keyword parameters
   * @param searchCategoryParameters Comma-separated list of search category parameters
   */
  async setGlobalSearchParameters(
    searchKeywordParameters: string,
    searchCategoryParameters: string
  ): Promise<any> {
    return this.client.request('SitesManager.setGlobalSearchParameters', {
      searchKeywordParameters,
      searchCategoryParameters,
    });
  }

  /**
   * Get global search keyword parameters
   */
  async getSearchKeywordParametersGlobal(): Promise<any> {
    return this.client.request(
      'SitesManager.getSearchKeywordParametersGlobal',
      {}
    );
  }

  /**
   * Get global search category parameters
   */
  async getSearchCategoryParametersGlobal(): Promise<any> {
    return this.client.request(
      'SitesManager.getSearchCategoryParametersGlobal',
      {}
    );
  }

  /**
   * Get excluded query parameters for a site
   *
   * @param idSite Site ID
   */
  async getExcludedQueryParameters(idSite: number): Promise<any> {
    return this.client.request('SitesManager.getExcludedQueryParameters', {
      idSite,
    });
  }

  /**
   * Get global excluded query parameters
   */
  async getExcludedQueryParametersGlobal(): Promise<any> {
    return this.client.request(
      'SitesManager.getExcludedQueryParametersGlobal',
      {}
    );
  }

  /**
   * Get global excluded user agents
   */
  async getExcludedUserAgentsGlobal(): Promise<any> {
    return this.client.request('SitesManager.getExcludedUserAgentsGlobal', {});
  }

  /**
   * Set global excluded user agents
   *
   * @param excludedUserAgents Comma-separated list of user agents to exclude
   */
  async setGlobalExcludedUserAgents(excludedUserAgents: string): Promise<any> {
    return this.client.request('SitesManager.setGlobalExcludedUserAgents', {
      excludedUserAgents,
    });
  }

  /**
   * Get excluded referrers for a site
   *
   * @param idSite Site ID
   */
  async getExcludedReferrers(idSite: number): Promise<any> {
    return this.client.request('SitesManager.getExcludedReferrers', { idSite });
  }

  /**
   * Get globally excluded referrers
   */
  async getExcludedReferrersGlobal(): Promise<any> {
    return this.client.request('SitesManager.getExcludedReferrersGlobal', {});
  }

  /**
   * Set globally excluded referrers
   *
   * @param excludedReferrers Comma-separated list of referrers to exclude
   */
  async setGlobalExcludedReferrers(excludedReferrers: string): Promise<any> {
    return this.client.request('SitesManager.setGlobalExcludedReferrers', {
      excludedReferrers,
    });
  }

  /**
   * Get global setting for keeping URL fragments
   */
  async getKeepURLFragmentsGlobal(): Promise<any> {
    return this.client.request('SitesManager.getKeepURLFragmentsGlobal', {});
  }

  /**
   * Set global setting for keeping URL fragments
   *
   * @param enabled Whether to keep URL fragments globally
   */
  async setKeepURLFragmentsGlobal(enabled: boolean): Promise<any> {
    return this.client.request('SitesManager.setKeepURLFragmentsGlobal', {
      enabled,
    });
  }

  /**
   * Get globally excluded IPs
   */
  async getExcludedIpsGlobal(): Promise<any> {
    return this.client.request('SitesManager.getExcludedIpsGlobal', {});
  }

  /**
   * Get default currency
   */
  async getDefaultCurrency(): Promise<any> {
    return this.client.request('SitesManager.getDefaultCurrency', {});
  }

  /**
   * Set default currency
   *
   * @param defaultCurrency Currency code (e.g., USD, EUR)
   */
  async setDefaultCurrency(defaultCurrency: string): Promise<any> {
    return this.client.request('SitesManager.setDefaultCurrency', {
      defaultCurrency,
    });
  }

  /**
   * Get default timezone
   */
  async getDefaultTimezone(): Promise<any> {
    return this.client.request('SitesManager.getDefaultTimezone', {});
  }

  /**
   * Set default timezone
   *
   * @param defaultTimezone Timezone identifier (e.g., UTC, Europe/Paris)
   */
  async setDefaultTimezone(defaultTimezone: string): Promise<any> {
    return this.client.request('SitesManager.setDefaultTimezone', {
      defaultTimezone,
    });
  }

  /**
   * Set global query parameter exclusion
   *
   * @param exclusionType Exclusion type
   * @param queryParamsToExclude Query parameters to exclude
   */
  async setGlobalQueryParamExclusion(
    exclusionType: string,
    queryParamsToExclude?: string
  ): Promise<any> {
    const params: RequestParams = {
      exclusionType,
    };

    if (queryParamsToExclude !== undefined) {
      params.queryParamsToExclude = queryParamsToExclude;
    }

    return this.client.request(
      'SitesManager.setGlobalQueryParamExclusion',
      params
    );
  }

  /**
   * Get exclusion type for query parameters
   */
  async getExclusionTypeForQueryParams(): Promise<any> {
    return this.client.request(
      'SitesManager.getExclusionTypeForQueryParams',
      {}
    );
  }

  /**
   * Update a site
   *
   * @param idSite Site ID
   * @param siteName Name of the site
   * @param urls URLs of the site
   * @param ecommerce Is an ecommerce site
   * @param siteSearch Should site search be tracked
   * @param searchKeywordParameters Parameters used for search keywords
   * @param searchCategoryParameters Parameters used for search categories
   * @param excludedIps IPs to exclude from tracking
   * @param excludedQueryParameters Query parameters to exclude from page URLs
   * @param timezone Site timezone
   * @param currency Site currency
   * @param group Site group
   * @param startDate When to start tracking data
   * @param excludedUserAgents User agents to exclude from tracking
   * @param keepURLFragments Whether to keep URL fragments (anchors)
   * @param type Site type
   * @param settingValues Additional setting values
   * @param excludeUnknownUrls Whether to exclude unknown URLs
   * @param excludedReferrers Referrers to exclude
   */
  async updateSite(
    idSite: number,
    siteName: string = '',
    urls: string | string[] = '',
    ecommerce: boolean | string = '',
    siteSearch: boolean | string = '',
    searchKeywordParameters: string = '',
    searchCategoryParameters: string = '',
    excludedIps: string = '',
    excludedQueryParameters: string = '',
    timezone: string = '',
    currency: string = '',
    group: string = '',
    startDate: string = '',
    excludedUserAgents: string = '',
    keepURLFragments: boolean | string = '',
    type: string = '',
    settingValues: Record<string, any> = {},
    excludeUnknownUrls: boolean | string = '',
    excludedReferrers: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
    };

    if (siteName) params.siteName = siteName;
    if (urls) params.urls = urls;
    if (ecommerce) params.ecommerce = ecommerce;
    if (siteSearch) params.siteSearch = siteSearch;
    if (searchKeywordParameters)
      params.searchKeywordParameters = searchKeywordParameters;
    if (searchCategoryParameters)
      params.searchCategoryParameters = searchCategoryParameters;
    if (excludedIps) params.excludedIps = excludedIps;
    if (excludedQueryParameters)
      params.excludedQueryParameters = excludedQueryParameters;
    if (timezone) params.timezone = timezone;
    if (currency) params.currency = currency;
    if (group) params.group = group;
    if (startDate) params.startDate = startDate;
    if (excludedUserAgents) params.excludedUserAgents = excludedUserAgents;
    if (keepURLFragments) params.keepURLFragments = keepURLFragments;
    if (type) params.type = type;
    if (Object.keys(settingValues).length > 0)
      params.settingValues = settingValues;
    if (excludeUnknownUrls) params.excludeUnknownUrls = excludeUnknownUrls;
    if (excludedReferrers) params.excludedReferrers = excludedReferrers;

    return this.client.request('SitesManager.updateSite', params);
  }

  /**
   * Get list of available currencies
   */
  async getCurrencyList(): Promise<any> {
    return this.client.request('SitesManager.getCurrencyList', {});
  }

  /**
   * Get currency symbols
   */
  async getCurrencySymbols(): Promise<any> {
    return this.client.request('SitesManager.getCurrencySymbols', {});
  }

  /**
   * Check if timezone support is enabled
   */
  async isTimezoneSupportEnabled(): Promise<any> {
    return this.client.request('SitesManager.isTimezoneSupportEnabled', {});
  }

  /**
   * Get list of available timezones
   */
  async getTimezonesList(): Promise<any> {
    return this.client.request('SitesManager.getTimezonesList', {});
  }

  /**
   * Get timezone name from timezone ID
   *
   * @param timezone Timezone ID
   * @param countryCode Country code
   * @param multipleTimezonesInCountry Whether multiple timezones exist in country
   */
  async getTimezoneName(
    timezone: string,
    countryCode: string = '',
    multipleTimezonesInCountry: boolean = false
  ): Promise<any> {
    const params: RequestParams = {
      timezone,
    };

    if (countryCode) params.countryCode = countryCode;
    if (multipleTimezonesInCountry)
      params.multipleTimezonesInCountry = multipleTimezonesInCountry;

    return this.client.request('SitesManager.getTimezoneName', params);
  }

  /**
   * Get unique site timezones
   */
  async getUniqueSiteTimezones(): Promise<any> {
    return this.client.request('SitesManager.getUniqueSiteTimezones', {});
  }

  /**
   * Rename a site group
   *
   * @param oldGroupName Original group name
   * @param newGroupName New group name
   */
  async renameGroup(oldGroupName: string, newGroupName: string): Promise<any> {
    return this.client.request('SitesManager.renameGroup', {
      oldGroupName,
      newGroupName,
    });
  }

  /**
   * Get sites matching a pattern
   *
   * @param pattern Pattern to match
   * @param limit Maximum number of sites to return
   * @param sitesToExclude Array of site IDs to exclude
   */
  async getPatternMatchSites(
    pattern: string,
    limit: number | string = '',
    sitesToExclude: number[] = []
  ): Promise<any> {
    const params: RequestParams = {
      pattern,
    };

    if (limit) params.limit = limit;
    if (sitesToExclude.length > 0) params.sitesToExclude = sitesToExclude;

    return this.client.request('SitesManager.getPatternMatchSites', params);
  }

  /**
   * Get number of websites to display per page
   */
  async getNumWebsitesToDisplayPerPage(): Promise<any> {
    return this.client.request(
      'SitesManager.getNumWebsitesToDisplayPerPage',
      {}
    );
  }
}
