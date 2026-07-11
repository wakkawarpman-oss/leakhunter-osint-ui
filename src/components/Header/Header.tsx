import React from "react";
import { Bell, Settings, LogOut, RefreshCcw } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <strong>Останнє оновлення: 10:24:31</strong>
        <span className="status-pill">
          <span className="status-dot"></span>
          Live
        </span>
        <button className="icon-button"><RefreshCcw size={16} /></button>
      </div>
      <div className="topbar-right">
        <button className="text-button pill-alert">
          <Bell size={18} />
          <span>Сповіщення</span>
        </button>
        <button className="text-button">
          <Settings size={18} />
          <span>Налаштування</span>
        </button>
        <button className="text-button">
          <LogOut size={18} />
          <span>Вихід</span>
        </button>
      </div>
    </div>
  );
};
