/**
 * Matomo Reporting Client
 * A client library for the Matomo Reporting API
 * Based on documentation at https://developer.matomo.org/api-reference/reporting-api
 */

import { CoreReportingClient, ReportingClientOptions } from './modules/core.js';
import { ApiModule } from './modules/api.js';
import { SitesManagerModule } from './modules/sites-manager.js';
import { AbTestingModule } from './modules/ab-testing.js';
import { ActionsModule } from './modules/actions.js';
import { ActivityLogModule } from './modules/activity-log.js';
import { AdvertisingConversionExportModule } from './modules/advertising-conversion-export.js';
import { AnnotationsModule } from './modules/annotations.js';
import { ConnectAccountsModule } from './modules/connect-accounts.js';
import { ContentsModule } from './modules/contents.js';
import { CoreAdminHomeModule } from './modules/core-admin-home.js';
import { CrashAnalyticsModule } from './modules/crash-analytics.js';
import { CustomAlertsModule } from './modules/custom-alerts.js';
import { CustomDimensionsModule } from './modules/custom-dimensions.js';
import { CustomJsTrackerModule } from './modules/custom-js-tracker.js';
import { CustomReportsModule } from './modules/custom-reports.js';
import { CustomVariablesModule } from './modules/custom-variables.js';
import { DashboardModule } from './modules/dashboard.js';
import { DevicePluginsModule } from './modules/device-plugins.js';
import { DevicesDetectionModule } from './modules/devices-detection.js';
import { EventsModule } from './modules/events.js';
import { FeedbackModule } from './modules/feedback.js';
import { FormAnalyticsModule } from './modules/form-analytics.js';
import { FunnelsModule } from './modules/funnels.js';
import { GoalsModule } from './modules/goals.js';
import { HeatmapSessionRecordingModule } from './modules/heatmap-session-recording.js';
import { ImageGraphModule } from './modules/image-graph.js';
import { InsightsModule } from './modules/insights.js';
import { LanguagesManagerModule } from './modules/languages-manager.js';
import { LiveModule } from './modules/live.js';
import { LoginModule } from './modules/login.js';
import { MarketingCampaignsReportingModule } from './modules/marketing-campaigns-reporting.js';
import { MediaAnalyticsModule } from './modules/media-analytics.js';
import { MobileMessagingModule } from './modules/mobile-messaging.js';
import { MultiChannelConversionAttributionModule } from './modules/multi-channel-conversion-attribution.js';
import { MultiSitesModule } from './modules/multi-sites.js';
import { OverlayModule } from './modules/overlay.js';
import { PagePerformanceModule } from './modules/page-performance.js';
import { PrivacyManagerModule } from './modules/privacy-manager.js';
import { ReferrersModule } from './modules/referrers.js';
import { ResolutionModule } from './modules/resolution.js';
import { RollUpReportingModule } from './modules/roll-up-reporting.js';
import { ScheduledReportsModule } from './modules/scheduled-reports.js';
import { SearchEngineKeywordsPerformanceModule } from './modules/search-engine-keywords-performance.js';
import { SeoModule } from './modules/seo.js';
import { SegmentEditorModule } from './modules/segment-editor.js';
import { TagManagerModule } from './modules/tag-manager.js';
import { TourModule } from './modules/tour.js';
import { TransitionsModule } from './modules/transitions.js';
import { TwoFactorAuthModule } from './modules/two-factor-auth.js';
import { UserCountryModule } from './modules/user-country.js';
import { UserIdModule } from './modules/user-id.js';
import { UserLanguageModule } from './modules/user-language.js';
import { UsersFlowModule } from './modules/users-flow.js';
import { UsersManagerModule } from './modules/users-manager.js';
import { VisitFrequencyModule } from './modules/visit-frequency.js';
import { VisitTimeModule } from './modules/visit-time.js';
import { VisitorInterestModule } from './modules/visitor-interest.js';
import { VisitsSummaryModule } from './modules/visits-summary.js';

export type { ReportingClientOptions, RequestParams } from './modules/core.js';

