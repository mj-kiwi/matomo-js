import { matomoReportingClient } from './matomo-reporting-client.js';

describe('matomoReportingClient', () => {
  it('should work', () => {
    expect(matomoReportingClient()).toEqual('matomo-reporting-client');
  });
});
