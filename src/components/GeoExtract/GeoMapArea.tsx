import React, { useState } from 'react';

const mockPoints = [
  { id: 1, top: '25%', left: '35%', type: 'fresh' },
  { id: 2, top: '45%', left: '55%', type: 'medium' },
  { id: 3, top: '75%', left: '68%', type: 'fresh' },
  { id: 4, top: '35%', left: '72%', type: 'old_heatmap' },
  { id: 5, top: '65%', left: '42%', type: 'old_heatmap' },
  { id: 6, top: '50%', left: '30%', type: 'medium' },
];

export const GeoMapArea: React.FC = () => {
  const [activePopup, setActivePopup] = useState<number | null>(1);

  const getMarkerLabel = (type: string) => {
    if (type === 'fresh') return { label: 'Свіжа координата', color: '#ef4444' };
    if (type === 'medium') return { label: 'Середня (1-3 дні)', color: '#eab308' };
    return { label: 'Стара (3-7 днів)', color: '#f97316' };
  };

  return (
    <div className="geo-map-container">
      <div className="geo-map-overlay" />
      
      <div className="geo-topbar">
        <input type="text" className="geo-search" placeholder="Пошук на мапі..." />
        <button className="geo-btn" style={{ width: 'auto', background: '#111', border: '1px solid #4b5563' }}>Експорт</button>
      </div>

      {mockPoints.map(pt => {
        const markerInfo = getMarkerLabel(pt.type);
        return (
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
                <div style={{ marginBottom: '12px', color: markerInfo.color, fontWeight: 'bold' }}>● {markerInfo.label}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '8px', color: '#a1a1aa' }}>
                  <span>Широта</span><span style={{ color: '#fff' }}>48.531267</span>
                  <span>Довгота</span><span style={{ color: '#fff' }}>37.872134</span>
                  <span>Джерело</span><span style={{ color: '#fff' }}>photo_report.jpg</span>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}

      <div className="geo-timeline">
        <div>
          <h4 style={{ margin: '0 0 12px', fontSize: '13px', color: '#fff' }}>Легенда</h4>
          <div style={{ display: 'grid', gap: '8px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span><span style={{ color: '#ef4444' }}>●</span> Свіжі (&lt; 24 год)</span> <span>23</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span><span style={{ color: '#eab308' }}>●</span> Середні (1-3 дні)</span> <span>18</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span><span style={{ color: '#f97316' }}>●</span> Старі (3-7 днів)</span> <span>64</span>
            </div>
          </div>
        </div>
        <div>
          <h4 style={{ margin: '0 0 12px', fontSize: '13px', color: '#fff' }}>Фільтр за часом події</h4>
          <div style={{ height: '4px', background: 'linear-gradient(90deg, #f97316 0%, #eab308 50%, #ef4444 100%)', borderRadius: '2px', position: 'relative', marginTop: '20px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '8px', color: '#a1a1aa' }}>
            <span>7 днів тому</span>
            <span>3 дні тому</span>
            <span>Сьогодні</span>
          </div>
        </div>
      </div>
    </div>
  );
};