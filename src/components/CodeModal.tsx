import React, { useState } from 'react';
import { X, Copy, Check, Terminal, FileCode2 } from 'lucide-react';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  filename: string;
  language: string;
  code: string;
}

export const CodeModal: React.FC<CodeModalProps> = ({
  isOpen,
  onClose,
  title,
  filename,
  language,
  code
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl card-panel rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 bg-[#0a0e17] text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="code-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0d1424] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h3 id="code-modal-title" className="text-sm font-bold text-slate-100">{title}</h3>
              <p className="text-xs font-mono text-slate-400">{filename}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code View Canvas */}
        <div className="p-6 max-h-[60vh] overflow-y-auto font-mono text-xs leading-relaxed bg-[#060911] text-blue-200 select-text">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Language: <span className="text-slate-200 uppercase">{language}</span>
            </span>
            <span>DecodeLabs Config Template</span>
          </div>

          <pre className="overflow-x-auto p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 font-mono">
            <code>{code}</code>
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#0d1424] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>DecodeLabs Production Specification</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-semibold transition-colors"
          >
            Done Viewing
          </button>
        </div>
      </div>
    </div>
  );
};
