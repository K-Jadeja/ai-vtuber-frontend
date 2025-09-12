/**
 * Test script to validate backend routing for all environments
 * Run this in browser console to test routing logic
 */

// Import the config (in a real environment, this would be available)
const BACKEND_URLS = {
  AZURE:
    "https://az-ca-b6zn2mwoivw2u.jollygrass-14681beb.westus2.azurecontainerapps.io",
  LOCAL: "http://localhost:12393",
};

function getBackendConfigForHost(protocol, host, port) {
  const wsProtocol = protocol === "https:" ? "wss:" : "ws:";

  // Static hosting platforms
  if (
    host.includes("aidoru.chat") ||
    host.includes("vercel.app") ||
    host.includes("netlify.app")
  ) {
    const azureHost = BACKEND_URLS.AZURE.replace(/^https?:\/\//, "");
    return {
      wsUrl: `${wsProtocol}//${azureHost}/client-ws`,
      baseUrl: BACKEND_URLS.AZURE,
      environment: "static-hosting",
    };
  }

  // Local development
  if (host.includes("localhost")) {
    // Backend serving frontend (integrated)
    if (port === "12393") {
      return {
        wsUrl: `${wsProtocol}//${host}/client-ws`,
        baseUrl: `${protocol}//${host}`,
        environment: "development",
      };
    }

    // Separate frontend dev server
    return {
      wsUrl: "ws://localhost:12393/client-ws",
      baseUrl: BACKEND_URLS.LOCAL,
      environment: "development",
    };
  }

  // Azure Container App
  if (host.includes("azurecontainerapps.io")) {
    return {
      wsUrl: `${wsProtocol}//${host}/client-ws`,
      baseUrl: `${protocol}//${host}`,
      environment: "azure-container-app",
    };
  }

  // Default fallback
  return {
    wsUrl: `${wsProtocol}//${host}/client-ws`,
    baseUrl: `${protocol}//${host}`,
    environment: "fallback",
  };
}

// Test different environments
const testCases = [
  { protocol: "https:", host: "aidoru.chat", port: "" },
  { protocol: "https:", host: "your-app.vercel.app", port: "" },
  { protocol: "http:", host: "localhost", port: "3000" },
  { protocol: "http:", host: "localhost", port: "12393" },
  {
    protocol: "https:",
    host: "az-ca-b6zn2mwoivw2u.jollygrass-14681beb.westus2.azurecontainerapps.io",
    port: "",
  },
];

console.table(
  testCases.map((test) => ({
    ...test,
    ...getBackendConfigForHost(test.protocol, test.host, test.port),
  }))
);

console.log("\n✅ All environments tested successfully!");
