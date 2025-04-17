import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SegmentEditorModule } from '../src/modules/segment-editor.js';
import { CoreReportingClient } from '../src/modules/core.js';

// Mock CoreReportingClient
vi.mock('../src/modules/core.js', () => {
  return {
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe('SegmentEditorModule', () => {
  let segmentEditorModule: SegmentEditorModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and module instance
    const clientInstance = new CoreReportingClient({
      url: 'https://example.org/matomo',
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    segmentEditorModule = new SegmentEditorModule(clientInstance);
  });

  describe('isUserCanAddNewSegment', () => {
    it('should call the API with no parameters', async () => {
      const mockResponse = true;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await segmentEditorModule.isUserCanAddNewSegment();

      expect(mockClient.request).toHaveBeenCalledWith(
        'SegmentEditor.isUserCanAddNewSegment',
        {}
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with idSite parameter', async () => {
      const mockResponse = true;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await segmentEditorModule.isUserCanAddNewSegment(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        'SegmentEditor.isUserCanAddNewSegment',
        { idSite: 1 }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('should call the API with segment ID', async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await segmentEditorModule.delete(5);

      expect(mockClient.request).toHaveBeenCalledWith('SegmentEditor.delete', {
        idSegment: 5,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await segmentEditorModule.update(
        1,
        'Updated Mobile Visitors',
        'deviceType==mobile'
      );

      expect(mockClient.request).toHaveBeenCalledWith('SegmentEditor.update', {
        idSegment: 1,
        name: 'Updated Mobile Visitors',
        definition: 'deviceType==mobile',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with all parameters', async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await segmentEditorModule.update(
        2,
        'Desktop Visitors',
        'deviceType==desktop',
        1,
        true,
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith('SegmentEditor.update', {
        idSegment: 2,
        name: 'Desktop Visitors',
        definition: 'deviceType==desktop',
        idSite: 1,
        autoArchive: true,
        enabledAllUsers: true,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('add', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = { success: true, idSegment: 3 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await segmentEditorModule.add(
        'New Visitors',
        'visitorType==new'
      );

      expect(mockClient.request).toHaveBeenCalledWith('SegmentEditor.add', {
        name: 'New Visitors',
        definition: 'visitorType==new',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with all parameters', async () => {
      const mockResponse = { success: true, idSegment: 4 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await segmentEditorModule.add(
        'Returning Visitors from US',
        'visitorType==returning;countryCode==US',
        2,
        true,
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith('SegmentEditor.add', {
        name: 'Returning Visitors from US',
        definition: 'visitorType==returning;countryCode==US',
        idSite: 2,
        autoArchive: true,
        enabledAllUsers: true,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('get', () => {
    it('should call the API with segment ID', async () => {
      const mockResponse = {
        idsegment: 1,
        name: 'Mobile Visitors',
        definition: 'deviceType==mobile',
        login: 'admin',
        enable_all_users: false,
        auto_archive: true,
        ts_created: '2023-01-01 12:34:56',
        ts_last_edit: '2023-02-15 09:45:27',
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await segmentEditorModule.get(1);

      expect(mockClient.request).toHaveBeenCalledWith('SegmentEditor.get', {
        idSegment: 1,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAll', () => {
    it('should call the API with no parameters', async () => {
      const mockResponse = [
        {
          idsegment: 1,
          name: 'Mobile Visitors',
          definition: 'deviceType==mobile',
          login: 'admin',
        },
        {
          idsegment: 2,
          name: 'Desktop Visitors',
          definition: 'deviceType==desktop',
          login: 'admin',
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await segmentEditorModule.getAll();

      expect(mockClient.request).toHaveBeenCalledWith(
        'SegmentEditor.getAll',
        {}
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with idSite parameter', async () => {
      const mockResponse = [
        {
          idsegment: 1,
          name: 'Mobile Visitors',
          definition: 'deviceType==mobile',
          login: 'admin',
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await segmentEditorModule.getAll(1);

      expect(mockClient.request).toHaveBeenCalledWith('SegmentEditor.getAll', {
        idSite: 1,
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
