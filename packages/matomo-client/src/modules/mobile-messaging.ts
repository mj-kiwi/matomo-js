/**
 * MobileMessaging API Module
 * Lets you manage and access all the MobileMessaging plugin features
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

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
   * @param core Core reporting client instance or batch request
   */
  constructor(private core: CoreReportingClient | BatchRequest) {}

  /**
   * Check if SMS API credentials are provided
   */
  async areSMSAPICredentialProvided(): Promise<boolean> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "MobileMessaging.areSMSAPICredentialProvided",
        {}
      );
    }
    return this.core.request<boolean>(
      "MobileMessaging.areSMSAPICredentialProvided"
    );
  }

  /**
   * Get the SMS Provider
   */
  async getSMSProvider(): Promise<string> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("MobileMessaging.getSMSProvider", {});
    }
    return this.core.request<string>("MobileMessaging.getSMSProvider");
  }

  /**
   * Set SMS API credential
   *
   * @param params Parameters containing provider and credentials
   */
  async setSMSAPICredential(params: CredentialParams): Promise<boolean> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "MobileMessaging.setSMSAPICredential",
        params
      );
    }
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
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("MobileMessaging.addPhoneNumber", params);
    }
    return this.core.request<boolean>("MobileMessaging.addPhoneNumber", params);
  }

  /**
   * Resend verification code to a phone number
   *
   * @param params Parameters containing the phone number to resend verification to
   */
  async resendVerificationCode(params: PhoneNumberParams): Promise<boolean> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "MobileMessaging.resendVerificationCode",
        params
      );
    }
    return this.core.request<boolean>(
      "MobileMessaging.resendVerificationCode",
      params
    );
  }

  /**
   * Get remaining SMS credit
   */
  async getCreditLeft(): Promise<number> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("MobileMessaging.getCreditLeft", {});
    }
    return this.core.request<number>("MobileMessaging.getCreditLeft");
  }

  /**
   * Get registered phone numbers
   */
  async getPhoneNumbers(): Promise<Record<string, string>> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("MobileMessaging.getPhoneNumbers", {});
    }
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
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("MobileMessaging.removePhoneNumber", params);
    }
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
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "MobileMessaging.validatePhoneNumber",
        params
      );
    }
    return this.core.request<boolean>(
      "MobileMessaging.validatePhoneNumber",
      params
    );
  }

  /**
   * Delete SMS API credential
   */
  async deleteSMSAPICredential(): Promise<boolean> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("MobileMessaging.deleteSMSAPICredential", {});
    }
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
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "MobileMessaging.setDelegatedManagement",
        params
      );
    }
    return this.core.request<boolean>(
      "MobileMessaging.setDelegatedManagement",
      params
    );
  }

  /**
   * Get delegated management status
   */
  async getDelegatedManagement(): Promise<boolean> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("MobileMessaging.getDelegatedManagement", {});
    }
    return this.core.request<boolean>("MobileMessaging.getDelegatedManagement");
  }
}
