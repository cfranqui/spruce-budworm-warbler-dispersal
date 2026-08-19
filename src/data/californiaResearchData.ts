import { DecadalMeanCenter, CaliforniaCountyData, ProjectMeta } from '../types';

export const PROJECTS_META: Record<string, ProjectMeta> = {
  'california-migration': {
    id: 'california-migration',
    title: 'Where did Californians move? Tracking shifting population center and home values from 1970-2020',
    shortTitle: 'California Migration & Home Values (1970–2020)',
    repoName: 'california-population-home-values-1970-2020',
    course: 'GEG 230: Spatial Analysis and GIS (Spring 2026)',
    author: 'Christopher Franqui',
    institution: 'Monroe Community College (MCC)',
    term: 'Spring 2026',
    badgeTag: 'GIS & Demographics',
    description: 'ArcGIS Pro spatial analysis tracking California decadal population mean centers (1970–2020), coastal-to-inland demographic shifts, and CPI inflation-adjusted median home value dynamics using IPUMS NHGIS and TIGER/Line boundaries.',
    toolTabLabel: 'Affordability & Shift Calculator',
  },
  'spruce-budworm': {
    id: 'spruce-budworm',
    title: 'Modeling Spruce Budworm Dispersal from Quebec into Maine along with its Spatial Relationship to Bay-breasted Warbler Breeding Habitat',
    shortTitle: 'Spruce Budworm Dispersal & Warbler Habitat',
    repoName: 'spruce-budworm-warbler-dispersal',
    course: 'Maine Internship Program (Spring 2026)',
    author: 'Christopher Franqui',
    institution: 'Monroe Community College & University of Maine',
    term: 'Spring 2026',
    badgeTag: 'Atmospheric GIS & Ecology',
    description: 'Integration of ERA5 wind reanalysis, GHCN-Daily phenological degree-day modeling, NOAA HYSPLIT nocturnal dispersal trajectories, and eBird breeding density surfaces.',
    toolTabLabel: 'Degree-Day Phenology',
  },
};

