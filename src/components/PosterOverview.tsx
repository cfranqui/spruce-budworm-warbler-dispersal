import { CheckCircle2, FileText, Award, Users, Compass, Database, Lightbulb } from 'lucide-react';

export default function PosterOverview() {
  return (
    <div className="max-w-full px-4 sm:px-6 py-4 space-y-4">
      
      {/* High Density Poster Header */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#30363d] pb-2.5 mb-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#21262d] text-[#ffa657] border border-[#30363d] rounded font-bold">
              MCC
            </span>
            <span className="px-2 py-0.5 bg-[#21262d] text-[#79c0ff] border border-[#30363d] rounded font-bold">
              NSF
            </span>
            <span className="px-2 py-0.5 bg-[#21262d] text-[#7ee787] border border-[#30363d] rounded font-bold">
              UMaine (1865)
            </span>
          </div>

          <span className="text-[#8b949e]">
            Spring 2026 Academic Research Presentation
          </span>
        </div>

        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight leading-snug max-w-5xl">
          Modeling Spruce Budworm Dispersal from Quebec into Maine along with its Spatial Relationship to Bay-breasted Warbler Breeding Habitat
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs">
          <span className="font-semibold text-[#58a6ff]">Christopher Franqui</span>
          <span className="text-[#8b949e]">•</span>
          <span className="text-[#8b949e]">Maine Internship, Spring 2026, Monroe Community College</span>
        </div>
      </div>

      {/* High Density 3-Column Poster Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Column 1 */}
        <div className="space-y-4">
          
          {/* Research Question */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#7ee787] uppercase font-mono mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Research Question</span>
            </div>
            <p className="text-xs text-white leading-relaxed bg-[#0d1117] p-3 rounded border border-[#30363d] font-sans font-medium">
              Does the atmospheric corridor that transports the spruce budworm moths from Quebec into Maine spatially align with Bay-breasted Warbler habitat, specifically as it flies along the Atlantic flyway?
            </p>
          </div>

          {/* Background */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 shadow-sm space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#ffa657] uppercase font-mono mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Background</span>
            </div>
            <p className="text-[#c9d1d9] leading-relaxed">
              Each year, billions of birds migrate across North America using the <strong>Atlantic Flyway</strong>—a roughly 3,000-mile corridor passing directly through the Quebec–Northern Maine region where the eastern spruce budworm is found.
            </p>
            <p className="text-[#c9d1d9] leading-relaxed">
              The eastern spruce worm devastates spruce-fir forests. A specialist predator is the <strong>Bay-breasted Warbler</strong>, which regularly feeds on budworms, serving as a key natural biocontrol regulator.
            </p>
          </div>

          {/* Results */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 shadow-sm space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#79c0ff] uppercase font-mono mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Results</span>
            </div>
            <p className="text-[#c9d1d9] leading-relaxed">
              Moths were ready to fly between <strong>June 3 and June 25, 2024</strong>. The first night with strong favorable southward winds was <strong>July 1, 2024</strong>.
            </p>
            <p className="text-[#c9d1d9] leading-relaxed">
              While flight paths overlapped warbler habitat, the largest concentration of warblers was in southern Quebec and not northern Maine. Entering Maine, moths face reduced predation pressure.
            </p>
          </div>

        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          
          {/* Methods */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 shadow-sm space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#d2a8ff] uppercase font-mono mb-1">
              <Database className="w-3.5 h-3.5" />
              <span>Methods</span>
            </div>
            <ul className="text-[#c9d1d9] space-y-2 leading-relaxed list-disc list-inside">
              <li>
                <strong>ERA5 Reanalysis</strong>: Evaluated nightly southward winds with Python to find optimal dispersal dates (July 1, 2024).
              </li>
              <li>
                <strong>GHCN Phenology</strong>: Modeled emergence across 13 northern Maine stations (median June 8, 2024).
              </li>
              <li>
                <strong>NOAA HYSPLIT</strong>: Simulated 12-hour overnight trajectories (500m AGL) from 3 Quebec source points.
              </li>
              <li>
                <strong>eBird Status & Trends</strong>: 3 km relative abundance grids overlaid in ArcGIS Pro.
              </li>
            </ul>
          </div>

          {/* Three Component Summary */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-md p-3.5 space-y-2.5 text-xs">
            <div className="text-[11px] font-bold text-[#8b949e] uppercase font-mono">
              Three Synthesis Maps
            </div>

            <div className="bg-[#161b22] p-2.5 rounded border border-[#30363d]">
              <span className="text-[#3fb950] font-bold font-mono block">Map 1: Moth Adult Emergence</span>
              <span className="text-[11px] text-[#8b949e]">13 Maine weather stations, early to mid-June 2024.</span>
            </div>

            <div className="bg-[#161b22] p-2.5 rounded border border-[#30363d]">
              <span className="text-[#ffa657] font-bold font-mono block">Map 2: HYSPLIT Plumes</span>
              <span className="text-[11px] text-[#8b949e]">12-hour nocturnal path across the international border.</span>
            </div>

            <div className="bg-[#161b22] p-2.5 rounded border border-[#30363d]">
              <span className="text-[#79c0ff] font-bold font-mono block">Map 3: Warbler Breeding Surfaces</span>
              <span className="text-[11px] text-[#8b949e]">Spatial gradient showing high density in Quebec, low in Maine.</span>
            </div>
          </div>

        </div>

        {/* Column 3 */}
        <div className="space-y-4">
          
          {/* Discussion */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 shadow-sm space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#ff7b72] uppercase font-mono mb-1">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Discussion</span>
            </div>
            <p className="text-[#c9d1d9] leading-relaxed">
              The results indicate that a contributing factor to budworm proliferation in northern Maine is the scarcity of its specialist avian predator, the Bay-breasted Warbler.
            </p>
            <p className="text-[#c9d1d9] leading-relaxed">
              Management strategies to support warbler habitat retention in northern Maine should be investigated.
            </p>
          </div>

          {/* Future Work */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 shadow-sm space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#79c0ff] uppercase font-mono mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Future Work</span>
            </div>
            <p className="text-[#c9d1d9] leading-relaxed">
              Mathematical modeling of warbler populations along the Atlantic Flyway, in-situ pheromone trap correlation, and bioenergetic moth consumption quotas.
            </p>
          </div>

          {/* Acknowledgements */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 shadow-sm space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#3fb950] uppercase font-mono mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>Acknowledgements</span>
            </div>
            <p className="text-[#c9d1d9] leading-relaxed">
              Heartfelt thanks to my wife, <strong>Stefany</strong>, and my parents. Sincere appreciation to <strong>Professor Little</strong> and <strong>Casmir</strong> for their mentorship.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
