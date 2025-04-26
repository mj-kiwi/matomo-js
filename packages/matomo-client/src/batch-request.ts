/**
 * Matomo Batch Request System
 * Allows for chaining multiple API requests into a single HTTP request
 */

import { CoreReportingClient } from "./modules/core.js";
import { ApiModule } from "./modules/api.js";
import { AbTestingModule } from "./modules/ab-testing.js";
import { ActionsModule } from "./modules/actions.js";
import { ActivityLogModule } from "./modules/activity-log.js";
import { AdvertisingConversionExportModule } from "./modules/advertising-conversion-export.js";
import { AnnotationsModule } from "./modules/annotations.js";
import { ConnectAccountsModule } from "./modules/connect-accounts.js";
import { ContentsModule } from "./modules/contents.js";
import { CoreAdminHomeModule } from "./modules/core-admin-home.js";
import { CrashAnalyticsModule } from "./modules/crash-analytics.js";
import { CustomAlertsModule } from "./modules/custom-alerts.js";
import { CustomDimensionsModule } from "./modules/custom-dimensions.js";
import { CustomJsTrackerModule } from "./modules/custom-js-tracker.js";
import { CustomReportsModule } from "./modules/custom-reports.js";
import { CustomVariablesModule } from "./modules/custom-variables.js";
import { DashboardModule } from "./modules/dashboard.js";
import { DevicePluginsModule } from "./modules/device-plugins.js";
import { DevicesDetectionModule } from "./modules/devices-detection.js";
import { EventsModule } from "./modules/events.js";
import { FeedbackModule } from "./modules/feedback.js";
import { FormAnalyticsModule } from "./modules/form-analytics.js";
import { FunnelsModule } from "./modules/funnels.js";
import { GoalsModule } from "./modules/goals.js";
import { HeatmapSessionRecordingModule } from "./modules/heatmap-session-recording.js";
import { ImageGraphModule } from "./modules/image-graph.js";
import { InsightsModule } from "./modules/insights.js";
import { LanguagesManagerModule } from "./modules/languages-manager.js";
import { LiveModule } from "./modules/live.js";
import { LoginModule } from "./modules/login.js";
import { MarketingCampaignsReportingModule } from "./modules/marketing-campaigns-reporting.js";
import { MediaAnalyticsModule } from "./modules/media-analytics.js";
import { MobileMessagingModule } from "./modules/mobile-messaging.js";
import { MultiChannelConversionAttributionModule } from "./modules/multi-channel-conversion-attribution.js";
import { MultiSitesModule } from "./modules/multi-sites.js";
import { OverlayModule } from "./modules/overlay.js";
import { PagePerformanceModule } from "./modules/page-performance.js";
import { PrivacyManagerModule } from "./modules/privacy-manager.js";
import { ReferrersModule } from "./modules/referrers.js";
import { ResolutionModule } from "./modules/resolution.js";
import { RollUpReportingModule } from "./modules/roll-up-reporting.js";
import { ScheduledReportsModule } from "./modules/scheduled-reports.js";
import { SearchEngineKeywordsPerformanceModule } from "./modules/search-engine-keywords-performance.js";
import { SeoModule } from "./modules/seo.js";
import { SegmentEditorModule } from "./modules/segment-editor.js";
import { SitesManagerModule } from "./modules/sites-manager.js";
import { TagManagerModule } from "./modules/tag-manager.js";
import { TourModule } from "./modules/tour.js";
import { TransitionsModule } from "./modules/transitions.js";
import { TwoFactorAuthModule } from "./modules/two-factor-auth.js";
import { UserCountryModule } from "./modules/user-country.js";
import { UserIdModule } from "./modules/user-id.js";
import { UserLanguageModule } from "./modules/user-language.js";
import { UsersFlowModule } from "./modules/users-flow.js";
import { UsersManagerModule } from "./modules/users-manager.js";
import { VisitFrequencyModule } from "./modules/visit-frequency.js";
import { VisitTimeModule } from "./modules/visit-time.js";
import { VisitorInterestModule } from "./modules/visitor-interest.js";
import { VisitsSummaryModule } from "./modules/visits-summary.js";

/**
 * BatchRequest class to build chained API requests
 * @internal
 */
export class BatchRequest {
  private requests: Array<{ method: string; params: Record<string, any> }> = [];
  private client: CoreReportingClient;

