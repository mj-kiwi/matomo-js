import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FunnelsModule } from '../../src/modules/funnels.js';
import { CoreReportingClient } from '../../src/modules/core.js';

// Mock CoreReportingClient
vi.mock('../../src/modules/core.js', () => {
  return {
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe('FunnelsModule', () => {
  let funnelsModule: FunnelsModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and Funnels module instance
    const clientInstance = new CoreReportingClient({
      url: 'https://example.org/matomo',
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    funnelsModule = new FunnelsModule(clientInstance);
  });

  describe('getMetrics', () => {
    it('should call the API with required parameters', async () => {
      await funnelsModule.getMetrics(1, 'day', 'yesterday');
      expect(mockClient.request).toHaveBeenCalledWith('Funnels.getMetrics', {
        idSite: 1,
        period: 'day',
        date: 'yesterday',
      });
    });

    it('should include optional parameters when provided', async () => {
      await funnelsModule.getMetrics(
        1,
        'day',
        'yesterday',
        123,
        456,
        'deviceType==mobile'
      );
      expect(mockClient.request).toHaveBeenCalledWith('Funnels.getMetrics', {
        idSite: 1,
        period: 'day',
        date: 'yesterday',
        idFunnel: 123,
        idGoal: 456,
        segment: 'deviceType==mobile',
      });
    });
  });

  describe('getFunnelFlow', () => {
    it('should call the API with required parameters', async () => {
      await funnelsModule.getFunnelFlow(1, 'day', 'yesterday');
      expect(mockClient.request).toHaveBeenCalledWith('Funnels.getFunnelFlow', {
        idSite: 1,
        period: 'day',
        date: 'yesterday',
      });
    });

    it('should include optional parameters when provided', async () => {
      await funnelsModule.getFunnelFlow(
        1,
        'day',
        'yesterday',
        123,
        456,
        'deviceType==mobile'
      );
      expect(mockClient.request).toHaveBeenCalledWith('Funnels.getFunnelFlow', {
        idSite: 1,
        period: 'day',
        date: 'yesterday',
        idFunnel: 123,
        idGoal: 456,
        segment: 'deviceType==mobile',
      });
    });
  });

  describe('getFunnelStepSubtable', () => {
    it('should call the API with required parameters', async () => {
      await funnelsModule.getFunnelStepSubtable(1, 'day', 'yesterday', 2);
      expect(mockClient.request).toHaveBeenCalledWith(
        'Funnels.getFunnelStepSubtable',
        {
          idSite: 1,
          period: 'day',
          date: 'yesterday',
          stepPosition: 2,
        }
      );
    });

    it('should include optional parameters when provided', async () => {
      await funnelsModule.getFunnelStepSubtable(
        1,
        'day',
        'yesterday',
        2,
        123,
        456,
        'deviceType==mobile'
      );
      expect(mockClient.request).toHaveBeenCalledWith(
        'Funnels.getFunnelStepSubtable',
        {
          idSite: 1,
          period: 'day',
          date: 'yesterday',
          stepPosition: 2,
          idFunnel: 123,
          idGoal: 456,
          segment: 'deviceType==mobile',
        }
      );
    });
  });

  describe('getFunnelEntries', () => {
    it('should call the API with required parameters', async () => {
      await funnelsModule.getFunnelEntries(1, 'day', 'yesterday', 123);
      expect(mockClient.request).toHaveBeenCalledWith(
        'Funnels.getFunnelEntries',
        {
          idSite: 1,
          period: 'day',
          date: 'yesterday',
          idFunnel: 123,
        }
      );
    });

    it('should include optional parameters when provided', async () => {
      await funnelsModule.getFunnelEntries(
        1,
        'day',
        'yesterday',
        123,
        'deviceType==mobile',
        2,
        true,
        456,
        true
      );
      expect(mockClient.request).toHaveBeenCalledWith(
        'Funnels.getFunnelEntries',
        {
          idSite: 1,
          period: 'day',
          date: 'yesterday',
          idFunnel: 123,
          segment: 'deviceType==mobile',
          step: 2,
          expanded: true,
          idSubtable: 456,
          flat: true,
        }
      );
    });
  });

  describe('getGoalFunnel', () => {
    it('should call the API with required parameters', async () => {
      await funnelsModule.getGoalFunnel(1, 123);
      expect(mockClient.request).toHaveBeenCalledWith('Funnels.getGoalFunnel', {
        idSite: 1,
        idGoal: 123,
      });
    });
  });

  describe('getAllActivatedFunnelsForSite', () => {
    it('should call the API with required parameters', async () => {
      await funnelsModule.getAllActivatedFunnelsForSite(1);
      expect(mockClient.request).toHaveBeenCalledWith(
        'Funnels.getAllActivatedFunnelsForSite',
        {
          idSite: 1,
        }
      );
    });
  });

  describe('setGoalFunnel', () => {
    it('should call the API with required parameters', async () => {
      const steps = [
        { pattern: '/checkout/cart', pattern_type: 'contains' },
        { pattern: '/checkout/delivery', pattern_type: 'contains' },
        { pattern: '/checkout/payment', pattern_type: 'contains' },
      ];

      await funnelsModule.setGoalFunnel(1, 123, true, steps);
      expect(mockClient.request).toHaveBeenCalledWith('Funnels.setGoalFunnel', {
        idSite: 1,
        idGoal: 123,
        isActivated: true,
        steps: steps,
      });
    });
  });

  describe('testUrlMatchesSteps', () => {
    it('should call the API with required parameters', async () => {
      const steps = [
        { pattern: '/checkout/cart', pattern_type: 'contains' },
        { pattern: '/checkout/delivery', pattern_type: 'contains' },
      ];

      await funnelsModule.testUrlMatchesSteps(
        'https://example.org/checkout/cart',
        steps
      );
      expect(mockClient.request).toHaveBeenCalledWith(
        'Funnels.testUrlMatchesSteps',
        {
          url: 'https://example.org/checkout/cart',
          steps: steps,
        }
      );
    });
  });
});
