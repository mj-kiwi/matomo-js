#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { ReportingClient } from "@mj-kiwi/matomo-client"; // Import ReportingClient

// --- Configuration ---
// TODO: Replace with actual configuration or secure retrieval method
const MATOMO_URL = process.env.MATOMO_URL || "YOUR_MATOMO_URL";
const MATOMO_AUTH_TOKEN = process.env.MATOMO_AUTH_TOKEN || "YOUR_AUTH_TOKEN";
const DEFAULT_SITE_ID = process.env.MATOMO_DEFAULT_SITE_ID || "1"; // Default site ID if needed

if (
  MATOMO_URL === "YOUR_MATOMO_URL" ||
  MATOMO_AUTH_TOKEN === "YOUR_AUTH_TOKEN"
) {
  console.warn(
    "Warning: Matomo URL or Auth Token not configured. Using placeholder values."
  );
  console.warn(
    "Please set MATOMO_URL and MATOMO_AUTH_TOKEN environment variables."
  );
}

// Instantiate Matomo Client
const matomoClient = new ReportingClient({
  url: MATOMO_URL,
  tokenAuth: MATOMO_AUTH_TOKEN,
  idSite: parseInt(DEFAULT_SITE_ID, 10), // Default site ID, can be overridden in tools
});

// Create server instance
const server = new McpServer({
  name: "matomo-mcp-server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// --- MCP Tools ---

// Example: Get All Sites
server.tool(
  "sitesManager_getAllSites",
  "Retrieves a list of all websites configured in Matomo.",
  {}, // No input parameters needed for getAllSites
  async () => {
    try {
      const sites = await matomoClient.sitesManager.getAllSites();
      // Format the output for the LLM
      const formattedSites = sites
        .map(
          (site: { idsite: any; name: any; main_url: any }) =>
            `ID: ${site.idsite}, Name: ${site.name}, Main URL: ${site.main_url}`
        )
        .join("\n");

      if (!formattedSites) {
        return { content: [{ type: "text", text: "No sites found." }] };
      }

      return {
        content: [
          {
            type: "text",
            text: `Found ${sites.length} sites:\n${formattedSites}`,
          },
        ],
      };
    } catch (error: any) {
      console.error("Error calling SitesManager.getAllSites:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error retrieving sites: ${error.message || "Unknown error"}`,
          },
        ],
      };
    }
  }
);

// TODO: Add more SitesManager tools (e.g., getSiteFromId, getSitesWithAdminAccess)

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Matomo MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
