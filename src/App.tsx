import { useState } from 'react';
import Header from './components/Header';
import MarkdownViewer from './components/MarkdownViewer';
import InteractiveMapExplorer from './components/InteractiveMapExplorer';
import PhenologyCalculator from './components/PhenologyCalculator';
import PosterOverview from './components/PosterOverview';
import CaliforniaMapExplorer from './components/CaliforniaMapExplorer';
import CaliforniaAffordabilityCalculator from './components/CaliforniaAffordabilityCalculator';
import CaliforniaPosterOverview from './components/CaliforniaPosterOverview';
import CitationModal from './components/CitationModal';
import { ActiveTab, ProjectId } from './types';
import { PROJECTS_META } from './data/californiaResearchData';
import { GitBranch, Check, Terminal, Radio } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('readme-rendered');
  const [activeProjectId, setActiveProjectId] = useState<ProjectId>('california-migration');
  const [isCitationOpen, setIsCitationOpen] = useState<boolean>(false);

  const currentProject = PROJECTS_META[activeProjectId];

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col font-sans selection:bg-[#2f81f7] selection:text-white pb-[26px]">
      {/* High Density Navigation Header with Project Switcher */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCitation={() => setIsCitationOpen(true)}
        activeProjectId={activeProjectId}
        setActiveProjectId={setActiveProjectId}
      />

      {/* Main Tab Content Container */}
      <main className="flex-1 overflow-x-hidden">
        {activeTab === 'readme-rendered' && (
          <MarkdownViewer mode="rendered" projectId={activeProjectId} />
        )}
        {activeTab === 'readme-raw' && (
          <MarkdownViewer mode="raw" projectId={activeProjectId} />
        )}

        {/* Tab 3: Interactive Maps & Spatial Analytics */}
        {activeTab === 'interactive-maps' && (
          activeProjectId === 'california-migration' ? (
            <CaliforniaMapExplorer />
          ) : (
            <InteractiveMapExplorer />
          )
        )}

        {/* Tab 4: Domain Calculation Tool */}
        {activeTab === 'phenology-calc' && (
          activeProjectId === 'california-migration' ? (
            <CaliforniaAffordabilityCalculator />
          ) : (
            <PhenologyCalculator />
          )
        )}

        {/* Tab 5: Poster Overview */}
        {activeTab === 'poster-view' && (
          activeProjectId === 'california-migration' ? (
            <CaliforniaPosterOverview />
          ) : (
            <PosterOverview />
          )
        )}
      </main>

      {/* Citation Modal */}
      <CitationModal
        isOpen={isCitationOpen}
        onClose={() => setIsCitationOpen(false)}
        projectId={activeProjectId}
      />

      {/* High Density IDE Status Bar (Footer) */}
      <footer className="fixed bottom-0 left-0 right-0 h-[26px] bg-[#2f81f7] text-white flex items-center px-3 justify-between text-[11px] font-mono z-50 shadow-md select-none border-t border-[#388bfd]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
            <GitBranch className="w-3 h-3" />
            <span className="font-semibold">main</span>
          </div>
          <span className="text-white/40">|</span>
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse shrink-0" />
            <span className="truncate">
              {activeProjectId === 'california-migration'
                ? 'ArcGIS Pro / IPUMS NHGIS / BLS CPI-U Synchronized'
                : 'ERA5 / HYSPLIT / eBird Synoptic Synchronized'}
            </span>
          </div>
          <span className="text-white/40 hidden sm:inline">|</span>
          <span className="text-white/80 hidden sm:inline">{currentProject.author} ({currentProject.course})</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors hidden md:inline">
            UTF-8
          </span>
          <span className="hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
            Markdown (GFM)
          </span>
          <span className="hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors hidden sm:inline">
            {activeTab === 'readme-rendered' && 'View: Rendered README'}
            {activeTab === 'readme-raw' && 'View: Raw Source'}
            {activeTab === 'interactive-maps' && 'View: GIS Maps'}
            {activeTab === 'phenology-calc' && `View: ${currentProject.toolTabLabel}`}
            {activeTab === 'poster-view' && 'View: Presentation Poster'}
          </span>
        </div>
      </footer>
    </div>
  );
}
