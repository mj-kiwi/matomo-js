/**
 * Matomo SearchEngineKeywordsPerformance Module
 *
 * The SearchEngineKeywordsPerformance API lets you download all your SEO search keywords from Google,
 * Bing & Yahoo and Yandex, as well as getting a detailed overview of how search robots crawl your
 * websites and any error they may encounter.
 *
 * 1) download all your search keywords as they were searched on Google, Bing & Yahoo and Yandex.
 * This includes Google Images, Google Videos and Google News. This lets you view all keywords normally
 * hidden from view behind "keyword not defined". With this plugin you can view them all!
 *
 * 2) download all crawling overview stats and metrics from Bring and Yahoo and Google. Many metrics are
 * available such as: Crawled pages, Crawl errors, Connection timeouts, HTTP-Status Code 301 (Permanently moved),
 * HTTP-Status Code 400-499 (Request errors), All other HTTP-Status Codes, Total pages in index, Robots.txt exclusion,
 * DNS failures, HTTP-Status Code 200-299, HTTP-Status Code 301 (Temporarily moved), HTTP-Status Code 500-599
 * (Internal server errors), Malware infected sites, Total inbound links.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class SearchEngineKeywordsPerformanceModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get all search engine keywords
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @returns Promise with the search engine keywords data
   */
  async getKeywords(
    idSite: number | string,
    period: string,
    date: string
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    return this.client.request(
      'SearchEngineKeywordsPerformance.getKeywords',
      params
    );
  }

  /**
   * Get imported search engine keywords
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @returns Promise with the imported search engine keywords data
   */
  async getKeywordsImported(
    idSite: number | string,
    period: string,
    date: string
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    return this.client.request(
      'SearchEngineKeywordsPerformance.getKeywordsImported',
      params
    );
  }

  /**
   * Get Google search engine keywords
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @returns Promise with the Google search engine keywords data
   */
  async getKeywordsGoogle(
    idSite: number | string,
    period: string,
    date: string
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    return this.client.request(
      'SearchEngineKeywordsPerformance.getKeywordsGoogle',
      params
    );
  }

  /**
   * Get Bing search engine keywords
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @returns Promise with the Bing search engine keywords data
   */
  async getKeywordsBing(
    idSite: number | string,
    period: string,
    date: string
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    return this.client.request(
      'SearchEngineKeywordsPerformance.getKeywordsBing',
      params
    );
  }

  /**
   * Get Yandex search engine keywords
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @returns Promise with the Yandex search engine keywords data
   */
  async getKeywordsYandex(
    idSite: number | string,
    period: string,
    date: string
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    return this.client.request(
      'SearchEngineKeywordsPerformance.getKeywordsYandex',
      params
    );
  }

  /**
   * Get Google Web search engine keywords
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @returns Promise with the Google Web search engine keywords data
   */
  async getKeywordsGoogleWeb(
    idSite: number | string,
    period: string,
    date: string
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    return this.client.request(
      'SearchEngineKeywordsPerformance.getKeywordsGoogleWeb',
      params
    );
  }

  /**
   * Get Google Image search engine keywords
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @returns Promise with the Google Image search engine keywords data
   */
  async getKeywordsGoogleImage(
    idSite: number | string,
    period: string,
    date: string
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    return this.client.request(
      'SearchEngineKeywordsPerformance.getKeywordsGoogleImage',
      params
    );
  }

  /**
   * Get Google Video search engine keywords
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @returns Promise with the Google Video search engine keywords data
   */
  async getKeywordsGoogleVideo(
    idSite: number | string,
    period: string,
    date: string
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    return this.client.request(
      'SearchEngineKeywordsPerformance.getKeywordsGoogleVideo',
      params
    );
  }

  /**
   * Get Google News search engine keywords
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @returns Promise with the Google News search engine keywords data
   */
  async getKeywordsGoogleNews(
    idSite: number | string,
    period: string,
    date: string
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    return this.client.request(
      'SearchEngineKeywordsPerformance.getKeywordsGoogleNews',
      params
    );
  }

  /**
   * Get Bing crawling overview
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @returns Promise with the Bing crawling overview data
   */
  async getCrawlingOverviewBing(
    idSite: number | string,
    period: string,
    date: string
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    return this.client.request(
      'SearchEngineKeywordsPerformance.getCrawlingOverviewBing',
      params
    );
  }

  /**
   * Get Yandex crawling overview
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @returns Promise with the Yandex crawling overview data
   */
  async getCrawlingOverviewYandex(
    idSite: number | string,
    period: string,
    date: string
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    return this.client.request(
      'SearchEngineKeywordsPerformance.getCrawlingOverviewYandex',
      params
    );
  }

  /**
   * Get Bing crawling error examples
   *
   * @param idSite Site ID
   * @returns Promise with the Bing crawling error examples
   */
  async getCrawlingErrorExamplesBing(idSite: number | string): Promise<any> {
    const params: RequestParams = {
      idSite,
    };

    return this.client.request(
      'SearchEngineKeywordsPerformance.getCrawlingErrorExamplesBing',
      params
    );
  }
}
