/**
 * Backend Configuration
 * Professional routing solution for different deployment environments
 */

export interface BackendConfig {
  wsUrl: string;
  baseUrl: string;
  environment: "development" | "azure-container-app" | "static-hosting";
}

export const BACKEND_URLS = {
  // Your Azure Container App backend
  AZURE:
    "https://az-ca-b6zn2mwoivw2u.jollygrass-14681beb.westus2.azurecontainerapps.io",

  // Local development
  LOCAL: "http://127.0.0.1:10000",
} as const;

/**
 * Detects the current environment and returns appropriate backend configuration
 */
export function getBackendConfig(): BackendConfig {
  if (typeof window === "undefined") {
    // SSR or Node.js environment - default to local
    return {
      wsUrl: "ws://127.0.0.1:10000/client-ws",
      baseUrl: BACKEND_URLS.LOCAL,
      environment: "development",
    };
  }

  const { protocol, host, port } = window.location;
  const wsProtocol = protocol === "https:" ? "wss:" : "ws:";

  // Static hosting platforms (Vercel, Netlify, etc.)
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
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    // Backend serving frontend (integrated)
    if (port === "10000") {
      return {
        wsUrl: `${wsProtocol}//${host}/client-ws`,
        baseUrl: `${protocol}//${host}`,
        environment: "development",
      };
    }

    // Separate frontend dev server
    return {
      wsUrl: "ws://127.0.0.1:10000/client-ws",
      baseUrl: BACKEND_URLS.LOCAL,
      environment: "development",
    };
  }

  // Azure Container App (backend serving frontend)
  if (host.includes("azurecontainerapps.io")) {
    return {
      wsUrl: `${wsProtocol}//${host}/client-ws`,
      baseUrl: `${protocol}//${host}`,
      environment: "azure-container-app",
    };
  }

  // Default fallback - assume same host
  return {
    wsUrl: `${wsProtocol}//${host}/client-ws`,
    baseUrl: `${protocol}//${host}`,
    environment: "development",
  };
}

/**
 * Debug function to log current backend configuration
 */
export function debugBackendConfig(): void {
  const config = getBackendConfig();
  console.group("🔧 Backend Configuration");
  console.log("Environment:", config.environment);
  console.log("WebSocket URL:", config.wsUrl);
  console.log("Base URL:", config.baseUrl);
  console.log("Current Location:", window.location.href);
  console.groupEnd();
}
