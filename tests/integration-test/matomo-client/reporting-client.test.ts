import { describe, it, expect, beforeAll } from "vitest";
import nock from "nock";
import { ReportingClient } from "@mj-kiwi/matomo-client";

// Define test constants
const BASE_URL = "https://analytics.example.org";
const API_TOKEN = "test_token";
const DEFAULT_SITE_ID = 1;

// Define sample responses based on real Matomo API responses
const MATOMO_VERSION_RESPONSE = {
  value: "5.3.1",
};

const SITES_LIST_RESPONSE = [
  {
    idsite: "1",
    name: "Example Website",
    main_url: "https://example.com",
    ts_created: "2023-01-01 00:00:00",
    timezone: "UTC",
    currency: "USD",
    exclude_unknown_urls: "0",
    type: "website",
    group: "",
    keep_url_fragment: "0",
    creator_login: "admin",
  },
  {
    idsite: "2",
    name: "Test Website",
    main_url: "https://test.com",
    ts_created: "2023-02-01 00:00:00",
    timezone: "UTC",
    currency: "EUR",
    exclude_unknown_urls: "0",
    type: "website",
    group: "",
    keep_url_fragment: "0",
    creator_login: "admin",
  },
];

const VISITOR_SUMMARY_RESPONSE = {
  nb_uniq_visitors: 1205,
  nb_visits: 1518,
  nb_actions: 4522,
  max_actions: 25,
  bounce_count: 762,
  sum_visit_length: 485242,
  nb_visits_converted: 89,
};

// Error response structure
const ERROR_RESPONSE = {
  result: "error",
  message: "Authentication failed",
};

