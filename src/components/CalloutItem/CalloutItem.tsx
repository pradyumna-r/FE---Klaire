import { Calendar, BarChart2, AlertTriangle, Circle } from 'lucide-react';
import type { Callout } from '../../types';
import './CalloutItem.css';

interface CalloutItemProps {
  callout: Callout;
  isMinimized?: boolean;
  isSelected?: boolean;
  onClick: () => void;
}

export function CalloutItem({ callout, isMinimized = false, isSelected = false, onClick }: CalloutItemProps) {
  const getPriorityIcon = () => {
    switch (callout.priority) {
      case 'high':
        return <AlertTriangle size={14} className="priority-icon high" />;
      case 'medium':
        return <BarChart2 size={14} className="priority-icon medium" />;
      default:
        return <BarChart2 size={14} className="priority-icon low" />;
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

  if (isMinimized) {
    return (
      <button 
        className={`callout-item minimized ${isSelected ? 'selected' : ''}`}
        onClick={onClick}
        type="button"
        aria-label={`Open ${callout.title}`}
      >
        <Circle size={16} className="callout-checkbox" />
        <span className="callout-source-icon">{getSourceIcon()}</span>
        <span className="callout-title">{callout.title}</span>
        <span className="callout-date">{callout.dueDate}</span>
      </button>
    );
  }

  return (
    <button 
      className={`callout-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      type="button"
      aria-label={`Open ${callout.title}`}
    >
      <Circle size={18} className="callout-checkbox" />
      <span className="callout-source-icon">{getSourceIcon()}</span>
      <div className="callout-content">
        <span className="callout-title">{callout.title}</span>
      </div>
      <div className="callout-meta">
        {getPriorityIcon()}
        <span className="callout-date">{callout.dueDate}</span>
        <Calendar size={14} className="callout-calendar-icon" />
      </div>
    </button>
  );
}

