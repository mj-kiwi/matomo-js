import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAbTestingTools } from "./ab-testing/index.js";

export function registerAllTools(server: McpServer): void {
  registerAbTestingTools(server);
}
