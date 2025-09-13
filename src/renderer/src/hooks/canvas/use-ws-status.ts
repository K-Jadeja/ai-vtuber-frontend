import { useMemo, useCallback, useState } from 'react';
import { useWebSocket } from '@/context/websocket-context';
import { useConnectionState } from '@/context/connection-state-context';

interface WSStatusInfo {
  color: string
  textKey: string
  isDisconnected: boolean
  handleClick: () => void
}

export const useWSStatus = () => {
  const { wsState, reconnect } = useWebSocket();
  const { connectionStatus } = useConnectionState();
  const [hasAttemptedConnection, setHasAttemptedConnection] = useState(false);

  const handleClick = useCallback(() => {
    if (wsState !== 'OPEN' && wsState !== 'CONNECTING') {
      setHasAttemptedConnection(true);
      reconnect();
    }
  }, [wsState, reconnect]);

  const statusInfo = useMemo((): WSStatusInfo => {
    // Use the new connection state logic
    switch (connectionStatus) {
      case 'ready':
        return {
          color: 'green.500',
          textKey: 'wsStatus.connected',
          isDisconnected: false,
          handleClick,
        };
      case 'connecting':
        return {
          color: 'yellow.500',
          textKey: 'wsStatus.connecting',
          isDisconnected: false,
          handleClick,
        };
      case 'disconnected':
      default:
        // If we've never attempted to connect, show "Click to Connect"
        // If we've attempted but failed, show "Click to Reconnect"
        return {
          color: 'red.500',
          textKey: hasAttemptedConnection ? 'wsStatus.clickToReconnect' : 'wsStatus.clickToConnect',
          isDisconnected: true,
          handleClick,
        };
    }
  }, [connectionStatus, handleClick, hasAttemptedConnection]);

  return statusInfo;
};
