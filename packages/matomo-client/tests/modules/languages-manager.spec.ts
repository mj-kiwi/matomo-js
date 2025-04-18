import { describe, it, expect, vi, beforeEach } from "vitest";
import { LanguagesManagerModule, CoreReportingClient } from "../../src/index";

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

describe("LanguagesManagerModule", () => {
  let languagesManagerModule: LanguagesManagerModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and LanguagesManager module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    languagesManagerModule = new LanguagesManagerModule(clientInstance);
  });

  describe("isLanguageAvailable", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = true;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await languagesManagerModule.isLanguageAvailable("en");

      expect(mockClient.request).toHaveBeenCalledWith(
        "LanguagesManager.isLanguageAvailable",
        {
          languageCode: "en",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableLanguages", () => {
    it("should call the API correctly", async () => {
      const mockResponse = ["en", "fr", "de", "es", "it"];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await languagesManagerModule.getAvailableLanguages();

      expect(mockClient.request).toHaveBeenCalledWith(
        "LanguagesManager.getAvailableLanguages"
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableLanguagesInfo", () => {
    it("should call the API with default parameters", async () => {
      const mockResponse = [
        { code: "en", name: "English", english_name: "English" },
        { code: "fr", name: "Français", english_name: "French" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await languagesManagerModule.getAvailableLanguagesInfo();

      expect(mockClient.request).toHaveBeenCalledWith(
        "LanguagesManager.getAvailableLanguagesInfo",
        {
          excludeNonCorePlugins: "1",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with custom parameters", async () => {
      const mockResponse = [
        { code: "en", name: "English", english_name: "English" },
        { code: "fr", name: "Français", english_name: "French" },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await languagesManagerModule.getAvailableLanguagesInfo(false);

      expect(mockClient.request).toHaveBeenCalledWith(
        "LanguagesManager.getAvailableLanguagesInfo",
        {
          excludeNonCorePlugins: false,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableLanguageNames", () => {
    it("should call the API correctly", async () => {
      const mockResponse = {
        en: "English",
        fr: "Français",
        de: "Deutsch",
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await languagesManagerModule.getAvailableLanguageNames();

      expect(mockClient.request).toHaveBeenCalledWith(
        "LanguagesManager.getAvailableLanguageNames"
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getTranslationsForLanguage", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        General: {
          Yes: "Yes",
          No: "No",
        },
        Actions: {
          ColumnPageName: "Page Name",
        },
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await languagesManagerModule.getTranslationsForLanguage("en");

      expect(mockClient.request).toHaveBeenCalledWith(
        "LanguagesManager.getTranslationsForLanguage",
        {
          languageCode: "en",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getLanguageForUser", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = "en";
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await languagesManagerModule.getLanguageForUser("admin");

      expect(mockClient.request).toHaveBeenCalledWith(
        "LanguagesManager.getLanguageForUser",
        {
          login: "admin",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("setLanguageForUser", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await languagesManagerModule.setLanguageForUser(
        "admin",
        "fr"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "LanguagesManager.setLanguageForUser",
        {
          login: "admin",
          languageCode: "fr",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("uses12HourClockForUser", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = true;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await languagesManagerModule.uses12HourClockForUser("admin");

      expect(mockClient.request).toHaveBeenCalledWith(
        "LanguagesManager.uses12HourClockForUser",
        {
          login: "admin",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("set12HourClockForUser", () => {
    it("should call the API with boolean parameter", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await languagesManagerModule.set12HourClockForUser(
        "admin",
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "LanguagesManager.set12HourClockForUser",
        {
          login: "admin",
          use12HourClock: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with string parameter", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await languagesManagerModule.set12HourClockForUser(
        "admin",
        "1"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "LanguagesManager.set12HourClockForUser",
        {
          login: "admin",
          use12HourClock: "1",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
