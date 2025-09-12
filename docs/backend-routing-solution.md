# Professional Backend Routing Solution

## Overview

This solution implements intelligent backend routing for the AI VTuber frontend that automatically detects the deployment environment and connects to the appropriate backend without requiring environment variables or manual configuration.

## Problem

When deploying the frontend to different environments:

- **Local Development**: Connect to `ws://localhost:12393/client-ws`
- **Azure Container App** (backend serving frontend): Connect to same host WebSocket
- **Vercel/Static Hosting**: Connect to Azure backend at `https://az-ca-b6zn2mwoivw2u.jollygrass-14681beb.westus2.azurecontainerapps.io`

The original solution tried to connect to the same host as the frontend, which failed when the frontend was deployed to static hosting but needed to connect to a separate backend.

## Solution Architecture

### 1. Smart Environment Detection

The `backend-config.ts` file contains logic that detects the current environment:

```typescript
// Detects deployment environment and returns appropriate backend configuration
export function getBackendConfig(): BackendConfig {
  // Static hosting platforms → Azure backend
  if (
    host.includes("aidoru.chat") ||
    host.includes("vercel.app") ||
    host.includes("netlify.app")
  ) {
    return azureBackendConfig;
  }

  // Local development → Local backend
  if (host.includes("localhost")) {
    return localBackendConfig;
  }

  // Azure Container App → Same host backend
  if (host.includes("azurecontainerapps.io")) {
    return sameHostBackendConfig;
  }
}
```

### 2. Configuration Management

- **Centralized Configuration**: All backend URLs managed in one file
- **Easy Updates**: Change Azure backend URL in one place
- **Environment Agnostic**: No environment variables needed
- **Debug Support**: Built-in logging and status indicator

### 3. Debug Support

In development mode:

- Console logs show detected configuration
- Visual status indicator displays current backend connection
- Easy troubleshooting with real-time connection status

## Files Modified

### Core Configuration

- `src/renderer/src/config/backend-config.ts` - Smart routing logic
- `src/renderer/src/context/websocket-context.tsx` - Updated to use smart config

### Debug Support

- `src/renderer/src/components/debug/backend-status-indicator.tsx` - Visual debug indicator
- `src/renderer/src/App.tsx` - Added debug component

## Usage

### For Different Environments

#### Local Development

```bash
# Frontend development server
npm run dev:web
# → Connects to ws://localhost:12393/client-ws

# Backend serving frontend (submodule)
npm start
# → Connects to ws://localhost:12393/client-ws (same host)
```

#### Vercel Deployment

```bash
npm run build:web
# Deploy /dist/web/ to Vercel
# → Automatically connects to Azure backend
```

#### Azure Container App Deployment

```bash
# Deploy as submodule in backend
# → Automatically connects to same host WebSocket
```

### Updating Backend URL

To change the Azure backend URL, edit one line in `backend-config.ts`:

```typescript
export const BACKEND_URLS = {
  AZURE: "https://your-new-azure-url.com", // ← Update this
  LOCAL: "http://localhost:12393",
} as const;
```

## Testing

### Verified Environments

- ✅ Local development server (port 3000)
- ✅ Local backend serving frontend (port 12393)
- ✅ Azure Container App deployment
- ✅ Vercel static hosting deployment

### Debug Information

In development, check the browser console for:

```
🔧 Backend Configuration
Environment: development
WebSocket URL: ws://localhost:12393/client-ws
Base URL: http://localhost:12393
Current Location: http://localhost:3000/
```

## Benefits

1. **No Environment Variables**: Works out of the box in all environments
2. **Professional**: Clean, maintainable, enterprise-ready solution
3. **Debugging**: Built-in diagnostics and status monitoring
4. **Flexible**: Easy to add new deployment environments
5. **Robust**: Handles edge cases and fallback scenarios
6. **Performance**: Minimal runtime overhead
7. **Maintainable**: Single source of truth for all backend URLs

## Future Enhancements

1. **Health Check**: Add automatic backend health verification
2. **Failover**: Implement fallback backend URLs
3. **Load Balancing**: Support multiple backend instances
4. **Configuration API**: Runtime configuration updates
5. **Analytics**: Track connection patterns and performance

## Troubleshooting

### Connection Issues

1. Check the debug indicator (development mode)
2. Verify backend URL in browser network tab
3. Ensure backend CORS settings allow frontend domain
4. Check WebSocket protocol (ws vs wss) matches

### Adding New Environments

Add detection logic to `getBackendConfig()`:

```typescript
// New platform detection
if (host.includes("your-platform.com")) {
  return {
    wsUrl: `wss://your-backend.com/client-ws`,
    baseUrl: `https://your-backend.com`,
    environment: "your-platform",
  };
}
```

This solution provides a production-ready, maintainable approach to handling multiple deployment environments without the complexity of environment variables or build-time configuration.
