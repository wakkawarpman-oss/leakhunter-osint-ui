import React, { useState } from 'react';

const mockPoints = [
  { id: 1, top: '25%', left: '35%', type: 'fresh' },
  { id: 2, top: '45%', left: '55%', type: 'fresh' },
  { id: 3, top: '75%', left: '68%', type: 'fresh' },
  { id: 4, top: '35%', left: '72%', type: 'old' },
  { id: 5, top: '65%', left: '42%', type: 'old' },
];

export const GeoMapArea: React.FC = () => {
  const [activePopup, setActivePopup] = useState<number | null>(1);

  return (
    <div className="geo-map-container">
      <div className="geo-map-overlay" />
      
      <div className="geo-topbar">
        <input type="text" className="geo-search" placeholder="Пошук на мапі..." />
        <button className="geo-btn" style={{ width: 'auto', background: '#111', border: '1px solid #4b5563' }}>Експорт</button>
      </div>

      {mockPoints.map(pt => (
        <React.Fragment key={pt.id}>
          <div 
            className={`geo-marker ${pt.type}`} 
            style={{ top: pt.top, left: pt.left }}
            onClick={() => setActivePopup(pt.id)}
          />
          {activePopup === pt.id && (
            <div style={{
              position: 'absolute', top: `calc(${pt.top} + 20px)`, left: `calc(${pt.left} + 20px)`,
              background: '#1a1b1e', border: '1px solid #2b2d31', padding: '16px', borderRadius: '12px',
              width: '280px', zIndex: 30, color: '#fff', fontSize: '13px'
            }}>
              <div style={{ marginBottom: '12px', color: '#ef4444', fontWeight: 'bold' }}>● Свіжа координата</div>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '8px', color: '#a1a1aa' }}>
                <span>Широта</span><span style={{ color: '#fff' }}>48.531267</span>
                <span>Довгота</span><span style={{ color: '#fff' }}>37.872134</span>
                <span>Джерело</span><span style={{ color: '#fff' }}>photo_report.jpg</span>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}

      <div className="geo-timeline">
        <div>
          <h4 style={{ margin: '0 0 12px', fontSize: '13px', color: '#fff' }}>Легенда</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
            <span><span style={{ color: '#ef4444' }}>●</span> Свіжі (&lt; 24 год)</span> <span>23</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span><span style={{ color: '#3b82f6' }}>●</span> Старі (&gt; 24 год)</span> <span>64</span>
          </div>
        </div>
        <div>
          <h4 style={{ margin: '0 0 12px', fontSize: '13px', color: '#fff' }}>Фільтр за часом події</h4>
          <div style={{ height: '4px', background: '#3b82f6', borderRadius: '2px', position: 'relative', marginTop: '20px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '8px', color: '#a1a1aa' }}>
            <span>30 днів тому</span>
            <span>7 днів тому</span>
            <span>Сьогодні</span>
          </div>
        </div>
      </div>
    </div>
  );
};