import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Search, Download, BookOpen, ExternalLink, Hash, List, Code2, Eye, Split } from 'lucide-react';
import { RAW_README_MARKDOWN as RAW_BUDWORM_MARKDOWN } from '../data/researchData';
import { RAW_CALIFORNIA_README_MARKDOWN, PROJECTS_META } from '../data/californiaResearchData';
import { ProjectId } from '../types';

interface MarkdownViewerProps {
  mode: 'rendered' | 'raw';
  projectId: ProjectId;
}

export default function MarkdownViewer({ mode: initialMode, projectId }: MarkdownViewerProps) {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewLayout, setViewLayout] = useState<'split' | 'rendered' | 'raw'>(
    initialMode === 'raw' ? 'raw' : 'split'
  );
  const [activeSectionId, setActiveSectionId] = useState<string>('summary');

  const activeProject = PROJECTS_META[projectId];
  const markdownContent = projectId === 'california-migration' ? RAW_CALIFORNIA_README_MARKDOWN : RAW_BUDWORM_MARKDOWN;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeProject.repoName}-README.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sectionsBudworm = [
    { title: 'Title & Badges', icon: '#', color: 'text-blue-400', tag: 'Header', id: 'spruce-budworm-warbler-dispersal' },
    { title: 'Executive Summary', icon: '[]', color: 'text-green-400', tag: 'Core', id: '-executive-summary--research-question' },
    { title: 'Ecological Background', icon: '$', color: 'text-orange-400', tag: 'Ecology', id: '-ecological--atmospheric-background' },
    { title: 'Study Area & Domain', icon: '>', color: 'text-cyan-400', tag: 'GIS', id: '-study-area--geospatial-domain' },
    { title: 'Methodology & Pipeline', icon: '⚙', color: 'text-purple-400', tag: 'Methods', id: '-methodology--analytical-pipeline' },
    { title: 'Repository Structure', icon: '📁', color: 'text-yellow-400', tag: 'Code', id: '-repository-structure' },
    { title: 'Data Sources & Access', icon: '💾', color: 'text-blue-400', tag: 'Data', id: '-data-sources--access' },
    { title: 'Installation & Setup', icon: '$', color: 'text-orange-400', tag: 'Setup', id: '-installation--setup' },
    { title: 'Execution & Reproducibility', icon: '>_', color: 'text-purple-400', tag: 'Commands', id: '-execution--reproducibility' },
    { title: 'Results & 3 Maps', icon: '📊', color: 'text-emerald-400', tag: 'Results', id: '-key-results--findings' },
    { title: 'Predation Release Discussion', icon: '♥', color: 'text-red-400', tag: 'Discussion', id: '-ecological-discussion--predation-release-hypothesis' },
    { title: 'Future Directions', icon: '🔭', color: 'text-cyan-400', tag: 'Future', id: '-future-work--research-directions' },
    { title: 'References & BibTeX', icon: '©', color: 'text-yellow-400', tag: 'Citations', id: '-references--data-citations' },
    { title: 'Acknowledgements', icon: '★', color: 'text-rose-400', tag: 'Authors', id: '-acknowledgements' },
  ];

  const sectionsCalifornia = [
    { title: 'Title & Badges', icon: '#', color: 'text-blue-400', tag: 'Header', id: 'where-did-californians-move' },
    { title: 'Executive Summary', icon: '[]', color: 'text-green-400', tag: 'Core', id: '-executive-summary' },
    { title: 'Research Question', icon: '?', color: 'text-emerald-400', tag: 'Question', id: '-research-question' },
    { title: 'Background & Westward Pull', icon: '$', color: 'text-orange-400', tag: 'History', id: '-background--historical-context' },
    { title: 'Data Sources & Projection', icon: '💾', color: 'text-cyan-400', tag: 'NHGIS', id: '-data-sources--geospatial-architecture' },
    { title: 'Methodology & Pipeline', icon: '⚙', color: 'text-purple-400', tag: 'ArcGIS', id: '-methodology--analytical-pipeline' },
    { title: 'Inflation Normalization', icon: '💲', color: 'text-yellow-400', tag: 'CPI-U', id: '2-inflation-normalization-field-calculator' },
    { title: 'Spatial Statistics: Mean Center', icon: '📍', color: 'text-blue-400', tag: 'Stats', id: '3-spatial-statistics-mean-center--trajectory-analysis' },
    { title: 'Sensitivity Tests (No LA/Bay)', icon: '🔬', color: 'text-indigo-400', tag: 'Sensitivity', id: '4-sensitivity-testing-excluding-la--bay-area' },
    { title: 'Repository Structure', icon: '📁', color: 'text-yellow-400', tag: 'Code', id: '-repository-structure' },
    { title: 'Key Results & 6 Maps', icon: '📊', color: 'text-emerald-400', tag: 'Results', id: '-key-results--maps' },
    { title: 'Economic Discussion', icon: '💬', color: 'text-red-400', tag: 'Discussion', id: '-ecological--economic-discussion' },
    { title: 'Installation & Python Code', icon: '>_', color: 'text-purple-400', tag: 'Code', id: '-installation--reproducibility' },
    { title: 'References & BibTeX', icon: '©', color: 'text-yellow-400', tag: 'Citations', id: '-references--data-citations' },
    { title: 'Acknowledgements', icon: '★', color: 'text-rose-400', tag: 'Authors', id: '-acknowledgements' },
  ];

  const sections = projectId === 'california-migration' ? sectionsCalifornia : sectionsBudworm;

  const lines = markdownContent.split('\n');
  const filteredLines = searchTerm
    ? lines.map((l, idx) => ({ text: l, idx })).filter(item => item.text.toLowerCase().includes(searchTerm.toLowerCase()))
    : lines.map((l, idx) => ({ text: l, idx }));

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-92px)] min-h-[640px] bg-[#0d1117] text-[#c9d1d9] overflow-hidden border-b border-[#30363d]">
      
      {/* High Density Left Sidebar: Component Library / Document Structure */}
      <aside className="w-full lg:w-[260px] border-r border-[#30363d] bg-[#0d1117] flex flex-col shrink-0">
        <div className="p-3 border-b border-[#30363d] flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#8b949e] uppercase tracking-wider">
            README Structure
          </span>
          <span className="text-[10px] font-mono bg-[#21262d] text-[#8b949e] px-1.5 py-0.5 rounded border border-[#30363d]">
            {sections.length} Units
          </span>
        </div>

        {/* Section List */}
        <div className="flex-1 p-2 space-y-1 overflow-y-auto scrollbar-thin">
          {sections.map((sec) => (
            <div
              key={sec.id}
              onClick={() => setActiveSectionId(sec.id)}
              className={`flex items-center justify-between p-2 rounded cursor-pointer transition-all text-xs ${
                activeSectionId === sec.id
                  ? 'bg-[#1f242c] border border-[#30363d] text-white font-medium shadow-sm'
                  : 'hover:bg-[#161b22] border border-transparent text-[#8b949e] hover:text-[#c9d1d9]'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className={`font-mono text-xs font-bold ${sec.color}`}>{sec.icon}</span>
                <span className="truncate">{sec.title}</span>
              </div>
              <span className="text-[9px] font-mono uppercase text-[#484f58] ml-1 bg-[#161b22] px-1 py-0.5 rounded">
                {sec.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Sidebar Completion & Meta Widget */}
        <div className="p-3 border-t border-[#30363d] bg-[#161b22]/40">
          <div className="flex justify-between items-center text-[10px] text-[#8b949e] mb-1.5 font-mono">
            <span>DOCUMENTATION INTEGRITY</span>
            <span className="text-[#3fb950] font-bold">100% COMPLETE</span>
          </div>
          <div className="w-full bg-[#30363d] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#238636] h-full w-[100%]" />
          </div>
          <div className="mt-2 text-[10px] text-[#8b949e] flex justify-between font-mono">
            <span>Lines: {lines.length}</span>
            <span>Course: {projectId === 'california-migration' ? 'GEG 230' : 'Maine/NSF'}</span>
          </div>
        </div>
      </aside>

      {/* Main Workspace Area (Split / Raw / Rendered) */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#0d1117]">
        
        {/* Workspace Toolbar */}
        <div className="px-4 py-2 bg-[#161b22] border-b border-[#30363d] flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[#8b949e] text-xs font-semibold">
              {activeProject.repoName}/README.md
            </span>
            <div className="hidden sm:flex gap-3 text-[11px] text-[#8b949e] font-mono">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#238636]" />
                UTF-8
              </span>
              <span>Markdown (GFM)</span>
              <span>{sections.length} Sections</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Search / Filter */}
            <div className="relative">
              <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8b949e]" />
              <input
                type="text"
                placeholder="Filter lines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] text-xs rounded pl-7 pr-2.5 py-1 focus:outline-none focus:border-[#58a6ff] w-32 sm:w-44 placeholder-[#484f58]"
              />
            </div>

            {/* Layout Toggle Buttons */}
            <div className="flex items-center bg-[#0d1117] border border-[#30363d] rounded p-0.5">
              <button
                onClick={() => setViewLayout('split')}
                className={`p-1 rounded text-xs transition-colors ${
                  viewLayout === 'split' ? 'bg-[#21262d] text-white' : 'text-[#8b949e] hover:text-[#c9d1d9]'
                }`}
                title="Split View (Editor + Live Preview)"
              >
                <Split className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewLayout('raw')}
                className={`p-1 rounded text-xs transition-colors ${
                  viewLayout === 'raw' ? 'bg-[#21262d] text-white' : 'text-[#8b949e] hover:text-[#c9d1d9]'
                }`}
                title="Source Code Only"
              >
                <Code2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewLayout('rendered')}
                className={`p-1 rounded text-xs transition-colors ${
                  viewLayout === 'rendered' ? 'bg-[#21262d] text-white' : 'text-[#8b949e] hover:text-[#c9d1d9]'
                }`}
                title="Rendered Document Only"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="px-2.5 py-1 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] hover:text-white rounded text-xs font-medium transition-colors inline-flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#3fb950]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Content Pane Layout */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Pane 1: Code Editor (Shown in Split & Raw modes) */}
          {(viewLayout === 'split' || viewLayout === 'raw') && (
            <div className={`flex-1 font-mono text-[12px] sm:text-[13px] leading-relaxed bg-[#0d1117] border-r border-[#30363d] overflow-y-auto p-3 scrollbar-thin select-text`}>
              {filteredLines.map(({ text, idx }) => {
                const isH1 = text.startsWith('# ');
                const isH2 = text.startsWith('## ');
                const isH3 = text.startsWith('### ');
                const isCodeBlock = text.startsWith('```');
                const isBadge = text.includes('[![');
                const isCommand = text.startsWith('python ') || text.startsWith('Rscript ') || text.startsWith('pip ') || text.startsWith('git ');

                let lineClass = 'text-[#c9d1d9]';
                if (isH1) lineClass = 'text-[#79c0ff] font-bold text-sm';
                else if (isH2) lineClass = 'text-[#79c0ff] font-semibold';
                else if (isH3) lineClass = 'text-[#58a6ff]';
                else if (isCodeBlock) lineClass = 'text-[#a5d6ff]';
                else if (isCommand) lineClass = 'text-[#ffa657] font-semibold';
                else if (isBadge) lineClass = 'text-[#7ee787]';

                return (
                  <div key={idx} className="flex hover:bg-[#161b22] py-0.5 group">
                    <span className="text-[#484f58] text-right w-8 pr-3 select-none shrink-0 group-hover:text-[#8b949e] font-mono text-[11px]">
                      {idx + 1}
                    </span>
                    <span className={`whitespace-pre flex-1 font-mono ${lineClass}`}>
                      {text || '\u00A0'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pane 2: Live Rendered Preview (Shown in Split & Rendered modes) */}
          {(viewLayout === 'split' || viewLayout === 'rendered') && (
            <div className={`${viewLayout === 'split' ? 'w-full lg:w-[48%]' : 'w-full'} bg-[#0d1117] flex flex-col overflow-hidden`}>
              
              {/* Preview Sub-Header with Traffic Light Dots */}
              <div className="px-4 py-1.5 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between text-xs shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  <span className="ml-1.5 text-[11px] font-semibold text-[#8b949e] uppercase font-mono">
                    LIVE GITHUB PREVIEW
                  </span>
                </div>
                <button
                  onClick={handleDownload}
                  className="text-[11px] text-[#58a6ff] hover:underline inline-flex items-center gap-1 font-mono"
                >
                  <Download className="w-3 h-3" />
                  <span>Download .md</span>
                </button>
              </div>

              {/* Rendered Markdown Body */}
              <div className="flex-1 p-6 overflow-y-auto scrollbar-thin bg-[#0d1117] text-[#c9d1d9] leading-relaxed text-sm">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children, ...props }) => (
                      <h1 className="text-xl sm:text-2xl font-bold text-white pb-2 border-b border-[#30363d] mt-2 mb-4" {...props}>
                        {children}
                      </h1>
                    ),
                    h2: ({ children, ...props }) => (
                      <h2 className="text-lg sm:text-xl font-bold text-white pb-1.5 border-b border-[#30363d] mt-6 mb-3" {...props}>
                        {children}
                      </h2>
                    ),
                    h3: ({ children, ...props }) => (
                      <h3 className="text-base font-semibold text-[#79c0ff] mt-4 mb-2" {...props}>
                        {children}
                      </h3>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-3 rounded border border-[#30363d]">
                        <table className="min-w-full text-xs text-left">{children}</table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-[#30363d] bg-[#161b22] p-2 text-[#f0f6fc] font-semibold">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-[#30363d] p-2 text-[#c9d1d9]">
                        {children}
                      </td>
                    ),
                    pre: ({ children }) => (
                      <div className="my-3 rounded overflow-hidden border border-[#30363d] bg-[#161b22]">
                        <pre className="p-3 text-xs font-mono text-[#7ee787] overflow-x-auto">
                          {children}
                        </pre>
                      </div>
                    ),
                    code: ({ children }) => (
                      <code className="bg-[#afb8c133] text-[#f0f6fc] px-1 py-0.5 rounded text-xs font-mono">
                        {children}
                      </code>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="my-3 p-3 border-l-4 border-[#2f81f7] bg-[#161b22]/60 rounded-r text-[#8b949e] text-xs">
                        {children}
                      </blockquote>
                    ),
                    a: ({ children, href }) => (
                      <a href={href} className="text-[#58a6ff] hover:underline" target="_blank" rel="noreferrer">
                        {children}
                      </a>
                    ),
                  }}
                >
                  {markdownContent}
                </ReactMarkdown>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
