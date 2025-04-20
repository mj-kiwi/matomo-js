import { z } from "zod";
import { getMatomoClient } from "../../client.js";
import { Tool } from "../../types.js";

const ArgsSchema = {
  idSite: z
    .number()
    .or(z.string())
    .describe(
      "The ID of the site to get A/B tests for. Uses default if not specified."
    ),
  period: z
    .enum(["day", "week", "month", "year", "range"])
    .default("day")
    .describe("The period to get metrics for. Defaults to 'day'."),
  date: z.string().describe("The date to get metrics for. Defaults to today."),
  idExperiment: z
    .number()
    .or(z.string())
    .describe("The ID of the experiment to get metrics for."),
  segment: z.string().optional().describe("The segment to filter metrics by."),
};

export const getMetricsOverview: Tool<typeof ArgsSchema> = {
  name: "AbTesting.getMetricsOverview",
  description: "Get metrics overview for an experiment",
  paramsSchema: ArgsSchema,
  callback: async (param) => {
    try {
      const client = getMatomoClient();
      const result = await client.abTesting.getMetricsOverview(param);

      if (!result || result.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "No A/B tests found.",
            },
          ],
        };
      }

      const formattedTests = result
        .map(
          (item: any) =>
            `ID: ${item.idtest}, Name: ${item.name}, Status: ${item.status}`
        )
        .join("\n");

      return {
        content: [
          {
            type: "text",
            text: `Found ${result.length} A/B tests:\n${formattedTests}`,
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `Error parsing input: ${error.message || "Unknown error"}`,
          },
        ],
      };
    }
  },
};
