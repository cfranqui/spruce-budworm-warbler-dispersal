import { useState } from 'react';
import { X, Copy, Check, Quote } from 'lucide-react';

interface CitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CitationModal({ isOpen, onClose }: CitationModalProps) {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  if (!isOpen) return null;

  const citations = {
    bibtex: `@misc{franqui2026sprucebudworm,
  author       = {Christopher Franqui},
  title        = {Modeling Spruce Budworm Dispersal from Quebec into Maine along with its Spatial Relationship to Bay-breasted Warbler Breeding Habitat},
  howpublished = {Maine Internship Research Program, Monroe Community College \\& University of Maine},
  year         = {2026},
  month        = {Spring},
  note         = {Supported by NSF and University of Maine}
}`,
    apa: `Franqui, C. (2026). Modeling Spruce Budworm Dispersal from Quebec into Maine along with its Spatial Relationship to Bay-breasted Warbler Breeding Habitat. Maine Internship Research Program, Monroe Community College & University of Maine.`,
    mla: `Franqui, Christopher. "Modeling Spruce Budworm Dispersal from Quebec into Maine along with its Spatial Relationship to Bay-breasted Warbler Breeding Habitat." Maine Internship Research Program, Monroe Community College and University of Maine, Spring 2026.`,
    chicago: `Franqui, Christopher. 2026. "Modeling Spruce Budworm Dispersal from Quebec into Maine along with its Spatial Relationship to Bay-breasted Warbler Breeding Habitat." Research Presentation, Maine Internship Program, Monroe Community College.`,
  };

  const handleCopy = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none">
      <div className="bg-[#161b22] border border-[#30363d] rounded-md max-w-2xl w-full p-5 shadow-2xl relative text-xs">
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 text-[#8b949e] hover:text-white p-1 rounded hover:bg-[#21262d] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-[#58a6ff] font-semibold mb-1">
          <Quote className="w-4 h-4 text-[#e3b341]" />
          <span>Research Citation</span>
        </div>
        <h3 className="text-base font-bold text-white mb-3">
          Academic Citation Formats
        </h3>

        <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1 scrollbar-thin">
          {/* BibTeX */}
          <div className="bg-[#0d1117] p-3 rounded border border-[#30363d]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold font-mono text-[#7ee787] uppercase">BibTeX</span>
              <button
                onClick={() => handleCopy(citations.bibtex, 'bibtex')}
                className="inline-flex items-center gap-1 text-[11px] text-[#c9d1d9] hover:text-white bg-[#21262d] hover:bg-[#30363d] px-2 py-0.5 rounded border border-[#30363d] transition-colors font-mono"
              >
                {copiedFormat === 'bibtex' ? <Check className="w-3 h-3 text-[#3fb950]" /> : <Copy className="w-3 h-3 text-[#79c0ff]" />}
                <span>{copiedFormat === 'bibtex' ? 'Copied' : 'Copy BibTeX'}</span>
              </button>
            </div>
            <pre className="text-[11px] font-mono text-[#c9d1d9] overflow-x-auto whitespace-pre">
              {citations.bibtex}
            </pre>
          </div>

          {/* APA */}
          <div className="bg-[#0d1117] p-3 rounded border border-[#30363d]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold font-mono text-[#79c0ff] uppercase">APA 7th Edition</span>
              <button
                onClick={() => handleCopy(citations.apa, 'apa')}
                className="inline-flex items-center gap-1 text-[11px] text-[#c9d1d9] hover:text-white bg-[#21262d] hover:bg-[#30363d] px-2 py-0.5 rounded border border-[#30363d] transition-colors font-mono"
              >
                {copiedFormat === 'apa' ? <Check className="w-3 h-3 text-[#3fb950]" /> : <Copy className="w-3 h-3 text-[#79c0ff]" />}
                <span>{copiedFormat === 'apa' ? 'Copied' : 'Copy APA'}</span>
              </button>
            </div>
            <p className="text-[11px] text-[#c9d1d9] leading-relaxed font-sans">
              {citations.apa}
            </p>
          </div>

          {/* MLA */}
          <div className="bg-[#0d1117] p-3 rounded border border-[#30363d]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold font-mono text-[#ffa657] uppercase">MLA 9th Edition</span>
              <button
                onClick={() => handleCopy(citations.mla, 'mla')}
                className="inline-flex items-center gap-1 text-[11px] text-[#c9d1d9] hover:text-white bg-[#21262d] hover:bg-[#30363d] px-2 py-0.5 rounded border border-[#30363d] transition-colors font-mono"
              >
                {copiedFormat === 'mla' ? <Check className="w-3 h-3 text-[#3fb950]" /> : <Copy className="w-3 h-3 text-[#79c0ff]" />}
                <span>{copiedFormat === 'mla' ? 'Copied' : 'Copy MLA'}</span>
              </button>
            </div>
            <p className="text-[11px] text-[#c9d1d9] leading-relaxed font-sans">
              {citations.mla}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-2.5 border-t border-[#30363d] flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-xs font-medium rounded border border-[#30363d] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
