# Connection State Management System

## Overview

The Connection State Management System provides a sophisticated way to track the readiness of the WebSocket connection and chat history initialization, ensuring users cannot send messages before the system is fully ready.

## Problem Statement

Previously, the connection button would show "Connected" immediately when the WebSocket opened, but the chat history system might still be initializing. This led to:

1. **Premature message sending**: Users could send messages before chat history was set up
2. **Poor UX**: No visual indication of the initialization process
3. **Backend URL issues**: Hardcoded URLs pointing to wrong endpoints

## Solution Architecture

### Core Components

#### 1. ConnectionStateProvider (`src/renderer/src/context/connection-state-context.tsx`)

A React context that manages the overall connection readiness state by tracking two critical conditions:

- **WebSocket Connection**: Is the WebSocket in 'OPEN' state?
- **Chat History Ready**: Has a new chat history been created?

```typescript
interface ConnectionStateContextProps {
  isWebSocketConnected: boolean;    // WebSocket is in 'OPEN' state
  isHistoryReady: boolean;         // Chat history has been initialized
  isFullyReady: boolean;           // Both conditions are true
  connectionStatus: 'disconnected' | 'connecting' | 'ready';
  setHistoryReady: (ready: boolean) => void;
}
```

#### 2. Smart State Detection Logic

The provider automatically detects when both conditions are met:

```typescript
// Auto-detect history readiness
useEffect(() => {
  if (currentHistoryUid && isWebSocketConnected && !isHistoryReady) {
    setIsHistoryReady(true);
  }
}, [currentHistoryUid, isWebSocketConnected, isHistoryReady]);

// Calculate connection status
const connectionStatus = 
  !isWebSocketConnected ? 'disconnected' :
  !isFullyReady ? 'connecting' :
  'ready';
```

#### 3. Updated useWSStatus Hook

Modified to use the new connection state logic instead of just WebSocket state:

```typescript
switch (connectionStatus) {
  case 'ready':
    return { color: 'green.500', textKey: 'wsStatus.connected', isDisconnected: false };
  case 'connecting':
    return { color: 'yellow.500', textKey: 'wsStatus.connecting', isDisconnected: false };
  case 'disconnected':
    return { color: 'red.500', textKey: 'wsStatus.disconnected', isDisconnected: true };
}
```

### Provider Hierarchy

**Critical**: The `ConnectionStateProvider` must be placed **inside** the `WebSocketHandler`, not outside it, because it needs access to the WebSocket context.

```typescript
// ✅ Correct hierarchy
<WebSocketHandler>
  <ConnectionStateProvider>
    <AppContent />
  </ConnectionStateProvider>
</WebSocketHandler>

// ❌ Wrong hierarchy (causes context access issues)
<ConnectionStateProvider>
  <WebSocketHandler>
    <AppContent />
  </WebSocketHandler>
</ConnectionStateProvider>
```

## User Experience Flow

### 1. Initial State
- Button shows: **"Click to Connect"**
- WebSocket: `CLOSED`
- History: Not ready
- Status: `disconnected`

### 2. Connection Initiation
- User clicks connect button
- WebSocket starts connecting
- Button shows: **"Connecting"** 
- Status: `disconnected` → `connecting`

### 3. WebSocket Opens
- WebSocket state: `CONNECTING` → `OPEN`
- Button continues showing: **"Connecting"**
- Status remains: `connecting` (waiting for history)

### 4. Backend Message Flow
```
1. WebSocket opens
2. Server sends: group-update
3. Server sends: set-model-and-conf  
4. Server sends: history-list
5. Server sends: new-history-created  ← Key message!
6. ConnectionStateProvider detects currentHistoryUid
7. Sets isHistoryReady = true
8. Status changes: connecting → ready
```

### 5. Fully Connected
- Button shows: **"Connected"**
- Message changes to: **"New Conversation Started"**
- Status: `ready`
- ✅ User can now safely send messages

## Backend Configuration Fix

### Problem
Backend URLs were hardcoded to `localhost:12393` instead of the actual backend at `127.0.0.1:10000`.

