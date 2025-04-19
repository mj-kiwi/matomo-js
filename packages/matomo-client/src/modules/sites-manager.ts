/**
 * Matomo SitesManager Module
 * Provides access to site management functionality
 */

import { CoreReportingClient, RequestParams } from "./core.js";

/**
 * Common parameters for site-specific operations
 */
export interface SiteIdParams extends RequestParams {
  /** Site ID */
  idSite: number;
}

/**
 * Parameters for getting JavaScript tracking code
 */
export interface JavascriptTagParams extends SiteIdParams {
  /** Optional Matomo URL (uses client URL if not provided) */
  piwikUrl?: string;
  /** Set to true to track visitors across all subdomains */
  mergeSubdomains?: boolean;
  /** Set to true to group page titles by domain */
  groupPageTitlesByDomain?: boolean;
  /** Set to true to track visitors across all alias URLs */
  mergeAliasUrls?: boolean;
  /** Custom variables for the visitor */
  visitorCustomVariables?: Record<string, any>;
  /** Custom variables for the page */
  pageCustomVariables?: Record<string, any>;
  /** Custom campaign name parameter */
  customCampaignNameQueryParam?: string;
  /** Custom campaign keyword parameter */
  customCampaignKeywordParam?: string;
  /** Honor DoNotTrack setting in the browser */
  doNotTrack?: boolean;
  /** Set to true to disable all tracking cookies */
  disableCookies?: boolean;
  /** Set to true to include a <noscript> tag */
  trackNoScript?: boolean;
  /** Set to true to enable cross-domain linking */
  crossDomain?: boolean;
  /** Set to true to use matomo.php instead of piwik.php */
  forceMatomoEndpoint?: boolean;
  /** Query parameters to exclude from page URLs */
  excludedQueryParams?: string;
  /** Referrers to exclude */
  excludedReferrers?: string;
  /** Set to true to disable campaign parameters */
  disableCampaignParameters?: boolean;
}

/**
 * Parameters for getting image tracking code
 */
export interface ImageTrackingCodeParams extends SiteIdParams {
  /** Optional Matomo URL (uses client URL if not provided) */
  piwikUrl?: string;
  /** Action name for the request */
  actionName?: string;
  /** Goal ID to trigger */
  idGoal?: string | number;
  /** Revenue for the conversion */
  revenue?: string | number;
  /** Set to true to use matomo.php instead of piwik.php */
  forceMatomoEndpoint?: boolean;
}

/**
 * Parameters for group operations
 */
export interface GroupParams extends RequestParams {
  /** Group to search for sites */
  group?: string;
}

/**
 * Parameters for renaming groups
 */
export interface RenameGroupParams extends RequestParams {
  /** Original group name */
  oldGroupName: string;
  /** New group name */
  newGroupName: string;
}

/**
 * Parameters for admin access operations
 */
export interface AdminAccessParams extends RequestParams {
  /** Whether to include alias URLs */
  fetchAliasUrls?: boolean | string;
  /** Filter sites by pattern */
  pattern?: string;
  /** Maximum number of sites to return */
  limit?: number | string;
  /** Array of site IDs to exclude */
  sitesToExclude?: number[];
}

/**
 * Parameters for limit operations
 */
export interface LimitParams extends RequestParams {
  /** Maximum number of sites to return */
  limit?: number | string;
}

/**
 * Parameters for URL operations
 */
export interface UrlParams extends RequestParams {
  /** URL to search for */
  url: string;
}

/**
 * Parameters for adding a site
 */
export interface AddSiteParams extends RequestParams {
  /** Name of the site */
  siteName: string;
  /** URLs of the site */
  urls?: string | string[];
  /** Is an ecommerce site */
  ecommerce?: boolean | string;
  /** Should site search be tracked */
  siteSearch?: boolean | string;
  /** Parameters used for search keywords */
  searchKeywordParameters?: string;
  /** Parameters used for search categories */
  searchCategoryParameters?: string;
  /** IPs to exclude from tracking */
  excludedIps?: string;
  /** Query parameters to exclude from page URLs */
  excludedQueryParameters?: string;
  /** Site timezone */
  timezone?: string;
  /** Site currency */
  currency?: string;
  /** Site group */
  group?: string;
  /** When to start tracking data */
  startDate?: string;
  /** User agents to exclude from tracking */
  excludedUserAgents?: string;
  /** Whether to keep URL fragments (anchors) */
  keepURLFragments?: boolean | string;
  /** Site type */
  type?: string;
  /** Additional setting values */
  settingValues?: Record<string, any>;
  /** Whether to exclude unknown URLs */
  excludeUnknownUrls?: boolean | string;
  /** Referrers to exclude */
  excludedReferrers?: string;
}

