import type { Callout, User, AgentAction, AgentSuggestion } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Aditya Nahak',
    avatar: 'https://i.pravatar.cc/150?u=aditya',
  },
  {
    id: '2',
    name: 'Ranjith Nair',
    avatar: 'https://i.pravatar.cc/150?u=ranjith',
  },
  {
    id: '3',
    name: 'Sayan',
    avatar: 'https://i.pravatar.cc/150?u=sayan',
  },
  {
    id: '4',
    name: 'Prateek',
    avatar: 'https://i.pravatar.cc/150?u=prateek',
  },
  {
    id: '5',
    name: 'Shivam',
    avatar: 'https://i.pravatar.cc/150?u=shivam',
  },
];

// Mock Callouts Data
export const mockCallouts: Callout[] = [
  {
    id: '1',
    title: 'Confirm update status designs',
    source: {
      platform: 'slack',
      channel: '#design',
      text: "Aditya's text in #design",
      user: 'Aditya',
    },
    assignedBy: mockUsers[0],
    dueDate: 'Today',
    folder: 'Design',
    priority: 'medium',
    status: 'open',
    icon: '📋',
    summary: {
      id: 's1',
      summarizedBy: 'Klaire',
      items: [
        { id: 'si1', content: 'Aditya asked for latest designs for "status update"' },
        { id: 'si2', content: "Ranjith & Sayan mentioned it's work in progress will share once done." },
        { id: 'si3', content: 'Ranjith shared designs, asked Sayan to review and confirm' },
      ],
    },
    thread: {
      id: 't1',
      channel: '#design',
      messages: [
        {
          id: 'm1',
          user: mockUsers[0],
          content: "@Ranjith @Sayan is this the final design for request latest status update? looking at this I don't...",
          timestamp: '42m ago',
          mentions: ['Ranjith', 'Sayan'],
          attachments: ['V4 Handoff'],
        },
      ],
      participants: [mockUsers[0], mockUsers[1], mockUsers[2]],
    },
    quickReplies: ['Design looks good', 'Making some edits and sharing'],
  },
  {
    id: '2',
    title: 'Setup design UAT call',
    source: {
      platform: 'slack',
      channel: '#design',
      text: "Ranjith's text in #design",
      user: 'Ranjith',
    },
    assignedBy: mockUsers[1],
    dueDate: 'Today',
    folder: 'Design',
    priority: 'medium',
    status: 'open',
    icon: '📅',
    summary: {
      id: 's2',
      summarizedBy: 'Klaire',
      items: [
        { id: 'si4', content: 'Ranjith asked to setup a call for design UAT between Prateek & Sayan' },
        { id: 'si5', content: 'Prateek replied anytime post 3 works' },
        { id: 'si6', content: "Sayan said they'll setup a call for the same" },
      ],
    },
    thread: {
      id: 't2',
      channel: '#design',
      messages: [
        {
          id: 'm2',
          user: mockUsers[1],
          content: '@Prateek @Sayan can we do a design UAT call today?',
          timestamp: '42m ago',
          mentions: ['Prateek', 'Sayan'],
        },
      ],
      participants: [mockUsers[1], mockUsers[2], mockUsers[3]],
    },
    quickReplies: ['Schedule the call', 'Need to reschedule'],
  },
  {
    id: '3',
    title: 'Implement UAT changes',
    source: {
      platform: 'slack',
      channel: '#engineering',
      user: 'Prateek',
    },
    assignedBy: mockUsers[3],
    dueDate: 'Dec 22',
    folder: 'Engineering',
    priority: 'high',
    status: 'open',
    icon: '⚙️',
    summary: {
      id: 's3',
      summarizedBy: 'Klaire',
      items: [
        { id: 'si7', content: 'UAT feedback received from stakeholders' },
        { id: 'si8', content: 'Priority items identified for implementation' },
        { id: 'si9', content: 'Deadline set for end of week' },
      ],
    },
    quickReplies: ['On it', 'Need more details'],
  },
  {
    id: '4',
    title: 'Review features changes for c...',
    source: {
      platform: 'notion',
      user: 'Sayan',
    },
    assignedBy: mockUsers[2],
    dueDate: 'Dec 28',
    folder: 'Product',
    priority: 'medium',
    status: 'open',
    icon: '📝',
    summary: {
      id: 's4',
      summarizedBy: 'Klaire',
      items: [
        { id: 'si10', content: 'Feature spec document updated' },
        { id: 'si11', content: 'Review requested before sprint planning' },
      ],
    },
    quickReplies: ['Will review today', 'Scheduled for tomorrow'],
  },
  {
    id: '5',
    title: 'Add all services designs to cal...',
    source: {
      platform: 'figma',
      user: 'Aditya',
    },
    assignedBy: mockUsers[0],
    dueDate: 'Dec 20',
    folder: 'Design',
    priority: 'low',
    status: 'open',
    icon: '🎨',
    summary: {
      id: 's5',
      summarizedBy: 'Klaire',
      items: [
        { id: 'si12', content: 'Design system updates needed' },
        { id: 'si13', content: 'Calendar integration designs pending' },
      ],
    },
    quickReplies: ['Designs ready', 'Need more time'],
  },
  {
    id: '6',
    title: 'Revise onboarding flow',
    source: {
      platform: 'figma',
      user: 'Ranjith',
    },
    assignedBy: mockUsers[1],
    dueDate: 'Oct 22',
    folder: 'Design',
    priority: 'high',
    status: 'open',
    icon: '🚀',
    summary: {
      id: 's6',
      summarizedBy: 'Klaire',
      items: [
        { id: 'si14', content: 'Onboarding feedback collected from users' },
        { id: 'si15', content: 'Key pain points identified' },
        { id: 'si16', content: 'New flow proposed by design team' },
      ],
    },
    quickReplies: ['Review completed', 'Need discussion'],
  },
  {
    id: '7',
    title: 'Schedule UAT call',
    source: {
      platform: 'calendar',
      user: 'Prateek',
    },
    assignedBy: mockUsers[3],
    dueDate: 'Oct 23',
    folder: 'Meetings',
    priority: 'medium',
    status: 'open',
    icon: '📞',
    quickReplies: ['Confirm attendance', 'Suggest new time'],
  },
  {
    id: '8',
    title: 'Review compliance policy',
    source: {
      platform: 'notion',
      user: 'Shivam',
    },
    assignedBy: mockUsers[4],
    dueDate: 'Dec 25',
    folder: 'Legal',
    priority: 'medium',
    status: 'open',
    icon: '📜',
    quickReplies: ['Reviewed', 'Questions pending'],
  },
  {
    id: '9',
    title: 'PR review status',
    source: {
      platform: 'slack',
      channel: '#engineering',
      user: 'Ranjith',
    },
    assignedBy: mockUsers[1],
    dueDate: 'Dec 25',
    folder: 'Engineering',
    priority: 'low',
    status: 'open',
    icon: '🔍',
    quickReplies: ['Will review', 'Already done'],
  },
  {
    id: '10',
    title: 'Action required: Onboarding',
    source: {
      platform: 'gmail',
      user: 'HR Team',
    },
    assignedBy: mockUsers[0],
    dueDate: 'Oct 23',
    folder: 'HR',
    priority: 'medium',
    status: 'open',
    icon: '✉️',
    quickReplies: ['Completed', 'In progress'],
  },
  {
    id: '11',
    title: 'Approve time off request',
    source: {
      platform: 'gmail',
      user: 'HR System',
    },
    assignedBy: mockUsers[2],
    dueDate: 'Oct 23',
    folder: 'HR',
    priority: 'medium',
    status: 'open',
    icon: '🏖️',
    quickReplies: ['Approved', 'Need discussion'],
  },
  {
    id: '12',
    title: 'Review performance feedback',
    source: {
      platform: 'notion',
      user: 'Manager',
    },
    assignedBy: mockUsers[3],
    dueDate: 'Oct 23',
    folder: 'HR',
    priority: 'medium',
    status: 'open',
    icon: '📊',
    quickReplies: ['Reviewed', 'Schedule 1:1'],
  },
  {
    id: '13',
    title: 'Submit expense report for August',
    source: {
      platform: 'notion',
      user: 'Finance',
    },
    assignedBy: mockUsers[4],
    dueDate: 'Oct 23',
    folder: 'Finance',
    priority: 'low',
    status: 'open',
    icon: '💰',
    quickReplies: ['Submitted', 'Need help'],
  },
  {
    id: '14',
    title: 'Action required: Approve budget',
    source: {
      platform: 'notion',
      user: 'Finance Team',
    },
    assignedBy: mockUsers[0],
    dueDate: 'Oct 23',
    folder: 'Finance',
    priority: 'high',
    status: 'open',
    icon: '📈',
    quickReplies: ['Approved', 'Need revisions'],
  },
];

