import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock client module before importing any other modules
vi.mock("../../src/client.js", () => ({
  getMatomoClient: vi.fn().mockReturnValue({
    userId: {
      getUsers: vi.fn().mockResolvedValue([
        { userId: "user1", lastActionDateTime: "2023-04-21 12:00:00" },
        { userId: "user2", lastActionDateTime: "2023-04-21 14:30:00" },
      ]),
    },
  }),
}));

// Imports after mocking
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerUserIdTools } from "../../src/tools/user-id.js";
import { getMatomoClient } from "../../src/client.js";

// Import test setup
import "../setup";

describe("User ID Tools", () => {
  let server: McpServer;
  let toolSpy: vi.SpyInstance;
  let mockGetUsers: vi.Mock;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Get reference to the mocked method
    mockGetUsers = getMatomoClient().userId.getUsers as vi.Mock;

    // Create a new McpServer instance for each test
    server = new McpServer({
      name: "test-server",
      version: "0.0.1",
      capabilities: { resources: {}, tools: {} },
    });

    // Spy on the server.tool method to verify it's being called correctly
    toolSpy = vi.spyOn(server, "tool");

    // Register the user ID tools
    registerUserIdTools(server);
  });

  it("should register matomo_user_id_get_users tool", () => {
    expect(toolSpy).toHaveBeenCalledWith(
      "matomo_user_id_get_users",
      "Get a list of all user IDs available in Matomo",
      expect.any(Object),
      expect.any(Function)
    );
  });

  it("should call the matomo client with correct parameters when getting user IDs", async () => {
    // Find the tool handler function that was registered
    const toolHandler = toolSpy.mock.calls.find(
      (call) => call[0] === "matomo_user_id_get_users"
    )?.[3];

    expect(toolHandler).toBeDefined();

    const testParams = {
      idSite: 1,
      period: "day",
      date: "2023-04-21",
      segment: "actions>1",
    };

    // Call the tool handler with test parameters
    const result = await toolHandler(testParams);

    // Verify the client method was called with correct parameters
    expect(getMatomoClient).toHaveBeenCalled();
    expect(mockGetUsers).toHaveBeenCalledWith(testParams);

    // Verify the result structure
    expect(result).toEqual({
      content: [
        {
          type: "text",
          text: JSON.stringify(
            [
              { userId: "user1", lastActionDateTime: "2023-04-21 12:00:00" },
              { userId: "user2", lastActionDateTime: "2023-04-21 14:30:00" },
            ],
            null,
            2
          ),
        },
      ],
    });
  });

  it("should handle errors when fetching user IDs", async () => {
    const toolHandler = toolSpy.mock.calls.find(
      (call) => call[0] === "matomo_user_id_get_users"
    )?.[3];

    // Mock client to throw error for this test
    mockGetUsers.mockRejectedValueOnce(new Error("API error"));

    await expect(
      toolHandler({
        idSite: 1,
        period: "day",
        date: "2023-04-21",
      })
    ).rejects.toThrow("API error");
  });
});
