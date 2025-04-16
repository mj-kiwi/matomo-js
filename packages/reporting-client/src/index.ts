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

// Default export
import { ReportingClient } from './reporting-client.js';
export default ReportingClient;
