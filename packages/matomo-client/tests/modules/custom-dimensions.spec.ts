import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CustomDimensionsModule } from '../../src/modules/custom-dimensions';

describe('CustomDimensionsModule', () => {
  let mockClient: any;
  let module: CustomDimensionsModule;

  beforeEach(() => {
    mockClient = {
      request: vi.fn().mockResolvedValue({}),
    };
    module = new CustomDimensionsModule(mockClient);
  });

  it('should get custom dimension', async () => {
    await module.getCustomDimension(1, 2, 'day', 'yesterday');
    expect(mockClient.request).toHaveBeenCalledWith(
      'CustomDimensions.getCustomDimension',
      {
        idDimension: 1,
        idSite: 2,
        period: 'day',
        date: 'yesterday',
      }
    );
  });

  it('should get custom dimension with optional parameters', async () => {
    await module.getCustomDimension(
      1,
      2,
      'day',
      'yesterday',
      'segment',
      1,
      1,
      3
    );
    expect(mockClient.request).toHaveBeenCalledWith(
      'CustomDimensions.getCustomDimension',
      {
        idDimension: 1,
        idSite: 2,
        period: 'day',
        date: 'yesterday',
        segment: 'segment',
        expanded: 1,
        flat: 1,
        idSubtable: 3,
      }
    );
  });

  it('should configure new custom dimension', async () => {
    await module.configureNewCustomDimension(1, 'name', 'visit', 1);
    expect(mockClient.request).toHaveBeenCalledWith(
      'CustomDimensions.configureNewCustomDimension',
      {
        idSite: 1,
        name: 'name',
        scope: 'visit',
        active: 1,
        extractions: 'Array',
        caseSensitive: '1',
      }
    );
  });

  it('should configure new custom dimension with custom extractions and case sensitivity', async () => {
    const extractions = ['url', 'path'];
    await module.configureNewCustomDimension(
      1,
      'name',
      'visit',
      1,
      extractions,
      0
    );
    expect(mockClient.request).toHaveBeenCalledWith(
      'CustomDimensions.configureNewCustomDimension',
      {
        idSite: 1,
        name: 'name',
        scope: 'visit',
        active: 1,
        extractions,
        caseSensitive: 0,
      }
    );
  });

  it('should configure existing custom dimension', async () => {
    await module.configureExistingCustomDimension(1, 2, 'Updated name', 1);
    expect(mockClient.request).toHaveBeenCalledWith(
      'CustomDimensions.configureExistingCustomDimension',
      {
        idDimension: 1,
        idSite: 2,
        name: 'Updated name',
        active: 1,
        extractions: 'Array',
      }
    );
  });

  it('should configure existing custom dimension with custom parameters', async () => {
    const extractions = ['url', 'path'];
    await module.configureExistingCustomDimension(
      1,
      2,
      'Updated name',
      0,
      extractions,
      1
    );
    expect(mockClient.request).toHaveBeenCalledWith(
      'CustomDimensions.configureExistingCustomDimension',
      {
        idDimension: 1,
        idSite: 2,
        name: 'Updated name',
        active: 0,
        extractions,
        caseSensitive: 1,
      }
    );
  });

  it('should get configured custom dimensions', async () => {
    await module.getConfiguredCustomDimensions(1);
    expect(mockClient.request).toHaveBeenCalledWith(
      'CustomDimensions.getConfiguredCustomDimensions',
      {
        idSite: 1,
      }
    );
  });

  it('should get configured custom dimensions having scope', async () => {
    await module.getConfiguredCustomDimensionsHavingScope(1, 'visit');
    expect(mockClient.request).toHaveBeenCalledWith(
      'CustomDimensions.getConfiguredCustomDimensionsHavingScope',
      {
        idSite: 1,
        scope: 'visit',
      }
    );
  });

  it('should get available scopes', async () => {
    await module.getAvailableScopes(1);
    expect(mockClient.request).toHaveBeenCalledWith(
      'CustomDimensions.getAvailableScopes',
      {
        idSite: 1,
      }
    );
  });

  it('should get available extraction dimensions', async () => {
    await module.getAvailableExtractionDimensions();
    expect(mockClient.request).toHaveBeenCalledWith(
      'CustomDimensions.getAvailableExtractionDimensions',
      {}
    );
  });
});
