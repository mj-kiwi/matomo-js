/**
 * Matomo Annotations Module
 * API for annotations plugin. Provides methods to create, modify, delete & query annotations.
 */

import { CoreReportingClient, RequestParams } from "./core.js";

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
  constructor(private client: CoreReportingClient) {}

  /**
   * Add a new annotation
   *
   * @param params Parameters for adding a new annotation
   * @returns Information about the created annotation
   */
  async add(params: AddAnnotationParams): Promise<any> {
    const requestParams: RequestParams = {
      idSite: params.idSite,
      date: params.date,
      note: params.note,
      starred: params.starred ?? false,
    };

    return this.client.request("Annotations.add", requestParams);
  }

  /**
   * Save (update) an existing annotation
   *
   * @param params Parameters for saving an existing annotation
   * @returns Success status of the operation
   */
  async save(params: SaveAnnotationParams): Promise<any> {
    const requestParams: RequestParams = {
      idSite: params.idSite,
      idNote: params.idNote,
    };

    if (params.date !== undefined) requestParams.date = params.date;
    if (params.note !== undefined) requestParams.note = params.note;
    if (params.starred !== undefined) requestParams.starred = params.starred;

    return this.client.request("Annotations.save", requestParams);
  }

  /**
   * Delete an annotation
   *
   * @param params Parameters containing site ID and note ID
   * @returns Success status of the operation
   */
  async delete(params: AnnotationParams): Promise<any> {
    return this.client.request("Annotations.delete", params);
  }

  /**
   * Delete all annotations for a site
   *
   * @param params Parameters containing the site ID
   * @returns Success status of the operation
   */
  async deleteAll(params: SiteParams): Promise<any> {
    return this.client.request("Annotations.deleteAll", params);
  }

  /**
   * Get a specific annotation
   *
   * @param params Parameters containing site ID and note ID
   * @returns Details of the requested annotation
   */
  async get(params: AnnotationParams): Promise<any> {
    return this.client.request("Annotations.get", params);
  }

  /**
   * Get all annotations for a site
   *
   * @param params Parameters for getting all annotations
   * @returns List of annotations for the specified site(s) and period
   */
  async getAll(params: GetAllAnnotationsParams): Promise<any> {
    const requestParams: RequestParams = {
      idSite: params.idSite,
      period: params.period ?? "day",
    };

    if (params.date !== undefined) requestParams.date = params.date;
    if (params.lastN !== undefined) requestParams.lastN = params.lastN;

    return this.client.request("Annotations.getAll", requestParams);
  }

  /**
   * Get annotation counts for a date range
   *
   * @param params Parameters for getting annotation counts
   * @returns Counts of annotations by date
   */
  async getAnnotationCountForDates(
    params: GetAnnotationCountParams
  ): Promise<any> {
    const requestParams: RequestParams = {
      idSite: params.idSite,
      date: params.date,
      period: params.period,
      getAnnotationText: params.getAnnotationText ?? false,
    };

    if (params.lastN !== undefined) requestParams.lastN = params.lastN;

    return this.client.request(
      "Annotations.getAnnotationCountForDates",
      requestParams
    );
  }
}
