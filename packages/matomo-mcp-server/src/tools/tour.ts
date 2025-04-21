import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getMatomoClient } from "../client.js";

export const registerTourTools = (server: McpServer): void => {
  /**
   * Get the list of challenges
   */
  server.tool(
    "matomo_tour_get_challenges",
    "Get the list of challenges in Matomo Tour plugin",
    {},
    async () => {
      const client = getMatomoClient();
      try {
        const results = await client.tour.getChallenges();
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching tour challenges"
        );
      }
    }
  );

  /**
   * Skip a challenge
   */
  server.tool(
    "matomo_tour_skip_challenge",
    "Skip a specific challenge in Matomo Tour plugin",
    {
      id: z
        .union([z.string(), z.number()])
        .describe("The ID of the challenge to skip"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.tour.skipChallenge({ id: params.id });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred skipping the challenge"
        );
      }
    }
  );

  /**
   * Get the current level
   */
  server.tool(
    "matomo_tour_get_level",
    "Get the current level in Matomo Tour plugin",
    {},
    async () => {
      const client = getMatomoClient();
      try {
        const results = await client.tour.getLevel();
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching the tour level"
        );
      }
    }
  );
};
