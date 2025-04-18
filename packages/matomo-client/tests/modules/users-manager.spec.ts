import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  UsersManagerModule,
  CoreReportingClient,
} from "@mj-kiwi/matomo-client";

// Mock CoreReportingClient
vi.mock(import("@mj-kiwi/matomo-client"), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe("UsersManagerModule", () => {
  let usersManagerModule: UsersManagerModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and UsersManager module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    usersManagerModule = new UsersManagerModule(clientInstance);
  });

  describe("getAvailableRoles", () => {
    it("should call the API", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.getAvailableRoles();

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.getAvailableRoles",
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getAvailableCapabilities", () => {
    it("should call the API", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.getAvailableCapabilities();

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.getAvailableCapabilities",
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("setUserPreference", () => {
    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.setUserPreference(
        "user1",
        "defaultReport",
        "MultiSites"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.setUserPreference",
        {
          userLogin: "user1",
          preferenceName: "defaultReport",
          preferenceValue: "MultiSites",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getUserPreference", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await usersManagerModule.getUserPreference("defaultReport");

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.getUserPreference",
        {
          preferenceName: "defaultReport",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.getUserPreference(
        "defaultReport",
        "user1"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.getUserPreference",
        {
          preferenceName: "defaultReport",
          userLogin: "user1",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getUsersPlusRole", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.getUsersPlusRole(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.getUsersPlusRole",
        {
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.getUsersPlusRole(
        1,
        10,
        20,
        "searchTerm",
        "view",
        "active"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.getUsersPlusRole",
        {
          idSite: 1,
          limit: 10,
          offset: 20,
          filter_search: "searchTerm",
          filter_access: "view",
          filter_status: "active",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  // Sample tests for a few more methods - in a real implementation,
  // you would typically test all methods

  describe("getUsers", () => {
    it("should call the API with no parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.getUsers();

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.getUsers",
        {}
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with userLogins parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.getUsers(["user1", "user2"]);

      expect(mockClient.request).toHaveBeenCalledWith("UsersManager.getUsers", {
        userLogins: ["user1", "user2"],
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getUsersLogin", () => {
    it("should call the API", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.getUsersLogin();

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.getUsersLogin",
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getUsersSitesFromAccess", () => {
    it("should call the API with access parameter", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.getUsersSitesFromAccess("view");

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.getUsersSitesFromAccess",
        {
          access: "view",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("setUserAccess", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.setUserAccess(
        "user1",
        "view",
        [1, 2, 3]
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.setUserAccess",
        {
          userLogin: "user1",
          access: "view",
          idSites: [1, 2, 3],
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with password confirmation", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.setUserAccess(
        "user1",
        "view",
        [1, 2, 3],
        "password123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.setUserAccess",
        {
          userLogin: "user1",
          access: "view",
          idSites: [1, 2, 3],
          passwordConfirmation: "password123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("addUser", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.addUser(
        "newuser",
        "password123",
        "user@example.com"
      );

      expect(mockClient.request).toHaveBeenCalledWith("UsersManager.addUser", {
        userLogin: "newuser",
        password: "password123",
        email: "user@example.com",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.addUser(
        "newuser",
        "password123",
        "user@example.com",
        1,
        "password123"
      );

      expect(mockClient.request).toHaveBeenCalledWith("UsersManager.addUser", {
        userLogin: "newuser",
        password: "password123",
        email: "user@example.com",
        initialIdSite: 1,
        passwordConfirmation: "password123",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateUser", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.updateUser("user1");

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.updateUser",
        {
          userLogin: "user1",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.updateUser(
        "user1",
        "newpassword",
        "newemail@example.com",
        "password123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.updateUser",
        {
          userLogin: "user1",
          password: "newpassword",
          email: "newemail@example.com",
          passwordConfirmation: "password123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
