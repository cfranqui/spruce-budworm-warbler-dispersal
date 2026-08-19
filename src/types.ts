export type ActiveTab = 'readme-rendered' | 'readme-raw' | 'interactive-maps' | 'phenology-calc' | 'poster-view';

export interface WeatherStation {
  id: string;
  name: string;
  county: string;
  lat: number;
  lon: number;
  elevationMeters: number;
  emergenceDate: string;
  gddAccumulated: number;
  gddThreshold: number;
  daysToEmergence: number;
}

export interface TrajectoryPoint {
  hour: number;
  lat: number;
  lon: number;
  altMeters: number;
  windSpeedKmh: number;
}

export interface TrajectorySource {
  id: string;
  name: string;
  originLat: number;
  originLon: number;
  points: TrajectoryPoint[];
}

export interface WarblerDensityRegion {
  name: string;
  type: 'source' | 'sink' | 'corridor';
  relativeAbundance: number; // birds/km2
  predationPressure: 'High' | 'Moderate' | 'Low' | 'Very Low';
  notes: string;
}
