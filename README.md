# Matomo JS

A modern JavaScript/TypeScript client library for Matomo Analytics.

## Overview

This monorepo contains JavaScript/TypeScript libraries for interacting with Matomo Analytics. Built with TypeScript and structured as an Nx monorepo for optimal development experience.

## Packages

### Reporting Client (`@mj-kiwi/matomo-reporting-client`)

A TypeScript client for the Matomo Reporting API with strongly typed interfaces. This package provides a convenient way to interact with Matomo's Reporting API endpoints.

#### Features

- Modern, Promise-based API
- TypeScript support with full type definitions
- Modular design for flexible usage
- Tree-shakable (import only what you need)

#### Available Modules

- **Core** - Core reporting functionality
- **API** - General API operations
- **SitesManager** - Methods for managing sites
- **AbTesting** - Methods for A/B testing features

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

```bash
# Install the reporting client
npm install @mj-kiwi/matomo-reporting-client

# Or with yarn
yarn add @mj-kiwi/matomo-reporting-client
```

### Basic Usage

```typescript
import { ReportingClient } from '@mj-kiwi/matomo-reporting-client';

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

// Use individual modules directly if needed
const { SitesManagerModule } = require('@mj-kiwi/matomo-reporting-client');
const sitesManager = new SitesManagerModule({
  baseUrl: 'https://your-matomo-instance.com',
  apiKey: 'your-api-key',
});

const sites = await sitesManager.getAllSites();
```

## Development

This project is built using Nx, a smart build framework for monorepos.

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/yourusername/matomo-js.git
cd matomo-js

# Install dependencies
npm install

# Build all packages
npx nx run-many -t build
```

### Running Tests

```bash
# Run tests for all packages
npx nx run-many -t test

# Run tests for a specific package
npx nx test packages/reporting-client

```

### Local Development

You can use the local registry for testing:

```bash
# Start local registry
npx nx run local-registry

# In another terminal, publish to local registry
npx nx run-many -t publish --local
```

## License

MIT