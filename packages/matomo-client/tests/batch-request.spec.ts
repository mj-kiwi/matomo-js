import { describe, it, expect, vi, beforeEach } from "vitest";
import { BatchRequest } from "../src/batch-request";
import { CoreReportingClient } from "../src/modules/core";

// Mock the CoreReportingClient
const mockBatchRequest = vi.fn();
const mockClient = {
  batchRequest: mockBatchRequest,
} as unknown as CoreReportingClient;

describe("BatchRequest", () => {
  let batch: BatchRequest;

  beforeEach(() => {
    vi.clearAllMocks();
    batch = new BatchRequest(mockClient);
  });

  it("should initialize with all modules", () => {
    expect(batch.api).toBeDefined();
    expect(batch.abTesting).toBeDefined();
    expect(batch.actions).toBeDefined();
    // Add checks for other modules if necessary, but checking a few confirms the pattern
    expect(batch.visitsSummary).toBeDefined();
  });

  it("should add a request to the batch", () => {
    const method = "API.getMatomoVersion";
    const params = { idSite: 1 };
    batch.addRequest(method, params);
    // Access the private requests array for testing purposes
    expect((batch as any).requests).toHaveLength(1);
    expect((batch as any).requests[0]).toEqual({ method, params });

    batch.addRequest("SitesManager.getAllSites");
    expect((batch as any).requests).toHaveLength(2);
    expect((batch as any).requests[1]).toEqual({
      method: "SitesManager.getAllSites",
      params: {},
    });
  });

  it("should send batched requests via the client", async () => {
    const request1 = { method: "API.getMatomoVersion", params: { idSite: 1 } };
    const request2 = { method: "SitesManager.getAllSites", params: {} };
    const expectedResponse = [
      { result: "3.14.0" },
      { result: [{ idsite: 1 }] },
    ];

    mockBatchRequest.mockResolvedValue(expectedResponse);

    batch.addRequest(request1.method, request1.params);
    batch.addRequest(request2.method, request2.params);

    const response = await batch.send();

    expect(mockBatchRequest).toHaveBeenCalledTimes(1);
    expect(mockBatchRequest).toHaveBeenCalledWith([request1, request2]);
    expect(response).toEqual(expectedResponse);
  });

  it("should return an empty array if no requests are added before send", async () => {
    const response = await batch.send();
    expect(response).toEqual([]);
    expect(mockBatchRequest).not.toHaveBeenCalled();
  });

  it("should return the core client instance", () => {
    expect(batch.getCoreClient()).toBe(mockClient);
  });

  // Example test for a module method call adding a request
  it("should add request when calling a module method (e.g., api.getMatomoVersion)", () => {
    batch.api.getMatomoVersion({ idSite: 5 });
    expect((batch as any).requests).toHaveLength(1);
    expect((batch as any).requests[0]).toEqual({
      method: "API.getMatomoVersion",
      params: { idSite: 5 },
    });
  });
});