// Completed callouts (for the completed section)
export const mockCompletedCallouts: Callout[] = Array.from({ length: 20 }, (_, i) => ({
  id: `completed-${i + 1}`,
  title: `Completed task ${i + 1}`,
  source: {
    platform: ['slack', 'notion', 'figma', 'gmail'][i % 4] as Callout['source']['platform'],
    user: mockUsers[i % mockUsers.length].name,
  },
  assignedBy: mockUsers[i % mockUsers.length],
  dueDate: `Dec ${10 + (i % 20)}`,
  folder: ['Design', 'Engineering', 'Product', 'HR'][i % 4],
  priority: ['high', 'medium', 'low'][i % 3] as Callout['priority'],
  status: 'completed',
  icon: ['📋', '⚙️', '📝', '✅'][i % 4],
}));

// Mock Agent Actions
export const mockAgentActions: AgentAction[] = [
  {
    id: 'a1',
    type: 'calendar',
    title: 'Calendar agent connected',
    description: 'Creating event between participants',
    status: 'in_progress',
    details: {
      service: 'Google Calendar',
      action: 'Creating event',
      participants: ['You', 'Ranjith', 'Shivam'],
    },
  },
  {
    id: 'a2',
    type: 'slack',
    title: 'Slack agent connected',
    description: 'Sending message to channel',
    status: 'pending',
    details: {
      service: 'Slack',
      action: 'Sending update',
    },
  },
  {
    id: 'a3',
    type: 'notion',
    title: 'Notion agent connected',
    description: 'Updating document',
    status: 'completed',
    details: {
      service: 'Notion',
      action: 'Document updated',
    },
  },
];

