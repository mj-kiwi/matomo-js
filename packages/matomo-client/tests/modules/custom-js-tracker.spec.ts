import { describe, it, expect, vi, beforeEach } from "vitest";
import { CustomJsTrackerModule } from "../../src/index";

describe("CustomJsTrackerModule", () => {
  let mockClient: any;
  let module: CustomJsTrackerModule;

  beforeEach(() => {
    mockClient = {
      request: vi.fn().mockResolvedValue({}),
    };
    module = new CustomJsTrackerModule(mockClient);
  });

  it("should check if plugin trackers are included automatically", async () => {
    await module.doesIncludePluginTrackersAutomatically();
    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomJsTracker.doesIncludePluginTrackersAutomatically",
      {}
    );
  });
});
