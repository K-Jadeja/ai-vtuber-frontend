import { useMemo, useCallback, useState } from 'react';
import { useWebSocket } from '@/context/websocket-context';

interface WSStatusInfo {
  color: string
  textKey: string
  isDisconnected: boolean
  handleClick: () => void
}

export const useWSStatus = () => {
  const { wsState, reconnect } = useWebSocket();
  const [hasAttemptedConnection, setHasAttemptedConnection] = useState(false);

  const handleClick = useCallback(() => {
    if (wsState !== 'OPEN' && wsState !== 'CONNECTING') {
      setHasAttemptedConnection(true);
      reconnect();
    }
  }, [wsState, reconnect]);

  const statusInfo = useMemo((): WSStatusInfo => {
    switch (wsState) {
      case 'OPEN':
        return {
          color: 'green.500',
          textKey: 'wsStatus.connected',
          isDisconnected: false,
          handleClick,
        };
      case 'CONNECTING':
        return {
          color: 'yellow.500',
          textKey: 'wsStatus.connecting',
          isDisconnected: false,
          handleClick,
        };
      case 'CLOSED':
        // If we've never attempted to connect, show "Click to Connect"
        // If we've attempted but failed, show "Click to Reconnect"
        return {
          color: 'red.500',
          textKey: hasAttemptedConnection ? 'wsStatus.clickToReconnect' : 'wsStatus.clickToConnect',
          isDisconnected: true,
          handleClick,
        };
      default:
        return {
          color: 'red.500',
          textKey: hasAttemptedConnection ? 'wsStatus.clickToReconnect' : 'wsStatus.clickToConnect',
          isDisconnected: true,
          handleClick,
        };
    }
  }, [wsState, handleClick, hasAttemptedConnection]);

  return statusInfo;
};
