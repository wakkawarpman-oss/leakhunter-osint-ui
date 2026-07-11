import React, { useState } from "react";
import { mockLeaks, formatNumber } from "../../data/mockData";

export const MainContent: React.FC = () => {
  const [leaks] = useState(mockLeaks);

  const getThreatPillClass = (level: string) => {
    switch (level) {
      case "Висока": return "pill bad";
      case "Середня": return "pill mid";
      case "Низька": return "pill good";
      default: return "pill neutral";
    }
  };

  const handleAction = () => {
    alert("Перехід до режиму детального аналізу витоків. (Демо)");
  };

  return (
    <div className="section-grid" style={{ gridTemplateColumns: "1fr" }}>
      <div className="panel" style={{ minHeight: "350px" }}>
        <div className="panel-head">
          <div className="panel-title">
            <strong>Останні активності та Прямі сповіщення</strong>
            <span>Моніторинг в реальному часі</span>
          </div>
          <button className="primary-button" onClick={handleAction}>Переглянути всі</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Час</th>
                <th>Джерело</th>
                <th>Заголовок</th>
                <th>Тип</th>
                <th>Записи</th>
                <th>Вразливість</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {leaks.map((leak) => (
                <tr key={leak.id}>
                  <td>{leak.time}</td>
                  <td><a href="#" className="source-link">{leak.source}</a></td>
                  <td>{leak.title}</td>
                  <td>{leak.type}</td>
                  <td>{formatNumber(leak.recordsCount)}</td>
                  <td><span className={getThreatPillClass(leak.threatLevel)}>{leak.threatLevel}</span></td>
                  <td><button className="small-button">Аналіз</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
