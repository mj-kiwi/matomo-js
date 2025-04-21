import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerAllTools } from "../src/tools/index.js";

// Create mock instances that we can reference in tests
const mockServer = {
  connect: vi.fn().mockResolvedValue(undefined),
  capabilities: {},
};

const mockTransport = {};

// Mock McpServer and StdioServerTransport
vi.mock("@modelcontextprotocol/sdk/server/mcp.js", () => ({
  McpServer: vi.fn().mockImplementation(() => mockServer),
}));

vi.mock("@modelcontextprotocol/sdk/server/stdio.js", () => ({
  StdioServerTransport: vi.fn().mockImplementation(() => mockTransport),
}));

// Mock the tools registration
vi.mock("../src/tools/index.js", () => ({
  registerAllTools: vi.fn(),
}));

// Mock console.error to capture log messages
const originalConsoleError = console.error;
let consoleErrorMock: vi.SpyInstance;

describe("MCP Server", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

    // Force re-importing the module for each test to execute main()
    vi.resetModules();
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
    console.error = originalConsoleError;
  });

  it("should create an MCP server with correct configuration", async () => {
    // Import and run the main module
    await import("../src/index.js");

    // Verify the server was created with the correct configuration
    expect(McpServer).toHaveBeenCalledWith({
      name: "matomo-mcp-server",
      version: "0.1.0",
      capabilities: {
        resources: {},
        tools: {},
      },
    });
  });

  it("should register all tools", async () => {
    // Import and run the main module
    await import("../src/index.js");

    // Verify that registerAllTools was called with the server instance
    expect(registerAllTools).toHaveBeenCalledWith(mockServer);
  });

  it("should connect to the stdio transport", async () => {
    // Import and run the main module
    await import("../src/index.js");

    // Verify that StdioServerTransport was instantiated
    expect(StdioServerTransport).toHaveBeenCalled();

    // Verify that server.connect was called with the transport instance
    expect(mockServer.connect).toHaveBeenCalledWith(mockTransport);
  });

  it("should log an error message when running", async () => {
    // Import and run the main module
    await import("../src/index.js");

    // Verify that the correct log message was printed
    expect(console.error).toHaveBeenCalledWith(
      "Matomo MCP Server running on stdio"
    );
  });
});
