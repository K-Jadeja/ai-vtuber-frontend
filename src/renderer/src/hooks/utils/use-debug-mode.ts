import { useEffect, useState } from 'react';

export function useDebugMode() {
  const [isDebugMode, setIsDebugMode] = useState(() => {
    // Check if debug mode is enabled via environment variable
    const envDebug = import.meta.env.VITE_DEBUG_MODE === 'true';
    // Also check localStorage for runtime override
    const localDebug = localStorage.getItem('debug-mode') === 'true';
    return envDebug || localDebug;
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Toggle debug mode with Ctrl+Shift+D (or Cmd+Shift+D on Mac)
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        const newDebugMode = !isDebugMode;
        setIsDebugMode(newDebugMode);
        localStorage.setItem('debug-mode', newDebugMode.toString());
        console.log(`Debug mode ${newDebugMode ? 'enabled' : 'disabled'}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDebugMode]);

  return isDebugMode;
}
