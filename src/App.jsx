import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Smartphone,
  Monitor,
  Copy,
  Download,
  Moon,
  Sun,
  Zap,
  Cpu,
  CheckCircle2,
  Terminal,
  GripVertical,
  ChevronRight,
  Layers,
  Sparkles,
  ArrowRightLeft,
  Share2,
  Play,
  ArrowRight
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import { ConversionEngine } from './lib/engine/converter';

const DEFAULT_CODE = `<div class="flex flex-col items-center p-8 bg-blue-600 rounded-2xl shadow-2xl max-w-sm">
  <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-xl border border-white/30">
    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  </div>
  <h1 class="text-white text-2xl font-bold tracking-tight">Convert-Pixel</h1>
  <p class="text-blue-100 mt-2 text-center text-sm leading-relaxed">
    Precision-engineered conversion for the next generation of web and mobile apps.
  </p>
  <button class="mt-6 px-8 py-2.5 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all active:scale-95 shadow-lg">
    Activate Engine
  </button>
</div>`;

const App = () => {
  const [inputCode, setInputCode] = useState(DEFAULT_CODE);
  const [outputCode, setOutputCode] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('html');
  const [targetFramework, setTargetFramework] = useState('flutter');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('code');
  const [mobileActiveTab, setMobileActiveTab] = useState('input');
  const [isConverting, setIsConverting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [splitWidth, setSplitWidth] = useState(50);
  const [deviceMode, setDeviceMode] = useState('mobile');
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const isDragging = useRef(false);

  useEffect(() => {
    // Initial conversion
    handleConvert();
  }, []);

  const handleConvert = () => {
    setIsConverting(true);
    // Simulate engine processing
    setTimeout(() => {
      const engine = new ConversionEngine(targetFramework);
      const result = engine.convert(inputCode);
      setOutputCode(result);
      setIsConverting(false);
    }, 600);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const newWidth = (e.clientX / containerWidth) * 100;
    if (newWidth > 25 && newWidth < 75) {
      setSplitWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const copyToClipboard = () => {
    if (!outputCode) return;
    navigator.clipboard.writeText(outputCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadFile = () => {
    if (!outputCode) return;
    const extension = targetFramework === 'flutter' ? 'dart' : targetFramework === 'html' ? 'html' : 'js';
    const blob = new Blob([outputCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pixel_perfect_component.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const targets = [
    { id: 'flutter', name: 'Flutter' },
    { id: 'react-native', name: 'React Native' },
    { id: 'react', name: 'React' },
    { id: 'vue', name: 'Vue' },
    { id: 'html', name: 'HTML' }
  ];

  const sources = [
    { id: 'html', name: 'HTML / Tailwind' },
    { id: 'flutter', name: 'Flutter (Reverse)' }
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#f8fafc] text-[#0f172a]'}`}>

      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full opacity-20 blur-[120px] transition-colors duration-1000 ${isDarkMode ? 'bg-blue-600/30' : 'bg-blue-400/20'}`} />
        <div className={`absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full opacity-20 blur-[120px] transition-colors duration-1000 ${isDarkMode ? 'bg-purple-600/30' : 'bg-purple-400/20'}`} />
      </div>

      {/* Modern Header */}
      <header className="relative z-50 border-b border-white/5 backdrop-blur-xl px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/40">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-black tracking-tight">
            Convert<span className="text-blue-500">Pixel</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg border border-white/10">
            <button onClick={() => setIsDarkMode(true)} className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'bg-white/10 text-blue-400' : 'text-white/40 hover:text-white'}`}><Moon size={14} className="sm:w-4 sm:h-4" /></button>
            <button onClick={() => setIsDarkMode(false)} className={`p-1.5 rounded-md transition-all ${!isDarkMode ? 'bg-black/10 text-blue-600' : 'text-white/40 hover:text-white'}`}><Sun size={14} className="sm:w-4 sm:h-4" /></button>
          </div>
          <button className="flex items-center gap-2 px-3 sm:px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-lg active:scale-95">
            <Share2 size={14} />
            <span className="hidden xs:inline">Share</span>
          </button>
        </div>
      </header>

      {/* Control Bar */}
      <div className="relative z-40 bg-white/5 border-b border-white/5 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Mobile Tab Switcher */}
        {isMobile && (
          <div className="w-full flex p-1 bg-white/5 rounded-xl border border-white/10 mb-2">
            <button
              onClick={() => setMobileActiveTab('input')}
              className={`flex-1 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${mobileActiveTab === 'input' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40'}`}
            >
              INPUT
            </button>
            <button
              onClick={() => setMobileActiveTab('output')}
              className={`flex-1 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${mobileActiveTab === 'output' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40'}`}
            >
              OUTPUT
            </button>
            <button
              onClick={() => setMobileActiveTab('preview')}
              className={`flex-1 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${mobileActiveTab === 'preview' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40'}`}
            >
              PREVIEW
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex flex-col flex-1 sm:flex-initial">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-1">Source</span>
              <select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] sm:text-xs font-bold focus:outline-none focus:border-blue-500 transition-colors w-full"
              >
                {sources.map(s => <option key={s.id} value={s.id} className="bg-[#121212]">{s.name}</option>)}
              </select>
            </div>

            <div className="flex items-center mt-4 shrink-0">
              <ArrowRight className="text-white/20" size={16} />
            </div>

            <div className="flex flex-col flex-1 sm:flex-initial">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-1">Target</span>
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10 overflow-x-auto no-scrollbar">
                {targets.map((fw) => (
                  <button
                    key={fw.id}
                    onClick={() => setTargetFramework(fw.id)}
                    className={`px-2 sm:px-4 py-1 rounded-md text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${targetFramework === fw.id ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                  >
                    {fw.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleConvert}
          disabled={isConverting}
          className="w-full lg:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
        >
          {isConverting ? <Cpu className="animate-spin" size={18} /> : <Play fill="currentColor" size={18} />}
          CONVERT NOW
        </button>
      </div>

      {/* Main Workspace */}
      <main ref={containerRef} className="relative z-10 flex flex-col lg:flex-row flex-1 overflow-hidden">

        {/* Left Panel: Input */}
        <div
          className={`flex-col border-r border-white/5 bg-black/10 ${isMobile ? (mobileActiveTab === 'input' ? 'flex flex-1' : 'hidden') : 'flex'}`}
          style={{ width: !isMobile ? splitWidth + '%' : '100%', minWidth: !isMobile ? '300px' : 'auto' }}
        >
          <div className="flex items-center justify-between px-6 py-4 flex-shrink-0 bg-white/5">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                   <Code2 size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black tracking-widest uppercase text-white/40">Input Container</span>
                  <span className="text-xs font-bold text-white uppercase">{sourceLanguage}</span>
                </div>
             </div>
             <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    try {
                      const text = await navigator.clipboard.readText();
                      setInputCode(text);
                    } catch (err) {
                      console.error('Failed to read clipboard', err);
                    }
                  }}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-white/70 hover:text-white transition-all"
                >
                  PASTE
                </button>
                <span className="text-[9px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">READY</span>
             </div>
          </div>

          <div className={`flex-1 min-h-[400px] ${isMobile ? 'bg-black/40 border-y border-white/5' : ''}`}>
             <Editor
                height="100%"
                defaultLanguage="html"
                theme={isDarkMode ? 'vs-dark' : 'light'}
                value={inputCode}
                onChange={(v) => setInputCode(v)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: 'JetBrains Mono',
                  renderLineHighlight: 'all',
                  cursorBlinking: 'smooth',
                  smoothScrolling: true,
                  lineNumbers: 'on',
                  padding: { top: 24, bottom: 24 },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  fixedOverflowWidgets: true,
                  formatOnPaste: true,
                  wordWrap: 'on',
                  domReadOnly: false,
                }}
             />
          </div>
        </div>

        {/* Resizer */}
        <div
          onMouseDown={handleMouseDown}
          className="hidden lg:flex w-1 relative group cursor-col-resize items-center justify-center z-30 bg-white/5 hover:bg-blue-500/30 transition-all"
        >
           <div className="w-px h-full bg-white/5 group-hover:bg-blue-500/50" />
        </div>

        {/* Right Panel: Output & Preview */}
        <div className={`flex-col flex-1 overflow-hidden bg-[#0a0a0a]/50 ${isMobile ? (mobileActiveTab !== 'input' ? 'flex' : 'hidden') : 'flex'}`}>
           <div className="flex items-center justify-between px-6 py-3 flex-shrink-0 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-4">
                 {!isMobile && (
                   <div className="flex p-1 bg-black/20 rounded-xl border border-white/10">
                      <button
                        onClick={() => setActiveTab('code')}
                        className={`px-6 py-1.5 rounded-lg text-[10px] font-black tracking-widest transition-all ${activeTab === 'code' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
                      >
                        OUTPUT CODE
                      </button>
                      <button
                        onClick={() => setActiveTab('preview')}
                        className={`px-6 py-1.5 rounded-lg text-[10px] font-black tracking-widest transition-all ${activeTab === 'preview' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
                      >
                        LIVE PREVIEW
                      </button>
                   </div>
                 )}
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black tracking-widest uppercase text-white/40">Target</span>
                    <span className="text-xs font-bold text-white uppercase">{targetFramework}</span>
                 </div>
              </div>

              <div className="flex items-center gap-2">
                  <button
                    onClick={downloadFile}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-white/70 hover:text-white transition-all"
                    title="Download as File"
                  >
                      <Download size={14} />
                      <span className="text-[10px] font-black hidden sm:inline">DOWNLOAD</span>
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${isCopied ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500' : 'border-white/10 hover:bg-white/5 text-white/70 hover:text-white'}`}
                  >
                      {isCopied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                      <span className="text-[10px] font-black">{isCopied ? 'COPIED' : 'COPY RESULT'}</span>
                  </button>
              </div>
           </div>

           <div className="flex-1 relative overflow-hidden">
              <AnimatePresence mode="wait">
                 {(isMobile ? mobileActiveTab === 'output' : activeTab === 'code') ? (
                    <motion.div
                      key="code"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="h-full"
                    >
                       <Editor
                          height="100%"
                          language={targetFramework === 'flutter' ? 'dart' : targetFramework === 'html' ? 'html' : 'javascript'}
                          theme={isDarkMode ? 'vs-dark' : 'light'}
                          value={outputCode}
                          options={{
                            readOnly: true,
                            minimap: { enabled: false },
                            fontSize: 14,
                            padding: { top: 24, bottom: 24 },
                            fontFamily: 'JetBrains Mono',
                            automaticLayout: true,
                            fixedOverflowWidgets: true,
                          }}
                       />
                    </motion.div>
                 ) : (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="h-full flex flex-col p-8 items-center justify-center bg-[#080808]"
                    >
                       <div className="flex items-center gap-4 mb-8 bg-white/5 p-1.5 rounded-2xl border border-white/10">
                          <button onClick={() => setDeviceMode('mobile')} className={`p-2 rounded-xl transition-all ${deviceMode === 'mobile' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40'}`}><Smartphone size={18}/></button>
                          <button onClick={() => setDeviceMode('desktop')} className={`p-2 rounded-xl transition-all ${deviceMode === 'desktop' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40'}`}><Monitor size={18}/></button>
                       </div>

                       <div className={`relative transition-all duration-700 ease-in-out ${deviceMode === 'mobile' ? 'w-[320px] h-[580px] rounded-[3rem] border-[12px]' : 'w-full max-w-[1000px] h-full rounded-t-xl border-t-[32px] border-x-[8px]'} bg-black border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden`}>
                          {deviceMode === 'mobile' ? (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-white/10 rounded-b-2xl z-20" />
                          ) : (
                            <div className="absolute top-[-24px] left-4 flex gap-1.5 z-20">
                               <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                               <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                            </div>
                          )}
                          <div className="absolute inset-0 overflow-auto bg-[#0a0a0a] p-6 no-scrollbar">
                             <div
                               dangerouslySetInnerHTML={{ __html: inputCode }}
                               className="transition-all duration-500"
                             />
                          </div>
                       </div>
                    </motion.div>
                 )}
              </AnimatePresence>

              {/* Conversion Loading Overlay */}
              <AnimatePresence>
                {isConverting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-2xl z-50 flex items-center justify-center"
                  >
                     <div className="flex flex-col items-center gap-8">
                        <div className="relative w-24 h-24">
                           <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                           />
                           <div className="absolute inset-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                              <Cpu className="text-blue-500 w-8 h-8 animate-pulse" />
                           </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <p className="text-sm font-black tracking-[0.4em] uppercase text-blue-400">Processing Engine</p>
                          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Mapping {sourceLanguage} to {targetFramework}</p>
                        </div>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="relative z-50 px-6 py-3 border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-6 text-[9px] font-bold text-white/20 tracking-widest uppercase">
            <span className="flex items-center gap-2"><Terminal size={10} /> Status: Online</span>
            <span className="hidden sm:inline">Engine: Pixel-Perfect v2.4</span>
         </div>
         <div className="text-[9px] font-bold text-white/20 tracking-widest uppercase">
            © 2026 Convert-Pixel • Precision Web Architecture
         </div>
      </footer>

    </div>
  );
};

export default App;
