/**
 * Core Matomo Reporting Client
 * Base client implementation for the Matomo Reporting API
 */

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { BatchRequest } from "../batch-request.js";

export interface ReportingClientOptions {
  /**
   * The URL of your Matomo instance (e.g., 'https://example.org/matomo')
   */
  url: string;
  /**
   * The authentication token for the Matomo API
   * This can be found in your Matomo instance under Administration > API > User authentication
   */
  tokenAuth?: string;
  /**
   * Default site ID to use for requests
   */
  idSite?: number | string;
  /**
   * Default format for API responses
   */
  format?: "json" | "xml" | "csv" | "tsv" | "html" | "rss" | "original";
  /**
   * Default language for translations
   */
  language?: string;
  /**
   * Default timeout for requests in milliseconds
   */
  timeout?: number;
  /**
   * Custom axios instance (useful for testing or custom configurations)
   */
  axiosInstance?: AxiosInstance;
  /**
   * Security mode - when true (default), uses POST instead of GET for API requests
   * This helps prevent sensitive parameters from appearing in URLs or server logs
   */
  securityMode?: boolean;
}

export interface RequestParams {
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | number[]
    | null
    | undefined
    | Record<string, any>;
}

export class CoreReportingClient {
  protected baseUrl: string;
  protected tokenAuth?: string;
  protected defaultIdSite?: number | string;
  protected format: string;
  protected language?: string;
  protected timeout: number;
  protected axios: AxiosInstance;
  protected securityMode: boolean;

  /**
   * Create a new Matomo Reporting API client
   *
   * @param options Client configuration options
   */
  constructor(options: ReportingClientOptions) {
    // Ensure the URL doesn't end with a slash
    this.baseUrl = options.url.endsWith("/")
      ? options.url.slice(0, -1)
      : options.url;
    this.tokenAuth = options.tokenAuth;
    this.defaultIdSite = options.idSite;
    this.format = options.format || "json";
    this.language = options.language;
    this.timeout = options.timeout || 30000; // Default timeout: 30 seconds
    // Security mode is enabled by default
    this.securityMode = options.securityMode !== false;

    // Use provided axios instance or create a new one
    this.axios =
      options.axiosInstance ||
      axios.create({
        timeout: this.timeout,
      });
  }

  /**
   * Make a request to the Matomo API
   *
   * @param method The API method to call (e.g., 'API.getMatomoVersion')
   * @param params Additional parameters to pass to the API
   * @returns Promise with the API response
   */
  async request<T>(method: string, params: RequestParams = {}): Promise<T> {
    // Prepare request parameters
    const requestParams = new URLSearchParams();

    // Set required parameters
    requestParams.set("module", "API");
    requestParams.set("method", method);
    requestParams.set("format", this.format);

    // Add token auth if available
    if (this.tokenAuth) {
      requestParams.set("token_auth", this.tokenAuth);
    }

    // Add default idSite if specified and not already in params
    if (this.defaultIdSite !== undefined && params.idSite === undefined) {
      requestParams.set("idSite", String(this.defaultIdSite));
    }

    // Add language if specified
    if (this.language && !params.language) {
      requestParams.set("language", this.language);
    }

    // Add all other parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          requestParams.set(key, value.join(","));
        } else {
          requestParams.set(key, String(value));
        }
      }
    });

    try {
      const requestUrl = `${this.baseUrl}/index.php`;
      const config: AxiosRequestConfig = {
        timeout: this.timeout,
      };

      let response;

      if (this.securityMode) {
        // Use POST in security mode (default)
        response = await this.axios.post(requestUrl, requestParams, config);
      } else {
        // Use GET when security mode is disabled
        config.params = requestParams;
        response = await this.axios.get(requestUrl, config);
      }

      // If format is 'original', return the full response
      if (this.format === "original") {
        return response as unknown as T;
      }

      // Check if the response contains an error
      const data = response.data;
      if (
        data &&
        typeof data === "object" &&
        "result" in data &&
        data.result === "error"
      ) {
        throw new Error(`Matomo API error: ${data.message}`);
      }

      return data as T;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Matomo API error: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Make a bulk request - multiple API calls in a single HTTP request
   *
   * @param methods Object with methods as keys and params as values
   */
  async bulkRequest<T>(
    methods: Record<string, RequestParams>
  ): Promise<Record<string, T>> {
    const requestParams: RequestParams = {
      module: "API",
      format: this.format,
      method: "API.getBulkRequest",
    };

    let methodIndex = 0;
    for (const [method, params] of Object.entries(methods)) {
      requestParams[`urls[${methodIndex}]`] = `method=${method}`;

      if (params) {
        for (const [key, value] of Object.entries(params)) {
          if (value !== null && value !== undefined) {
            requestParams[`urls[${methodIndex}]`] +=
              `&${key}=${encodeURIComponent(String(value))}`;
          }
        }
      }

      methodIndex++;
    }

    // Add token auth if available
    if (this.tokenAuth) {
      requestParams.token_auth = this.tokenAuth;
    }

    return this.request<Record<string, T>>("API.getBulkRequest", requestParams);
  }

  /**
   * Create a batch request builder for chaining multiple API requests
   *
   * @returns A new BatchRequest instance
   */
  prepareRequests(): BatchRequest {
    return new BatchRequest(this);
  }

  /**
   * Send multiple API requests in a single HTTP request
   *
   * @param requests Array of request objects with method and params
   * @returns Promise with an array of API responses
   * @internal Used by BatchRequest
   */
  async batchRequest(
    requests: Array<{ method: string; params: Record<string, any> }>
  ): Promise<any[]> {
    const batchParams = {
      module: "API",
      method: "API.getBulkRequest",
      format: this.format,
    };

    const requestParams: Record<string, string> = {};

    // Build URL parameters for each request in the batch
    requests.forEach((req, index) => {
      let urlParams = new URLSearchParams();
      urlParams.append("method", req.method);

      // Add params for this request
      Object.entries(req.params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            urlParams.append(key, value.join(","));
          } else {
            urlParams.append(key, String(value));
          }
        }
      });

      requestParams[`urls[${index}]`] = `?${urlParams.toString()}`;
    });

    // Add token auth if available
    if (this.tokenAuth) {
      batchParams["token_auth"] = this.tokenAuth;
    }

    // Make the batch request
    const response = await this.request<any[]>("API.getBulkRequest", {
      ...batchParams,
      ...requestParams,
    });

    return response;
  }
}
