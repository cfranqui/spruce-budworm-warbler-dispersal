import { useState } from 'react';
import { 
  MAINE_WEATHER_STATIONS, 
  HYSPLIT_TRAJECTORIES, 
  WARBLER_DENSITY_ZONES 
} from '../data/researchData';
import { WeatherStation, TrajectorySource } from '../types';
import { MapPin, Wind, Bird, Layers, Play, Pause, RotateCcw, Info, CheckCircle2, ShieldAlert } from 'lucide-react';

type MapViewMode = 'all-overlay' | 'map-1-emergence' | 'map-2-hysplit' | 'map-3-warblers';

export default function InteractiveMapExplorer() {
  const [viewMode, setViewMode] = useState<MapViewMode>('all-overlay');
  const [selectedStation, setSelectedStation] = useState<WeatherStation | null>(MAINE_WEATHER_STATIONS[0]);
  const [selectedTrajectory, setSelectedTrajectory] = useState<TrajectorySource>(HYSPLIT_TRAJECTORIES[1]);
  const [trajectoryHour, setTrajectoryHour] = useState<number>(12);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showFlyway, setShowFlyway] = useState<boolean>(true);

  // SVG coordinate transformation helpers (Bounding Box: Lat 44.5 to 47.8, Lon -71.5 to -66.8)
  const mapWidth = 720;
  const mapHeight = 500;

  const projectCoords = (lat: number, lon: number) => {
    const minLat = 44.4;
    const maxLat = 47.8;
    const minLon = -71.5;
    const maxLon = -66.8;

    const x = ((lon - minLon) / (maxLon - minLon)) * mapWidth;
    const y = ((maxLat - lat) / (maxLat - minLat)) * mapHeight;
    return { x, y };
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setTrajectoryHour(0);
      let current = 0;
      const interval = setInterval(() => {
        current += 2;
        if (current > 12) {
          clearInterval(interval);
          setIsPlaying(false);
          setTrajectoryHour(12);
        } else {
          setTrajectoryHour(current);
        }
      }, 500);
    }
  };

  return (
    <div className="max-w-full px-4 sm:px-6 py-4 space-y-4">
      
      {/* High Density Top Control Strip */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#3fb950]" />
          <span className="font-semibold text-white">GIS Overlays & Trajectory Simulator</span>
          <span className="text-[#8b949e] hidden md:inline">|</span>
          <span className="text-[#8b949e] hidden md:inline">
            Synoptic Event: July 1, 2024 (21:00 EDT) • 500m AGL
          </span>
        </div>

        {/* View Mode Pills */}
        <div className="flex items-center gap-1 bg-[#0d1117] p-0.5 rounded border border-[#30363d]">
          <button
            onClick={() => setViewMode('all-overlay')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              viewMode === 'all-overlay'
                ? 'bg-[#238636] text-white'
                : 'text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            Composite Synthesis
          </button>
          <button
            onClick={() => setViewMode('map-1-emergence')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              viewMode === 'map-1-emergence'
                ? 'bg-[#21262d] text-white border border-[#30363d]'
                : 'text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            Map 1: Emergence
          </button>
          <button
            onClick={() => setViewMode('map-2-hysplit')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              viewMode === 'map-2-hysplit'
                ? 'bg-[#21262d] text-white border border-[#30363d]'
                : 'text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            Map 2: HYSPLIT Plume
          </button>
          <button
            onClick={() => setViewMode('map-3-warblers')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              viewMode === 'map-3-warblers'
                ? 'bg-[#21262d] text-white border border-[#30363d]'
                : 'text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            Map 3: Warbler Density
          </button>
        </div>
      </div>

      {/* Main Grid: Map Visualizer (8 cols) + Data Inspector (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* Map Stage */}
        <div className="lg:col-span-8 bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden flex flex-col">
          
          {/* Subheader Toolbar */}
          <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#8b949e] font-mono">LAYER:</span>
              <span className="font-semibold text-[#79c0ff] font-mono">
                {viewMode === 'all-overlay' && 'ArcGIS Multi-Layer Composite'}
                {viewMode === 'map-1-emergence' && '13 GHCN Weather Stations (June 3–25)'}
                {viewMode === 'map-2-hysplit' && 'NOAA HYSPLIT 12-hr Dispersal Corridor'}
                {viewMode === 'map-3-warblers' && 'eBird 3km Relative Breeding Abundance'}
              </span>
            </div>

            {/* Trajectory Time Controls */}
            {(viewMode === 'all-overlay' || viewMode === 'map-2-hysplit') && (
              <div className="flex items-center gap-2 bg-[#0d1117] px-2 py-0.5 rounded border border-[#30363d]">
                <button
                  onClick={togglePlay}
                  className="text-[#8b949e] hover:text-white transition-colors"
                  title={isPlaying ? 'Pause' : 'Play 12-hour transport'}
                >
                  {isPlaying ? <Pause className="w-3 h-3 text-[#ffa657]" /> : <Play className="w-3 h-3 text-[#3fb950]" />}
                </button>
                <button
                  onClick={() => setTrajectoryHour(12)}
                  className="text-[#8b949e] hover:text-white"
                  title="Reset"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
                <span className="text-[#8b949e] font-mono">T+</span>
                <span className="font-mono font-bold text-[#ffa657]">{trajectoryHour}h</span>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="2"
                  value={trajectoryHour}
                  onChange={(e) => setTrajectoryHour(Number(e.target.value))}
                  className="w-16 accent-[#238636]"
                />
              </div>
            )}
          </div>

          {/* SVG Map Canvas */}
          <div className="relative bg-[#0b0f14] p-3 overflow-hidden flex items-center justify-center min-h-[440px]">
            <svg
              viewBox={`0 0 ${mapWidth} ${mapHeight}`}
              className="w-full h-auto max-h-[480px] select-none"
            >
              <defs>
                <linearGradient id="quebec-warbler-grad-hd" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#238636" stopOpacity="0.4" />
                  <stop offset="70%" stopColor="#1f6feb" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0d1117" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Base Background */}
              <rect width={mapWidth} height={mapHeight} fill="#0d1117" />

              {/* Grid Lines */}
              {[-71, -70, -69, -68, -67].map((lon) => {
                const { x } = projectCoords(46, lon);
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
              {[45, 46, 47].map((lat) => {
                const { y } = projectCoords(lat, -69);
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

              {/* eBird Relative Abundance Habitat Surface */}
              {(viewMode === 'all-overlay' || viewMode === 'map-3-warblers') && (
                <g id="warbler-density-surface">
                  {/* High Density Zone: Southern Quebec */}
                  <path
                    d="M 50 30 Q 220 20 440 60 Q 400 190 240 200 Q 100 190 50 30 Z"
                    fill="url(#quebec-warbler-grad-hd)"
                    stroke="#3fb950"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <text x="120" y="80" fill="#7ee787" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    HIGH WARBLER DENSITY (QUEBEC SOURCE: &gt;0.70 / km²)
                  </text>

                  {/* Low Density Zone: Northern Maine Interior */}
                  <path
                    d="M 240 200 Q 420 200 600 230 Q 650 430 380 470 Q 210 390 240 200 Z"
                    fill="#1f6feb"
                    fillOpacity="0.06"
                    stroke="#388bfd"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <text x="360" y="360" fill="#8b949e" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    LOW WARBLER DENSITY (MAINE SINK: &lt;0.15 / km²)
                  </text>

                  {/* Atlantic Flyway Migration Vector Flow */}
                  {showFlyway && (
                    <g opacity="0.6">
                      <path
                        d="M 530 480 Q 450 290 280 50"
                        stroke="#58a6ff"
                        strokeWidth="2.5"
                        strokeDasharray="6 4"
                        fill="none"
                      />
                      <text x="440" y="270" fill="#79c0ff" fontSize="9" fontWeight="bold" fontFamily="monospace" transform="rotate(-55 440 270)">
                        ▲ Atlantic Flyway Migration Axis
                      </text>
                    </g>
                  )}
                </g>
              )}

              {/* International Boundary Line */}
              <path
                d="M 80 210 Q 200 190 320 220 T 540 170 T 680 130"
                stroke="#484f58"
                strokeWidth="1.5"
                strokeDasharray="5 3"
                fill="none"
              />
              <text x="90" y="185" fill="#8b949e" fontSize="9" fontWeight="bold" fontFamily="monospace">
                CANADA (QUEBEC)
              </text>
              <text x="160" y="245" fill="#8b949e" fontSize="9" fontWeight="bold" fontFamily="monospace">
                USA (NORTHERN MAINE)
              </text>

              {/* HYSPLIT Forward Trajectories */}
              {(viewMode === 'all-overlay' || viewMode === 'map-2-hysplit') && (
                <g id="hysplit-trajectories">
                  {HYSPLIT_TRAJECTORIES.map((traj) => {
                    const visiblePoints = traj.points.filter((p) => p.hour <= trajectoryHour);
                    if (visiblePoints.length < 2) return null;

                    const pathString = visiblePoints.reduce((acc, pt, idx) => {
                      const { x, y } = projectCoords(pt.lat, pt.lon);
                      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                    }, '');

                    const lastPoint = visiblePoints[visiblePoints.length - 1];
                    const headCoord = projectCoords(lastPoint.lat, lastPoint.lon);
                    const isSelected = selectedTrajectory.id === traj.id;

                    return (
                      <g 
                        key={traj.id}
                        onClick={() => setSelectedTrajectory(traj)}
                        className="cursor-pointer"
                      >
                        <path
                          d={pathString}
                          stroke={isSelected ? '#ffa657' : '#d29922'}
                          strokeWidth={isSelected ? '3.5' : '2'}
                          strokeOpacity="0.9"
                          fill="none"
                        />
                        <circle
                          cx={headCoord.x}
                          cy={headCoord.y}
                          r={isSelected ? '5' : '4'}
                          fill="#f85149"
                          stroke="#ffffff"
                          strokeWidth="1"
                        />
                        <text
                          x={headCoord.x + 6}
                          y={headCoord.y + 3}
                          fill="#e3b341"
                          fontSize="8.5"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {lastPoint.altMeters}m ({lastPoint.windSpeedKmh} km/h)
                        </text>
                      </g>
                    );
                  })}

                  {/* 3 Source Initiation Markers */}
                  {HYSPLIT_TRAJECTORIES.map((traj) => {
                    const startCoord = projectCoords(traj.originLat, traj.originLon);
                    return (
                      <g key={`start-${traj.id}`}>
                        <circle
                          cx={startCoord.x}
                          cy={startCoord.y}
                          r="4"
                          fill="#ffa657"
                          stroke="#ffffff"
                          strokeWidth="1"
                        />
                        <text
                          x={startCoord.x - 8}
                          y={startCoord.y - 6}
                          fill="#e3b341"
                          fontSize="8"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          Origin {traj.id.split('-')[1]}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* GHCN Weather Stations */}
              {(viewMode === 'all-overlay' || viewMode === 'map-1-emergence') && (
                <g id="ghcn-weather-stations">
                  {MAINE_WEATHER_STATIONS.map((station) => {
                    const { x, y } = projectCoords(station.lat, station.lon);
                    const isSelected = selectedStation?.id === station.id;

                    const isEarly = station.emergenceDate.includes('June 3') || station.emergenceDate.includes('June 5') || station.emergenceDate.includes('June 7') || station.emergenceDate.includes('June 8');
                    const isLate = station.emergenceDate.includes('June 19') || station.emergenceDate.includes('June 21') || station.emergenceDate.includes('June 25');

                    const fillColor = isEarly ? '#3fb950' : isLate ? '#ffa657' : '#58a6ff';

                    return (
                      <g
                        key={station.id}
                        onClick={() => setSelectedStation(station)}
                        className="cursor-pointer group"
                      >
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? '6.5' : '4.5'}
                          fill={fillColor}
                          stroke="#ffffff"
                          strokeWidth={isSelected ? '2' : '1'}
                        />
                        <text
                          x={x + 6}
                          y={y + 3}
                          fill={isSelected ? '#ffffff' : '#8b949e'}
                          fontSize={isSelected ? '9.5' : '8'}
                          fontFamily="monospace"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                        >
                          {station.name.split(' ')[0]} ({station.emergenceDate.split(',')[0].replace('June ', '6/')})
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}
            </svg>
          </div>

          {/* High Density Map Legend Footer */}
          <div className="bg-[#161b22] px-4 py-2 border-t border-[#30363d] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
              <span className="text-[#8b949e]">Early Emergence (6/3–6/8)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#58a6ff]" />
              <span className="text-[#8b949e]">Mid Emergence (6/10–6/18)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffa657]" />
              <span className="text-[#8b949e]">Late Emergence (6/19–6/25)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#ffa657]" />
              <span className="text-[#8b949e]">HYSPLIT Plume (July 1)</span>
            </div>
          </div>
        </div>

        {/* High Density Inspector Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-3 font-mono text-xs">
          
          {/* Spatial Decoupling Summary Card */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-2 mb-2.5">
              <span className="text-[#ffa657] font-bold text-[11px] uppercase">
                TROPHIC COUPLING ANALYSIS
              </span>
              <span className="bg-[#21262d] text-[#8b949e] px-1.5 py-0.5 rounded text-[10px] border border-[#30363d]">
                July 2024
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-[#21262d]">
                <span className="text-[#8b949e]">Quebec Source Density:</span>
                <span className="text-[#3fb950] font-bold">0.74 birds/km²</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#21262d]">
                <span className="text-[#8b949e]">Maine Sink Density:</span>
                <span className="text-[#ff7b72] font-bold">0.14 birds/km²</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#8b949e]">Predation Pressure Gap:</span>
                <span className="text-[#e3b341] font-bold">-81% Predation</span>
              </div>
            </div>

            <p className="text-[11px] text-[#8b949e] mt-2.5 pt-2 border-t border-[#30363d] leading-relaxed font-sans">
              Moths carried across the border on July 1 enter Maine forest stands with low predator densities, creating a spatial predation release window.
            </p>
          </div>

          {/* Station Details */}
          {selectedStation && (
            <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#30363d] pb-2 mb-2">
                <span className="text-[#79c0ff] font-bold text-[11px] uppercase">
                  STATION TELEMETRY
                </span>
                <span className="text-[#8b949e] text-[10px]">{selectedStation.id}</span>
              </div>

              <div className="font-sans font-semibold text-white mb-2">
                {selectedStation.name} ({selectedStation.county} Co.)
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-[#0d1117] p-2 rounded border border-[#30363d]">
                  <span className="text-[#8b949e] block text-[9px] uppercase">Emergence</span>
                  <span className="text-[#3fb950] font-bold font-mono">{selectedStation.emergenceDate}</span>
                </div>
                <div className="bg-[#0d1117] p-2 rounded border border-[#30363d]">
                  <span className="text-[#8b949e] block text-[9px] uppercase">Elevation</span>
                  <span className="text-[#79c0ff] font-bold font-mono">{selectedStation.elevationMeters}m</span>
                </div>
                <div className="bg-[#0d1117] p-2 rounded border border-[#30363d]">
                  <span className="text-[#8b949e] block text-[9px] uppercase">Thermal Sum</span>
                  <span className="text-[#ffa657] font-bold font-mono">{selectedStation.gddAccumulated} GDD</span>
                </div>
                <div className="bg-[#0d1117] p-2 rounded border border-[#30363d]">
                  <span className="text-[#8b949e] block text-[9px] uppercase">Threshold</span>
                  <span className="text-[#c9d1d9] font-bold font-mono">380 GDD (8°C)</span>
                </div>
              </div>
            </div>
          )}

          {/* HYSPLIT Plume Table */}
          {selectedTrajectory && (
            <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#30363d] pb-2 mb-2">
                <span className="text-[#ffa657] font-bold text-[11px] uppercase">
                  HYSPLIT TRAJECTORY LOG
                </span>
                <span className="text-[#8b949e] text-[10px]">July 1–2, 2024</span>
              </div>

              <div className="overflow-x-auto max-h-40 scrollbar-thin">
                <table className="min-w-full text-[10px] text-left">
                  <thead className="bg-[#0d1117] text-[#8b949e] border-b border-[#30363d]">
                    <tr>
                      <th className="p-1">Hour</th>
                      <th className="p-1">Lat/Lon</th>
                      <th className="p-1">Alt</th>
                      <th className="p-1">Speed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#21262d]">
                    {selectedTrajectory.points.map((pt) => (
                      <tr key={pt.hour} className={pt.hour === trajectoryHour ? 'bg-[#21262d] text-white' : 'text-[#8b949e]'}>
                        <td className="p-1">+{pt.hour}h</td>
                        <td className="p-1">{pt.lat.toFixed(2)}N, {Math.abs(pt.lon).toFixed(2)}W</td>
                        <td className="p-1">{pt.altMeters}m</td>
                        <td className="p-1">{pt.windSpeedKmh}km/h</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