export const RAW_CALIFORNIA_README_MARKDOWN = `# Where did Californians move? Tracking Shifting Population Centers and Home Values from 1970–2020

[![ArcGIS Pro](https://img.shields.io/badge/Esri_ArcGIS_Pro-3.x-blue.svg)](https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview)
[![Data-IPUMS_NHGIS](https://img.shields.io/badge/Data-IPUMS_NHGIS-green.svg)](https://www.nhgis.org)
[![Projection-EPSG:3310](https://img.shields.io/badge/Projection-EPSG%3A3310_CA_Albers-orange.svg)](https://epsg.io/3310)
[![Inflation-BLS_CPI_Adjusted](https://img.shields.io/badge/Inflation_Adjusted-2020_USD_(BLS_CPI)-yellow.svg)](https://www.bls.gov/cpi/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Author-Christopher_Franqui](https://img.shields.io/badge/Author-Christopher_Franqui-purple.svg)](https://github.com/christopherfranqui)

> **Course**: GEG 230: Spatial Analysis and GIS (Spring 2026)  
> **Author**: Christopher Franqui  
> **Institution**: Monroe Community College (MCC)  
> **Keywords**: Spatial Demography, Population Mean Center, ArcGIS Pro, IPUMS NHGIS, TIGER/Line, Housing Affordability, Internal Migration, California Albers (EPSG:3310)

---

## 📌 Table of Contents
- [Executive Summary](#-executive-summary)
- [Research Question](#-research-question)
- [Background & Historical Context](#-background--historical-context)
- [Data Sources & Geospatial Architecture](#-data-sources--geospatial-architecture)
- [Methodology & Analytical Pipeline](#-methodology--analytical-pipeline)
  - [1. Data Extraction & Attribute Joins](#1-data-extraction--attribute-joins)
  - [2. Inflation Normalization (Field Calculator)](#2-inflation-normalization-field-calculator)
  - [3. Spatial Statistics: Mean Center & Trajectory Analysis](#3-spatial-statistics-mean-center--trajectory-analysis)
  - [4. Sensitivity Testing (Excluding LA & Bay Area)](#4-sensitivity-testing-excluding-la--bay-area)
- [Repository Structure](#-repository-structure)
- [Key Results & Maps](#-key-results--maps)
  - [Map 1: Six-Decade Population Mean Center Shift](#map-1-six-decade-population-mean-center-shift)
  - [Map 2: Mean Center Shift Without Los Angeles County](#map-2-mean-center-shift-without-los-angeles-county)
  - [Map 3: Mean Center Shift Without LA & Bay Area](#map-3-mean-center-shift-without-la--bay-area)
  - [Map 4: County-Level Population Growth Rates (1970–2020)](#map-4-county-level-population-growth-rates-19702020)
  - [Map 5 & 6: 1990 vs. 2020 Inflation-Adjusted Home Values](#map-5--6-1990-vs-2020-inflation-adjusted-home-values)
- [Ecological & Economic Discussion](#-ecological--economic-discussion)
- [Installation & Reproducibility](#-installation--reproducibility)
- [References & Data Citations](#-references--data-citations)
- [Acknowledgements](#-acknowledgements)

---

## 🚀 Executive Summary

For over two centuries, the American West has captured the imagination of settlers, adventurers, and scientists, drawing generations across the mighty Mississippi River to build towns, farms, and cities that fundamentally reshaped how cartographers and geographers understood the United States. That westward pull hasn't ended. California, the destination of this westward expansion, has seen similar changes reflected in its own internal migration.

This spatial analysis investigates the **geographic realignment of California's population across six decennial censuses (1970–2020)** in relation to **county-level median home values adjusted for inflation**. Using Esri ArcGIS Pro and IPUMS NHGIS microdata projected into **California Albers (EPSG:3310)**, this study tracks the decadal movement of California's population-weighted mean center and isolates the demographic pull of mega-urban coastal hubs versus the rapid growth of inland California and the Central Valley.

---

## ❓ Research Question

> **"How has California’s population distribution changed between 1970 and 2020, and how have changes in home affordability influenced these shifts?"**

### Core Hypotheses Tested:
1. **The Inland Demographic Shift**: Escalating housing costs in coastal hubs (San Francisco Bay Area and Los Angeles County) have driven domestic out-migration toward inland counties (Inland Empire, Central Valley, and Sierra foothills).
2. **Directional Centroid Drift**: The statewide population-weighted mean center has migrated steadily southeastward toward the Inland Empire (Riverside and San Bernardino counties).
3. **Coastal Megacity Anchoring**: Los Angeles County and the 9 Bay Area counties exert massive spatial inertia on the statewide mean center; excluding them reveals an even stronger baseline inland migration vector.

---

## 🗺️ Data Sources & Geospatial Architecture

All census tabular data and cartographic boundary vector shapefiles were sourced via IPUMS NHGIS (National Historical Geographic Information System) and joined in ArcGIS Pro.

| Dataset Name | Source / Provider | Temporal Range | Table Identifier / Format | Spatial Resolution |
| :--- | :--- | :--- | :--- | :--- |
| **Decennial Population Counts** | U.S. Census Bureau / IPUMS NHGIS | 1970, 1980, 1990, 2000, 2010, 2020 | Decennial Summary Files | County Level (58 Counties) |
| **1990 Median Home Values** | 1990 Decennial Census (STF3) | 1990 | Table \`NH61A\` (Specified Owner-Occupied) | County Level |
| **2020 Median Home Values** | 2016–2020 5-Year ACS | 2020 | Table \`B25077\` (Median Value in Dollars) | County Level |
| **County Cartographic Boundaries** | U.S. Census Bureau TIGER/Line | 2020 | \`cb_2020_ca_county_500k\` (Shapefile) | 1:500,000 Scale |
| **Consumer Price Index (CPI-U)** | U.S. Bureau of Labor Statistics | 1990 vs. 2020 | CPI All Urban Consumers (Series CUUR0000SA0) | National Annual Average |

### Projected Coordinate System
- **Coordinate Reference System**: California Albers Equal Area Conic
- **EPSG Code**: \`EPSG:3310\`
- **Central Meridian**: -120.0°
- **Standard Parallels**: 34.0° N, 40.5° N
- **Latitude of Origin**: 0.0°
- **Linear Unit**: Meter (\`m\`)

---

## ⚙️ Methodology & Analytical Pipeline

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│ 1. IPUMS NHGIS Tabular Extraction (1970-2020 Pop & Values) │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Attribute Join to 2020 TIGER/Line Counties (ArcGIS Pro) │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Field Calculator: BLS CPI Inflation Adjustment to 2020$ │
│    [HomeVal1990_Adj = HomeVal1990 * (CPI_2020 / CPI_1990)]  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Spatial Statistics Tool: Mean Center (Decades 1970-2020) │
│    - Scenario A: All 58 California Counties                 │
│    - Scenario B: Remitting Los Angeles County               │
│    - Scenario C: Remitting Los Angeles + 9 Bay Area Counties│
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Point to Line Tool: Connect 6 Decadal Centroid Nodes    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. Comparative Cartography & Choropleth Classification      │
│    - Standardized 4-Class Home Value Scale for 1990 & 2020  │
│    - Decadal Percentage Growth Choropleth                   │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### 1. Data Extraction & Attribute Joins
County population data for each decade from 1970 to 2020 and median home value attributes were tabularly joined to the 2020 California County Cartographic Boundary shapefile using unique 5-digit State/County FIPS codes (\`GEOID\`).

### 2. Inflation Normalization (Field Calculator)
To compare 1990 and 2020 median home values accurately on the same real purchasing-power scale, 1990 values were inflation-adjusted to constant 2020 dollars using the Bureau of Labor Statistics Consumer Price Index (CPI-U):

$$\\text{HomeValue}_{1990\\_\\text{Adjusted}} = \\text{HomeValue}_{1990} \\times \\left( \\frac{\\text{CPI}_{2020}}{\\text{CPI}_{1990}} \\right) = \\text{HomeValue}_{1990} \\times 1.9904$$

The identical 4-class graduated color ramp was applied to both the 1990 (adjusted) and 2020 maps:
- **Class 1**: $< \\$200{,}000$
- **Class 2**: $\\$200{,}000 - \\$400{,}000$
- **Class 3**: $\\$400{,}000 - \\$700{,}000$
- **Class 4**: $\\$700{,}000 - \\$1{,}000{,}000+$

### 3. Spatial Statistics: Mean Center & Trajectory Analysis
The **Mean Center** tool in ArcGIS Pro measures the geographic center of a set of features, weighted by attribute values (in this case, decennial population):

$$\\bar{X} = \\frac{\\sum_{i=1}^{n} w_i x_i}{\\sum_{i=1}^{n} w_i}, \\quad \\bar{Y} = \\frac{\\sum_{i=1}^{n} w_i y_i}{\\sum_{i=1}^{n} w_i}$$

Where:
- $x_i, y_i$ are the projected centroid coordinates of county $i$ in EPSG:3310.
- $w_i$ is the total population of county $i$ in year $t$.

The **Point to Line** tool connected the sequential centroid points for 1970, 1980, 1990, 2000, 2010, and 2020 to map the velocity and trajectory of population shift.

### 4. Sensitivity Testing (Excluding LA & Bay Area)
To isolate the influence of mega-urban populations from regional migration trends, the Mean Center tool was executed under three controlled scenarios:
1. **Scenario 1 (Full Baseline)**: All 58 California counties.
2. **Scenario 2 (Without Los Angeles County)**: LA County (population ~10 million) omitted.
3. **Scenario 3 (Without LA and the 9-County Bay Area)**: Omits LA, Alameda, Contra Costa, Marin, Napa, San Francisco, San Mateo, Santa Clara, Solano, and Sonoma counties.

---

## 📁 Repository Structure

\`\`\`
california-population-home-values-1970-2020/
├── README.md                          # Comprehensive project documentation
├── LICENSE                            # Open-source MIT License
├── requirements.txt                   # Python geospatial dependencies
├── scripts/
│   ├── 01_download_nhgis_data.py      # IPUMS API data extraction script
│   ├── 02_adjust_cpi_inflation.py     # BLS CPI inflation normalizer
│   ├── 03_calculate_mean_centers.py   # Python/GeoPandas mean center calculator
│   └── 04_generate_choropleths.py     # County growth & home value maps
├── data/
│   ├── raw/                           # Raw NHGIS CSVs and TIGER/Line shapefiles
│   ├── processed/                     # Cleaned attribute tables & shapefiles
│   └── outputs/
│       ├── mean_centers_all.geojson   # 6-decade baseline centroid path
│       ├── mean_centers_no_la.geojson # Centroid path excluding LA County
│       └── mean_centers_no_la_bay.geojson # Centroid path excluding LA & Bay Area
└── maps/
    ├── map1_mean_center_1970_2020.png # All counties mean center shift
    ├── map2_mean_center_no_la.png     # Shift without LA County
    ├── map3_mean_center_no_la_bay.png # Shift without LA & Bay Area
    ├── map4_population_change_pct.png # 50-year percent change by county
    ├── map5_median_home_val_1990.png  # 1990 home values in 2020 dollars
    └── map6_median_home_val_2020.png  # 2020 median home values
\`\`\`

---

## 📊 Key Results & Findings

### 1. Directional Centroid Movement
- In the 50 years between 1970 and 2020, California's statewide population-weighted mean center **consistently migrated southeastward**.
- The centroid's movement reflects disproportionate demographic growth in Southern California and the Inland Empire relative to the northern half of the state.

### 2. Impact of Los Angeles County & The Bay Area
- When **Los Angeles County is omitted**, the mean center shifts approximately **one county northward** (into the Fresno/Madera axis).
- Despite shifting north when LA is removed, the decadal trajectory **continues to move steadily south**, demonstrating that southern population momentum was not solely an artifact of Los Angeles County.
- When **both LA County and the 9 Bay Area counties are omitted**, the resulting centroid path closely mirrors the without-LA scenario, confirming the massive countervailing northern pull previously exerted by the Bay Area.

### 3. County Growth Divergence: Coast vs. Inland
- **Fastest Growing Counties**: **Riverside (+467%)** and **San Bernardino (+223%)** counties in the Inland Empire, alongside Central Valley and Sierra foothill counties (**Calaveras, Madera, Mono, Placer**).
- **Slowest Growing Counties**: Coastal core urban counties, notably **Los Angeles** and **San Francisco**, experienced significantly slower percentage population growth as development reached saturation and prices escalated.

### 4. Housing Affordability & Spatial Displacement
- **Bay Area Median Values**: Soared past **$\\$1{,}000{,}000+$** in 2020, even when adjusting 1990 historical prices for inflation.
- **Central Valley & Inland Affordability**: Home values in the Central Valley and inland California remained substantially lower (predominantly in the $< \\$400{,}000$ bracket), maintaining a significant affordability buffer that pulled millions of residents inland.

---

## 💬 Ecological & Economic Discussion

California’s shifts in population and home value reflect broader national patterns of urban decentralization, suburbanization, and cost-of-living displacement:

1. **The Affordability Push Factor**: When the price of a home grew rapidly in coastal metropolitan regions, local population growth slowed. Where home prices remained relatively affordable, population growth accelerated dramatically.
2. **Long-Term Economic Divergence**: As long as the economic and housing cost gap between coastal wealth centers and inland areas persists, California will continue to see a structural shift in its population toward inland regions like Calaveras, Madera, Mono, San Joaquin, and the Inland Empire.
3. **Future Analytical Steps**: Further research comparing regional birth rates, domestic net out-migration, and international immigration into Southern California versus Northern California will complement these mean center findings.

---

## 💻 Installation & Reproducibility

### Python Virtual Environment Setup
\`\`\`bash
# 1. Clone repository
git clone https://github.com/christopherfranqui/california-population-home-values-1970-2020.git
cd california-population-home-values-1970-2020

# 2. Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# 3. Install geospatial packages
pip install -r requirements.txt
\`\`\`

### Computing Mean Centers via Python / GeoPandas
\`\`\`python
import geopandas as gpd
import pandas as pd
import numpy as np

# Load 2020 county boundaries projected in CA Albers (EPSG:3310)
counties = gpd.read_file('data/processed/ca_counties_3310.shp')

decades = [1970, 1980, 1990, 2000, 2010, 2020]
mean_centers = []

for yr in decades:
    pop_col = f'POP_{yr}'
    weighted_x = np.sum(counties.geometry.centroid.x * counties[pop_col]) / np.sum(counties[pop_col])
    weighted_y = np.sum(counties.geometry.centroid.y * counties[pop_col]) / np.sum(counties[pop_col])
    mean_centers.append({'year': yr, 'x': weighted_x, 'y': weighted_y})

df_centers = pd.DataFrame(mean_centers)
print(df_centers)
\`\`\`

---

## 📖 References & Data Citations

### Primary Data Sources
- **IPUMS NHGIS**: Manson, S., Schroeder, J., Van Riper, D., Kugler, T., & Ruggles, S. (2025). *National Historical Geographic Information System: Version 20.0* [Dataset]. Minneapolis, MN: IPUMS. [https://doi.org/10.18128/D050.V20.0](https://doi.org/10.18128/D050.V20.0)
- **U.S. Census Bureau**: *1970–2020 Decennial Census Summary Files and 2016–2020 American Community Survey (ACS) 5-Year Estimates (Table B25077)*.
- **TIGER/Line Shapefiles**: *2020 Cartographic Boundary Files: Counties (California)*. U.S. Census Bureau, Geography Division.
- **Inflation Metrics**: *Consumer Price Index for All Urban Consumers (CPI-U)*. U.S. Bureau of Labor Statistics (1990–2020).
- **GIS Software**: Esri ArcGIS Pro 3.x Spatial Statistics Toolbox.

### Academic Citation (BibTeX)
\`\`\`bibtex
@misc{franqui2026californiamigration,
  author       = {Christopher Franqui},
  title        = {Where did Californians move? Tracking shifting population center and home values from 1970-2020},
  howpublished = {GEG 230: Spatial Analysis and GIS Research Presentation, Monroe Community College},
  year         = {2026},
  month        = {Spring},
  note         = {Supervised by Professor Pierce, Monroe Community College}
}
\`\`\`

---

## 🙏 Acknowledgements

- **Stefany Franqui**: Sincere thanks for everything contributed to this project, from listening in the middle of the night to discuss map color ramps to hearing about California home values.
- **Professor Pierce**: Special gratitude for challenging me to always think outside the box and for being an outstanding, inspiring instructor throughout GEG 230 Spatial Analysis and GIS.
- **Parents (Ana and David)**: Deep appreciation for endless encouragement, classes, and unconditional support.
- **Hoda Mitwally & William T. Flynn**: Queens Legal Services NYC/Queens for their remarkable and inspiring dedication.
- **Assemblywoman Stacey Pheffer Amato & Staff**: For their continued community advocacy.

*Disclaimer: Opinions, findings, and conclusions expressed are those of the author and do not necessarily reflect the official views of Professor Pierce or Monroe Community College.*
`;

