/**
 * Matomo LanguagesManager Module
 *
 * The LanguagesManager API lets you access existing Matomo translations, and change Users languages
 * preferences. "getTranslationsForLanguage" will return all translation strings for a given language,
 * so you can leverage Matomo translations in your application (and automatically benefit from the 40+
 * translations!). This is mostly useful to developers who integrate Matomo API results in their own application.
 * You can also request the default language to load for a user via "getLanguageForUser", or update it
 * via "setLanguageForUser".
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for language availability check
 */
export interface LanguageCodeParams extends RequestParams {
  /** The language code to check (e.g., 'en', 'fr', 'de') */
  languageCode: string;
}

/**
 * Parameters for language info
 */
export interface LanguageInfoParams extends RequestParams {
  /** Whether to exclude non-core plugins */
  excludeNonCorePlugins?: string | boolean;
}

/**
 * Parameters for user login
 */
export interface UserLoginParams extends RequestParams {
  /** User login */
  login: string;
}

/**
 * Parameters for setting language for user
 */
export interface SetLanguageParams extends UserLoginParams {
  /** The language code to set (e.g., 'en', 'fr', 'de') */
  languageCode: string;
}

/**
 * Parameters for setting 12-hour clock preference
 */
export interface Set12HourClockParams extends UserLoginParams {
  /** Whether the user should use 12-hour clock */
  use12HourClock: boolean | string;
}

export class LanguagesManagerModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Check if a language is available in this Matomo installation
   *
   * @param params Parameters containing the language code
   * @returns Promise with boolean result indicating if the language is available
   */
  async isLanguageAvailable(params: LanguageCodeParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "LanguagesManager.isLanguageAvailable",
        params
      );
    }
    return await this.client.request(
      "LanguagesManager.isLanguageAvailable",
      params
    );
  }

  /**
   * Get available languages
   *
   * @returns Promise with an array of available language codes
   */
  async getAvailableLanguages(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "LanguagesManager.getAvailableLanguages",
        {}
      );
    }
    return await this.client.request("LanguagesManager.getAvailableLanguages");
  }

  /**
   * Get available languages information
   *
   * @param params Parameters for getting language information
   * @returns Promise with an array of available languages with their information
   */
  async getAvailableLanguagesInfo(
    params: LanguageInfoParams = {}
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "LanguagesManager.getAvailableLanguagesInfo",
        params
      );
    }
    return await this.client.request(
      "LanguagesManager.getAvailableLanguagesInfo",
      params
    );
  }

  /**
   * Get available language names
   *
   * @returns Promise with object mapping language codes to language names
   */
  async getAvailableLanguageNames(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "LanguagesManager.getAvailableLanguageNames",
        {}
      );
    }
    return await this.client.request(
      "LanguagesManager.getAvailableLanguageNames"
    );
  }

  /**
   * Get all translations for a language
   *
   * @param params Parameters containing the language code
   * @returns Promise with all translations for the specified language
   */
  async getTranslationsForLanguage(params: LanguageCodeParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "LanguagesManager.getTranslationsForLanguage",
        params
      );
    }
    return await this.client.request(
      "LanguagesManager.getTranslationsForLanguage",
      params
    );
  }

  /**
   * Get the language for a user
   *
   * @param params Parameters containing the user login
   * @returns Promise with the user's language code
   */
  async getLanguageForUser(params: UserLoginParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "LanguagesManager.getLanguageForUser",
        params
      );
    }
    return await this.client.request(
      "LanguagesManager.getLanguageForUser",
      params
    );
  }

  /**
   * Set the language for a user
   *
   * @param params Parameters for setting user's language
   * @returns Promise with success status
   */
  async setLanguageForUser(params: SetLanguageParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "LanguagesManager.setLanguageForUser",
        params
      );
    }
    return await this.client.request(
      "LanguagesManager.setLanguageForUser",
      params
    );
  }

  /**
   * Check if a user uses 12-hour clock
   *
   * @param params Parameters containing the user login
   * @returns Promise with boolean result indicating if the user uses 12-hour clock
   */
  async uses12HourClockForUser(params: UserLoginParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "LanguagesManager.uses12HourClockForUser",
        params
      );
    }
    return await this.client.request(
      "LanguagesManager.uses12HourClockForUser",
      params
    );
  }

  /**
   * Set 12-hour clock preference for a user
   *
   * @param params Parameters for setting user's clock preference
   * @returns Promise with success status
   */
  async set12HourClockForUser(params: Set12HourClockParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "LanguagesManager.set12HourClockForUser",
        params
      );
    }
    return await this.client.request(
      "LanguagesManager.set12HourClockForUser",
      params
    );
  }
}
