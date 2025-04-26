/**
 * Matomo SegmentEditor Module
 *
 * The SegmentEditor API lets you add, update, delete custom Segments, and list saved segments.
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for segment operations that require a segment ID
 */
export interface SegmentIdParams extends RequestParams {
  /** ID of the segment */
  idSegment: number | string;
}

/**
 * Parameters for checking if user can add segments
 */
export interface UserCanAddSegmentParams extends RequestParams {
  /** Optional site ID to check against */
  idSite?: number | string;
}

/**
 * Parameters for getting all segments
 */
export interface GetAllSegmentsParams extends RequestParams {
  /** Optional site ID to filter segments */
  idSite?: number | string;
}

/**
 * Parameters for adding or updating a segment
 */
export interface SegmentParams extends RequestParams {
  /** Name of the segment */
  name: string;
  /** Segment definition */
  definition: string;
  /** Optional site ID (default: all sites) */
  idSite?: number | string;
  /** Whether to auto-archive the segment */
  autoArchive?: boolean;
  /** Whether the segment is enabled for all users */
  enabledAllUsers?: boolean;
}

/**
 * Parameters for updating a segment
 */
export interface UpdateSegmentParams extends SegmentParams {
  /** ID of the segment to update */
  idSegment: number | string;
}

export class SegmentEditorModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Check if the current user can add new segments
   *
   * @param params Parameters for checking if user can add segments
   * @returns Promise with a boolean indicating if the user can add new segments
   */
  async isUserCanAddNewSegment(
    params: UserCanAddSegmentParams = {}
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "SegmentEditor.isUserCanAddNewSegment",
        params
      );
    }
    return await this.client.request(
      "SegmentEditor.isUserCanAddNewSegment",
      params
    );
  }

  /**
   * Delete a segment
   *
   * @param params Parameters containing the segment ID
   * @returns Promise with the result of the API call
   */
  async delete(params: SegmentIdParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("SegmentEditor.delete", params);
    }
    return await this.client.request("SegmentEditor.delete", params);
  }

  /**
   * Update an existing segment
   *
   * @param params Parameters for updating a segment
   * @returns Promise with the result of the API call
   */
  async update(params: UpdateSegmentParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("SegmentEditor.update", params);
    }
    return await this.client.request("SegmentEditor.update", params);
  }

  /**
   * Add a new segment
   *
   * @param params Parameters for adding a new segment
   * @returns Promise with the result of the API call
   */
  async add(params: SegmentParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("SegmentEditor.add", params);
    }
    return await this.client.request("SegmentEditor.add", params);
  }

  /**
   * Get segment by ID
   *
   * @param params Parameters containing the segment ID
   * @returns Promise with the segment data
   */
  async get(params: SegmentIdParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("SegmentEditor.get", params);
    }
    return await this.client.request("SegmentEditor.get", params);
  }

  /**
   * Get all segments
   *
   * @param params Parameters for getting all segments
   * @returns Promise with the list of segments
   */
  async getAll(params: GetAllSegmentsParams = {}): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("SegmentEditor.getAll", params);
    }
    return await this.client.request("SegmentEditor.getAll", params);
  }
}
