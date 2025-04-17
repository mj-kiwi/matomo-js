/**
 * Matomo Annotations Module
 * API for annotations plugin. Provides methods to create, modify, delete & query annotations.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class AnnotationsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Add a new annotation
   *
   * @param idSite Site ID to add the annotation to
   * @param date Date for the annotation (YYYY-MM-DD)
   * @param note Text content of the annotation
   * @param starred Whether the annotation should be starred
   * @returns Information about the created annotation
   */
  async add(
    idSite: number | string,
    date: string,
    note: string,
    starred: boolean = false
  ): Promise<any> {
    return this.client.request('Annotations.add', {
      idSite,
      date,
      note,
      starred,
    });
  }

  /**
   * Save (update) an existing annotation
   *
   * @param idSite Site ID the annotation belongs to
   * @param idNote ID of the annotation to update
   * @param date Optional new date for the annotation
   * @param note Optional new text content for the annotation
   * @param starred Optional new starred status
   * @returns Success status of the operation
   */
  async save(
    idSite: number | string,
    idNote: number | string,
    date?: string,
    note?: string,
    starred?: boolean
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      idNote,
    };

    if (date !== undefined) params.date = date;
    if (note !== undefined) params.note = note;
    if (starred !== undefined) params.starred = starred;

    return this.client.request('Annotations.save', params);
  }

  /**
   * Delete an annotation
   *
   * @param idSite Site ID the annotation belongs to
   * @param idNote ID of the annotation to delete
   * @returns Success status of the operation
   */
  async delete(idSite: number | string, idNote: number | string): Promise<any> {
    return this.client.request('Annotations.delete', {
      idSite,
      idNote,
    });
  }

  /**
   * Delete all annotations for a site
   *
   * @param idSite Site ID to delete annotations for
   * @returns Success status of the operation
   */
  async deleteAll(idSite: number | string): Promise<any> {
    return this.client.request('Annotations.deleteAll', {
      idSite,
    });
  }

  /**
   * Get a specific annotation
   *
   * @param idSite Site ID the annotation belongs to
   * @param idNote ID of the annotation to retrieve
   * @returns Details of the requested annotation
   */
  async get(idSite: number | string, idNote: number | string): Promise<any> {
    return this.client.request('Annotations.get', {
      idSite,
      idNote,
    });
  }

  /**
   * Get all annotations for a site
   *
   * @param idSite Site ID to get annotations for (can be comma-separated list)
   * @param date Optional date to filter annotations
   * @param period Period to use when filtering by date ('day', 'week', etc.)
   * @param lastN Optional number of periods to include
   * @returns List of annotations for the specified site(s) and period
   */
  async getAll(
    idSite: string | number,
    date?: string,
    period: string = 'day',
    lastN?: number
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
    };

    if (date !== undefined) params.date = date;
    if (lastN !== undefined) params.lastN = lastN;

    return this.client.request('Annotations.getAll', params);
  }

  /**
   * Get annotation counts for a date range
   *
   * @param idSite Site ID to get annotation counts for
   * @param date Date or date range
   * @param period Period to use ('day', 'week', etc.)
   * @param lastN Optional number of periods to include
   * @param getAnnotationText Whether to include annotation text
   * @returns Counts of annotations by date
   */
  async getAnnotationCountForDates(
    idSite: string | number,
    date: string,
    period: string,
    lastN?: number,
    getAnnotationText: boolean = false
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      date,
      period,
      getAnnotationText,
    };

    if (lastN !== undefined) params.lastN = lastN;

    return this.client.request(
      'Annotations.getAnnotationCountForDates',
      params
    );
  }
}
