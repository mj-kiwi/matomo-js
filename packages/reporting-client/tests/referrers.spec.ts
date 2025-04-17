import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReferrersModule } from '../src/modules/referrers.js';
import { CoreReportingClient } from '../src/modules/core.js';

// Mock CoreReportingClient
vi.mock('../src/modules/core.js', () => {
  return {
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe('ReferrersModule', () => {
  let referrersModule: ReferrersModule;
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
    referrersModule = new ReferrersModule(clientInstance);
  });

  describe('get', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = { result: 'success' };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.get(1, 'day', '2023-01-01');

      expect(mockClient.request).toHaveBeenCalledWith('Referrers.get', {
        idSite: 1,
        period: 'day',
        date: '2023-01-01',
        segment: undefined,
        columns: '',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with all parameters', async () => {
      const mockResponse = { result: 'success' };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.get(
        1,
        'day',
        '2023-01-01',
        'userId==123',
        'nb_visits,nb_actions'
      );

      expect(mockClient.request).toHaveBeenCalledWith('Referrers.get', {
        idSite: 1,
        period: 'day',
        date: '2023-01-01',
        segment: 'userId==123',
        columns: 'nb_visits,nb_actions',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getReferrerType', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = { result: 'success' };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getReferrerType(
        1,
        'day',
        '2023-01-01'
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'Referrers.getReferrerType',
        {
          idSite: 1,
          period: 'day',
          date: '2023-01-01',
          segment: undefined,
          typeReferrer: '',
          idSubtable: undefined,
          expanded: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAll', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = { result: 'success' };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getAll(1, 'day', '2023-01-01');

      expect(mockClient.request).toHaveBeenCalledWith('Referrers.getAll', {
        idSite: 1,
        period: 'day',
        date: '2023-01-01',
        segment: undefined,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getKeywords', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = { result: 'success' };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getKeywords(1, 'day', '2023-01-01');

      expect(mockClient.request).toHaveBeenCalledWith('Referrers.getKeywords', {
        idSite: 1,
        period: 'day',
        date: '2023-01-01',
        segment: undefined,
        expanded: undefined,
        flat: undefined,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSearchEngines', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = { result: 'success' };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getSearchEngines(
        1,
        'day',
        '2023-01-01'
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'Referrers.getSearchEngines',
        {
          idSite: 1,
          period: 'day',
          date: '2023-01-01',
          segment: undefined,
          expanded: undefined,
          flat: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  // Testing just a few methods to keep the spec file concise
  describe('getCampaigns', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = { result: 'success' };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getCampaigns(1, 'day', '2023-01-01');

      expect(mockClient.request).toHaveBeenCalledWith(
        'Referrers.getCampaigns',
        {
          idSite: 1,
          period: 'day',
          date: '2023-01-01',
          segment: undefined,
          expanded: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getNumberOfDistinctSearchEngines', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = { value: 5 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await referrersModule.getNumberOfDistinctSearchEngines(
        1,
        'day',
        '2023-01-01'
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'Referrers.getNumberOfDistinctSearchEngines',
        {
          idSite: 1,
          period: 'day',
          date: '2023-01-01',
          segment: undefined,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
