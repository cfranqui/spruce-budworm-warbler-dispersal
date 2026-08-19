import { useState } from 'react';
import { 
  FileText, 
  Code2, 
  Map, 
  Calculator, 
  Layout, 
  Copy, 
  Check, 
  Download, 
  Quote,
  BookOpen,
  FolderGit2,
  ChevronDown
} from 'lucide-react';
import { ActiveTab, ProjectId } from '../types';
import { RAW_README_MARKDOWN as RAW_BUDWORM_MARKDOWN } from '../data/researchData';
import { RAW_CALIFORNIA_README_MARKDOWN, PROJECTS_META } from '../data/californiaResearchData';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCitation: () => void;
  activeProjectId: ProjectId;
  setActiveProjectId: (id: ProjectId) => void;
}

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onOpenCitation,
  activeProjectId,
  setActiveProjectId
}: HeaderProps) {
  const [copied, setCopied] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  const activeProject = PROJECTS_META[activeProjectId];
  const activeMarkdown = activeProjectId === 'california-migration' ? RAW_CALIFORNIA_README_MARKDOWN : RAW_BUDWORM_MARKDOWN;

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(activeMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([activeMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeProject.repoName}-README.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#161b22] border-b border-[#30363d] text-[#c9d1d9] shadow-sm select-none">
      {/* Top High Density Bar */}
      <div className="max-w-full px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 min-h-[52px]">
        
        {/* Repo Header & Project Selector */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#2f81f7] text-white rounded flex items-center justify-center font-bold text-sm shadow-sm">
            {activeProjectId === 'california-migration' ? 'CA' : 'SB'}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
              className="flex items-center gap-2 hover:bg-[#21262d] px-2 py-1 rounded transition-colors text-left border border-transparent hover:border-[#30363d]"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-sans flex-wrap">
                  <span className="text-[#8b949e]">christopherfranqui</span>
                  <span className="text-[#8b949e]">/</span>
                  <span className="font-semibold text-white tracking-tight">
                    {activeProject.repoName}
                  </span>
                  <span className="bg-[#21262d] text-[#8b949e] px-2 py-0.5 rounded-full text-[11px] font-mono border border-[#30363d] ml-1">
                    Public
                  </span>
                </div>
                <span className="text-[10px] text-[#58a6ff] font-mono">
                  Switch Project ({activeProject.badgeTag}) ▾
                </span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isProjectDropdownOpen && (
              <div className="absolute left-0 top-full mt-1 w-80 bg-[#161b22] border border-[#30363d] rounded-md shadow-2xl py-1 z-50 text-xs">
                <div className="px-3 py-1.5 border-b border-[#30363d] text-[10px] uppercase font-bold text-[#8b949e]">
                  Select Research Project
                </div>

                {/* Option 1: California */}
                <div
                  onClick={() => {
                    setActiveProjectId('california-migration');
                    setIsProjectDropdownOpen(false);
                  }}
                  className={`p-3 cursor-pointer hover:bg-[#21262d] transition-colors border-b border-[#21262d] ${
                    activeProjectId === 'california-migration' ? 'bg-[#1f242c] border-l-2 border-l-[#2f81f7]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-white">Where did Californians move? (1970–2020)</span>
                    <span className="text-[9px] bg-[#238636]/20 text-[#3fb950] px-1.5 py-0.5 rounded font-mono">
                      GEG 230 GIS
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8b949e] leading-snug">
                    ArcGIS Pro Mean Center shifts & CPI inflation-adjusted median home values.
                  </p>
                </div>

                {/* Option 2: Spruce Budworm */}
                <div
                  onClick={() => {
                    setActiveProjectId('spruce-budworm');
                    setIsProjectDropdownOpen(false);
                  }}
                  className={`p-3 cursor-pointer hover:bg-[#21262d] transition-colors ${
                    activeProjectId === 'spruce-budworm' ? 'bg-[#1f242c] border-l-2 border-l-[#2f81f7]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-white">Spruce Budworm Dispersal & Warbler Habitat</span>
                    <span className="text-[9px] bg-[#388bfd]/20 text-[#79c0ff] px-1.5 py-0.5 rounded font-mono">
                      Maine / NSF
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8b949e] leading-snug">
                    ERA5 wind reanalysis, GHCN degree-days, NOAA HYSPLIT & eBird.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Metrics Badges */}
          <div className="hidden xl:flex items-center gap-1 bg-[#0d1117] border border-[#30363d] rounded-md px-2 py-1 text-xs text-[#8b949e]">
            {activeProjectId === 'california-migration' ? (
              <>
                <span className="text-[#3fb950] font-bold">58</span>
                <span>Counties</span>
                <span className="text-[#484f58] mx-1">•</span>
                <span className="text-[#79c0ff] font-bold">6 Decades</span>
                <span>(1970–2020)</span>
              </>
            ) : (
              <>
                <span className="text-[#3fb950] font-bold">13</span>
                <span>Stations</span>
                <span className="text-[#484f58] mx-1">•</span>
                <span className="text-[#79c0ff] font-bold">July 1</span>
                <span>Synoptic Dispersal</span>
              </>
            )}
          </div>

          <button
            id="citation-btn"
            onClick={onOpenCitation}
            className="px-2.5 py-1.5 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-md text-xs font-medium text-[#c9d1d9] hover:text-white transition-colors inline-flex items-center gap-1.5"
            title="View citations in BibTeX, APA, MLA"
          >
            <Quote className="w-3.5 h-3.5 text-[#e3b341]" />
            <span className="hidden sm:inline">Cite Research</span>
          </button>

          <button
            id="copy-readme-btn"
            onClick={handleCopyMarkdown}
            className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors inline-flex items-center gap-1.5 ${
              copied
                ? 'bg-[#238636] text-white border-[#2ea043]'
                : 'bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-white border-[#30363d]'
            }`}
            title="Copy README Markdown source to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-[#79c0ff]" />}
            <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
          </button>

          <button
            id="download-readme-btn"
            onClick={handleDownloadMarkdown}
            className="px-3 py-1.5 bg-[#238636] hover:bg-[#2ea043] text-white border border-[#2ea043] rounded-md text-xs font-medium transition-colors inline-flex items-center gap-1.5 shadow-sm"
            title="Download formatted README.md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export README.md</span>
          </button>
        </div>
      </div>

      {/* High Density Tab Bar */}
      <div className="px-4 border-t border-[#30363d] bg-[#0d1117] flex items-center gap-1 overflow-x-auto scrollbar-none h-[40px]">
        <button
          id="tab-readme-rendered"
          onClick={() => setActiveTab('readme-rendered')}
          className={`h-full inline-flex items-center gap-2 px-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'readme-rendered'
              ? 'border-[#f78166] text-white bg-[#161b22]/70 font-semibold'
              : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#161b22]/40'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-[#58a6ff]" />
          <span>Rendered README</span>
        </button>

        <button
          id="tab-readme-raw"
          onClick={() => setActiveTab('readme-raw')}
          className={`h-full inline-flex items-center gap-2 px-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'readme-raw'
              ? 'border-[#f78166] text-white bg-[#161b22]/70 font-semibold'
              : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#161b22]/40'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 text-[#7ee787]" />
          <span>Raw Markdown Source</span>
        </button>

        <button
          id="tab-interactive-maps"
          onClick={() => setActiveTab('interactive-maps')}
          className={`h-full inline-flex items-center gap-2 px-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'interactive-maps'
              ? 'border-[#f78166] text-white bg-[#161b22]/70 font-semibold'
              : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#161b22]/40'
          }`}
        >
          <Map className="w-3.5 h-3.5 text-[#ffa657]" />
          <span>
            {activeProjectId === 'california-migration' ? 'ArcGIS Mean Centers & Maps' : 'GIS Maps & Trajectories'}
          </span>
        </button>

        <button
          id="tab-phenology-calc"
          onClick={() => setActiveTab('phenology-calc')}
          className={`h-full inline-flex items-center gap-2 px-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'phenology-calc'
              ? 'border-[#f78166] text-white bg-[#161b22]/70 font-semibold'
              : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#161b22]/40'
          }`}
        >
          <Calculator className="w-3.5 h-3.5 text-[#d2a8ff]" />
          <span>{activeProject.toolTabLabel}</span>
        </button>

        <button
          id="tab-poster-view"
          onClick={() => setActiveTab('poster-view')}
          className={`h-full inline-flex items-center gap-2 px-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'poster-view'
              ? 'border-[#f78166] text-white bg-[#161b22]/70 font-semibold'
              : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#161b22]/40'
          }`}
        >
          <Layout className="w-3.5 h-3.5 text-[#ff7b72]" />
          <span>Poster Layout</span>
        </button>
      </div>
    </header>
  );
}
