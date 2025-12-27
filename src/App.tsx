import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar, CalloutList, CalloutDetail, AgentSidebar, LoadingSpinner } from './components';
import './App.css';

function AppContent() {
  const [activeNavTab, setActiveNavTab] = useState('callouts');
  const { viewState, selectedCallout, agentAction, isAgentLoading, closeAgentSidebar } = useApp();

  const isDetailView = viewState === 'detail' || viewState === 'detail-with-agent';
  const isAgentView = viewState === 'detail-with-agent';

  const handleBackdropClick = () => {
    if (isAgentView) {
      closeAgentSidebar();
    }
  };

  return (
    <div className="app">
      <Sidebar activeTab={activeNavTab} onTabChange={setActiveNavTab} />
      
      <main className="main-content">
        {/* Background blur overlay when agent is active */}
        {isAgentView && (
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
          <div className={`detail-view ${isAgentView ? 'with-agent' : ''}`}>
            {/* Minimized callout list */}
            <div className="minimized-list-container">
              <CalloutList isMinimized />
            </div>

            {/* Floating detail and agent panels */}
            <div className={`floating-panels ${isAgentView ? 'blurred-background' : ''}`}>
              {/* Callout detail panel */}
              {selectedCallout && (
                <div className="detail-panel">
                  <CalloutDetail callout={selectedCallout} />
                </div>
              )}

              {/* Agent sidebar panel */}
              {isAgentLoading && (
                <div className="agent-loading-panel">
                  <LoadingSpinner size="medium" text="Connecting agent..." />
                </div>
              )}

              {agentAction && !isAgentLoading && (
                <div className="agent-panel">
                  <AgentSidebar action={agentAction} />
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
