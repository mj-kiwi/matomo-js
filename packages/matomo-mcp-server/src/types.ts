import { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ZodRawShape } from "zod";

export type Tool<Args extends ZodRawShape> = {
  name: string;
  description: string;
  paramsSchema: Args;
  callback: ToolCallback<Args>;
};
