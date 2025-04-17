/**
 * Matomo Goals Module
 *
 * The Goals API lets you manage existing goals, create new goals, and access goal metrics
 * including ecommerce orders and abandoned carts data.
 */

import { CoreReportingClient, RequestParams } from './core.js';

export class GoalsModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get a specific goal
   *
   * @param idSite Site ID
   * @param idGoal Goal ID
   * @returns Promise with the goal details
   */
  getGoal(idSite: number | string, idGoal: number | string): Promise<any> {
    return this.client.request('Goals.getGoal', {
      idSite,
      idGoal,
    });
  }

  /**
   * Get all goals for a site
   *
   * @param idSite Site ID
   * @param orderByName Optional flag to order goals by name
   * @returns Promise with the list of goals
   */
  getGoals(
    idSite: number | string,
    orderByName: boolean = false
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
    };

    if (orderByName) params.orderByName = orderByName;

    return this.client.request('Goals.getGoals', params);
  }

  /**
   * Add a new goal
   *
   * @param idSite Site ID
   * @param name Goal name
   * @param matchAttribute Attribute to match (manually, file, url, title, etc.)
   * @param pattern Pattern to match
   * @param patternType Type of pattern (contains, exact, regex, etc.)
   * @param caseSensitive Optional case sensitivity flag
   * @param revenue Optional revenue amount associated with the goal
   * @param allowMultipleConversionsPerVisit Optional flag to allow multiple conversions per visit
   * @param description Optional goal description
   * @param useEventValueAsRevenue Optional flag to use event value as revenue
   * @returns Promise with the API response
   */
  addGoal(
    idSite: number | string,
    name: string,
    matchAttribute: string,
    pattern: string,
    patternType: string,
    caseSensitive: boolean | string = '',
    revenue: number | string = '',
    allowMultipleConversionsPerVisit: boolean | string = '',
    description: string = '',
    useEventValueAsRevenue: boolean | string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      name,
      matchAttribute,
      pattern,
      patternType,
    };

    if (caseSensitive !== '') params.caseSensitive = caseSensitive;
    if (revenue !== '') params.revenue = revenue;
    if (allowMultipleConversionsPerVisit !== '')
      params.allowMultipleConversionsPerVisit =
        allowMultipleConversionsPerVisit;
    if (description) params.description = description;
    if (useEventValueAsRevenue !== '')
      params.useEventValueAsRevenue = useEventValueAsRevenue;

    return this.client.request('Goals.addGoal', params);
  }

  /**
   * Update an existing goal
   *
   * @param idSite Site ID
   * @param idGoal Goal ID
   * @param name Goal name
   * @param matchAttribute Attribute to match (manually, file, url, title, etc.)
   * @param pattern Pattern to match
   * @param patternType Type of pattern (contains, exact, regex, etc.)
   * @param caseSensitive Optional case sensitivity flag
   * @param revenue Optional revenue amount associated with the goal
   * @param allowMultipleConversionsPerVisit Optional flag to allow multiple conversions per visit
   * @param description Optional goal description
   * @param useEventValueAsRevenue Optional flag to use event value as revenue
   * @returns Promise with the API response
   */
  updateGoal(
    idSite: number | string,
    idGoal: number | string,
    name: string,
    matchAttribute: string,
    pattern: string,
    patternType: string,
    caseSensitive: boolean | string = '',
    revenue: number | string = '',
    allowMultipleConversionsPerVisit: boolean | string = '',
    description: string = '',
    useEventValueAsRevenue: boolean | string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      idGoal,
      name,
      matchAttribute,
      pattern,
      patternType,
    };

    if (caseSensitive !== '') params.caseSensitive = caseSensitive;
    if (revenue !== '') params.revenue = revenue;
    if (allowMultipleConversionsPerVisit !== '')
      params.allowMultipleConversionsPerVisit =
        allowMultipleConversionsPerVisit;
    if (description) params.description = description;
    if (useEventValueAsRevenue !== '')
      params.useEventValueAsRevenue = useEventValueAsRevenue;

    return this.client.request('Goals.updateGoal', params);
  }

  /**
   * Delete a goal
   *
   * @param idSite Site ID
   * @param idGoal Goal ID
   * @returns Promise with the API response
   */
  deleteGoal(idSite: number | string, idGoal: number | string): Promise<any> {
    return this.client.request('Goals.deleteGoal', {
      idSite,
      idGoal,
    });
  }

  /**
   * Get items by SKU (product codes)
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param abandonedCarts Optional flag to get data for abandoned carts instead of orders
   * @param segment Optional segment definition
   * @returns Promise with the items grouped by SKU
   */
  getItemsSku(
    idSite: number | string,
    period: string,
    date: string,
    abandonedCarts: boolean | string = '',
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (abandonedCarts !== '') params.abandonedCarts = abandonedCarts;
    if (segment) params.segment = segment;

    return this.client.request('Goals.getItemsSku', params);
  }

  /**
   * Get items by name (product names)
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param abandonedCarts Optional flag to get data for abandoned carts instead of orders
   * @param segment Optional segment definition
   * @returns Promise with the items grouped by name
   */
  getItemsName(
    idSite: number | string,
    period: string,
    date: string,
    abandonedCarts: boolean | string = '',
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (abandonedCarts !== '') params.abandonedCarts = abandonedCarts;
    if (segment) params.segment = segment;

    return this.client.request('Goals.getItemsName', params);
  }

  /**
   * Get items by category (product categories)
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param abandonedCarts Optional flag to get data for abandoned carts instead of orders
   * @param segment Optional segment definition
   * @returns Promise with the items grouped by category
   */
  getItemsCategory(
    idSite: number | string,
    period: string,
    date: string,
    abandonedCarts: boolean | string = '',
    segment: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (abandonedCarts !== '') params.abandonedCarts = abandonedCarts;
    if (segment) params.segment = segment;

    return this.client.request('Goals.getItemsCategory', params);
  }

  /**
   * Get goal conversion metrics
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param idGoal Optional goal ID to filter by
   * @param columns Optional columns to restrict the returned data
   * @param showAllGoalSpecificMetrics Optional flag to show all goal-specific metrics
   * @param compare Optional comparison parameters
   * @returns Promise with the goal conversion metrics
   */
  get(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    idGoal: string | number = '',
    columns: string | string[] = [],
    showAllGoalSpecificMetrics: boolean | string = '',
    compare: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (idGoal !== '') params.idGoal = idGoal;
    if (Array.isArray(columns)) {
      if (columns.length > 0) params.columns = columns.join(',');
    } else if (columns) {
      params.columns = columns;
    }
    if (showAllGoalSpecificMetrics !== '')
      params.showAllGoalSpecificMetrics = showAllGoalSpecificMetrics;
    if (compare) params.compare = compare;

    return this.client.request('Goals.get', params);
  }

  /**
   * Get days to conversion report
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param idGoal Optional goal ID to filter by
   * @returns Promise with the days to conversion report
   */
  getDaysToConversion(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    idGoal: string | number = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (idGoal !== '') params.idGoal = idGoal;

    return this.client.request('Goals.getDaysToConversion', params);
  }

  /**
   * Get visits until conversion report
   *
   * @param idSite Site ID
   * @param period Period to request data for
   * @param date Date string
   * @param segment Optional segment definition
   * @param idGoal Optional goal ID to filter by
   * @returns Promise with the visits until conversion report
   */
  getVisitsUntilConversion(
    idSite: number | string,
    period: string,
    date: string,
    segment: string = '',
    idGoal: string | number = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      period,
      date,
    };

    if (segment) params.segment = segment;
    if (idGoal !== '') params.idGoal = idGoal;

    return this.client.request('Goals.getVisitsUntilConversion', params);
  }
}
