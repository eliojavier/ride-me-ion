import {GeoLocation} from './GeoLocation';

export interface Transport {
  id: number;
  type: string;
  make: string;
  model: string;
  year: number;
  plate: string;
  last_geo_location: GeoLocation;
}
