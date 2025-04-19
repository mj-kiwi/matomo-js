/**
 * MobileMessaging API Module
 * Lets you manage and access all the MobileMessaging plugin features
 */

import { CoreReportingClient, RequestParams } from "./core.js";

/**
 * Parameters for phone number operations
 */
export interface PhoneNumberParams extends RequestParams {
  /** The phone number */
  phoneNumber: string;
}

/**
 * Parameters for validating a phone number
 */
export interface ValidatePhoneParams extends PhoneNumberParams {
  /** The verification code */
  verificationCode: string;
}

/**
 * Parameters for setting SMS API credentials
 */
export interface CredentialParams extends RequestParams {
  /** The SMS provider */
  provider: string;
  /** The credentials array for the provider */
  credentials?: Record<string, any>;
}

/**
 * Parameters for delegated management
 */
export interface DelegatedManagementParams extends RequestParams {
  /** Whether to enable delegated management */
  delegatedManagement: boolean;
}

export class MobileMessagingModule {
  /**
   * @param core Core reporting client instance
   */
  constructor(private core: CoreReportingClient) {}

  /**
   * Check if SMS API credentials are provided
   */
  async areSMSAPICredentialProvided(): Promise<boolean> {
    return this.core.request<boolean>(
      "MobileMessaging.areSMSAPICredentialProvided"
    );
  }

  /**
   * Get the SMS Provider
   */
  async getSMSProvider(): Promise<string> {
    return this.core.request<string>("MobileMessaging.getSMSProvider");
  }

  /**
   * Set SMS API credential
   *
   * @param params Parameters containing provider and credentials
   */
  async setSMSAPICredential(params: CredentialParams): Promise<boolean> {
    return this.core.request<boolean>(
      "MobileMessaging.setSMSAPICredential",
      params
    );
  }

  /**
   * Add a phone number
   *
   * @param params Parameters containing the phone number to add
   */
  async addPhoneNumber(params: PhoneNumberParams): Promise<boolean> {
    return this.core.request<boolean>("MobileMessaging.addPhoneNumber", params);
  }

  /**
   * Resend verification code to a phone number
   *
   * @param params Parameters containing the phone number to resend verification to
   */
  async resendVerificationCode(params: PhoneNumberParams): Promise<boolean> {
    return this.core.request<boolean>(
      "MobileMessaging.resendVerificationCode",
      params
    );
  }

  /**
   * Get remaining SMS credit
   */
  async getCreditLeft(): Promise<number> {
    return this.core.request<number>("MobileMessaging.getCreditLeft");
  }

  /**
   * Get registered phone numbers
   */
  async getPhoneNumbers(): Promise<Record<string, string>> {
    return this.core.request<Record<string, string>>(
      "MobileMessaging.getPhoneNumbers"
    );
  }

  /**
   * Remove a phone number
   *
   * @param params Parameters containing the phone number to remove
   */
  async removePhoneNumber(params: PhoneNumberParams): Promise<boolean> {
    return this.core.request<boolean>(
      "MobileMessaging.removePhoneNumber",
      params
    );
  }

  /**
   * Validate a phone number with a verification code
   *
   * @param params Parameters containing the phone number and verification code
   */
  async validatePhoneNumber(params: ValidatePhoneParams): Promise<boolean> {
    return this.core.request<boolean>(
      "MobileMessaging.validatePhoneNumber",
      params
    );
  }

  /**
   * Delete SMS API credential
   */
  async deleteSMSAPICredential(): Promise<boolean> {
    return this.core.request<boolean>("MobileMessaging.deleteSMSAPICredential");
  }

  /**
   * Set delegated management
   *
   * @param params Parameters containing delegated management setting
   */
  async setDelegatedManagement(
    params: DelegatedManagementParams
  ): Promise<boolean> {
    return this.core.request<boolean>(
      "MobileMessaging.setDelegatedManagement",
      params
    );
  }

  /**
   * Get delegated management status
   */
  async getDelegatedManagement(): Promise<boolean> {
    return this.core.request<boolean>("MobileMessaging.getDelegatedManagement");
  }
}
