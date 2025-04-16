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

## Building

Run `nx build reporting-client` to build the library.

## Running Unit Tests

Run `nx test reporting-client` to execute the unit tests via [Vitest](https://vitest.dev/).

## License

MIT
