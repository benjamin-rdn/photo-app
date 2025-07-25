import { createContext, type PropsWithChildren, type ReactElement, useContext, useEffect, useState } from 'react';
import type { ViewMode } from '@/types';

interface ViewModeContextValue {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextValue | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'viewMode';

function ViewModeProvider({ children }: PropsWithChildren): ReactElement {
  const [viewMode, setViewModeState] = useState<ViewMode>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored === 'grid' || stored === 'flow') return stored;
    return 'grid';
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, viewMode);
  }, [viewMode]);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
  };

  return <ViewModeContext.Provider value={{ viewMode, setViewMode }}>{children}</ViewModeContext.Provider>;
}

function useViewMode(): ViewModeContextValue {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
}

export { ViewModeProvider, useViewMode };
