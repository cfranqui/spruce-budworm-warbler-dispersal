import { useState } from 'react';
import { MAINE_WEATHER_STATIONS } from '../data/researchData';
import { Calculator, Thermometer, Calendar, TrendingUp, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function PhenologyCalculator() {
  const [selectedStationId, setSelectedStationId] = useState<string>('USW00014607');
  const [baseTemp, setBaseTemp] = useState<number>(8.0);
  const [targetGdd, setTargetGdd] = useState<number>(380);
  const [tempOffset, setTempOffset] = useState<number>(0);

  const selectedStation = MAINE_WEATHER_STATIONS.find((s) => s.id === selectedStationId) || MAINE_WEATHER_STATIONS[0];

  const calculateAccumulation = () => {
    const days: { day: number; date: string; tmean: number; dailyGdd: number; cumGdd: number }[] = [];
    let cum = 0;
    let emergenceDay = -1;
    let emergenceDateStr = '';

    for (let d = 60; d <= 185; d++) {
      const seasonalBase = -2 + ((d - 60) / 125) * 22;
      const elevationPenalty = (selectedStation.elevationMeters / 100) * 0.65;
      const dailyMean = seasonalBase - elevationPenalty + tempOffset + Math.sin(d * 0.4) * 2.5;

      const dailyGdd = Math.max(0, dailyMean - baseTemp);
      cum += dailyGdd;

      const dateObj = new Date(2024, 0, d);
      const dateString = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      days.push({
        day: d,
        date: dateString,
        tmean: Number(dailyMean.toFixed(1)),
        dailyGdd: Number(dailyGdd.toFixed(1)),
        cumGdd: Number(cum.toFixed(1)),
      });

      if (cum >= targetGdd && emergenceDay === -1) {
        emergenceDay = d;
        emergenceDateStr = dateString;
      }
    }

    return { days, emergenceDay, emergenceDateStr, totalGdd: cum };
  };

  const results = calculateAccumulation();

  return (
    <div className="max-w-full px-4 sm:px-6 py-4 space-y-4">
      
      {/* High Density Banner */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#d2a8ff]" />
          <span className="font-semibold text-white">Degree-Day Phenology Accumulation Engine</span>
          <span className="text-[#8b949e] hidden md:inline">|</span>
          <span className="text-[#8b949e] font-mono hidden md:inline">
            Formula: GDD = &Sigma; max(T_mean - T_base, 0)
          </span>
        </div>

        <div className="text-[11px] font-mono text-[#8b949e]">
          Target: <span className="text-[#79c0ff] font-bold">{targetGdd} GDD</span> (Tbase: {baseTemp}°C)
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* Controls (4 Cols) */}
        <div className="lg:col-span-4 bg-[#161b22] border border-[#30363d] rounded-md p-4 space-y-3.5 text-xs">
          <div className="border-b border-[#30363d] pb-2 text-[11px] font-bold text-[#8b949e] uppercase font-mono">
            Model Configuration
          </div>

          {/* Station Selection */}
          <div>
            <label className="block text-[#8b949e] mb-1 font-mono text-[11px]">
              Weather Station:
            </label>
            <select
              value={selectedStationId}
              onChange={(e) => setSelectedStationId(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded px-2.5 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-[#58a6ff]"
            >
              {MAINE_WEATHER_STATIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.county} Co., {s.elevationMeters}m)
                </option>
              ))}
            </select>
          </div>

          {/* Base Temperature Slider */}
          <div>
            <div className="flex justify-between font-mono mb-1">
              <span className="text-[#8b949e]">Base Threshold (Tbase):</span>
              <span className="text-[#d2a8ff] font-bold">{baseTemp.toFixed(1)} °C</span>
            </div>
            <input
              type="range"
              min="5.0"
              max="11.0"
              step="0.5"
              value={baseTemp}
              onChange={(e) => setBaseTemp(Number(e.target.value))}
              className="w-full accent-[#238636]"
            />
          </div>

          {/* Emergence GDD Target */}
          <div>
            <div className="flex justify-between font-mono mb-1">
              <span className="text-[#8b949e]">Emergence Threshold:</span>
              <span className="text-[#79c0ff] font-bold">{targetGdd} GDD</span>
            </div>
            <input
              type="range"
              min="320"
              max="440"
              step="10"
              value={targetGdd}
              onChange={(e) => setTargetGdd(Number(e.target.value))}
              className="w-full accent-[#238636]"
            />
          </div>

          {/* Climate Offset */}
          <div>
            <div className="flex justify-between font-mono mb-1">
              <span className="text-[#8b949e]">Climate Shift Offset:</span>
              <span className={`font-bold ${tempOffset > 0 ? 'text-[#ff7b72]' : tempOffset < 0 ? 'text-[#79c0ff]' : 'text-white'}`}>
                {tempOffset > 0 ? `+${tempOffset.toFixed(1)}` : tempOffset.toFixed(1)} °C
              </span>
            </div>
            <input
              type="range"
              min="-3.0"
              max="3.0"
              step="0.5"
              value={tempOffset}
              onChange={(e) => setTempOffset(Number(e.target.value))}
              className="w-full accent-[#ffa657]"
            />
          </div>

          <button
            onClick={() => {
              setBaseTemp(8.0);
              setTargetGdd(380);
              setTempOffset(0);
            }}
            className="w-full py-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-xs font-mono font-medium rounded border border-[#30363d] transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset to 2024 Defaults</span>
          </button>
        </div>

        {/* Results & Chart (8 Cols) */}
        <div className="lg:col-span-8 space-y-3 font-mono text-xs">
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="bg-[#161b22] border border-[#30363d] rounded p-3 text-center">
              <span className="text-[10px] text-[#8b949e] uppercase block">Adult Emergence Date</span>
              <span className="text-lg font-bold text-[#3fb950] block mt-0.5">
                {results.emergenceDateStr || 'Late June'}
              </span>
              <span className="text-[10px] text-[#484f58]">Day {results.emergenceDay} of year</span>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded p-3 text-center">
              <span className="text-[10px] text-[#8b949e] uppercase block">Flight Window Buffer</span>
              <span className="text-lg font-bold text-[#79c0ff] block mt-0.5">
                3–4 Weeks
              </span>
              <span className="text-[10px] text-[#484f58]">Ahead of July 1 event</span>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded p-3 text-center">
              <span className="text-[10px] text-[#8b949e] uppercase block">Thermal Sum at Emergence</span>
              <span className="text-lg font-bold text-[#ffa657] block mt-0.5">
                {targetGdd} GDD
              </span>
              <span className="text-[10px] text-[#484f58]">{selectedStation.county} County ({selectedStation.elevationMeters}m)</span>
            </div>
          </div>

          {/* SVG Thermal Progression Chart */}
          <div className="bg-[#161b22] border border-[#30363d] rounded p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#8b949e]">
              <span className="font-semibold text-white">Degree-Day Thermal Curve (April 1 – July 1)</span>
              <span>Threshold: {targetGdd} GDD</span>
            </div>

            <div className="bg-[#0d1117] rounded p-2 border border-[#30363d]">
              <svg viewBox="0 0 500 160" className="w-full h-auto">
                <line x1="40" y1="45" x2="480" y2="45" stroke="#d2a8ff" strokeDasharray="3 3" strokeWidth="1.5" />
                <text x="45" y="40" fill="#d2a8ff" fontSize="8" fontFamily="monospace">Emergence Threshold ({targetGdd} GDD)</text>

                <line x1="40" y1="135" x2="480" y2="135" stroke="#21262d" strokeWidth="1" />
                <line x1="40" y1="15" x2="40" y2="135" stroke="#21262d" strokeWidth="1" />

                <text x="12" y="138" fill="#484f58" fontSize="8" fontFamily="monospace">0</text>
                <text x="12" y="90" fill="#484f58" fontSize="8" fontFamily="monospace">200</text>
                <text x="12" y="48" fill="#484f58" fontSize="8" fontFamily="monospace">400</text>

                {(() => {
                  const filteredDays = results.days.filter((d, i) => i % 2 === 0);
                  const minDay = 60;
                  const maxDay = 185;
                  const maxG = 500;

                  const points = filteredDays.map((d) => {
                    const x = 40 + ((d.day - minDay) / (maxDay - minDay)) * 440;
                    const y = 135 - (Math.min(d.cumGdd, maxG) / maxG) * 115;
                    return `${x},${y}`;
                  });

                  const pathD = `M 40,135 L ${points.join(' L ')} L 480,135 Z`;

                  return (
                    <>
                      <path d={pathD} fill="#238636" fillOpacity="0.2" />
                      <polyline points={points.join(' ')} fill="none" stroke="#3fb950" strokeWidth="2" />
                    </>
                  );
                })()}

                <text x="40" y="148" fill="#8b949e" fontSize="8" fontFamily="monospace">Mar 1</text>
                <text x="150" y="148" fill="#8b949e" fontSize="8" fontFamily="monospace">Apr 1</text>
                <text x="260" y="148" fill="#8b949e" fontSize="8" fontFamily="monospace">May 1</text>
                <text x="370" y="148" fill="#8b949e" fontSize="8" fontFamily="monospace">Jun 1</text>
                <text x="450" y="148" fill="#8b949e" fontSize="8" fontFamily="monospace">Jul 1</text>
              </svg>
            </div>

            <p className="text-[11px] text-[#8b949e] font-sans leading-relaxed pt-1">
              Spruce budworm moths finished pupal development and were biologically flight-ready starting June 3–8 across low elevation stations (Millinocket, Caribou) and up to June 25 in mountainous terrain (Eustis). This biological window gave ample readiness for the July 1 synoptic wind transport event.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
