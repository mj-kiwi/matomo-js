import { describe, it, expect, vi, beforeEach } from "vitest";
import { AnnotationsModule, CoreReportingClient } from "../../src/index";

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

describe("AnnotationsModule", () => {
  let annotationsModule: AnnotationsModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and Annotations module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    annotationsModule = new AnnotationsModule(clientInstance);
  });

  describe("add", () => {
    it("should call the API with the provided parameters", async () => {
      const mockResponse = {
        idNote: 123,
        idSite: 1,
        date: "2023-05-15",
        note: "Website redesign launched",
        starred: false,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.add({
        idSite: 1,
        date: "2023-05-15",
        note: "Website redesign launched",
        starred: false,
      });

      expect(mockClient.request).toHaveBeenCalledWith("Annotations.add", {
        idSite: 1,
        date: "2023-05-15",
        note: "Website redesign launched",
        starred: false,
      });
      expect(result).toEqual(mockResponse);
    });

    it("should include starred flag when provided", async () => {
      const mockResponse = {
        idNote: 123,
        idSite: 1,
        date: "2023-05-15",
        note: "Important update",
        starred: true,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.add({
        idSite: 1,
        date: "2023-05-15",
        note: "Important update",
        starred: true,
      });

      expect(mockClient.request).toHaveBeenCalledWith("Annotations.add", {
        idSite: 1,
        date: "2023-05-15",
        note: "Important update",
        starred: true,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("save", () => {
    it("should call the API with only required parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.save({
        idSite: 1,
        idNote: 123,
      });

      expect(mockClient.request).toHaveBeenCalledWith("Annotations.save", {
        idSite: 1,
        idNote: 123,
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all provided parameters", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.save({
        idSite: 1,
        idNote: 123,
        date: "2023-06-01",
        note: "Updated note text",
        starred: true,
      });

      expect(mockClient.request).toHaveBeenCalledWith("Annotations.save", {
        idSite: 1,
        idNote: 123,
        date: "2023-06-01",
        note: "Updated note text",
        starred: true,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("delete", () => {
    it("should call the API with the provided site and note IDs", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.delete({
        idSite: 1,
        idNote: 123,
      });

      expect(mockClient.request).toHaveBeenCalledWith("Annotations.delete", {
        idSite: 1,
        idNote: 123,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteAll", () => {
    it("should call the API with the provided site ID", async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.deleteAll({
        idSite: 1,
      });

      expect(mockClient.request).toHaveBeenCalledWith("Annotations.deleteAll", {
        idSite: 1,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("get", () => {
    it("should call the API with the provided site and note IDs", async () => {
      const mockResponse = {
        idNote: 123,
        idSite: 1,
        date: "2023-05-15",
        note: "Website redesign launched",
        starred: false,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.get({
        idSite: 1,
        idNote: 123,
      });

      expect(mockClient.request).toHaveBeenCalledWith("Annotations.get", {
        idSite: 1,
        idNote: 123,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAll", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = [
        {
          idNote: 123,
          idSite: 1,
          date: "2023-05-15",
          note: "First annotation",
          starred: false,
        },
        {
          idNote: 124,
          idSite: 1,
          date: "2023-05-20",
          note: "Second annotation",
          starred: true,
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.getAll({
        idSite: "1",
        period: "day",
      });

      expect(mockClient.request).toHaveBeenCalledWith("Annotations.getAll", {
        idSite: "1",
        period: "day",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all provided parameters", async () => {
      const mockResponse = [
        {
          idNote: 123,
          idSite: 1,
          date: "2023-05-15",
          note: "Test annotation",
          starred: true,
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.getAll({
        idSite: "1",
        date: "2023-05-01",
        period: "month",
        lastN: 3,
      });

      expect(mockClient.request).toHaveBeenCalledWith("Annotations.getAll", {
        idSite: "1",
        date: "2023-05-01",
        period: "month",
        lastN: 3,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAnnotationCountForDates", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = {
        "2023-05-15": 2,
        "2023-05-16": 1,
        "2023-05-17": 0,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.getAnnotationCountForDates({
        idSite: "1",
        date: "2023-05-15,2023-05-17",
        period: "day",
        getAnnotationText: false,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Annotations.getAnnotationCountForDates",
        {
          idSite: "1",
          date: "2023-05-15,2023-05-17",
          period: "day",
          getAnnotationText: false,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all provided parameters including annotation text", async () => {
      const mockResponse = {
        "2023-05-15": {
          count: 2,
          notes: ["First note", "Second note"],
        },
        "2023-05-16": {
          count: 1,
          notes: ["Third note"],
        },
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.getAnnotationCountForDates({
        idSite: "1",
        date: "2023-05-15,2023-05-16",
        period: "day",
        lastN: 2,
        getAnnotationText: true,
      });

      expect(mockClient.request).toHaveBeenCalledWith(
        "Annotations.getAnnotationCountForDates",
        {
          idSite: "1",
          date: "2023-05-15,2023-05-16",
          period: "day",
          lastN: 2,
          getAnnotationText: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