  // Module instances for chaining
  public readonly api: ApiModule;
  public readonly abTesting: AbTestingModule;
  public readonly actions: ActionsModule;
  public readonly activityLog: ActivityLogModule;
  public readonly advertisingConversionExport: AdvertisingConversionExportModule;
  public readonly annotations: AnnotationsModule;
  public readonly connectAccounts: ConnectAccountsModule;
  public readonly contents: ContentsModule;
  public readonly coreAdminHome: CoreAdminHomeModule;
  public readonly crashAnalytics: CrashAnalyticsModule;
  public readonly customAlerts: CustomAlertsModule;
  public readonly customDimensions: CustomDimensionsModule;
  public readonly customJsTracker: CustomJsTrackerModule;
  public readonly customReports: CustomReportsModule;
  public readonly customVariables: CustomVariablesModule;
  public readonly dashboard: DashboardModule;
  public readonly devicePlugins: DevicePluginsModule;
  public readonly devicesDetection: DevicesDetectionModule;
  public readonly events: EventsModule;
  public readonly feedback: FeedbackModule;
  public readonly formAnalytics: FormAnalyticsModule;
  public readonly funnels: FunnelsModule;
  public readonly goals: GoalsModule;
  public readonly heatmapSessionRecording: HeatmapSessionRecordingModule;
  public readonly imageGraph: ImageGraphModule;
  public readonly insights: InsightsModule;
  public readonly languagesManager: LanguagesManagerModule;
  public readonly live: LiveModule;
  public readonly login: LoginModule;
  public readonly marketingCampaignsReporting: MarketingCampaignsReportingModule;
  public readonly mediaAnalytics: MediaAnalyticsModule;
  public readonly mobileMessaging: MobileMessagingModule;
  public readonly multiChannelConversionAttribution: MultiChannelConversionAttributionModule;
  public readonly multiSites: MultiSitesModule;
  public readonly overlay: OverlayModule;
  public readonly pagePerformance: PagePerformanceModule;
  public readonly privacyManager: PrivacyManagerModule;
  public readonly referrers: ReferrersModule;
  public readonly resolution: ResolutionModule;
  public readonly rollUpReporting: RollUpReportingModule;
  public readonly scheduledReports: ScheduledReportsModule;
  public readonly searchEngineKeywordsPerformance: SearchEngineKeywordsPerformanceModule;
  public readonly seo: SeoModule;
  public readonly segmentEditor: SegmentEditorModule;
  public readonly sitesManager: SitesManagerModule;
  public readonly tagManager: TagManagerModule;
  public readonly tour: TourModule;
  public readonly transitions: TransitionsModule;
  public readonly twoFactorAuth: TwoFactorAuthModule;
  public readonly userCountry: UserCountryModule;
  public readonly userId: UserIdModule;
  public readonly userLanguage: UserLanguageModule;
  public readonly usersFlow: UsersFlowModule;
  public readonly usersManager: UsersManagerModule;
  public readonly visitFrequency: VisitFrequencyModule;
  public readonly visitTime: VisitTimeModule;
  public readonly visitorInterest: VisitorInterestModule;
  public readonly visitsSummary: VisitsSummaryModule;

  /**
   * Create a new batch request builder
   *
   * @param client The CoreReportingClient instance
   */
  constructor(client: CoreReportingClient) {
    this.client = client;

    // Initialize all modules
    this.api = new ApiModule(this);
    this.abTesting = new AbTestingModule(this);
    this.actions = new ActionsModule(this);
    this.activityLog = new ActivityLogModule(this);
    this.advertisingConversionExport = new AdvertisingConversionExportModule(
      this
    );
    this.annotations = new AnnotationsModule(this);
    this.connectAccounts = new ConnectAccountsModule(this);
    this.contents = new ContentsModule(this);
    this.coreAdminHome = new CoreAdminHomeModule(this);
    this.crashAnalytics = new CrashAnalyticsModule(this);
    this.customAlerts = new CustomAlertsModule(this);
    this.customDimensions = new CustomDimensionsModule(this);
    this.customJsTracker = new CustomJsTrackerModule(this);
    this.customReports = new CustomReportsModule(this);
    this.customVariables = new CustomVariablesModule(this);
    this.dashboard = new DashboardModule(this);
    this.devicePlugins = new DevicePluginsModule(this);
    this.devicesDetection = new DevicesDetectionModule(this);
    this.events = new EventsModule(this);
    this.feedback = new FeedbackModule(this);
    this.formAnalytics = new FormAnalyticsModule(this);
    this.funnels = new FunnelsModule(this);
    this.goals = new GoalsModule(this);
    this.heatmapSessionRecording = new HeatmapSessionRecordingModule(this);
    this.imageGraph = new ImageGraphModule(this);
    this.insights = new InsightsModule(this);
    this.languagesManager = new LanguagesManagerModule(this);
    this.live = new LiveModule(this);
    this.login = new LoginModule(this);
    this.marketingCampaignsReporting = new MarketingCampaignsReportingModule(
      this
    );
    this.mediaAnalytics = new MediaAnalyticsModule(this);
    this.mobileMessaging = new MobileMessagingModule(this);
    this.multiChannelConversionAttribution =
      new MultiChannelConversionAttributionModule(this);
    this.multiSites = new MultiSitesModule(this);
    this.overlay = new OverlayModule(this);
    this.pagePerformance = new PagePerformanceModule(this);
    this.privacyManager = new PrivacyManagerModule(this);
    this.referrers = new ReferrersModule(this);
    this.resolution = new ResolutionModule(this);
    this.rollUpReporting = new RollUpReportingModule(this);
    this.scheduledReports = new ScheduledReportsModule(this);
    this.searchEngineKeywordsPerformance =
      new SearchEngineKeywordsPerformanceModule(this);
    this.seo = new SeoModule(this);
    this.segmentEditor = new SegmentEditorModule(this);
    this.sitesManager = new SitesManagerModule(this);
    this.tagManager = new TagManagerModule(this);
    this.tour = new TourModule(this);
    this.transitions = new TransitionsModule(this);
    this.twoFactorAuth = new TwoFactorAuthModule(this);
    this.userCountry = new UserCountryModule(this);
    this.userId = new UserIdModule(this);
    this.userLanguage = new UserLanguageModule(this);
    this.usersFlow = new UsersFlowModule(this);
    this.usersManager = new UsersManagerModule(this);
    this.visitFrequency = new VisitFrequencyModule(this);
    this.visitTime = new VisitTimeModule(this);
    this.visitorInterest = new VisitorInterestModule(this);
    this.visitsSummary = new VisitsSummaryModule(this);
  }

  /**
   * Adds a request to the batch
   * @internal
   */
  addRequest(method: string, params: Record<string, any> = {}): BatchRequest {
    this.requests.push({ method, params });
    return this;
  }

  /**
   * Sends all batched requests to the Matomo API
   */
  async send(): Promise<any[]> {
    if (this.requests.length === 0) {
      return [];
    }

    return this.client.batchRequest(this.requests);
  }

  /**
   * Returns the underlying CoreReportingClient
   * @internal
   */
  getCoreClient(): CoreReportingClient {
    return this.client;
  }
}
