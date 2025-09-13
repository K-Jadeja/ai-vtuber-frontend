import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWebSocket } from './websocket-context';
import { useChatHistory } from './chat-history-context';

interface ConnectionState {
  isWebSocketConnected: boolean;
  isHistoryReady: boolean;
  isFullyReady: boolean;
  connectionStatus: 'disconnected' | 'connecting' | 'ready';
}

interface ConnectionStateContextProps extends ConnectionState {
  setHistoryReady: (ready: boolean) => void;
}

const ConnectionStateContext = createContext<ConnectionStateContextProps | null>(null);

export function useConnectionState() {
  const context = useContext(ConnectionStateContext);
  if (!context) {
    throw new Error('useConnectionState must be used within a ConnectionStateProvider');
  }
  return context;
}

export function ConnectionStateProvider({ children }: { children: ReactNode }) {
  const { wsState } = useWebSocket();
  const { currentHistoryUid } = useChatHistory();
  
  const [isHistoryReady, setIsHistoryReady] = useState(false);
  
  const isWebSocketConnected = wsState === 'OPEN';
  const isFullyReady = isWebSocketConnected && isHistoryReady;
  
  // Reset history ready state when connection closes
  useEffect(() => {
    if (!isWebSocketConnected) {
      setIsHistoryReady(false);
    }
  }, [isWebSocketConnected]);
  
  // Automatically set history ready when we have a current history UID
  useEffect(() => {
    if (currentHistoryUid && isWebSocketConnected && !isHistoryReady) {
      setIsHistoryReady(true);
    }
  }, [currentHistoryUid, isWebSocketConnected, isHistoryReady]);
  
  const connectionStatus: 'disconnected' | 'connecting' | 'ready' = 
    !isWebSocketConnected ? 'disconnected' :
    !isFullyReady ? 'connecting' :
    'ready';
  
  const contextValue: ConnectionStateContextProps = {
    isWebSocketConnected,
    isHistoryReady,
    isFullyReady,
    connectionStatus,
    setHistoryReady: (ready: boolean) => setIsHistoryReady(ready),
  };
  
  return (
    <ConnectionStateContext.Provider value={contextValue}>
      {children}
    </ConnectionStateContext.Provider>
  );
}
