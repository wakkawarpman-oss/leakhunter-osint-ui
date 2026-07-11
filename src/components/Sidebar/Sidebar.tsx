import React from "react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">Л</div>
          <div className="brand-title">
            <strong>LeakHunter OSINT</strong>
            <span>Панель інтелектуальних витоків</span>
          </div>
        </div>

        <div className="side-section">
          <div className="nav-list">
            <button 
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => onTabChange("dashboard")}
            >
              <span className="nav-left">
                <span className="nav-icon">▣</span>
                <span>Панель</span>
              </span>
              <span className="badge">Live</span>
            </button>
          </div>
        </div>

        <div className="side-section">
          <div className="section-label">Моніторинг</div>
          <div className="nav-list">
            <button className="nav-item">
              <span className="nav-left"><span className="nav-icon">◌</span><span>Живі джерела</span></span>
              <span className="badge">38</span>
            </button>
            <button className="nav-item">
              <span className="nav-left"><span className="nav-icon">⚠</span><span>Виявлення</span></span>
              <span className="badge hot">23</span>
            </button>
            <button className="nav-item">
              <span className="nav-left"><span className="nav-icon">▤</span><span>Усі витоки</span></span>
            </button>
          </div>
        </div>

        <div className="side-section">
          <div className="section-label">Обробка даних</div>
          <div className="nav-list">
            <button 
              className={`nav-item ${activeTab === 'converter' ? 'active' : ''}`}
              onClick={() => onTabChange("converter")}
            >
              <span className="nav-left"><span className="nav-icon">⇄</span><span>Конвертер</span></span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'geoextract' ? 'active' : ''}`}
              onClick={() => onTabChange("geoextract")}
            >
              <span className="nav-left"><span className="nav-icon">⌖</span><span>GeoExtract</span></span>
            </button>
            <button className="nav-item"><span className="nav-left"><span className="nav-icon">◫</span><span>Дедуплікатор</span></span></button>
          </div>
        </div>
        
        <div className="sidebar-footer">
          <div className="footer-row">
            <span>Сервер: <strong>Live</strong></span>
            <span>22%</span>
          </div>
          <div className="footer-meter">
            <span style={{ width: "22%" }}></span>
          </div>
        </div>
      </aside>
  );
};
