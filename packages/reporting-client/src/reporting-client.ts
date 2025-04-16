/**
 * Matomo Reporting Client
 * A client library for the Matomo Reporting API
 * Based on documentation at https://developer.matomo.org/api-reference/reporting-api
 */

import { CoreReportingClient, ReportingClientOptions } from './modules/core.js';
import { ApiModule } from './modules/api.js';
import { SitesManagerModule } from './modules/sites-manager.js';
import { AbTestingModule } from './modules/ab-testing.js';

export type { ReportingClientOptions, RequestParams } from './modules/core.js';

export class ReportingClient {
  public core: CoreReportingClient;
  public api: ApiModule;
  public abTesting: AbTestingModule;
  public sitesManager: SitesManagerModule;

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
  }
}
