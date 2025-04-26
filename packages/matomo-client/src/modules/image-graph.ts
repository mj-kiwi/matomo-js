/**
 * Matomo ImageGraph Module
 *
 * The ImageGraph.get API call lets you generate beautiful static PNG Graphs for any existing Matomo report.
 * Supported graph types are: line plot, 2D/3D pie chart and vertical bar chart.
 *
 * A few notes about some of the parameters available:
 * - $graphType defines the type of graph plotted, accepted values are: 'evolution', 'verticalBar', 'pie' and '3dPie'
 * - $colors accepts a comma delimited list of colors that will overwrite the default Matomo colors
 * - you can also customize the width, height, font size, metric being plotted (in case the data contains multiple columns/metrics)
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Parameters for generating a graph
 */
export interface ImageGraphParams extends RequestParams {
  /** Site ID */
  idSite: number | string;
  /** Period to request data for */
  period: string;
  /** Date string */
  date: string;
  /** API module to get data from */
  apiModule: string;
  /** API action to call */
  apiAction: string;
  /** Type of graph (evolution, verticalBar, pie, 3dPie) */
  graphType?: string;
  /** Output format */
  outputType?: string;
  /** Metrics to show in the graph */
  columns?: string;
  /** Custom axis labels */
  labels?: string;
  /** Whether to show the legend */
  showLegend?: boolean | string;
  /** Width of the image */
  width?: string | number;
  /** Height of the image */
  height?: string | number;
  /** Font size */
  fontSize?: string | number;
  /** Legend font size */
  legendFontSize?: string | number;
  /** Whether to use anti-aliasing */
  aliasedGraph?: boolean | string;
  /** Goal ID to filter by */
  idGoal?: string | number;
  /** Comma-separated list of custom colors */
  colors?: string;
  /** Text color */
  textColor?: string;
  /** Background color */
  backgroundColor?: string;
  /** Grid color */
  gridColor?: string;
  /** Subtable ID */
  idSubtable?: string | number;
  /** Append metric to the legend */
  legendAppendMetric?: boolean | string;
  /** Optional segment definition */
  segment?: string;
  /** Optional dimension ID */
  idDimension?: string | number;
}

export class ImageGraphModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Generate a static graph image for a specific report
   *
   * @param params Parameters for generating the graph
   * @returns Promise with the image data
   */
  get(params: ImageGraphParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("ImageGraph.get", params);
    }
    return this.client.request("ImageGraph.get", params);
  }
}
