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
        avg_time_network: 0.25,
        avg_time_server: 0.1,
        avg_time_transfer: 0.05,
        avg_time_dom_processing: 0.4,
        avg_time_dom_completion: 0.2,
        avg_time_on_load: 0.1,
        avg_page_load_time: 1.1,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await pagePerformanceModule.get(1, 'day', '2023-01-01');

      expect(mockClient.request).toHaveBeenCalledWith('PagePerformance.get', {
        idSite: 1,
        period: 'day',
        date: '2023-01-01',
        segment: '',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with segment parameter', async () => {
      const mockResponse = {
        avg_time_network: 0.3,
        avg_time_server: 0.15,
        avg_time_transfer: 0.07,
        avg_time_dom_processing: 0.5,
        avg_time_dom_completion: 0.25,
        avg_time_on_load: 0.12,
        avg_page_load_time: 1.39,
      };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await pagePerformanceModule.get(
        1,
        'month',
        '2023-01-01',
        'deviceType==mobile'
      );

      expect(mockClient.request).toHaveBeenCalledWith('PagePerformance.get', {
        idSite: 1,
        period: 'month',
        date: '2023-01-01',
        segment: 'deviceType==mobile',
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
