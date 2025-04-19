/**
 * Matomo UsersManager Module
 * The UsersManager API lets you Manage Users and their permissions to access specific websites.
 */

import { CoreReportingClient, RequestParams } from "./core.js";

/**
 * Parameters for user preference operations
 */
export interface UserPreferenceParams extends RequestParams {
  /** Login name of the user */
  userLogin: string;
  /** Name of the preference */
  preferenceName: string;
  /** Value to set for the preference */
  preferenceValue?: string | number | boolean;
}

/**
 * Parameters for getting a user preference
 */
export interface GetUserPreferenceParams extends RequestParams {
  /** Name of the preference to get */
  preferenceName: string;
  /** Optional login name of the user (defaults to current user) */
  userLogin?: string;
}

/**
 * Parameters for getting users with roles for a site
 */
export interface GetUsersPlusRoleParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Maximum number of users to return */
  limit?: string | number;
  /** Offset from which to start returning data */
  offset?: string | number;
  /** Search query */
  filter_search?: string;
  /** Filter by access level */
  filter_access?: string;
  /** Filter by status */
  filter_status?: string;
}

/**
 * Parameters for getting users
 */
export interface GetUsersParams extends RequestParams {
  /** Optional list of users to filter by */
  userLogins?: string | string[];
}

/**
 * Parameters for access related operations
 */
export interface AccessParams extends RequestParams {
  /** Access level */
  access: string;
}

/**
 * Parameters for site access operations
 */
export interface SiteAccessParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
}

/**
 * Parameters for user-site access operations
 */
export interface UserSiteAccessParams extends SiteAccessParams {
  /** Access level */
  access: string;
}

/**
 * Parameters for getting user's sites access
 */
export interface UserParams extends RequestParams {
  /** Login name of the user */
  userLogin: string;
}

/**
 * Parameters for getting sites access for a user
 */
export interface SitesAccessForUserParams extends UserParams {
  /** Maximum number of sites to return */
  limit?: string | number;
  /** Offset from which to start returning data */
  offset?: string | number;
  /** Search query */
  filter_search?: string;
  /** Filter by access level */
  filter_access?: string;
}

/**
 * Parameters for getting a user by email
 */
export interface UserEmailParams extends RequestParams {
  /** Email of the user */
  userEmail: string;
}

/**
 * Parameters for adding a new user
 */
export interface AddUserParams extends RequestParams {
  /** Login name for the new user */
  userLogin: string;
  /** Password for the new user */
  password: string;
  /** Email for the new user */
  email: string;
  /** Initial site ID to give access to */
  initialIdSite?: string | number;
  /** Password confirmation for safer API usage */
  passwordConfirmation?: string;
}

/**
 * Parameters for inviting a user
 */
export interface InviteUserParams extends RequestParams {
  /** Login name for the invited user */
  userLogin: string;
  /** Email for the invited user */
  email: string;
  /** Initial site ID to give access to */
  initialIdSite?: string | number;
  /** Number of days until the invite expires */
  expiryInDays?: string | number;
  /** Password confirmation for safer API usage */
  passwordConfirmation?: string;
}

/**
 * Parameters for setting superuser access
 */
export interface SetSuperUserAccessParams extends RequestParams {
  /** Login name of the user */
  userLogin: string;
  /** Whether to grant superuser access */
  hasSuperUserAccess: boolean;
  /** Password confirmation for safer API usage */
  passwordConfirmation?: string;
}

/**
 * Parameters for updating a user
 */
export interface UpdateUserParams extends RequestParams {
  /** Login name of the user to update */
  userLogin: string;
  /** Optional new password */
  password?: string;
  /** Optional new email */
  email?: string;
  /** Password confirmation for safer API usage */
  passwordConfirmation?: string;
}

/**
 * Parameters for deleting a user
 */
export interface DeleteUserParams extends RequestParams {
  /** Login name of the user to delete */
  userLogin: string;
  /** Password confirmation for safer API usage */
  passwordConfirmation?: string;
}

/**
 * Parameters for setting user access
 */
export interface SetUserAccessParams extends RequestParams {
  /** Login name of the user */
  userLogin: string;
  /** Access level to set */
  access: string;
  /** Site ID or array of site IDs */
  idSites: number | string | (number | string)[];
  /** Password confirmation for safer API usage */
  passwordConfirmation?: string;
}

