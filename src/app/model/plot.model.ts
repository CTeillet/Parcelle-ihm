import { GeoJsonProperties } from 'geojson';

export interface PlotAdditionalProperties {
  id: string;
  area: number;
  town: string;
  address: string;
}

export type PlotProperties = GeoJsonProperties & PlotAdditionalProperties;
