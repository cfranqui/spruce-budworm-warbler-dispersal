import { useState } from 'react';
import Header from './components/Header';
import MarkdownViewer from './components/MarkdownViewer';
import InteractiveMapExplorer from './components/InteractiveMapExplorer';
import PhenologyCalculator from './components/PhenologyCalculator';
import PosterOverview from './components/PosterOverview';
import CitationModal from './components/CitationModal';
import { ActiveTab } from './types';
import { GitBranch, Check, Terminal, Radio } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('readme-rendered');
  const [isCitationOpen, setIsCitationOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col font-sans selection:bg-[#2f81f7] selection:text-white pb-[26px]">
      {/* High Density Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCitation={() => setIsCitationOpen(true)}
      />

      {/* Main Tab Content Container */}
      <main className="flex-1 overflow-x-hidden">
        {activeTab === 'readme-rendered' && <MarkdownViewer mode="rendered" />}
        {activeTab === 'readme-raw' && <MarkdownViewer mode="raw" />}
        {activeTab === 'interactive-maps' && <InteractiveMapExplorer />}
        {activeTab === 'phenology-calc' && <PhenologyCalculator />}
        {activeTab === 'poster-view' && <PosterOverview />}
      </main>

      {/* Citation Modal */}
      <CitationModal
        isOpen={isCitationOpen}
        onClose={() => setIsCitationOpen(false)}
      />

      {/* High Density IDE Status Bar (Footer) */}
      <footer className="fixed bottom-0 left-0 right-0 h-[26px] bg-[#2f81f7] text-white flex items-center px-3 justify-between text-[11px] font-mono z-50 shadow-md select-none border-t border-[#388bfd]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
            <GitBranch className="w-3 h-3" />
            <span className="font-semibold">main</span>
          </div>
          <span className="text-white/40">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
            <span>ERA5 / HYSPLIT / eBird Synoptic Synchronized</span>
          </div>
          <span className="text-white/40 hidden sm:inline">|</span>
          <span className="text-white/80 hidden sm:inline">Christopher Franqui (MCC / UMaine / NSF)</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors hidden md:inline">
            UTF-8
          </span>
          <span className="hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
            Markdown (GFM)
          </span>
          <span className="hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
            {activeTab === 'readme-rendered' && 'View: Rendered'}
            {activeTab === 'readme-raw' && 'View: Raw Source'}
            {activeTab === 'interactive-maps' && 'View: GIS Overlays'}
            {activeTab === 'phenology-calc' && 'View: Degree-Day Engine'}
            {activeTab === 'poster-view' && 'View: Research Poster'}
          </span>
        </div>
      </footer>
    </div>
  );
}

