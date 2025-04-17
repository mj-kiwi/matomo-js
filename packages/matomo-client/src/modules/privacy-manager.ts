/**
 * PrivacyManager API Module
 * API for plugin PrivacyManager to manage privacy-related features
 */

import { CoreReportingClient } from './core.js';

export class PrivacyManagerModule {
  /**
   * @param core Core reporting client instance
   */
  constructor(private core: CoreReportingClient) {}

  /**
   * Delete data subjects (visits)
   * 
   * @param visits The visits to delete
   */
  async deleteDataSubjects(visits: any[]): Promise<any> {
    return this.core.request<any>('PrivacyManager.deleteDataSubjects', {
      visits,
    });
  }

  /**
   * Export data subjects (visits)
   * 
   * @param visits The visits to export
   */
  async exportDataSubjects(visits: any[]): Promise<any> {
    return this.core.request<any>('PrivacyManager.exportDataSubjects', {
      visits,
    });
  }

  /**
   * Find data subjects based on segment
   * 
   * @param idSite The ID of the site
   * @param segment Segment to find data subjects
   */
  async findDataSubjects(
    idSite: number | string,
    segment: string
  ): Promise<any> {
    return this.core.request<any>('PrivacyManager.findDataSubjects', {
      idSite,
      segment,
    });
  }

  /**
   * Anonymize some raw data
   * 
   * @param idSites Array of site IDs
   * @param date Date to anonymize data for
   * @param anonymizeIp Whether to anonymize IP addresses
   * @param anonymizeLocation Whether to anonymize location data
   * @param anonymizeUserId Whether to anonymize user IDs
   * @param unsetVisitColumns Visit columns to unset
   * @param unsetLinkVisitActionColumns Link visit action columns to unset
   * @param passwordConfirmation Password confirmation
   */
  async anonymizeSomeRawData(
    idSites: (number | string)[],
    date: string,
    anonymizeIp: string = '',
    anonymizeLocation: string = '',
    anonymizeUserId: string = '',
    unsetVisitColumns: string[] = [],
    unsetLinkVisitActionColumns: string[] = [],
    passwordConfirmation: string = ''
  ): Promise<any> {
    return this.core.request<any>('PrivacyManager.anonymizeSomeRawData', {
      idSites,
      date,
      anonymizeIp,
      anonymizeLocation,
      anonymizeUserId,
      unsetVisitColumns,
      unsetLinkVisitActionColumns,
      passwordConfirmation,
    });
  }

  /**
   * Get available visit columns to anonymize
   */
  async getAvailableVisitColumnsToAnonymize(): Promise<string[]> {
    return this.core.request<string[]>(
      'PrivacyManager.getAvailableVisitColumnsToAnonymize'
    );
  }

  /**
   * Get available link visit action columns to anonymize
   */
  async getAvailableLinkVisitActionColumnsToAnonymize(): Promise<string[]> {
    return this.core.request<string[]>(
      'PrivacyManager.getAvailableLinkVisitActionColumnsToAnonymize'
    );
  }
}