/**
 * Parameters for updating a site
 */
export interface UpdateSiteParams extends SiteIdParams {
  /** Name of the site */
  siteName?: string;
  /** URLs of the site */
  urls?: string | string[];
  /** Is an ecommerce site */
  ecommerce?: boolean | string;
  /** Should site search be tracked */
  siteSearch?: boolean | string;
  /** Parameters used for search keywords */
  searchKeywordParameters?: string;
  /** Parameters used for search categories */
  searchCategoryParameters?: string;
  /** IPs to exclude from tracking */
  excludedIps?: string;
  /** Query parameters to exclude from page URLs */
  excludedQueryParameters?: string;
  /** Site timezone */
  timezone?: string;
  /** Site currency */
  currency?: string;
  /** Site group */
  group?: string;
  /** When to start tracking data */
  startDate?: string;
  /** User agents to exclude from tracking */
  excludedUserAgents?: string;
  /** Whether to keep URL fragments (anchors) */
  keepURLFragments?: boolean | string;
  /** Site type */
  type?: string;
  /** Additional setting values */
  settingValues?: Record<string, any>;
  /** Whether to exclude unknown URLs */
  excludeUnknownUrls?: boolean | string;
  /** Referrers to exclude */
  excludedReferrers?: string;
}

/**
 * Parameters for deleting a site
 */
export interface DeleteSiteParams extends SiteIdParams {
  /** Password confirmation for security */
  passwordConfirmation?: string;
}

/**
 * Parameters for site alias URLs
 */
export interface SiteAliasParams extends SiteIdParams {
  /** URLs to add or set as aliases */
  urls: string | string[];
}

/**
 * Parameters for IP range operations
 */
export interface IpRangeParams extends RequestParams {
  /** IP range expression */
  ipRange: string;
}

/**
 * Parameters for excluded IPs
 */
export interface ExcludedIpsParams extends RequestParams {
  /** Comma-separated list of IPs or IP ranges to exclude */
  excludedIps: string;
}

/**
 * Parameters for search parameters
 */
export interface SearchParamsParams extends RequestParams {
  /** Comma-separated list of search keyword parameters */
  searchKeywordParameters: string;
  /** Comma-separated list of search category parameters */
  searchCategoryParameters: string;
}

/**
 * Parameters for excluded user agents
 */
export interface ExcludedUserAgentsParams extends RequestParams {
  /** Comma-separated list of user agents to exclude */
  excludedUserAgents: string;
}

/**
 * Parameters for excluded referrers
 */
export interface ExcludedReferrersParams extends RequestParams {
  /** Comma-separated list of referrers to exclude */
  excludedReferrers: string;
}

/**
 * Parameters for URL fragments
 */
export interface UrlFragmentsParams extends RequestParams {
  /** Whether to keep URL fragments globally */
  enabled: boolean;
}

/**
 * Parameters for default currency
 */
export interface DefaultCurrencyParams extends RequestParams {
  /** Currency code (e.g., USD, EUR) */
  defaultCurrency: string;
}

/**
 * Parameters for default timezone
 */
export interface DefaultTimezoneParams extends RequestParams {
  /** Timezone identifier (e.g., UTC, Europe/Paris) */
  defaultTimezone: string;
}

/**
 * Parameters for global query parameter exclusion
 */
export interface QueryParamExclusionParams extends RequestParams {
  /** Exclusion type */
  exclusionType: string;
  /** Query parameters to exclude */
  queryParamsToExclude?: string;
}

/**
 * Parameters for timezone name
 */
export interface TimezoneNameParams extends RequestParams {
  /** Timezone ID */
  timezone: string;
  /** Country code */
  countryCode?: string;
  /** Whether multiple timezones exist in country */
  multipleTimezonesInCountry?: boolean;
}