export const CALIFORNIA_MEAN_CENTERS: DecadalMeanCenter[] = [
  {
    year: 1970,
    allCounties: { lat: 36.32, lon: -119.65, countyName: 'Kings / Fresno Border' },
    withoutLA: { lat: 37.12, lon: -119.98, countyName: 'Madera County' },
    withoutLAandBay: { lat: 36.95, lon: -119.82, countyName: 'Fresno County' },
  },
  {
    year: 1980,
    allCounties: { lat: 36.18, lon: -119.52, countyName: 'Tulare County (North)' },
    withoutLA: { lat: 36.98, lon: -119.85, countyName: 'Fresno / Madera' },
    withoutLAandBay: { lat: 36.81, lon: -119.70, countyName: 'Fresno County' },
  },
  {
    year: 1990,
    allCounties: { lat: 36.02, lon: -119.38, countyName: 'Tulare County (Central)' },
    withoutLA: { lat: 36.82, lon: -119.72, countyName: 'Fresno County' },
    withoutLAandBay: { lat: 36.65, lon: -119.55, countyName: 'Tulare County' },
  },
  {
    year: 2000,
    allCounties: { lat: 35.88, lon: -119.25, countyName: 'Tulare / Kern Border' },
    withoutLA: { lat: 36.68, lon: -119.58, countyName: 'Tulare County (North)' },
    withoutLAandBay: { lat: 36.50, lon: -119.42, countyName: 'Tulare County' },
  },
  {
    year: 2010,
    allCounties: { lat: 35.75, lon: -119.12, countyName: 'Kern County (North)' },
    withoutLA: { lat: 36.54, lon: -119.45, countyName: 'Tulare County' },
    withoutLAandBay: { lat: 36.36, lon: -119.28, countyName: 'Tulare / Kern' },
  },
  {
    year: 2020,
    allCounties: { lat: 35.62, lon: -119.01, countyName: 'Kern County (Bakersfield North)' },
    withoutLA: { lat: 36.41, lon: -119.32, countyName: 'Tulare County (South)' },
    withoutLAandBay: { lat: 36.22, lon: -119.15, countyName: 'Kern County' },
  },
];

