import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import nock from "nock";
import { ReportingClient } from "../../src";

// Define test constants
const BASE_URL = "https://analytics.example.org";
const API_TOKEN = "test_token";
const DEFAULT_SITE_ID = "1";

describe("Matomo Client Workflow Integration Tests", () => {
  let client: ReportingClient;

  beforeAll(() => {
    // Create client instance with security mode enabled (default)
    client = new ReportingClient({
      url: BASE_URL,
      tokenAuth: API_TOKEN,
      idSite: DEFAULT_SITE_ID,
    });
  });

  // Note: nock setup/teardown is now handled in the global vitest.setup.ts file

  it("should handle a complete site management workflow", async () => {
    // Step 1: Get all existing sites
    const existingSites = [
      {
        idsite: "1",
        name: "Example Website",
        main_url: "https://example.com",
        ts_created: "2023-01-01",
        timezone: "UTC",
        currency: "USD",
      },
    ];

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
          return [200, existingSites];
        }
        return [400, "Bad request"];
      });

    // Step 2: Add a new website
    const newSite = {
      idsite: "2",
      name: "New Test Site",
      main_url: "https://newtest.com",
      ts_created: "2023-04-18",
      timezone: "UTC",
      currency: "EUR",
    };

    nock(BASE_URL)
      .post("/index.php")
      .reply(function (uri, requestBody) {
        const body = new URLSearchParams(requestBody as string);
        if (
          body.get("module") === "API" &&
          body.get("method") === "SitesManager.addSite" &&
          body.get("siteName") === "New Test Site" &&
          body.get("urls") === "https://newtest.com" &&
          body.get("format") === "json" &&
          body.get("token_auth") === API_TOKEN
        ) {
          return [200, { value: 2 }]; // returns the new site ID
        }
        return [400, "Bad request"];
      });

    // Step 3: Get the newly created site details
    nock(BASE_URL)
      .post("/index.php")
      .reply(function (uri, requestBody) {
        const body = new URLSearchParams(requestBody as string);
        if (
          body.get("module") === "API" &&
          body.get("method") === "SitesManager.getSiteFromId" &&
          body.get("idSite") === "2" &&
          body.get("format") === "json" &&
          body.get("token_auth") === API_TOKEN
        ) {
          return [200, newSite];
        }
        return [400, "Bad request"];
      });

    // Step 4: Update the site settings
    nock(BASE_URL)
      .post("/index.php")
      .reply(function (uri, requestBody) {
        const body = new URLSearchParams(requestBody as string);
        if (
          body.get("module") === "API" &&
          body.get("method") === "SitesManager.updateSite" &&
          body.get("idSite") === "2" &&
          body.get("siteName") === "Updated Test Site" &&
          body.get("format") === "json" &&
          body.get("token_auth") === API_TOKEN
        ) {
          return [200, { value: true }];
        }
        return [400, "Bad request"];
      });

    // Step 5: Get updated list of all sites
    const updatedSites = [
      ...existingSites,
      {
        ...newSite,
        name: "Updated Test Site",
      },
    ];

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
          return [200, updatedSites];
        }
        return [400, "Bad request"];
      });

    // Execute the workflow
    // Step 1: Get all sites
    const initialSites = await client.sitesManager.getAllSites();
    expect(initialSites).toEqual(existingSites);
    expect(initialSites).toHaveLength(1);

    // Step 2: Add a new site
    const addSiteResult = await client.sitesManager.addSite(
      "New Test Site",
      "https://newtest.com"
    );
    expect(addSiteResult).toEqual({ value: 2 });

    // Step 3: Get the new site details
    const createdSite = await client.sitesManager.getSiteFromId(2);
    expect(createdSite).toEqual(newSite);
    expect(createdSite.name).toBe("New Test Site");
    expect(createdSite.main_url).toBe("https://newtest.com");

    // Step 4: Update the site
    const updateResult = await client.sitesManager.updateSite(
      2,
      "Updated Test Site"
    );
    expect(updateResult).toEqual({ value: true });

    // Step 5: Get all sites again and verify update
    const finalSites = await client.sitesManager.getAllSites();
    expect(finalSites).toHaveLength(2);
    expect(finalSites[1].name).toBe("Updated Test Site");
  });

  it("should execute a complete analytics reporting workflow", async () => {
    // Set up date ranges for our test
    const date = "2023-04-01";
    const period = "week";

    // Step 1: Get overall visits summary
    const visitsSummary = {
      nb_uniq_visitors: 3500,
      nb_visits: 4200,
      nb_actions: 12350,
      max_actions: 30,
      bounce_count: 1200,
      sum_visit_length: 1245600,
      nb_visits_converted: 320,
    };

    nock(BASE_URL)
      .post("/index.php")
      .reply(function (uri, requestBody) {
        const body = new URLSearchParams(requestBody as string);
        if (
          body.get("module") === "API" &&
          body.get("method") === "VisitsSummary.get" &&
          body.get("date") === date &&
          body.get("period") === period &&
          body.get("idSite") === DEFAULT_SITE_ID &&
          body.get("format") === "json" &&
          body.get("token_auth") === API_TOKEN
        ) {
          return [200, visitsSummary];
        }
        return [400, "Bad request"];
      });

    // Step 2: Get top page URLs
    const topPages = [
      {
        label: "/home",
        nb_visits: 3200,
        nb_hits: 3200,
        sum_time_spent: 450000,
        entry_nb_visits: 2200,
        entry_bounce_count: 800,
        exit_nb_visits: 600,
      },
      {
        label: "/products",
        nb_visits: 1800,
        nb_hits: 2100,
        sum_time_spent: 320000,
        entry_nb_visits: 800,
        entry_bounce_count: 150,
        exit_nb_visits: 200,
      },
    ];

    nock(BASE_URL)
      .post("/index.php")
      .reply(function (uri, requestBody) {
        const body = new URLSearchParams(requestBody as string);
        if (
          body.get("module") === "API" &&
          body.get("method") === "Actions.getPageUrls" &&
          body.get("idSite") === DEFAULT_SITE_ID &&
          body.get("date") === date &&
          body.get("period") === period &&
          body.get("format") === "json" &&
          body.get("token_auth") === API_TOKEN
        ) {
          return [200, topPages];
        }
        return [400, "Bad request"];
      });

    // Step 3: Get referrers
    const referrers = [
      {
        label: "Google",
        nb_visits: 1500,
        nb_actions: 4800,
        max_actions: 28,
        sum_visit_length: 425000,
        nb_visits_converted: 180,
        bounce_rate: "22%",
      },
      {
        label: "Direct Entry",
        nb_visits: 950,
        nb_actions: 2850,
        max_actions: 25,
        sum_visit_length: 310000,
        nb_visits_converted: 95,
        bounce_rate: "30%",
      },
    ];

    nock(BASE_URL)
      .post("/index.php")
      .reply(function (uri, requestBody) {
        const body = new URLSearchParams(requestBody as string);
        if (
          body.get("module") === "API" &&
          body.get("method") === "Referrers.getWebsites" &&
          body.get("idSite") === DEFAULT_SITE_ID &&
          body.get("date") === date &&
          body.get("period") === period &&
          body.get("format") === "json" &&
          body.get("token_auth") === API_TOKEN
        ) {
          return [200, referrers];
        }
        return [400, "Bad request"];
      });

    // Step 4: Get visitor countries
    const countries = [
      {
        label: "United States",
        nb_visits: 2200,
        nb_actions: 6600,
        max_actions: 30,
        sum_visit_length: 660000,
        bounce_rate: "25%",
      },
      {
        label: "United Kingdom",
        nb_visits: 780,
        nb_actions: 2340,
        max_actions: 25,
        sum_visit_length: 234000,
        bounce_rate: "28%",
      },
    ];

    nock(BASE_URL)
      .post("/index.php")
      .reply(function (uri, requestBody) {
        const body = new URLSearchParams(requestBody as string);
        if (
          body.get("module") === "API" &&
          body.get("method") === "UserCountry.getCountry" &&
          body.get("idSite") === DEFAULT_SITE_ID &&
          body.get("date") === date &&
          body.get("period") === period &&
          body.get("format") === "json" &&
          body.get("token_auth") === API_TOKEN
        ) {
          return [200, countries];
        }
        return [400, "Bad request"];
      });

    // Execute the reporting workflow
    // Step 1: Get visits summary
    const summary = await client.visitsSummary.get(
      DEFAULT_SITE_ID,
      period,
      date
    );
    expect(summary).toEqual(visitsSummary);
    expect(summary.nb_visits).toBe(4200);

    // Step 2: Get top pages
    const pages = await client.actions.getPageUrls(
      DEFAULT_SITE_ID,
      period,
      date
    );
    expect(pages).toEqual(topPages);
    expect(pages[0].label).toBe("/home");
    expect(pages[0].nb_visits).toBe(3200);

    // Step 3: Get referrers
    const websiteReferrers = await client.referrers.getWebsites(
      DEFAULT_SITE_ID,
      period,
      date
    );
    expect(websiteReferrers).toEqual(referrers);
    expect(websiteReferrers[0].label).toBe("Google");
    expect(websiteReferrers[0].nb_visits).toBe(1500);

    // Step 4: Get visitor countries
    const visitorCountries = await client.userCountry.getCountry(
      DEFAULT_SITE_ID,
      period,
      date
    );
    expect(visitorCountries).toEqual(countries);
    expect(visitorCountries[0].label).toBe("United States");
    expect(visitorCountries[0].nb_visits).toBe(2200);

    // Verify we can build a complete report from these calls
    const report = {
      summary,
      topPages: pages,
      topReferrers: websiteReferrers,
      visitorCountries,
    };

    // Verify the final report structure
    expect(report.summary.nb_visits).toBe(4200);
    expect(report.topPages[0].nb_visits).toBe(3200);
    expect(report.topReferrers[0].nb_visits).toBe(1500);
    expect(report.visitorCountries[0].nb_visits).toBe(2200);
  });

  it("should handle different response formats", async () => {
    // Create a client that requests XML format
    const xmlClient = new ReportingClient({
      url: BASE_URL,
      tokenAuth: API_TOKEN,
      idSite: DEFAULT_SITE_ID,
      format: "xml",
    });

    // Mock XML response
    const xmlResponse = `
      <?xml version="1.0" encoding="utf-8" ?>
      <r>
        <row>
          <nb_uniq_visitors>1205</nb_uniq_visitors>
          <nb_visits>1518</nb_visits>
          <nb_actions>4522</nb_actions>
          <max_actions>25</max_actions>
          <bounce_count>762</bounce_count>
          <sum_visit_length>485242</sum_visit_length>
          <nb_visits_converted>89</nb_visits_converted>
        </row>
      </r>
    `;

    nock(BASE_URL)
      .post("/index.php")
      .reply(function (uri, requestBody) {
        const body = new URLSearchParams(requestBody as string);
        if (
          body.get("module") === "API" &&
          body.get("method") === "VisitsSummary.get" &&
          body.get("format") === "xml" &&
          body.get("date") === "yesterday" &&
          body.get("period") === "day" &&
          body.get("token_auth") === API_TOKEN &&
          body.get("idSite") === DEFAULT_SITE_ID
        ) {
          return [200, xmlResponse];
        }
        return [400, "Bad request"];
      });

    // Execute
    const xmlResult = await xmlClient.visitsSummary.get(
      DEFAULT_SITE_ID,
      "day",
      "yesterday"
    );

    // Verify XML response is returned as string
    expect(typeof xmlResult).toBe("string");
    expect(xmlResult).toContain('<?xml version="1.0"');
    expect(xmlResult).toContain("<nb_visits>1518</nb_visits>");
  });
});
