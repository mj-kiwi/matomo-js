import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserCountryModule, CoreReportingClient } from "../../src/index";

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

describe("UserCountryModule", () => {
  let userCountryModule: UserCountryModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and UserCountry module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    userCountryModule = new UserCountryModule(clientInstance);
  });

  describe("getCountry", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await userCountryModule.getCountry({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "UserCountry.getCountry",
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

      const result = await userCountryModule.getCountry({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "UserCountry.getCountry",
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

  describe("getContinent", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await userCountryModule.getContinent({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "UserCountry.getContinent",
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

      const result = await userCountryModule.getContinent({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "UserCountry.getContinent",
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

  describe("getRegion", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await userCountryModule.getRegion({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith("UserCountry.getRegion", {
        idSite: 1,
        period: "day",
        date: "today",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await userCountryModule.getRegion({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith("UserCountry.getRegion", {
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCity", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await userCountryModule.getCity({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith("UserCountry.getCity", {
        idSite: 1,
        period: "day",
        date: "today",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with segment parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await userCountryModule.getCity({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith("UserCountry.getCity", {
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getCountryCodeMapping", () => {
    it("should call the API", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await userCountryModule.getCountryCodeMapping({});

      expect(mockClient.request).toHaveBeenCalledWith(
        "UserCountry.getCountryCodeMapping",
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getLocationFromIP", () => {
    it("should call the API with no parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await userCountryModule.getLocationFromIP({});

      expect(mockClient.request).toHaveBeenCalledWith(
        "UserCountry.getLocationFromIP",
        {}
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await userCountryModule.getLocationFromIP({
        ip: "192.0.2.0",
        provider: "geoip2php",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "UserCountry.getLocationFromIP",
        {
          ip: "192.0.2.0",
          provider: "geoip2php",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("setLocationProvider", () => {
    it("should call the API with provider ID", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await userCountryModule.setLocationProvider({
        providerId: "geoip2php",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "UserCountry.setLocationProvider",
        {
          providerId: "geoip2php",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getNumberOfDistinctCountries", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await userCountryModule.getNumberOfDistinctCountries({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "UserCountry.getNumberOfDistinctCountries",
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

      const result = await userCountryModule.getNumberOfDistinctCountries({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "UserCountry.getNumberOfDistinctCountries",
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
