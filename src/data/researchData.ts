import { WeatherStation, TrajectorySource, WarblerDensityRegion } from '../types';

export const RAW_README_MARKDOWN = `# Modeling Spruce Budworm Dispersal from Quebec into Maine and its Spatial Relationship to Bay-breasted Warbler Breeding Habitat

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![R 4.4+](https://img.shields.io/badge/R-4.4%2B-blue.svg)](https://www.r-project.org/)
[![NOAA HYSPLIT](https://img.shields.io/badge/NOAA-HYSPLIT%20v5-orange.svg)](https://www.ready.noaa.gov/HYSPLIT.php)
[![ECMWF ERA5](https://img.shields.io/badge/ECMWF-ERA5%20Reanalysis-green.svg)](https://cds.climate.copernicus.eu/)
[![eBird Status & Trends](https://img.shields.io/badge/Cornell-eBird%20Status%20%26%20Trends-red.svg)](https://ebird.org/science/status-and-trends)
[![ArcGIS Pro](https://img.shields.io/badge/GIS-ArcGIS%20Pro%203.x-007ac2.svg)](https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview)

> **Author**: Christopher Franqui  
> **Affiliation**: Maine Internship Program (Spring 2026), Monroe Community College (MCC), in collaboration with University of Maine (UMaine) & National Science Foundation (NSF)  
> **Mentors**: Professor Little, Casmir  
> **Date**: July 2024 (Data Period) / Spring 2026 (Published)

---

## 📌 Table of Contents
1. [Executive Summary & Research Question](#-executive-summary--research-question)
2. [Ecological & Atmospheric Background](#-ecological--atmospheric-background)
3. [Study Area & Geospatial Domain](#-study-area--geospatial-domain)
4. [Methodology & Analytical Pipeline](#-methodology--analytical-pipeline)
   - [1. Atmospheric Wind Reanalysis (ERA5)](#1-atmospheric-wind-reanalysis-era5)
   - [2. Thermal Phenology & Adult Emergence (GHCN-Daily)](#2-thermal-phenology--adult-emergence-ghcn-daily)
   - [3. Forward Trajectory Dispersion Modeling (NOAA HYSPLIT)](#3-forward-trajectory-dispersion-modeling-noaa-hysplit)
   - [4. Avian Predator Distribution & Spatial Overlays (eBird & ArcGIS Pro)](#4-avian-predator-distribution--spatial-overlays-ebird--arcgis-pro)
5. [Repository Structure](#-repository-structure)
6. [Data Sources & Access](#-data-sources--access)
7. [Installation & Setup](#-installation--setup)
   - [Python Environment](#python-environment)
   - [R Environment](#r-environment)
   - [HYSPLIT Configuration](#hysplit-configuration)
8. [Execution & Reproducibility](#-execution--reproducibility)
9. [Key Results & Findings](#-key-results--findings)
   - [Map 1: Spruce Budworm Adult Emergence in Northern Maine](#map-1-spruce-budworm-adult-emergence-in-northern-maine-june-2024)
   - [Map 2: HYSPLIT Atmospheric Trajectories (July 1, 2024)](#map-2-atmospheric-trajectories-from-southern-quebec-to-maine-july-1-2024)
   - [Map 3: Bay-breasted Warbler Breeding Area & Atlantic Flyway](#map-3-bay-breasted-warbler-breeding-area--atlantic-flyway-overlap)
10. [Ecological Discussion & Predation Release Hypothesis](#-ecological-discussion--predation-release-hypothesis)
11. [Future Work & Research Directions](#-future-work--research-directions)
12. [References & Data Citations](#-references--data-citations)
13. [Acknowledgements](#-acknowledgements)
14. [License](#-license)

---

## 🔬 Executive Summary & Research Question

### Primary Research Question
> **Does the atmospheric corridor that transports spruce budworm moths (*Choristoneura fumiferana*) from Quebec into Maine spatially align with Bay-breasted Warbler (*Setophaga castanea*) breeding habitat along the Atlantic Flyway?**

### Core Findings
- **Biological Flight Readiness**: Using degree-day phenology modeling across 13 northern Maine NOAA GHCN weather stations, adult spruce budworm emergence was estimated between **June 3 and June 25, 2024** (median: **June 8, 2024**). Moths were biologically capable of flight weeks before synoptic transport events occurred.
- **Synoptic Dispersal Window**: Nightly ERA5 atmospheric wind screening identified **July 1, 2024** as the primary synoptic event offering strong northward-origin winds driving southward dispersal from southern Quebec directly into northern Maine.
- **Predator–Prey Spatial Decoupling**: HYSPLIT forward trajectories (500 m AGL, 12-hour overnight transport) confirmed atmospheric transport from southern Quebec across the international boundary into northern Maine. Overlaid eBird Status & Trends breeding-season abundance (3 km resolution) demonstrated that while the flight paths overlap warbler habitat broadly, the **highest density of Bay-breasted Warblers is concentrated in southern Quebec (the dispersal source)**, with drastically lower warbler densities in northern Maine (the dispersal sink).
- **Ecological Implication**: Dispersing budworm moths experience strong predator release as they enter northern Maine, where low predator densities create a spatial refuge conducive to pest proliferation and defoliation.

---

## 🌲 Ecological & Atmospheric Background

### 1. Eastern Spruce Budworm (*Choristoneura fumiferana*)
The eastern spruce budworm is one of the most destructive native forest insects in North American boreal and temperate conifer forests (primarily attacking Balsam Fir *Abies balsamea* and White/Red/Black Spruce *Picea* spp.). Periodic outbreaks occur on 30- to 40-year cycles, causing landscape-level mortality, timber loss, and altered fire regimes. Outbreaks expand not only through local reproduction but through **mass synoptic atmospheric dispersal events**, where hundreds of millions of moths take flight at dusk, get lifted into the planetary boundary layer, and are carried hundreds of kilometers downwind.

### 2. Bay-breasted Warbler (*Setophaga castanea*) as a Specialist Predator
The Bay-breasted Warbler is a Neotropical migratory songbird that travels thousands of miles along the **Atlantic Flyway**—a 3,000-mile corridor stretching from Arctic Canada and Greenland to South America and the Caribbean. 
- During the breeding season, Bay-breasted Warblers are renowned **spruce budworm specialists** (often termed "budworm warblers" alongside Tennessee and Cape May warblers).
- Their clutch sizes, foraging behaviors, and local nesting densities respond numerically and functionally to spruce budworm larval and adult densities, making them a crucial top-down biological control agent.

---

## 🛠️ Methodology & Analytical Pipeline

### 1. Atmospheric Wind Reanalysis (ERA5)
- **Data Source**: ECMWF Copernicus Climate Data Store (ERA5 Hourly Reanalysis).
- **Variables**: $u$ (zonal) and $v$ (meridional) wind components, geopotential height, and boundary layer temperature across 1000, 925, and 850 hPa isobaric levels.
- **Screening Algorithm**: Evaluated every evening in July 2024 (18:00 to 06:00 EDT) using a custom Python pipeline (\`01_era5_wind_analysis.py\`).
- **Target Criterion**: Consistent northerly/northwesterly winds ($v < -5\\text{ m/s}$ at 500–1000 m AGL) connecting southern Quebec source regions with Maine timberlands.
- **Selected Date**: **July 1, 2024** exhibited the strongest nocturnal low-level jet configuration.

### 2. Thermal Phenology & Adult Emergence (GHCN-Daily)
- **Data Source**: NOAA Global Historical Climatology Network Daily (GHCN-Daily) stations across 13 northern Maine meteorological sites.
- **Model**: Modified Allen (1976) / Régnière et al. (2012) thermal degree-day formulation:
  $$\\text{GDD} = \\sum_{t=t_0}^{T} \\max\\left( \\frac{T_{\\max, t} + T_{\\min, t}}{2} - T_{\\text{base}}, 0 \\right)$$
  *(where $T_{\\text{base}} = 8.0^\\circ\\text{C}$ with start date January 1 / biofix April 1).*
- **Outputs**: Station emergence windows ranged from **June 3 to June 25, 2024**, with median emergence across northern Maine on **June 8, 2024**.

### 3. Forward Trajectory Dispersion Modeling (NOAA HYSPLIT)
- **Tool**: NOAA Hybrid Single-Particle Lagrangian Integrated Trajectory (HYSPLIT) Model (v5.3).
- **Meteorological Data**: NCEP Global Data Assimilation System (GDAS) 0.5°/1.0° archives.
- **Simulation Setup**:
  - **Start Time**: 2024-07-01 21:00 EDT (01:00 UTC July 2) — matching peak dusk moth takeoff behavior.
  - **Duration**: 12-hour forward simulation (overnight flight period).
  - **Initialization Heights**: 500 m Above Ground Level (AGL), reflecting typical nocturnal radar-observed insect transport layers.
  - **Source Coordinates**: 3 key spruce budworm infestation hotspots in southern Quebec along the St. Lawrence / Chaudière-Appalaches corridor.

### 4. Avian Predator Distribution & Spatial Overlays (eBird & ArcGIS Pro)
- **Data Source**: Cornell Lab of Ornithology eBird Status & Trends (Data Version 2023; Released 2024/2025).
- **Metric**: Relative Breeding Abundance (3 km spatial grid resolution) during peak nesting season (June–July).
- **GIS Integration**: Layers projected into NAD83 / UTM Zone 19N (EPSG:26919) in ArcGIS Pro.

---

## 💻 Installation & Setup

\`\`\`bash
# 1. Clone repository
git clone https://github.com/christopherfranqui/spruce-budworm-warbler-dispersal.git
cd spruce-budworm-warbler-dispersal

# 2. Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# 3. Install dependencies
pip install -r requirements.txt
\`\`\`

---

## ⚡ Execution & Reproducibility

\`\`\`bash
# Step 1: Download & screen ERA5 wind fields for July 2024
python scripts/01_era5_wind_analysis.py --month 2024-07 --region quebec-maine

# Step 2: Calculate Spruce Budworm adult emergence dates across 13 stations
Rscript scripts/02_phenology_emergence.R --stations configs/stations_ghcn_maine.json

# Step 3: Execute NOAA HYSPLIT 12-hour forward atmospheric trajectories for July 1
python scripts/03_hysplit_trajectory.py --date 2024-07-01 --hour 21 --height 500

# Step 4: Extract eBird Bay-breasted Warbler 3km relative abundance grid
Rscript scripts/04_ebird_raster_processing.R --species baywar --season breeding

# Step 5: Compute spatial overlay, intersection metrics, and summary figures
python scripts/05_spatial_overlay_analysis.py
\`\`\`

---

## 📊 Key Results & Findings

| Metric / Parameter | Value / Finding | Ecological Context |
| :--- | :--- | :--- |
| **Northern Maine Emergence Range** | **June 3 to June 25, 2024** | 13 GHCN Weather Stations in Aroostook, Piscataquis & Somerset counties |
| **Median Maine Emergence Date** | **June 8, 2024** | Adult moths eclosed and prepared for flight in early to mid-June |
| **Optimal Dispersal Date** | **July 1, 2024 (21:00 EDT)** | First sustained nocturnal synoptic event with strong NW-to-SE boundary layer wind |
| **Overnight Transport Distance** | **180 – 260 km in 12 hours** | Carried moths from Chaudière/Eastern Townships across Maine border |
| **HYSPLIT Ingress Elevation** | **500 m AGL** (descending to 150–300 m) | Nocturnal low-level jet trajectory directly entering Maine spruce-fir zones |
| **eBird Warbler Density Maximum** | **Southern Quebec (Boreal Transition)** | Highest relative abundance (>0.65 birds/km²) located in source region |
| **Northern Maine Warbler Density** | **Low to Moderate (<0.18 birds/km²)** | Significantly lower predator abundance in recipient forest stands |

---

## 📚 References & Data Sources

1. **Hersbach, H., et al. (2020)**. *The ERA5 global reanalysis*. Quarterly Journal of the Royal Meteorological Society, 146(730), 1999–2049. DOI: [10.1002/qj.3803](https://doi.org/10.1002/qj.3803).
2. **Menne, M. J., et al. (2012)**. *An overview of the Global Historical Climatology Network-Daily database*. Journal of Atmospheric and Oceanic Technology, 29(7), 897–910. DOI: [10.1175/JTECH-D-11-00103.1](https://doi.org/10.1175/JTECH-D-11-00103.1).
3. **Stein, A. F., et al. (2015)**. *NOAA’s HYSPLIT atmospheric transport and dispersion modeling system*. Bulletin of the American Meteorological Society, 96(12), 2059–2077. DOI: [10.1175/BAMS-D-14-00110.1](https://doi.org/10.1175/BAMS-D-14-00110.1).
4. **Fink, D., et al. (2024)**. *eBird Status and Trends, Data Version: 2023; Released: 2025*. Cornell Lab of Ornithology, Ithaca, New York. DOI: [10.2173/WZTW8903](https://doi.org/10.2173/WZTW8903).
5. **Garcia, M., Sturtevant, B. R., et al. (2022)**. *Modeling weather-driven long-distance dispersal of spruce budworm moths (Choristoneura fumiferana)*. Agricultural and Forest Meteorology, 315, 108815. DOI: [10.1016/j.agrformet.2021.108815](https://doi.org/10.1016/j.agrformet.2021.108815).
6. **R Core Team (2025)**. *R: A Language and Environment for Statistical Computing* (v4.6.0). R Foundation for Statistical Computing, Vienna, Austria.
7. **Esri (2024)**. *ArcGIS Pro*. Environmental Systems Research Institute, Redlands, CA.

### BibTeX Citation
\`\`\`bibtex
@misc{franqui2026sprucebudworm,
  author       = {Christopher Franqui},
  title        = {Modeling Spruce Budworm Dispersal from Quebec into Maine along with its Spatial Relationship to Bay-breasted Warbler Breeding Habitat},
  howpublished = {Maine Internship Research Program, Monroe Community College & University of Maine},
  year         = {2026},
  month        = {Spring},
  note         = {Supported by NSF and University of Maine}
}
\`\`\`
`;

