import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  CoreReportingClient,
  ReportingClientOptions,
} from "@mj-kiwi/matomo-client";
import axios, { AxiosInstance, AxiosResponse } from "axios";

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  //   create: vi.fn(),
  //  post: vi.fn(),
  // and any other request type you want to mock
}));

// Mock axios
vi.mock("axios", async (importActual) => {
  const actual = await importActual<typeof import("axios")>();

  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
      })),
    },
  };

  return mockAxios;
});

describe("CoreReportingClient", () => {
  let client: CoreReportingClient;
  let mockAxiosInstance: AxiosInstance;
  let defaultOptions: ReportingClientOptions;

  beforeEach(() => {
    vi.resetAllMocks();
    // Create a mock axios instance
    mockAxiosInstance = axios.create();

    // Setup default options
    defaultOptions = {
      url: "https://example.org/matomo",
      tokenAuth: "test_token",
      idSite: 1,
      format: "json",
      language: "en",
      timeout: 5000,
      axiosInstance: mockAxiosInstance,
    };

    client = new CoreReportingClient(defaultOptions);
  });

  describe("constructor", () => {
    it("should create a client with default options", () => {
      const minimalClient = new CoreReportingClient({
        url: "https://example.org/matomo",
      });

      expect(minimalClient["baseUrl"]).toBe("https://example.org/matomo");
      expect(minimalClient["format"]).toBe("json");
      expect(minimalClient["timeout"]).toBe(30000);
      expect(minimalClient["tokenAuth"]).toBeUndefined();
      expect(minimalClient["defaultIdSite"]).toBeUndefined();
      expect(minimalClient["language"]).toBeUndefined();
    });

    it("should remove trailing slash from URL", () => {
      const clientWithTrailingSlash = new CoreReportingClient({
        url: "https://example.org/matomo/",
      });

      expect(clientWithTrailingSlash["baseUrl"]).toBe(
        "https://example.org/matomo"
      );
    });

    it("should use the provided axios instance", () => {
      const customAxiosInstance = axios.create();
      const clientWithCustomAxios = new CoreReportingClient({
        url: "https://example.org/matomo",
        axiosInstance: customAxiosInstance,
      });

      expect(clientWithCustomAxios["axios"]).toBe(customAxiosInstance);
    });

    it("should create a new axios instance if none provided", () => {
      (axios.create as any).mockClear();
      new CoreReportingClient({
        url: "https://example.org/matomo",
      });

      expect(axios.create).toHaveBeenCalledWith({
        timeout: 30000,
      });
    });
  });

  describe("request method", () => {
    it("should make a request with the correct parameters", async () => {
      // Mock successful response
      const mockResponse: AxiosResponse = {
        data: { result: "success", data: "test_data" },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      };

      (mockAxiosInstance.get as any).mockResolvedValueOnce(mockResponse);

      // Make the request
      const result = await client.request("API.getMatomoVersion", {
        period: "day",
        date: "yesterday",
      });

      // Check that axios.get was called with the right parameters
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        "https://example.org/matomo/index.php",
        expect.objectContaining({
          params: expect.any(URLSearchParams),
          timeout: 5000,
        })
      );

      // Verify the URLSearchParams
      const callArgs = (mockAxiosInstance.get as any).mock.calls[0];
      const params = callArgs[1].params;

      expect(params.get("module")).toBe("API");
      expect(params.get("method")).toBe("API.getMatomoVersion");
      expect(params.get("format")).toBe("json");
      expect(params.get("token_auth")).toBe("test_token");
      expect(params.get("idSite")).toBe("1");
      expect(params.get("language")).toBe("en");
      expect(params.get("period")).toBe("day");
      expect(params.get("date")).toBe("yesterday");

      // Check the result
      expect(result).toEqual({ result: "success", data: "test_data" });
    });

    it("should handle array parameters correctly", async () => {
      const mockResponse: AxiosResponse = {
        data: { result: "success" },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      };

      (mockAxiosInstance.get as any).mockResolvedValueOnce(mockResponse);

      await client.request("API.get", { sites: [1, 2, 3] });

      const callArgs = (mockAxiosInstance.get as any).mock.calls[0];
      const params = callArgs[1].params;

      expect(params.get("sites")).toBe("1,2,3");
    });

    it("should use default idSite when not provided in params", async () => {
      const mockResponse: AxiosResponse = {
        data: { result: "success" },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      };

      (mockAxiosInstance.get as any).mockResolvedValueOnce(mockResponse);

      await client.request("API.get", {});

      const callArgs = (mockAxiosInstance.get as any).mock.calls[0];
      const params = callArgs[1].params;

      expect(params.get("idSite")).toBe("1");
    });

    it("should override default idSite when provided in params", async () => {
      const mockResponse: AxiosResponse = {
        data: { result: "success" },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      };

      (mockAxiosInstance.get as any).mockResolvedValueOnce(mockResponse);

      await client.request("API.get", { idSite: 2 });

      const callArgs = (mockAxiosInstance.get as any).mock.calls[0];
      const params = callArgs[1].params;

      expect(params.get("idSite")).toBe("2");
    });

    it("should return the full response when format is original", async () => {
      // Create a client with format: 'original'
      client = new CoreReportingClient({
        ...defaultOptions,
        format: "original",
      });

      const mockResponse: AxiosResponse = {
        data: { result: "success" },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      };

      (mockAxiosInstance.get as any).mockResolvedValueOnce(mockResponse);

      const result = await client.request("API.get");

      expect(result).toEqual(mockResponse);
    });

    it("should throw an error when the API returns an error", async () => {
      const mockResponse: AxiosResponse = {
        data: { result: "error", message: "API error message" },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      };

      (mockAxiosInstance.get as any).mockResolvedValueOnce(mockResponse);

      await expect(client.request("API.get")).rejects.toThrow(
        "Matomo API error: API error message"
      );
    });

    it("should handle axios errors", async () => {
      const axiosError = new Error("Network Error");
      (axiosError as any).isAxiosError = true;
      (mockAxiosInstance.get as any).mockRejectedValueOnce(axiosError);

      await expect(client.request("API.get")).rejects.toThrow(
        "Matomo API error: Network Error"
      );
    });

    it("should rethrow non-axios errors", async () => {
      const genericError = new Error("Generic Error");

      (mockAxiosInstance.get as any).mockRejectedValueOnce(genericError);

      await expect(client.request("API.get")).rejects.toThrow("Generic Error");
    });
  });

  describe("bulkRequest method", () => {
    it("should format bulk requests correctly", async () => {
      const mockResponse: AxiosResponse = {
        data: { result1: "data1", result2: "data2" },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      };

      (mockAxiosInstance.get as any).mockResolvedValueOnce(mockResponse);

      const methods = {
        "API.getMatomoVersion": {},
        "API.getSiteData": { idSite: 2, period: "day" },
      };

      const result = await client.bulkRequest(methods);

      // Check that request was called with the right parameters
      const callArgs = (mockAxiosInstance.get as any).mock.calls[0];
      const params = callArgs[1].params;

      expect(params.get("module")).toBe("API");
      expect(params.get("format")).toBe("json");
      expect(params.get("method")).toBe("API.getBulkRequest");
      expect(params.get("token_auth")).toBe("test_token");

      // Check the encoded URLs for bulk requests
      expect(params.get("urls[0]")).toBe("method=API.getMatomoVersion");
      expect(params.get("urls[1]")).toBe(
        "method=API.getSiteData&idSite=2&period=day"
      );

      // Check the result
      expect(result).toEqual({ result1: "data1", result2: "data2" });
    });
  });
});