/**
 * Parameters for pattern matching
 */
export interface PatternMatchParams extends RequestParams {
  /** Pattern to match */
  pattern: string;
  /** Maximum number of sites to return */
  limit?: number | string;
  /** Array of site IDs to exclude */
  sitesToExclude?: number[];
}

export class SitesManagerModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get JavaScript tracking code for a site
   *
   * @param params Parameters for getting JavaScript tracking code
   */
  async getJavascriptTag(params: JavascriptTagParams): Promise<any> {
    return this.client.request("SitesManager.getJavascriptTag", params);
  }

  /**
   * Get image tracking code for a site
   *
   * @param params Parameters for getting image tracking code
   */
  async getImageTrackingCode(params: ImageTrackingCodeParams): Promise<any> {
    return this.client.request("SitesManager.getImageTrackingCode", params);
  }

  /**
   * Get all sites that belong to the specified group
   *
   * @param params Parameters for getting sites from a group
   */
  async getSitesFromGroup(params: GroupParams = {}): Promise<any> {
    return this.client.request("SitesManager.getSitesFromGroup", params);
  }

  /**
   * Get all site groups available
   */
  async getSitesGroups(): Promise<any> {
    return this.client.request("SitesManager.getSitesGroups", {});
  }

  /**
   * Get detailed information about a single site
   *
   * @param params Parameters containing the site ID
   */
  async getSiteFromId(params: SiteIdParams): Promise<any> {
    return this.client.request("SitesManager.getSiteFromId", params);
  }

  /**
   * Get all URLs registered for a site
   *
   * @param params Parameters containing the site ID
   */
  async getSiteUrlsFromId(params: SiteIdParams): Promise<any> {
    return this.client.request("SitesManager.getSiteUrlsFromId", params);
  }

  /**
   * Get all sites
   */
  async getAllSites(): Promise<any> {
    return this.client.request("SitesManager.getAllSites", {});
  }

  /**
   * Get IDs of all available sites
   */
  async getAllSitesId(): Promise<any> {
    return this.client.request("SitesManager.getAllSitesId", {});
  }

  /**
   * Get sites where the current user has admin access
   *
   * @param params Parameters for getting sites with admin access
   */
  async getSitesWithAdminAccess(params: AdminAccessParams = {}): Promise<any> {
    return this.client.request("SitesManager.getSitesWithAdminAccess", params);
  }

  /**
   * Get sites where the current user has view access
   */
  async getSitesWithViewAccess(): Promise<any> {
    return this.client.request("SitesManager.getSitesWithViewAccess", {});
  }

  /**
   * Get sites where the current user has at least view access
   *
   * @param params Parameters specifying the limit
   */
  async getSitesWithAtLeastViewAccess(params: LimitParams = {}): Promise<any> {
    return this.client.request(
      "SitesManager.getSitesWithAtLeastViewAccess",
      params
    );
  }

  /**
   * Get IDs of sites where the current user has admin access
   */
  async getSitesIdWithAdminAccess(): Promise<any> {
    return this.client.request("SitesManager.getSitesIdWithAdminAccess", {});
  }

  /**
   * Get IDs of sites where the current user has view access
   */
  async getSitesIdWithViewAccess(): Promise<any> {
    return this.client.request("SitesManager.getSitesIdWithViewAccess", {});
  }

  /**
   * Get IDs of sites where the current user has write access
   */
  async getSitesIdWithWriteAccess(): Promise<any> {
    return this.client.request("SitesManager.getSitesIdWithWriteAccess", {});
  }

  /**
   * Get IDs of sites where the current user has at least view access
   */
  async getSitesIdWithAtLeastViewAccess(): Promise<any> {
    return this.client.request(
      "SitesManager.getSitesIdWithAtLeastViewAccess",
      {}
    );
  }

  /**
   * Get site IDs that match a given URL
   *
   * @param params Parameters containing the URL to search for
   */
  async getSitesIdFromSiteUrl(params: UrlParams): Promise<any> {
    return this.client.request("SitesManager.getSitesIdFromSiteUrl", params);
  }

  /**
   * Add a new site
   *
   * @param params Parameters for adding a new site
   */
  async addSite(params: AddSiteParams): Promise<any> {
    return this.client.request("SitesManager.addSite", params);
  }

  /**
   * Get all settings for a site
   *
   * @param params Parameters containing the site ID
   */
  async getSiteSettings(params: SiteIdParams): Promise<any> {
    return this.client.request("SitesManager.getSiteSettings", params);
  }

  /**
   * Delete a site
   *
   * @param params Parameters for deleting a site
   */
  async deleteSite(params: DeleteSiteParams): Promise<any> {
    return this.client.request("SitesManager.deleteSite", params);
  }

  /**
   * Add alias URLs to a site
   *
   * @param params Parameters for adding site alias URLs
   */
  async addSiteAliasUrls(params: SiteAliasParams): Promise<any> {
    return this.client.request("SitesManager.addSiteAliasUrls", params);
  }

  /**
   * Set alias URLs for a site (replaces existing ones)
   *
   * @param params Parameters for setting site alias URLs
   */
  async setSiteAliasUrls(params: SiteAliasParams): Promise<any> {
    return this.client.request("SitesManager.setSiteAliasUrls", params);
  }

  /**
   * Get IPs for a range expression
   *
   * @param params Parameters containing the IP range
   */
  async getIpsForRange(params: IpRangeParams): Promise<any> {
    return this.client.request("SitesManager.getIpsForRange", params);
  }

  /**
   * Set globally excluded IPs
   *
   * @param params Parameters containing the IPs to exclude
   */
  async setGlobalExcludedIps(params: ExcludedIpsParams): Promise<any> {
    return this.client.request("SitesManager.setGlobalExcludedIps", params);
  }

  /**
   * Set global search parameters
   *
   * @param params Parameters containing the search parameters
   */
  async setGlobalSearchParameters(params: SearchParamsParams): Promise<any> {
    return this.client.request(
      "SitesManager.setGlobalSearchParameters",
      params
    );
  }

  /**
   * Get global search keyword parameters
   */
  async getSearchKeywordParametersGlobal(): Promise<any> {
    return this.client.request(
      "SitesManager.getSearchKeywordParametersGlobal",
      {}
    );
  }

  /**
   * Get global search category parameters
   */
  async getSearchCategoryParametersGlobal(): Promise<any> {
    return this.client.request(
      "SitesManager.getSearchCategoryParametersGlobal",
      {}
    );
  }

  /**
   * Get excluded query parameters for a site
   *
   * @param params Parameters containing the site ID
   */
  async getExcludedQueryParameters(params: SiteIdParams): Promise<any> {
    return this.client.request(
      "SitesManager.getExcludedQueryParameters",
      params
    );
  }

  /**
   * Get global excluded query parameters
   */
  async getExcludedQueryParametersGlobal(): Promise<any> {
    return this.client.request(
      "SitesManager.getExcludedQueryParametersGlobal",
      {}
    );
  }

  /**
   * Get global excluded user agents
   */
  async getExcludedUserAgentsGlobal(): Promise<any> {
    return this.client.request("SitesManager.getExcludedUserAgentsGlobal", {});
  }

  /**
   * Set global excluded user agents
   *
   * @param params Parameters containing the user agents to exclude
   */
  async setGlobalExcludedUserAgents(
    params: ExcludedUserAgentsParams
  ): Promise<any> {
    return this.client.request(
      "SitesManager.setGlobalExcludedUserAgents",
      params
    );
  }

  /**
   * Get excluded referrers for a site
   *
   * @param params Parameters containing the site ID
   */
  async getExcludedReferrers(params: SiteIdParams): Promise<any> {
    return this.client.request("SitesManager.getExcludedReferrers", params);
  }

  /**
   * Get globally excluded referrers
   */
  async getExcludedReferrersGlobal(): Promise<any> {
    return this.client.request("SitesManager.getExcludedReferrersGlobal", {});
  }

  /**
   * Set globally excluded referrers
   *
   * @param params Parameters containing the referrers to exclude
   */
  async setGlobalExcludedReferrers(
    params: ExcludedReferrersParams
  ): Promise<any> {
    return this.client.request(
      "SitesManager.setGlobalExcludedReferrers",
      params
    );
  }

  /**
   * Get global setting for keeping URL fragments
   */
  async getKeepURLFragmentsGlobal(): Promise<any> {
    return this.client.request("SitesManager.getKeepURLFragmentsGlobal", {});
  }

  /**
   * Set global setting for keeping URL fragments
   *
   * @param params Parameters for setting URL fragments
   */
  async setKeepURLFragmentsGlobal(params: UrlFragmentsParams): Promise<any> {
    return this.client.request(
      "SitesManager.setKeepURLFragmentsGlobal",
      params
    );
  }

  /**
   * Get globally excluded IPs
   */
  async getExcludedIpsGlobal(): Promise<any> {
    return this.client.request("SitesManager.getExcludedIpsGlobal", {});
  }

  /**
   * Get default currency
   */
  async getDefaultCurrency(): Promise<any> {
    return this.client.request("SitesManager.getDefaultCurrency", {});
  }

  /**
   * Set default currency
   *
   * @param params Parameters containing the default currency
   */
  async setDefaultCurrency(params: DefaultCurrencyParams): Promise<any> {
    return this.client.request("SitesManager.setDefaultCurrency", params);
  }

  /**
   * Get default timezone
   */
  async getDefaultTimezone(): Promise<any> {
    return this.client.request("SitesManager.getDefaultTimezone", {});
  }

  /**
   * Set default timezone
   *
   * @param params Parameters containing the default timezone
   */
  async setDefaultTimezone(params: DefaultTimezoneParams): Promise<any> {
    return this.client.request("SitesManager.setDefaultTimezone", params);
  }

  /**
   * Set global query parameter exclusion
   *
   * @param params Parameters for global query parameter exclusion
   */
  async setGlobalQueryParamExclusion(
    params: QueryParamExclusionParams
  ): Promise<any> {
    return this.client.request(
      "SitesManager.setGlobalQueryParamExclusion",
      params
    );
  }

  /**
   * Get exclusion type for query parameters
   */
  async getExclusionTypeForQueryParams(): Promise<any> {
    return this.client.request(
      "SitesManager.getExclusionTypeForQueryParams",
      {}
    );
  }

  /**
   * Update a site
   *
   * @param params Parameters for updating a site
   */
  async updateSite(params: UpdateSiteParams): Promise<any> {
    return this.client.request("SitesManager.updateSite", params);
  }

  /**
   * Get list of available currencies
   */
  async getCurrencyList(): Promise<any> {
    return this.client.request("SitesManager.getCurrencyList", {});
  }

  /**
   * Get currency symbols
   */
  async getCurrencySymbols(): Promise<any> {
    return this.client.request("SitesManager.getCurrencySymbols", {});
  }

  /**
   * Check if timezone support is enabled
   */
  async isTimezoneSupportEnabled(): Promise<any> {
    return this.client.request("SitesManager.isTimezoneSupportEnabled", {});
  }

  /**
   * Get list of available timezones
   */
  async getTimezonesList(): Promise<any> {
    return this.client.request("SitesManager.getTimezonesList", {});
  }

  /**
   * Get timezone name from timezone ID
   *
   * @param params Parameters for getting timezone name
   */
  async getTimezoneName(params: TimezoneNameParams): Promise<any> {
    return this.client.request("SitesManager.getTimezoneName", params);
  }

  /**
   * Get unique site timezones
   */
  async getUniqueSiteTimezones(): Promise<any> {
    return this.client.request("SitesManager.getUniqueSiteTimezones", {});
  }

  /**
   * Rename a site group
   *
   * @param params Parameters for renaming a group
   */
  async renameGroup(params: RenameGroupParams): Promise<any> {
    return this.client.request("SitesManager.renameGroup", params);
  }

  /**
   * Get sites matching a pattern
   *
   * @param params Parameters for pattern matching
   */
  async getPatternMatchSites(params: PatternMatchParams): Promise<any> {
    return this.client.request("SitesManager.getPatternMatchSites", params);
  }

  /**
   * Get number of websites to display per page
   */
  async getNumWebsitesToDisplayPerPage(): Promise<any> {
    return this.client.request(
      "SitesManager.getNumWebsitesToDisplayPerPage",
      {}
    );
  }
}