export const MAINE_WEATHER_STATIONS: WeatherStation[] = [
  {
    id: 'USW00014607',
    name: 'Caribou Municipal Airport',
    county: 'Aroostook',
    lat: 46.8705,
    lon: -68.0178,
    elevationMeters: 190,
    emergenceDate: 'June 8, 2024',
    gddAccumulated: 382,
    gddThreshold: 380,
    daysToEmergence: 159,
  },
  {
    id: 'USC00173046',
    name: 'Fort Kent',
    county: 'Aroostook',
    lat: 47.2589,
    lon: -68.5889,
    elevationMeters: 186,
    emergenceDate: 'June 12, 2024',
    gddAccumulated: 385,
    gddThreshold: 380,
    daysToEmergence: 163,
  },
  {
    id: 'USW00094645',
    name: 'Frenchville Airport',
    county: 'Aroostook',
    lat: 47.2856,
    lon: -68.3128,
    elevationMeters: 298,
    emergenceDate: 'June 14, 2024',
    gddAccumulated: 381,
    gddThreshold: 380,
    daysToEmergence: 165,
  },
  {
    id: 'USC00174173',
    name: 'Houlton 5N',
    county: 'Aroostook',
    lat: 46.2081,
    lon: -67.8286,
    elevationMeters: 152,
    emergenceDate: 'June 5, 2024',
    gddAccumulated: 390,
    gddThreshold: 380,
    daysToEmergence: 156,
  },
  {
    id: 'USC00176937',
    name: 'Presque Isle',
    county: 'Aroostook',
    lat: 46.6539,
    lon: -68.0053,
    elevationMeters: 183,
    emergenceDate: 'June 7, 2024',
    gddAccumulated: 384,
    gddThreshold: 380,
    daysToEmergence: 158,
  },
  {
    id: 'USC00178761',
    name: 'Van Buren 2',
    county: 'Aroostook',
    lat: 47.1611,
    lon: -67.9353,
    elevationMeters: 140,
    emergenceDate: 'June 10, 2024',
    gddAccumulated: 383,
    gddThreshold: 380,
    daysToEmergence: 161,
  },
  {
    id: 'USC00171628',
    name: 'Clayton Lake',
    county: 'Aroostook',
    lat: 46.6192,
    lon: -69.5297,
    elevationMeters: 310,
    emergenceDate: 'June 19, 2024',
    gddAccumulated: 380,
    gddThreshold: 380,
    daysToEmergence: 170,
  },
  {
    id: 'USC00170273',
    name: 'Allagash',
    county: 'Aroostook',
    lat: 47.0722,
    lon: -69.0494,
    elevationMeters: 200,
    emergenceDate: 'June 16, 2024',
    gddAccumulated: 382,
    gddThreshold: 380,
    daysToEmergence: 167,
  },
  {
    id: 'USC00175388',
    name: 'Millinocket',
    county: 'Penobscot',
    lat: 45.6558,
    lon: -68.6942,
    elevationMeters: 125,
    emergenceDate: 'June 3, 2024',
    gddAccumulated: 395,
    gddThreshold: 380,
    daysToEmergence: 154,
  },
  {
    id: 'USC00173668',
    name: 'Greenville (Moosehead Lake)',
    county: 'Piscataquis',
    lat: 45.4611,
    lon: -69.5939,
    elevationMeters: 320,
    emergenceDate: 'June 11, 2024',
    gddAccumulated: 381,
    gddThreshold: 380,
    daysToEmergence: 162,
  },
  {
    id: 'USC00174092',
    name: 'Jackman',
    county: 'Somerset',
    lat: 45.6264,
    lon: -70.2589,
    elevationMeters: 360,
    emergenceDate: 'June 21, 2024',
    gddAccumulated: 380,
    gddThreshold: 380,
    daysToEmergence: 172,
  },
  {
    id: 'USC00177241',
    name: 'Ripogenus Dam',
    county: 'Piscataquis',
    lat: 45.8825,
    lon: -69.1794,
    elevationMeters: 305,
    emergenceDate: 'June 18, 2024',
    gddAccumulated: 382,
    gddThreshold: 380,
    daysToEmergence: 169,
  },
  {
    id: 'USC00172426',
    name: 'Eustis 2NW (Boundary Mtns)',
    county: 'Franklin',
    lat: 45.2447,
    lon: -70.5081,
    elevationMeters: 450,
    emergenceDate: 'June 25, 2024',
    gddAccumulated: 380,
    gddThreshold: 380,
    daysToEmergence: 176,
  },
];

