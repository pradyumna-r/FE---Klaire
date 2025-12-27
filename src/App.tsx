import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar, CalloutList, CalloutDetail, AgentSidebar } from './components';
import './App.css';

function AppContent() {
  const [activeNavTab, setActiveNavTab] = useState('callouts');
  const { viewState, selectedCallout, agentAction, isAgentLoading, closeAgentSidebar } = useApp();

  const isDetailView = viewState === 'detail' || viewState === 'detail-with-agent';
  const isAgentView = viewState === 'detail-with-agent';
  // Show blur when agent is loading OR when agent panel is open
  const showAgentBlur = isAgentLoading || isAgentView;

  const handleBackdropClick = () => {
    if (showAgentBlur) {
      closeAgentSidebar();
    }
  };

  return (
    <div className="app">
      <Sidebar activeTab={activeNavTab} onTabChange={setActiveNavTab} />
      
      <main className="main-content">
        {/* Background blur overlay when agent is loading or active */}
        {showAgentBlur && (
          <div className="backdrop-blur" onClick={handleBackdropClick} />
        )}

        {/* Main list view */}
        {viewState === 'list' && (
          <div className="list-view">
            <CalloutList />
          </div>
        )}

        {/* Detail view with minimized list */}
        {isDetailView && (
          <div className={`detail-view ${showAgentBlur ? 'with-agent' : ''}`}>
            {/* Minimized callout list */}
            <div className="minimized-list-container">
              <CalloutList isMinimized />
            </div>

            {/* Floating detail and agent panels */}
            <div className={`floating-panels ${showAgentBlur ? 'blurred-background' : ''}`}>
              {/* Callout detail panel */}
              {selectedCallout && (
                <div className="detail-panel">
                  <CalloutDetail callout={selectedCallout} />
                </div>
              )}

              {/* Agent sidebar panel - show when loading OR when action is ready */}
              {(isAgentLoading || agentAction) && (
                <div className="agent-panel">
                  <AgentSidebar action={agentAction} isLoading={isAgentLoading} />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
