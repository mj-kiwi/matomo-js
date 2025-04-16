# Matomo Reporting Client

A TypeScript client library for the [Matomo Reporting API](https://developer.matomo.org/api-reference/reporting-api).

This library provides a simple and typed interface to interact with the Matomo Analytics Reporting API, allowing you to fetch analytics data from your Matomo instance.

## Installation

```bash
npm install @matomo-js/reporting-client
```

## Usage

### Basic Usage

```typescript
import { MatomoReportingClient } from '@matomo-js/reporting-client';

// Create a new client
const client = new MatomoReportingClient({
  url: 'https://your-matomo-instance.com',
  tokenAuth: 'your-auth-token', // Optional
  idSite: 1                     // Default site ID
});

// Get the Matomo version
const version = await client.getMatomoVersion();
console.log(`Matomo version: ${version}`);

// Get visits summary
const visitsSummary = await client.getVisitsSummary({
  period: 'day',
  date: 'yesterday'
});
console.log(`Visits yesterday: ${visitsSummary.nb_visits}`);
```

### Configuration Options

```typescript
const client = new MatomoReportingClient({
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
const version = await client.getMatomoVersion();

// Get sites information
const sites = await client.getSitesInfo();

// Get API metadata
const metadata = await client.getMetadata();

// Get report metadata
const reportMetadata = await client.getReportMetadata();
```

#### Visits and Traffic

```typescript
// Get visits summary
const summary = await client.getVisitsSummary({
  period: 'day',
  date: 'yesterday'
});

// Get unique visitors
const visitors = await client.getUniqueVisitors({
  period: 'month',
  date: 'last30'
});

// Get live visitor count
const liveCount = await client.getLiveVisitorCount(1, 30); // Site ID 1, last 30 minutes
```

#### User Demographics and Devices

```typescript
// Get visitor countries
const countries = await client.getUserCountry({
  period: 'month',
  date: 'last30'
});

// Get visitor devices
const devices = await client.getUserDevices({
  period: 'month',
  date: 'last30'
});

// Get visitor browsers
const browsers = await client.getUserBrowsers({
  period: 'month',
  date: 'last30'
});
```

#### Content and Pages

```typescript
// Get page URLs
const pageUrls = await client.getPageUrls({
  period: 'month',
  date: 'last30'
});

// Get page titles
const pageTitles = await client.getPageTitles({
  period: 'month',
  date: 'last30'
});
```

#### Advanced Usage: Bulk Requests

You can make multiple API requests in a single HTTP call using `bulkRequest`:

```typescript
const results = await client.bulkRequest({
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
const result = await client.request('CustomDimensions.getCustomDimension', {
  idDimension: 1,
  period: 'day',
  date: 'yesterday'
});
```

## Building

Run `nx build reporting-client` to build the library.

## Running Unit Tests

Run `nx test reporting-client` to execute the unit tests via [Vitest](https://vitest.dev/).

## License

MIT
