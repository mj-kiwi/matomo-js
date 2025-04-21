import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getMatomoClient } from "../client.js";

export const registerTagManagerTools = (server: McpServer): void => {
  /**
   * Get available contexts in Tag Manager
   */
  server.tool(
    "matomo_tag_manager_get_available_contexts",
    "Get all available contexts in Matomo Tag Manager",
    {},
    async () => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.getAvailableContexts();
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching available contexts"
        );
      }
    }
  );

  /**
   * Get available environments in Tag Manager
   */
  server.tool(
    "matomo_tag_manager_get_available_environments",
    "Get all available environments in Matomo Tag Manager",
    {},
    async () => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.getAvailableEnvironments();
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching available environments"
        );
      }
    }
  );

  /**
   * Get available environments with publish capability
   */
  server.tool(
    "matomo_tag_manager_get_available_environments_with_publish_capability",
    "Get all available environments with publish capability for a site",
    {
      idSite: z.number().describe("Site ID to check for environments"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results =
          await client.tagManager.getAvailableEnvironmentsWithPublishCapability(
            {
              idSite: params.idSite,
            }
          );
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message ||
            "An error occurred fetching environments with publish capability"
        );
      }
    }
  );

  /**
   * Get available tag fire limits
   */
  server.tool(
    "matomo_tag_manager_get_available_tag_fire_limits",
    "Get all available tag fire limits in Matomo Tag Manager",
    {},
    async () => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.getAvailableTagFireLimits();
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message ||
            "An error occurred fetching available tag fire limits"
        );
      }
    }
  );

  /**
   * Get available comparisons
   */
  server.tool(
    "matomo_tag_manager_get_available_comparisons",
    "Get all available comparisons in Matomo Tag Manager",
    {},
    async () => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.getAvailableComparisons();
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching available comparisons"
        );
      }
    }
  );

  /**
   * Get available tag types in context
   */
  server.tool(
    "matomo_tag_manager_get_available_tag_types_in_context",
    "Get all available tag types for a specific context",
    {
      idContext: z.string().describe("Context identifier"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.getAvailableTagTypesInContext({
          idContext: params.idContext,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching available tag types"
        );
      }
    }
  );

  /**
   * Get available trigger types in context
   */
  server.tool(
    "matomo_tag_manager_get_available_trigger_types_in_context",
    "Get all available trigger types for a specific context",
    {
      idContext: z.string().describe("Context identifier"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results =
          await client.tagManager.getAvailableTriggerTypesInContext({
            idContext: params.idContext,
          });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching available trigger types"
        );
      }
    }
  );

  /**
   * Get available variable types in context
   */
  server.tool(
    "matomo_tag_manager_get_available_variable_types_in_context",
    "Get all available variable types for a specific context",
    {
      idContext: z.string().describe("Context identifier"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results =
          await client.tagManager.getAvailableVariableTypesInContext({
            idContext: params.idContext,
          });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching available variable types"
        );
      }
    }
  );

  /**
   * Get container embed code
   */
  server.tool(
    "matomo_tag_manager_get_container_embed_code",
    "Get the embed code for a container",
    {
      idSite: z.number().describe("Site ID"),
      idContainer: z.string().describe("Container ID"),
      environment: z
        .string()
        .describe("Environment (e.g., live, dev, staging)"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.getContainerEmbedCode({
          idSite: params.idSite,
          idContainer: params.idContainer,
          environment: params.environment,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching container embed code"
        );
      }
    }
  );

  /**
   * Get container installation instructions
   */
  server.tool(
    "matomo_tag_manager_get_container_installation_instructions",
    "Get installation instructions for a container",
    {
      idSite: z.number().describe("Site ID"),
      idContainer: z.string().describe("Container ID"),
      environment: z
        .string()
        .describe("Environment (e.g., live, dev, staging)"),
      jsFramework: z.string().optional().describe("JavaScript framework"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.getContainerInstallInstructions(
          {
            idSite: params.idSite,
            idContainer: params.idContainer,
            environment: params.environment,
            jsFramework: params.jsFramework,
          }
        );
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message ||
            "An error occurred fetching container installation instructions"
        );
      }
    }
  );

  /**
   * Get container tags
   */
  server.tool(
    "matomo_tag_manager_get_container_tags",
    "Get all tags for a container version",
    {
      idSite: z.number().describe("Site ID"),
      idContainer: z.string().describe("Container ID"),
      idContainerVersion: z
        .union([z.string(), z.number()])
        .describe("Container version ID"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.getContainerTags({
          idSite: params.idSite,
          idContainer: params.idContainer,
          idContainerVersion: params.idContainerVersion,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching container tags"
        );
      }
    }
  );

  /**
   * Create default container for site
   */
  server.tool(
    "matomo_tag_manager_create_default_container_for_site",
    "Create a default container for a site",
    {
      idSite: z.number().describe("Site ID"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.createDefaultContainerForSite({
          idSite: params.idSite,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred creating default container"
        );
      }
    }
  );

  /**
   * Get containers
   */
  server.tool(
    "matomo_tag_manager_get_containers",
    "Get all containers for a site",
    {
      idSite: z.number().describe("Site ID"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.getContainers({
          idSite: params.idSite,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching containers"
        );
      }
    }
  );

  /**
   * Get a specific container
   */
  server.tool(
    "matomo_tag_manager_get_container",
    "Get a specific container",
    {
      idSite: z.number().describe("Site ID"),
      idContainer: z.string().describe("Container ID"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.getContainer({
          idSite: params.idSite,
          idContainer: params.idContainer,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching the container"
        );
      }
    }
  );

  /**
   * Get container versions
   */
  server.tool(
    "matomo_tag_manager_get_container_versions",
    "Get all versions for a container",
    {
      idSite: z.number().describe("Site ID"),
      idContainer: z.string().describe("Container ID"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.getContainerVersions({
          idSite: params.idSite,
          idContainer: params.idContainer,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching container versions"
        );
      }
    }
  );

  /**
   * Get a specific container version
   */
  server.tool(
    "matomo_tag_manager_get_container_version",
    "Get a specific container version",
    {
      idSite: z.number().describe("Site ID"),
      idContainer: z.string().describe("Container ID"),
      idContainerVersion: z
        .union([z.string(), z.number()])
        .describe("Container version ID"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.getContainerVersion({
          idSite: params.idSite,
          idContainer: params.idContainer,
          idContainerVersion: params.idContainerVersion,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching container version"
        );
      }
    }
  );

  /**
   * Get container triggers
   */
  server.tool(
    "matomo_tag_manager_get_container_triggers",
    "Get all triggers for a container version",
    {
      idSite: z.number().describe("Site ID"),
      idContainer: z.string().describe("Container ID"),
      idContainerVersion: z
        .union([z.string(), z.number()])
        .describe("Container version ID"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.getContainerTriggers({
          idSite: params.idSite,
          idContainer: params.idContainer,
          idContainerVersion: params.idContainerVersion,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching container triggers"
        );
      }
    }
  );

  /**
   * Get container variables
   */
  server.tool(
    "matomo_tag_manager_get_container_variables",
    "Get all variables for a container version",
    {
      idSite: z.number().describe("Site ID"),
      idContainer: z.string().describe("Container ID"),
      idContainerVersion: z
        .union([z.string(), z.number()])
        .describe("Container version ID"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.getContainerVariables({
          idSite: params.idSite,
          idContainer: params.idContainer,
          idContainerVersion: params.idContainerVersion,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred fetching container variables"
        );
      }
    }
  );

  /**
   * Enable preview mode
   */
  server.tool(
    "matomo_tag_manager_enable_preview_mode",
    "Enable preview mode for a container",
    {
      idSite: z.number().describe("Site ID"),
      idContainer: z.string().describe("Container ID"),
      idContainerVersion: z
        .string()
        .optional()
        .describe("Container version ID"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.enablePreviewMode({
          idSite: params.idSite,
          idContainer: params.idContainer,
          idContainerVersion: params.idContainerVersion,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred enabling preview mode"
        );
      }
    }
  );

  /**
   * Disable preview mode
   */
  server.tool(
    "matomo_tag_manager_disable_preview_mode",
    "Disable preview mode for a container",
    {
      idSite: z.number().describe("Site ID"),
      idContainer: z.string().describe("Container ID"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.disablePreviewMode({
          idSite: params.idSite,
          idContainer: params.idContainer,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred disabling preview mode"
        );
      }
    }
  );

  /**
   * Export container version
   */
  server.tool(
    "matomo_tag_manager_export_container_version",
    "Export a container version",
    {
      idSite: z.number().describe("Site ID"),
      idContainer: z.string().describe("Container ID"),
      idContainerVersion: z
        .string()
        .optional()
        .describe("Container version ID (if empty, exports draft version)"),
    },
    async (params) => {
      const client = getMatomoClient();
      try {
        const results = await client.tagManager.exportContainerVersion({
          idSite: params.idSite,
          idContainer: params.idContainer,
          idContainerVersion: params.idContainerVersion,
        });
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } catch (error: any) {
        throw new Error(
          error.message || "An error occurred exporting container version"
        );
      }
    }
  );
};
