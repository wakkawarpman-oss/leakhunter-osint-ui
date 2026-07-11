export interface GeoDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: 'Оброблено' | 'В процесі' | 'Помилка';
}

export type PointType = 'fresh' | 'medium' | 'old_heatmap';

export interface GeoPoint {
  id: string;
  lat: number;
  lng: number;
  sourceDocId: string;
  type: PointType;
  description: string;
  timestamp: string;
  isFresh: boolean;
}
