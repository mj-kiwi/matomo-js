import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerUserIdTools } from "./user-id.js";
import { registerTourTools } from "./tour.js";
import { registerTagManagerTools } from "./tag-manager.js";
import { registerSitesManagerTools } from "./sites-manager.js";

export function registerAllTools(server: McpServer): void {
  registerUserIdTools(server);
  registerTourTools(server);
  registerTagManagerTools(server);
  registerSitesManagerTools(server);
}