/**
 * Parameters for capability operations
 */
export interface CapabilitiesParams extends RequestParams {
  /** Login name of the user */
  userLogin: string;
  /** Capability or array of capabilities */
  capabilities: string | string[];
  /** Site ID or array of site IDs */
  idSites: number | string | (number | string)[];
}

/**
 * Parameters for creating app-specific tokens
 */
export interface AppTokenParams extends RequestParams {
  /** Login name of the user */
  userLogin: string;
  /** Password confirmation */
  passwordConfirmation: string;
  /** Description of the token */
  description: string;
  /** Optional expiration date (YYYY-MM-DD) */
  expireDate?: string;
  /** Optional expiration in hours */
  expireHours?: string | number;
}

/**
 * Parameters for invite operations
 */
export interface InviteParams extends RequestParams {
  /** Login name of the invited user */
  userLogin: string;
  /** Number of days until the invite expires */
  expiryInDays?: string | number;
  /** Password confirmation for safer API usage */
  passwordConfirmation?: string;
}

export class UsersManagerModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get available user roles
   */
  async getAvailableRoles(): Promise<any> {
    return this.client.request("UsersManager.getAvailableRoles", {});
  }

  /**
   * Get available capabilities
   */
  async getAvailableCapabilities(): Promise<any> {
    return this.client.request("UsersManager.getAvailableCapabilities", {});
  }

  /**
   * Set a user preference
   *
   * @param params Parameters for setting a user preference
   */
  async setUserPreference(params: UserPreferenceParams): Promise<any> {
    return this.client.request("UsersManager.setUserPreference", params);
  }

  /**
   * Get a user preference
   *
   * @param params Parameters for getting a user preference
   */
  async getUserPreference(params: GetUserPreferenceParams): Promise<any> {
    return this.client.request("UsersManager.getUserPreference", params);
  }

  /**
   * Get users with their roles for a site
   *
   * @param params Parameters for getting users with roles
   */
  async getUsersPlusRole(params: GetUsersPlusRoleParams): Promise<any> {
    return this.client.request("UsersManager.getUsersPlusRole", params);
  }

  /**
   * Get the list of all users
   *
   * @param params Parameters for getting users
   */
  async getUsers(params: GetUsersParams = {}): Promise<any> {
    return this.client.request("UsersManager.getUsers", params);
  }

  /**
   * Get the list of user logins
   */
  async getUsersLogin(): Promise<any> {
    return this.client.request("UsersManager.getUsersLogin", {});
  }

  /**
   * Get sites and users with a given access level
   *
   * @param params Parameters containing the access level
   */
  async getUsersSitesFromAccess(params: AccessParams): Promise<any> {
    return this.client.request("UsersManager.getUsersSitesFromAccess", params);
  }

  /**
   * Get the list of users who have access to a given site
   *
   * @param params Parameters containing the site ID
   */
  async getUsersAccessFromSite(params: SiteAccessParams): Promise<any> {
    return this.client.request("UsersManager.getUsersAccessFromSite", params);
  }

  /**
   * Get users who have a specific access level to a site
   *
   * @param params Parameters for getting users with site access
   */
  async getUsersWithSiteAccess(params: UserSiteAccessParams): Promise<any> {
    return this.client.request("UsersManager.getUsersWithSiteAccess", params);
  }

  /**
   * Get the sites a user has access to
   *
   * @param params Parameters containing the user login
   */
  async getSitesAccessFromUser(params: UserParams): Promise<any> {
    return this.client.request("UsersManager.getSitesAccessFromUser", params);
  }

  /**
   * Get access levels for a user with pagination and filtering
   *
   * @param params Parameters for getting sites access for a user
   */
  async getSitesAccessForUser(params: SitesAccessForUserParams): Promise<any> {
    return this.client.request("UsersManager.getSitesAccessForUser", params);
  }

  /**
   * Get details for a specific user
   *
   * @param params Parameters containing the user login
   */
  async getUser(params: UserParams): Promise<any> {
    return this.client.request("UsersManager.getUser", params);
  }

  /**
   * Get a user by their email
   *
   * @param params Parameters containing the user email
   */
  async getUserByEmail(params: UserEmailParams): Promise<any> {
    return this.client.request("UsersManager.getUserByEmail", params);
  }

  /**
   * Add a new user
   *
   * @param params Parameters for adding a new user
   */
  async addUser(params: AddUserParams): Promise<any> {
    return this.client.request("UsersManager.addUser", params);
  }

  /**
   * Invite a new user
   *
   * @param params Parameters for inviting a user
   */
  async inviteUser(params: InviteUserParams): Promise<any> {
    return this.client.request("UsersManager.inviteUser", params);
  }

  /**
   * Set superuser access for a user
   *
   * @param params Parameters for setting superuser access
   */
  async setSuperUserAccess(params: SetSuperUserAccessParams): Promise<any> {
    return this.client.request("UsersManager.setSuperUserAccess", params);
  }

  /**
   * Check if the current user has superuser access
   */
  async hasSuperUserAccess(): Promise<any> {
    return this.client.request("UsersManager.hasSuperUserAccess", {});
  }

  /**
   * Get the list of users with superuser access
   */
  async getUsersHavingSuperUserAccess(): Promise<any> {
    return this.client.request(
      "UsersManager.getUsersHavingSuperUserAccess",
      {}
    );
  }

  /**
   * Update an existing user
   *
   * @param params Parameters for updating a user
   */
  async updateUser(params: UpdateUserParams): Promise<any> {
    return this.client.request("UsersManager.updateUser", params);
  }

  /**
   * Delete a user
   *
   * @param params Parameters for deleting a user
   */
  async deleteUser(params: DeleteUserParams): Promise<any> {
    return this.client.request("UsersManager.deleteUser", params);
  }

  /**
   * Check if a user with the given login exists
   *
   * @param params Parameters containing the user login
   */
  async userExists(params: UserParams): Promise<any> {
    return this.client.request("UsersManager.userExists", params);
  }

  /**
   * Check if a user with the given email exists
   *
   * @param params Parameters containing the user email
   */
  async userEmailExists(params: UserEmailParams): Promise<any> {
    return this.client.request("UsersManager.userEmailExists", params);
  }

  /**
   * Get the login name for a user with the given email
   *
   * @param params Parameters containing the user email
   */
  async getUserLoginFromUserEmail(params: UserEmailParams): Promise<any> {
    return this.client.request(
      "UsersManager.getUserLoginFromUserEmail",
      params
    );
  }

  /**
   * Set the access level for a user to one or more sites
   *
   * @param params Parameters for setting user access
   */
  async setUserAccess(params: SetUserAccessParams): Promise<any> {
    return this.client.request("UsersManager.setUserAccess", params);
  }

  /**
   * Add capabilities to a user for specific sites
   *
   * @param params Parameters for adding capabilities
   */
  async addCapabilities(params: CapabilitiesParams): Promise<any> {
    return this.client.request("UsersManager.addCapabilities", params);
  }

  /**
   * Remove capabilities from a user for specific sites
   *
   * @param params Parameters for removing capabilities
   */
  async removeCapabilities(params: CapabilitiesParams): Promise<any> {
    return this.client.request("UsersManager.removeCapabilities", params);
  }

  /**
   * Create an app-specific token authentication
   *
   * @param params Parameters for creating app-specific tokens
   */
  async createAppSpecificTokenAuth(params: AppTokenParams): Promise<any> {
    return this.client.request(
      "UsersManager.createAppSpecificTokenAuth",
      params
    );
  }

  /**
   * Sign up for the Matomo newsletter
   */
  async newsletterSignup(): Promise<any> {
    return this.client.request("UsersManager.newsletterSignup", {});
  }

  /**
   * Resend an invite email
   *
   * @param params Parameters for resending an invite
   */
  async resendInvite(params: InviteParams): Promise<any> {
    return this.client.request("UsersManager.resendInvite", params);
  }

  /**
   * Generate an invite link for a user
   *
   * @param params Parameters for generating an invite link
   */
  async generateInviteLink(params: InviteParams): Promise<any> {
    return this.client.request("UsersManager.generateInviteLink", params);
  }
}
