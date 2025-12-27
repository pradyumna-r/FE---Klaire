import { useState, useEffect } from 'react';
import { X, Calendar, MessageSquare, FileText, Mail, Loader2 } from 'lucide-react';
import type { AgentAction } from '../../types';
import { useApp } from '../../context/AppContext';
import './AgentSidebar.css';

interface AgentSidebarProps {
  action: AgentAction;
}

export function AgentSidebar({ action }: AgentSidebarProps) {
  const [status, setStatus] = useState<'connecting' | 'processing' | 'completed'>('connecting');
  const { closeAgentSidebar } = useApp();

  useEffect(() => {
    // Simulate agent connection and processing
    const timer1 = setTimeout(() => setStatus('processing'), 1000);
    const timer2 = setTimeout(() => setStatus('completed'), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [action]);

  const getAgentIcon = () => {
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
            style={{ backgroundColor: getServiceBgColor() }}
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