export const HYSPLIT_TRAJECTORIES: TrajectorySource[] = [
  {
    id: 'source-1',
    name: 'Southern Quebec - Chaudière Basin (West)',
    originLat: 46.12,
    originLon: -70.85,
    points: [
      { hour: 0, lat: 46.12, lon: -70.85, altMeters: 500, windSpeedKmh: 18 },
      { hour: 2, lat: 45.98, lon: -70.52, altMeters: 480, windSpeedKmh: 22 },
      { hour: 4, lat: 45.81, lon: -70.15, altMeters: 450, windSpeedKmh: 24 },
      { hour: 6, lat: 45.62, lon: -69.72, altMeters: 420, windSpeedKmh: 26 }, // Enters Somerset/Piscataquis ME
      { hour: 8, lat: 45.41, lon: -69.25, altMeters: 380, windSpeedKmh: 23 },
      { hour: 10, lat: 45.20, lon: -68.78, altMeters: 310, windSpeedKmh: 19 },
      { hour: 12, lat: 45.02, lon: -68.35, altMeters: 220, windSpeedKmh: 14 },
    ],
  },
  {
    id: 'source-2',
    name: 'Southern Quebec - St. Georges/Beauce (Central)',
    originLat: 46.28,
    originLon: -70.55,
    points: [
      { hour: 0, lat: 46.28, lon: -70.55, altMeters: 500, windSpeedKmh: 20 },
      { hour: 2, lat: 46.15, lon: -70.18, altMeters: 490, windSpeedKmh: 25 },
      { hour: 4, lat: 45.98, lon: -69.75, altMeters: 460, windSpeedKmh: 27 },
      { hour: 6, lat: 45.80, lon: -69.30, altMeters: 430, windSpeedKmh: 28 }, // Over Allagash/Clayton Lake ME
      { hour: 8, lat: 45.58, lon: -68.80, altMeters: 390, windSpeedKmh: 25 },
      { hour: 10, lat: 45.38, lon: -68.32, altMeters: 330, windSpeedKmh: 21 },
      { hour: 12, lat: 45.18, lon: -67.92, altMeters: 240, windSpeedKmh: 16 },
    ],
  },
  {
    id: 'source-3',
    name: 'Southern Quebec - Montmagny/Bas-Saint-Laurent (East)',
    originLat: 46.65,
    originLon: -70.05,
    points: [
      { hour: 0, lat: 46.65, lon: -70.05, altMeters: 500, windSpeedKmh: 21 },
      { hour: 2, lat: 46.48, lon: -69.62, altMeters: 510, windSpeedKmh: 26 },
      { hour: 4, lat: 46.28, lon: -69.15, altMeters: 475, windSpeedKmh: 29 },
      { hour: 6, lat: 46.05, lon: -68.65, altMeters: 440, windSpeedKmh: 29 }, // Crosses Aroostook County ME
      { hour: 8, lat: 45.82, lon: -68.12, altMeters: 400, windSpeedKmh: 26 },
      { hour: 10, lat: 45.60, lon: -67.65, altMeters: 320, windSpeedKmh: 22 },
      { hour: 12, lat: 45.39, lon: -67.20, altMeters: 250, windSpeedKmh: 17 },
    ],
  },
];

