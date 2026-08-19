import { useState } from 'react';
import { CALIFORNIA_COUNTIES_DATA } from '../data/californiaResearchData';
import { DollarSign, TrendingUp, Home, ArrowRight, Calculator, RefreshCw } from 'lucide-react';

export default function CaliforniaAffordabilityCalculator() {
  const [originCountyName, setOriginCountyName] = useState<string>('San Francisco');
  const [destinationCountyName, setDestinationCountyName] = useState<string>('Riverside');
  const [customHomeValue1990, setCustomHomeValue1990] = useState<number>(200000);
  const [interestRate, setInterestRate] = useState<number>(6.5);

  const originCounty = CALIFORNIA_COUNTIES_DATA.find((c) => c.name === originCountyName) || CALIFORNIA_COUNTIES_DATA[7];
  const destCounty = CALIFORNIA_COUNTIES_DATA.find((c) => c.name === destinationCountyName) || CALIFORNIA_COUNTIES_DATA[0];

  // Inflation Factor from 1990 to 2020 (BLS CPI-U: 130.7 to 258.8)
  const cpi1990 = 130.7;
  const cpi2020 = 258.811;
  const inflationMultiplier = cpi2020 / cpi1990; // ~1.9802

  const customAdjusted2020 = customHomeValue1990 * inflationMultiplier;

  // Monthly Mortgage Calculation (P&I on 30-year fixed, 20% down)
  const calcMonthlyMortgage = (homePrice: number, ratePct: number) => {
    const loanAmount = homePrice * 0.8;
    const monthlyRate = ratePct / 100 / 12;
    const numPayments = 360;
    const payment = (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    return Math.round(payment);
  };

  const originMortgage = calcMonthlyMortgage(originCounty.homeVal2020, interestRate);
  const destMortgage = calcMonthlyMortgage(destCounty.homeVal2020, interestRate);
  const monthlySavings = originMortgage - destMortgage;
  const priceDifference = originCounty.homeVal2020 - destCounty.homeVal2020;

  return (
    <div className="max-w-full px-4 sm:px-6 py-4 space-y-4">
      
      {/* High Density Header */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#ffa657]" />
          <span className="font-semibold text-white">Housing Affordability & Spatial Migration Simulator</span>
          <span className="text-[#8b949e] hidden md:inline">|</span>
          <span className="text-[#8b949e] font-mono hidden md:inline">
            Equation: HomeVal_2020adj = HomeVal_1990 * (CPI_2020 / CPI_1990)
          </span>
        </div>

        <div className="text-[11px] font-mono text-[#8b949e]">
          BLS CPI Multiplier: <span className="text-[#79c0ff] font-bold">1.980x</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start font-mono text-xs">
        
        {/* Migration Pair Configurator (4 cols) */}
        <div className="lg:col-span-4 bg-[#161b22] border border-[#30363d] rounded-md p-4 space-y-3.5">
          <div className="border-b border-[#30363d] pb-2 text-[11px] font-bold text-[#8b949e] uppercase">
            Internal Migration Pair
          </div>

          {/* Origin County */}
          <div>
            <label className="block text-[#8b949e] mb-1 text-[11px]">
              Origin (High-Cost Coastal Hub):
            </label>
            <select
              value={originCountyName}
              onChange={(e) => setOriginCountyName(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded px-2.5 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-[#58a6ff]"
            >
              {CALIFORNIA_COUNTIES_DATA.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({c.region}) — ${c.homeVal2020.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Destination County */}
          <div>
            <label className="block text-[#8b949e] mb-1 text-[11px]">
              Destination (Inland / Valley Expansion):
            </label>
            <select
              value={destinationCountyName}
              onChange={(e) => setDestinationCountyName(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded px-2.5 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-[#58a6ff]"
            >
              {CALIFORNIA_COUNTIES_DATA.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({c.region}) — ${c.homeVal2020.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Mortgage Rate */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-[#8b949e]">Mortgage Interest Rate:</span>
              <span className="text-[#79c0ff] font-bold">{interestRate.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="3.0"
              max="9.0"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#238636]"
            />
          </div>

          {/* Custom 1990 CPI Inflation Tester */}
          <div className="pt-2 border-t border-[#30363d]">
            <span className="text-[#ffa657] font-bold block text-[10px] uppercase mb-1">
              ArcGIS Field Calculator CPI Test
            </span>
            <label className="block text-[#8b949e] text-[10px] mb-1">
              1990 Nominal Value:
            </label>
            <input
              type="number"
              value={customHomeValue1990}
              onChange={(e) => setCustomHomeValue1990(Number(e.target.value))}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded px-2 py-1 text-white text-xs mb-1"
              step="10000"
            />
            <div className="bg-[#0d1117] p-2 rounded border border-[#30363d] text-[10px]">
              <span className="text-[#8b949e]">2020 Real Equivalent: </span>
              <span className="text-[#3fb950] font-bold">${Math.round(customAdjusted2020).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Comparison Metrics & Spatial Economic Impact (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          
          {/* Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="bg-[#161b22] border border-[#30363d] rounded p-3 text-center">
              <span className="text-[10px] text-[#8b949e] uppercase block">Price Gap (2020)</span>
              <span className="text-lg font-bold text-[#3fb950] block mt-0.5">
                ${priceDifference.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#484f58]">
                {((destCounty.homeVal2020 / originCounty.homeVal2020) * 100).toFixed(0)}% of origin cost
              </span>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded p-3 text-center">
              <span className="text-[10px] text-[#8b949e] uppercase block">Monthly P&I Savings</span>
              <span className="text-lg font-bold text-[#79c0ff] block mt-0.5">
                ${monthlySavings.toLocaleString()} / mo
              </span>
              <span className="text-[10px] text-[#484f58]">At {interestRate}% 30-year fixed</span>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded p-3 text-center">
              <span className="text-[10px] text-[#8b949e] uppercase block">50-Yr Growth Delta</span>
              <span className="text-lg font-bold text-[#ffa657] block mt-0.5">
                +{destCounty.popChangePct - originCounty.popChangePct > 0 ? (destCounty.popChangePct - originCounty.popChangePct).toFixed(1) : 0}%
              </span>
              <span className="text-[10px] text-[#484f58]">Dest vs Origin pop velocity</span>
            </div>
          </div>

          {/* Detailed Side-by-Side Comparison Box */}
          <div className="bg-[#161b22] border border-[#30363d] rounded p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold border-b border-[#30363d] pb-2">
              <div className="flex items-center gap-1.5 text-[#f85149]">
                <Home className="w-3.5 h-3.5" />
                <span>{originCounty.name} ({originCounty.region})</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8b949e]" />
              <div className="flex items-center gap-1.5 text-[#3fb950]">
                <Home className="w-3.5 h-3.5" />
                <span>{destCounty.name} ({destCounty.region})</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[11px]">
              <div className="bg-[#0d1117] p-3 rounded border border-[#30363d] space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#8b949e]">1970 Population:</span>
                  <span className="text-white">{originCounty.pop1970.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8b949e]">2020 Population:</span>
                  <span className="text-white">{originCounty.pop2020.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8b949e]">Population Change:</span>
                  <span className="text-[#ffa657]">+{originCounty.popChangePct.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between border-t border-[#21262d] pt-1">
                  <span className="text-[#8b949e]">2020 Home Value:</span>
                  <span className="text-[#f85149] font-bold">${originCounty.homeVal2020.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8b949e]">Monthly Mortgage:</span>
                  <span className="text-white font-bold">${originMortgage.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-[#0d1117] p-3 rounded border border-[#30363d] space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#8b949e]">1970 Population:</span>
                  <span className="text-white">{destCounty.pop1970.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8b949e]">2020 Population:</span>
                  <span className="text-white">{destCounty.pop2020.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8b949e]">Population Change:</span>
                  <span className="text-[#3fb950] font-bold">+{destCounty.popChangePct.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between border-t border-[#21262d] pt-1">
                  <span className="text-[#8b949e]">2020 Home Value:</span>
                  <span className="text-[#3fb950] font-bold">${destCounty.homeVal2020.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8b949e]">Monthly Mortgage:</span>
                  <span className="text-white font-bold">${destMortgage.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#8b949e] font-sans leading-relaxed pt-2 border-t border-[#30363d]">
              <strong>Demographic Finding:</strong> High housing costs in coastal employment centers create a powerful affordability push factor. As seen in the 50-year census trajectory, domestic migration from coastal urban hubs into the Inland Empire, Central Valley, and Sierra foothills generated triple-digit growth in destinations like Riverside (+427%), San Bernardino (+220%), Madera (+276%), and Calaveras (+233%).
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
