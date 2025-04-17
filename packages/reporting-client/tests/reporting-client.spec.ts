// filepath: /Users/mingjian.liang/MyProjects/matomo-js/packages/reporting-client/tests/reporting-client.spec.ts
import { describe, it, expect, vi } from 'vitest';
import { ReportingClient } from '../src/reporting-client.js';
import { CoreReportingClient } from '../src/modules/core.js';

// Mock all the modules
vi.mock('../src/modules/core.js', () => {
  return {
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

// We'll mock just a few representative modules to keep the test clean
vi.mock('../src/modules/api.js', () => {
  return {
    ApiModule: vi.fn(),
  };
});

vi.mock('../src/modules/ab-testing.js', () => {
  return {
    AbTestingModule: vi.fn(),
  };
});

vi.mock('../src/modules/sites-manager.js', () => {
  return {
    SitesManagerModule: vi.fn(),
  };
});

vi.mock('../src/modules/actions.js', () => {
  return {
    ActionsModule: vi.fn(),
  };
});

// Add a few more representative mocks
vi.mock('../src/modules/events.js', () => {
  return {
    EventsModule: vi.fn(),
  };
});

vi.mock('../src/modules/goals.js', () => {
  return {
    GoalsModule: vi.fn(),
  };
});

vi.mock('../src/modules/visits-summary.js', () => {
  return {
    VisitsSummaryModule: vi.fn(),
  };
});

// We'll use auto-mock for the rest of the modules to keep the test file manageable
vi.mock('../src/modules/activity-log.js');
vi.mock('../src/modules/advertising-conversion-export.js');
vi.mock('../src/modules/annotations.js');
vi.mock('../src/modules/connect-accounts.js');
vi.mock('../src/modules/contents.js');
vi.mock('../src/modules/core-admin-home.js');
vi.mock('../src/modules/crash-analytics.js');
vi.mock('../src/modules/custom-alerts.js');
vi.mock('../src/modules/custom-dimensions.js');
vi.mock('../src/modules/custom-js-tracker.js');
vi.mock('../src/modules/custom-reports.js');
vi.mock('../src/modules/custom-variables.js');
vi.mock('../src/modules/dashboard.js');
vi.mock('../src/modules/device-plugins.js');
vi.mock('../src/modules/devices-detection.js');
vi.mock('../src/modules/feedback.js');
vi.mock('../src/modules/form-analytics.js');
vi.mock('../src/modules/funnels.js');
vi.mock('../src/modules/heatmap-session-recording.js');
vi.mock('../src/modules/image-graph.js');
vi.mock('../src/modules/insights.js');
vi.mock('../src/modules/languages-manager.js');
vi.mock('../src/modules/live.js');
vi.mock('../src/modules/login.js');
vi.mock('../src/modules/marketing-campaigns-reporting.js');
vi.mock('../src/modules/media-analytics.js');
vi.mock('../src/modules/mobile-messaging.js');
vi.mock('../src/modules/multi-channel-conversion-attribution.js');
vi.mock('../src/modules/multi-sites.js');
vi.mock('../src/modules/overlay.js');
vi.mock('../src/modules/page-performance.js');
vi.mock('../src/modules/privacy-manager.js');
vi.mock('../src/modules/referrers.js');
vi.mock('../src/modules/resolution.js');
vi.mock('../src/modules/roll-up-reporting.js');
vi.mock('../src/modules/scheduled-reports.js');
vi.mock('../src/modules/search-engine-keywords-performance.js');
vi.mock('../src/modules/segment-editor.js');
vi.mock('../src/modules/seo.js');
vi.mock('../src/modules/tag-manager.js');
vi.mock('../src/modules/tour.js');
vi.mock('../src/modules/transitions.js');
vi.mock('../src/modules/two-factor-auth.js');
vi.mock('../src/modules/user-country.js');
vi.mock('../src/modules/user-id.js');
vi.mock('../src/modules/user-language.js');
vi.mock('../src/modules/users-flow.js');
vi.mock('../src/modules/users-manager.js');
vi.mock('../src/modules/visit-frequency.js');
vi.mock('../src/modules/visit-time.js');
vi.mock('../src/modules/visitor-interest.js');

describe('ReportingClient', () => {
  const options = {
    url: 'https://analytics.example.org/',
    tokenAuth: 'abc123',
  };

  it('should be instantiable', () => {
    const client = new ReportingClient(options);
    expect(client).toBeInstanceOf(ReportingClient);
  });

  it('should create a CoreReportingClient instance', () => {
    const client = new ReportingClient(options);
    expect(CoreReportingClient).toHaveBeenCalledWith(options);
    expect(client.core).toBeDefined();
  });

  it('should initialize all API modules', () => {
    const client = new ReportingClient(options);

    // Check that all modules are initialized
    expect(client.api).toBeDefined();
    expect(client.abTesting).toBeDefined();
    expect(client.sitesManager).toBeDefined();
    expect(client.actions).toBeDefined();
    expect(client.activityLog).toBeDefined();
    expect(client.advertisingConversionExport).toBeDefined();
    expect(client.annotations).toBeDefined();
    expect(client.connectAccounts).toBeDefined();
    expect(client.contents).toBeDefined();
    expect(client.coreAdminHome).toBeDefined();
    expect(client.crashAnalytics).toBeDefined();
    expect(client.customAlerts).toBeDefined();
    expect(client.customDimensions).toBeDefined();
    expect(client.customJsTracker).toBeDefined();
    expect(client.customReports).toBeDefined();
    expect(client.customVariables).toBeDefined();
    expect(client.dashboard).toBeDefined();
    expect(client.devicePlugins).toBeDefined();
    expect(client.devicesDetection).toBeDefined();
    expect(client.events).toBeDefined();
    expect(client.feedback).toBeDefined();
    expect(client.formAnalytics).toBeDefined();
    expect(client.funnels).toBeDefined();
    expect(client.goals).toBeDefined();
    expect(client.heatmapSessionRecording).toBeDefined();
    expect(client.imageGraph).toBeDefined();
    expect(client.insights).toBeDefined();
    expect(client.languagesManager).toBeDefined();
    expect(client.live).toBeDefined();
    expect(client.login).toBeDefined();
    expect(client.marketingCampaignsReporting).toBeDefined();
    expect(client.mediaAnalytics).toBeDefined();
    expect(client.mobileMessaging).toBeDefined();
    expect(client.multiChannelConversionAttribution).toBeDefined();
    expect(client.multiSites).toBeDefined();
    expect(client.overlay).toBeDefined();
    expect(client.pagePerformance).toBeDefined();
    expect(client.privacyManager).toBeDefined();
    expect(client.referrers).toBeDefined();
    expect(client.resolution).toBeDefined();
    expect(client.rollUpReporting).toBeDefined();
    expect(client.scheduledReports).toBeDefined();
    expect(client.searchEngineKeywordsPerformance).toBeDefined();
    expect(client.seo).toBeDefined();
    expect(client.segmentEditor).toBeDefined();
    expect(client.tagManager).toBeDefined();
    expect(client.tour).toBeDefined();
    expect(client.transitions).toBeDefined();
    expect(client.twoFactorAuth).toBeDefined();
    expect(client.userCountry).toBeDefined();
    expect(client.userId).toBeDefined();
    expect(client.userLanguage).toBeDefined();
    expect(client.usersFlow).toBeDefined();
    expect(client.usersManager).toBeDefined();
    expect(client.visitFrequency).toBeDefined();
    expect(client.visitTime).toBeDefined();
    expect(client.visitorInterest).toBeDefined();
    expect(client.visitsSummary).toBeDefined();
  });

  // Test a few specific modules to ensure they're initialized with the core client
  it('should pass the core client to modules when initializing them', async () => {
    const client = new ReportingClient(options);
    const { ApiModule } = await import('../src/modules/api.js');
    const { AbTestingModule } = await import('../src/modules/ab-testing.js');
    const { GoalsModule } = await import('../src/modules/goals.js');

    expect(ApiModule).toHaveBeenCalledWith(client.core);
    expect(AbTestingModule).toHaveBeenCalledWith(client.core);
    expect(GoalsModule).toHaveBeenCalledWith(client.core);
  });
});
