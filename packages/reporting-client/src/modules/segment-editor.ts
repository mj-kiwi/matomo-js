/**
 * Matomo SegmentEditor Module
 *
 * The SegmentEditor API lets you add, update, delete custom Segments, and list saved segments.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class SegmentEditorModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Check if the current user can add new segments
   *
   * @param idSite Optional Site ID
   * @returns Promise with a boolean indicating if the user can add new segments
   */
  async isUserCanAddNewSegment(idSite?: number | string): Promise<any> {
    const params: RequestParams = {};

    if (idSite !== undefined) params.idSite = idSite;

    return this.client.request('SegmentEditor.isUserCanAddNewSegment', params);
  }

  /**
   * Delete a segment
   *
   * @param idSegment ID of the segment to delete
   * @returns Promise with the result of the API call
   */
  async delete(idSegment: number | string): Promise<any> {
    return this.client.request('SegmentEditor.delete', {
      idSegment,
    });
  }

  /**
   * Update an existing segment
   *
   * @param idSegment ID of the segment to update
   * @param name Name of the segment
   * @param definition Segment definition
   * @param idSite Optional Site ID (default: all sites)
   * @param autoArchive Whether to auto-archive the segment
   * @param enabledAllUsers Whether the segment is enabled for all users
   * @returns Promise with the result of the API call
   */
  async update(
    idSegment: number | string,
    name: string,
    definition: string,
    idSite: number | string = '',
    autoArchive: boolean = false,
    enabledAllUsers: boolean = false
  ): Promise<any> {
    const params: RequestParams = {
      idSegment,
      name,
      definition,
    };

    if (idSite !== '') params.idSite = idSite;
    if (autoArchive) params.autoArchive = autoArchive;
    if (enabledAllUsers) params.enabledAllUsers = enabledAllUsers;

    return this.client.request('SegmentEditor.update', params);
  }

  /**
   * Add a new segment
   *
   * @param name Name of the segment
   * @param definition Segment definition
   * @param idSite Optional Site ID (default: all sites)
   * @param autoArchive Whether to auto-archive the segment
   * @param enabledAllUsers Whether the segment is enabled for all users
   * @returns Promise with the result of the API call
   */
  async add(
    name: string,
    definition: string,
    idSite: number | string = '',
    autoArchive: boolean = false,
    enabledAllUsers: boolean = false
  ): Promise<any> {
    const params: RequestParams = {
      name,
      definition,
    };

    if (idSite !== '') params.idSite = idSite;
    if (autoArchive) params.autoArchive = autoArchive;
    if (enabledAllUsers) params.enabledAllUsers = enabledAllUsers;

    return this.client.request('SegmentEditor.add', params);
  }

  /**
   * Get segment by ID
   *
   * @param idSegment ID of the segment to get
   * @returns Promise with the segment data
   */
  async get(idSegment: number | string): Promise<any> {
    return this.client.request('SegmentEditor.get', {
      idSegment,
    });
  }

  /**
   * Get all segments
   *
   * @param idSite Optional Site ID to filter segments
   * @returns Promise with the list of segments
   */
  async getAll(idSite: number | string = ''): Promise<any> {
    const params: RequestParams = {};

    if (idSite !== '') params.idSite = idSite;

    return this.client.request('SegmentEditor.getAll', params);
  }
}
