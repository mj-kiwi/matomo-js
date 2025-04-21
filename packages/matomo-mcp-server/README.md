# Matomo MCP Server

**⚠️ This package is currently under construction and may not be fully functional. ⚠️**

This package implements a Model Context Protocol (MCP) server that acts as a bridge between an AI agent (like a large language model) and a Matomo analytics instance. It exposes Matomo Reporting API functionalities as MCP tools.

## Configuration

The server requires connection details for your Matomo instance. Configure these using environment variables:

-   `MATOMO_URL`: The base URL of your Matomo instance (e.g., `https://your-matomo.example.com`).
-   `MATOMO_AUTH_TOKEN`: Your Matomo API authentication token.
-   `MATOMO_DEFAULT_SITE_ID`: (Optional) The default Matomo site ID to use if not specified in a tool call. Defaults to `1`.

If these variables are not set, the server will use placeholder values and print a warning.

## Running the Server

You can run the server directly using Node.js:

```bash
node build/index.js
```

Or, if you have configured it as an executable in `package.json`:

```bash
matomo-mcp-server
```

The server communicates over standard input/output (stdio).

## Available Tools


## Module Implementation Status

Below is a checklist showing the implementation status of all Matomo API modules in the MCP server:

- [X] **SitesManager**
- [ ] **AbTesting**
- [ ] **Actions**
- [ ] **ActivityLog**
- [ ] **AdvertisingConversionExport**
- [ ] **Annotations**
- [ ] **Api**
- [ ] **ConnectAccounts**
- [ ] **Contents**
- [ ] **CoreAdminHome**
- [ ] **CrashAnalytics**
- [ ] **CustomAlerts**
- [ ] **CustomDimensions**
- [ ] **CustomJsTracker**
- [ ] **CustomReports**
- [ ] **CustomVariables**
- [ ] **Dashboard**
- [ ] **DevicePlugins**
- [ ] **DevicesDetection**
- [ ] **Events**
- [ ] **Feedback**
- [ ] **FormAnalytics**
- [ ] **Funnels**
- [ ] **Goals**
- [ ] **HeatmapSessionRecording**
- [ ] **ImageGraph**
- [ ] **Insights**
- [ ] **LanguagesManager**
- [ ] **Live**
- [ ] **Login**
- [ ] **MarketingCampaignsReporting**
- [ ] **MediaAnalytics**
- [ ] **MobileMessaging**
- [ ] **MultiChannelConversionAttribution**
- [ ] **MultiSites** 
- [ ] **Overlay**
- [ ] **PagePerformance**
- [ ] **PrivacyManager**
- [ ] **Referrers**
- [ ] **Resolution**
- [ ] **RollUpReporting**
- [ ] **ScheduledReports**
- [ ] **SearchEngineKeywordsPerformance**
- [ ] **SegmentEditor**
- [ ] **Seo**
- [X] **TagManager**
- [X] **Tour**
- [ ] **Transitions**
- [ ] **TwoFactorAuth**
- [ ] **UserCountry**
- [X] **UserId**
- [ ] **UserLanguage**
- [ ] **UsersFlow**
- [ ] **UsersManager**
- [ ] **VisitFrequency**
- [ ] **VisitTime**
- [ ] **VisitorInterest**
- [ ] **VisitsSummary**

Overall progress: 4 modules implemented out of 47 total modules (8.5% complete).
