import React, { useState } from 'react';

const mockDocs = [
  { id: '1', name: 'photo_2024-06-24.jpg', type: 'JPG', size: '2.4 MB', status: 'Оброблено' },
  { id: '2', name: 'positions_report.xlsx', type: 'XLSX', size: '56 KB', status: 'Оброблено' },
  { id: '3', name: 'article_ru_24.06.pdf', type: 'PDF', size: '1.2 MB', status: 'Оброблено' },
];

export const GeoUploadPanel: React.FC = () => {
  const [autoDetect, setAutoDetect] = useState(true);

  return (
    <aside className="geo-sidebar">
      <div>
        <div className="geo-dropzone">
          <strong style={{ display: "block", color: "#fff", marginBottom: "4px" }}>Перетягніть файли сюди</strong>
          <span style={{ fontSize: "12px", color: "#a1a1aa" }}>або натисніть для вибору</span>
        </div>
      </div>

      <div>
        <h3>Завантажені документи</h3>
        <div className="geo-doc-list">
          {mockDocs.map(doc => (
            <div key={doc.id} className="geo-doc-item">
              <div className="geo-doc-info">
                <strong>{doc.name}</strong>
                <span>{doc.type} • {doc.size}</span>
              </div>
              <div className="geo-status-ok">{doc.status} ✓</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "auto" }}>
        <h3>Налаштування обробки</h3>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
          <span style={{ fontSize: "13px" }}>Автоматичне визначення координат</span>
          <input type="checkbox" checked={autoDetect} onChange={() => setAutoDetect(!autoDetect)} />
        </div>
        <button className="geo-btn">Обробити документи</button>
      </div>
    </aside>
  );
};