import { useState } from 'react';
import { 
  CALIFORNIA_MEAN_CENTERS, 
  CALIFORNIA_COUNTIES_DATA 
} from '../data/californiaResearchData';
import { DecadalMeanCenter, CaliforniaCountyData } from '../types';
import { MapPin, TrendingUp, DollarSign, Layers, Play, Pause, RotateCcw, Building2, Home, CheckCircle2 } from 'lucide-react';

type CaMapLayer = 'mean-centers' | 'population-growth' | 'home-values-1990' | 'home-values-2020';
type CentroidScenario = 'all' | 'no-la' | 'no-la-bay';

export default function CaliforniaMapExplorer() {
  const [selectedLayer, setSelectedLayer] = useState<CaMapLayer>('mean-centers');
  const [activeScenario, setActiveScenario] = useState<CentroidScenario>('all');
  const [selectedDecadeIndex, setSelectedDecadeIndex] = useState<number>(5); // 2020
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedCounty, setSelectedCounty] = useState<CaliforniaCountyData>(CALIFORNIA_COUNTIES_DATA[0]);

  // Projected California Dimensions (Lat: 32.5 to 42.0, Lon: -124.5 to -114.0)
  const mapWidth = 640;
  const mapHeight = 520;

  const projectCoords = (lat: number, lon: number) => {
    const minLat = 32.3;
    const maxLat = 42.1;
    const minLon = -124.6;
    const maxLon = -113.8;

    const x = ((lon - minLon) / (maxLon - minLon)) * mapWidth;
    const y = ((maxLat - lat) / (maxLat - minLat)) * mapHeight;
    return { x, y };
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setSelectedDecadeIndex(0);
      let idx = 0;
      const interval = setInterval(() => {
        idx += 1;
        if (idx >= CALIFORNIA_MEAN_CENTERS.length) {
          clearInterval(interval);
          setIsPlaying(false);
          setSelectedDecadeIndex(5);
        } else {
          setSelectedDecadeIndex(idx);
        }
      }, 700);
    }
  };

  const currentCenter = CALIFORNIA_MEAN_CENTERS[selectedDecadeIndex];

  return (
    <div className="max-w-full px-4 sm:px-6 py-4 space-y-4">
      
      {/* High Density Header Toolbar */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#3fb950]" />
          <span className="font-semibold text-white">ArcGIS Pro Mean Center & Housing Choropleths</span>
          <span className="text-[#8b949e] hidden md:inline">|</span>
          <span className="text-[#8b949e] font-mono hidden md:inline">
            Projection: California Albers (EPSG:3310) • Decades 1970–2020
          </span>
        </div>

        {/* Layer Mode Switchers */}
        <div className="flex items-center gap-1 bg-[#0d1117] p-0.5 rounded border border-[#30363d] overflow-x-auto">
          <button
            onClick={() => setSelectedLayer('mean-centers')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              selectedLayer === 'mean-centers'
                ? 'bg-[#238636] text-white'
                : 'text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            Maps 1–3: Mean Centers
          </button>
          <button
            onClick={() => setSelectedLayer('population-growth')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              selectedLayer === 'population-growth'
                ? 'bg-[#21262d] text-white border border-[#30363d]'
                : 'text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            Map 4: Pop Growth %
          </button>
          <button
            onClick={() => setSelectedLayer('home-values-1990')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              selectedLayer === 'home-values-1990'
                ? 'bg-[#21262d] text-white border border-[#30363d]'
                : 'text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            Map 5: 1990 Home Values (2020$)
          </button>
          <button
            onClick={() => setSelectedLayer('home-values-2020')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              selectedLayer === 'home-values-2020'
                ? 'bg-[#21262d] text-white border border-[#30363d]'
                : 'text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            Map 6: 2020 Home Values
          </button>
        </div>
      </div>

      {/* Main Grid: Map Viewer (8 cols) + Inspector Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* Map Stage */}
        <div className="lg:col-span-8 bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden flex flex-col">
          
          {/* Subheader Toolbar */}
          <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex flex-wrap items-center justify-between gap-2 text-xs">
            
            {/* Scenario Filters (when viewing mean centers) */}
            {selectedLayer === 'mean-centers' ? (
              <div className="flex items-center gap-1.5">
                <span className="text-[#8b949e] font-mono text-[11px]">SCENARIO:</span>
                <button
                  onClick={() => setActiveScenario('all')}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                    activeScenario === 'all'
                      ? 'bg-[#388bfd]/20 text-[#79c0ff] border border-[#388bfd]'
                      : 'text-[#8b949e] hover:text-white bg-[#0d1117]'
                  }`}
                >
                  All 58 Counties
                </button>
                <button
                  onClick={() => setActiveScenario('no-la')}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                    activeScenario === 'no-la'
                      ? 'bg-[#ffa657]/20 text-[#ffa657] border border-[#ffa657]'
                      : 'text-[#8b949e] hover:text-white bg-[#0d1117]'
                  }`}
                >
                  Without LA County
                </button>
                <button
                  onClick={() => setActiveScenario('no-la-bay')}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                    activeScenario === 'no-la-bay'
                      ? 'bg-[#d2a8ff]/20 text-[#d2a8ff] border border-[#d2a8ff]'
                      : 'text-[#8b949e] hover:text-white bg-[#0d1117]'
                  }`}
                >
                  Without LA & Bay Area
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[#8b949e] font-mono">CHOROPLETH:</span>
                <span className="font-semibold text-[#79c0ff] font-mono">
                  {selectedLayer === 'population-growth' && '1970–2020 Population Growth Rate (%)'}
                  {selectedLayer === 'home-values-1990' && '1990 Median Home Values (Adjusted to 2020$ via BLS CPI)'}
                  {selectedLayer === 'home-values-2020' && '2020 ACS Median Home Values'}
                </span>
              </div>
            )}

            {/* Decade Stepper Controls */}
            {selectedLayer === 'mean-centers' && (
              <div className="flex items-center gap-2 bg-[#0d1117] px-2 py-0.5 rounded border border-[#30363d]">
                <button
                  onClick={togglePlay}
                  className="text-[#8b949e] hover:text-white transition-colors"
                  title={isPlaying ? 'Pause' : 'Animate 1970–2020'}
                >
                  {isPlaying ? <Pause className="w-3 h-3 text-[#ffa657]" /> : <Play className="w-3 h-3 text-[#3fb950]" />}
                </button>
                <button
                  onClick={() => setSelectedDecadeIndex(0)}
                  className="text-[#8b949e] hover:text-white"
                  title="Reset to 1970"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
                <span className="text-[#8b949e] font-mono text-[11px]">Decade:</span>
                <span className="font-mono font-bold text-[#79c0ff]">{currentCenter.year}</span>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={selectedDecadeIndex}
                  onChange={(e) => setSelectedDecadeIndex(Number(e.target.value))}
                  className="w-16 accent-[#238636]"
                />
              </div>
            )}
          </div>

          {/* SVG Map Canvas */}
          <div className="relative bg-[#0b0f14] p-3 overflow-hidden flex items-center justify-center min-h-[460px]">
            <svg
              viewBox={`0 0 ${mapWidth} ${mapHeight}`}
              className="w-full h-auto max-h-[490px] select-none"
            >
              {/* California Generalized Cartographic Boundary Silhouette */}
              <path
                d="M 50 20 L 220 20 L 220 180 L 480 340 L 460 480 L 370 500 L 270 470 L 190 400 L 120 330 L 70 210 L 40 80 Z"
                fill="#161b22"
                stroke="#30363d"
                strokeWidth="1.5"
              />

              {/* Grid Lines */}
              {[-122, -120, -118, -116].map((lon) => {
                const { x } = projectCoords(37, lon);
                return (
                  <line
                    key={lon}
                    x1={x}
                    y1={0}
                    x2={x}
                    y2={mapHeight}
                    stroke="#21262d"
                    strokeDasharray="2 4"
                    strokeWidth="1"
                  />
                );
              })}
              {[34, 36, 38, 40].map((lat) => {
                const { y } = projectCoords(lat, -120);
                return (
                  <line
                    key={lat}
                    x1={0}
                    y1={y}
                    x2={mapWidth}
                    y2={y}
                    stroke="#21262d"
                    strokeDasharray="2 4"
                    strokeWidth="1"
                  />
                );
              })}

              {/* County Bubbles / Choropleth Representation */}
              <g id="california-counties">
                {CALIFORNIA_COUNTIES_DATA.map((county) => {
                  const { x, y } = projectCoords(county.lat, county.lon);
                  const isSelected = selectedCounty.name === county.name;

                  // Color ramp logic based on selected layer
                  let fillColor = '#388bfd';
                  let radius = 10;

                  if (selectedLayer === 'population-growth') {
                    // Growth scale: <50%, 50-150%, 150-300%, >300%
                    if (county.popChangePct > 300) fillColor = '#238636'; // Inland Empire surge
                    else if (county.popChangePct > 150) fillColor = '#3fb950';
                    else if (county.popChangePct > 75) fillColor = '#e3b341';
                    else fillColor = '#d29922'; // Slower coastal
                    radius = Math.max(8, Math.min(22, Math.sqrt(county.pop2020) / 120));
                  } else if (selectedLayer === 'home-values-1990') {
                    // 4-Class home values: <200k (light), 200-400k (cyan), 400-700k (blue), >700k (dark purple)
                    if (county.homeVal1990Adjusted2020 >= 700000) fillColor = '#a371f7';
                    else if (county.homeVal1990Adjusted2020 >= 400000) fillColor = '#58a6ff';
                    else if (county.homeVal1990Adjusted2020 >= 200000) fillColor = '#388bfd';
                    else fillColor = '#1f6feb';
                    radius = 12;
                  } else if (selectedLayer === 'home-values-2020') {
                    // 2020 home values: Bay area soaring >1M
                    if (county.homeVal2020 >= 1000000) fillColor = '#f85149'; // >$1M Bay area
                    else if (county.homeVal2020 >= 700000) fillColor = '#ffa657';
                    else if (county.homeVal2020 >= 400000) fillColor = '#79c0ff';
                    else fillColor = '#3fb950'; // Affordable inland
                    radius = 12;
                  } else {
                    // Mean centers layer: subtle county nodes
                    fillColor = county.region === 'Bay Area' ? '#58a6ff' : county.region === 'Inland Empire' ? '#3fb950' : '#8b949e';
                    radius = 7;
                  }

                  return (
                    <g
                      key={county.name}
                      onClick={() => setSelectedCounty(county)}
                      className="cursor-pointer group"
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? radius + 3 : radius}
                        fill={fillColor}
                        fillOpacity={selectedLayer === 'mean-centers' ? 0.4 : 0.75}
                        stroke={isSelected ? '#ffffff' : '#30363d'}
                        strokeWidth={isSelected ? 2 : 1}
                      />
                      <text
                        x={x}
                        y={y - radius - 3}
                        textAnchor="middle"
                        fill={isSelected ? '#ffffff' : '#8b949e'}
                        fontSize="8.5"
                        fontFamily="monospace"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                      >
                        {county.name}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* Mean Center Trajectory Vector Lines & Centroid Nodes (Maps 1, 2, 3) */}
              {selectedLayer === 'mean-centers' && (
                <g id="mean-center-trajectories">
                  
                  {/* Scenario 1: All 58 Counties (Blue/Green Path) */}
                  {(activeScenario === 'all') && (() => {
                    const points = CALIFORNIA_MEAN_CENTERS.map((c) => projectCoords(c.allCounties.lat, c.allCounties.lon));
                    const pathD = points.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');

                    return (
                      <g>
                        <path d={pathD} stroke="#388bfd" strokeWidth="3" fill="none" strokeDasharray="1 0" />
                        {CALIFORNIA_MEAN_CENTERS.map((c, i) => {
                          const { x, y } = projectCoords(c.allCounties.lat, c.allCounties.lon);
                          const isCurrent = i === selectedDecadeIndex;
                          return (
                            <g key={`all-${c.year}`}>
                              <circle
                                cx={x}
                                cy={y}
                                r={isCurrent ? 6 : 4}
                                fill={isCurrent ? '#3fb950' : '#58a6ff'}
                                stroke="#ffffff"
                                strokeWidth={isCurrent ? 2 : 1}
                              />
                              <text
                                x={x + 8}
                                y={y + 3}
                                fill={isCurrent ? '#7ee787' : '#79c0ff'}
                                fontSize="8.5"
                                fontFamily="monospace"
                                fontWeight="bold"
                              >
                                {c.year}
                              </text>
                            </g>
                          );
                        })}
                      </g>
                    );
                  })()}

                  {/* Scenario 2: Without LA County (Orange Path - 1 County North) */}
                  {(activeScenario === 'no-la') && (() => {
                    const points = CALIFORNIA_MEAN_CENTERS.map((c) => projectCoords(c.withoutLA.lat, c.withoutLA.lon));
                    const pathD = points.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');

                    return (
                      <g>
                        <path d={pathD} stroke="#ffa657" strokeWidth="3" fill="none" />
                        {CALIFORNIA_MEAN_CENTERS.map((c, i) => {
                          const { x, y } = projectCoords(c.withoutLA.lat, c.withoutLA.lon);
                          const isCurrent = i === selectedDecadeIndex;
                          return (
                            <g key={`no-la-${c.year}`}>
                              <circle
                                cx={x}
                                cy={y}
                                r={isCurrent ? 6 : 4}
                                fill={isCurrent ? '#ffa657' : '#d29922'}
                                stroke="#ffffff"
                                strokeWidth={isCurrent ? 2 : 1}
                              />
                              <text
                                x={x + 8}
                                y={y + 3}
                                fill="#ffa657"
                                fontSize="8.5"
                                fontFamily="monospace"
                                fontWeight="bold"
                              >
                                {c.year} (No LA)
                              </text>
                            </g>
                          );
                        })}
                      </g>
                    );
                  })()}

                  {/* Scenario 3: Without LA & Bay Area (Purple Path) */}
                  {(activeScenario === 'no-la-bay') && (() => {
                    const points = CALIFORNIA_MEAN_CENTERS.map((c) => projectCoords(c.withoutLAandBay.lat, c.withoutLAandBay.lon));
                    const pathD = points.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');

                    return (
                      <g>
                        <path d={pathD} stroke="#d2a8ff" strokeWidth="3" fill="none" />
                        {CALIFORNIA_MEAN_CENTERS.map((c, i) => {
                          const { x, y } = projectCoords(c.withoutLAandBay.lat, c.withoutLAandBay.lon);
                          const isCurrent = i === selectedDecadeIndex;
                          return (
                            <g key={`no-la-bay-${c.year}`}>
                              <circle
                                cx={x}
                                cy={y}
                                r={isCurrent ? 6 : 4}
                                fill={isCurrent ? '#d2a8ff' : '#a371f7'}
                                stroke="#ffffff"
                                strokeWidth={isCurrent ? 2 : 1}
                              />
                              <text
                                x={x + 8}
                                y={y + 3}
                                fill="#d2a8ff"
                                fontSize="8.5"
                                fontFamily="monospace"
                                fontWeight="bold"
                              >
                                {c.year} (No LA/Bay)
                              </text>
                            </g>
                          );
                        })}
                      </g>
                    );
                  })()}

                </g>
              )}

              {/* Geographic Annotations */}
              <text x="70" y="240" fill="#58a6ff" fontSize="9" fontFamily="monospace" fontWeight="bold">
                SAN FRANCISCO BAY AREA
              </text>
              <text x="310" y="440" fill="#ffa657" fontSize="9" fontFamily="monospace" fontWeight="bold">
                INLAND EMPIRE (Riverside/SB)
              </text>
              <text x="210" y="320" fill="#7ee787" fontSize="9" fontFamily="monospace" fontWeight="bold">
                CENTRAL VALLEY (Fresno/Kern)
              </text>
            </svg>
          </div>

          {/* High Density Map Legend Footer */}
          <div className="bg-[#161b22] px-4 py-2 border-t border-[#30363d] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
            {selectedLayer === 'mean-centers' ? (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#388bfd]" />
                  <span className="text-[#8b949e]">Scenario 1: All 58 Counties (Southeast Shift)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffa657]" />
                  <span className="text-[#8b949e]">Scenario 2: No LA (Moves 1 County North)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d2a8ff]" />
                  <span className="text-[#8b949e]">Scenario 3: No LA & No Bay Area</span>
                </div>
              </>
            ) : selectedLayer === 'population-growth' ? (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#238636]" />
                  <span className="text-[#8b949e]">&gt;300% Growth (Riverside +427%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
                  <span className="text-[#8b949e]">150–300% Growth (Central Valley)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d29922]" />
                  <span className="text-[#8b949e]">&lt;50% Growth (SF +22%, LA +42%)</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
                  <span className="text-[#8b949e]">&gt;$1,000,000 (Bay Area Mega-Values)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffa657]" />
                  <span className="text-[#8b949e]">$700k–$1M (SoCal Coast)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
                  <span className="text-[#8b949e]">&lt;$400k (Central Valley & Inland)</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* High Density Inspector Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-3 font-mono text-xs">
          
          {/* Spatial Statistics Summary */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-2 mb-2.5">
              <span className="text-[#79c0ff] font-bold text-[11px] uppercase">
                SPATIAL STATISTICS: MEAN CENTER
              </span>
              <span className="bg-[#21262d] text-[#8b949e] px-1.5 py-0.5 rounded text-[10px] border border-[#30363d]">
                {currentCenter.year}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="py-1 border-b border-[#21262d]">
                <span className="text-[#8b949e] block text-[10px]">Baseline Location (All Counties):</span>
                <span className="text-[#7ee787] font-bold">
                  {currentCenter.allCounties.countyName} ({currentCenter.allCounties.lat.toFixed(2)}°N, {Math.abs(currentCenter.allCounties.lon).toFixed(2)}°W)
                </span>
              </div>
              <div className="py-1 border-b border-[#21262d]">
                <span className="text-[#8b949e] block text-[10px]">Without Los Angeles County:</span>
                <span className="text-[#ffa657] font-bold">
                  {currentCenter.withoutLA.countyName} (+1 County North)
                </span>
              </div>
              <div className="py-1">
                <span className="text-[#8b949e] block text-[10px]">Without LA & Bay Area:</span>
                <span className="text-[#d2a8ff] font-bold">
                  {currentCenter.withoutLAandBay.countyName}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#8b949e] mt-2.5 pt-2 border-t border-[#30363d] leading-relaxed font-sans">
              Removing Los Angeles County shifts the center north by one county, but the decadal vector still points steadily southeast due to Inland Empire growth.
            </p>
          </div>

          {/* Selected County Telemetry */}
          {selectedCounty && (
            <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#30363d] pb-2 mb-2">
                <span className="text-[#3fb950] font-bold text-[11px] uppercase">
                  COUNTY TELEMETRY
                </span>
                <span className="text-[#8b949e] text-[10px]">FIPS {selectedCounty.fips}</span>
              </div>

              <div className="font-sans font-semibold text-white mb-2">
                {selectedCounty.name} County ({selectedCounty.region})
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-[#0d1117] p-2 rounded border border-[#30363d]">
                  <span className="text-[#8b949e] block text-[9px] uppercase">1970 Population</span>
                  <span className="text-[#c9d1d9] font-bold font-mono">
                    {selectedCounty.pop1970.toLocaleString()}
                  </span>
                </div>
                <div className="bg-[#0d1117] p-2 rounded border border-[#30363d]">
                  <span className="text-[#8b949e] block text-[9px] uppercase">2020 Population</span>
                  <span className="text-white font-bold font-mono">
                    {selectedCounty.pop2020.toLocaleString()}
                  </span>
                </div>
                <div className="bg-[#0d1117] p-2 rounded border border-[#30363d]">
                  <span className="text-[#8b949e] block text-[9px] uppercase">50-Yr Pop Growth</span>
                  <span className={`font-bold font-mono ${selectedCounty.popChangePct > 150 ? 'text-[#3fb950]' : 'text-[#ffa657]'}`}>
                    +{selectedCounty.popChangePct.toFixed(1)}%
                  </span>
                </div>
                <div className="bg-[#0d1117] p-2 rounded border border-[#30363d]">
                  <span className="text-[#8b949e] block text-[9px] uppercase">1990 Home Val (2020$)</span>
                  <span className="text-[#79c0ff] font-bold font-mono">
                    ${selectedCounty.homeVal1990Adjusted2020.toLocaleString()}
                  </span>
                </div>
                <div className="bg-[#0d1117] p-2 rounded border border-[#30363d] col-span-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[#8b949e] block text-[9px] uppercase">2020 Median Home Value</span>
                      <span className={`text-sm font-bold font-mono ${selectedCounty.homeVal2020 >= 1000000 ? 'text-[#f85149]' : 'text-[#3fb950]'}`}>
                        ${selectedCounty.homeVal2020.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#8b949e] block text-[9px] uppercase">Real Price Surge</span>
                      <span className="text-[#ffa657] font-bold font-mono">
                        +{selectedCounty.homeValGrowthPct.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ArcGIS Workflow Reference */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 shadow-sm text-[11px] space-y-1.5 font-mono">
            <span className="text-[#ffa657] font-bold block text-[10px] uppercase">
              ArcGIS Pro Processing Steps
            </span>
            <div className="text-[#8b949e] space-y-1">
              <div>1. Join IPUMS NHGIS STF3/ACS to 2020 TIGER/Line.</div>
              <div>2. Field Calculator: 1990 value * (CPI_2020/CPI_1990).</div>
              <div>3. Spatial Statistics: Mean Center weighted by POP_yr.</div>
              <div>4. Point to Line: Connect 1970–2020 centroid track.</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
