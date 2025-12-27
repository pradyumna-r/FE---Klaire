import { useState, useEffect } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  Globe, 
  Bell, 
  MoreHorizontal, 
  Folder,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  ArrowRight,
  Send,
  Sparkles,
  Loader2
} from 'lucide-react';
import type { Callout, AgentSuggestion } from '../../types';
import { useApp } from '../../context/AppContext';
import { fetchAgentAction, fetchAgentSuggestions, sendReply, markCalloutAsDone } from '../../mock/data';
import { LoadingSpinner } from '../LoadingSpinner';
import './CalloutDetail.css';

interface CalloutDetailProps {
  callout: Callout;
}

export function CalloutDetail({ callout }: CalloutDetailProps) {
  const [summaryExpanded, setSummaryExpanded] = useState(true);
  const [threadExpanded, setThreadExpanded] = useState(true);
  const [messageInput, setMessageInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isMarkingDone, setIsMarkingDone] = useState(false);
  const [agentSuggestions, setAgentSuggestions] = useState<AgentSuggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);
  
  const { openAgentSidebar, setIsAgentLoading, closeDetail } = useApp();

  // Simulate AI summary loading
  useEffect(() => {
    setIsSummaryLoading(true);
    const timer = setTimeout(() => {
      setIsSummaryLoading(false);
    }, 2000); // Simulate 2 second loading
    return () => clearTimeout(timer);
  }, [callout.id]);

  const handleMarkAsDone = async () => {
    setIsMarkingDone(true);
    try {
      await markCalloutAsDone(callout.id);
      // Close the detail view and return to full list
      closeDetail();
    } catch (error) {
      console.error('Failed to mark callout as done:', error);
    } finally {
      setIsMarkingDone(false);
    }
  };

  // Load agent suggestions on mount
  useState(() => {
    const loadSuggestions = async () => {
      setLoadingSuggestions(true);
      try {
        const suggestions = await fetchAgentSuggestions();
        setAgentSuggestions(suggestions);
      } catch (error) {
        console.error('Failed to load suggestions:', error);
      } finally {
        setLoadingSuggestions(false);
      }
    };
    loadSuggestions();
  });

  const handleAgentAction = async (actionType: string) => {
    setIsAgentLoading(true);
    try {
      const action = await fetchAgentAction(callout.id);
      // Override with specific type based on suggestion clicked
      const updatedAction = {
        ...action,
        type: actionType as 'calendar' | 'notion' | 'slack' | 'email',
        title: `${actionType.charAt(0).toUpperCase() + actionType.slice(1)} agent connected`,
      };
      openAgentSidebar(updatedAction);
    } catch (error) {
      console.error('Failed to start agent:', error);
    } finally {
      setIsAgentLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;
    
    setIsSending(true);
    try {
      await sendReply(callout.id, messageInput);
      setMessageInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleQuickReply = async (reply: string) => {
    setIsSending(true);
    try {
      await sendReply(callout.id, reply);
    } catch (error) {
      console.error('Failed to send quick reply:', error);
    } finally {
      setIsSending(false);
    }
  };

  const getSourceIcon = () => {
    const iconMap: Record<string, string> = {
      slack: '💬',
      notion: '📝',
      figma: '🎨',
      gmail: '✉️',
      calendar: '📅',
    };
    return iconMap[callout.source.platform] || '📋';
  };

  return (
    <div className="callout-detail">
      <div className="detail-header">
        <div className="header-nav">
          <button className="nav-btn" onClick={closeDetail} title="Previous">
            <ChevronUp size={18} />
          </button>
          <button className="nav-btn" title="Next">
            <ChevronDown size={18} />
          </button>
        </div>

        <div className="header-spacer" />

        <div className="header-actions">
          <button className="icon-btn">
            <Globe size={18} />
          </button>
          <button className="icon-btn">
            <Bell size={18} />
          </button>
          <button className="icon-btn">
            <MoreHorizontal size={18} />
          </button>
          <button 
            className="mark-done-btn"
            onClick={handleMarkAsDone}
            disabled={isMarkingDone}
          >
            {isMarkingDone ? 'Marking...' : 'Mark as done'}
            <span className="shortcut">⌘ D</span>
          </button>
        </div>
      </div>

      <div className="detail-content">
        <h1 className="detail-title">{callout.title}</h1>
        
        <div className="detail-meta">
          <span className="meta-item source">
            <span className="source-icon">{getSourceIcon()}</span>
            From on {callout.source.text || `${callout.source.user}'s message`}
            {callout.source.channel && ` in ${callout.source.channel}`}
            <ChevronDown size={14} />
          </span>
          <span className="meta-item">
            <img 
              src={callout.assignedBy.avatar} 
              alt="" 
              className="meta-avatar"
            />
            By {callout.assignedBy.name}
          </span>
          <span className="meta-item">
            <Calendar size={14} />
            {callout.dueDate}
          </span>
          <span className="meta-item">
            <Folder size={14} />
            {callout.folder}
          </span>
        </div>

        {/* Summary Section */}
        <div className="summary-section">
          {isSummaryLoading ? (
            // Loading skeleton state
            <div className="summary-card summary-loading">
              <div className="summary-loading-header">
                <Loader2 size={16} className="loading-spinner-icon" />
                <span>Summarizing content</span>
              </div>
              <div className="skeleton-lines">
                <div className="skeleton-line" style={{ width: '100%' }} />
                <div className="skeleton-line" style={{ width: '90%' }} />
                <div className="skeleton-line" style={{ width: '75%' }} />
              </div>
              <div className="summary-loading-footer">
                <button className="open-notion-btn">
                  <span className="notion-icon">📝</span>
                  Open Notion
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ) : callout.summary ? (
            // Loaded state
            <div className="summary-card">
              <div className="summary-header">
                <div className="summary-title">
                  <Sparkles size={16} className="sparkle-icon" />
                  Summarized by {callout.summary.summarizedBy}
                </div>
                <div className="summary-actions">
                  <span className="helpful-text">Is this helpful?</span>
                  <button className="feedback-btn">
                    <ThumbsUp size={14} />
                  </button>
                  <button className="feedback-btn">
                    <ThumbsDown size={14} />
                  </button>
                  <button 
                    className="expand-btn"
                    onClick={() => setSummaryExpanded(!summaryExpanded)}
                  >
                    {summaryExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>
              
              {summaryExpanded && (
                <div className="summary-content">
                  {callout.summary.items.map((item) => (
                    <div key={item.id} className="summary-item">
                      <ArrowRight size={14} className="arrow-icon" />
                      <span>{item.content}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="summary-footer">
                <button className="open-notion-btn">
                  <span className="notion-icon">📝</span>
                  Open Notion
                  <ExternalLink size={12} />
                </button>
                <button className="mark-done-summary-btn">Mark as done</button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Thread Section */}
        {callout.thread && (
          <div className="thread-section">
            <div className="thread-header">
              <span className="thread-icon">{getSourceIcon()}</span>
              <span className="thread-title">
                Thread connected · {callout.thread.channel}
              </span>
              <div className="thread-actions">
                <button className="icon-btn small">
                  <ExternalLink size={14} />
                </button>
                <button 
                  className="icon-btn small"
                  onClick={() => setThreadExpanded(!threadExpanded)}
                >
                  {threadExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>
            </div>

            {threadExpanded && (
              <div className="thread-content">
                {callout.thread.messages.map((message) => (
                  <div key={message.id} className="thread-message">
                    <img 
                      src={message.user.avatar} 
                      alt={message.user.name}
                      className="message-avatar"
                    />
                    <div className="message-content">
                      <div className="message-header">
                        <span className="message-author">{message.user.name}</span>
                        <span className="message-time">{message.timestamp}</span>
                      </div>
                      <p className="message-text">
                        {message.mentions?.map((mention) => (
                          <span key={mention} className="mention">@{mention} </span>
                        ))}
                        {message.content}
                      </p>
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="message-attachments">
                          {message.attachments.map((attachment, idx) => (
                            <span key={idx} className="attachment-badge">
                              🎨 {attachment}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <button className="view-all-btn">
                  <div className="participant-avatars">
                    {callout.thread.participants.slice(0, 3).map((p) => (
                      <img key={p.id} src={p.avatar} alt={p.name} className="mini-avatar" />
                    ))}
                  </div>
                  <span>View all messages</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="message-input-section">
        <div className="input-container">
          <img 
            src="https://i.pravatar.cc/150?u=currentuser" 
            alt="You"
            className="input-avatar"
          />
          <input
            type="text"
            placeholder="Send an update"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isSending}
          />
          <button 
            className="send-btn"
            onClick={handleSendMessage}
            disabled={!messageInput.trim() || isSending}
          >
            {isSending ? <LoadingSpinner size="small" /> : <Send size={16} />}
          </button>
        </div>

        {/* Agent Suggestions */}
        <div className="suggestions-row">
          {loadingSuggestions ? (
            <LoadingSpinner size="small" />
          ) : (
            <>
              {callout.quickReplies?.map((reply, idx) => (
                <button 
                  key={idx} 
                  className="suggestion-btn"
                  onClick={() => handleQuickReply(reply)}
                  disabled={isSending}
                >
                  {reply}
                </button>
              ))}
              {agentSuggestions.slice(0, 2).map((suggestion) => (
                <button 
                  key={suggestion.id} 
                  className="suggestion-btn agent"
                  onClick={() => handleAgentAction(suggestion.action)}
                >
                  <Sparkles size={12} />
                  {suggestion.label}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

