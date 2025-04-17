/**
 * Matomo Reporting Client Library
 *
 * A TypeScript client for interacting with the Matomo Reporting API
 */
// Main client
export { ReportingClient } from './reporting-client.js';
export type {
  ReportingClientOptions,
  RequestParams,
} from './reporting-client.js';

// Core module exports
export { CoreReportingClient } from './modules/core.js';

// Individual modules for direct usage
export { ApiModule } from './modules/api.js';
export { SitesManagerModule } from './modules/sites-manager.js';
export { AbTestingModule } from './modules/ab-testing.js';
export { ActionsModule } from './modules/actions.js';
export { ActivityLogModule } from './modules/activity-log.js';
export { AdvertisingConversionExportModule } from './modules/advertising-conversion-export.js';
export { AnnotationsModule } from './modules/annotations.js';
export { ConnectAccountsModule } from './modules/connect-accounts.js';
export { ContentsModule } from './modules/contents.js';
export { CoreAdminHomeModule } from './modules/core-admin-home.js';
export { CrashAnalyticsModule } from './modules/crash-analytics.js';
export { CustomAlertsModule } from './modules/custom-alerts.js';
export { CustomDimensionsModule } from './modules/custom-dimensions.js';
export { CustomJsTrackerModule } from './modules/custom-js-tracker.js';
export { CustomReportsModule } from './modules/custom-reports.js';
export { CustomVariablesModule } from './modules/custom-variables.js';
export { DashboardModule } from './modules/dashboard.js';
export { DevicePluginsModule } from './modules/device-plugins.js';
export { DevicesDetectionModule } from './modules/devices-detection.js';
export { EventsModule } from './modules/events.js';
export { FeedbackModule } from './modules/feedback.js';
export { FormAnalyticsModule } from './modules/form-analytics.js';
export { FunnelsModule } from './modules/funnels.js';
export { GoalsModule } from './modules/goals.js';
export { HeatmapSessionRecordingModule } from './modules/heatmap-session-recording.js';
export { ImageGraphModule } from './modules/image-graph.js';
export { InsightsModule } from './modules/insights.js';
export { LanguagesManagerModule } from './modules/languages-manager.js';
export { LiveModule } from './modules/live.js';
export { LoginModule } from './modules/login.js';
export { MarketingCampaignsReportingModule } from './modules/marketing-campaigns-reporting.js';
export { MediaAnalyticsModule } from './modules/media-analytics.js';
export { MobileMessagingModule } from './modules/mobile-messaging.js';
export { MultiChannelConversionAttributionModule } from './modules/multi-channel-conversion-attribution.js';
export { MultiSitesModule } from './modules/multi-sites.js';
export { OverlayModule } from './modules/overlay.js';
export { PagePerformanceModule } from './modules/page-performance.js';
export { PrivacyManagerModule } from './modules/privacy-manager.js';
export { ReferrersModule } from './modules/referrers.js';
export { ResolutionModule } from './modules/resolution.js';
export { RollUpReportingModule } from './modules/roll-up-reporting.js';
export { ScheduledReportsModule } from './modules/scheduled-reports.js';
export { SearchEngineKeywordsPerformanceModule } from './modules/search-engine-keywords-performance.js';
export { SegmentEditorModule } from './modules/segment-editor.js';
export { SeoModule } from './modules/seo.js';
export { TagManagerModule } from './modules/tag-manager.js';
export { TourModule } from './modules/tour.js';
export { TransitionsModule } from './modules/transitions.js';
export { TwoFactorAuthModule } from './modules/two-factor-auth.js';
export { UserCountryModule } from './modules/user-country.js';
export { UserIdModule } from './modules/user-id.js';
export { UserLanguageModule } from './modules/user-language.js';
export { UsersFlowModule } from './modules/users-flow.js';
export { UsersManagerModule } from './modules/users-manager.js';
export { VisitFrequencyModule } from './modules/visit-frequency.js';
export { VisitTimeModule } from './modules/visit-time.js';
export { VisitorInterestModule } from './modules/visitor-interest.js';
export { VisitsSummaryModule } from './modules/visits-summary.js';

// Default export
import { ReportingClient } from './reporting-client.js';
export default ReportingClient;
