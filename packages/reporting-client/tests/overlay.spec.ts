import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OverlayModule } from '../src/modules/overlay.js';
import { CoreReportingClient } from '../src/modules/core.js';

// Mock CoreReportingClient
vi.mock('../src/modules/core.js', () => {
  return {
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe('OverlayModule', () => {
  let overlayModule: OverlayModule;
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
    overlayModule = new OverlayModule(clientInstance);
  });

  describe('getTranslations', () => {
    it('should call the API with idSite parameter', async () => {
      const mockResponse = {
        General_Close: 'Close',
        General_Next: 'Next',
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await overlayModule.getTranslations(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        'Overlay.getTranslations',
        {
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getFollowingPages', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = [
        { label: '/page1', nb_hits: 100 },
        { label: '/page2', nb_hits: 50 },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await overlayModule.getFollowingPages(
        'https://example.org/home',
        1,
        'day',
        '2023-01-01'
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'Overlay.getFollowingPages',
        {
          url: 'https://example.org/home',
          idSite: 1,
          period: 'day',
          date: '2023-01-01',
          segment: '',
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with segment parameter', async () => {
      const mockResponse = [
        { label: '/page1', nb_hits: 50 },
        { label: '/page2', nb_hits: 25 },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await overlayModule.getFollowingPages(
        'https://example.org/home',
        1,
        'week',
        '2023-01-01',
        'deviceType==mobile'
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'Overlay.getFollowingPages',
        {
          url: 'https://example.org/home',
          idSite: 1,
          period: 'week',
          date: '2023-01-01',
          segment: 'deviceType==mobile',
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
