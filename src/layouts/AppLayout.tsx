import React, { Suspense, useState } from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";

export const AppLayout: React.FC<{ children?: React.ReactNode }> = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Lazy loading modules for performance optimization
  const DashboardComponent = React.lazy(() => import("../components/Dashboard/Dashboard").then(module => ({ default: module.Dashboard })));
  const ConverterComponent = React.lazy(() => import("../components/Dashboard/Converter").then(module => ({ default: module.Converter })));
  const GeoExtractComponent = React.lazy(() => import("../components/GeoExtract/GeoExtractView").then(module => ({ default: module.GeoExtractView })));

  return (
    <div className={activeTab === 'geoextract' ? '' : 'app'}>
      {activeTab !== 'geoextract' && <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />}
      <main className={activeTab === 'geoextract' ? '' : 'main'}>
        <Suspense fallback={<div>Loading...</div>}>
          {activeTab === "dashboard" ? <DashboardComponent /> : 
           activeTab === "converter" ? <ConverterComponent /> : 
           <div>
             {/* Render header controls for GeoExtract to switch back */}
             <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 100 }}>
               <button onClick={() => setActiveTab('dashboard')} style={{ background: '#111', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer'}}>← Повернутися до Dashboard</button>
             </div>
             <GeoExtractComponent />
           </div>
           }
        </Suspense>
      </main>
    </div>
  );
};
