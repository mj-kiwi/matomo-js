import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  HeatmapSessionRecordingModule,
  CoreReportingClient,
} from "../../src/index";

// Mock CoreReportingClient
vi.mock(import("../../src/index"), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe("HeatmapSessionRecordingModule", () => {
  let heatmapSessionRecordingModule: HeatmapSessionRecordingModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and module instance
    const clientInstance = new CoreReportingClient({
      url: "https://example.org/matomo",
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    heatmapSessionRecordingModule = new HeatmapSessionRecordingModule(
      clientInstance
    );
  });

  describe("addHeatmap", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.addHeatmap({
        idSite: 1,
        name: "Homepage Heatmap",
        matchPageRules: ["example.org"],
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.addHeatmap",
        {
          idSite: 1,
          name: "Homepage Heatmap",
          matchPageRules: ["example.org"],
        }
      );
    });

    it("should include optional parameters when provided", async () => {
      await heatmapSessionRecordingModule.addHeatmap({
        idSite: 1,
        name: "Homepage Heatmap",
        matchPageRules: ["example.org"],
        sampleLimit: "2000",
        sampleRate: "10",
        excludedElements: ".no-track",
        screenshotUrl: "https://example.org/screenshot.jpg",
        breakpointMobile: "576",
        breakpointTablet: "768",
        captureDomManually: true,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.addHeatmap",
        {
          idSite: 1,
          name: "Homepage Heatmap",
          matchPageRules: ["example.org"],
          sampleLimit: "2000",
          sampleRate: "10",
          excludedElements: ".no-track",
          screenshotUrl: "https://example.org/screenshot.jpg",
          breakpointMobile: "576",
          breakpointTablet: "768",
          captureDomManually: true,
        }
      );
    });
  });

  describe("updateHeatmap", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.updateHeatmap({
        idSite: 1,
        idSiteHsr: 123,
        name: "Homepage Heatmap",
        matchPageRules: ["example.org"],
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.updateHeatmap",
        {
          idSite: 1,
          idSiteHsr: 123,
          name: "Homepage Heatmap",
          matchPageRules: ["example.org"],
        }
      );
    });
  });

  describe("deleteHeatmapScreenshot", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.deleteHeatmapScreenshot({
        idSite: 1,
        idSiteHsr: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.deleteHeatmapScreenshot",
        {
          idSite: 1,
          idSiteHsr: 123,
        }
      );
    });
  });

  describe("addSessionRecording", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.addSessionRecording({
        idSite: 1,
        name: "Session Recording",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.addSessionRecording",
        {
          idSite: 1,
          name: "Session Recording",
        }
      );
    });

    it("should include custom parameters when provided", async () => {
      await heatmapSessionRecordingModule.addSessionRecording({
        idSite: 1,
        name: "Session Recording",
        matchPageRules: ["example.org"],
        sampleLimit: "2000",
        sampleRate: "20",
        minSessionTime: "30",
        requiresActivity: false,
        captureKeystrokes: false,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.addSessionRecording",
        {
          idSite: 1,
          name: "Session Recording",
          matchPageRules: ["example.org"],
          sampleLimit: "2000",
          sampleRate: "20",
          minSessionTime: "30",
          requiresActivity: false,
          captureKeystrokes: false,
        }
      );
    });
  });

  describe("updateSessionRecording", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.updateSessionRecording({
        idSite: 1,
        idSiteHsr: 123,
        name: "Session Recording",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.updateSessionRecording",
        {
          idSite: 1,
          idSiteHsr: 123,
          name: "Session Recording",
        }
      );
    });
  });

  describe("getHeatmap", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.getHeatmap({
        idSite: 1,
        idSiteHsr: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getHeatmap",
        {
          idSite: 1,
          idSiteHsr: 123,
        }
      );
    });
  });

  describe("getSessionRecording", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.getSessionRecording({
        idSite: 1,
        idSiteHsr: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getSessionRecording",
        {
          idSite: 1,
          idSiteHsr: 123,
        }
      );
    });
  });

  describe("pauseHeatmap", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.pauseHeatmap({
        idSite: 1,
        idSiteHsr: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.pauseHeatmap",
        {
          idSite: 1,
          idSiteHsr: 123,
        }
      );
    });
  });

  describe("resumeHeatmap", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.resumeHeatmap({
        idSite: 1,
        idSiteHsr: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.resumeHeatmap",
        {
          idSite: 1,
          idSiteHsr: 123,
        }
      );
    });
  });

  describe("deleteHeatmap", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.deleteHeatmap({
        idSite: 1,
        idSiteHsr: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.deleteHeatmap",
        {
          idSite: 1,
          idSiteHsr: 123,
        }
      );
    });
  });

  describe("endHeatmap", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.endHeatmap({
        idSite: 1,
        idSiteHsr: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.endHeatmap",
        {
          idSite: 1,
          idSiteHsr: 123,
        }
      );
    });
  });

  describe("pauseSessionRecording", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.pauseSessionRecording({
        idSite: 1,
        idSiteHsr: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.pauseSessionRecording",
        {
          idSite: 1,
          idSiteHsr: 123,
        }
      );
    });
  });

  describe("resumeSessionRecording", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.resumeSessionRecording({
        idSite: 1,
        idSiteHsr: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.resumeSessionRecording",
        {
          idSite: 1,
          idSiteHsr: 123,
        }
      );
    });
  });

  describe("deleteSessionRecording", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.deleteSessionRecording({
        idSite: 1,
        idSiteHsr: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.deleteSessionRecording",
        {
          idSite: 1,
          idSiteHsr: 123,
        }
      );
    });
  });

  describe("endSessionRecording", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.endSessionRecording({
        idSite: 1,
        idSiteHsr: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.endSessionRecording",
        {
          idSite: 1,
          idSiteHsr: 123,
        }
      );
    });
  });

  describe("getHeatmaps", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.getHeatmaps({
        idSite: 1,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getHeatmaps",
        {
          idSite: 1,
        }
      );
    });

    it("should include optional parameters when provided", async () => {
      await heatmapSessionRecordingModule.getHeatmaps({
        idSite: 1,
        includePageTreeMirror: false,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getHeatmaps",
        {
          idSite: 1,
          includePageTreeMirror: false,
        }
      );
    });
  });

  describe("getSessionRecordings", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.getSessionRecordings({
        idSite: 1,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getSessionRecordings",
        {
          idSite: 1,
        }
      );
    });
  });

  describe("getRecordedSessions", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.getRecordedSessions({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idSiteHsr: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getRecordedSessions",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idSiteHsr: 123,
        }
      );
    });

    it("should include optional parameters when provided", async () => {
      await heatmapSessionRecordingModule.getRecordedSessions({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idSiteHsr: 123,
        segment: "deviceType==mobile",
        idSubtable: "456",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getRecordedSessions",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idSiteHsr: 123,
          segment: "deviceType==mobile",
          idSubtable: "456",
        }
      );
    });
  });

  describe("getRecordedSession", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.getRecordedSession({
        idSite: 1,
        idSiteHsr: 123,
        idLogHsr: 456,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getRecordedSession",
        {
          idSite: 1,
          idSiteHsr: 123,
          idLogHsr: 456,
        }
      );
    });
  });

  describe("deleteRecordedSession", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.deleteRecordedSession({
        idSite: 1,
        idSiteHsr: 123,
        idVisit: 456,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.deleteRecordedSession",
        {
          idSite: 1,
          idSiteHsr: 123,
          idVisit: 456,
        }
      );
    });
  });

  describe("deleteRecordedPageview", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.deleteRecordedPageview({
        idSite: 1,
        idSiteHsr: 123,
        idLogHsr: 456,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.deleteRecordedPageview",
        {
          idSite: 1,
          idSiteHsr: 123,
          idLogHsr: 456,
        }
      );
    });
  });

  describe("getRecordedHeatmapMetadata", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.getRecordedHeatmapMetadata({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idSiteHsr: 123,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getRecordedHeatmapMetadata",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idSiteHsr: 123,
        }
      );
    });

    it("should include optional parameters when provided", async () => {
      await heatmapSessionRecordingModule.getRecordedHeatmapMetadata({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idSiteHsr: 123,
        segment: "deviceType==desktop",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getRecordedHeatmapMetadata",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idSiteHsr: 123,
          segment: "deviceType==desktop",
        }
      );
    });
  });

  describe("getRecordedHeatmap", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.getRecordedHeatmap({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idSiteHsr: 123,
        heatmapType: "click",
        deviceType: "desktop",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getRecordedHeatmap",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idSiteHsr: 123,
          heatmapType: "click",
          deviceType: "desktop",
        }
      );
    });

    it("should include optional parameters when provided", async () => {
      await heatmapSessionRecordingModule.getRecordedHeatmap({
        idSite: 1,
        period: "day",
        date: "yesterday",
        idSiteHsr: 123,
        heatmapType: "click",
        deviceType: "desktop",
        segment: "deviceType==desktop",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getRecordedHeatmap",
        {
          idSite: 1,
          period: "day",
          date: "yesterday",
          idSiteHsr: 123,
          heatmapType: "click",
          deviceType: "desktop",
          segment: "deviceType==desktop",
        }
      );
    });
  });

  describe("getEmbedSessionInfo", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.getEmbedSessionInfo({
        idSite: 1,
        idSiteHsr: 123,
        idLogHsr: 456,
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getEmbedSessionInfo",
        {
          idSite: 1,
          idSiteHsr: 123,
          idLogHsr: 456,
        }
      );
    });
  });

  describe("testUrlMatchPages", () => {
    it("should call the API with required parameters", async () => {
      await heatmapSessionRecordingModule.testUrlMatchPages({
        url: "https://example.org/page",
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.testUrlMatchPages",
        {
          url: "https://example.org/page",
        }
      );
    });

    it("should include custom match rules when provided", async () => {
      await heatmapSessionRecordingModule.testUrlMatchPages({
        url: "https://example.org/page",
        matchPageRules: ["example.org"],
      });
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.testUrlMatchPages",
        {
          url: "https://example.org/page",
          matchPageRules: ["example.org"],
        }
      );
    });
  });

  describe("getAvailableStatuses", () => {
    it("should call the API with no parameters", async () => {
      await heatmapSessionRecordingModule.getAvailableStatuses();
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getAvailableStatuses"
      );
    });
  });

  describe("getAvailableTargetPageRules", () => {
    it("should call the API with no parameters", async () => {
      await heatmapSessionRecordingModule.getAvailableTargetPageRules();
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getAvailableTargetPageRules"
      );
    });
  });

  describe("getAvailableDeviceTypes", () => {
    it("should call the API with no parameters", async () => {
      await heatmapSessionRecordingModule.getAvailableDeviceTypes();
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getAvailableDeviceTypes"
      );
    });
  });

  describe("getAvailableHeatmapTypes", () => {
    it("should call the API with no parameters", async () => {
      await heatmapSessionRecordingModule.getAvailableHeatmapTypes();
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getAvailableHeatmapTypes"
      );
    });
  });

  describe("getAvailableSessionRecordingSampleLimits", () => {
    it("should call the API with no parameters", async () => {
      await heatmapSessionRecordingModule.getAvailableSessionRecordingSampleLimits();
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getAvailableSessionRecordingSampleLimits"
      );
    });
  });

  describe("getEventTypes", () => {
    it("should call the API with no parameters", async () => {
      await heatmapSessionRecordingModule.getEventTypes();
      expect(mockClient.request).toHaveBeenCalledWith(
        "HeatmapSessionRecording.getEventTypes"
      );
    });
  });
});
