// Global setup file for Vitest
import { env } from "./mocks/env";

// Set environment variables for all tests
process.env.MATOMO_URL = env.MATOMO_URL;
process.env.MATOMO_AUTH_TOKEN = env.MATOMO_AUTH_TOKEN;
process.env.MATOMO_DEFAULT_SITE_ID = env.MATOMO_DEFAULT_SITE_ID;

// Additional global setup can go here
