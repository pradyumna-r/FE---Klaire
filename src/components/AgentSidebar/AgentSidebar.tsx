import { useState, useEffect } from 'react';
import { X, Calendar, MessageSquare, FileText, Mail, Loader2 } from 'lucide-react';
import type { AgentAction } from '../../types';
import { useApp } from '../../context/AppContext';
import './AgentSidebar.css';

interface AgentSidebarProps {
  action: AgentAction | null;
  isLoading?: boolean;
}

export function AgentSidebar({ action, isLoading = false }: AgentSidebarProps) {
  const [status, setStatus] = useState<'connecting' | 'processing' | 'completed'>('connecting');
  const { closeAgentSidebar } = useApp();

  useEffect(() => {
    // Reset status when loading starts or action changes
    if (isLoading) {
      setStatus('connecting');
      return;
    }
    
    if (!action) return;

    // After loading completes, start processing flow
    setStatus('connecting');
    const timer1 = setTimeout(() => setStatus('processing'), 500);
    const timer2 = setTimeout(() => setStatus('completed'), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [action, isLoading]);

  const getAgentIcon = () => {
    if (!action) return null;
    switch (action.type) {
      case 'calendar':
        return <Calendar size={20} />;
      case 'slack':
        return <MessageSquare size={20} />;
      case 'notion':
        return <FileText size={20} />;
      case 'email':
        return <Mail size={20} />;
      default:
        return <Calendar size={20} />;
    }
  };

  const getServiceBgColor = () => {
    if (!action) return null;
    switch (action.type) {
      case 'calendar':
        return '#4285f4';
      case 'slack':
        return '#611f69';
      case 'notion':
        return '#000000';
      case 'email':
        return '#ea4335';
      default:
        return '#4285f4';
    }
  };

  const getServiceName = () => {
    if (!action) return null;
    switch (action.type) {
      case 'calendar':
        return 'Google Calendar';
      case 'slack':
        return 'Slack';
      case 'notion':
        return 'Notion';
      case 'email':
        return 'Gmail';
      default:
        return 'Service';
    }
  };

  // Show loading state when isLoading is true
  if (isLoading || !action) {
    return (
      <div className="agent-sidebar">
        <div className="agent-header">
          <span className="agent-title">Connecting agent...</span>
          <button className="close-btn" onClick={closeAgentSidebar}>
            <X size={18} />
          </button>
        </div>

        <div className="agent-content agent-loading-content">
          <div className="agent-loading-state">
            <Loader2 size={32} className="spinner" />
            <span className="loading-text">Connecting to service...</span>
          </div>
        </div>

        <div className="agent-footer">
          <div className="interaction-prompt loading">
            <span className="prompt-text">Please wait...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="agent-sidebar">
      <div className="agent-header">
        <span className="agent-title">{action.title}</span>
        <button className="close-btn" onClick={closeAgentSidebar}>
          <X size={18} />
        </button>
      </div>

      <div className="agent-content">
        <div className="agent-service-card">
          <div 
            className="service-icon" 
            style={
              getServiceBgColor()
                ? { backgroundColor: getServiceBgColor() as React.CSSProperties['backgroundColor'] }
                : undefined
            }
          >
            {getAgentIcon()}
          </div>
          <div className="service-info">
            <span className="service-name">{getServiceName()}</span>
            <span className="service-status">
              {status === 'connecting' && 'Connecting...'}
              {status === 'processing' && 'Now'}
              {status === 'completed' && 'Completed'}
            </span>
          </div>
        </div>

        <div className="agent-action-details">
          {status === 'connecting' && (
            <div className="status-message connecting">
              <Loader2 size={16} className="spinner" />
              <span>Connecting to {getServiceName()}...</span>
            </div>
          )}

          {status === 'processing' && action.details && (
            <div className="action-info">
              <span className="action-label">{action.details.action}</span>
              {action.details.participants && (
                <span className="action-participants">
                  between {action.details.participants.join(', ')}
                </span>
              )}
            </div>
          )}

          {status === 'completed' && (
            <div className="status-message completed">
              <span className="check-icon">✓</span>
              <span>Action completed successfully</span>
            </div>
          )}
        </div>
      </div>

      <div className="agent-footer">
        <div className="interaction-prompt">
          <img 
            src="https://i.pravatar.cc/150?u=agent"
            alt="Agent"
            className="agent-avatar"
          />
          <span className="prompt-text">Interact with {action.type.charAt(0).toUpperCase() + action.type.slice(1)}</span>
          <span className="prompt-indicator">●</span>
        </div>
      </div>
    </div>
  );
}

