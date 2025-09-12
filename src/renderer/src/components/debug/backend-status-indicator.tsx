import React from "react";
import { getBackendConfig } from "@/config/backend-config";
import { useWebSocket } from "@/context/websocket-context";

export const BackendStatusIndicator: React.FC = () => {
  const { wsState, wsUrl, baseUrl } = useWebSocket();
  const config = getBackendConfig();

  // Only show in development mode
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        left: "10px",
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "8px 12px",
        borderRadius: "6px",
        fontSize: "12px",
        fontFamily: "monospace",
        zIndex: 9999,
        maxWidth: "300px",
      }}
    >
      <div>
        <strong>Environment:</strong> {config.environment}
      </div>
      <div>
        <strong>WebSocket:</strong> {wsState}
      </div>
      <div style={{ wordBreak: "break-all" }}>
        <strong>WS URL:</strong> {wsUrl}
      </div>
      <div style={{ wordBreak: "break-all" }}>
        <strong>Base URL:</strong> {baseUrl}
      </div>
    </div>
  );
};
