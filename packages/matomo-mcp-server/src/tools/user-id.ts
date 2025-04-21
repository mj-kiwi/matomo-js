import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getMatomoClient } from "../client.js";

export const registerUserIdTools = (server: McpServer): void => {
  /**
   * Get all user IDs
   */
  server.tool(
    "matomo_user_id_get_users",
    "Get a list of all user IDs available in Matomo",
    {
      idSite: z.number().or(z.string()).describe("Site ID to fetch"),
      period: z
        .enum(["day", "week", "month", "year", "range"])
        .default("day")
        .describe("Period to fetch"),
      date: z.string().describe("Date to fetch"),
      segment: z.string().optional().describe("Segment to fetch"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.userId.getUsers(params);
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(error.message || "An error occurred fetching user IDs");
      }
    }
  );
};
