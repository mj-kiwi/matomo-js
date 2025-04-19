# Matomo JS

A modern JavaScript/TypeScript client library for Matomo Analytics.

## Project Status

⚠️ **This project is still under construction.** APIs may change in the future as we continue to develop and refine the library. Please use with caution in production environments.

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

- **Core** - Core reporting functionality (`core`)
- **API** - General API operations (`api`)
- **SitesManager** - Methods for managing sites (`sitesManager`)
- **AbTesting** - Methods for A/B testing features (`abTesting`)
- **Actions** - Page views, content tracking (`actions`)
- **ActivityLog** - User activity logs (`activityLog`)
- **AdvertisingConversionExport** - Advertising conversion exports (`advertisingConversionExport`)
- **Annotations** - Managing annotations (`annotations`)
- **ConnectAccounts** - Integration with other platforms (`connectAccounts`)
- **Contents** - Content interaction data (`contents`)
- **CoreAdminHome** - Administrative tasks (`coreAdminHome`)
- **CrashAnalytics** - JavaScript error tracking (`crashAnalytics`)
- **CustomAlerts** - Custom alert definitions (`customAlerts`)
- **CustomDimensions** - Custom dimensions tracking (`customDimensions`)
- **CustomJsTracker** - Custom JS tracker functionality (`customJsTracker`)
- **CustomReports** - Custom report management (`customReports`)
- **CustomVariables** - Custom variables data (`customVariables`)
- **Dashboard** - Dashboard management (`dashboard`)
- **DevicePlugins** - Browser plugin statistics (`devicePlugins`)
- **DevicesDetection** - Visitor device reports (`devicesDetection`)
- **Events** - Event tracking and analysis (`events`)
- **Feedback** - User feedback submission (`feedback`)
- **FormAnalytics** - Form interaction data (`formAnalytics`)
- **Funnels** - Conversion funnel analysis (`funnels`)
- **Goals** - Conversion goals and ecommerce (`goals`)
- **HeatmapSessionRecording** - Heatmaps and session recordings (`heatmapSessionRecording`)
- **ImageGraph** - Static PNG graph generation (`imageGraph`)
- **Insights** - Analytical insights generation (`insights`)
- **LanguagesManager** - Translations and language settings (`languagesManager`)
- **Live** - Real-time visitor data (`live`)
- **Login** - Authentication methods (`login`)
- **MarketingCampaignsReporting** - Marketing campaign data (`marketingCampaignsReporting`)
- **MediaAnalytics** - Media engagement stats (`mediaAnalytics`)
- **MobileMessaging** - Mobile messaging integration (`mobileMessaging`)
- **MultiChannelConversionAttribution** - Multi-channel attribution (`multiChannelConversionAttribution`)
- **MultiSites** - Multi-site summary data (`multiSites`)
- **Overlay** - Page overlay reports (`overlay`)
- **PagePerformance** - Page load metrics (`pagePerformance`)
- **PrivacyManager** - Data privacy management (`privacyManager`)
- **Referrers** - Traffic sources (`referrers`)
- **Resolution** - Screen resolution reports (`resolution`)
- **RollUpReporting** - Roll-up reporting features (`rollUpReporting`)
- **ScheduledReports** - Scheduled report management (`scheduledReports`)
- **SearchEngineKeywordsPerformance** - SEO keywords (`searchEngineKeywordsPerformance`)
- **SegmentEditor** - Segment management (`segmentEditor`)
- **Seo** - SEO ranking reports (`seo`)
- **TagManager** - Tag manager functionality (`tagManager`)
- **Tour** - Guided tour features (`tour`)
- **Transitions** - Visitor navigation paths (`transitions`)
- **TwoFactorAuth** - Two-factor authentication management (`twoFactorAuth`)
- **UserCountry** - Geographic data (`userCountry`)
- **UserId** - User ID tracking (`userId`)
- **UserLanguage** - Visitor language reports (`userLanguage`)
- **UsersFlow** - User flow visualization (`usersFlow`)
- **UsersManager** - User management (`usersManager`)
- **VisitFrequency** - Visitor frequency metrics (`visitFrequency`)
- **VisitTime** - Visitor time reports (`visitTime`)
- **VisitorInterest** - Engagement metrics (`visitorInterest`)
- **VisitsSummary** - Visit metrics and statistics (`visitsSummary`)

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