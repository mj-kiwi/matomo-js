# Matomo JS

A modern JavaScript/TypeScript client library for Matomo Analytics.

## Overview

This monorepo contains JavaScript/TypeScript libraries for interacting with Matomo Analytics. Built with TypeScript and structured as an Nx monorepo for optimal development experience.

## Packages

### Reporting Client (`@mj-kiwi/matomo-client`)

A TypeScript client for the Matomo Reporting API with strongly typed interfaces. This package provides a convenient way to interact with Matomo's Reporting API endpoints.

#### Features

- Modern, Promise-based API
- TypeScript support with full type definitions
- Modular design for flexible usage
- Tree-shakable (import only what you need)

#### Available Modules

The reporting client includes modules for all major Matomo API endpoints, including:

- **Core** - Core reporting functionality
- **API** - General API operations
- **SitesManager** - Methods for managing sites
- **AbTesting** - Methods for A/B testing features
- **Actions** - Page views, content tracking
- **Events** - Event tracking and analysis
- **Goals** - Conversion goals and funnels
- **VisitsSummary** - Visit metrics and statistics
- **UserCountry** - Geographic data
- **Referrers** - Traffic sources
- **CustomDimensions** - Custom dimensions tracking
- **CustomVariables** - Custom variables
- **MediaAnalytics** - Media engagement stats
- **HeatmapSessionRecording** - User behavior recordings
- **TagManager** - Tag manager functionality
- **FormAnalytics** - Form interaction data
- **RollUpReporting** - Roll-up reporting features
- **SearchEngineKeywordsPerformance** - SEO keywords
- **PagePerformance** - Page load metrics
- **VisitorInterest** - Engagement metrics

And many more modules for comprehensive Matomo API coverage.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm, yarn, or pnpm

### Installation

```bash
# Install the reporting client
npm install @mj-kiwi/matomo-client

# Or with yarn
yarn add @mj-kiwi/matomo-client

# Or with pnpm
pnpm add @mj-kiwi/matomo-client
```

### Basic Usage

```typescript
import { ReportingClient } from '@mj-kiwi/matomo-client';

// Create a reporting client instance
const client = new ReportingClient({
  baseUrl: 'https://your-matomo-instance.com',
  apiKey: 'your-api-key', // if using token-auth
});

// Fetch site analytics data
const siteData = await client.core.getVisits({
  idSite: 1,
  period: 'day',
  date: 'yesterday',
});
```


## License

MIT