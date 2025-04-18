import { describe, it, expect, vi, beforeEach } from "vitest";
import { UsersManagerModule, CoreReportingClient } from "../../../src/index";

// Mock CoreReportingClient
vi.mock(import("../../../src/index"), async (importOriginal) => {
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

    it("should call the API with a single userLogin", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.getUsers("user1");

      expect(mockClient.request).toHaveBeenCalledWith("UsersManager.getUsers", {
        userLogins: "user1",
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

  describe("getUsersAccessFromSite", () => {
    it("should call the API with site ID", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.getUsersAccessFromSite(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.getUsersAccessFromSite",
        {
          idSite: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getUsersWithSiteAccess", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.getUsersWithSiteAccess(1, "view");

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.getUsersWithSiteAccess",
        {
          idSite: 1,
          access: "view",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getSitesAccessFromUser", () => {
    it("should call the API with user login", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.getSitesAccessFromUser("user1");

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.getSitesAccessFromUser",
        {
          userLogin: "user1",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getSitesAccessForUser", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.getSitesAccessForUser("user1");

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.getSitesAccessForUser",
        {
          userLogin: "user1",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.getSitesAccessForUser(
        "user1",
        10,
        20,
        "searchTerm",
        "view"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.getSitesAccessForUser",
        {
          userLogin: "user1",
          limit: 10,
          offset: 20,
          filter_search: "searchTerm",
          filter_access: "view",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getUser", () => {
    it("should call the API with user login", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.getUser("user1");

      expect(mockClient.request).toHaveBeenCalledWith("UsersManager.getUser", {
        userLogin: "user1",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getUserByEmail", () => {
    it("should call the API with user email", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await usersManagerModule.getUserByEmail("user@example.com");

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.getUserByEmail",
        {
          userEmail: "user@example.com",
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

  describe("inviteUser", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.inviteUser(
        "newuser",
        "user@example.com"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.inviteUser",
        {
          userLogin: "newuser",
          email: "user@example.com",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.inviteUser(
        "newuser",
        "user@example.com",
        1,
        30,
        "password123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.inviteUser",
        {
          userLogin: "newuser",
          email: "user@example.com",
          initialIdSite: 1,
          expiryInDays: 30,
          passwordConfirmation: "password123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("setSuperUserAccess", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.setSuperUserAccess("user1", true);

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.setSuperUserAccess",
        {
          userLogin: "user1",
          hasSuperUserAccess: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with password confirmation", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.setSuperUserAccess(
        "user1",
        false,
        "password123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.setSuperUserAccess",
        {
          userLogin: "user1",
          hasSuperUserAccess: false,
          passwordConfirmation: "password123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("hasSuperUserAccess", () => {
    it("should call the API", async () => {
      const mockResponse = { data: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.hasSuperUserAccess();

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.hasSuperUserAccess",
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getUsersHavingSuperUserAccess", () => {
    it("should call the API", async () => {
      const mockResponse = { data: ["user1", "user2"] };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.getUsersHavingSuperUserAccess();

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.getUsersHavingSuperUserAccess",
        {}
      );
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

    it("should call the API with some optional parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.updateUser(
        "user1",
        "newpassword",
        "",
        "password123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.updateUser",
        {
          userLogin: "user1",
          password: "newpassword",
          passwordConfirmation: "password123",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with email only", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.updateUser(
        "user1",
        "",
        "newemail@example.com"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.updateUser",
        {
          userLogin: "user1",
          email: "newemail@example.com",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteUser", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.deleteUser("user1");

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.deleteUser",
        {
          userLogin: "user1",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with password confirmation", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.deleteUser(
        "user1",
        "password123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.deleteUser",
        {
          userLogin: "user1",
          passwordConfirmation: "password123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("userExists", () => {
    it("should call the API with user login", async () => {
      const mockResponse = { data: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.userExists("user1");

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.userExists",
        {
          userLogin: "user1",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("userEmailExists", () => {
    it("should call the API with user email", async () => {
      const mockResponse = { data: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await usersManagerModule.userEmailExists("user@example.com");

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.userEmailExists",
        {
          userEmail: "user@example.com",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getUserLoginFromUserEmail", () => {
    it("should call the API with user email", async () => {
      const mockResponse = { data: "user1" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result =
        await usersManagerModule.getUserLoginFromUserEmail("user@example.com");

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.getUserLoginFromUserEmail",
        {
          userEmail: "user@example.com",
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

    it("should call the API with a single site ID", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.setUserAccess("user1", "view", 1);

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.setUserAccess",
        {
          userLogin: "user1",
          access: "view",
          idSites: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("addCapabilities", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.addCapabilities(
        "user1",
        "tagmanager_write",
        [1, 2, 3]
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.addCapabilities",
        {
          userLogin: "user1",
          capabilities: "tagmanager_write",
          idSites: [1, 2, 3],
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with array of capabilities", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.addCapabilities(
        "user1",
        ["tagmanager_write", "tagmanager_read"],
        [1, 2, 3]
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.addCapabilities",
        {
          userLogin: "user1",
          capabilities: ["tagmanager_write", "tagmanager_read"],
          idSites: [1, 2, 3],
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with a single site ID", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.addCapabilities(
        "user1",
        "tagmanager_write",
        1
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.addCapabilities",
        {
          userLogin: "user1",
          capabilities: "tagmanager_write",
          idSites: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("removeCapabilities", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.removeCapabilities(
        "user1",
        "tagmanager_write",
        [1, 2, 3]
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.removeCapabilities",
        {
          userLogin: "user1",
          capabilities: "tagmanager_write",
          idSites: [1, 2, 3],
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with array of capabilities", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.removeCapabilities(
        "user1",
        ["tagmanager_write", "tagmanager_read"],
        [1, 2, 3]
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.removeCapabilities",
        {
          userLogin: "user1",
          capabilities: ["tagmanager_write", "tagmanager_read"],
          idSites: [1, 2, 3],
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with a single site ID", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.removeCapabilities(
        "user1",
        "tagmanager_write",
        1
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.removeCapabilities",
        {
          userLogin: "user1",
          capabilities: "tagmanager_write",
          idSites: 1,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("createAppSpecificTokenAuth", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.createAppSpecificTokenAuth(
        "user1",
        "password123",
        "Mobile App Token"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.createAppSpecificTokenAuth",
        {
          userLogin: "user1",
          passwordConfirmation: "password123",
          description: "Mobile App Token",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.createAppSpecificTokenAuth(
        "user1",
        "password123",
        "Mobile App Token",
        "2025-12-31",
        48
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.createAppSpecificTokenAuth",
        {
          userLogin: "user1",
          passwordConfirmation: "password123",
          description: "Mobile App Token",
          expireDate: "2025-12-31",
          expireHours: 48,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("newsletterSignup", () => {
    it("should call the API", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.newsletterSignup();

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.newsletterSignup",
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("resendInvite", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.resendInvite("user1");

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.resendInvite",
        {
          userLogin: "user1",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.resendInvite(
        "user1",
        30,
        "password123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.resendInvite",
        {
          userLogin: "user1",
          expiryInDays: 30,
          passwordConfirmation: "password123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("generateInviteLink", () => {
    it("should call the API with required parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.generateInviteLink("user1");

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.generateInviteLink",
        {
          userLogin: "user1",
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call the API with all parameters", async () => {
      const mockResponse = { data: "test" };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await usersManagerModule.generateInviteLink(
        "user1",
        30,
        "password123"
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        "UsersManager.generateInviteLink",
        {
          userLogin: "user1",
          expiryInDays: 30,
          passwordConfirmation: "password123",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
