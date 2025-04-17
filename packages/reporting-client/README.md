# Matomo Reporting Client

A TypeScript client library for the [Matomo Reporting API](https://developer.matomo.org/api-reference/reporting-api).

[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Matomo](https://img.shields.io/badge/-Matomo-3152A0?style=flat-square&logo=matomo&logoColor=white)](https://matomo.org/)
[![Analytics](https://img.shields.io/badge/-Analytics-00A98F?style=flat-square&logo=google-analytics&logoColor=white)](https://matomo.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

This library provides a simple and typed interface to interact with the Matomo Analytics Reporting API, allowing you to fetch analytics data from your Matomo instance.

## Installation

```bash
npm install @mj-kiwi/reporting-client
```

## Usage

### Basic Usage

```typescript
import { ReportingClient } from '@mj-kiwi/reporting-client';

// Create a new client
const client = new ReportingClient({
  url: 'https://your-matomo-instance.com',
  tokenAuth: 'your-auth-token', // Optional
  idSite: 1                     // Default site ID
});

// Get the Matomo version
const version = await client.api.getMatomoVersion();
console.log(`Matomo version: ${version}`);

// Get visits summary
const visitsSummary = await client.core.getVisitsSummary({
  period: 'day',
  date: 'yesterday'
});
console.log(`Visits yesterday: ${visitsSummary.nb_visits}`);
```

### Configuration Options

```typescript
const client = new ReportingClient({
  // Required
  url: 'https://your-matomo-instance.com',
  
  // Optional
  tokenAuth: 'your-auth-token',   // Auth token for API access
  idSite: 1,                      // Default site ID
  format: 'json',                 // Response format (json, xml, csv, tsv, html, rss)
  language: 'en',                 // Language for translations
  timeout: 30000,                 // Request timeout in ms (default: 30000)
});
```

### Available Methods

The client provides many methods to interact with different aspects of the Matomo API:

#### Core API Methods

```typescript
// Get Matomo version
const version = await client.api.getMatomoVersion();

// Get sites information
const sites = await client.api.getSitesInfo();

// Get API metadata
const metadata = await client.api.getMetadata();

// Get report metadata
const reportMetadata = await client.api.getReportMetadata();
```

#### Visits and Traffic

```typescript
// Get visits summary
const summary = await client.core.getVisitsSummary({
  period: 'day',
  date: 'yesterday'
});

// Get unique visitors
const visitors = await client.core.getUniqueVisitors({
  period: 'month',
  date: 'last30'
});

// Get live visitor count
const liveCount = await client.core.getLiveVisitorCount(1, 30); // Site ID 1, last 30 minutes
```

#### User Demographics and Devices

```typescript
// Get visitor countries
const countries = await client.core.getUserCountry({
  period: 'month',
  date: 'last30'
});

// Get visitor devices
const devices = await client.core.getUserDevices({
  period: 'month',
  date: 'last30'
});

// Get visitor browsers
const browsers = await client.core.getUserBrowsers({
  period: 'month',
  date: 'last30'
});
```

#### Content and Pages

```typescript
// Get page URLs
const pageUrls = await client.core.getPageUrls({
  period: 'month',
  date: 'last30'
});

// Get page titles
const pageTitles = await client.core.getPageTitles({
  period: 'month',
  date: 'last30'
});
```

#### Advanced Usage: Bulk Requests

You can make multiple API requests in a single HTTP call using `bulkRequest`:

```typescript
const results = await client.core.bulkRequest({
  'VisitsSummary.get': {
    period: 'day',
    date: 'yesterday'
  },
  'UserCountry.getCountry': {
    period: 'day',
    date: 'yesterday'
  }
});

console.log(results['VisitsSummary.get'].nb_visits);
console.log(results['UserCountry.getCountry']);
```

### Custom API Requests

If you need to access an API endpoint that doesn't have a dedicated method:

```typescript
const result = await client.core.request('CustomDimensions.getCustomDimension', {
  idDimension: 1,
  period: 'day',
  date: 'yesterday'
});
```

## Available Modules

The Matomo Reporting Client has a modular architecture where functionality is organized into specialized modules:

### Core Module

The `core` module provides the base API client functionality and handles requests to the Matomo API:

```typescript
// Make a direct API request using the core module
const result = await client.core.request('API.getMatomoVersion');

// Use the bulk request functionality
const bulkResults = await client.core.bulkRequest({
  'VisitsSummary.get': { period: 'day', date: 'yesterday' },
  'UserCountry.getCountry': { period: 'day', date: 'yesterday' }
});
```

### API Module

The `api` module provides methods for accessing general API information and metadata:

```typescript
// Get the Matomo version
const version = await client.api.getMatomoVersion();

// Get PHP version
const phpVersion = await client.api.getPhpVersion();

// Get API settings
const settings = await client.api.getSettings();

// Get segments metadata
const segments = await client.api.getSegmentsMetadata();

// Get report metadata
const reportMetadata = await client.api.getReportMetadata();
```

### Sites Manager Module

The `sitesManager` module provides methods for managing sites in Matomo:

```typescript
// Get information about all sites
const sites = await client.sitesManager.getSitesInfo();

// Get JavaScript tracking code for a site
const jsCode = await client.sitesManager.getJavascriptTag(1);

// Get image tracking code for a site
const imgCode = await client.sitesManager.getImageTrackingCode(1);
```

### A/B Testing Module

The `abTesting` module provides methods for working with A/B testing features in Matomo:

```typescript
// Get metrics overview for an experiment
const metrics = await client.abTesting.getMetricsOverview(
  1,                // Site ID
  'day',            // Period
  'yesterday',      // Date
  123               // Experiment ID
);

// Get detailed metrics for a specific success metric
const metricDetails = await client.abTesting.getMetricDetails(
  1,                // Site ID
  'day',            // Period
  'yesterday',      // Date
  123,              // Experiment ID
  'nb_conversions'  // Success metric
);
```

### Activity Log Module

The `activityLog` module provides methods for accessing user activity logs in the Matomo instance:

```typescript
// Get activity log entries with default parameters
const activities = await client.activityLog.getEntries();

// Get activity log entries with filters
const filteredActivities = await client.activityLog.getEntries(
  0,              // offset (starting from 0)
  25,             // limit (25 entries)
  'admin',        // filter by user login
  'login',        // filter by activity type
  'week',         // period
  'last7'         // date
);

// Get total count of activity log entries
const count = await client.activityLog.getEntryCount();

// Get count of activities for a specific user
const userCount = await client.activityLog.getEntryCount('admin');

// Get all available activity types
const activityTypes = await client.activityLog.getAllActivityTypes();
```

### Advertising Conversion Export Module

The `advertisingConversionExport` module provides methods for managing advertising conversion exports:

```typescript
// Get all conversion exports
const exports = await client.advertisingConversionExport.getConversionExports();

// Get conversion exports for a specific site
const siteExports = await client.advertisingConversionExport.getConversionExports(1);

// Get a specific conversion export
const exportDetails = await client.advertisingConversionExport.getConversionExport(123);

// Add a new conversion export
const newExport = await client.advertisingConversionExport.addConversionExport(
  1,                    // Site ID
  'Google Ads Export',  // Name
  'google',             // Type
  { accountId: '12345' }, // Parameters
  'Export conversions to Google Ads' // Description
);

// Update a conversion export
await client.advertisingConversionExport.updateConversionExport(
  123,                  // Export ID
  1,                    // Site ID
  'Updated Export',     // Name
  'google',             // Type
  { accountId: '67890' }, // Parameters
  'Updated description' // Description
);

// Delete a conversion export
await client.advertisingConversionExport.deleteConversionExport(123, 1);

// Regenerate access token for a conversion export
const newToken = await client.advertisingConversionExport.regenerateAccessToken(123);
```

### Annotations Module

The `annotations` module provides methods for managing annotations for analytics data:

```typescript
// Add a new annotation
const annotation = await client.annotations.add(
  1,                  // Site ID
  '2023-05-15',       // Date
  'Website redesign launched', // Note
  true                // Starred
);

// Save (update) an annotation
await client.annotations.save(
  1,                  // Site ID
  123,                // Note ID
  '2023-05-16',       // New date (optional)
  'Updated note text', // New note (optional)
  false               // New starred status (optional)
);

// Delete an annotation
await client.annotations.delete(1, 123);

// Delete all annotations for a site
await client.annotations.deleteAll(1);

// Get a specific annotation
const annotationDetails = await client.annotations.get(1, 123);

// Get all annotations for a site
const allAnnotations = await client.annotations.getAll('1');

// Get annotations filtered by date/period
const filteredAnnotations = await client.annotations.getAll(
  '1',                // Site ID
  '2023-05-01',       // Date
  'month',            // Period
  3                   // Last N periods
);

// Get annotation counts for dates
const annotationCounts = await client.annotations.getAnnotationCountForDates(
  '1',                // Site ID
  '2023-05-01,2023-05-31', // Date range
  'day',              // Period
  null,               // Last N (not used)
  true                // Include annotation text
);
```

### Connect Accounts Module

The `connectAccounts` module provides methods for integrating Matomo with other platforms:

```typescript
// Get Google Tag Manager containers
const containers = await client.connectAccounts.getGtmContainersList('123456789');

// Get GTM workspaces for a container
const workspaces = await client.connectAccounts.getGtmWorkspaceList('123456789', 'GTM-ABC123');

// Create a Matomo tag in GTM
const tag = await client.connectAccounts.createMatomoTag(
  '123456789',        // Account ID
  'GTM-ABC123',       // Container ID
  'workspace1',       // Workspace ID
  {                   // Parent info
    trackingId: 'UA-123456-1',
    variableNames: ['matomo-url', 'matomo-site-id']
  }
);
```

### Contents Module

The `contents` module provides methods for analyzing content interaction data:

```typescript
// Get content names with metrics
const contentNames = await client.contents.getContentNames(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  'deviceType==desktop' // Optional segment
);

// Get content pieces with metrics
const contentPieces = await client.contents.getContentPieces(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  '',                 // No segment
  5                   // Optional subtable ID
);
```

### Core Admin Home Module

The `coreAdminHome` module provides methods for administrative tasks:

```typescript
// Get all tracking failures
const failures = await client.coreAdminHome.getTrackingFailures();

// Delete a specific tracking failure
await client.coreAdminHome.deleteTrackingFailure(1, 123);

// Delete all tracking failures
await client.coreAdminHome.deleteAllTrackingFailures();
```

### Crash Analytics Module

The `crashAnalytics` module provides comprehensive methods for analyzing and managing JavaScript errors and crashes that occur on your website:

```typescript
// Get all crashes for a site
const allCrashes = await client.crashAnalytics.getAllCrashes(1);

// Get crash types
const crashTypes = await client.crashAnalytics.getCrashTypes(1);

// Get crash messages
const crashMessages = await client.crashAnalytics.getCrashMessages(1, 'day', 'yesterday');

// Get new crashes
const newCrashes = await client.crashAnalytics.getNewCrashes(1, 'week', 'last7');

// Get disappeared crashes
const disappearedCrashes = await client.crashAnalytics.getDisappearedCrashes(1, 'month', '2023-04');

// Get reappeared crashes
const reappearedCrashes = await client.crashAnalytics.getReappearedCrashes(1, 'week', 'last7');

// Get real-time crashes overview
const liveOverview = await client.crashAnalytics.getLastCrashesOverview(1, '', 15); // Last 15 minutes

// Get crashes by page URL
const crashesByPageUrl = await client.crashAnalytics.getCrashesByPageUrl(1, 'day', 'yesterday');

// Get crashes by source file
const crashesBySource = await client.crashAnalytics.getCrashesBySource(1, 'day', 'yesterday');

// Get crashes by category
const crashesByCategory = await client.crashAnalytics.getCrashesByCategory(1, 'day', 'yesterday');

// Get first-party crashes
const firstPartyCrashes = await client.crashAnalytics.getCrashesByFirstParty(1, 'day', 'yesterday');

// Get third-party crashes
const thirdPartyCrashes = await client.crashAnalytics.getCrashesByThirdParty(1, 'day', 'yesterday');

// Get summary information about a specific crash
const crashSummary = await client.crashAnalytics.getCrashSummary(1, 123);

// Get visit context for a crash
const visitContext = await client.crashAnalytics.getCrashVisitContext(
  123,           // Crash ID
  1,             // Site ID
  'day',         // Period
  'yesterday'    // Date
);

// Merge similar crashes into a crash group
await client.crashAnalytics.mergeCrashes(1, [123, 124, 125]);

// Unmerge a crash group
await client.crashAnalytics.unmergeCrashGroup(1, 123);

// Ignore a crash
await client.crashAnalytics.setIgnoreCrash(1, 123, 1); // 1 = ignore, 0 = unignore

// Get all ignored crashes
const ignoredCrashes = await client.crashAnalytics.getIgnoredCrashes(1);
```

### Custom Alerts Module

The `customAlerts` module provides methods for creating and managing custom alerts based on your analytics metrics:

```typescript
// Get all alerts for a site
const alerts = await client.customAlerts.getAlerts(1);

// Get all alerts across multiple sites
const multiSiteAlerts = await client.customAlerts.getAlerts([1, 2, 3]);

// Get alerts for all sites (superuser only)
const allAlerts = await client.customAlerts.getAlerts(1, 1);

// Get details about a specific alert
const alertDetails = await client.customAlerts.getAlert(123);

// Get historical values for an alert
const historicalValues = await client.customAlerts.getValuesForAlertInPast(123, 5); // Get last 5 periods

// Create a new alert
const newAlert = await client.customAlerts.addAlert(
  'Traffic Spike Alert',        // Name
  1,                            // Site ID
  'day',                        // Period
  true,                         // Email me
  'team@example.com',           // Additional emails
  '+123456789',                 // Phone numbers
  'nb_visits',                  // Metric to monitor
  'greater_than',               // Condition
  500,                          // Threshold value
  'previous',                   // Compare to
  'VisitsSummary.get'           // Report
);

// Update an existing alert
await client.customAlerts.editAlert(
  123,                          // Alert ID
  'Updated Traffic Alert',      // Name
  1,                            // Site ID
  'day',                        // Period
  true,                         // Email me
  'team@example.com',           // Additional emails
  '+123456789',                 // Phone numbers
  'nb_visits',                  // Metric
  'greater_than',               // Condition
  600,                          // New threshold
  'previous',                   // Compare to
  'VisitsSummary.get'           // Report
);

// Delete an alert
await client.customAlerts.deleteAlert(123);

// Get triggered alerts
const triggeredAlerts = await client.customAlerts.getTriggeredAlerts(1);
```

### Custom Dimensions Module

The `customDimensions` module provides methods for managing and reporting on custom dimensions in your Matomo analytics:

```typescript
// Get data for a specific custom dimension
const dimensionData = await client.customDimensions.getCustomDimension(
  1,                  // Dimension ID
  2,                  // Site ID
  'day',              // Period
  'yesterday',        // Date
  'country==FR'       // Optional segment
);

// Create a new custom dimension
const newDimension = await client.customDimensions.configureNewCustomDimension(
  1,                  // Site ID
  'Purchase Value',   // Name
  'visit',            // Scope (visit, action, conversion)
  true,               // Active status
  [                   // Extractions
    { dimension: 'url', pattern: 'value=([^&]*)' }
  ],
  true                // Case sensitive
);

// Update an existing custom dimension
await client.customDimensions.configureExistingCustomDimension(
  3,                  // Dimension ID
  1,                  // Site ID
  'Purchase Value Updated',  // Name
  true,               // Active status
  [                   // Updated extractions
    { dimension: 'url', pattern: 'value=([^&]*)' },
    { dimension: 'urlparam', pattern: 'purchase_value' }
  ]
);

// Get all configured custom dimensions for a site
const dimensions = await client.customDimensions.getConfiguredCustomDimensions(1);

// Get custom dimensions with a specific scope
const visitDimensions = await client.customDimensions.getConfiguredCustomDimensionsHavingScope(
  1,                  // Site ID
  'visit'             // Scope
);

// Get all available scopes for custom dimensions
const scopes = await client.customDimensions.getAvailableScopes(1);

// Get all available extraction dimensions
const extractionDimensions = await client.customDimensions.getAvailableExtractionDimensions();
```

### Custom JS Tracker Module

The `customJsTracker` module provides methods for working with Matomo's custom JavaScript tracker functionality:

```typescript
// Check if the CustomJsTracker plugin includes plugin trackers automatically
const includesAutomatically = await client.customJsTracker.doesIncludePluginTrackersAutomatically();
```

### Custom Reports Module

The `customReports` module provides methods for creating and managing custom reports within Matomo:

```typescript
// Create a new custom report
const newReport = await client.customReports.addCustomReport(
  1,                  // Site ID
  'Mobile Traffic Report',  // Name
  'table',            // Report type
  ['nb_visits', 'nb_actions', 'bounce_rate'],  // Metric IDs
  'General_Visitors',  // Category ID
  ['deviceType', 'resolution'],  // Dimension IDs
  'MobileOverview',    // Subcategory ID
  'Analysis of mobile traffic',  // Description
  'deviceType==mobile'  // Segment filter
);

// Update an existing custom report
await client.customReports.updateCustomReport(
  1,                  // Site ID
  123,                // Report ID
  'Updated Mobile Traffic Report',  // Name
  'table',            // Report type
  ['nb_visits', 'nb_actions', 'bounce_rate', 'conversion_rate'],  // Metric IDs
  'General_Visitors',  // Category ID
  ['deviceType', 'resolution', 'provider'],  // Dimension IDs
  'MobileOverview',    // Subcategory ID
  'Updated analysis of mobile traffic',  // Description
  'deviceType==mobile||deviceType==tablet'  // Segment filter
);

// Get all configured reports for a site
const reports = await client.customReports.getConfiguredReports(1);

// Get a specific configured report
const report = await client.customReports.getConfiguredReport(1, 123);

// Delete a custom report
await client.customReports.deleteCustomReport(1, 123);

// Pause a custom report
await client.customReports.pauseCustomReport(1, 123);

// Resume a custom report
await client.customReports.resumeCustomReport(1, 123);

// Get available categories for custom reports
const categories = await client.customReports.getAvailableCategories(1);

// Get available report types
const reportTypes = await client.customReports.getAvailableReportTypes();

// Get available dimensions
const dimensions = await client.customReports.getAvailableDimensions(1);

// Get available metrics
const metrics = await client.customReports.getAvailableMetrics(1);

// Get report data for a custom report
const reportData = await client.customReports.getCustomReport(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  123,                // Report ID
  'country==FR',      // Optional segment
  1,                  // Expanded
  0,                  // Flat
  '',                 // Subtable ID
  'nb_visits,bounce_rate'  // Columns
);
```

### Custom Variables Module

The `customVariables` module provides methods for working with custom variables in Matomo:

```typescript
// Get custom variables report
const variables = await client.customVariables.getCustomVariables(
  1,                  // Site ID
  'day',              // Period
  'yesterday',        // Date
  'country==FR',      // Optional segment
  1,                  // Expanded
  0                   // Flat
);

// Get custom variable values for a specific variable
const varValues = await client.customVariables.getCustomVariablesValuesFromNameId(
  1,                  // Site ID
  'day',              // Period
  'yesterday',        // Date
  3,                  // Subtable ID (variable ID)
  'country==FR'       // Optional segment
);

// Get slot usage information
const slotUsage = await client.customVariables.getUsagesOfSlots(1);
```

### Dashboard Module

The `dashboard` module provides methods for managing dashboards:

```typescript
// Get available dashboards
const dashboards = await client.dashboard.getDashboards('user1', '1');

// Create a new dashboard for a user
const newDashboard = await client.dashboard.createNewDashboardForUser(
  'user1',            // User login
  'Marketing Dashboard', // Dashboard name
  '1'                 // Add default widgets
);

// Remove a dashboard
await client.dashboard.removeDashboard(5, 'user1');

// Copy a dashboard to another user
await client.dashboard.copyDashboardToUser(5, 'user2', 'Marketing Dashboard Copy');

// Reset dashboard layout
await client.dashboard.resetDashboardLayout(5, 'user1');
```

### DevicePlugins Module

The `devicePlugins` module provides methods for accessing reports about browser plugins:

```typescript
// Get plugin usage
const pluginData = await client.devicePlugins.getPlugin(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  'deviceType==desktop' // Optional segment
);
```

### DevicesDetection Module

The `devicesDetection` module provides methods for accessing reports about visitor devices:

```typescript
// Get device types
const deviceTypes = await client.devicesDetection.getType(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  ''                  // No segment
);

// Get device brands
const brands = await client.devicesDetection.getBrand(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  ''                  // No segment
);

// Get device models
const models = await client.devicesDetection.getModel(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  ''                  // No segment
);

// Get OS families
const osFamilies = await client.devicesDetection.getOsFamilies(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  ''                  // No segment
);

// Get OS versions
const osVersions = await client.devicesDetection.getOsVersions(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  ''                  // No segment
);

// Get browsers
const browsers = await client.devicesDetection.getBrowsers(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  ''                  // No segment
);

// Get browser versions
const browserVersions = await client.devicesDetection.getBrowserVersions(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  ''                  // No segment
);

// Get browser engines
const browserEngines = await client.devicesDetection.getBrowserEngines(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  ''                  // No segment
);
```

### Events Module

The `events` module provides methods for working with custom events:

```typescript
// Get event categories
const categories = await client.events.getCategory(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  '',                 // No segment
  '',                 // Not expanded
  'eventAction',      // Secondary dimension
  'flat'              // Flat format
);

// Get event actions
const actions = await client.events.getAction(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  '',                 // No segment
  '',                 // Not expanded
  'eventCategory',    // Secondary dimension
  'flat'              // Flat format
);

// Get event names
const names = await client.events.getName(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  '',                 // No segment
  '',                 // Not expanded
  'eventAction',      // Secondary dimension
  'flat'              // Flat format
);

// Get actions for a specific category
const categoryActions = await client.events.getActionFromCategoryId(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  5,                  // Category subtable ID
  ''                  // No segment
);
```

### Feedback Module

The `feedback` module provides methods for submitting and managing user feedback:

```typescript
// Send feedback for a feature
await client.feedback.sendFeedbackForFeature(
  'segmentation',     // Feature name
  'yes',              // Like status
  'option1',          // User choice
  'Great feature!'    // Additional message
);

// Send feedback for a survey
await client.feedback.sendFeedbackForSurvey(
  'How satisfied are you?',  // Survey question
  'Very satisfied!'   // User response
);

// Update feedback reminder date
await client.feedback.updateFeedbackReminderDate();
```

## Building

Run `nx build reporting-client` to build the library.

## Running Unit Tests

Run `nx test reporting-client` to execute the unit tests via [Vitest](https://vitest.dev/).

## License

MIT
