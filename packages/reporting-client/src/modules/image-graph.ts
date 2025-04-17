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

import { CoreReportingClient, RequestParams } from './core.js';

export class ImageGraphModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Generate a static graph image for a specific report
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param apiModule API module to get data from
   * @param apiAction API action to call
   * @param graphType Type of graph (evolution, verticalBar, pie, 3dPie)
   * @param outputType Output format
   * @param columns Metrics to show in the graph
   * @param labels Custom axis labels
   * @param showLegend Whether to show the legend
   * @param width Width of the image
   * @param height Height of the image
   * @param fontSize Font size
   * @param legendFontSize Legend font size
   * @param aliasedGraph Whether to use anti-aliasing
   * @param idGoal Goal ID to filter by
   * @param colors Comma-separated list of custom colors
   * @param textColor Text color
   * @param backgroundColor Background color
   * @param gridColor Grid color
   * @param idSubtable Subtable ID
   * @param legendAppendMetric Append metric to the legend
   * @param segment Optional segment definition
   * @param idDimension Optional dimension ID
   * @returns Promise with the image data
   */
  get(
    idSite: number | string,
    period: string,
    date: string,
    apiModule: string,
    apiAction: string,
    graphType: string = '',
    outputType: string = '0',
    columns: string = '',
    labels: string = '',
    showLegend: boolean | string = '1',
    width: string | number = '',
    height: string | number = '',
    fontSize: string | number = '9',
    legendFontSize: string | number = '',
    aliasedGraph: boolean | string = '1',
    idGoal: string | number = '',
    colors: string = '',
    textColor: string = '222222',
    backgroundColor: string = 'FFFFFF',
    gridColor: string = 'CCCCCC',
    idSubtable: string | number = '',
    legendAppendMetric: boolean | string = '1',
    segment: string = '',
    idDimension: string | number = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      apiModule,
      apiAction,
    };

    if (graphType) params.graphType = graphType;
    if (outputType !== '0') params.outputType = outputType;
    if (columns) params.columns = columns;
    if (labels) params.labels = labels;
    if (showLegend !== '1') params.showLegend = showLegend;
    if (width) params.width = width;
    if (height) params.height = height;
    if (fontSize !== '9') params.fontSize = fontSize;
    if (legendFontSize) params.legendFontSize = legendFontSize;
    if (aliasedGraph !== '1') params.aliasedGraph = aliasedGraph;
    if (idGoal !== '') params.idGoal = idGoal;
    if (colors) params.colors = colors;
    if (textColor !== '222222') params.textColor = textColor;
    if (backgroundColor !== 'FFFFFF') params.backgroundColor = backgroundColor;
    if (gridColor !== 'CCCCCC') params.gridColor = gridColor;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (legendAppendMetric !== '1')
      params.legendAppendMetric = legendAppendMetric;
    if (segment) params.segment = segment;
    if (idDimension !== '') params.idDimension = idDimension;

    return this.client.request('ImageGraph.get', params);
  }
}
