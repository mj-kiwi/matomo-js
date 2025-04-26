/**
 * Matomo TagManager Module
 * Provides access to tag manager functionality
 */

import { CoreReportingClient, RequestParams } from "./core.js";
import { BatchRequest } from "../batch-request.js";

/**
 * Base parameters for tag manager site-specific operations
 */
export interface TagManagerSiteParams extends RequestParams {
  /** Site ID */
  idSite: number;
}

/**
 * Parameters for container-specific operations
 */
export interface ContainerParams extends TagManagerSiteParams {
  /** Container ID */
  idContainer: string;
}

/**
 * Parameters for container version operations
 */
export interface ContainerVersionParams extends ContainerParams {
  /** Container version ID */
  idContainerVersion: number | string;
}

/**
 * Parameters for container tag operations
 */
export interface ContainerTagParams extends ContainerVersionParams {
  /** Tag ID */
  idTag?: string;
}

/**
 * Parameters for adding a container tag
 */
export interface AddContainerTagParams extends ContainerVersionParams {
  /** Tag type */
  type: string;
  /** Tag name */
  name: string;
  /** Tag parameters */
  parameters?: Record<string, any>;
  /** Trigger IDs that will fire the tag */
  fireTriggerIds?: string[];
  /** Trigger IDs that will block the tag */
  blockTriggerIds?: string[];
  /** Tag fire limit */
  fireLimit?: string;
  /** Tag fire delay in milliseconds */
  fireDelay?: string;
  /** Tag priority */
  priority?: string;
  /** Tag start date */
  startDate?: string;
  /** Tag end date */
  endDate?: string;
  /** Tag description */
  description?: string;
  /** Tag status */
  status?: string;
}

/**
 * Parameters for updating a container tag
 */
export interface UpdateContainerTagParams extends ContainerVersionParams {
  /** Tag ID */
  idTag: string;
  /** Tag name */
  name: string;
  /** Tag parameters */
  parameters?: Record<string, any>;
  /** Trigger IDs that will fire the tag */
  fireTriggerIds?: string[];
  /** Trigger IDs that will block the tag */
  blockTriggerIds?: string[];
  /** Tag fire limit */
  fireLimit?: string;
  /** Tag fire delay in milliseconds */
  fireDelay?: string;
  /** Tag priority */
  priority?: string;
  /** Tag start date */
  startDate?: string;
  /** Tag end date */
  endDate?: string;
  /** Tag description */
  description?: string;
  /** Tag status */
  status?: string;
}

/**
 * Parameters for container trigger operations
 */
export interface ContainerTriggerParams extends ContainerVersionParams {
  /** Trigger ID */
  idTrigger?: string;
}

/**
 * Parameters for adding a container trigger
 */
export interface AddContainerTriggerParams extends ContainerVersionParams {
  /** Trigger type */
  type: string;
  /** Trigger name */
  name: string;
  /** Trigger parameters */
  parameters?: Record<string, any>;
  /** Trigger conditions */
  conditions?: Record<string, any>[];
  /** Trigger description */
  description?: string;
}

/**
 * Parameters for updating a container trigger
 */
export interface UpdateContainerTriggerParams extends ContainerVersionParams {
  /** Trigger ID */
  idTrigger: string;
  /** Trigger name */
  name: string;
  /** Trigger parameters */
  parameters?: Record<string, any>;
  /** Trigger conditions */
  conditions?: Record<string, any>[];
  /** Trigger description */
  description?: string;
}

/**
 * Parameters for container variable operations
 */
export interface ContainerVariableParams extends ContainerVersionParams {
  /** Variable ID */
  idVariable?: string;
}

/**
 * Parameters for adding a container variable
 */
export interface AddContainerVariableParams extends ContainerVersionParams {
  /** Variable type */
  type: string;
  /** Variable name */
  name: string;
  /** Variable parameters */
  parameters?: Record<string, any>;
  /** Default value */
  defaultValue?: string;
  /** Lookup table */
  lookupTable?: Record<string, any>[];
  /** Variable description */
  description?: string;
}

/**
 * Parameters for updating a container variable
 */
export interface UpdateContainerVariableParams extends ContainerVersionParams {
  /** Variable ID */
  idVariable: string;
  /** Variable name */
  name: string;
  /** Variable parameters */
  parameters?: Record<string, any>;
  /** Default value */
  defaultValue?: string;
  /** Lookup table */
  lookupTable?: Record<string, any>[];
  /** Variable description */
  description?: string;
}

/**
 * Parameters for adding a container
 */