export const CALIFORNIA_COUNTIES_DATA: CaliforniaCountyData[] = [
  // Inland Empire (Top Growth)
  {
    name: 'Riverside',
    fips: '06065',
    region: 'Inland Empire',
    pop1970: 459074,
    pop2020: 2418185,
    popChangePct: 426.7,
    homeVal1990Nominal: 139100,
    homeVal1990Adjusted2020: 276860,
    homeVal2020: 423500,
    homeValGrowthPct: 53.0,
    lat: 33.74,
    lon: -115.99,
  },
  {
    name: 'San Bernardino',
    fips: '06071',
    region: 'Inland Empire',
    pop1970: 681570,
    pop2020: 2181654,
    popChangePct: 220.1,
    homeVal1990Nominal: 131800,
    homeVal1990Adjusted2020: 262330,
    homeVal2020: 382400,
    homeValGrowthPct: 45.8,
    lat: 34.84,
    lon: -116.18,
  },
  // Central Valley / Sierra Growth
  {
    name: 'Madera',
    fips: '06039',
    region: 'Central Valley',
    pop1970: 41519,
    pop2020: 156255,
    popChangePct: 276.3,
    homeVal1990Nominal: 89400,
    homeVal1990Adjusted2020: 177940,
    homeVal2020: 298100,
    homeValGrowthPct: 67.5,
    lat: 37.22,
    lon: -119.76,
  },
  {
    name: 'Calaveras',
    fips: '06009',
    region: 'Northern / Sierra',
    pop1970: 13585,
    pop2020: 45292,
    popChangePct: 233.4,
    homeVal1990Nominal: 114500,
    homeVal1990Adjusted2020: 227900,
    homeVal2020: 362400,
    homeValGrowthPct: 59.0,
    lat: 38.21,
    lon: -120.55,
  },
  {
    name: 'San Joaquin',
    fips: '06077',
    region: 'Central Valley',
    pop1970: 291114,
    pop2020: 779233,
    popChangePct: 167.7,
    homeVal1990Nominal: 122800,
    homeVal1990Adjusted2020: 244420,
    homeVal2020: 416700,
    homeValGrowthPct: 70.5,
    lat: 37.93,
    lon: -121.27,
  },
  {
    name: 'Kern',
    fips: '06029',
    region: 'Central Valley',
    pop1970: 330234,
    pop2020: 909235,
    popChangePct: 175.3,
    homeVal1990Nominal: 84300,
    homeVal1990Adjusted2020: 167790,
    homeVal2020: 245900,
    homeValGrowthPct: 46.6,
    lat: 35.34,
    lon: -118.73,
  },
  {
    name: 'Fresno',
    fips: '06019',
    region: 'Central Valley',
    pop1970: 413329,
    pop2020: 1008654,
    popChangePct: 144.0,
    homeVal1990Nominal: 92400,
    homeVal1990Adjusted2020: 183910,
    homeVal2020: 279500,
    homeValGrowthPct: 52.0,
    lat: 36.76,
    lon: -119.65,
  },
  // Coastal Hubs (High Value, Slower Growth)
  {
    name: 'San Francisco',
    fips: '06075',
    region: 'Bay Area',
    pop1970: 715674,
    pop2020: 873965,
    popChangePct: 22.1,
    homeVal1990Nominal: 298900,
    homeVal1990Adjusted2020: 594930,
    homeVal2020: 1195700,
    homeValGrowthPct: 101.0,
    lat: 37.77,
    lon: -122.42,
  },
  {
    name: 'Santa Clara',
    fips: '06085',
    region: 'Bay Area',
    pop1970: 1065313,
    pop2020: 1936259,
    popChangePct: 81.7,
    homeVal1990Nominal: 289400,
    homeVal1990Adjusted2020: 576020,
    homeVal2020: 1224800,
    homeValGrowthPct: 112.6,
    lat: 37.35,
    lon: -121.95,
  },
  {
    name: 'San Mateo',
    fips: '06081',
    region: 'Bay Area',
    pop1970: 557361,
    pop2020: 764442,
    popChangePct: 37.2,
    homeVal1990Nominal: 344100,
    homeVal1990Adjusted2020: 684890,
    homeVal2020: 1267400,
    homeValGrowthPct: 85.1,
    lat: 37.43,
    lon: -122.28,
  },
  {
    name: 'Los Angeles',
    fips: '06037',
    region: 'Southern California',
    pop1970: 7041980,
    pop2020: 10014009,
    popChangePct: 42.2,
    homeVal1990Nominal: 226400,
    homeVal1990Adjusted2020: 450630,
    homeVal2020: 662100,
    homeValGrowthPct: 46.9,
    lat: 34.05,
    lon: -118.24,
  },
  {
    name: 'Orange',
    fips: '06059',
    region: 'Southern California',
    pop1970: 1420386,
    pop2020: 3186989,
    popChangePct: 124.4,
    homeVal1990Nominal: 252700,
    homeVal1990Adjusted2020: 502970,
    homeVal2020: 765400,
    homeValGrowthPct: 52.2,
    lat: 33.72,
    lon: -117.83,
  },
  {
    name: 'San Diego',
    fips: '06073',
    region: 'Southern California',
    pop1970: 1357854,
    pop2020: 3298634,
    popChangePct: 142.9,
    homeVal1990Nominal: 187600,
    homeVal1990Adjusted2020: 373400,
    homeVal2020: 634200,
    homeValGrowthPct: 69.8,
    lat: 32.72,
    lon: -117.16,
  },
];
