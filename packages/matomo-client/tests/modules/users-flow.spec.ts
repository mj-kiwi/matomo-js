import { describe, it, expect, vi, beforeEach } from "vitest";
import { UsersFlowModule, CoreReportingClient } from "../../src/index";

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

describe("UsersFlowModule", () => {
  let usersFlowModule: UsersFlowModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and UsersFlow module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    usersFlowModule = new UsersFlowModule(clientInstance);
  });

  describe("getUsersFlowPretty", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersFlowModule.getUsersFlowPretty({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersFlow.getUsersFlowPretty",
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

      const result = await usersFlowModule.getUsersFlowPretty({
        idSite: 1,
        period: "day",
        date: "today",
        segment: "deviceType==desktop",
        expanded: true,
        flat: true,
        idSubtable: 5,
        dataSource: "actions",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersFlow.getUsersFlowPretty",
        {
          idSite: 1,
          period: "day",
          date: "today",
          segment: "deviceType==desktop",
          expanded: true,
          flat: true,
          idSubtable: 5,
          dataSource: "actions",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getUsersFlow", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersFlowModule.getUsersFlow({
        idSite: 1,
        period: "day",
        date: "today",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersFlow.getUsersFlow",
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

      const result = await usersFlowModule.getUsersFlow({
        idSite: 1,
        period: "day",
        date: "today",
        limitActionsPerStep: 10,
        exploreStep: 2,
        exploreUrl: "https://example.org",
        segment: "deviceType==desktop",
        expanded: true,
        dataSource: "actions",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersFlow.getUsersFlow",
        {
          idSite: 1,
          period: "day",
          date: "today",
          limitActionsPerStep: 10,
          exploreStep: 2,
          exploreUrl: "https://example.org",
          segment: "deviceType==desktop",
          expanded: true,
          dataSource: "actions",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getInteractionActions", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersFlowModule.getInteractionActions({
        idSite: 1,
        period: "day",
        date: "today",
        interactionPosition: 2,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersFlow.getInteractionActions",
        {
          idSite: 1,
          period: "day",
          date: "today",
          interactionPosition: 2,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersFlowModule.getInteractionActions({
        idSite: 1,
        period: "day",
        date: "today",
        interactionPosition: 2,
        offsetActionsPerStep: 5,
        segment: "deviceType==desktop",
        idSubtable: 3,
        dataSource: "actions",
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersFlow.getInteractionActions",
        {
          idSite: 1,
          period: "day",
          date: "today",
          interactionPosition: 2,
          offsetActionsPerStep: 5,
          segment: "deviceType==desktop",
          idSubtable: 3,
          dataSource: "actions",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableDataSources", () => {
    it("should call the API", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersFlowModule.getAvailableDataSources({});

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersFlow.getAvailableDataSources",
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
