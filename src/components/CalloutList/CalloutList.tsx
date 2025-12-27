import { useState, useEffect } from 'react';
import { 
  Filter, 
  Settings2, 
  List, 
  ChevronDown, 
  ChevronRight, 
  Check, 
  Plus, 
  Copy, 
  Search 
} from 'lucide-react';
import { CalloutItem } from '../CalloutItem';
import { LoadingSpinner } from '../LoadingSpinner';
import { useApp } from '../../context/AppContext';
import './CalloutList.css';

interface CalloutListProps {
  isMinimized?: boolean;
}

export function CalloutList({ isMinimized = false }: CalloutListProps) {
  const [activeTab, setActiveTab] = useState<'for-you' | 'from-you'>('for-you');
  const [openSectionExpanded, setOpenSectionExpanded] = useState(true);
  const [completedSectionExpanded, setCompletedSectionExpanded] = useState(false);
  
  const { 
    selectedCallout, 
    openCalloutDetail,
    callouts,
    completedCallouts,
    isCalloutsLoading,
    isCompletedLoading,
    loadCompletedCallouts
  } = useApp();

  // Load completed callouts when section is expanded
  useEffect(() => {
    if (completedSectionExpanded) {
      loadCompletedCallouts();
    }
  }, [completedSectionExpanded, loadCompletedCallouts]);

  const openCallouts = callouts.filter(c => c.status === 'open');

  if (isMinimized) {
    return (
      <div className="callout-list minimized">
        <div className="callout-list-header minimized">
          <h2 className="callout-list-title">All callouts</h2>
          <div className="header-actions">
            <button className="icon-btn">
              <Plus size={16} />
            </button>
            <button className="icon-btn">
              <Copy size={16} />
            </button>
          </div>
        </div>

        <div className="tabs minimized">
          <button 
            className={`tab ${activeTab === 'for-you' ? 'active' : ''}`}
            onClick={() => setActiveTab('for-you')}
          >
            For you
          </button>
          <button 
            className={`tab ${activeTab === 'from-you' ? 'active' : ''}`}
            onClick={() => setActiveTab('from-you')}
          >
            From you
          </button>
          <div className="tab-actions">
            <button className="icon-btn small">
              <Search size={14} />
            </button>
            <button className="icon-btn small">
              <Filter size={14} />
            </button>
          </div>
        </div>

        <div className="callout-sections">
          <div className="section">
            <button 
              className="section-header"
              onClick={() => setOpenSectionExpanded(!openSectionExpanded)}
            >
              {openSectionExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <span className="section-icon open">○</span>
              <span className="section-title">Open</span>
              <span className="section-count">{openCallouts.length}</span>
              <ChevronDown size={14} className="section-dropdown" />
            </button>

            {openSectionExpanded && (
              <div className="section-content">
                {isCalloutsLoading ? (
                  <LoadingSpinner size="small" />
                ) : (
                  openCallouts.map((callout) => (
                    <CalloutItem
                      key={callout.id}
                      callout={callout}
                      isMinimized={true}
                      isSelected={selectedCallout?.id === callout.id}
                      onClick={() => openCalloutDetail(callout)}
                    />
                  ))
                )}
              </div>
            )}
          </div>

          <div className="section">
            <button 
              className="section-header"
              onClick={() => setCompletedSectionExpanded(!completedSectionExpanded)}
            >
              {completedSectionExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <span className="section-icon completed"><Check size={12} /></span>
              <span className="section-title">Completed</span>
              <span className="section-count">928</span>
              <ChevronDown size={14} className="section-dropdown" />
            </button>

            {completedSectionExpanded && (
              <div className="section-content">
                {isCompletedLoading ? (
                  <LoadingSpinner size="small" />
                ) : (
                  completedCallouts.slice(0, 10).map((callout) => (
                    <CalloutItem
                      key={callout.id}
                      callout={callout}
                      isMinimized={true}
                      onClick={() => openCalloutDetail(callout)}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="callout-list">
      <div className="callout-list-header">
        <h1 className="callout-list-title">All callouts</h1>
        <div className="header-user">
          <img 
            src="https://i.pravatar.cc/150?u=currentuser" 
            alt="User" 
            className="user-avatar"
          />
        </div>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'for-you' ? 'active' : ''}`}
          onClick={() => setActiveTab('for-you')}
        >
          For you
        </button>
        <button 
          className={`tab ${activeTab === 'from-you' ? 'active' : ''}`}
          onClick={() => setActiveTab('from-you')}
        >
          From you
        </button>
      </div>

      <div className="toolbar">
        <button className="filter-btn">
          <Filter size={16} />
          Filters
        </button>
        <div className="toolbar-right">
          <button className="view-btn">
            <Settings2 size={16} />
            View
          </button>
          <button className="icon-btn">
            <List size={16} />
          </button>
        </div>
      </div>

      <div className="callout-sections">
        <div className="section">
          <button 
            className="section-header"
            onClick={() => setOpenSectionExpanded(!openSectionExpanded)}
          >
            {openSectionExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span className="section-icon open">○</span>
            <span className="section-title">Open tasks</span>
            <span className="section-count">{openCallouts.length}</span>
          </button>

          {openSectionExpanded && (
            <div className="section-content">
              {isCalloutsLoading ? (
                <LoadingSpinner size="medium" text="Loading callouts..." />
              ) : (
                openCallouts.map((callout) => (
                  <CalloutItem
                    key={callout.id}
                    callout={callout}
                    isSelected={selectedCallout?.id === callout.id}
                    onClick={() => openCalloutDetail(callout)}
                  />
                ))
              )}
            </div>
          )}
        </div>

        <div className="section">
          <button 
            className="section-header"
            onClick={() => setCompletedSectionExpanded(!completedSectionExpanded)}
          >
            {completedSectionExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span className="section-icon completed"><Check size={12} /></span>
            <span className="section-title">Completed tasks</span>
            <span className="section-count">188</span>
          </button>

          {completedSectionExpanded && (
            <div className="section-content">
              {isCompletedLoading ? (
                <LoadingSpinner size="small" text="Loading completed..." />
              ) : (
                completedCallouts.slice(0, 5).map((callout) => (
                  <CalloutItem
                    key={callout.id}
                    callout={callout}
                    onClick={() => openCalloutDetail(callout)}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

