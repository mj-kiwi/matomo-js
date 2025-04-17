/**
 * MobileMessaging API Module
 * Lets you manage and access all the MobileMessaging plugin features
 */

import { CoreReportingClient, RequestParams } from './core.js';

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
      'MobileMessaging.areSMSAPICredentialProvided'
    );
  }

  /**
   * Get the SMS Provider
   */
  async getSMSProvider(): Promise<string> {
    return this.core.request<string>('MobileMessaging.getSMSProvider');
  }

  /**
   * Set SMS API credential
   *
   * @param provider The SMS provider
   * @param credentials The credentials array for the provider
   */
  async setSMSAPICredential(
    provider: string,
    credentials: Record<string, any> = {}
  ): Promise<boolean> {
    return this.core.request<boolean>('MobileMessaging.setSMSAPICredential', {
      provider,
      credentials,
    });
  }

  /**
   * Add a phone number
   *
   * @param phoneNumber The phone number to add
   */
  async addPhoneNumber(phoneNumber: string): Promise<boolean> {
    return this.core.request<boolean>('MobileMessaging.addPhoneNumber', {
      phoneNumber,
    });
  }

  /**
   * Resend verification code to a phone number
   *
   * @param phoneNumber The phone number to resend the verification code to
   */
  async resendVerificationCode(phoneNumber: string): Promise<boolean> {
    return this.core.request<boolean>(
      'MobileMessaging.resendVerificationCode',
      {
        phoneNumber,
      }
    );
  }

  /**
   * Get remaining SMS credit
   */
  async getCreditLeft(): Promise<number> {
    return this.core.request<number>('MobileMessaging.getCreditLeft');
  }

  /**
   * Get registered phone numbers
   */
  async getPhoneNumbers(): Promise<Record<string, string>> {
    return this.core.request<Record<string, string>>(
      'MobileMessaging.getPhoneNumbers'
    );
  }

  /**
   * Remove a phone number
   *
   * @param phoneNumber The phone number to remove
   */
  async removePhoneNumber(phoneNumber: string): Promise<boolean> {
    return this.core.request<boolean>('MobileMessaging.removePhoneNumber', {
      phoneNumber,
    });
  }

  /**
   * Validate a phone number with a verification code
   *
   * @param phoneNumber The phone number to validate
   * @param verificationCode The verification code
   */
  async validatePhoneNumber(
    phoneNumber: string,
    verificationCode: string
  ): Promise<boolean> {
    return this.core.request<boolean>('MobileMessaging.validatePhoneNumber', {
      phoneNumber,
      verificationCode,
    });
  }

  /**
   * Delete SMS API credential
   */
  async deleteSMSAPICredential(): Promise<boolean> {
    return this.core.request<boolean>('MobileMessaging.deleteSMSAPICredential');
  }

  /**
   * Set delegated management
   *
   * @param delegatedManagement Whether to enable delegated management
   */
  async setDelegatedManagement(delegatedManagement: boolean): Promise<boolean> {
    return this.core.request<boolean>(
      'MobileMessaging.setDelegatedManagement',
      {
        delegatedManagement,
      }
    );
  }

  /**
   * Get delegated management status
   */
  async getDelegatedManagement(): Promise<boolean> {
    return this.core.request<boolean>('MobileMessaging.getDelegatedManagement');
  }
}
