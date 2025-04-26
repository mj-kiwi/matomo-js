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

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for search engine keyword methods
 */
export interface SearchKeywordsParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for (day, week, month, year, range) */
  period: string;
  /** Date string */
  date: string;
}

/**
 * Parameters for crawling error examples
 */
export interface CrawlingErrorParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
}

export class SearchEngineKeywordsPerformanceModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get all search engine keywords
   *
   * @param params Parameters for getting search keywords
   * @returns Promise with the search engine keywords data
   */
  async getKeywords(params: SearchKeywordsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "SearchEngineKeywordsPerformance.getKeywords",
        params
      );
    }
    return await this.client.request(
      "SearchEngineKeywordsPerformance.getKeywords",
      params
    );
  }

  /**
   * Get imported search engine keywords
   *
   * @param params Parameters for getting imported search keywords
   * @returns Promise with the imported search engine keywords data
   */
  async getKeywordsImported(params: SearchKeywordsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "SearchEngineKeywordsPerformance.getKeywordsImported",
        params
      );
    }
    return await this.client.request(
      "SearchEngineKeywordsPerformance.getKeywordsImported",
      params
    );
  }

  /**
   * Get Google search engine keywords
   *
   * @param params Parameters for getting Google search keywords
   * @returns Promise with the Google search engine keywords data
   */
  async getKeywordsGoogle(params: SearchKeywordsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "SearchEngineKeywordsPerformance.getKeywordsGoogle",
        params
      );
    }
    return await this.client.request(
      "SearchEngineKeywordsPerformance.getKeywordsGoogle",
      params
    );
  }

  /**
   * Get Bing search engine keywords
   *
   * @param params Parameters for getting Bing search keywords
   * @returns Promise with the Bing search engine keywords data
   */
  async getKeywordsBing(params: SearchKeywordsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "SearchEngineKeywordsPerformance.getKeywordsBing",
        params
      );
    }
    return await this.client.request(
      "SearchEngineKeywordsPerformance.getKeywordsBing",
      params
    );
  }

  /**
   * Get Yandex search engine keywords
   *
   * @param params Parameters for getting Yandex search keywords
   * @returns Promise with the Yandex search engine keywords data
   */
  async getKeywordsYandex(params: SearchKeywordsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "SearchEngineKeywordsPerformance.getKeywordsYandex",
        params
      );
    }
    return await this.client.request(
      "SearchEngineKeywordsPerformance.getKeywordsYandex",
      params
    );
  }

  /**
   * Get Google Web search engine keywords
   *
   * @param params Parameters for getting Google Web search keywords
   * @returns Promise with the Google Web search engine keywords data
   */
  async getKeywordsGoogleWeb(params: SearchKeywordsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "SearchEngineKeywordsPerformance.getKeywordsGoogleWeb",
        params
      );
    }
    return await this.client.request(
      "SearchEngineKeywordsPerformance.getKeywordsGoogleWeb",
      params
    );
  }

  /**
   * Get Google Image search engine keywords
   *
   * @param params Parameters for getting Google Image search keywords
   * @returns Promise with the Google Image search engine keywords data
   */
  async getKeywordsGoogleImage(params: SearchKeywordsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "SearchEngineKeywordsPerformance.getKeywordsGoogleImage",
        params
      );
    }
    return await this.client.request(
      "SearchEngineKeywordsPerformance.getKeywordsGoogleImage",
      params
    );
  }

  /**
   * Get Google Video search engine keywords
   *
   * @param params Parameters for getting Google Video search keywords
   * @returns Promise with the Google Video search engine keywords data
   */
  async getKeywordsGoogleVideo(params: SearchKeywordsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "SearchEngineKeywordsPerformance.getKeywordsGoogleVideo",
        params
      );
    }
    return await this.client.request(
      "SearchEngineKeywordsPerformance.getKeywordsGoogleVideo",
      params
    );
  }

  /**
   * Get Google News search engine keywords
   *
   * @param params Parameters for getting Google News search keywords
   * @returns Promise with the Google News search engine keywords data
   */
  async getKeywordsGoogleNews(params: SearchKeywordsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "SearchEngineKeywordsPerformance.getKeywordsGoogleNews",
        params
      );
    }
    return await this.client.request(
      "SearchEngineKeywordsPerformance.getKeywordsGoogleNews",
      params
    );
  }

  /**
   * Get Bing crawling overview
   *
   * @param params Parameters for getting Bing crawling overview
   * @returns Promise with the Bing crawling overview data
   */
  async getCrawlingOverviewBing(params: SearchKeywordsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "SearchEngineKeywordsPerformance.getCrawlingOverviewBing",
        params
      );
    }
    return await this.client.request(
      "SearchEngineKeywordsPerformance.getCrawlingOverviewBing",
      params
    );
  }

  /**
   * Get Yandex crawling overview
   *
   * @param params Parameters for getting Yandex crawling overview
   * @returns Promise with the Yandex crawling overview data
   */
  async getCrawlingOverviewYandex(params: SearchKeywordsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "SearchEngineKeywordsPerformance.getCrawlingOverviewYandex",
        params
      );
    }
    return await this.client.request(
      "SearchEngineKeywordsPerformance.getCrawlingOverviewYandex",
      params
    );
  }

  /**
   * Get Bing crawling error examples
   *
   * @param params Parameters containing the site ID
   * @returns Promise with the Bing crawling error examples
   */
  async getCrawlingErrorExamplesBing(
    params: CrawlingErrorParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "SearchEngineKeywordsPerformance.getCrawlingErrorExamplesBing",
        params
      );
    }
    return await this.client.request(
      "SearchEngineKeywordsPerformance.getCrawlingErrorExamplesBing",
      params
    );
  }
}
