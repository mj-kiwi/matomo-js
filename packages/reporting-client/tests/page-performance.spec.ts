import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PagePerformanceModule } from '../src/modules/page-performance.js';
import { CoreReportingClient } from '../src/modules/core.js';

// Mock CoreReportingClient
vi.mock('../src/modules/core.js', () => {
  return {
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe('PagePerformanceModule', () => {
  let pagePerformanceModule: PagePerformanceModule;
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
    pagePerformanceModule = new PagePerformanceModule(clientInstance);
  });

  describe('get', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = {
        network_time: 120,
        server_time: 350,
        transfer_time: 85,
        dom_processing_time: 550,
        dom_completion_time: 200,
        on_load_time: 100,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await pagePerformanceModule.get(1, 'day', '2023-01-01');

      expect(mockClient.request).toHaveBeenCalledWith('PagePerformance.get', {
        idSite: 1,
        period: 'day',
        date: '2023-01-01',
        segment: undefined,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with segment parameter', async () => {
      const mockResponse = {
        network_time: 100,
        server_time: 300,
        transfer_time: 75,
        dom_processing_time: 500,
        dom_completion_time: 180,
        on_load_time: 90,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await pagePerformanceModule.get(
        1,
        'day',
        '2023-01-01',
        'browserName==Chrome'
      );

      expect(mockClient.request).toHaveBeenCalledWith('PagePerformance.get', {
        idSite: 1,
        period: 'day',
        date: '2023-01-01',
        segment: 'browserName==Chrome',
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
