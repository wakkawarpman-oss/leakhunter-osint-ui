export interface GeoDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: 'Оброблено' | 'В процесі' | 'Помилка';
}

export interface GeoPoint {
  id: string;
  lat: number;
  lng: number;
  sourceDocId: string;
  type: string;
  description: string;
  timestamp: string;
  isFresh: boolean;
}
