import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AnnotationsModule } from '../../src/modules/annotations.js';
import { CoreReportingClient } from '../../src/modules/core.js';

// Mock CoreReportingClient
vi.mock('../../src/modules/core.js', () => {
  return {
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe('AnnotationsModule', () => {
  let annotationsModule: AnnotationsModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and Annotations module instance
    const clientInstance = new CoreReportingClient({
      url: 'https://example.org/matomo',
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    annotationsModule = new AnnotationsModule(clientInstance);
  });

  describe('add', () => {
    it('should call the API with the provided parameters', async () => {
      const mockResponse = {
        idNote: 123,
        idSite: 1,
        date: '2023-05-15',
        note: 'Website redesign launched',
        starred: false,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.add(
        1,
        '2023-05-15',
        'Website redesign launched'
      );

      expect(mockClient.request).toHaveBeenCalledWith('Annotations.add', {
        idSite: 1,
        date: '2023-05-15',
        note: 'Website redesign launched',
        starred: false,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should include starred flag when provided', async () => {
      const mockResponse = {
        idNote: 123,
        idSite: 1,
        date: '2023-05-15',
        note: 'Important update',
        starred: true,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.add(
        1,
        '2023-05-15',
        'Important update',
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith('Annotations.add', {
        idSite: 1,
        date: '2023-05-15',
        note: 'Important update',
        starred: true,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('save', () => {
    it('should call the API with only required parameters', async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.save(1, 123);

      expect(mockClient.request).toHaveBeenCalledWith('Annotations.save', {
        idSite: 1,
        idNote: 123,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with all provided parameters', async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.save(
        1,
        123,
        '2023-06-01',
        'Updated note text',
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith('Annotations.save', {
        idSite: 1,
        idNote: 123,
        date: '2023-06-01',
        note: 'Updated note text',
        starred: true,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('should call the API with the provided site and note IDs', async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.delete(1, 123);

      expect(mockClient.request).toHaveBeenCalledWith('Annotations.delete', {
        idSite: 1,
        idNote: 123,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteAll', () => {
    it('should call the API with the provided site ID', async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.deleteAll(1);

      expect(mockClient.request).toHaveBeenCalledWith('Annotations.deleteAll', {
        idSite: 1,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('get', () => {
    it('should call the API with the provided site and note IDs', async () => {
      const mockResponse = {
        idNote: 123,
        idSite: 1,
        date: '2023-05-15',
        note: 'Website redesign launched',
        starred: false,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.get(1, 123);

      expect(mockClient.request).toHaveBeenCalledWith('Annotations.get', {
        idSite: 1,
        idNote: 123,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAll', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = [
        {
          idNote: 123,
          idSite: 1,
          date: '2023-05-15',
          note: 'First annotation',
          starred: false,
        },
        {
          idNote: 124,
          idSite: 1,
          date: '2023-05-20',
          note: 'Second annotation',
          starred: true,
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.getAll('1');

      expect(mockClient.request).toHaveBeenCalledWith('Annotations.getAll', {
        idSite: '1',
        period: 'day',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with all provided parameters', async () => {
      const mockResponse = [
        {
          idNote: 123,
          idSite: 1,
          date: '2023-05-15',
          note: 'Test annotation',
          starred: true,
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.getAll(
        '1',
        '2023-05-01',
        'month',
        3
      );

      expect(mockClient.request).toHaveBeenCalledWith('Annotations.getAll', {
        idSite: '1',
        date: '2023-05-01',
        period: 'month',
        lastN: 3,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAnnotationCountForDates', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = {
        '2023-05-15': 2,
        '2023-05-16': 1,
        '2023-05-17': 0,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.getAnnotationCountForDates(
        '1',
        '2023-05-15,2023-05-17',
        'day'
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'Annotations.getAnnotationCountForDates',
        {
          idSite: '1',
          date: '2023-05-15,2023-05-17',
          period: 'day',
          getAnnotationText: false,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with all provided parameters including annotation text', async () => {
      const mockResponse = {
        '2023-05-15': {
          count: 2,
          notes: ['First note', 'Second note'],
        },
        '2023-05-16': {
          count: 1,
          notes: ['Third note'],
        },
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await annotationsModule.getAnnotationCountForDates(
        '1',
        '2023-05-15,2023-05-16',
        'day',
        2,
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'Annotations.getAnnotationCountForDates',
        {
          idSite: '1',
          date: '2023-05-15,2023-05-16',
          period: 'day',
          lastN: 2,
          getAnnotationText: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
