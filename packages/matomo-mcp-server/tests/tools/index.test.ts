import { describe, it, expect, vi, beforeEach } from "vitest";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAllTools } from "../../src/tools/index.js";
import { registerUserIdTools } from "../../src/tools/user-id.js";
import { registerTourTools } from "../../src/tools/tour.js";
import { registerTagManagerTools } from "../../src/tools/tag-manager.js";
import { registerSitesManagerTools } from "../../src/tools/sites-manager.js";

// Mock all the individual tool registration functions
vi.mock("../../src/tools/user-id.js", () => ({
  registerUserIdTools: vi.fn(),
}));

vi.mock("../../src/tools/tour.js", () => ({
  registerTourTools: vi.fn(),
}));

vi.mock("../../src/tools/tag-manager.js", () => ({
  registerTagManagerTools: vi.fn(),
}));

vi.mock("../../src/tools/sites-manager.js", () => ({
  registerSitesManagerTools: vi.fn(),
}));

describe("registerAllTools", () => {
  let server: McpServer;

  beforeEach(() => {
    // Create a new McpServer instance for each test
    server = new McpServer({
      name: "test-server",
      version: "0.0.1",
      capabilities: { resources: {}, tools: {} },
    });

    // Clear mock calls
    vi.clearAllMocks();
  });

  it("should register all tool modules", () => {
    registerAllTools(server);

    // Verify that each tool registration function was called with the server instance
    expect(registerUserIdTools).toHaveBeenCalledWith(server);
    expect(registerTourTools).toHaveBeenCalledWith(server);
    expect(registerTagManagerTools).toHaveBeenCalledWith(server);
    expect(registerSitesManagerTools).toHaveBeenCalledWith(server);
  });
});
