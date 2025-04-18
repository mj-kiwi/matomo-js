import { describe, it, expect, vi, beforeEach } from "vitest";
import { CoreReportingClient, ReportingClient } from "../src/index";

// Mock all the modules
vi.mock("../src/index", async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...(original as any),
    ApiModule: vi.fn(),
    AbTestingModule: vi.fn(),
    SitesManagerModule: vi.fn(),
    ActionsModule: vi.fn(),
    ActivityLogModule: vi.fn(),
    AdvertisingConversionExportModule: vi.fn(),
    AnnotationsModule: vi.fn(),
    ConnectAccountsModule: vi.fn(),
    ContentsModule: vi.fn(),
    CoreAdminHomeModule: vi.fn(),
    CrashAnalyticsModule: vi.fn(),
    CustomAlertsModule: vi.fn(),
    CustomDimensionsModule: vi.fn(),
    CustomJsTrackerModule: vi.fn(),
    CustomReportsModule: vi.fn(),
    CustomVariablesModule: vi.fn(),
    DashboardModule: vi.fn(),
    DevicePluginsModule: vi.fn(),
    DevicesDetectionModule: vi.fn(),
    EventsModule: vi.fn(),
    FeedbackModule: vi.fn(),
    FormAnalyticsModule: vi.fn(),
    FunnelsModule: vi.fn(),
    GoalsModule: vi.fn(),
    HeatmapSessionRecordingModule: vi.fn(),
    ImageGraphModule: vi.fn(),
    InsightsModule: vi.fn(),
    LanguagesManagerModule: vi.fn(),
    LiveModule: vi.fn(),
    LoginModule: vi.fn(),
    MarketingCampaignsReportingModule: vi.fn(),
    MediaAnalyticsModule: vi.fn(),
    MobileMessagingModule: vi.fn(),
    MultiChannelConversionAttributionModule: vi.fn(),
    MultiSitesModule: vi.fn(),
    OverlayModule: vi.fn(),
    PagePerformanceModule: vi.fn(),
    PrivacyManagerModule: vi.fn(),
    ReferrersModule: vi.fn(),
    ResolutionModule: vi.fn(),
    RollUpReportingModule: vi.fn(),
    ScheduledReportsModule: vi.fn(),
    SearchEngineKeywordsPerformanceModule: vi.fn(),
    SeoModule: vi.fn(),
    SegmentEditorModule: vi.fn(),
    TagManagerModule: vi.fn(),
    TourModule: vi.fn(),
    TransitionsModule: vi.fn(),
    TwoFactorAuthModule: vi.fn(),
    UserCountryModule: vi.fn(),
    UserIdModule: vi.fn(),
    UserLanguageModule: vi.fn(),
    UsersFlowModule: vi.fn(),
    UsersManagerModule: vi.fn(),
    VisitFrequencyModule: vi.fn(),
    VisitTimeModule: vi.fn(),
    VisitorInterestModule: vi.fn(),
    VisitsSummaryModule: vi.fn(),
  };
});

describe("ReportingClient", () => {
  const options = {
    url: "https://analytics.example.org/",
    tokenAuth: "abc123",
  };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.resetAllMocks();
  });

  it("should be instantiable", () => {
    const client = new ReportingClient(options);
    expect(client).toBeInstanceOf(ReportingClient);
  });

  it("should create a CoreReportingClient instance", () => {
    const client = new ReportingClient(options);
    expect(client.core).toBeInstanceOf(CoreReportingClient);
    expect(client.core).toHaveProperty("baseUrl", options.url.slice(0, -1));
    expect(client.core).toHaveProperty("tokenAuth", options.tokenAuth);
    expect(client.core).toBeDefined();
  });

  it("should initialize all API modules", () => {
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
  it("should pass the core client to modules when initializing them", () => {
    const client = new ReportingClient(options);
    expect(client.api).haveOwnProperty("client", client.core);
    expect(client.abTesting).haveOwnProperty("client", client.core);
    expect(client.sitesManager).haveOwnProperty("client", client.core);
  });
});
