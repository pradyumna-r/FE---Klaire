import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Callout, ViewState, AgentAction } from '../types';
import { fetchCallouts, fetchCompletedCallouts } from '../mock/data';

interface AppContextType {
  // View state
  viewState: ViewState;
  setViewState: (state: ViewState) => void;

  // Selected callout
  selectedCallout: Callout | null;
  setSelectedCallout: (callout: Callout | null) => void;

  // Callouts data (shared between views)
  callouts: Callout[];
  completedCallouts: Callout[];
  isCalloutsLoading: boolean;
  isCompletedLoading: boolean;
  loadCompletedCallouts: () => void;

  // Agent state
  agentAction: AgentAction | null;
  setAgentAction: (action: AgentAction | null) => void;
  isAgentLoading: boolean;
  setIsAgentLoading: (loading: boolean) => void;

  // Actions
  openCalloutDetail: (callout: Callout) => void;
  openAgentSidebar: (action: AgentAction) => void;
  closeAgentSidebar: () => void;
  closeDetail: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [viewState, setViewState] = useState<ViewState>('list');
  const [selectedCallout, setSelectedCallout] = useState<Callout | null>(null);
  const [agentAction, setAgentAction] = useState<AgentAction | null>(null);
  const [isAgentLoading, setIsAgentLoading] = useState(false);

  // Shared callouts data
  const [callouts, setCallouts] = useState<Callout[]>([]);
  const [completedCallouts, setCompletedCallouts] = useState<Callout[]>([]);
  const [isCalloutsLoading, setIsCalloutsLoading] = useState(true);
  const [isCompletedLoading, setIsCompletedLoading] = useState(false);

  // Load callouts on mount
  useEffect(() => {
    const loadCallouts = async () => {
      setIsCalloutsLoading(true);
      try {
        const data = await fetchCallouts();
        setCallouts(data);
      } catch (error) {
        console.error('Failed to fetch callouts:', error);
      } finally {
        setIsCalloutsLoading(false);
      }
    };

    loadCallouts();
  }, []);

  const loadCompletedCallouts = useCallback(async () => {
    if (completedCallouts.length > 0 || isCompletedLoading) return;
    
    setIsCompletedLoading(true);
    try {
      const data = await fetchCompletedCallouts();
      setCompletedCallouts(data);
    } catch (error) {
      console.error('Failed to fetch completed callouts:', error);
    } finally {
      setIsCompletedLoading(false);
    }
  }, [completedCallouts.length, isCompletedLoading]);

  const openCalloutDetail = useCallback((callout: Callout) => {
    setSelectedCallout(callout);
    setViewState('detail');
    setAgentAction(null);
  }, []);

  const openAgentSidebar = useCallback((action: AgentAction) => {
    setAgentAction(action);
    setViewState('detail-with-agent');
  }, []);

  const closeAgentSidebar = useCallback(() => {
    setAgentAction(null);
    setViewState('detail');
  }, []);

  const closeDetail = useCallback(() => {
    setSelectedCallout(null);
    setAgentAction(null);
    setViewState('list');
  }, []);

  return (
    <AppContext.Provider
      value={{
        viewState,
        setViewState,
        selectedCallout,
        setSelectedCallout,
        callouts,
        completedCallouts,
        isCalloutsLoading,
        isCompletedLoading,
        loadCompletedCallouts,
        agentAction,
        setAgentAction,
        isAgentLoading,
        setIsAgentLoading,
        openCalloutDetail,
        openAgentSidebar,
        closeAgentSidebar,
        closeDetail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

