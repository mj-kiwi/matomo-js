import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getMetricsOverview } from "./getMetricsOverview.js";

export function registerAbTestingTools(server: McpServer): void {
  server.tool(
    getMetricsOverview.name,
    getMetricsOverview.description,
    getMetricsOverview.paramsSchema,
    getMetricsOverview.callback
  );
}
