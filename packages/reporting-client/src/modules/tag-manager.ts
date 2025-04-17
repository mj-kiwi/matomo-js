/**
 * Matomo TagManager Module
 * Provides access to tag manager functionality
 */

import { CoreReportingClient, RequestParams } from './core.js';

/**
 * Matomo TagManager module for managing containers, tags, triggers, and variables.
 */
export class TagManagerModule {
  constructor(private client: CoreReportingClient) {}

  /**
   * Get available contexts
   */
  async getAvailableContexts(): Promise<any> {
    return this.client.request('TagManager.getAvailableContexts', {});
  }

  /**
   * Get available environments
   */
  async getAvailableEnvironments(): Promise<any> {
    return this.client.request('TagManager.getAvailableEnvironments', {});
  }

  /**
   * Get available environments with publish capability for a site
   * @param idSite Site ID
   */
  async getAvailableEnvironmentsWithPublishCapability(
    idSite: number
  ): Promise<any> {
    return this.client.request(
      'TagManager.getAvailableEnvironmentsWithPublishCapability',
      { idSite }
    );
  }

  /**
   * Get available tag fire limits
   */
  async getAvailableTagFireLimits(): Promise<any> {
    return this.client.request('TagManager.getAvailableTagFireLimits', {});
  }

  /**
   * Get available comparisons
   */
  async getAvailableComparisons(): Promise<any> {
    return this.client.request('TagManager.getAvailableComparisons', {});
  }

  /**
   * Get available tag types in a context
   * @param idContext Context identifier
   */
  async getAvailableTagTypesInContext(idContext: string): Promise<any> {
    return this.client.request('TagManager.getAvailableTagTypesInContext', {
      idContext,
    });
  }

  /**
   * Get available trigger types in a context
   * @param idContext Context identifier
   */
  async getAvailableTriggerTypesInContext(idContext: string): Promise<any> {
    return this.client.request('TagManager.getAvailableTriggerTypesInContext', {
      idContext,
    });
  }

  /**
   * Get available variable types in a context
   * @param idContext Context identifier
   */
  async getAvailableVariableTypesInContext(idContext: string): Promise<any> {
    return this.client.request(
      'TagManager.getAvailableVariableTypesInContext',
      { idContext }
    );
  }

  /**
   * Get container embed code
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param environment Environment (e.g., live, dev, staging)
   */
  async getContainerEmbedCode(
    idSite: number,
    idContainer: string,
    environment: string
  ): Promise<any> {
    return this.client.request('TagManager.getContainerEmbedCode', {
      idSite,
      idContainer,
      environment,
    });
  }

  /**
   * Get container installation instructions
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param environment Environment (e.g., live, dev, staging)
   * @param jsFramework JavaScript framework
   */
  async getContainerInstallInstructions(
    idSite: number,
    idContainer: string,
    environment: string,
    jsFramework: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      idContainer,
      environment,
    };

    if (jsFramework) params.jsFramework = jsFramework;

