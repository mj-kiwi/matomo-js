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
  }
}