// Mock Agent Suggestions
export const mockAgentSuggestions: AgentSuggestion[] = [
  { id: 'as1', label: 'Schedule a meeting', action: 'calendar' },
  { id: 'as2', label: 'Send a message', action: 'slack' },
  { id: 'as3', label: 'Create a document', action: 'notion' },
  { id: 'as4', label: 'Book a meeting', action: 'calendar' },
  { id: 'as5', label: 'Edit this', action: 'notion' },
];

// API simulation functions
export const fetchCallouts = (): Promise<Callout[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCallouts.filter((c) => c.status === 'open'));
    }, 800);
  });
};

export const fetchCompletedCallouts = (): Promise<Callout[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCompletedCallouts);
    }, 600);
  });
};

export const fetchCalloutById = (id: string): Promise<Callout | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const callout = mockCallouts.find((c) => c.id === id);
      resolve(callout);
    }, 500);
  });
};

export const fetchAgentAction = (calloutId: string): Promise<AgentAction> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate different agent actions based on callout
      const actionIndex = parseInt(calloutId) % mockAgentActions.length;
      resolve(mockAgentActions[actionIndex]);
    }, 1000);
  });
};

export const fetchAgentSuggestions = (): Promise<AgentSuggestion[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAgentSuggestions.slice(0, 3));
    }, 300);
  });
};

export const markCalloutAsDone = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Marking callout ${id} as done`);
      resolve(true);
    }, 500);
  });
};

export const sendReply = (calloutId: string, message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Sending reply to callout ${calloutId}: ${message}`);
      resolve(true);
    }, 400);
  });
};

