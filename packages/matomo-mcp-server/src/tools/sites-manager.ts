import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getMatomoClient } from "../client.js";

export const registerSitesManagerTools = (server: McpServer): void => {
  /**
   * Get JavaScript tracking code for a site
   */
  server.tool(
    "matomo_sites_manager_get_javascript_tag",
    "Get JavaScript tracking code for a Matomo site",
    {
      idSite: z.number().describe("Site ID to get tracking code for"),
      piwikUrl: z
        .string()
        .optional()
        .describe("Optional Matomo URL (uses client URL if not provided)"),
      mergeSubdomains: z
        .boolean()
        .optional()
        .describe("Set to true to track visitors across all subdomains"),
      groupPageTitlesByDomain: z
        .boolean()
        .optional()
        .describe("Set to true to group page titles by domain"),
      mergeAliasUrls: z
        .boolean()
        .optional()
        .describe("Set to true to track visitors across all alias URLs"),
      visitorCustomVariables: z
        .record(z.any())
        .optional()
        .describe("Custom variables for the visitor"),
      pageCustomVariables: z
        .record(z.any())
        .optional()
        .describe("Custom variables for the page"),
      customCampaignNameQueryParam: z
        .string()
        .optional()
        .describe("Custom campaign name parameter"),
      customCampaignKeywordParam: z
        .string()
        .optional()
        .describe("Custom campaign keyword parameter"),
      doNotTrack: z
        .boolean()
        .optional()
        .describe("Honor DoNotTrack setting in the browser"),
      disableCookies: z
        .boolean()
        .optional()
        .describe("Set to true to disable all tracking cookies"),
      trackNoScript: z
        .boolean()
        .optional()
        .describe("Set to true to include a <noscript> tag"),
      crossDomain: z
        .boolean()
        .optional()
        .describe("Set to true to enable cross-domain linking"),
      forceMatomoEndpoint: z
        .boolean()
        .optional()
        .describe("Set to true to use matomo.php instead of piwik.php"),
      excludedQueryParams: z
        .string()
        .optional()
        .describe("Query parameters to exclude from page URLs"),
      excludedReferrers: z.string().optional().describe("Referrers to exclude"),
      disableCampaignParameters: z
        .boolean()
        .optional()
        .describe("Set to true to disable campaign parameters"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.sitesManager.getJavascriptTag(params);
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching JavaScript tracking code"
        );
      }
    }
  );

  /**
   * Get image tracking code for a site
   */
  server.tool(
    "matomo_sites_manager_get_image_tracking_code",
    "Get image tracking code for a Matomo site",
    {
      idSite: z.number().describe("Site ID to get tracking code for"),
      piwikUrl: z
        .string()
        .optional()
        .describe("Optional Matomo URL (uses client URL if not provided)"),
      actionName: z.string().optional().describe("Action name for the request"),
      idGoal: z
        .union([z.string(), z.number()])
        .optional()
        .describe("Goal ID to trigger"),
      revenue: z
        .union([z.string(), z.number()])
        .optional()
        .describe("Revenue for the conversion"),
      forceMatomoEndpoint: z
        .boolean()
        .optional()
        .describe("Set to true to use matomo.php instead of piwik.php"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.sitesManager.getImageTrackingCode(params);
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching image tracking code"
        );
      }
    }
  );

  /**
   * Get sites from group
   */
  server.tool(
    "matomo_sites_manager_get_sites_from_group",
    "Get all sites that belong to a specific group",
    {
      group: z.string().optional().describe("Group to search for sites"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.sitesManager.getSitesFromGroup(params);
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching sites from group"
        );
      }
    }
  );

  /**
   * Get all site groups available
   */
  server.tool(
    "matomo_sites_manager_get_sites_groups",
    "Get all site groups available in Matomo",
    {},
    async () => {
      const client = getMatomoClient();
      try {
        const results = await client.sitesManager.getSitesGroups();
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching site groups"
        );
      }
    }
  );

  /**
   * Get site from ID
   */
  server.tool(
    "matomo_sites_manager_get_site_from_id",
    "Get detailed information about a single site",
    {
      idSite: z.number().describe("Site ID to fetch details for"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.sitesManager.getSiteFromId(params);
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching site details"
        );
      }
    }
  );

  /**
   * Get site URLs from ID
   */
  server.tool(
    "matomo_sites_manager_get_site_urls_from_id",
    "Get all URLs registered for a site",
    {
      idSite: z.number().describe("Site ID to fetch URLs for"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.sitesManager.getSiteUrlsFromId(params);
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching site URLs"
        );
      }
    }
  );

  /**
   * Get all sites
   */
  server.tool(
    "matomo_sites_manager_get_all_sites",
    "Get information about all sites in Matomo",
    {},
    async () => {
      const client = getMatomoClient();
      try {
        const results = await client.sitesManager.getAllSites();
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching all sites"
        );
      }
    }
  );

  /**
   * Get all site IDs
   */
  server.tool(
    "matomo_sites_manager_get_all_sites_id",
    "Get IDs of all available sites in Matomo",
    {},
    async () => {
      const client = getMatomoClient();
      try {
        const results = await client.sitesManager.getAllSitesId();
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching all site IDs"
        );
      }
    }
  );

  /**
   * Get sites with admin access
   */
  server.tool(
    "matomo_sites_manager_get_sites_with_admin_access",
    "Get sites where the current user has admin access",
    {
      fetchAliasUrls: z
        .union([z.boolean(), z.string()])
        .optional()
        .describe("Whether to include alias URLs"),
      pattern: z.string().optional().describe("Filter sites by pattern"),
      limit: z
        .union([z.number(), z.string()])
        .optional()
        .describe("Maximum number of sites to return"),
      sitesToExclude: z
        .array(z.number())
        .optional()
        .describe("Array of site IDs to exclude"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results =
          await client.sitesManager.getSitesWithAdminAccess(params);
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching sites with admin access"
        );
      }
    }
  );

  /**
   * Get sites with view access
   */
  server.tool(
    "matomo_sites_manager_get_sites_with_view_access",
    "Get sites where the current user has view access",
    {},
    async () => {
      const client = getMatomoClient();
      try {
        const results = await client.sitesManager.getSitesWithViewAccess();
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching sites with view access"
        );
      }
    }
  );

  /**
   * Get sites with at least view access
   */
  server.tool(
    "matomo_sites_manager_get_sites_with_at_least_view_access",
    "Get sites where the current user has at least view access",
    {
      limit: z
        .union([z.number(), z.string()])
        .optional()
        .describe("Maximum number of sites to return"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results =
          await client.sitesManager.getSitesWithAtLeastViewAccess(params);
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message ||
            "An error occurred fetching sites with at least view access"
        );
      }
    }
  );

  /**
   * Add a site
   */
  server.tool(
    "matomo_sites_manager_add_site",
    "Add a new site to Matomo",
    {
      siteName: z.string().describe("Name of the site"),
      urls: z
        .union([z.string(), z.array(z.string())])
        .optional()
        .describe("URLs of the site (string or array)"),
      ecommerce: z
        .union([z.boolean(), z.string()])
        .optional()
        .describe("Is an ecommerce site"),
      siteSearch: z
        .union([z.boolean(), z.string()])
        .optional()
        .describe("Should site search be tracked"),
      searchKeywordParameters: z
        .string()
        .optional()
        .describe("Parameters used for search keywords"),
      searchCategoryParameters: z
        .string()
        .optional()
        .describe("Parameters used for search categories"),
      excludedIps: z
        .string()
        .optional()
        .describe("IPs to exclude from tracking"),
      excludedQueryParameters: z
        .string()
        .optional()
        .describe("Query parameters to exclude from page URLs"),
      timezone: z.string().optional().describe("Site timezone"),
      currency: z.string().optional().describe("Site currency"),
      group: z.string().optional().describe("Site group"),
      startDate: z.string().optional().describe("When to start tracking data"),
      excludedUserAgents: z
        .string()
        .optional()
        .describe("User agents to exclude from tracking"),
      keepURLFragments: z
        .union([z.boolean(), z.string()])
        .optional()
        .describe("Whether to keep URL fragments (anchors)"),
      type: z.string().optional().describe("Site type"),
      settingValues: z
        .record(z.any())
        .optional()
        .describe("Additional setting values"),
      excludeUnknownUrls: z
        .union([z.boolean(), z.string()])
        .optional()
        .describe("Whether to exclude unknown URLs"),
      excludedReferrers: z.string().optional().describe("Referrers to exclude"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.sitesManager.addSite(params);
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(error.message || "An error occurred adding the site");
      }
    }
  );

  /**
   * Update a site
   */
  server.tool(
    "matomo_sites_manager_update_site",
    "Update an existing site in Matomo",
    {
      idSite: z.number().describe("Site ID to update"),
      siteName: z.string().optional().describe("Name of the site"),
      urls: z
        .union([z.string(), z.array(z.string())])
        .optional()
        .describe("URLs of the site (string or array)"),
      ecommerce: z
        .union([z.boolean(), z.string()])
        .optional()
        .describe("Is an ecommerce site"),
      siteSearch: z
        .union([z.boolean(), z.string()])
        .optional()
        .describe("Should site search be tracked"),
      searchKeywordParameters: z
        .string()
        .optional()
        .describe("Parameters used for search keywords"),
      searchCategoryParameters: z
        .string()
        .optional()
        .describe("Parameters used for search categories"),
      excludedIps: z
        .string()
        .optional()
        .describe("IPs to exclude from tracking"),
      excludedQueryParameters: z
        .string()
        .optional()
        .describe("Query parameters to exclude from page URLs"),
      timezone: z.string().optional().describe("Site timezone"),
      currency: z.string().optional().describe("Site currency"),
      group: z.string().optional().describe("Site group"),
      startDate: z.string().optional().describe("When to start tracking data"),
      excludedUserAgents: z
        .string()
        .optional()
        .describe("User agents to exclude from tracking"),
      keepURLFragments: z
        .union([z.boolean(), z.string()])
        .optional()
        .describe("Whether to keep URL fragments (anchors)"),
      type: z.string().optional().describe("Site type"),
      settingValues: z
        .record(z.any())
        .optional()
        .describe("Additional setting values"),
      excludeUnknownUrls: z
        .union([z.boolean(), z.string()])
        .optional()
        .describe("Whether to exclude unknown URLs"),
      excludedReferrers: z.string().optional().describe("Referrers to exclude"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.sitesManager.updateSite(params);
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(error.message || "An error occurred updating the site");
      }
    }
  );

  /**
   * Delete a site
   */
  server.tool(
    "matomo_sites_manager_delete_site",
    "Delete a site from Matomo",
    {
      idSite: z.number().describe("Site ID to delete"),
      passwordConfirmation: z
        .string()
        .optional()
        .describe("Password confirmation for security"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.sitesManager.deleteSite(params);
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(error.message || "An error occurred deleting the site");
      }
    }
  );

  /**
   * Get currency list
   */
  server.tool(
    "matomo_sites_manager_get_currency_list",
    "Get list of available currencies",
    {},
    async () => {
      const client = getMatomoClient();
      try {
        const results = await client.sitesManager.getCurrencyList();
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching currency list"
        );
      }
    }
  );

  /**
   * Get timezone list
   */
  server.tool(
    "matomo_sites_manager_get_timezones_list",
    "Get list of available timezones",
    {},
    async () => {
      const client = getMatomoClient();
      try {
        const results = await client.sitesManager.getTimezonesList();
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching timezones list"
        );
      }
    }
  );

  /**
   * Get sites matching a pattern
   */
  server.tool(
    "matomo_sites_manager_get_pattern_match_sites",
    "Get sites matching a pattern",
    {
      pattern: z.string().describe("Pattern to match"),
      limit: z
        .union([z.number(), z.string()])
        .optional()
        .describe("Maximum number of sites to return"),
      sitesToExclude: z
        .array(z.number())
        .optional()
        .describe("Array of site IDs to exclude"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.sitesManager.getPatternMatchSites(params);
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching sites matching pattern"
        );
      }
    }
  );
};
