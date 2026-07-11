import React from "react";

export const StatsSection: React.FC = () => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-header">
          <div>
            <div className="stat-label">Нові витоки (24H)</div>
            <div className="stat-value">23</div>
          </div>
          <div className="stat-icon">層</div>
        </div>
        <div className="stat-sub">
          <strong>↗ +8</strong> від вчора
        </div>
      </div>

      <div className="stat-card" style={{ gridColumn: "span 2" }}>
        <div className="stat-header">
          <div>
            <div className="stat-label">Витягнуто записів</div>
            <div className="stat-value">12,842,290</div>
          </div>
          <div className="stat-icon">📄</div>
        </div>
        <div className="stat-sub">
          <strong>↗ +2,398,112</strong> (24h)
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <div>
            <div className="stat-label">Відстежувані джерела</div>
            <div className="stat-value">38</div>
          </div>
        </div>
        <div className="stat-sub">активних</div>
      </div>
    </div>
  );
};
