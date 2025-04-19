import { describe, it, expect, vi, beforeEach } from "vitest";
import { SitesManagerModule, CoreReportingClient } from "../../src/index";

// Mock CoreReportingClient
vi.mock(import("../../src/index"), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe("SitesManagerModule", () => {
  let sitesManagerModule: SitesManagerModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and SitesManager module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    sitesManagerModule = new SitesManagerModule(clientInstance);
  });

  // Group related tests by SitesManagerModule methods

  describe("Basic Site Information Methods", () => {
    describe("getSiteFromId", () => {
      it("should call the API with idSite parameter", async () => {
        const mockResponse = {
          id: 1,
          name: "Example Site",
          url: "https://example.org",
        };
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getSiteFromId({ idSite: 1 });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getSiteFromId",
          { idSite: 1 }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("getSiteUrlsFromId", () => {
      it("should call the API with idSite parameter", async () => {
        const mockResponse = ["https://example.org", "https://example.com"];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getSiteUrlsFromId({
          idSite: 1,
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getSiteUrlsFromId",
          { idSite: 1 }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("getAllSites", () => {
      it("should call the API without parameters", async () => {
        const mockResponse = [
          { id: 1, name: "Site 1", url: "https://example1.org" },
          { id: 2, name: "Site 2", url: "https://example2.org" },
        ];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getAllSites();

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getAllSites",
          {}
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("getAllSitesId", () => {
      it("should call the API without parameters", async () => {
        const mockResponse = [1, 2, 3, 4, 5];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getAllSitesId();

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getAllSitesId",
          {}
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("getSiteSettings", () => {
      it("should call the API with idSite parameter", async () => {
        const mockResponse = {
          siteName: "Example Site",
          timezone: "UTC",
          currency: "USD",
          settings: { key1: "value1" },
        };
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getSiteSettings({ idSite: 1 });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getSiteSettings",
          { idSite: 1 }
        );
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe("Site Groups Methods", () => {
    describe("getSitesGroups", () => {
      it("should call the API without parameters", async () => {
        const mockResponse = ["E-commerce", "Blog", "Landing Pages"];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getSitesGroups();

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getSitesGroups",
          {}
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("getSitesFromGroup", () => {
      it("should call the API without parameters", async () => {
        const mockResponse = [
          { id: 1, name: "Site 1" },
          { id: 2, name: "Site 2" },
        ];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getSitesFromGroup({});

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getSitesFromGroup",
          {}
        );
        expect(result).toEqual(mockResponse);
      });

      it("should call the API with group parameter", async () => {
        const mockResponse = [{ id: 1, name: "Site 1" }];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getSitesFromGroup({
          group: "E-commerce",
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getSitesFromGroup",
          { group: "E-commerce" }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("renameGroup", () => {
      it("should call the API with required parameters", async () => {
        const mockResponse = { success: true };
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.renameGroup({
          oldGroupName: "Old Group",
          newGroupName: "New Group",
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.renameGroup",
          {
            oldGroupName: "Old Group",
            newGroupName: "New Group",
          }
        );
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe("Site Access Methods", () => {
    describe("getSitesWithAdminAccess", () => {
      it("should call the API without parameters", async () => {
        const mockResponse = [{ id: 1, name: "Site 1" }];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getSitesWithAdminAccess({});

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getSitesWithAdminAccess",
          {}
        );
        expect(result).toEqual(mockResponse);
      });

      it("should call the API with all parameters", async () => {
        const mockResponse = [{ id: 2, name: "Site 2" }];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getSitesWithAdminAccess({
          fetchAliasUrls: true,
          pattern: "example",
          limit: 10,
          sitesToExclude: [1, 3],
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getSitesWithAdminAccess",
          {
            fetchAliasUrls: true,
            pattern: "example",
            limit: 10,
            sitesToExclude: [1, 3],
          }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("getSitesWithViewAccess", () => {
      it("should call the API without parameters", async () => {
        const mockResponse = [
          { id: 1, name: "Site 1" },
          { id: 2, name: "Site 2" },
        ];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getSitesWithViewAccess();

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getSitesWithViewAccess",
          {}
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("getSitesWithAtLeastViewAccess", () => {
      it("should call the API without parameters", async () => {
        const mockResponse = [
          { id: 1, name: "Site 1" },
          { id: 2, name: "Site 2" },
        ];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getSitesWithAtLeastViewAccess(
          {}
        );

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getSitesWithAtLeastViewAccess",
          {}
        );
        expect(result).toEqual(mockResponse);
      });

      it("should call the API with limit parameter", async () => {
        const mockResponse = [{ id: 1, name: "Site 1" }];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getSitesWithAtLeastViewAccess({
          limit: 5,
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getSitesWithAtLeastViewAccess",
          { limit: 5 }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("getSitesIdWithAdminAccess", () => {
      it("should call the API without parameters", async () => {
        const mockResponse = [1, 3, 5];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getSitesIdWithAdminAccess();

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getSitesIdWithAdminAccess",
          {}
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("getSitesIdWithViewAccess", () => {
      it("should call the API without parameters", async () => {
        const mockResponse = [2, 4, 6];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getSitesIdWithViewAccess();

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getSitesIdWithViewAccess",
          {}
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("getSitesIdWithWriteAccess", () => {
      it("should call the API without parameters", async () => {
        const mockResponse = [1, 3, 5];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getSitesIdWithWriteAccess();

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getSitesIdWithWriteAccess",
          {}
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("getSitesIdWithAtLeastViewAccess", () => {
      it("should call the API without parameters", async () => {
        const mockResponse = [1, 2, 3, 4, 5, 6];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result =
          await sitesManagerModule.getSitesIdWithAtLeastViewAccess();

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getSitesIdWithAtLeastViewAccess",
          {}
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("getSitesIdFromSiteUrl", () => {
      it("should call the API with url parameter", async () => {
        const mockResponse = [1, 2];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getSitesIdFromSiteUrl({
          url: "https://example.org",
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getSitesIdFromSiteUrl",
          { url: "https://example.org" }
        );
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe("Site Management Methods", () => {
    describe("addSite", () => {
      it("should call the API with required parameters", async () => {
        const mockResponse = { id: 3 };
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.addSite({
          siteName: "New Test Site",
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.addSite",
          {
            siteName: "New Test Site",
          }
        );
        expect(result).toEqual(mockResponse);
      });

      it("should call the API with all parameters", async () => {
        const mockResponse = { id: 3 };
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.addSite({
          siteName: "New Test Site",
          urls: ["https://newsite.com", "https://newsite.org"],
          ecommerce: true,
          siteSearch: true,
          searchKeywordParameters: "q,query,s",
          searchCategoryParameters: "cat",
          excludedIps: "192.168.1.1",
          excludedQueryParameters: "utm_*",
          timezone: "Europe/Paris",
          currency: "EUR",
          group: "E-commerce",
          startDate: "2023-01-01",
          excludedUserAgents: "bot,spider",
          keepURLFragments: true,
          type: "website",
          settingValues: { customSetting: "value" },
          excludeUnknownUrls: true,
          excludedReferrers: "facebook.com",
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.addSite",
          {
            siteName: "New Test Site",
            urls: ["https://newsite.com", "https://newsite.org"],
            ecommerce: true,
            siteSearch: true,
            searchKeywordParameters: "q,query,s",
            searchCategoryParameters: "cat",
            excludedIps: "192.168.1.1",
            excludedQueryParameters: "utm_*",
            timezone: "Europe/Paris",
            currency: "EUR",
            group: "E-commerce",
            startDate: "2023-01-01",
            excludedUserAgents: "bot,spider",
            keepURLFragments: true,
            type: "website",
            settingValues: { customSetting: "value" },
            excludeUnknownUrls: true,
            excludedReferrers: "facebook.com",
          }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("deleteSite", () => {
      it("should call the API with idSite parameter", async () => {
        const mockResponse = { success: true };
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.deleteSite({
          idSite: 1,
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.deleteSite",
          { idSite: 1 }
        );
        expect(result).toEqual(mockResponse);
      });

      it("should call the API with passwordConfirmation parameter", async () => {
        const mockResponse = { success: true };
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.deleteSite({
          idSite: 1,
          passwordConfirmation: "password123",
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.deleteSite",
          {
            idSite: 1,
            passwordConfirmation: "password123",
          }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("updateSite", () => {
      it("should call the API with required parameters", async () => {
        const mockResponse = { success: true };
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.updateSite({
          idSite: 1,
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.updateSite",
          { idSite: 1 }
        );
        expect(result).toEqual(mockResponse);
      });

      it("should call the API with all parameters", async () => {
        const mockResponse = { success: true };
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.updateSite({
          idSite: 1,
          siteName: "Updated Site",
          urls: ["https://updated.example.com"],
          ecommerce: true,
          siteSearch: true,
          searchKeywordParameters: "q,query",
          searchCategoryParameters: "cat",
          excludedIps: "192.168.1.1",
          excludedQueryParameters: "utm_*",
          timezone: "Europe/Paris",
          currency: "EUR",
          group: "Blogs",
          startDate: "2023-01-01",
          excludedUserAgents: "bot,spider",
          keepURLFragments: true,
          type: "blog",
          settingValues: { setting1: "value1" },
          excludeUnknownUrls: true,
          excludedReferrers: "spam.com",
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.updateSite",
          {
            idSite: 1,
            siteName: "Updated Site",
            urls: ["https://updated.example.com"],
            ecommerce: true,
            siteSearch: true,
            searchKeywordParameters: "q,query",
            searchCategoryParameters: "cat",
            excludedIps: "192.168.1.1",
            excludedQueryParameters: "utm_*",
            timezone: "Europe/Paris",
            currency: "EUR",
            group: "Blogs",
            startDate: "2023-01-01",
            excludedUserAgents: "bot,spider",
            keepURLFragments: true,
            type: "blog",
            settingValues: { setting1: "value1" },
            excludeUnknownUrls: true,
            excludedReferrers: "spam.com",
          }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("getPatternMatchSites", () => {
      it("should call the API with required parameters", async () => {
        const mockResponse = [{ id: 1, name: "Example Site" }];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getPatternMatchSites({
          pattern: "example",
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getPatternMatchSites",
          { pattern: "example" }
        );
        expect(result).toEqual(mockResponse);
      });

      it("should call the API with all parameters", async () => {
        const mockResponse = [{ id: 1, name: "Example Site" }];
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getPatternMatchSites({
          pattern: "example",
          limit: 10,
          sitesToExclude: [2, 3],
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getPatternMatchSites",
          {
            pattern: "example",
            limit: 10,
            sitesToExclude: [2, 3],
          }
        );
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe("Site Alias Methods", () => {
    describe("addSiteAliasUrls", () => {
      it("should call the API with required parameters", async () => {
        const mockResponse = { success: true };
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.addSiteAliasUrls({
          idSite: 1,
          urls: "https://alias.example.org",
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.addSiteAliasUrls",
          {
            idSite: 1,
            urls: "https://alias.example.org",
          }
        );
        expect(result).toEqual(mockResponse);
      });

      it("should call the API with urls array", async () => {
        const mockResponse = { success: true };
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.addSiteAliasUrls({
          idSite: 1,
          urls: ["https://alias1.example.org", "https://alias2.example.org"],
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.addSiteAliasUrls",
          {
            idSite: 1,
            urls: ["https://alias1.example.org", "https://alias2.example.org"],
          }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("setSiteAliasUrls", () => {
      it("should call the API with required parameters", async () => {
        const mockResponse = { success: true };
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.setSiteAliasUrls({
          idSite: 1,
          urls: [],
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.setSiteAliasUrls",
          {
            idSite: 1,
            urls: [],
          }
        );
        expect(result).toEqual(mockResponse);
      });

      it("should call the API with urls array", async () => {
        const mockResponse = { success: true };
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.setSiteAliasUrls({
          idSite: 1,
          urls: ["https://new1.example.org", "https://new2.example.org"],
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.setSiteAliasUrls",
          {
            idSite: 1,
            urls: ["https://new1.example.org", "https://new2.example.org"],
          }
        );
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe("Tracking Code Methods", () => {
    describe("getJavascriptTag", () => {
      it("should call the API with required parameters", async () => {
        const mockResponse = {
          code: "<!-- Matomo --><script>/* JS code */</script>",
        };
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getJavascriptTag({
          idSite: 1,
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getJavascriptTag",
          { idSite: 1 }
        );
        expect(result).toEqual(mockResponse);
      });

      it("should call the API with all parameters", async () => {
        const mockResponse = {
          code: "<!-- Matomo --><script>/* JS code */</script>",
        };
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getJavascriptTag({
          idSite: 1,
          piwikUrl: "https://matomo.example.org",
          mergeSubdomains: true,
          groupPageTitlesByDomain: true,
          mergeAliasUrls: true,
          visitorCustomVariables: { userId: "visitor1" },
          pageCustomVariables: { page: "homepage" },
          customCampaignNameQueryParam: "campaign_name",
          customCampaignKeywordParam: "campaign_keyword",
          doNotTrack: true,
          disableCookies: true,
          trackNoScript: true,
          crossDomain: true,
          forceMatomoEndpoint: true,
          excludedQueryParams: "utm_*",
          excludedReferrers: "facebook.com",
          disableCampaignParameters: true,
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getJavascriptTag",
          {
            idSite: 1,
            piwikUrl: "https://matomo.example.org",
            mergeSubdomains: true,
            groupPageTitlesByDomain: true,
            mergeAliasUrls: true,
            visitorCustomVariables: { userId: "visitor1" },
            pageCustomVariables: { page: "homepage" },
            customCampaignNameQueryParam: "campaign_name",
            customCampaignKeywordParam: "campaign_keyword",
            doNotTrack: true,
            disableCookies: true,
            trackNoScript: true,
            crossDomain: true,
            forceMatomoEndpoint: true,
            excludedQueryParams: "utm_*",
            excludedReferrers: "facebook.com",
            disableCampaignParameters: true,
          }
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe("getImageTrackingCode", () => {
      it("should call the API with required parameters", async () => {
        const mockResponse = {
          code: '<img src="https://example.org/matomo/matomo.php?idsite=1" />',
        };
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getImageTrackingCode({
          idSite: 1,
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getImageTrackingCode",
          { idSite: 1 }
        );
        expect(result).toEqual(mockResponse);
      });

      it("should call the API with all parameters", async () => {
        const mockResponse = {
          code: '<img src="https://example.org/matomo/matomo.php?idsite=1&action_name=Purchase&idgoal=1&revenue=19.99" />',
        };
        mockClient.request.mockResolvedValueOnce(mockResponse);

        const result = await sitesManagerModule.getImageTrackingCode({
          idSite: 1,
          piwikUrl: "https://matomo.example.org",
          actionName: "Purchase",
          idGoal: 1,
          revenue: 19.99,
          forceMatomoEndpoint: true,
        });

        expect(mockClient.request).toHaveBeenCalledWith(
          "SitesManager.getImageTrackingCode",
          {
            idSite: 1,
            piwikUrl: "https://matomo.example.org",
            actionName: "Purchase",
            idGoal: 1,
            revenue: 19.99,
            forceMatomoEndpoint: true,
          }
        );
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe("Global Settings Methods", () => {
    describe("IP Settings", () => {
      describe("getIpsForRange", () => {
        it("should call the API with ipRange parameter", async () => {
          const mockResponse = ["192.168.1.1", "192.168.1.2"];
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.getIpsForRange({
            ipRange: "192.168.1.1-2",
          });

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getIpsForRange",
            { ipRange: "192.168.1.1-2" }
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("setGlobalExcludedIps", () => {
        it("should call the API with excludedIps parameter", async () => {
          const mockResponse = { success: true };
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.setGlobalExcludedIps({
            excludedIps: "192.168.1.1,10.0.0.1",
          });

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.setGlobalExcludedIps",
            { excludedIps: "192.168.1.1,10.0.0.1" }
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("getExcludedIpsGlobal", () => {
        it("should call the API without parameters", async () => {
          const mockResponse = ["127.0.0.1", "192.168.1.1/24"];
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.getExcludedIpsGlobal();

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getExcludedIpsGlobal",
            {}
          );
          expect(result).toEqual(mockResponse);
        });
      });
    });

    describe("Search Parameters", () => {
      describe("setGlobalSearchParameters", () => {
        it("should call the API with required parameters", async () => {
          const mockResponse = { success: true };
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.setGlobalSearchParameters({
            searchKeywordParameters: "q,query,s",
            searchCategoryParameters: "cat,category",
          });

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.setGlobalSearchParameters",
            {
              searchKeywordParameters: "q,query,s",
              searchCategoryParameters: "cat,category",
            }
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("getSearchKeywordParametersGlobal", () => {
        it("should call the API without parameters", async () => {
          const mockResponse = ["q", "query", "s", "search"];
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result =
            await sitesManagerModule.getSearchKeywordParametersGlobal();

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getSearchKeywordParametersGlobal",
            {}
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("getSearchCategoryParametersGlobal", () => {
        it("should call the API without parameters", async () => {
          const mockResponse = ["cat", "category"];
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result =
            await sitesManagerModule.getSearchCategoryParametersGlobal();

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getSearchCategoryParametersGlobal",
            {}
          );
          expect(result).toEqual(mockResponse);
        });
      });
    });

    describe("Query Parameters", () => {
      describe("getExcludedQueryParameters", () => {
        it("should call the API with idSite parameter", async () => {
          const mockResponse = ["utm_source", "utm_medium", "utm_campaign"];
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.getExcludedQueryParameters({
            idSite: 1,
          });

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getExcludedQueryParameters",
            { idSite: 1 }
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("getExcludedQueryParametersGlobal", () => {
        it("should call the API without parameters", async () => {
          const mockResponse = [
            "utm_source",
            "utm_medium",
            "utm_campaign",
            "gclid",
          ];
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result =
            await sitesManagerModule.getExcludedQueryParametersGlobal();

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getExcludedQueryParametersGlobal",
            {}
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("setGlobalQueryParamExclusion", () => {
        it("should call the API with required parameters", async () => {
          const mockResponse = { success: true };
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.setGlobalQueryParamExclusion({
            exclusionType: "exact",
          });

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.setGlobalQueryParamExclusion",
            { exclusionType: "exact" }
          );
          expect(result).toEqual(mockResponse);
        });

        it("should call the API with all parameters", async () => {
          const mockResponse = { success: true };
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.setGlobalQueryParamExclusion({
            exclusionType: "exact",
            queryParamsToExclude: "utm_*",
          });

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.setGlobalQueryParamExclusion",
            {
              exclusionType: "exact",
              queryParamsToExclude: "utm_*",
            }
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("getExclusionTypeForQueryParams", () => {
        it("should call the API without parameters", async () => {
          const mockResponse = "exact";
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result =
            await sitesManagerModule.getExclusionTypeForQueryParams();

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getExclusionTypeForQueryParams",
            {}
          );
          expect(result).toEqual(mockResponse);
        });
      });
    });

    describe("User Agent Settings", () => {
      describe("getExcludedUserAgentsGlobal", () => {
        it("should call the API without parameters", async () => {
          const mockResponse = ["bot", "spider", "crawl"];
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.getExcludedUserAgentsGlobal();

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getExcludedUserAgentsGlobal",
            {}
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("setGlobalExcludedUserAgents", () => {
        it("should call the API with excludedUserAgents parameter", async () => {
          const mockResponse = { success: true };
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.setGlobalExcludedUserAgents({
            excludedUserAgents: "bot,spider,crawl",
          });

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.setGlobalExcludedUserAgents",
            { excludedUserAgents: "bot,spider,crawl" }
          );
          expect(result).toEqual(mockResponse);
        });
      });
    });

    describe("Referrer Settings", () => {
      describe("getExcludedReferrers", () => {
        it("should call the API with idSite parameter", async () => {
          const mockResponse = ["spam.com", "unwanted.org"];
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.getExcludedReferrers({
            idSite: 1,
          });

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getExcludedReferrers",
            { idSite: 1 }
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("getExcludedReferrersGlobal", () => {
        it("should call the API without parameters", async () => {
          const mockResponse = ["spam.com", "unwanted.org", "bad-traffic.net"];
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.getExcludedReferrersGlobal();

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getExcludedReferrersGlobal",
            {}
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("setGlobalExcludedReferrers", () => {
        it("should call the API with excludedReferrers parameter", async () => {
          const mockResponse = { success: true };
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.setGlobalExcludedReferrers({
            excludedReferrers: "spam.com,unwanted.org",
          });

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.setGlobalExcludedReferrers",
            { excludedReferrers: "spam.com,unwanted.org" }
          );
          expect(result).toEqual(mockResponse);
        });
      });
    });

    describe("URL Fragments Settings", () => {
      describe("getKeepURLFragmentsGlobal", () => {
        it("should call the API without parameters", async () => {
          const mockResponse = true;
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.getKeepURLFragmentsGlobal();

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getKeepURLFragmentsGlobal",
            {}
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("setKeepURLFragmentsGlobal", () => {
        it("should call the API with keepURLFragments parameter", async () => {
          const mockResponse = { success: true };
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.setKeepURLFragmentsGlobal({
            enabled: true,
          });

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.setKeepURLFragmentsGlobal",
            { enabled: true }
          );
          expect(result).toEqual(mockResponse);
        });
      });
    });

    describe("Currency Settings", () => {
      describe("getDefaultCurrency", () => {
        it("should call the API without parameters", async () => {
          const mockResponse = "USD";
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.getDefaultCurrency();

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getDefaultCurrency",
            {}
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("setDefaultCurrency", () => {
        it("should call the API with defaultCurrency parameter", async () => {
          const mockResponse = { success: true };
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.setDefaultCurrency({
            defaultCurrency: "EUR",
          });

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.setDefaultCurrency",
            { defaultCurrency: "EUR" }
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("getCurrencyList", () => {
        it("should call the API without parameters", async () => {
          const mockResponse = {
            USD: "US Dollar",
            EUR: "Euro",
            GBP: "British Pound",
          };
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.getCurrencyList();

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getCurrencyList",
            {}
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("getCurrencySymbols", () => {
        it("should call the API without parameters", async () => {
          const mockResponse = { USD: "$", EUR: "€", GBP: "£" };
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.getCurrencySymbols();

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getCurrencySymbols",
            {}
          );
          expect(result).toEqual(mockResponse);
        });
      });
    });

    describe("Timezone Settings", () => {
      describe("isTimezoneSupportEnabled", () => {
        it("should call the API without parameters", async () => {
          const mockResponse = true;
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.isTimezoneSupportEnabled();

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.isTimezoneSupportEnabled",
            {}
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("getTimezonesList", () => {
        it("should call the API without parameters", async () => {
          const mockResponse = [
            { value: "UTC", label: "UTC" },
            { value: "Europe/Paris", label: "Paris" },
            { value: "America/New_York", label: "New York" },
          ];
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.getTimezonesList();

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getTimezonesList",
            {}
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("getTimezoneName", () => {
        it("should call the API with required parameters", async () => {
          const mockResponse = "Central European Time";
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.getTimezoneName({
            timezone: "Europe/Paris",
          });

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getTimezoneName",
            { timezone: "Europe/Paris" }
          );
          expect(result).toEqual(mockResponse);
        });

        it("should call the API with all parameters", async () => {
          const mockResponse = "Eastern Time";
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.getTimezoneName({
            timezone: "America/New_York",
            countryCode: "US",
            multipleTimezonesInCountry: true,
          });

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getTimezoneName",
            {
              timezone: "America/New_York",
              countryCode: "US",
              multipleTimezonesInCountry: true,
            }
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("getUniqueSiteTimezones", () => {
        it("should call the API without parameters", async () => {
          const mockResponse = ["UTC", "Europe/Paris", "America/New_York"];
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.getUniqueSiteTimezones();

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getUniqueSiteTimezones",
            {}
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("getDefaultTimezone", () => {
        it("should call the API without parameters", async () => {
          const mockResponse = "UTC";
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.getDefaultTimezone();

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getDefaultTimezone",
            {}
          );
          expect(result).toEqual(mockResponse);
        });
      });

      describe("setDefaultTimezone", () => {
        it("should call the API with defaultTimezone parameter", async () => {
          const mockResponse = { success: true };
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result = await sitesManagerModule.setDefaultTimezone({
            defaultTimezone: "Europe/Paris",
          });

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.setDefaultTimezone",
            { defaultTimezone: "Europe/Paris" }
          );
          expect(result).toEqual(mockResponse);
        });
      });
    });

    describe("Miscellaneous", () => {
      describe("getNumWebsitesToDisplayPerPage", () => {
        it("should call the API without parameters", async () => {
          const mockResponse = 25;
          mockClient.request.mockResolvedValueOnce(mockResponse);

          const result =
            await sitesManagerModule.getNumWebsitesToDisplayPerPage();

          expect(mockClient.request).toHaveBeenCalledWith(
            "SitesManager.getNumWebsitesToDisplayPerPage",
            {}
          );
          expect(result).toEqual(mockResponse);
        });
      });
    });
  });
});
