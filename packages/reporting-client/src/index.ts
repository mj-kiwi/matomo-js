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

// Default export
import { ReportingClient } from './reporting-client.js';
export default ReportingClient;