export class ReportingClient {
  public core: CoreReportingClient;
  public api: ApiModule;
  public abTesting: AbTestingModule;
  public sitesManager: SitesManagerModule;
  public actions: ActionsModule;
  public activityLog: ActivityLogModule;
  public advertisingConversionExport: AdvertisingConversionExportModule;
  public annotations: AnnotationsModule;
  public connectAccounts: ConnectAccountsModule;
  public contents: ContentsModule;
  public coreAdminHome: CoreAdminHomeModule;
  public crashAnalytics: CrashAnalyticsModule;
  public customAlerts: CustomAlertsModule;
  public customDimensions: CustomDimensionsModule;
  public customJsTracker: CustomJsTrackerModule;
  public customReports: CustomReportsModule;
  public customVariables: CustomVariablesModule;
  public dashboard: DashboardModule;
  public devicePlugins: DevicePluginsModule;
  public devicesDetection: DevicesDetectionModule;
  public events: EventsModule;
  public feedback: FeedbackModule;
  public formAnalytics: FormAnalyticsModule;
  public funnels: FunnelsModule;
  public goals: GoalsModule;
  public heatmapSessionRecording: HeatmapSessionRecordingModule;
  public imageGraph: ImageGraphModule;
  public insights: InsightsModule;
  public languagesManager: LanguagesManagerModule;
  public live: LiveModule;
  public login: LoginModule;
  public marketingCampaignsReporting: MarketingCampaignsReportingModule;
  public mediaAnalytics: MediaAnalyticsModule;
  public mobileMessaging: MobileMessagingModule;
  public multiChannelConversionAttribution: MultiChannelConversionAttributionModule;
  public multiSites: MultiSitesModule;
  public overlay: OverlayModule;
  public pagePerformance: PagePerformanceModule;
  public privacyManager: PrivacyManagerModule;
  public referrers: ReferrersModule;
  public resolution: ResolutionModule;
  public rollUpReporting: RollUpReportingModule;
  public scheduledReports: ScheduledReportsModule;
  public searchEngineKeywordsPerformance: SearchEngineKeywordsPerformanceModule;
  public seo: SeoModule;
  public segmentEditor: SegmentEditorModule;
  public tagManager: TagManagerModule;
  public tour: TourModule;
  public transitions: TransitionsModule;
  public twoFactorAuth: TwoFactorAuthModule;
  public userCountry: UserCountryModule;
  public userId: UserIdModule;
  public userLanguage: UserLanguageModule;
  public usersFlow: UsersFlowModule;
  public usersManager: UsersManagerModule;
  public visitFrequency: VisitFrequencyModule;
  public visitTime: VisitTimeModule;
  public visitorInterest: VisitorInterestModule;
  public visitsSummary: VisitsSummaryModule;

  /**
   * Create a new Matomo Reporting API client
   *
   * @param options Client configuration options
   */
  constructor(options: ReportingClientOptions) {
    this.core = new CoreReportingClient(options);
    this.api = new ApiModule(this.core);
    this.abTesting = new AbTestingModule(this.core);
    this.sitesManager = new SitesManagerModule(this.core);
    this.actions = new ActionsModule(this.core);
    this.activityLog = new ActivityLogModule(this.core);
    this.advertisingConversionExport = new AdvertisingConversionExportModule(
      this.core
    );
    this.annotations = new AnnotationsModule(this.core);
    this.connectAccounts = new ConnectAccountsModule(this.core);
    this.contents = new ContentsModule(this.core);
    this.coreAdminHome = new CoreAdminHomeModule(this.core);
    this.crashAnalytics = new CrashAnalyticsModule(this.core);
    this.customAlerts = new CustomAlertsModule(this.core);
    this.customDimensions = new CustomDimensionsModule(this.core);
    this.customJsTracker = new CustomJsTrackerModule(this.core);
    this.customReports = new CustomReportsModule(this.core);
    this.customVariables = new CustomVariablesModule(this.core);
    this.dashboard = new DashboardModule(this.core);
    this.devicePlugins = new DevicePluginsModule(this.core);
    this.devicesDetection = new DevicesDetectionModule(this.core);
    this.events = new EventsModule(this.core);
    this.feedback = new FeedbackModule(this.core);
    this.formAnalytics = new FormAnalyticsModule(this.core);
    this.funnels = new FunnelsModule(this.core);
    this.goals = new GoalsModule(this.core);
    this.heatmapSessionRecording = new HeatmapSessionRecordingModule(this.core);
    this.imageGraph = new ImageGraphModule(this.core);
    this.insights = new InsightsModule(this.core);
    this.languagesManager = new LanguagesManagerModule(this.core);
    this.live = new LiveModule(this.core);
    this.login = new LoginModule(this.core);
    this.marketingCampaignsReporting = new MarketingCampaignsReportingModule(
      this.core
    );
    this.mediaAnalytics = new MediaAnalyticsModule(this.core);
    this.mobileMessaging = new MobileMessagingModule(this.core);
    this.multiChannelConversionAttribution =
      new MultiChannelConversionAttributionModule(this.core);
    this.multiSites = new MultiSitesModule(this.core);
    this.overlay = new OverlayModule(this.core);
    this.pagePerformance = new PagePerformanceModule(this.core);
    this.privacyManager = new PrivacyManagerModule(this.core);
    this.referrers = new ReferrersModule(this.core);
    this.resolution = new ResolutionModule(this.core);
    this.rollUpReporting = new RollUpReportingModule(this.core);
    this.seo = new SeoModule(this.core);
    this.scheduledReports = new ScheduledReportsModule(this.core);
    this.searchEngineKeywordsPerformance =
      new SearchEngineKeywordsPerformanceModule(this.core);
    this.segmentEditor = new SegmentEditorModule(this.core);
    this.tagManager = new TagManagerModule(this.core);
    this.tour = new TourModule(this.core);
    this.transitions = new TransitionsModule(this.core);
    this.twoFactorAuth = new TwoFactorAuthModule(this.core);
    this.userCountry = new UserCountryModule(this.core);
    this.userId = new UserIdModule(this.core);
    this.userLanguage = new UserLanguageModule(this.core);
    this.usersFlow = new UsersFlowModule(this.core);
    this.usersManager = new UsersManagerModule(this.core);
    this.visitFrequency = new VisitFrequencyModule(this.core);
    this.visitTime = new VisitTimeModule(this.core);
    this.visitorInterest = new VisitorInterestModule(this.core);
    this.visitsSummary = new VisitsSummaryModule(this.core);
  }
}