describe("ReportingClient Integration Tests", () => {
  let client: ReportingClient;
  let clientWithoutSecurity: ReportingClient;

  beforeAll(() => {
    // Create client instance with security mode (default)
    client = new ReportingClient({
      url: BASE_URL,
      tokenAuth: API_TOKEN,
      idSite: DEFAULT_SITE_ID,
    });

    // Create client instance with security mode disabled (GET requests)
    clientWithoutSecurity = new ReportingClient({
      url: BASE_URL,
      tokenAuth: API_TOKEN,
      idSite: DEFAULT_SITE_ID,
      securityMode: false,
    });
  });

  // Note: nock setup/teardown is now handled in the global vitest.setup.ts file

  it("should get Matomo version", async () => {
    // Setup mock for POST request (default security mode)
    nock(BASE_URL)
      .post("/index.php")
      .reply(function (uri, requestBody) {
        const body = new URLSearchParams(requestBody as string);
        if (
          body.get("module") === "API" &&
          body.get("method") === "API.getMatomoVersion" &&
          body.get("format") === "json" &&
          body.get("token_auth") === API_TOKEN
        ) {
          return [200, MATOMO_VERSION_RESPONSE];
        }
        return [400, "Bad request"];
      });

    // Execute
    const result = await client.api.getMatomoVersion();

    // Verify
    expect(result).toEqual(MATOMO_VERSION_RESPONSE.value);
  });

  it("should get sites list", async () => {
    // Setup mock for POST request
    nock(BASE_URL)
      .post("/index.php")
      .reply(function (uri, requestBody) {
        const body = new URLSearchParams(requestBody as string);
        if (
          body.get("module") === "API" &&
          body.get("method") === "SitesManager.getAllSites" &&
          body.get("format") === "json" &&
          body.get("token_auth") === API_TOKEN
        ) {
          return [200, SITES_LIST_RESPONSE];
        }
        return [400, "Bad request"];
      });

    // Execute
    const result = await client.sitesManager.getAllSites();

    // Verify
    expect(result).toEqual(SITES_LIST_RESPONSE);
    expect(result).toHaveLength(2);
    expect(result[0].idsite).toBe("1");
    expect(result[0].name).toBe("Example Website");
  });

  it("should get visitors summary", async () => {
    // Setup mock for POST request
    nock(BASE_URL)
      .post("/index.php")
      .reply(function (uri, requestBody) {
        const body = new URLSearchParams(requestBody as string);
        if (
          body.get("module") === "API" &&
          body.get("method") === "VisitsSummary.get" &&
          body.get("idSite") === String(DEFAULT_SITE_ID) &&
          body.get("period") === "day" &&
          body.get("date") === "yesterday" &&
          body.get("format") === "json" &&
          body.get("token_auth") === API_TOKEN
        ) {
          return [200, VISITOR_SUMMARY_RESPONSE];
        }
        return [400, "Bad request"];
      });

    // Execute with object parameters
    const result = await client.visitsSummary.get({
      idSite: DEFAULT_SITE_ID,
      period: "day",
      date: "yesterday",
    });

    // Verify
    expect(result).toEqual(VISITOR_SUMMARY_RESPONSE);
    expect(result.nb_visits).toBe(1518);
    expect(result.nb_actions).toBe(4522);
  });

  it("should get visitors summary with object parameters", async () => {
    // Setup mock for POST request
    nock(BASE_URL)
      .post("/index.php")
      .reply(function (uri, requestBody) {
        const body = new URLSearchParams(requestBody as string);
        if (
          body.get("module") === "API" &&
          body.get("method") === "VisitsSummary.get" &&
          body.get("idSite") === String(DEFAULT_SITE_ID) &&
          body.get("period") === "day" &&
          body.get("date") === "yesterday" &&
          body.get("format") === "json" &&
          body.get("token_auth") === API_TOKEN
        ) {
          return [200, VISITOR_SUMMARY_RESPONSE];
        }
        return [400, "Bad request"];
      });

    // Execute with object parameters
    const result = await client.visitsSummary.get({
      idSite: DEFAULT_SITE_ID,
      period: "day",
      date: "yesterday",
    });

    // Verify
    expect(result).toEqual(VISITOR_SUMMARY_RESPONSE);
    expect(result.nb_visits).toBe(1518);
    expect(result.nb_actions).toBe(4522);
  });

  it("should handle API errors", async () => {
    // Setup mock for POST request
    nock(BASE_URL)
      .post("/index.php")
      .reply(function (uri, requestBody) {
        const body = new URLSearchParams(requestBody as string);
        if (
          body.get("module") === "API" &&
          body.get("method") === "API.getMatomoVersion" &&
          body.get("format") === "json" &&
          body.get("token_auth") === "invalid_token"
        ) {
          return [200, ERROR_RESPONSE];
        }
        return [400, "Bad request"];
      });

    // Create client with invalid token
    const invalidClient = new ReportingClient({
      url: BASE_URL,
      tokenAuth: "invalid_token",
      idSite: DEFAULT_SITE_ID,
    });

    // Execute and verify error handling
    await expect(invalidClient.api.getMatomoVersion()).rejects.toThrow(
      "Matomo API error: Authentication failed"
    );
  });

  it("should handle bulk requests", async () => {
    // Setup bulk response
    const bulkResponse = [MATOMO_VERSION_RESPONSE, SITES_LIST_RESPONSE];

    // Setup mock for bulk request (POST)
    nock(BASE_URL)
      .post("/index.php")
      .reply(function (uri, requestBody) {
        const body = new URLSearchParams(requestBody as string);
        if (
          body.get("module") === "API" &&
          body.get("method") === "API.getBulkRequest" &&
          body.get("format") === "json" &&
          body.get("token_auth") === API_TOKEN &&
          body.get("urls[0]") === "method=API.getMatomoVersion" &&
          body.get("urls[1]") === "method=SitesManager.getAllSites"
        ) {
          return [200, bulkResponse];
        }
        return [400, "Bad request"];
      });

    // Execute bulk request
    const result = await client.core.bulkRequest({
      "API.getMatomoVersion": {},
      "SitesManager.getAllSites": {},
    });

    // Verify
    expect(Object.values(result)).toEqual(bulkResponse);
  });

  it("should accept custom parameters", async () => {
    // Setup mock for POST request with custom parameters
    nock(BASE_URL)
      .post("/index.php")
      .reply(function (uri, requestBody) {
        const body = new URLSearchParams(requestBody as string);
        if (
          body.get("module") === "API" &&
          body.get("method") === "Actions.getPageUrls" &&
          body.get("idSite") === "5" && // Custom site ID overriding default
          body.get("period") === "month" &&
          body.get("date") === "last3" &&
          body.get("segment") === "10" &&
          body.get("format") === "json" &&
          body.get("token_auth") === API_TOKEN
        ) {
          return [200, []];
        }
        return [400, "Bad request"];
      });

    // Execute with object parameters
    await client.actions.getPageUrls({
      idSite: 5, // Override default site ID
      period: "month",
      date: "last3",
      segment: "10",
    });
  });

  it("should accept object parameters", async () => {
    // Setup mock for POST request with object parameters
    nock(BASE_URL)
      .post("/index.php")
      .reply(function (uri, requestBody) {
        const body = new URLSearchParams(requestBody as string);
        if (
          body.get("module") === "API" &&
          body.get("method") === "Actions.getPageUrls" &&
          body.get("idSite") === "5" && // Custom site ID overriding default
          body.get("period") === "month" &&
          body.get("date") === "last3" &&
          body.get("segment") === "10" &&
          body.get("format") === "json" &&
          body.get("token_auth") === API_TOKEN
        ) {
          return [200, []];
        }
        return [400, "Bad request"];
      });

    // Execute with object parameters
    await client.actions.getPageUrls({
      idSite: 5, // Override default site ID
      period: "month",
      date: "last3",
      segment: "10",
    });
  });

  it("should handle network errors", async () => {
    // Setup mock for network error
    nock(BASE_URL).post("/index.php").replyWithError("Network error");

    // Execute and verify
    await expect(client.api.getMatomoVersion()).rejects.toThrow(
      "Matomo API error: Network error"
    );
  });

  it("should work with securityMode disabled (using GET requests)", async () => {
    // Setup mock for GET request when security mode is disabled
    nock(BASE_URL)
      .get("/index.php")
      .query((queryObj) => {
        return (
          queryObj.module === "API" &&
          queryObj.method === "API.getMatomoVersion" &&
          queryObj.format === "json" &&
          queryObj.token_auth === API_TOKEN
        );
      })
      .reply(200, MATOMO_VERSION_RESPONSE);

    // Execute using client with security mode disabled
    const result = await clientWithoutSecurity.api.getMatomoVersion();

    // Verify
    expect(result).toEqual(MATOMO_VERSION_RESPONSE.value);
  });
});
