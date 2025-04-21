import { ReportingClient } from "@mj-kiwi/matomo-client";
import { env } from "./env.js";

let matomoClient: ReportingClient | null = null;

export function getMatomoClient(): ReportingClient {
  if (!matomoClient) {
    matomoClient = new ReportingClient({
      url: env.MATOMO_URL,
      tokenAuth: env.MATOMO_AUTH_TOKEN,
      idSite: env.MATOMO_DEFAULT_SITE_ID,
    });
  }
  return matomoClient;
}
