/**
 * Matomo Funnels Module
 *
 * API for the Funnels plugin which lets you create, manage, and analyze conversion funnels.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class FunnelsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get funnel metrics
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idFunnel Optional funnel ID to filter by
   * @param idGoal Optional goal ID to filter by
   * @param segment Optional segment definition
   * @returns Promise with the funnel metrics
   */
  getMetrics(
    idSite: number | string,
    period: string,
    date: string,
    idFunnel: string | number = '',
    idGoal: string | number = '',
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (idFunnel !== '') params.idFunnel = idFunnel;
    if (idGoal !== '') params.idGoal = idGoal;
    if (segment) params.segment = segment;

    return this.client.request('Funnels.getMetrics', params);
  }

  /**
   * Get funnel flow visualization data
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idFunnel Optional funnel ID to filter by
   * @param idGoal Optional goal ID to filter by
   * @param segment Optional segment definition
   * @returns Promise with the funnel flow data for visualization
   */
  getFunnelFlow(
    idSite: number | string,
    period: string,
    date: string,
    idFunnel: string | number = '',
    idGoal: string | number = '',
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (idFunnel !== '') params.idFunnel = idFunnel;
    if (idGoal !== '') params.idGoal = idGoal;
    if (segment) params.segment = segment;

    return this.client.request('Funnels.getFunnelFlow', params);
  }

  /**
   * Get funnel flow as table data
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idFunnel Optional funnel ID to filter by
   * @param idGoal Optional goal ID to filter by
   * @param segment Optional segment definition
   * @returns Promise with the funnel flow data in table format
   */
  getFunnelFlowTable(
    idSite: number | string,
    period: string,
    date: string,
    idFunnel: string | number = '',
    idGoal: string | number = '',
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (idFunnel !== '') params.idFunnel = idFunnel;
    if (idGoal !== '') params.idGoal = idGoal;
    if (segment) params.segment = segment;

    return this.client.request('Funnels.getFunnelFlowTable', params);
  }

  /**
   * Get funnel step subtable
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param stepPosition Step position in the funnel
   * @param idFunnel Optional funnel ID to filter by
   * @param idGoal Optional goal ID to filter by
   * @param segment Optional segment definition
   * @returns Promise with the funnel step subtable data
   */
  getFunnelStepSubtable(
    idSite: number | string,
    period: string,
    date: string,
    stepPosition: number | string,
    idFunnel: string | number = '',
    idGoal: string | number = '',
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      stepPosition,
    };

    if (idFunnel !== '') params.idFunnel = idFunnel;
    if (idGoal !== '') params.idGoal = idGoal;
    if (segment) params.segment = segment;

    return this.client.request('Funnels.getFunnelStepSubtable', params);
  }

  /**
   * Get funnel entries
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idFunnel Funnel ID
   * @param segment Optional segment definition
   * @param step Optional step filter
   * @param expanded Optional expanded flag
   * @param idSubtable Optional subtable ID
   * @param flat Optional flat report flag
   * @returns Promise with the funnel entries data
   */
  getFunnelEntries(
    idSite: number | string,
    period: string,
    date: string,
    idFunnel: number | string,
    segment: string = '',
    step: string | number = '',
    expanded: string | boolean = '',
    idSubtable: string | number = '',
    flat: string | boolean = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idFunnel,
    };

    if (segment) params.segment = segment;
    if (step !== '') params.step = step;
    if (expanded !== '') params.expanded = expanded;
    if (idSubtable !== '') params.idSubtable = idSubtable;
    if (flat !== '') params.flat = flat;

    return this.client.request('Funnels.getFunnelEntries', params);
  }

  /**
   * Get funnel exits
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param idFunnel Funnel ID
   * @param segment Optional segment definition
   * @param step Optional step filter
   * @returns Promise with the funnel exits data
   */
  getFunnelExits(
    idSite: number | string,
    period: string,
    date: string,
    idFunnel: number | string,
    segment: string = '',
    step: string | number = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
      idFunnel,
    };

    if (segment) params.segment = segment;
    if (step !== '') params.step = step;

    return this.client.request('Funnels.getFunnelExits', params);
  }

  /**
   * Get funnel for a specific goal
   *
   * @param idSite Site ID
   * @param idGoal Goal ID
   * @returns Promise with the goal funnel configuration
   */
  getGoalFunnel(
    idSite: number | string,
    idGoal: number | string
  ): Promise<any> {
    return this.client.request('Funnels.getGoalFunnel', {
      idSite,
      idGoal,
    });
  }

  /**
   * Get sales funnel for a site
   *
   * @param idSite Site ID
   * @returns Promise with the sales funnel data
   */
  getSalesFunnelForSite(idSite: number | string): Promise<any> {
    return this.client.request('Funnels.getSalesFunnelForSite', { idSite });
  }

  /**
   * Get a specific funnel
   *
   * @param idSite Site ID
   * @param idFunnel Funnel ID
   * @returns Promise with the funnel configuration
   */
  getFunnel(idSite: number | string, idFunnel: number | string): Promise<any> {
    return this.client.request('Funnels.getFunnel', {
      idSite,
      idFunnel,
    });
  }

  /**
   * Get all activated funnels for a site
   *
   * @param idSite Site ID
   * @returns Promise with the list of activated funnels
   */
  getAllActivatedFunnelsForSite(idSite: number | string): Promise<any> {
    return this.client.request('Funnels.getAllActivatedFunnelsForSite', {
      idSite,
    });
  }

  /**
   * Check if site has any activated funnels
   *
   * @param idSite Site ID
   * @returns Promise with boolean result
   */
  hasAnyActivatedFunnelForSite(idSite: number | string): Promise<boolean> {
    return this.client.request('Funnels.hasAnyActivatedFunnelForSite', {
      idSite,
    });
  }

  /**
   * Delete a goal funnel
   *
   * @param idSite Site ID
   * @param idGoal Goal ID
   * @returns Promise with the API response
   */
  deleteGoalFunnel(
    idSite: number | string,
    idGoal: number | string
  ): Promise<any> {
    return this.client.request('Funnels.deleteGoalFunnel', {
      idSite,
      idGoal,
    });
  }

  /**
   * Delete a non-goal funnel
   *
   * @param idSite Site ID
   * @param idFunnel Funnel ID
   * @returns Promise with the API response
   */
  deleteNonGoalFunnel(
    idSite: number | string,
    idFunnel: number | string
  ): Promise<any> {
    return this.client.request('Funnels.deleteNonGoalFunnel', {
      idSite,
      idFunnel,
    });
  }

  /**
   * Set a goal funnel configuration
   *
   * @param idSite Site ID
   * @param idGoal Goal ID
   * @param isActivated Whether the funnel is activated
   * @param steps Array of funnel steps
   * @returns Promise with the API response
   */
  setGoalFunnel(
    idSite: number | string,
    idGoal: number | string,
    isActivated: boolean,
    steps: any[]
  ): Promise<any> {
    return this.client.request('Funnels.setGoalFunnel', {
      idSite,
      idGoal,
      isActivated,
      steps,
    });
  }

  /**
   * Save a non-goal funnel
   *
   * @param idSite Site ID
   * @param idFunnel Funnel ID
   * @param funnelName Name of the funnel
   * @param steps Array of funnel steps
   * @returns Promise with the API response
   */
  saveNonGoalFunnel(
    idSite: number | string,
    idFunnel: number | string,
    funnelName: string,
    steps: any[]
  ): Promise<any> {
    return this.client.request('Funnels.saveNonGoalFunnel', {
      idSite,
      idFunnel,
      funnelName,
      steps,
    });
  }

  /**
   * Get available pattern matching methods for funnels
   *
   * @returns Promise with the list of available pattern matches
   */
  getAvailablePatternMatches(): Promise<any> {
    return this.client.request('Funnels.getAvailablePatternMatches');
  }

  /**
   * Test if a URL matches the funnel steps
   *
   * @param url URL to test
   * @param steps Array of funnel steps
   * @returns Promise with the matching results
   */
  testUrlMatchesSteps(url: string, steps: any[]): Promise<any> {
    return this.client.request('Funnels.testUrlMatchesSteps', {
      url,
      steps,
    });
  }
}
