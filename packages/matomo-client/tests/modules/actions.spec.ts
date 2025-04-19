import { describe, it, expect, vi, beforeEach } from "vitest";
import { ActionsModule, CoreReportingClient } from "../../src/index";

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

describe("ActionsModule", () => {
  let actionsModule: ActionsModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and Actions module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    actionsModule = new ActionsModule(clientInstance);
  });

  describe("get", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.get({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.get", {
        idSite: 1,
        period: "day",
        date: "today",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.get({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        columns: "nb_visits,nb_actions",
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.get", {
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        columns: "nb_visits,nb_actions",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getPageUrls", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getPageUrls({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.getPageUrls", {
        idSite: 1,
        period: "day",
        date: "today",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getPageUrls({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        expanded: true,
        idSubtable: 5,
        depth: 2,
        flat: true,
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.getPageUrls", {
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        expanded: true,
        idSubtable: 5,
        depth: 2,
        flat: true,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getPageUrlsFollowingSiteSearch", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getPageUrlsFollowingSiteSearch({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getPageUrlsFollowingSiteSearch",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getPageUrlsFollowingSiteSearch({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        expanded: true,
        idSubtable: 5,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getPageUrlsFollowingSiteSearch",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          expanded: true,
          idSubtable: 5,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getPageTitlesFollowingSiteSearch", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getPageTitlesFollowingSiteSearch({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getPageTitlesFollowingSiteSearch",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getPageTitlesFollowingSiteSearch({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        expanded: true,
        idSubtable: 5,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getPageTitlesFollowingSiteSearch",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          expanded: true,
          idSubtable: 5,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getEntryPageUrls", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getEntryPageUrls({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getEntryPageUrls",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getEntryPageUrls({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        expanded: true,
        idSubtable: 5,
        flat: true,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getEntryPageUrls",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          expanded: true,
          idSubtable: 5,
          flat: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getExitPageUrls", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getExitPageUrls({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getExitPageUrls",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getExitPageUrls({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        expanded: true,
        idSubtable: 5,
        flat: true,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getExitPageUrls",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          expanded: true,
          idSubtable: 5,
          flat: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getPageUrl", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getPageUrl({
        pageUrl: "https%3A%2F%2Fexample.org",
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.getPageUrl", {
        pageUrl: "https%3A%2F%2Fexample.org",
        idSite: 1,
        period: "day",
        date: "today",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getPageUrl({
        pageUrl: "https%3A%2F%2Fexample.org",
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.getPageUrl", {
        pageUrl: "https%3A%2F%2Fexample.org",
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getPageTitles", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getPageTitles({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.getPageTitles", {
        idSite: 1,
        period: "day",
        date: "today",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getPageTitles({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        expanded: true,
        idSubtable: 5,
        flat: true,
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.getPageTitles", {
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        expanded: true,
        idSubtable: 5,
        flat: true,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getEntryPageTitles", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getEntryPageTitles({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getEntryPageTitles",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getEntryPageTitles({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        expanded: true,
        idSubtable: 5,
        flat: true,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getEntryPageTitles",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          expanded: true,
          idSubtable: 5,
          flat: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getExitPageTitles", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getExitPageTitles({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getExitPageTitles",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getExitPageTitles({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        expanded: true,
        idSubtable: 5,
        flat: true,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getExitPageTitles",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          expanded: true,
          idSubtable: 5,
          flat: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getPageTitle", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getPageTitle({
        pageName: "Example%20Page%20Title",
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.getPageTitle", {
        pageName: "Example%20Page%20Title",
        idSite: 1,
        period: "day",
        date: "today",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getPageTitle({
        pageName: "Example%20Page%20Title",
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.getPageTitle", {
        pageName: "Example%20Page%20Title",
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getDownloads", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getDownloads({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.getDownloads", {
        idSite: 1,
        period: "day",
        date: "today",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getDownloads({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        expanded: true,
        idSubtable: 5,
        flat: true,
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.getDownloads", {
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        expanded: true,
        idSubtable: 5,
        flat: true,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getDownload", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getDownload({
        downloadUrl: "https%3A%2F%2Fexample.org%2Ffile.pdf",
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.getDownload", {
        downloadUrl: "https%3A%2F%2Fexample.org%2Ffile.pdf",
        idSite: 1,
        period: "day",
        date: "today",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getDownload({
        downloadUrl: "https%3A%2F%2Fexample.org%2Ffile.pdf",
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.getDownload", {
        downloadUrl: "https%3A%2F%2Fexample.org%2Ffile.pdf",
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getOutlinks", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getOutlinks({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.getOutlinks", {
        idSite: 1,
        period: "day",
        date: "today",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getOutlinks({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        expanded: true,
        idSubtable: 5,
        flat: true,
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.getOutlinks", {
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        expanded: true,
        idSubtable: 5,
        flat: true,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getOutlink", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getOutlink({
        outlinkUrl: "https%3A%2F%2Fexternal-link.com",
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.getOutlink", {
        outlinkUrl: "https%3A%2F%2Fexternal-link.com",
        idSite: 1,
        period: "day",
        date: "today",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getOutlink({
        outlinkUrl: "https%3A%2F%2Fexternal-link.com",
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith("Actions.getOutlink", {
        outlinkUrl: "https%3A%2F%2Fexternal-link.com",
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getSiteSearchKeywords", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getSiteSearchKeywords({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getSiteSearchKeywords",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getSiteSearchKeywords({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getSiteSearchKeywords",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getSiteSearchNoResultKeywords", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getSiteSearchNoResultKeywords({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getSiteSearchNoResultKeywords",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getSiteSearchNoResultKeywords({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getSiteSearchNoResultKeywords",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getSiteSearchCategories", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getSiteSearchCategories({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getSiteSearchCategories",
        {
          idSite: 1,
          period: "day",
          date: "today",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await actionsModule.getSiteSearchCategories({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Actions.getSiteSearchCategories",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
