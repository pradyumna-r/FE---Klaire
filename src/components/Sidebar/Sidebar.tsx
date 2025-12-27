import { Home, FileText, CheckSquare, Search, Settings, X } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'documents', icon: FileText, label: 'Documents' },
    { id: 'callouts', icon: CheckSquare, label: 'Callouts' },
    { id: 'search', icon: Search, label: 'Search' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <X size={20} strokeWidth={3} />
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
            title={item.label}
          >
            <item.icon size={20} />
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item" title="Settings">
          <Settings size={20} />
        </button>
      </div>
    </aside>
  );
}

