import nock from "nock";
import { afterAll, afterEach, beforeAll } from "vitest";

// This prevents real HTTP requests during tests
// It will throw an error if any unmocked request is made
beforeAll(() => {
  nock.disableNetConnect();
});

// Restore normal operation after all tests
afterAll(() => {
  nock.cleanAll();
  nock.enableNetConnect();
});

// Make sure there are no pending mocks after each test
// This prevents leakage between tests
afterEach(() => {
  if (!nock.isDone()) {
    console.error("Not all nock interceptors were used:", nock.pendingMocks());
    nock.cleanAll();
  }
});