export interface AddContainerParams extends TagManagerSiteParams {
  /** Container context (e.g., web, android, ios) */
  context: string;
  /** Container name */
  name: string;
  /** Container description */
  description?: string;
  /** Whether to ignore Google Tag Manager data layer */
  ignoreGtmDataLayer?: string;
  /** Whether fire limits are allowed in preview mode */
  isTagFireLimitAllowedInPreviewMode?: string;
  /** Whether to actively sync with Google Tag Manager data layer */
  activelySyncGtmDataLayer?: string;
}

/**
 * Parameters for updating a container
 */
export interface UpdateContainerParams extends ContainerParams {
  /** Container name */
  name: string;
  /** Container description */
  description?: string;
  /** Whether to ignore Google Tag Manager data layer */
  ignoreGtmDataLayer?: string;
  /** Whether fire limits are allowed in preview mode */
  isTagFireLimitAllowedInPreviewMode?: string;
  /** Whether to actively sync with Google Tag Manager data layer */
  activelySyncGtmDataLayer?: string;
}

/**
 * Parameters for creating a container version
 */
export interface CreateContainerVersionParams extends ContainerParams {
  /** Version name */
  name: string;
  /** Version description */
  description?: string;
  /** Base container version ID to copy from */
  idContainerVersion?: string;
}

/**
 * Parameters for updating a container version
 */
export interface UpdateContainerVersionParams extends ContainerVersionParams {
  /** Version name */
  name: string;
  /** Version description */
  description?: string;
}

/**
 * Parameters for container embed code
 */
export interface ContainerEmbedCodeParams extends ContainerParams {
  /** Environment (e.g., live, dev, staging) */
  environment: string;
}

/**
 * Parameters for container installation instructions
 */
export interface ContainerInstallInstructionsParams
  extends ContainerEmbedCodeParams {
  /** JavaScript framework */
  jsFramework?: string;
}

/**
 * Parameters for publish container version
 */
export interface PublishContainerVersionParams extends ContainerVersionParams {
  /** Environment (e.g., live, dev, staging) */
  environment: string;
}

/**
 * Parameters for enable preview mode
 */
export interface EnablePreviewModeParams extends ContainerParams {
  /** Container version ID */
  idContainerVersion?: string;
}

/**
 * Parameters for change debug URL
 */
export interface ChangeDebugUrlParams extends TagManagerSiteParams {
  /** URL to debug */
  url: string;
}

/**
 * Parameters for export container version
 */
export interface ExportContainerVersionParams extends ContainerParams {
  /** Container version ID (if empty, exports draft version) */
  idContainerVersion?: string;
}

/**
 * Parameters for import container version
 */
export interface ImportContainerVersionParams extends ContainerParams {
  /** Exported container version JSON */
  exportedContainerVersion: string;
  /** Name for backup version */
  backupName?: string;
}

/**
 * Parameters for context-specific operations
 */
export interface ContextParams extends RequestParams {
  /** Context identifier */
  idContext: string;
}

/**
 * Matomo TagManager module for managing containers, tags, triggers, and variables.
 */
export class TagManagerModule {
  constructor(private client: CoreReportingClient | BatchRequest) {}

