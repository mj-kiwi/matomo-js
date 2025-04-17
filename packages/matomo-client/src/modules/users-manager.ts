/**
 * Matomo UsersManager Module
 * The UsersManager API lets you Manage Users and their permissions to access specific websites.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class UsersManagerModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get available user roles
   */
  async getAvailableRoles(): Promise<any> {
    return this.client.request('UsersManager.getAvailableRoles', {});
  }

  /**
   * Get available capabilities
   */
  async getAvailableCapabilities(): Promise<any> {
    return this.client.request('UsersManager.getAvailableCapabilities', {});
  }

  /**
   * Set a user preference
   *
   * @param userLogin Login name of the user
   * @param preferenceName Name of the preference to set
   * @param preferenceValue Value to set
   */
  async setUserPreference(
    userLogin: string,
    preferenceName: string,
    preferenceValue: string | number | boolean
  ): Promise<any> {
    const params: RequestParams = {
      userLogin,
      preferenceName,
      preferenceValue,
    };

    return this.client.request('UsersManager.setUserPreference', params);
  }

  /**
   * Get a user preference
   *
   * @param preferenceName Name of the preference to get
   * @param userLogin Optional login name of the user (defaults to current user)
   */
  async getUserPreference(
    preferenceName: string,
    userLogin: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      preferenceName,
    };

    if (userLogin) params.userLogin = userLogin;

    return this.client.request('UsersManager.getUserPreference', params);
  }

  /**
   * Get users with their roles for a site
   *
   * @param idSite Site ID
   * @param limit Maximum number of users to return
   * @param offset Offset from which to start returning data
   * @param filter_search Search query
   * @param filter_access Filter by access level
   * @param filter_status Filter by status
   */
  async getUsersPlusRole(
    idSite: number | string,
    limit: string | number = '',
    offset: string | number = '0',
    filter_search: string = '',
    filter_access: string = '',
    filter_status: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
    };

    if (limit !== '') params.limit = limit;
    if (offset !== '0') params.offset = offset;
    if (filter_search) params.filter_search = filter_search;
    if (filter_access) params.filter_access = filter_access;
    if (filter_status) params.filter_status = filter_status;

    return this.client.request('UsersManager.getUsersPlusRole', params);
  }

  /**
   * Get the list of all users
   *
   * @param userLogins Optional list of users to filter by
   */
  async getUsers(userLogins: string | string[] = ''): Promise<any> {
    const params: RequestParams = {};

    if (userLogins) params.userLogins = userLogins;

    return this.client.request('UsersManager.getUsers', params);
  }

  /**
   * Get the list of user logins
   */
  async getUsersLogin(): Promise<any> {
    return this.client.request('UsersManager.getUsersLogin', {});
  }

  /**
   * Get sites and users with a given access level
   *
   * @param access Access level to filter by
   */
  async getUsersSitesFromAccess(access: string): Promise<any> {
    const params: RequestParams = {
      access,
    };

    return this.client.request('UsersManager.getUsersSitesFromAccess', params);
  }

  /**
   * Get the list of users who have access to a given site
   *
   * @param idSite Site ID
   */
  async getUsersAccessFromSite(idSite: number | string): Promise<any> {
    const params: RequestParams = {
      idSite,
    };

    return this.client.request('UsersManager.getUsersAccessFromSite', params);
  }

  /**
   * Get users who have a specific access level to a site
   *
   * @param idSite Site ID
   * @param access Access level to filter by
   */
  async getUsersWithSiteAccess(
    idSite: number | string,
    access: string
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      access,
    };

    return this.client.request('UsersManager.getUsersWithSiteAccess', params);
  }

  /**
   * Get the sites a user has access to
   *
   * @param userLogin Login name of the user
   */
  async getSitesAccessFromUser(userLogin: string): Promise<any> {
    const params: RequestParams = {
      userLogin,
    };

    return this.client.request('UsersManager.getSitesAccessFromUser', params);
  }

  /**
   * Get access levels for a user with pagination and filtering
   *
   * @param userLogin Login name of the user
   * @param limit Maximum number of sites to return
   * @param offset Offset from which to start returning data
   * @param filter_search Search query
   * @param filter_access Filter by access level
   */
  async getSitesAccessForUser(
    userLogin: string,
    limit: string | number = '',
    offset: string | number = '0',
    filter_search: string = '',
    filter_access: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      userLogin,
    };

    if (limit !== '') params.limit = limit;
    if (offset !== '0') params.offset = offset;
    if (filter_search) params.filter_search = filter_search;
    if (filter_access) params.filter_access = filter_access;

    return this.client.request('UsersManager.getSitesAccessForUser', params);
  }

  /**
   * Get details for a specific user
   *
   * @param userLogin Login name of the user
   */
  async getUser(userLogin: string): Promise<any> {
    const params: RequestParams = {
      userLogin,
    };

    return this.client.request('UsersManager.getUser', params);
  }

  /**
   * Get a user by their email
   *
   * @param userEmail Email of the user
   */
  async getUserByEmail(userEmail: string): Promise<any> {
    const params: RequestParams = {
      userEmail,
    };

    return this.client.request('UsersManager.getUserByEmail', params);
  }

  /**
   * Add a new user
   *
   * @param userLogin Login name for the new user
   * @param password Password for the new user
   * @param email Email for the new user
   * @param initialIdSite Initial site ID to give access to
   * @param passwordConfirmation Password confirmation for safer API usage
   */
  async addUser(
    userLogin: string,
    password: string,
    email: string,
    initialIdSite: string | number = '',
    passwordConfirmation: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      userLogin,
      password,
      email,
    };

    if (initialIdSite !== '') params.initialIdSite = initialIdSite;
    if (passwordConfirmation)
      params.passwordConfirmation = passwordConfirmation;

    return this.client.request('UsersManager.addUser', params);
  }

  /**
   * Invite a new user
   *
   * @param userLogin Login name for the invited user
   * @param email Email for the invited user
   * @param initialIdSite Initial site ID to give access to
   * @param expiryInDays Number of days until the invite expires
   * @param passwordConfirmation Password confirmation for safer API usage
   */
  async inviteUser(
    userLogin: string,
    email: string,
    initialIdSite: string | number = '',
    expiryInDays: string | number = '',
    passwordConfirmation: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      userLogin,
      email,
    };

    if (initialIdSite !== '') params.initialIdSite = initialIdSite;
    if (expiryInDays !== '') params.expiryInDays = expiryInDays;
    if (passwordConfirmation)
      params.passwordConfirmation = passwordConfirmation;

    return this.client.request('UsersManager.inviteUser', params);
  }

  /**
   * Set superuser access for a user
   *
   * @param userLogin Login name of the user
   * @param hasSuperUserAccess Whether to grant superuser access
   * @param passwordConfirmation Password confirmation for safer API usage
   */
  async setSuperUserAccess(
    userLogin: string,
    hasSuperUserAccess: boolean,
    passwordConfirmation: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      userLogin,
      hasSuperUserAccess,
    };

    if (passwordConfirmation)
      params.passwordConfirmation = passwordConfirmation;

    return this.client.request('UsersManager.setSuperUserAccess', params);
  }

  /**
   * Check if the current user has superuser access
   */
  async hasSuperUserAccess(): Promise<any> {
    return this.client.request('UsersManager.hasSuperUserAccess', {});
  }

  /**
   * Get the list of users with superuser access
   */
  async getUsersHavingSuperUserAccess(): Promise<any> {
    return this.client.request(
      'UsersManager.getUsersHavingSuperUserAccess',
      {}
    );
  }

  /**
   * Update an existing user
   *
   * @param userLogin Login name of the user to update
   * @param password Optional new password
   * @param email Optional new email
   * @param passwordConfirmation Password confirmation for safer API usage
   */
  async updateUser(
    userLogin: string,
    password: string = '',
    email: string = '',
    passwordConfirmation: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      userLogin,
    };

    if (password) params.password = password;
    if (email) params.email = email;
    if (passwordConfirmation)
      params.passwordConfirmation = passwordConfirmation;

    return this.client.request('UsersManager.updateUser', params);
  }

  /**
   * Delete a user
   *
   * @param userLogin Login name of the user to delete
   * @param passwordConfirmation Password confirmation for safer API usage
   */
  async deleteUser(
    userLogin: string,
    passwordConfirmation: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      userLogin,
    };

    if (passwordConfirmation)
      params.passwordConfirmation = passwordConfirmation;

    return this.client.request('UsersManager.deleteUser', params);
  }

  /**
   * Check if a user with the given login exists
   *
   * @param userLogin Login name to check
   */
  async userExists(userLogin: string): Promise<any> {
    const params: RequestParams = {
      userLogin,
    };

    return this.client.request('UsersManager.userExists', params);
  }

  /**
   * Check if a user with the given email exists
   *
   * @param userEmail Email to check
   */
  async userEmailExists(userEmail: string): Promise<any> {
    const params: RequestParams = {
      userEmail,
    };

    return this.client.request('UsersManager.userEmailExists', params);
  }

  /**
   * Get the login name for a user with the given email
   *
   * @param userEmail Email of the user
   */
  async getUserLoginFromUserEmail(userEmail: string): Promise<any> {
    const params: RequestParams = {
      userEmail,
    };

    return this.client.request(
      'UsersManager.getUserLoginFromUserEmail',
      params
    );
  }

  /**
   * Set the access level for a user to one or more sites
   *
   * @param userLogin Login name of the user
   * @param access Access level to set
   * @param idSites Site ID or array of site IDs
   * @param passwordConfirmation Password confirmation for safer API usage
   */
  async setUserAccess(
    userLogin: string,
    access: string,
    idSites: number | string | (number | string)[],
    passwordConfirmation: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      userLogin,
      access,
      idSites,
    };

    if (passwordConfirmation)
      params.passwordConfirmation = passwordConfirmation;

    return this.client.request('UsersManager.setUserAccess', params);
  }

  /**
   * Add capabilities to a user for specific sites
   *
   * @param userLogin Login name of the user
   * @param capabilities Capability or array of capabilities to add
   * @param idSites Site ID or array of site IDs
   */
  async addCapabilities(
    userLogin: string,
    capabilities: string | string[],
    idSites: number | string | (number | string)[]
  ): Promise<any> {
    const params: RequestParams = {
      userLogin,
      capabilities,
      idSites,
    };

    return this.client.request('UsersManager.addCapabilities', params);
  }

  /**
   * Remove capabilities from a user for specific sites
   *
   * @param userLogin Login name of the user
   * @param capabilities Capability or array of capabilities to remove
   * @param idSites Site ID or array of site IDs
   */
  async removeCapabilities(
    userLogin: string,
    capabilities: string | string[],
    idSites: number | string | (number | string)[]
  ): Promise<any> {
    const params: RequestParams = {
      userLogin,
      capabilities,
      idSites,
    };

    return this.client.request('UsersManager.removeCapabilities', params);
  }

  /**
   * Create an app-specific token authentication
   *
   * @param userLogin Login name of the user
   * @param passwordConfirmation Password confirmation
   * @param description Description of the token
   * @param expireDate Optional expiration date (YYYY-MM-DD)
   * @param expireHours Optional expiration in hours
   */
  async createAppSpecificTokenAuth(
    userLogin: string,
    passwordConfirmation: string,
    description: string,
    expireDate: string = '',
    expireHours: string | number = '0'
  ): Promise<any> {
    const params: RequestParams = {
      userLogin,
      passwordConfirmation,
      description,
    };

    if (expireDate) params.expireDate = expireDate;
    if (expireHours !== '0') params.expireHours = expireHours;

    return this.client.request(
      'UsersManager.createAppSpecificTokenAuth',
      params
    );
  }

  /**
   * Sign up for the Matomo newsletter
   */
  async newsletterSignup(): Promise<any> {
    return this.client.request('UsersManager.newsletterSignup', {});
  }

  /**
   * Resend an invite email
   *
   * @param userLogin Login name of the invited user
   * @param expiryInDays Number of days until the invite expires
   * @param passwordConfirmation Password confirmation for safer API usage
   */
  async resendInvite(
    userLogin: string,
    expiryInDays: string | number = '7',
    passwordConfirmation: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      userLogin,
    };

    if (expiryInDays !== '7') params.expiryInDays = expiryInDays;
    if (passwordConfirmation)
      params.passwordConfirmation = passwordConfirmation;

    return this.client.request('UsersManager.resendInvite', params);
  }

  /**
   * Generate an invite link for a user
   *
   * @param userLogin Login name of the invited user
   * @param expiryInDays Number of days until the invite expires
   * @param passwordConfirmation Password confirmation for safer API usage
   */
  async generateInviteLink(
    userLogin: string,
    expiryInDays: string | number = '7',
    passwordConfirmation: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      userLogin,
    };

    if (expiryInDays !== '7') params.expiryInDays = expiryInDays;
    if (passwordConfirmation)
      params.passwordConfirmation = passwordConfirmation;

    return this.client.request('UsersManager.generateInviteLink', params);
  }
}
