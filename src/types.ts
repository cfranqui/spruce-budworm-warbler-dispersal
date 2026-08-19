export type ActiveTab = 'readme-rendered' | 'readme-raw' | 'interactive-maps' | 'phenology-calc' | 'poster-view';

export type ProjectId = 'california-migration' | 'spruce-budworm';

export interface ProjectMeta {
  id: ProjectId;
  title: string;
  shortTitle: string;
  repoName: string;
  course: string;
  author: string;
  institution: string;
  term: string;
  badgeTag: string;
  description: string;
  toolTabLabel: string;
}

// California Project Types
export interface DecadalMeanCenter {
  year: number;
  allCounties: { lat: number; lon: number; countyName: string };
  withoutLA: { lat: number; lon: number; countyName: string };
  withoutLAandBay: { lat: number; lon: number; countyName: string };
}

export interface CaliforniaCountyData {
  name: string;
  fips: string;
  region: 'Bay Area' | 'Southern California' | 'Inland Empire' | 'Central Valley' | 'Northern / Sierra' | 'Central Coast';
  pop1970: number;
  pop2020: number;
  popChangePct: number;
  homeVal1990Nominal: number;
  homeVal1990Adjusted2020: number; // CPI adjusted to 2020 dollars
  homeVal2020: number;
  homeValGrowthPct: number;
  lat: number;
  lon: number;
}

// Spruce Budworm Project Types
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