  /**
   * Get available contexts
   */
  async getAvailableContexts(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.getAvailableContexts", {});
    }
    return this.client.request("TagManager.getAvailableContexts", {});
  }

  /**
   * Get available environments
   */
  async getAvailableEnvironments(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.getAvailableEnvironments", {});
    }
    return this.client.request("TagManager.getAvailableEnvironments", {});
  }

  /**
   * Get available environments with publish capability for a site
   */
  async getAvailableEnvironmentsWithPublishCapability(
    params: TagManagerSiteParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.getAvailableEnvironmentsWithPublishCapability",
        params
      );
    }
    return this.client.request(
      "TagManager.getAvailableEnvironmentsWithPublishCapability",
      params
    );
  }

  /**
   * Get available tag fire limits
   */
  async getAvailableTagFireLimits(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.getAvailableTagFireLimits", {});
    }
    return this.client.request("TagManager.getAvailableTagFireLimits", {});
  }

  /**
   * Get available comparisons
   */
  async getAvailableComparisons(): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.getAvailableComparisons", {});
    }
    return this.client.request("TagManager.getAvailableComparisons", {});
  }

  /**
   * Get available tag types in a context
   */
  async getAvailableTagTypesInContext(params: ContextParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.getAvailableTagTypesInContext",
        params
      );
    }
    return this.client.request(
      "TagManager.getAvailableTagTypesInContext",
      params
    );
  }

  /**
   * Get available trigger types in a context
   */
  async getAvailableTriggerTypesInContext(params: ContextParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.getAvailableTriggerTypesInContext",
        params
      );
    }
    return this.client.request(
      "TagManager.getAvailableTriggerTypesInContext",
      params
    );
  }

  /**
   * Get available variable types in a context
   */
  async getAvailableVariableTypesInContext(
    params: ContextParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.getAvailableVariableTypesInContext",
        params
      );
    }
    return this.client.request(
      "TagManager.getAvailableVariableTypesInContext",
      params
    );
  }

  /**
   * Get container embed code
   */
  async getContainerEmbedCode(params: ContainerEmbedCodeParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.getContainerEmbedCode", params);
    }
    return this.client.request("TagManager.getContainerEmbedCode", params);
  }

  /**
   * Get container installation instructions
   */
  async getContainerInstallInstructions(
    params: ContainerInstallInstructionsParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.getContainerInstallInstructions",
        params
      );
    }
    return this.client.request(
      "TagManager.getContainerInstallInstructions",
      params
    );
  }

  /**
   * Get container tags
   */
  async getContainerTags(params: ContainerVersionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.getContainerTags", params);
    }
    return this.client.request("TagManager.getContainerTags", params);
  }

  /**
   * Create a default container for a site
   */
  async createDefaultContainerForSite(
    params: TagManagerSiteParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.createDefaultContainerForSite",
        params
      );
    }
    return this.client.request(
      "TagManager.createDefaultContainerForSite",
      params
    );
  }

  /**
   * Add a container tag
   */
  async addContainerTag(params: AddContainerTagParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.addContainerTag", params);
    }
    return this.client.request("TagManager.addContainerTag", params);
  }

  /**
   * Update a container tag
   */
  async updateContainerTag(params: UpdateContainerTagParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.updateContainerTag", params);
    }
    return this.client.request("TagManager.updateContainerTag", params);
  }

  /**
   * Delete a container tag
   */
  async deleteContainerTag(
    params: ContainerTagParams & { idTag: string }
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.deleteContainerTag", params);
    }
    return this.client.request("TagManager.deleteContainerTag", params);
  }

  /**
   * Pause a container tag
   */
  async pauseContainerTag(
    params: ContainerTagParams & { idTag: string }
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.pauseContainerTag", params);
    }
    return this.client.request("TagManager.pauseContainerTag", params);
  }

  /**
   * Resume a container tag
   */
  async resumeContainerTag(
    params: ContainerTagParams & { idTag: string }
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.resumeContainerTag", params);
    }
    return this.client.request("TagManager.resumeContainerTag", params);
  }

  /**
   * Get a specific container tag
   */
  async getContainerTag(
    params: ContainerTagParams & { idTag: string }
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.getContainerTag", params);
    }
    return this.client.request("TagManager.getContainerTag", params);
  }

  /**
   * Get container trigger references
   */
  async getContainerTriggerReferences(
    params: ContainerTriggerParams & { idTrigger: string }
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.getContainerTriggerReferences",
        params
      );
    }
    return this.client.request(
      "TagManager.getContainerTriggerReferences",
      params
    );
  }

  /**
   * Get container triggers
   */
  async getContainerTriggers(params: ContainerVersionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.getContainerTriggers", params);
    }
    return this.client.request("TagManager.getContainerTriggers", params);
  }

  /**
   * Add a container trigger
   */
  async addContainerTrigger(params: AddContainerTriggerParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.addContainerTrigger", params);
    }
    return this.client.request("TagManager.addContainerTrigger", params);
  }

  /**
   * Update a container trigger
   */
  async updateContainerTrigger(
    params: UpdateContainerTriggerParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.updateContainerTrigger",
        params
      );
    }
    return this.client.request("TagManager.updateContainerTrigger", params);
  }

  /**
   * Delete a container trigger
   */
  async deleteContainerTrigger(
    params: ContainerTriggerParams & { idTrigger: string }
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.deleteContainerTrigger",
        params
      );
    }
    return this.client.request("TagManager.deleteContainerTrigger", params);
  }

  /**
   * Get a specific container trigger
   */
  async getContainerTrigger(
    params: ContainerTriggerParams & { idTrigger: string }
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.getContainerTrigger", params);
    }
    return this.client.request("TagManager.getContainerTrigger", params);
  }

  /**
   * Get container variable references
   */
  async getContainerVariableReferences(
    params: ContainerVariableParams & { idVariable: string }
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.getContainerVariableReferences",
        params
      );
    }
    return this.client.request(
      "TagManager.getContainerVariableReferences",
      params
    );
  }

  /**
   * Get container variables
   */
  async getContainerVariables(params: ContainerVersionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.getContainerVariables", params);
    }
    return this.client.request("TagManager.getContainerVariables", params);
  }

  /**
   * Get available container variables
   */
  async getAvailableContainerVariables(
    params: ContainerVersionParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.getAvailableContainerVariables",
        params
      );
    }
    return this.client.request(
      "TagManager.getAvailableContainerVariables",
      params
    );
  }

  /**
   * Add a container variable
   */
  async addContainerVariable(params: AddContainerVariableParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.addContainerVariable", params);
    }
    return this.client.request("TagManager.addContainerVariable", params);
  }

  /**
   * Update a container variable
   */
  async updateContainerVariable(
    params: UpdateContainerVariableParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.updateContainerVariable",
        params
      );
    }
    return this.client.request("TagManager.updateContainerVariable", params);
  }

  /**
   * Delete a container variable
   */
  async deleteContainerVariable(
    params: ContainerVariableParams & { idVariable: string }
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.deleteContainerVariable",
        params
      );
    }
    return this.client.request("TagManager.deleteContainerVariable", params);
  }

  /**
   * Get a specific container variable
   */
  async getContainerVariable(
    params: ContainerVariableParams & { idVariable: string }
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.getContainerVariable", params);
    }
    return this.client.request("TagManager.getContainerVariable", params);
  }

  /**
   * Get containers for a site
   */
  async getContainers(params: TagManagerSiteParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.getContainers", params);
    }
    return this.client.request("TagManager.getContainers", params);
  }

  /**
   * Add a container
   */
  async addContainer(params: AddContainerParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.addContainer", params);
    }
    return this.client.request("TagManager.addContainer", params);
  }

  /**
   * Update a container
   */
  async updateContainer(params: UpdateContainerParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.updateContainer", params);
    }
    return this.client.request("TagManager.updateContainer", params);
  }

  /**
   * Create a container version
   */
  async createContainerVersion(
    params: CreateContainerVersionParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.createContainerVersion",
        params
      );
    }
    return this.client.request("TagManager.createContainerVersion", params);
  }

  /**
   * Update a container version
   */
  async updateContainerVersion(
    params: UpdateContainerVersionParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.updateContainerVersion",
        params
      );
    }
    return this.client.request("TagManager.updateContainerVersion", params);
  }

  /**
   * Get container versions
   */
  async getContainerVersions(params: ContainerParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.getContainerVersions", params);
    }
    return this.client.request("TagManager.getContainerVersions", params);
  }

  /**
   * Get a specific container version
   */
  async getContainerVersion(params: ContainerVersionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.getContainerVersion", params);
    }
    return this.client.request("TagManager.getContainerVersion", params);
  }

  /**
   * Delete a container version
   */
  async deleteContainerVersion(params: ContainerVersionParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.deleteContainerVersion",
        params
      );
    }
    return this.client.request("TagManager.deleteContainerVersion", params);
  }

  /**
   * Publish a container version to an environment
   */
  async publishContainerVersion(
    params: PublishContainerVersionParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.publishContainerVersion",
        params
      );
    }
    return this.client.request("TagManager.publishContainerVersion", params);
  }

  /**
   * Delete a container
   */
  async deleteContainer(params: ContainerParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.deleteContainer", params);
    }
    return this.client.request("TagManager.deleteContainer", params);
  }

  /**
   * Get a specific container
   */
  async getContainer(params: ContainerParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.getContainer", params);
    }
    return this.client.request("TagManager.getContainer", params);
  }

  /**
   * Enable preview mode for a container
   */
  async enablePreviewMode(params: EnablePreviewModeParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.enablePreviewMode", params);
    }
    return this.client.request("TagManager.enablePreviewMode", params);
  }

  /**
   * Disable preview mode for a container
   */
  async disablePreviewMode(params: ContainerParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.disablePreviewMode", params);
    }
    return this.client.request("TagManager.disablePreviewMode", params);
  }

  /**
   * Change debug URL
   */
  async changeDebugUrl(params: ChangeDebugUrlParams): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest("TagManager.changeDebugUrl", params);
    }
    return this.client.request("TagManager.changeDebugUrl", params);
  }

  /**
   * Export a container version
   */
  async exportContainerVersion(
    params: ExportContainerVersionParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.exportContainerVersion",
        params
      );
    }
    return this.client.request("TagManager.exportContainerVersion", params);
  }

  /**
   * Import a container version
   */
  async importContainerVersion(
    params: ImportContainerVersionParams
  ): Promise<any> {
    if (this.client instanceof BatchRequest) {
      return this.client.addRequest(
        "TagManager.importContainerVersion",
        params
      );
    }
    return this.client.request("TagManager.importContainerVersion", params);
  }
}
