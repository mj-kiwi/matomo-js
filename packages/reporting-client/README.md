# Matomo Reporting Client

A TypeScript client library for the [Matomo Reporting API](https://developer.matomo.org/api-reference/reporting-api).

[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Matomo](https://img.shields.io/badge/-Matomo-3152A0?style=flat-square&logo=matomo&logoColor=white)](https://matomo.org/)
[![Analytics](https://img.shields.io/badge/-Analytics-00A98F?style=flat-square&logo=google-analytics&logoColor=white)](https://matomo.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

This library provides a simple and typed interface to interact with the Matomo Analytics Reporting API, allowing you to fetch analytics data from your Matomo instance.

## Installation

```bash
npm install @matomo/reporting-client
```

## Usage

```typescript
import { ReportingClient } from '@matomo/reporting-client';

// Create a client instance
const client = new ReportingClient({
  url: 'https://matomo.example.org',
  tokenAuth: 'your_auth_token',
  idSite: 1,
});

// Use the client to fetch data
async function getVisitorData() {
  try {
    const visitors = await client.api.get(1, 'day', 'yesterday');
    console.log('Visitors yesterday:', visitors);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

getVisitorData();
```

## Client Configuration

When creating a new instance of the `ReportingClient`, you can provide the following configuration options:

```typescript
const client = new ReportingClient({
  // Required
  url: 'https://matomo.example.org', // Matomo instance URL
  
  // Optional
  tokenAuth: 'your_auth_token', // Auth token for authenticated API requests
  idSite: 1, // Default site ID to use when not specified in requests
  format: 'json', // Response format: 'json', 'xml', 'csv', 'tsv', 'html', 'rss', or 'original'
  language: 'en', // Language for API responses
  timeout: 30000, // Request timeout in milliseconds (default: 30000)
  axiosInstance: customAxios, // Custom Axios instance for special configurations
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
const filteredAnnotations = await client.annotations.getAllByDate(
  '1',                // Site ID
  'month',            // Period
  '2023-05-01'        // Date
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
const realtimeCrashes = await client.crashAnalytics.getRealTimeCrashesOverview(1, 30);

// Search crash messages for merging
const searchResults = await client.crashAnalytics.searchCrashMessagesForMerge(1, 'TypeError');

// Merge multiple crashes
await client.crashAnalytics.mergeCrashes(1, 123, [456, 789]);

// Delete a specific crash
await client.crashAnalytics.deleteCrash(1, 123);
```

### Custom Alerts Module

The `customAlerts` module provides methods for working with custom alert definitions:

```typescript
// Get all alerts for a user
const alerts = await client.customAlerts.getAlerts('mylogin', 1);

// Get all alert types
const types = await client.customAlerts.getTriggeredAlerts(1);

// Add a new alert
await client.customAlerts.addAlert(
  'High Bounce Rate Alert',  // Alert name
  1,                        // Site ID
  'week',                   // Period
  'bounce_rate',            // Metric
  'greater_than',           // Comparison method
  70,                       // Alert threshold value
  ['myemail@example.com'],  // Report emails
  ['sms:123456789']         // Phone numbers
);

// Delete an alert
await client.customAlerts.deleteAlert(123);
```

### Custom Dimensions Module

The `customDimensions` module provides methods for managing custom dimensions in Matomo:

```typescript
// Get all custom dimensions for a site
const dimensions = await client.customDimensions.getConfiguredCustomDimensions(1);

// Get custom dimension by scope
const visitDimensions = await client.customDimensions.getConfiguredCustomDimensionsByScope(1, 'visit');

// Get custom dimension values for a site
const values = await client.customDimensions.getCustomDimension(
  1,                   // Site ID
  'day',               // Period
  'yesterday',         // Date
  1,                   // Custom dimension ID
  'deviceType==desktop' // Optional segment
);

// Add a new custom dimension
await client.customDimensions.configureNewCustomDimension(
  1,                   // Site ID
  'Member Status',     // Dimension name
  'visit',             // Scope
  true,                // Active
  ['gold', 'silver', 'bronze'] // Optional case-insensitive extractable values
);

// Update a custom dimension
await client.customDimensions.configureExistingCustomDimension(
  1,                   // Site ID
  1,                   // Dimension ID
  'Updated Member Status', // New name
  true,                // Active
  ['platinum', 'gold', 'silver', 'bronze'] // Updated extractable values
);
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

The `customVariables` module provides methods for accessing custom variable data:

```typescript
// Get custom variable data
const customVars = await client.customVariables.getCustomVariables(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  '',                 // No segment
  5                   // Optional subtable ID
);

// Get custom variable configuration
const config = await client.customVariables.getConfiguredCustomVariables();
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

The `devicePlugins` module provides methods for accessing browser plugin statistics:

```typescript
// Get plugin data
const plugins = await client.devicePlugins.getPlugin(
  1,                  // Site ID
  'month',            // Period
  'last30',           // Date
  ''                  // No segment
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
  'eventCategory',    // Secondary dimension
  'flat'              // Flat format
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

### Form Analytics Module

The `formAnalytics` module provides methods for managing forms and accessing form analytics data:

```typescript
// Add a new form for tracking
const newForm = await client.formAnalytics.addForm(
  1,                    // Site ID
  'Contact Form',       // Form name
  'Main contact form',  // Description
  'form[id=contact]',   // Match form rule
  'page.url=contact',   // Match page rule
  'form_submit',        // Conversion rule option
  'thank-you'           // Conversion rule value
);

// Get all forms for a site
const forms = await client.formAnalytics.getForms(1);

// Get entry fields report
const entryFields = await client.formAnalytics.getEntryFields(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  123                   // Form ID
);

// Get drop off fields report
const dropOffFields = await client.formAnalytics.getDropOffFields(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  123                   // Form ID
);

// Get field timings report
const timings = await client.formAnalytics.getFieldTimings(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  123                   // Form ID
);

// Get most popular forms in real time
const popularForms = await client.formAnalytics.getCurrentMostPopularForms(
  1,                    // Site ID
  30,                   // Last minutes
  10                    // Limit
);
```

### Funnels Module

The `funnels` module provides methods for creating, managing, and analyzing conversion funnels:

```typescript
// Get funnel metrics
const metrics = await client.funnels.getMetrics(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  123                   // Funnel ID
);

// Get funnel flow visualization data
const funnelFlow = await client.funnels.getFunnelFlow(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  123                   // Funnel ID
);

// Get funnel entries
const entries = await client.funnels.getFunnelEntries(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  123                   // Funnel ID
);

// Set up a goal funnel
await client.funnels.setGoalFunnel(
  1,                    // Site ID
  2,                    // Goal ID
  true,                 // Is activated
  [
    { pattern: '/checkout/cart', pattern_type: 'contains' },
    { pattern: '/checkout/shipping', pattern_type: 'contains' },
    { pattern: '/checkout/payment', pattern_type: 'contains' }
  ]                     // Funnel steps
);

// Get all activated funnels for a site
const funnels = await client.funnels.getAllActivatedFunnelsForSite(1);
```

### Goals Module

The `goals` module provides methods for managing goals and accessing goal metrics:

```typescript
// Get all goals for a site
const goals = await client.goals.getGoals(1);

// Get a specific goal
const goal = await client.goals.getGoal(1, 2);

// Add a new goal
const newGoal = await client.goals.addGoal(
  1,                    // Site ID
  'Download Brochure',  // Goal name
  'url',                // Match attribute (url, title, file, etc.)
  '/downloads/brochure.pdf', // Pattern to match
  'contains',           // Pattern type (contains, exact, regex, etc.)
  false,                // Case sensitive
  10.5                  // Goal revenue value
);

// Update a goal
await client.goals.updateGoal(
  1,                    // Site ID
  2,                    // Goal ID
  'Updated Goal Name',  // New name
  'url',                // Match attribute
  '/downloads/brochure-v2.pdf', // New pattern
  'contains',           // Pattern type
  false,                // Case sensitive
  15.0                  // New revenue value
);

// Delete a goal
await client.goals.deleteGoal(1, 2);

// Get ecommerce items by SKU
const skuItems = await client.goals.getItemsSku(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get abandoned cart items by name
const abandonedItems = await client.goals.getItemsName(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  true                  // Abandoned carts flag
);

// Get goal conversion metrics
const conversions = await client.goals.get(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  'deviceType==desktop', // Segment
  2                     // Goal ID
);

// Get days to conversion report
const daysToConversion = await client.goals.getDaysToConversion(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);
```

### Heatmap Session Recording Module

The `heatmapSessionRecording` module provides methods for managing and analyzing heatmaps and session recordings:

```typescript
// Add a new heatmap
const heatmap = await client.heatmapSessionRecording.addHeatmap(
  1,                    // Site ID
  'Homepage Heatmap',   // Heatmap name
  ['example.org'],      // Match page rules
  '1000',               // Sample limit
  '5',                  // Sample rate (%)
  '.no-track'           // Excluded elements
);

// Get all heatmaps for a site
const heatmaps = await client.heatmapSessionRecording.getHeatmaps(1);

// Get a specific heatmap
const singleHeatmap = await client.heatmapSessionRecording.getHeatmap(1, 123);

// Add a new session recording
const recording = await client.heatmapSessionRecording.addSessionRecording(
  1,                    // Site ID
  'Checkout Process',   // Recording name
  ['checkout/*'],       // Match page rules
  '1000',               // Sample limit
  '10',                 // Sample rate (%)
  '30',                 // Minimum session time (seconds)
  true,                 // Requires activity
  true                  // Capture keystrokes
);

// Get recorded sessions
const sessions = await client.heatmapSessionRecording.getRecordedSessions(
  1,                    // Site ID
  'day',                // Period
  'yesterday',          // Date
  123                   // Session recording configuration ID
);

// Get recorded heatmap data
const heatmapData = await client.heatmapSessionRecording.getRecordedHeatmap(
  1,                    // Site ID
  'day',                // Period
  'yesterday',          // Date
  123,                  // Heatmap configuration ID
  'click',              // Heatmap type
  'desktop'             // Device type
);

// Test if a URL matches page rules
const matchResult = await client.heatmapSessionRecording.testUrlMatchPages(
  'https://example.org/checkout',
  ['checkout/*', 'order/*']
);
```

### Image Graph Module

The `imageGraph` module provides methods for generating static PNG graphs from Matomo reports:

```typescript
// Generate a line graph for visitors over time
const evolutionGraph = await client.imageGraph.get(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  'VisitsSummary',      // API module
  'get',                // API action
  'evolution',          // Graph type
  '0',                  // Output type
  'nb_visits',          // Columns to display
  'Visits',             // Label
  true,                 // Show legend
  '800',                // Width
  '400'                 // Height
);

// Generate a pie chart of device types
const pieChart = await client.imageGraph.get(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  'DevicesDetection',   // API module
  'getType',            // API action
  'pie',                // Graph type
  '0',                  // Output type
  '',                   // All columns
  '',                   // Default labels
  true,                 // Show legend
  '600',                // Width
  '300',                // Height
  '10',                 // Font size
  '9',                  // Legend font size
  true,                 // Aliased (anti-aliased)
  '',                   // No goal filter
  'ff0000,00ff00,0000ff' // Custom colors
);
```

### Insights Module

The `insights` module provides methods for generating analytical insights about website data:

```typescript
// Check if insights can be generated for a period
const canGenerate = await client.insights.canGenerateInsights('yesterday', 'day');

// Get insights overview for a site
const overview = await client.insights.getInsightsOverview(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get movers and shakers overview
const moversShakers = await client.insights.getMoversAndShakersOverview(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get detailed insights for a specific report
const reportInsights = await client.insights.getInsights(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  'Actions.getPageUrls', // Report unique ID
  '',                   // No segment
  '5',                  // Limit increasers
  '5',                  // Limit decreasers
  '',                   // Filter by
  '2',                  // Min impact percent
  '20',                 // Min growth percent
  '1',                  // Compare to X periods ago
  'absolute'            // Order by
);

// Get movers and shakers for a specific report
const moversShakersData = await client.insights.getMoversAndShakers(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  'Actions.getPageUrls', // Report unique ID
  '',                   // No segment
  '1',                  // Compare to 1 period ago
  '4',                  // Limit increasers
  '4'                   // Limit decreasers
);
```

### Languages Manager Module

The `languagesManager` module provides methods for accessing translations and managing language preferences:

```typescript
// Check if a specific language is available
const isAvailable = await client.languagesManager.isLanguageAvailable('fr');

// Get all available language codes
const languages = await client.languagesManager.getAvailableLanguages();

// Get detailed information about available languages
const languagesInfo = await client.languagesManager.getAvailableLanguagesInfo();

// Get language names
const languageNames = await client.languagesManager.getAvailableLanguageNames();

// Get all translations for a specific language
const translations = await client.languagesManager.getTranslationsForLanguage('fr');

// Get language preference for a user
const userLanguage = await client.languagesManager.getLanguageForUser('admin');

// Set language preference for a user
await client.languagesManager.setLanguageForUser('admin', 'es');

// Check if a user uses 12-hour clock format
const uses12Hour = await client.languagesManager.uses12HourClockForUser('admin');

// Set 12-hour clock preference for a user
await client.languagesManager.set12HourClockForUser('admin', true);
```

### Live Module

The `live` module provides methods for accessing real-time visitor data and visit details:

```typescript
// Get visitor counters for the last 30 minutes
const counters = await client.live.getCounters(
  1,                    // Site ID
  30                    // Last minutes
);

// Get visitor counters with additional parameters
const filteredCounters = await client.live.getCounters(
  1,                    // Site ID
  30,                   // Last minutes
  'deviceType==mobile', // Segment
  ['visits', 'actions'], // Show columns
  ['visitsConverted']   // Hide columns
);

// Check if visitor profiles are enabled
const profilesEnabled = await client.live.isVisitorProfileEnabled(1);

// Get detailed information about the latest visits
const visitDetails = await client.live.getLastVisitsDetails(
  1,                    // Site ID
  'day',                // Period (optional)
  'today',              // Date (optional)
  '',                   // Segment (optional)
  10                    // Number of visitors to fetch
);

// Get visitor profile information
const profile = await client.live.getVisitorProfile(
  1,                    // Site ID
  'abc123',             // Visitor ID (optional)
  '',                   // Segment (optional)
  20                    // Limit visits (optional)
);

// Get the most recent visitor ID
const visitorId = await client.live.getMostRecentVisitorId(1);

// Get the timestamp of the most recent visit
const lastVisitTime = await client.live.getMostRecentVisitsDateTime(1);
```

### Login Module

The `login` module provides methods for managing login-related security features:

```typescript
// Unblock all IPs that were blocked due to brute force protection
await client.login.unblockBruteForceIPs();
```

### Marketing Campaigns Reporting Module

The `marketingCampaignsReporting` module provides methods for accessing marketing campaign analytics data:

```typescript
// Get campaign IDs
const campaignIds = await client.marketingCampaignsReporting.getId(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get campaign names
const campaignNames = await client.marketingCampaignsReporting.getName(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  '',                   // Segment (optional)
  true,                 // Expanded (optional)
  false                 // Flat (optional)
);

// Get campaign keywords
const keywords = await client.marketingCampaignsReporting.getKeyword(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get campaign sources
const sources = await client.marketingCampaignsReporting.getSource(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get campaign mediums
const mediums = await client.marketingCampaignsReporting.getMedium(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get campaign content
const content = await client.marketingCampaignsReporting.getContent(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get campaign source/medium combinations
const sourceMedium = await client.marketingCampaignsReporting.getSourceMedium(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  '',                   // Segment (optional)
  true,                 // Expanded (optional)
  false                 // Flat (optional)
);

// Get campaign names from a source/medium subtable
const namesFromSource = await client.marketingCampaignsReporting.getNameFromSourceMediumId(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  5,                    // Subtable ID
  ''                    // Segment (optional)
);
```

### Media Analytics Module

The `mediaAnalytics` module provides methods for accessing video and audio analytics data:

```typescript
// Check if there are any media analytics records
const hasMedia = await client.mediaAnalytics.hasRecords(1);

// Get overall media analytics data
const mediaData = await client.mediaAnalytics.get(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get real-time media plays count
const currentPlays = await client.mediaAnalytics.getCurrentNumPlays(
  1,                    // Site ID
  30                    // Last minutes
);

// Get real-time media watch time
const timeSpent = await client.mediaAnalytics.getCurrentSumTimeSpent(
  1,                    // Site ID
  30                    // Last minutes
);

// Get most popular media in real time
const popularMedia = await client.mediaAnalytics.getCurrentMostPlays(
  1,                    // Site ID
  30,                   // Last minutes
  5,                    // Limit
  'deviceType==desktop' // Segment (optional)
);

// Get video resources report
const videoResources = await client.mediaAnalytics.getVideoResources(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get audio resources report
const audioResources = await client.mediaAnalytics.getAudioResources(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get video titles report
const videoTitles = await client.mediaAnalytics.getVideoTitles(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get audio titles report
const audioTitles = await client.mediaAnalytics.getAudioTitles(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get video hours report (when videos are watched)
const videoHours = await client.mediaAnalytics.getVideoHours(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get video resolutions report
const resolutions = await client.mediaAnalytics.getVideoResolutions(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get media players report
const players = await client.mediaAnalytics.getPlayers(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);
```

### MobileMessaging Module

The `mobileMessaging` module provides methods for managing SMS API credentials, phone numbers, and sending SMS messages:

```typescript
// Check if SMS API credentials are provided
const hasCredentials = await client.mobileMessaging.areSMSAPICredentialProvided();

// Get the current SMS provider
const provider = await client.mobileMessaging.getSMSProvider();

// Set SMS API credentials
const credentialsSet = await client.mobileMessaging.setSMSAPICredential(
  'nexmo',                // Provider name
  {                       // Provider credentials
    apiKey: 'your-key',
    apiSecret: 'your-secret'
  }
);

// Add a phone number for verification
const phoneAdded = await client.mobileMessaging.addPhoneNumber('+1234567890');

// Resend verification code to a phone number
const codeSent = await client.mobileMessaging.resendVerificationCode('+1234567890');

// Get remaining SMS credit
const credits = await client.mobileMessaging.getCreditLeft();

// Get registered phone numbers
const phoneNumbers = await client.mobileMessaging.getPhoneNumbers();

// Remove a phone number
const removed = await client.mobileMessaging.removePhoneNumber('+1234567890');

// Validate a phone number with a verification code
const validated = await client.mobileMessaging.validatePhoneNumber('+1234567890', '123456');

// Delete SMS API credentials
const deleted = await client.mobileMessaging.deleteSMSAPICredential();

// Set delegated management
await client.mobileMessaging.setDelegatedManagement(true);

// Get delegated management status
const delegationEnabled = await client.mobileMessaging.getDelegatedManagement();
```

### MultiChannelConversionAttribution Module

The `multiChannelConversionAttribution` module provides methods for analyzing conversion attributions across multiple channels:

```typescript
// Enable attribution for a specific goal
const enabled = await client.multiChannelConversionAttribution.setGoalAttribution(1, 5, true);

// Check if a goal has attribution enabled
const isEnabled = await client.multiChannelConversionAttribution.getGoalAttribution(1, 5);

// Get channel attribution data for a specific goal
const attributionData = await client.multiChannelConversionAttribution.getChannelAttribution(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  5,                    // Goal ID
  '1',                  // Campaign dimension combination ID (optional)
  'referrer==google',   // Segment (optional)
  'true',               // Expanded (optional)
  'false',              // Flat (optional)
  ''                    // Subtable ID (optional)
);

// Get available campaign dimension combinations
const dimensions = await client.multiChannelConversionAttribution.getAvailableCampaignDimensionCombinations();

// Get all attribution goals for a site
const goals = await client.multiChannelConversionAttribution.getSiteAttributionGoals(1);
```

### MultiSites Module

The `multiSites` module provides methods for accessing metrics across multiple websites in the Matomo instance:

```typescript
// Get metrics for all sites
const allSites = await client.multiSites.getAll(
  'month',              // Period
  'last30',             // Date
  'deviceType==desktop', // Segment (optional)
  true,                 // Enhanced metrics (optional)
  'commerce',           // Pattern to filter sites (optional)
  ['nb_visits', 'revenue'] // Columns to include (optional)
);

// Get metrics for a specific site
const singleSite = await client.multiSites.getOne(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  'deviceType==desktop', // Segment (optional)
  true                  // Enhanced metrics (optional)
);

// Get metrics for all sites grouped by site groups
const siteGroups = await client.multiSites.getAllWithGroups(
  'month',              // Period (optional)
  'last30',             // Date (optional)
  'deviceType==desktop', // Segment (optional)
  'commerce',           // Pattern to filter sites (optional)
  10                    // Result limit (optional)
);
```

### Overlay Module

The `overlay` module provides methods for working with the Page Overlay visualization feature:

```typescript
// Get translations used by the Overlay
const translations = await client.overlay.getTranslations(1);

// Get pages that follow a given page in navigation paths
const followingPages = await client.overlay.getFollowingPages(
  'https://example.org/products',  // URL to analyze
  1,                    // Site ID
  'week',               // Period
  'last7',              // Date
  'deviceType==mobile'  // Segment (optional)
);
```

### PagePerformance Module

The `pagePerformance` module provides methods for analyzing page loading and rendering performance metrics:

```typescript
// Get page performance metrics
const performance = await client.pagePerformance.get(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  'deviceType==desktop' // Segment (optional)
);
```

### PrivacyManager Module

The `privacyManager` module provides methods for managing privacy-related features:

```typescript
// Delete data subjects (visits)
const result = await client.privacyManager.deleteDataSubjects([
  { id: 123, visitorId: 'abc' }
]);

// Export data subjects (visits)
const exportData = await client.privacyManager.exportDataSubjects([
  { id: 123, visitorId: 'abc' }
]);

// Find data subjects based on a segment
const subjects = await client.privacyManager.findDataSubjects(
  1,                    // Site ID
  'userId==abc123'      // Segment to search for
);

// Anonymize raw data
const anonymized = await client.privacyManager.anonymizeSomeRawData(
  [1, 2],               // Site IDs
  '2023-01-01',         // Date to anonymize
  '1',                  // Anonymize IP addresses
  '1',                  // Anonymize location
  '1',                  // Anonymize user IDs
  ['user_id', 'config_id'], // Visit columns to unset
  ['action_name'],      // Link visit action columns to unset
  'password123'         // Password confirmation
);

// Get available visit columns that can be anonymized
const visitColumns = await client.privacyManager.getAvailableVisitColumnsToAnonymize();

// Get available link visit action columns that can be anonymized
const actionColumns = await client.privacyManager.getAvailableLinkVisitActionColumnsToAnonymize();
```

### Referrers Module

The `referrers` module provides methods for accessing reports about websites, search engines, keywords, and campaigns:

```typescript
// Get referrers overview data
const overview = await client.referrers.get(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  '',                   // Segment (optional)
  'nb_visits,nb_uniq_visitors' // Columns (optional)
);

// Get referrer type data
const types = await client.referrers.getReferrerType(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  '',                   // Segment (optional)
  'direct',             // Type of referrer (optional)
  '',                   // Subtable ID (optional)
  true                  // Expanded (optional)
);

// Get all referrers data
const all = await client.referrers.getAll(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  ''                    // Segment (optional)
);

// Get keywords data
const keywords = await client.referrers.getKeywords(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  '',                   // Segment (optional)
  true,                 // Expanded (optional)
  false                 // Flat (optional)
);

// Get search engines from a keyword
const searchEngines = await client.referrers.getSearchEnginesFromKeywordId(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  5,                    // Subtable ID
  ''                    // Segment (optional)
);

// Get all search engines
const engines = await client.referrers.getSearchEngines(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  '',                   // Segment (optional)
  true,                 // Expanded (optional)
  false                 // Flat (optional)
);

// Get keywords for a search engine
const engineKeywords = await client.referrers.getKeywordsFromSearchEngineId(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  5,                    // Subtable ID
  ''                    // Segment (optional)
);

// Get all campaigns
const campaigns = await client.referrers.getCampaigns(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  '',                   // Segment (optional)
  true                  // Expanded (optional)
);

// Get keywords for a campaign
const campaignKeywords = await client.referrers.getKeywordsFromCampaignId(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  5,                    // Subtable ID
  ''                    // Segment (optional)
);

// Get referring websites
const websites = await client.referrers.getWebsites(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  '',                   // Segment (optional)
  true,                 // Expanded (optional)
  false                 // Flat (optional)
);

// Get URLs for a website referrer
const urls = await client.referrers.getUrlsFromWebsiteId(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  5,                    // Subtable ID
  ''                    // Segment (optional)
);

// Get social network referrers
const socials = await client.referrers.getSocials(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  '',                   // Segment (optional)
  true,                 // Expanded (optional)
  false                 // Flat (optional)
);

// Get URLs for a social network referrer
const socialUrls = await client.referrers.getUrlsForSocial(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  '',                   // Segment (optional)
  5                     // Subtable ID (optional)
);

// Get number of distinct search engines
const distinctEngines = await client.referrers.getNumberOfDistinctSearchEngines(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  ''                    // Segment (optional)
);

// Get number of distinct social networks
const distinctSocials = await client.referrers.getNumberOfDistinctSocialNetworks(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  ''                    // Segment (optional)
);

// Get number of distinct keywords
const distinctKeywords = await client.referrers.getNumberOfDistinctKeywords(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  ''                    // Segment (optional)
);

// Get number of distinct campaigns
const distinctCampaigns = await client.referrers.getNumberOfDistinctCampaigns(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  ''                    // Segment (optional)
);

// Get number of distinct websites
const distinctWebsites = await client.referrers.getNumberOfDistinctWebsites(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  ''                    // Segment (optional)
);

// Get number of distinct website URLs
const distinctUrls = await client.referrers.getNumberOfDistinctWebsitesUrls(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  ''                    // Segment (optional)
);
```

### Resolution Module

The `resolution` module provides methods for accessing screen resolution analytics:

```typescript
// Get screen resolution data
const resolutions = await client.resolution.getResolution(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  'deviceType==desktop' // Segment (optional)
);

// Get device configuration data
const configurations = await client.resolution.getConfiguration(
  1,                    // Site ID
  'month',              // Period
  'last30',             // Date
  'deviceType==desktop' // Segment (optional)
);
```

### RollUpReporting Module

The `rollUpReporting` module provides methods for managing roll-up reporting features:

```typescript
// Add a new roll-up site
const newRollUp = await client.rollUpReporting.addRollUp(
  'Combined Sites',     // Roll-up name
  [1, 2, 3],            // Source site IDs
  'UTC',                // Timezone
  'USD'                 // Currency
);

// Update an existing roll-up site
const updated = await client.rollUpReporting.updateRollUp(
  10,                   // Roll-up site ID
  'Updated Name',       // New name (optional)
  [1, 2, 4],            // New source site IDs (optional)
  'Europe/Berlin',      // New timezone (optional)
  'EUR'                 // New currency (optional)
);

// Get all roll-ups
const rollUps = await client.rollUpReporting.getRollUps();
```

### SEO Module

The `seo` module provides methods for accessing SEO metrics for a specified URL:

```typescript
// Get SEO metrics for a URL
const seoRank = await client.seo.getRank('https://example.com');
```

### ScheduledReports Module

The `scheduledReports` module provides methods for managing scheduled email reports:

```typescript
// Add a new scheduled report
const newReport = await client.scheduledReports.addReport(
  1,                    // Site ID
  'Weekly Overview',    // Report description
  'week',               // Period
  9,                    // Hour to send
  'email',              // Report type
  'pdf',                // Report format
  ['Actions.getPageUrls', 'Referrers.getWebsites'], // Reports to include
  { displayFormat: 'tables_only' } // Additional parameters
);

// Update an existing report
await client.scheduledReports.updateReport(
  1,                    // Report ID
  1,                    // Site ID
  'Updated Weekly Report', // New description
  'month',              // New period
  10,                   // New hour
  'email',              // Report type
  'html',               // New format
  ['VisitsSummary.get'], // New reports to include
  { displayFormat: 'tables_and_graphs' } // New parameters
);

// Delete a scheduled report
await client.scheduledReports.deleteReport(1);

// Get all scheduled reports
const reports = await client.scheduledReports.getReports();

// Get reports for a specific site
const siteReports = await client.scheduledReports.getReports(1, 'week');

// Generate a report immediately
const report = await client.scheduledReports.generateReport(
  1,                    // Report ID
  '2023-05-01',         // Date for the report
  'en',                 // Language
  'download'            // Output type
);

// Send a report immediately
await client.scheduledReports.sendReport(
  1,                    // Report ID
  'week',               // Period
  '2023-05-01',         // Date
  true                  // Force sending
);
```

### SearchEngineKeywordsPerformance Module

The `searchEngineKeywordsPerformance` module provides methods for accessing SEO search keywords and crawling data:

```typescript
// Get all search engine keywords
const keywords = await client.searchEngineKeywordsPerformance.getKeywords(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get Google search engine keywords
const googleKeywords = await client.searchEngineKeywordsPerformance.getKeywordsGoogle(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get Google Image search keywords
const imageKeywords = await client.searchEngineKeywordsPerformance.getKeywordsGoogleImage(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get Bing search engine keywords
const bingKeywords = await client.searchEngineKeywordsPerformance.getKeywordsBing(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get Yandex search engine keywords
const yandexKeywords = await client.searchEngineKeywordsPerformance.getKeywordsYandex(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get Bing crawling overview
const bingCrawling = await client.searchEngineKeywordsPerformance.getCrawlingOverviewBing(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get Yandex crawling overview
const yandexCrawling = await client.searchEngineKeywordsPerformance.getCrawlingOverviewYandex(
  1,                    // Site ID
  'month',              // Period
  'last30'              // Date
);

// Get Bing crawling error examples
const crawlingErrors = await client.searchEngineKeywordsPerformance.getCrawlingErrorExamplesBing(1);
```

### SegmentEditor Module

The `segmentEditor` module provides methods for managing custom segments:

```typescript
// Check if the user can add new segments
const canAdd = await client.segmentEditor.isUserCanAddNewSegment(1);

// Add a new segment
const segment = await client.segmentEditor.add(
  'Mobile Users',       // Segment name
  'deviceType==mobile', // Segment definition
  1,                    // Site ID (optional)
  true,                 // Auto archive (optional)
  false                 // Enable for all users (optional)
);

// Update an existing segment
await client.segmentEditor.update(
  1,                    // Segment ID
  'Mobile Users in US', // New name
  'deviceType==mobile;countryCode==US', // New definition
  1,                    // Site ID (optional)
  true,                 // Auto archive (optional)
  false                 // Enable for all users (optional)
);

// Delete a segment
await client.segmentEditor.delete(1);

// Get a specific segment
const segmentDetails = await client.segmentEditor.get(1);

// Get all segments
const segments = await client.segmentEditor.getAll();

// Get segments for a specific site
const siteSegments = await client.segmentEditor.getAll(1);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
