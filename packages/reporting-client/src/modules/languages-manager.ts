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

import { CoreReportingClient, RequestParams } from './core.js';

export class LanguagesManagerModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Check if a language is available in this Matomo installation
   *
   * @param languageCode The language code to check (e.g., 'en', 'fr', 'de')
   * @returns Promise with boolean result indicating if the language is available
   */
  async isLanguageAvailable(languageCode: string): Promise<any> {
    return this.client.request('LanguagesManager.isLanguageAvailable', {
      languageCode,
    });
  }

  /**
   * Get available languages
   *
   * @returns Promise with an array of available language codes
   */
  async getAvailableLanguages(): Promise<any> {
    return this.client.request('LanguagesManager.getAvailableLanguages');
  }

  /**
   * Get available languages information
   *
   * @param excludeNonCorePlugins Whether to exclude non-core plugins (defaults to '1')
   * @returns Promise with an array of available languages with their information
   */
  async getAvailableLanguagesInfo(
    excludeNonCorePlugins: string | boolean = '1'
  ): Promise<any> {
    return this.client.request('LanguagesManager.getAvailableLanguagesInfo', {
      excludeNonCorePlugins,
    });
  }

  /**
   * Get available language names
   *
   * @returns Promise with object mapping language codes to language names
   */
  async getAvailableLanguageNames(): Promise<any> {
    return this.client.request('LanguagesManager.getAvailableLanguageNames');
  }

  /**
   * Get all translations for a language
   *
   * @param languageCode The language code to get translations for (e.g., 'en', 'fr', 'de')
   * @returns Promise with all translations for the specified language
   */
  async getTranslationsForLanguage(languageCode: string): Promise<any> {
    return this.client.request('LanguagesManager.getTranslationsForLanguage', {
      languageCode,
    });
  }

  /**
   * Get the language for a user
   *
   * @param login User login
   * @returns Promise with the user's language code
   */
  async getLanguageForUser(login: string): Promise<any> {
    return this.client.request('LanguagesManager.getLanguageForUser', {
      login,
    });
  }

  /**
   * Set the language for a user
   *
   * @param login User login
   * @param languageCode The language code to set (e.g., 'en', 'fr', 'de')
   * @returns Promise with success status
   */
  async setLanguageForUser(login: string, languageCode: string): Promise<any> {
    return this.client.request('LanguagesManager.setLanguageForUser', {
      login,
      languageCode,
    });
  }

  /**
   * Check if a user uses 12-hour clock
   *
   * @param login User login
   * @returns Promise with boolean result indicating if the user uses 12-hour clock
   */
  async uses12HourClockForUser(login: string): Promise<any> {
    return this.client.request('LanguagesManager.uses12HourClockForUser', {
      login,
    });
  }

  /**
   * Set 12-hour clock preference for a user
   *
   * @param login User login
   * @param use12HourClock Whether the user should use 12-hour clock (boolean or string)
   * @returns Promise with success status
   */
  async set12HourClockForUser(
    login: string,
    use12HourClock: boolean | string
  ): Promise<any> {
    return this.client.request('LanguagesManager.set12HourClockForUser', {
      login,
      use12HourClock,
    });
  }
}