### Solution
Updated `src/renderer/src/config/backend-config.ts`:

```typescript
const BACKEND_URLS = {
  LOCAL: {
    BASE_URL: 'http://127.0.0.1:10000',    // Changed from localhost:12393
    WS_URL: 'ws://127.0.0.1:10000/client-ws'
  }
  // ... other configurations
};
```

### Smart Environment Detection
The system automatically detects the environment and uses appropriate URLs:

```typescript
export function getBackendConfig(): BackendConfig {
  if (isDev) {
    // In development, detect if running on 127.0.0.1:10000
    if (window.location.hostname === 'localhost' && 
        window.location.port === '5173') {
      return BACKEND_URLS.LOCAL;  // Uses 127.0.0.1:10000
    }
  }
  // ... other logic
}
```

## Implementation Notes

### Debug Logging (Removed in Production)

During development, extensive debug logging was used to track state changes:

```typescript
// Debug logs (removed in final version)
console.log('🔧 ConnectionState: Status calculation - connectionStatus:', connectionStatus);
console.log('🔧 useWSStatus: connectionStatus:', connectionStatus, 'wsState:', wsState);
```

### Key Dependencies

The system relies on several existing contexts:
- `WebSocketContext`: For WebSocket state (`wsState`)
- `ChatHistoryContext`: For current history UID (`currentHistoryUid`)

### Error Handling

The system gracefully handles:
- WebSocket disconnections (resets history ready state)
- Multiple connection attempts
- Backend initialization delays

## Testing

### Manual Testing Flow

1. **Navigate** to `http://localhost:5173`
2. **Verify** initial state shows "Click to Connect"
3. **Click** connect button
4. **Observe** button changes to "Connecting"
5. **Wait** for WebSocket messages (group-update, history-list, new-history-created)
6. **Verify** button changes to "Connected" only after history creation
7. **Confirm** message shows "New Conversation Started"

### Browser Console Verification

Monitor these key messages in browser console:
```
Received message from server: {type: new-history-created, history_uid: ...}
```

This message indicates the chat history is ready and the button should show "Connected".

## Future Improvements

### Potential Enhancements

1. **Timeout Handling**: Add timeout for history creation (fallback after X seconds)
2. **Retry Logic**: Automatic retry if history creation fails  
3. **Loading States**: More granular loading indicators
4. **Connection Health**: Periodic connection health checks
5. **Error Recovery**: Better error handling and user feedback

### Performance Considerations

- The system uses React's `useMemo` and `useCallback` for optimization
- State updates are batched to minimize re-renders
- Context values are memoized to prevent unnecessary child re-renders

## Troubleshooting

### Common Issues

#### Button Shows "Click to Reconnect" Instead of "Connected"
- **Cause**: Provider hierarchy issue - ConnectionStateProvider outside WebSocketHandler
- **Fix**: Ensure ConnectionStateProvider is inside WebSocketHandler in App.tsx

#### Wrong Backend URL
- **Cause**: Environment detection not working
- **Fix**: Check `getBackendConfig()` logic and window.location values

#### History Never Ready
- **Cause**: `new-history-created` message not received
- **Fix**: Check backend logs, verify WebSocket message flow

### Debug Steps

1. **Check provider hierarchy** in App.tsx
2. **Monitor browser console** for WebSocket messages
3. **Verify backend URL** in network tab
4. **Check currentHistoryUid** value in React DevTools

## Code Locations

- **Main Context**: `src/renderer/src/context/connection-state-context.tsx`
- **Backend Config**: `src/renderer/src/config/backend-config.ts`
- **Status Hook**: `src/renderer/src/hooks/canvas/use-ws-status.ts`
- **Provider Setup**: `src/renderer/src/App.tsx` (lines 220-235)

## Related Documentation

- [Backend Routing Solution](./backend-routing-solution.md)
- [WebSocket Service Documentation](../src/services/websocket-service.ts)
- [Chat History Context](../src/context/chat-history-context.tsx)
