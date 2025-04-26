# Matomo Reporting Client

A TypeScript client library for the [Matomo Reporting API](https://developer.matomo.org/api-reference/reporting-api).

[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Matomo](https://img.shields.io/badge/-Matomo-3152A0?style=flat-square&logo=matomo&logoColor=white)](https://matomo.org/)
[![Analytics](https://img.shields.io/badge/-Analytics-00A98F?style=flat-square&logo=google-analytics&logoColor=white)](https://matomo.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

This library provides a simple and typed interface to interact with the Matomo Analytics Reporting API, allowing you to fetch analytics data from your Matomo instance.

## Installation

```bash
npm install @mj-kiwi/matomo-client
```

## Usage

```typescript
import { ReportingClient } from '@mj-kiwi/matomo-client';

// Create a client instance
const client = new ReportingClient({
  baseUrl: 'https://matomo.example.org', // Matomo instance URL
  apiKey: 'your_auth_token', // Auth token for authenticated API requests
  idSite: 1, // Default site ID (optional)
});

// Use the client to fetch data
async function getVisitorData() {
  try {
    // Example: Get visits summary using the core module directly
    const visitors = await client.core.request('VisitsSummary.get', {
      idSite: 1, // Can override default idSite
      period: 'day',
      date: 'yesterday',
    });
    console.log('Visitors yesterday:', visitors);

    // Example: Using a dedicated module method
    const version = await client.api.getMatomoVersion();
    console.log('Matomo Version:', version);

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
  baseUrl: 'https://matomo.example.org', // Matomo instance URL

  // Optional
  apiKey: 'your_auth_token', // Auth token for authenticated API requests
  idSite: 1, // Default site ID to use when not specified in requests
  format: 'json', // Response format: 'json', 'xml', 'csv', 'tsv', 'html', 'rss', or 'original'
  language: 'en', // Language for API responses
  timeout: 30000, // Request timeout in milliseconds (default: 30000)
  axiosInstance: customAxios, // Custom Axios instance for special configurations
});
```

## Available Modules

The Matomo Reporting Client provides access to various Matomo Reporting API modules through properties on the client instance. Here are the available modules:

*   `core`: Core reporting functionality and direct API requests.
*   `api`: General API information (version, settings, metadata).
*   `sitesManager`: Managing sites.
*   `abTesting`: A/B testing features.
*   `actions`: Page views, downloads, outlinks, content tracking.
*   `activityLog`: User activity logs.
*   `advertisingConversionExport`: Advertising conversion exports.
*   `annotations`: Managing annotations.
*   `connectAccounts`: Integration with other platforms (e.g., GTM).
*   `contents`: Content interaction data.
*   `coreAdminHome`: Administrative tasks.
*   `crashAnalytics`: JavaScript error and crash analysis.
*   `customAlerts`: Custom alert definitions.
*   `customDimensions`: Custom dimensions management and reporting.
*   `customJsTracker`: Custom JavaScript tracker settings.
*   `customReports`: Custom report management and data retrieval.
*   `customVariables`: Custom variable data.
*   `dashboard`: Dashboard management.
*   `devicePlugins`: Browser plugin statistics.
*   `devicesDetection`: Visitor device reports (type, brand, model, OS, browser).
*   `events`: Custom event tracking and analysis.
*   `feedback`: User feedback submission and management.
*   `formAnalytics`: Form analytics data and management.
*   `funnels`: Conversion funnel analysis and management.
*   `goals`: Conversion goals, ecommerce tracking, and related metrics.
*   `heatmapSessionRecording`: Heatmap and session recording management and analysis.
*   `imageGraph`: Static PNG graph generation.
*   `insights`: Analytical insights generation.
*   `languagesManager`: Translations and language settings.
*   `live`: Real-time visitor data and visit details.
*   `login`: Authentication and security features.
*   `marketingCampaignsReporting`: Marketing campaign analytics.
*   `mediaAnalytics`: Video and audio analytics.
*   `mobileMessaging`: SMS API management and messaging.
*   `multiChannelConversionAttribution`: Multi-channel conversion attribution analysis.
*   `multiSites`: Metrics across multiple websites.
*   `overlay`: Page Overlay visualization data.
*   `pagePerformance`: Page loading and rendering performance metrics.
*   `privacyManager`: Data privacy management (GDPR tools).
*   `referrers`: Referrer reports (websites, search engines, campaigns, social).
*   `resolution`: Screen resolution reports.
*   `rollUpReporting`: Roll-up reporting features.
*   `scheduledReports`: Scheduled report management.
*   `searchEngineKeywordsPerformance`: SEO keyword performance.
*   `segmentEditor`: Segment management.
*   `seo`: SEO ranking reports.
*   `tagManager`: Tag manager functionality.
*   `tour`: Guided tour features.
*   `transitions`: Visitor navigation path analysis.
*   `twoFactorAuth`: Two-factor authentication management.
*   `userCountry`: Geographic data (country, continent, region).
*   `userId`: User ID tracking and reporting.
*   `userLanguage`: Visitor language reports.
*   `usersFlow`: User flow visualization.
*   `usersManager`: User management.
*   `visitFrequency`: Visitor frequency and recency metrics.
*   `visitTime`: Visitor time reports (local time, server time).
*   `visitorInterest`: Engagement metrics (visits by duration, pages per visit).
*   `visitsSummary`: Core visit metrics and statistics.

### Example: Using the SitesManager Module

```typescript
async function getSiteInfo() {
  try {
    const sites = await client.sitesManager.getSitesWithAdminAccess();
    console.log('Sites with admin access:', sites);

    const jsTag = await client.sitesManager.getJavascriptTag(1); // Get JS tag for site ID 1
    console.log('JavaScript Tag:', jsTag);
  } catch (error) {
    console.error('Error fetching site data:', error);
  }
}

getSiteInfo();
```

### Example: Using the VisitsSummary Module

```typescript
async function getVisitSummary() {
  try {
    const summary = await client.visitsSummary.get({
      idSite: 1,
      period: 'week',
      date: 'today',
    });
    console.log('Weekly Summary:', summary);
  } catch (error) {
    console.error('Error fetching visit summary:', error);
  }
}

getVisitSummary();
```

### Example: Using Batch Requests

Batch requests allow you to send multiple API requests in a single HTTP call, which can be more efficient.

```typescript
async function getMultipleDataPoints() {
  try {
    // Prepare a batch request
    const batch = client.prepareRequests();

    // Add requests to the batch using the module methods
    // Note: When using batch requests, the methods return the BatchRequest instance
    // for chaining, not the actual data directly.
    batch.api.getMatomoVersion(); // Request 1: Get Matomo version
    batch.visitsSummary.get({      // Request 2: Get visits summary
      idSite: 1,
      period: 'day',
      date: 'yesterday',
    });
    batch.sitesManager.getAllSites(); // Request 3: Get all sites

    // Send the batch request
    const results = await batch.send();

    // Results is an array containing the response for each request in order
    const matomoVersion = results[0].value; // Accessing result for request 1
    const visitsSummary = results[1];       // Accessing result for request 2
    const allSites = results[2];            // Accessing result for request 3

    console.log('Matomo Version (Batch):', matomoVersion);
    console.log('Visits Summary (Batch):', visitsSummary);
    console.log('All Sites (Batch):', allSites);

  } catch (error) {
    console.error('Error fetching batch data:', error);
  }
}

getMultipleDataPoints();
```

*Note: The examples above assume you have already initialized the `ReportingClient` as shown in the Usage section.*

## Contributing

Contributions are welcome! Please refer to the main repository README for contribution guidelines.

## License

MIT
