import { Compass, FileText, Database, CheckCircle2, Lightbulb, Users, MapPin, Award } from 'lucide-react';

export default function CaliforniaPosterOverview() {
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
              GEG 230
            </span>
            <span className="px-2 py-0.5 bg-[#21262d] text-[#7ee787] border border-[#30363d] rounded font-bold">
              Spatial Analysis & GIS
            </span>
          </div>

          <span className="text-[#8b949e]">
            Spring 2026 Academic Research Presentation
          </span>
        </div>

        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight leading-snug max-w-5xl">
          Where did Californians move? Tracking shifting population center and home values from 1970-2020
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs">
          <span className="font-semibold text-[#58a6ff]">Christopher Franqui</span>
          <span className="text-[#8b949e]">•</span>
          <span className="text-[#8b949e]">GEG 230, Spatial Analysis and GIS Spring 2026, Monroe Community College</span>
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
              How has California’s population distribution changed between 1970 and 2020, and how have changes in home affordability influenced these shifts?
            </p>
          </div>

          {/* Background */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 shadow-sm space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#ffa657] uppercase font-mono mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Background</span>
            </div>
            <p className="text-[#c9d1d9] leading-relaxed">
              For over two centuries, the American West has captured the imagination of settlers, adventurers, and scientists, drawing generations across the mighty Mississippi River to build towns, farms, and cities that fundamentally reshaped how cartographers and geographers understood the United States.
            </p>
            <p className="text-[#c9d1d9] leading-relaxed">
              That westward pull hasn’t ended. California, the destination of this westward expansion, has seen similar changes reflected in its own internal migration. With the population steadily moving away from coastal urban centers toward inland areas and the Central Valley. This project examines the internal pull and the forces driving it.
            </p>
          </div>

          {/* Results */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 shadow-sm space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#79c0ff] uppercase font-mono mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Results</span>
            </div>
            <p className="text-[#c9d1d9] leading-relaxed">
              My data shows that in the last fifty years California has seen its population move southeast between the decades, 1970-2020. When LA County is remitted as part of the mean, the mean center moves up a county. However it continues to gradually move south.
            </p>
            <p className="text-[#c9d1d9] leading-relaxed">
              When both LA County and Counties in The Bay Area are remitted, the mean center looks similar to how the mean would without LA County included.
            </p>
            <p className="text-[#c9d1d9] leading-relaxed">
              <strong>Riverside and San Bernardino</strong> counties saw the largest percent of population growth. In comparison counties located along the coast, such as Los Angeles and San Francisco saw the slowest amount of growth.
            </p>
            <p className="text-[#c9d1d9] leading-relaxed">
              Home values in the Bay Area grew substantially, reaching past 1 million dollars in 2020. Home values in the Central Valley and inland California remained in comparison relatively low, even after the prices were adjusted.
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
            <p className="text-[#c9d1d9] leading-relaxed">
              To collect my data, I used county population data (1970-2020) and median home values (1990, 2016-2020 ACS) from <strong>IPUMS NHGIS</strong>. This data was placed into ArcGIS, where it was joined to the 2020 TIGER/Line county boundaries.
            </p>
            <p className="text-[#c9d1d9] leading-relaxed">
              To calculate the median home value, I obtained home value data from 1990 and 2020 (sourced from the American Community Survey). I joined the data together to my county shapefile. In order to calculate the changes, I used Field calculator to obtain values that could be adjusted to the cost in 2020.
            </p>
            <p className="text-[#c9d1d9] leading-relaxed">
              The map used the projection: <strong>California Albers (EPSG 3310)</strong> to calculate the population weight center for each decade. The <strong>mean center tool</strong> was used. The <strong>point to line tool</strong> was used to connect the six points from the years 1970, 1980, 1990, 2000, 2010, 2020.
            </p>
            <p className="text-[#c9d1d9] leading-relaxed">
              I repeated these steps two more times: remitting LA County from the mean, and remitting both LA County and counties in the Bay Area. The same price range and colors were used for both maps.
            </p>
          </div>

          {/* Six Map Panel Summary */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-md p-3.5 space-y-2 text-xs font-mono">
            <div className="text-[11px] font-bold text-[#8b949e] uppercase">
              Six Poster Cartographic Figures
            </div>

            <div className="bg-[#161b22] p-2 rounded border border-[#30363d]">
              <span className="text-[#388bfd] font-bold block">Figure 1: Mean Center (1970–2020)</span>
              <span className="text-[10px] text-[#8b949e]">All 58 counties weighted mean center moving southeast.</span>
            </div>

            <div className="bg-[#161b22] p-2 rounded border border-[#30363d]">
              <span className="text-[#ffa657] font-bold block">Figure 2: Mean Center Without LA County</span>
              <span className="text-[10px] text-[#8b949e]">Mean center moves up 1 county north, continues south track.</span>
            </div>

            <div className="bg-[#161b22] p-2 rounded border border-[#30363d]">
              <span className="text-[#d2a8ff] font-bold block">Figure 3: Without LA and Bay Area</span>
              <span className="text-[10px] text-[#8b949e]">Tracks similar path as Without LA County.</span>
            </div>

            <div className="bg-[#161b22] p-2 rounded border border-[#30363d]">
              <span className="text-[#238636] font-bold block">Figure 4: Population Change % (1970–2020)</span>
              <span className="text-[10px] text-[#8b949e]">Inland Empire surges (Riverside/San Bernardino), coast slows.</span>
            </div>

            <div className="bg-[#161b22] p-2 rounded border border-[#30363d]">
              <span className="text-[#79c0ff] font-bold block">Figures 5 & 6: 1990 vs 2020 Home Values</span>
              <span className="text-[10px] text-[#8b949e]">Standardized 4-class graduated color ramp (2020 dollars).</span>
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
              California’s changes regarding its population and home value in many respects are reflective of what is being seen across the country. Larger cities have an impact on the population mean center as shown when we include LA County as part of the mean center.
            </p>
            <p className="text-[#c9d1d9] leading-relaxed">
              When LA County is not included our analysis, the population mean center moves up by one county north. However it still projects movement which points south. The same movement is projected when both LA County and several counties that consist of the Bay Area are remitted from the mean Center.
            </p>
            <p className="text-[#c9d1d9] leading-relaxed">
              When the price of a home grew in value, population growth slowed. Where home prices remained relatively affordable, the population grew. We can therefore conclude that as long as the economic gap between rich and poor grows, California will continue to see a shift in its population. In the case of California, this will mean further population growth inland in places like <strong>Calaveras, Madera, and Mono</strong>.
            </p>
          </div>

          {/* References & Data Sources */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 shadow-sm space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#e3b341] uppercase font-mono mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>References & Data Sources</span>
            </div>
            <p className="text-[#8b949e] leading-relaxed text-[11px]">
              <strong>Data:</strong> Decennial Census Population (1970–2020) and Median Home Values (1990 STF3 Table NH61A; 2016–2020 ACS Table B25077), accessed via IPUMS NHGIS (Manson et al., 2025; nhgis.org).
            </p>
            <p className="text-[#8b949e] leading-relaxed text-[11px]">
              <strong>County Boundaries:</strong> U.S. Census Bureau TIGER/Line Cartographic Boundary Files, 2020.
            </p>
            <p className="text-[#8b949e] leading-relaxed text-[11px]">
              <strong>Inflation Adjustment:</strong> U.S. Bureau of Labor Statistics CPI. <strong>Software:</strong> Esri ArcGIS Pro.
            </p>
          </div>

          {/* Acknowledgements */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3.5 shadow-sm space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#3fb950] uppercase font-mono mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>Acknowledgements</span>
            </div>
            <p className="text-[#c9d1d9] leading-relaxed">
              I want to thank <strong>Stef</strong> for everything she has contributed as part of this project. Whether it was hearing me wake up in the middle of the night to ask about a color for the map or whether it was listening to me talk about home values in California. She has been there.
            </p>
            <p className="text-[#c9d1d9] leading-relaxed">
              I also want to thank <strong>Professor Pierce</strong> for her part in this project as well. Thank you so much for always listening, helping and challenging me to always think outside of the box. Thank you for being such an amazing Professor.
            </p>
            <p className="text-[#c9d1d9] leading-relaxed">
              Thank you to my parents, <strong>Ana and David</strong> for everything that they have done for me regarding my classes and the support they have provided.
            </p>
            <p className="text-[#c9d1d9] leading-relaxed">
              I also want to give an acknowledgement to <strong>Hoda Mitwally</strong> and <strong>William T Flynn</strong> from the Queens Legal Services NYC/Queens. The work you do is so amazing and I cannot thank you enough for your work. Also a large shout out to <strong>Stacey Pheffer Amato</strong> and the work her staff has done.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
