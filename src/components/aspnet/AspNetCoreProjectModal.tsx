import React, { useState } from 'react';
import { 
  X, 
  Code, 
  Copy, 
  Check, 
  Database, 
  FolderTree, 
  FileCode, 
  FileText, 
  Sparkles,
  Terminal,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { aspnetCoreFiles, sqlServerScript } from '../../data/aspnetCoreProject';

export const AspNetCoreProjectModal: React.FC = () => {
  const { activeModal, setActiveModal, showToast } = useStore();
  const [selectedFileId, setSelectedFileId] = useState<string>(aspnetCoreFiles[0].id);
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'Controllers' | 'Models' | 'Data' | 'Views' | 'Services' | 'Root'>('all');

  if (activeModal !== 'aspnetCore') return null;

  const selectedFile = aspnetCoreFiles.find(f => f.id === selectedFileId) || aspnetCoreFiles[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    showToast(`Copied ${selectedFile.name} to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredFiles = activeCategory === 'all' 
    ? aspnetCoreFiles 
    : aspnetCoreFiles.filter(f => f.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-[#0e1017] border border-[#383428] rounded-3xl w-full max-w-6xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222430] bg-[#141620]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/30">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-luxury text-base text-white font-bold">
                  ASP.NET Core MVC Solution & SQL Server Database
                </h2>
                <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded font-mono border border-sky-800">
                  .NET 8.0 / C# 12 / EF Core 8
                </span>
              </div>
              <p className="text-xs text-[#9d9b91]">
                Complete production codebase: DbContext, Models, Controllers, Razor Views & T-SQL Scripts
              </p>
            </div>
          </div>
          <button
            id="close-aspnet-modal-btn"
            onClick={() => setActiveModal(null)}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-[#20222d] bg-[#11131b] px-6 gap-2 overflow-x-auto py-2 text-xs">
          {[
            { id: 'all', label: 'All Files (17)' },
            { id: 'Root', label: 'Program & Config' },
            { id: 'Data', label: 'DbContext & SQL' },
            { id: 'Models', label: 'Domain Entities' },
            { id: 'Controllers', label: 'C# MVC Controllers' },
            { id: 'Views', label: 'Razor Views (.cshtml)' },
            { id: 'Services', label: 'Pricing Engine' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-[#d4af37] text-black font-bold'
                  : 'text-[#9e9c94] hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Master-Detail Code Explorer */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* File Explorer Tree (Left 4 cols) */}
          <div className="md:col-span-4 border-r border-[#20222d] bg-[#0c0d13] p-4 overflow-y-auto max-h-[70vh] space-y-1.5">
            <span className="text-[10px] font-bold text-[#777] uppercase tracking-wider block mb-2">
              Solution Explorer: LuxoraJewels.sln
            </span>

            {filteredFiles.map(file => (
              <button
                key={file.id}
                onClick={() => setSelectedFileId(file.id)}
                className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                  selectedFileId === file.id
                    ? 'bg-[#202332] text-white border border-[#3d425a] shadow'
                    : 'text-[#8c8a82] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {file.name.endsWith('.sql') ? (
                    <Database className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  ) : file.name.endsWith('.cshtml') ? (
                    <FileText className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : file.name.endsWith('.cs') ? (
                    <FileCode className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  ) : (
                    <Terminal className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  )}
                  <span className="font-mono truncate">{file.name}</span>
                </div>
                <span className="text-[9px] text-[#666] uppercase px-1.5 py-0.5 rounded bg-black/40">
                  {file.category}
                </span>
              </button>
            ))}

            {/* Quick Testing Instructions Box */}
            <div className="mt-4 p-3 rounded-xl bg-[#141622] border border-[#272938] space-y-2 text-[11px] text-[#999]">
              <span className="font-bold text-[#d4af37] block">EF Core CLI Commands:</span>
              <code className="block bg-black/50 p-1.5 rounded font-mono text-sky-300 text-[10px]">
                dotnet ef migrations add InitialCreate<br/>
                dotnet ef database update
              </code>
            </div>
          </div>

          {/* Active File Code Viewer (Right 8 cols) */}
          <div className="md:col-span-8 flex flex-col bg-[#07080c] overflow-hidden">
            {/* Code Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#1c1e28] bg-[#0c0d13]">
              <div className="flex items-center gap-2 text-xs font-mono text-white truncate">
                <span className="text-[#888]">{selectedFile.path}</span>
                <ChevronRight className="w-3 h-3 text-[#555]" />
                <span className="text-sky-400 font-bold">{selectedFile.name}</span>
              </div>

              <button
                id="btn-copy-code-file"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#191b26] hover:bg-[#252838] text-white text-xs font-medium transition-colors"
                title="Copy entire code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#d4af37]" />}
                <span>{copied ? 'Copied' : 'Copy File'}</span>
              </button>
            </div>

            {/* Code Display Container */}
            <div className="p-5 flex-1 overflow-auto max-h-[65vh] font-mono text-xs leading-relaxed text-[#c7cbd6]">
              <pre className="whitespace-pre">
                <code>{selectedFile.content}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-[#1e202b] bg-[#0e1017] flex flex-col sm:flex-row items-center justify-between text-xs text-[#777] gap-2">
          <span>Enterprise-grade ASP.NET Core MVC Pattern with Repository & Entity Framework Core</span>
          <div className="flex items-center gap-4 text-sky-400">
            <span>Dependency Injection (DI)</span>
            <span>•</span>
            <span>Razor Tag Helpers</span>
            <span>•</span>
            <span>LINQ Optimized Queries</span>
          </div>
        </div>
      </div>
    </div>
  );
};
