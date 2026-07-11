import React from 'react';
import { GeoUploadPanel } from './GeoUploadPanel';
import { GeoMapArea } from './GeoMapArea';

export const GeoExtractView: React.FC = () => {
    return (
        <div className="geo-layout">
            <GeoUploadPanel />
            <GeoMapArea />
        </div>
    );
};