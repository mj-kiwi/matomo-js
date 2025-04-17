import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CoreAdminHomeModule } from '../src/modules/core-admin-home.js';
import { CoreReportingClient } from '../src/modules/core.js';

// Mock CoreReportingClient
vi.mock('../src/modules/core.js', () => {
  return {
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe('CoreAdminHomeModule', () => {
  let coreAdminHomeModule: CoreAdminHomeModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and CoreAdminHome module instance
    const clientInstance = new CoreReportingClient({
      url: 'https://example.org/matomo',
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    coreAdminHomeModule = new CoreAdminHomeModule(clientInstance);
  });

  describe('deleteAllTrackingFailures', () => {
    it('should call the API with no parameters', async () => {
      const mockResponse = {
        success: true,
        message: 'All tracking failures deleted',
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await coreAdminHomeModule.deleteAllTrackingFailures();

      expect(mockClient.request).toHaveBeenCalledWith(
        'CoreAdminHome.deleteAllTrackingFailures'
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteTrackingFailure', () => {
    it('should call the API with site ID and failure ID', async () => {
      const mockResponse = {
        success: true,
        message: 'Tracking failure deleted',
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await coreAdminHomeModule.deleteTrackingFailure(1, 123);

      expect(mockClient.request).toHaveBeenCalledWith(
        'CoreAdminHome.deleteTrackingFailure',
        {
          idSite: 1,
          idFailure: 123,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTrackingFailures', () => {
    it('should call the API with no parameters', async () => {
      const mockResponse = [
        {
          idsite: 1,
          idfailure: 123,
          date: '2023-05-15 10:30:45',
          request_url: 'https://example.org/matomo/matomo.php',
          error_message: 'Invalid site ID',
        },
        {
          idsite: 2,
          idfailure: 124,
          date: '2023-05-16 14:22:10',
          request_url: 'https://example.org/matomo/matomo.php',
          error_message: 'Missing required parameters',
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await coreAdminHomeModule.getTrackingFailures();

      expect(mockClient.request).toHaveBeenCalledWith(
        'CoreAdminHome.getTrackingFailures'
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
