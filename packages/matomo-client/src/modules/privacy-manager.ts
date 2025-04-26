/**
 * PrivacyManager API Module
 * API for plugin PrivacyManager to manage privacy-related features
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for data subjects operations
 */
export interface DataSubjectsParams extends RequestParams {
  /** The visits to process */
  visits: any[];
}

/**
 * Parameters for finding data subjects
 */
export interface FindDataSubjectsParams extends RequestParams {
  /** The ID of the site */
  idSite: number | string;
  /** Segment to find data subjects */
  segment: string;
}

/**
 * Parameters for anonymizing raw data
 */
export interface AnonymizeRawDataParams extends RequestParams {
  /** Array of site IDs */
  idSites: (number | string)[];
  /** Date to anonymize data for */
  date: string;
  /** Whether to anonymize IP addresses */
  anonymizeIp?: string;
  /** Whether to anonymize location data */
  anonymizeLocation?: string;
  /** Whether to anonymize user IDs */
  anonymizeUserId?: string;
  /** Visit columns to unset */
  unsetVisitColumns?: string[];
  /** Link visit action columns to unset */
  unsetLinkVisitActionColumns?: string[];
  /** Password confirmation */
  passwordConfirmation?: string;
}

export class PrivacyManagerModule {
  /**
   * @param core Core reporting client instance or batch request
   */
  constructor(private core: CoreReportingClient | BatchRequest) {}

  /**
   * Delete data subjects (visits)
   *
   * @param params Parameters for deleting data subjects
   */
  async deleteDataSubjects(params: DataSubjectsParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("PrivacyManager.deleteDataSubjects", params);
    }
    return this.core.request<any>("PrivacyManager.deleteDataSubjects", params);
  }

  /**
   * Export data subjects (visits)
   *
   * @param params Parameters for exporting data subjects
   */
  async exportDataSubjects(params: DataSubjectsParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("PrivacyManager.exportDataSubjects", params);
    }
    return this.core.request<any>("PrivacyManager.exportDataSubjects", params);
  }

  /**
   * Find data subjects based on segment
   *
   * @param params Parameters for finding data subjects
   */
  async findDataSubjects(params: FindDataSubjectsParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest("PrivacyManager.findDataSubjects", params);
    }
    return this.core.request<any>("PrivacyManager.findDataSubjects", params);
  }

  /**
   * Anonymize some raw data
   *
   * @param params Parameters for anonymizing raw data
   */
  async anonymizeSomeRawData(params: AnonymizeRawDataParams): Promise<any> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "PrivacyManager.anonymizeSomeRawData",
        params
      );
    }
    return this.core.request<any>(
      "PrivacyManager.anonymizeSomeRawData",
      params
    );
  }

  /**
   * Get available visit columns to anonymize
   */
  async getAvailableVisitColumnsToAnonymize(): Promise<string[]> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "PrivacyManager.getAvailableVisitColumnsToAnonymize",
        {}
      );
    }
    return this.core.request<string[]>(
      "PrivacyManager.getAvailableVisitColumnsToAnonymize"
    );
  }

  /**
   * Get available link visit action columns to anonymize
   */
  async getAvailableLinkVisitActionColumnsToAnonymize(): Promise<string[]> {
    if (this.core instanceof BatchRequest) {
      return this.core.addRequest(
        "PrivacyManager.getAvailableLinkVisitActionColumnsToAnonymize",
        {}
      );
    }
    return this.core.request<string[]>(
      "PrivacyManager.getAvailableLinkVisitActionColumnsToAnonymize"
    );
  }
}