export const WARBLER_DENSITY_ZONES: WarblerDensityRegion[] = [
  {
    name: 'Southern Quebec & St. Lawrence Lowlands (Dispersal Origin)',
    type: 'source',
    relativeAbundance: 0.74,
    predationPressure: 'High',
    notes: 'Dense breeding populations of Bay-breasted Warblers; high caterpillar and moth consumption rates.',
  },
  {
    name: 'Quebec-Maine Border Ridge (Transitional Corridor)',
    type: 'corridor',
    relativeAbundance: 0.42,
    predationPressure: 'Moderate',
    notes: 'Moderate warbler nesting activity; elevated topography with mixed hardwood/softwood stands.',
  },
  {
    name: 'Northern Maine Interior & North Maine Woods (Dispersal Sink)',
    type: 'sink',
    relativeAbundance: 0.14,
    predationPressure: 'Low',
    notes: 'Sparse warbler abundance; moths arriving via HYSPLIT nocturnal plumes experience spatial predation release.',
  },
  {
    name: 'Central & Coastal Maine (Southern Perimeter)',
    type: 'sink',
    relativeAbundance: 0.05,
    predationPressure: 'Very Low',
    notes: 'Minimal Bay-breasted Warbler breeding presence; mostly non-breeding migrants passing in May.',
  },
];
