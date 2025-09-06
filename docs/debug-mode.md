# Debug Mode Documentation

## Overview

The VTuber frontend has a hidden debug mode that provides access to developer tools including the sidebar with settings, ASR configuration, TTS models, and other debugging features. This mode is designed to be invisible to end users while remaining accessible to developers.

## Enabling Debug Mode

### Method 1: URL Parameter
Add `?debug=true` to the URL:
```
https://your-domain.com/?debug=true
```

### Method 2: Keyboard Shortcut
Press `Ctrl + Shift + Alt + D` (or `Cmd + Shift + Alt + D` on Mac) to toggle debug mode on/off.

### Method 3: Browser Console
Open browser developer tools and run:
```javascript
localStorage.setItem('vtuber-debug', 'true');
location.reload();
```

## What Debug Mode Enables

When debug mode is active:
- **Sidebar**: Full debugging sidebar with all developer tools
- **Settings Panel**: Access to ASR, TTS, and model configurations
- **Chat History**: View and manage conversation history
- **System Controls**: Camera, screen capture, and browser integration controls

## Disabling Debug Mode

### Quick Toggle
- Use the same keyboard shortcut (`Ctrl + Shift + Alt + D`)
- Or reload the page without the `?debug=true` parameter

### Permanent Disable
```javascript
localStorage.removeItem('vtuber-debug');
location.reload();
```

## Security Features

- **No Console Logs**: Debug mode activation/deactivation produces no visible logs
- **Hidden by Default**: All debug features are completely hidden in production
- **Memory Persistence**: Debug state persists across page reloads via localStorage
- **URL Isolation**: Debug parameter only affects current session

## Usage Scenarios

### Local Development
```
npm run dev
# Navigate to http://localhost:5173/?debug=true
```

### Production Testing
```
https://your-production-domain.com/?debug=true
```

### Emergency Access
If you need to debug a live system:
1. Open the live application
2. Press `Ctrl + Shift + Alt + D`
3. Debug tools will appear immediately

## Technical Implementation

The debug mode check is performed at application startup:
```typescript
const checkDebugMode = () => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const urlDebug = urlParams.get('debug') === 'true';
    const localDebug = localStorage.getItem('vtuber-debug') === 'true';
    return urlDebug || localDebug;
  }
  return false;
};
```

The implementation ensures:
- Zero performance impact when disabled
- Complete UI removal (not just hiding)
- No trace in user-facing code paths
- Cross-platform keyboard shortcut support

## Troubleshooting

### Debug Mode Not Working
1. Check if localStorage is enabled in the browser
2. Verify the URL parameter is correctly formatted
3. Ensure keyboard shortcuts aren't blocked by browser extensions

### UI Not Responding
1. Clear localStorage: `localStorage.clear()`
2. Reload the page
3. Re-enable debug mode

### Production Issues
- Debug mode is safe to use in production
- No performance impact on normal users
- Can be enabled/disabled without restart
