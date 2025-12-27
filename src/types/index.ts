// Types for the Callouts application

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface SummaryItem {
  id: string;
  content: string;
}

export interface Summary {
  id: string;
  summarizedBy: string;
  items: SummaryItem[];
}

export interface ThreadMessage {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  mentions?: string[];
  attachments?: string[];
}

export interface Thread {
  id: string;
  channel: string;
  messages: ThreadMessage[];
  participants: User[];
}

export interface Callout {
  id: string;
  title: string;
  source: {
    platform: 'slack' | 'notion' | 'figma' | 'gmail' | 'calendar';
    channel?: string;
    text?: string;
    user?: string;
  };
  assignedBy: User;
  dueDate: string;
  folder: string;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'completed';
  icon: string;
  summary?: Summary;
  thread?: Thread;
  quickReplies?: string[];
}

export interface AgentAction {
  id: string;
  type: 'calendar' | 'notion' | 'slack' | 'email';
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  details?: {
    service: string;
    action: string;
    participants?: string[];
  };
}

export interface AgentSuggestion {
  id: string;
  label: string;
  action: string;
}

export type ViewState = 'list' | 'detail' | 'detail-with-agent';

