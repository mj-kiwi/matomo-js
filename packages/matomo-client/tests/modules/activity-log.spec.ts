import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ActivityLogModule } from '../../src/modules/activity-log.js';
import { CoreReportingClient } from '../../src/modules/core.js';

// Mock CoreReportingClient
vi.mock('../../src/modules/core.js', () => {
  return {
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe('ActivityLogModule', () => {
  let activityLogModule: ActivityLogModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and ActivityLog module instance
    const clientInstance = new CoreReportingClient({
      url: 'https://example.org/matomo',
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    activityLogModule = new ActivityLogModule(clientInstance);
  });

  describe('getEntries', () => {
    it('should call the API with default parameters', async () => {
      const mockResponse = [
        {
          id: 1,
          user: 'admin',
          action: 'login',
          timestamp: '2023-01-01 12:00:00',
        },
        {
          id: 2,
          user: 'admin',
          action: 'view_dashboard',
          timestamp: '2023-01-01 12:05:00',
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await activityLogModule.getEntries();

      expect(mockClient.request).toHaveBeenCalledWith(
        'ActivityLog.getEntries',
        {
          offset: '0',
          limit: '25',
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with all provided parameters', async () => {
      const mockResponse = [
        {
          id: 3,
          user: 'user1',
          action: 'create_site',
          timestamp: '2023-01-02 09:15:00',
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await activityLogModule.getEntries(
        10,
        5,
        'user1',
        'create_site',
        'day',
        '2023-01-02'
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'ActivityLog.getEntries',
        {
          offset: 10,
          limit: 5,
          filterByUserLogin: 'user1',
          filterByActivityType: 'create_site',
          period: 'day',
          date: '2023-01-02',
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getEntryCount', () => {
    it('should call the API with no filters and return count', async () => {
      mockClient.request.mockResolvedValueOnce({ value: 42 });

      const result = await activityLogModule.getEntryCount();

      expect(mockClient.request).toHaveBeenCalledWith(
        'ActivityLog.getEntryCount',
        {}
      );
      expect(result).toBe(42);
    });

    it('should call the API with all provided filters', async () => {
      mockClient.request.mockResolvedValueOnce({ value: 5 });

      const result = await activityLogModule.getEntryCount(
        'user1',
        'login',
        'week',
        'last7'
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'ActivityLog.getEntryCount',
        {
          filterByUserLogin: 'user1',
          filterByActivityType: 'login',
          period: 'week',
          date: 'last7',
        }
      );
      expect(result).toBe(5);
    });
  });

  describe('getAllActivityTypes', () => {
    it('should call the API with default filter limit', async () => {
      const mockResponse = [
        'login',
        'logout',
        'create_site',
        'delete_site',
        'update_user',
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await activityLogModule.getAllActivityTypes();

      expect(mockClient.request).toHaveBeenCalledWith(
        'ActivityLog.getAllActivityTypes',
        {
          filterLimit: '-1',
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with custom filter limit', async () => {
      const mockResponse = ['login', 'logout', 'create_site'];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await activityLogModule.getAllActivityTypes(3);

      expect(mockClient.request).toHaveBeenCalledWith(
        'ActivityLog.getAllActivityTypes',
        {
          filterLimit: 3,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
