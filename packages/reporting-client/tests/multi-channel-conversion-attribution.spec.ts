import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MultiChannelConversionAttributionModule } from '../src/modules/multi-channel-conversion-attribution.js';
import { CoreReportingClient } from '../src/modules/core.js';

// Mock CoreReportingClient
vi.mock('../src/modules/core.js', () => {
  return {
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe('MultiChannelConversionAttributionModule', () => {
  let multiChannelModule: MultiChannelConversionAttributionModule;
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
    multiChannelModule = new MultiChannelConversionAttributionModule(
      clientInstance
    );
  });

  describe('setGoalAttribution', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = true;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await multiChannelModule.setGoalAttribution(1, 2, true);

      expect(mockClient.request).toHaveBeenCalledWith(
        'MultiChannelConversionAttribution.setGoalAttribution',
        {
          idSite: 1,
          idGoal: 2,
          isEnabled: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getGoalAttribution', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = true;
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await multiChannelModule.getGoalAttribution(1, 2);

      expect(mockClient.request).toHaveBeenCalledWith(
        'MultiChannelConversionAttribution.getGoalAttribution',
        {
          idSite: 1,
          idGoal: 2,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getChannelAttribution', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = { data: [] };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await multiChannelModule.getChannelAttribution(
        1,
        'day',
        '2023-01-01',
        2
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'MultiChannelConversionAttribution.getChannelAttribution',
        {
          idSite: 1,
          period: 'day',
          date: '2023-01-01',
          idGoal: 2,
          idCampaignDimensionCombination: '0',
          segment: '',
          expanded: '',
          flat: '',
          idSubtable: '',
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with all parameters', async () => {
      const mockResponse = { data: [] };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await multiChannelModule.getChannelAttribution(
        1,
        'month',
        '2023-01-01',
        2,
        '1',
        'referrer==google',
        'true',
        'true',
        '3'
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'MultiChannelConversionAttribution.getChannelAttribution',
        {
          idSite: 1,
          period: 'month',
          date: '2023-01-01',
          idGoal: 2,
          idCampaignDimensionCombination: '1',
          segment: 'referrer==google',
          expanded: 'true',
          flat: 'true',
          idSubtable: '3',
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAvailableCampaignDimensionCombinations', () => {
    it('should call the API without parameters', async () => {
      const mockResponse = [
        { id: '1', name: 'Campaign' },
        { id: '2', name: 'Source / Medium' },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await multiChannelModule.getAvailableCampaignDimensionCombinations();

      expect(mockClient.request).toHaveBeenCalledWith(
        'MultiChannelConversionAttribution.getAvailableCampaignDimensionCombinations'
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSiteAttributionGoals', () => {
    it('should call the API with idSite parameter', async () => {
      const mockResponse = [
        { idgoal: '1', name: 'Purchase' },
        { idgoal: '2', name: 'Download' },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await multiChannelModule.getSiteAttributionGoals(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        'MultiChannelConversionAttribution.getSiteAttributionGoals',
        {
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