    return this.client.request(
      'TagManager.getContainerInstallInstructions',
      params
    );
  }

  /**
   * Get container tags
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   */
  async getContainerTags(
    idSite: number,
    idContainer: string,
    idContainerVersion: number
  ): Promise<any> {
    return this.client.request('TagManager.getContainerTags', {
      idSite,
      idContainer,
      idContainerVersion,
    });
  }

  /**
   * Create a default container for a site
   * @param idSite Site ID
   */
  async createDefaultContainerForSite(idSite: number): Promise<any> {
    return this.client.request('TagManager.createDefaultContainerForSite', {
      idSite,
    });
  }

  /**
   * Add a container tag
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param type Tag type
   * @param name Tag name
   * @param parameters Tag parameters
   * @param fireTriggerIds Trigger IDs that will fire the tag
   * @param blockTriggerIds Trigger IDs that will block the tag
   * @param fireLimit Tag fire limit
   * @param fireDelay Tag fire delay in milliseconds
   * @param priority Tag priority
   * @param startDate Tag start date
   * @param endDate Tag end date
   * @param description Tag description
   * @param status Tag status
   */
  async addContainerTag(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    type: string,
    name: string,
    parameters: Record<string, any> = {},
    fireTriggerIds: string[] = [],
    blockTriggerIds: string[] = [],
    fireLimit: string = 'unlimited',
    fireDelay: string = '0',
    priority: string = '999',
    startDate: string = '',
    endDate: string = '',
    description: string = '',
    status: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      idContainer,
      idContainerVersion,
      type,
      name,
    };

    if (Object.keys(parameters).length > 0) params.parameters = parameters;
    if (fireTriggerIds.length > 0) params.fireTriggerIds = fireTriggerIds;
    if (blockTriggerIds.length > 0) params.blockTriggerIds = blockTriggerIds;
    if (fireLimit !== 'unlimited') params.fireLimit = fireLimit;
    if (fireDelay !== '0') params.fireDelay = fireDelay;
    if (priority !== '999') params.priority = priority;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (description) params.description = description;
    if (status) params.status = status;

    return this.client.request('TagManager.addContainerTag', params);
  }

  /**
   * Update a container tag
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param idTag Tag ID
   * @param name Tag name
   * @param parameters Tag parameters
   * @param fireTriggerIds Trigger IDs that will fire the tag
   * @param blockTriggerIds Trigger IDs that will block the tag
   * @param fireLimit Tag fire limit
   * @param fireDelay Tag fire delay in milliseconds
   * @param priority Tag priority
   * @param startDate Tag start date
   * @param endDate Tag end date
   * @param description Tag description
   */
  async updateContainerTag(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    idTag: string,
    name: string,
    parameters: Record<string, any> = {},
    fireTriggerIds: string[] = [],
    blockTriggerIds: string[] = [],
    fireLimit: string = 'unlimited',
    fireDelay: string = '0',
    priority: string = '999',
    startDate: string = '',
    endDate: string = '',
    description: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      idContainer,
      idContainerVersion,
      idTag,
      name,
    };

    if (Object.keys(parameters).length > 0) params.parameters = parameters;
    if (fireTriggerIds.length > 0) params.fireTriggerIds = fireTriggerIds;
    if (blockTriggerIds.length > 0) params.blockTriggerIds = blockTriggerIds;
    if (fireLimit !== 'unlimited') params.fireLimit = fireLimit;
    if (fireDelay !== '0') params.fireDelay = fireDelay;
    if (priority !== '999') params.priority = priority;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (description) params.description = description;

    return this.client.request('TagManager.updateContainerTag', params);
  }

  /**
   * Delete a container tag
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param idTag Tag ID
   */
  async deleteContainerTag(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    idTag: string
  ): Promise<any> {
    return this.client.request('TagManager.deleteContainerTag', {
      idSite,
      idContainer,
      idContainerVersion,
      idTag,
    });
  }

  /**
   * Pause a container tag
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param idTag Tag ID
   */
  async pauseContainerTag(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    idTag: string
  ): Promise<any> {
    return this.client.request('TagManager.pauseContainerTag', {
      idSite,
      idContainer,
      idContainerVersion,
      idTag,
    });
  }

  /**
   * Resume a container tag
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param idTag Tag ID
   */
  async resumeContainerTag(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    idTag: string
  ): Promise<any> {
    return this.client.request('TagManager.resumeContainerTag', {
      idSite,
      idContainer,
      idContainerVersion,
      idTag,
    });
  }

  /**
   * Get a specific container tag
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param idTag Tag ID
   */
  async getContainerTag(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    idTag: string
  ): Promise<any> {
    return this.client.request('TagManager.getContainerTag', {
      idSite,
      idContainer,
      idContainerVersion,
      idTag,
    });
  }

  /**
   * Get container trigger references
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param idTrigger Trigger ID
   */
  async getContainerTriggerReferences(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    idTrigger: string
  ): Promise<any> {
    return this.client.request('TagManager.getContainerTriggerReferences', {
      idSite,
      idContainer,
      idContainerVersion,
      idTrigger,
    });
  }

  /**
   * Get container triggers
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   */
  async getContainerTriggers(
    idSite: number,
    idContainer: string,
    idContainerVersion: number
  ): Promise<any> {
    return this.client.request('TagManager.getContainerTriggers', {
      idSite,
      idContainer,
      idContainerVersion,
    });
  }

  /**
   * Add a container trigger
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param type Trigger type
   * @param name Trigger name
   * @param parameters Trigger parameters
   * @param conditions Trigger conditions
   * @param description Trigger description
   */
  async addContainerTrigger(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    type: string,
    name: string,
    parameters: Record<string, any> = {},
    conditions: Record<string, any>[] = [],
    description: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      idContainer,
      idContainerVersion,
      type,
      name,
    };

    if (Object.keys(parameters).length > 0) params.parameters = parameters;
    if (conditions.length > 0) params.conditions = conditions;
    if (description) params.description = description;

    return this.client.request('TagManager.addContainerTrigger', params);
  }

  /**
   * Update a container trigger
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param idTrigger Trigger ID
   * @param name Trigger name
   * @param parameters Trigger parameters
   * @param conditions Trigger conditions
   * @param description Trigger description
   */
  async updateContainerTrigger(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    idTrigger: string,
    name: string,
    parameters: Record<string, any> = {},
    conditions: Record<string, any>[] = [],
    description: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      idContainer,
      idContainerVersion,
      idTrigger,
      name,
    };

    if (Object.keys(parameters).length > 0) params.parameters = parameters;
    if (conditions.length > 0) params.conditions = conditions;
    if (description) params.description = description;

    return this.client.request('TagManager.updateContainerTrigger', params);
  }

  /**
   * Delete a container trigger
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param idTrigger Trigger ID
   */
  async deleteContainerTrigger(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    idTrigger: string
  ): Promise<any> {
    return this.client.request('TagManager.deleteContainerTrigger', {
      idSite,
      idContainer,
      idContainerVersion,
      idTrigger,
    });
  }

  /**
   * Get a specific container trigger
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param idTrigger Trigger ID
   */
  async getContainerTrigger(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    idTrigger: string
  ): Promise<any> {
    return this.client.request('TagManager.getContainerTrigger', {
      idSite,
      idContainer,
      idContainerVersion,
      idTrigger,
    });
  }

  /**
   * Get container variable references
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param idVariable Variable ID
   */
  async getContainerVariableReferences(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    idVariable: string
  ): Promise<any> {
    return this.client.request('TagManager.getContainerVariableReferences', {
      idSite,
      idContainer,
      idContainerVersion,
      idVariable,
    });
  }

  /**
   * Get container variables
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   */
  async getContainerVariables(
    idSite: number,
    idContainer: string,
    idContainerVersion: number
  ): Promise<any> {
    return this.client.request('TagManager.getContainerVariables', {
      idSite,
      idContainer,
      idContainerVersion,
    });
  }

  /**
   * Get available container variables
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   */
  async getAvailableContainerVariables(
    idSite: number,
    idContainer: string,
    idContainerVersion: number
  ): Promise<any> {
    return this.client.request('TagManager.getAvailableContainerVariables', {
      idSite,
      idContainer,
      idContainerVersion,
    });
  }

  /**
   * Add a container variable
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param type Variable type
   * @param name Variable name
   * @param parameters Variable parameters
   * @param defaultValue Default value
   * @param lookupTable Lookup table
   * @param description Variable description
   */
  async addContainerVariable(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    type: string,
    name: string,
    parameters: Record<string, any> = {},
    defaultValue: string = '',
    lookupTable: Record<string, any>[] = [],
    description: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      idContainer,
      idContainerVersion,
      type,
      name,
    };

    if (Object.keys(parameters).length > 0) params.parameters = parameters;
    if (defaultValue) params.defaultValue = defaultValue;
    if (lookupTable.length > 0) params.lookupTable = lookupTable;
    if (description) params.description = description;

    return this.client.request('TagManager.addContainerVariable', params);
  }

  /**
   * Update a container variable
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param idVariable Variable ID
   * @param name Variable name
   * @param parameters Variable parameters
   * @param defaultValue Default value
   * @param lookupTable Lookup table
   * @param description Variable description
   */
  async updateContainerVariable(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    idVariable: string,
    name: string,
    parameters: Record<string, any> = {},
    defaultValue: string = '',
    lookupTable: Record<string, any>[] = [],
    description: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      idContainer,
      idContainerVersion,
      idVariable,
      name,
    };

    if (Object.keys(parameters).length > 0) params.parameters = parameters;
    if (defaultValue) params.defaultValue = defaultValue;
    if (lookupTable.length > 0) params.lookupTable = lookupTable;
    if (description) params.description = description;

    return this.client.request('TagManager.updateContainerVariable', params);
  }

  /**
   * Delete a container variable
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param idVariable Variable ID
   */
  async deleteContainerVariable(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    idVariable: string
  ): Promise<any> {
    return this.client.request('TagManager.deleteContainerVariable', {
      idSite,
      idContainer,
      idContainerVersion,
      idVariable,
    });
  }

  /**
   * Get a specific container variable
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param idVariable Variable ID
   */
  async getContainerVariable(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    idVariable: string
  ): Promise<any> {
    return this.client.request('TagManager.getContainerVariable', {
      idSite,
      idContainer,
      idContainerVersion,
      idVariable,
    });
  }

  /**
   * Get containers for a site
   * @param idSite Site ID
   */
  async getContainers(idSite: number): Promise<any> {
    return this.client.request('TagManager.getContainers', { idSite });
  }

  /**
   * Add a container
   * @param idSite Site ID
   * @param context Context (e.g., web, android, ios)
   * @param name Container name
   * @param description Container description
   * @param ignoreGtmDataLayer Whether to ignore Google Tag Manager data layer
   * @param isTagFireLimitAllowedInPreviewMode Whether fire limits are allowed in preview mode
   * @param activelySyncGtmDataLayer Whether to actively sync with Google Tag Manager data layer
   */
  async addContainer(
    idSite: number,
    context: string,
    name: string,
    description: string = '',
    ignoreGtmDataLayer: string = '0',
    isTagFireLimitAllowedInPreviewMode: string = '0',
    activelySyncGtmDataLayer: string = '0'
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      context,
      name,
    };

    if (description) params.description = description;
    if (ignoreGtmDataLayer !== '0')
      params.ignoreGtmDataLayer = ignoreGtmDataLayer;
    if (isTagFireLimitAllowedInPreviewMode !== '0')
      params.isTagFireLimitAllowedInPreviewMode =
        isTagFireLimitAllowedInPreviewMode;
    if (activelySyncGtmDataLayer !== '0')
      params.activelySyncGtmDataLayer = activelySyncGtmDataLayer;

    return this.client.request('TagManager.addContainer', params);
  }

  /**
   * Update a container
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param name Container name
   * @param description Container description
   * @param ignoreGtmDataLayer Whether to ignore Google Tag Manager data layer
   * @param isTagFireLimitAllowedInPreviewMode Whether fire limits are allowed in preview mode
   * @param activelySyncGtmDataLayer Whether to actively sync with Google Tag Manager data layer
   */
  async updateContainer(
    idSite: number,
    idContainer: string,
    name: string,
    description: string = '',
    ignoreGtmDataLayer: string = '0',
    isTagFireLimitAllowedInPreviewMode: string = '0',
    activelySyncGtmDataLayer: string = '0'
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      idContainer,
      name,
    };

    if (description) params.description = description;
    if (ignoreGtmDataLayer !== '0')
      params.ignoreGtmDataLayer = ignoreGtmDataLayer;
    if (isTagFireLimitAllowedInPreviewMode !== '0')
      params.isTagFireLimitAllowedInPreviewMode =
        isTagFireLimitAllowedInPreviewMode;
    if (activelySyncGtmDataLayer !== '0')
      params.activelySyncGtmDataLayer = activelySyncGtmDataLayer;

    return this.client.request('TagManager.updateContainer', params);
  }

  /**
   * Create a container version
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param name Version name
   * @param description Version description
   * @param idContainerVersion Base container version ID to copy from
   */
  async createContainerVersion(
    idSite: number,
    idContainer: string,
    name: string,
    description: string = '',
    idContainerVersion: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      idContainer,
      name,
    };

    if (description) params.description = description;
    if (idContainerVersion) params.idContainerVersion = idContainerVersion;

    return this.client.request('TagManager.createContainerVersion', params);
  }

  /**
   * Update a container version
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param name Version name
   * @param description Version description
   */
  async updateContainerVersion(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    name: string,
    description: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      idContainer,
      idContainerVersion,
      name,
    };

    if (description) params.description = description;

    return this.client.request('TagManager.updateContainerVersion', params);
  }

  /**
   * Get container versions
   * @param idSite Site ID
   * @param idContainer Container ID
   */
  async getContainerVersions(
    idSite: number,
    idContainer: string
  ): Promise<any> {
    return this.client.request('TagManager.getContainerVersions', {
      idSite,
      idContainer,
    });
  }

  /**
   * Get a specific container version
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   */
  async getContainerVersion(
    idSite: number,
    idContainer: string,
    idContainerVersion: number
  ): Promise<any> {
    return this.client.request('TagManager.getContainerVersion', {
      idSite,
      idContainer,
      idContainerVersion,
    });
  }

  /**
   * Delete a container version
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   */
  async deleteContainerVersion(
    idSite: number,
    idContainer: string,
    idContainerVersion: number
  ): Promise<any> {
    return this.client.request('TagManager.deleteContainerVersion', {
      idSite,
      idContainer,
      idContainerVersion,
    });
  }

  /**
   * Publish a container version to an environment
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   * @param environment Environment (e.g., live, dev, staging)
   */
  async publishContainerVersion(
    idSite: number,
    idContainer: string,
    idContainerVersion: number,
    environment: string
  ): Promise<any> {
    return this.client.request('TagManager.publishContainerVersion', {
      idSite,
      idContainer,
      idContainerVersion,
      environment,
    });
  }

  /**
   * Delete a container
   * @param idSite Site ID
   * @param idContainer Container ID
   */
  async deleteContainer(idSite: number, idContainer: string): Promise<any> {
    return this.client.request('TagManager.deleteContainer', {
      idSite,
      idContainer,
    });
  }

  /**
   * Get a specific container
   * @param idSite Site ID
   * @param idContainer Container ID
   */
  async getContainer(idSite: number, idContainer: string): Promise<any> {
    return this.client.request('TagManager.getContainer', {
      idSite,
      idContainer,
    });
  }

  /**
   * Enable preview mode for a container
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID
   */
  async enablePreviewMode(
    idSite: number,
    idContainer: string,
    idContainerVersion: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      idContainer,
    };

    if (idContainerVersion) params.idContainerVersion = idContainerVersion;

    return this.client.request('TagManager.enablePreviewMode', params);
  }

  /**
   * Disable preview mode for a container
   * @param idSite Site ID
   * @param idContainer Container ID
   */
  async disablePreviewMode(idSite: number, idContainer: string): Promise<any> {
    return this.client.request('TagManager.disablePreviewMode', {
      idSite,
      idContainer,
    });
  }

  /**
   * Change debug URL
   * @param idSite Site ID
   * @param url URL to debug
   */
  async changeDebugUrl(idSite: number, url: string): Promise<any> {
    return this.client.request('TagManager.changeDebugUrl', { idSite, url });
  }

  /**
   * Export a container version
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param idContainerVersion Container version ID (if empty, exports draft version)
   */
  async exportContainerVersion(
    idSite: number,
    idContainer: string,
    idContainerVersion: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      idSite,
      idContainer,
    };

    if (idContainerVersion) params.idContainerVersion = idContainerVersion;

    return this.client.request('TagManager.exportContainerVersion', params);
  }

  /**
   * Import a container version
   * @param exportedContainerVersion Exported container version JSON
   * @param idSite Site ID
   * @param idContainer Container ID
   * @param backupName Name for backup version
   */
  async importContainerVersion(
    exportedContainerVersion: string,
    idSite: number,
    idContainer: string,
    backupName: string = ''
  ): Promise<any> {
    const params: RequestParams = {
      exportedContainerVersion,
      idSite,
      idContainer,
    };

    if (backupName) params.backupName = backupName;

    return this.client.request('TagManager.importContainerVersion', params);
  }
}
