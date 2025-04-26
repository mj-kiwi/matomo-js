/**
 * Matomo Annotations Module
 * API for annotations plugin. Provides methods to create, modify, delete & query annotations.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for annotation operations that require site ID and note ID
 */
export interface AnnotationParams extends RequestParams {
  /** Site ID the annotation belongs to */
  idSite: number | string;
  /** ID of the annotation */
  idNote: number | string;
}

/**
 * Parameters for operations that only require site ID
 */
export interface SiteParams extends RequestParams {
  /** Site ID to get or delete annotations for */
  idSite: number | string;
}

/**
 * Parameters for adding a new annotation
 */
export interface AddAnnotationParams extends RequestParams {
  /** Site ID to add the annotation to */
  idSite: number | string;
  /** Date for the annotation (YYYY-MM-DD) */
  date: string;
  /** Text content of the annotation */
  note: string;
  /** Whether the annotation should be starred */
  starred?: boolean;
}

/**
 * Parameters for saving (updating) an annotation
 */
export interface SaveAnnotationParams extends AnnotationParams {
  /** Optional new date for the annotation */
  date?: string;
  /** Optional new text content for the annotation */
  note?: string;
  /** Optional new starred status */
  starred?: boolean;
}

/**
 * Parameters for getting all annotations
 */
export interface GetAllAnnotationsParams extends RequestParams {
  /** Site ID to get annotations for (can be comma-separated list) */
  idSite: string | number;
  /** Optional date to filter annotations */
  date?: string;
  /** Period to use when filtering by date */
  period?: string;
  /** Optional number of periods to include */
  lastN?: number;
}

/**
 * Parameters for getting annotation counts
 */
export interface GetAnnotationCountParams extends RequestParams {
  /** Site ID to get annotation counts for */
  idSite: string | number;
  /** Date or date range */
  date: string;
  /** Period to use ('day', 'week', etc.) */
  period: string;
  /** Optional number of periods to include */
  lastN?: number;
  /** Whether to include annotation text */
  getAnnotationText?: boolean;
}

export class AnnotationsModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Add an annotation
   */
  async add(params: AddAnnotationParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Annotations.add", params);
    }
    return this.client.request("Annotations.add", params);
  }

  /**
   * Save an annotation
   */
  async save(params: SaveAnnotationParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Annotations.save", params);
    }
    return this.client.request("Annotations.save", params);
  }

  /**
   * Delete an annotation
   */
  async delete(params: AnnotationParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Annotations.delete", params);
    }
    return this.client.request("Annotations.delete", params);
  }

  /**
   * Delete all annotations for a site
   */
  async deleteAll(params: SiteParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Annotations.deleteAll", params);
    }
    return this.client.request("Annotations.deleteAll", params);
  }

  /**
   * Get an annotation by ID
   */
  async get(params: AnnotationParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Annotations.get", params);
    }
    return this.client.request("Annotations.get", params);
  }

  /**
   * Get all annotations for a site and date range
   */
  async getAll(params: GetAllAnnotationsParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("Annotations.getAll", params);
    }
    return this.client.request("Annotations.getAll", params);
  }

  /**
   * Get the count of annotations for the last N days
   */
  async getAnnotationCountForDates(
    params: GetAnnotationCountParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "Annotations.getAnnotationCountForDates",
        params
      );
    }
    return this.client.request(
      "Annotations.getAnnotationCountForDates",
      params
    );
  }
}
