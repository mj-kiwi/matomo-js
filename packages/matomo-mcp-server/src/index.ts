#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerAllTools } from "./tools/index.js";
import packageJson from "../package.json";

async function main() {
  // Create server instance
  const server = new McpServer({
    name: "matomo-mcp-server",
    version: packageJson.version,
    capabilities: {
      resources: {},
      tools: {},
    },
  });

  // Register all tools
  registerAllTools(server);

  // Connect to transport
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Matomo MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
