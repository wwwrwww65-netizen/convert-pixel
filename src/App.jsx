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
  Share2
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
  const [targetFramework, setTargetFramework] = useState('flutter');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('code');
  const [isConverting, setIsConverting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [splitWidth, setSplitWidth] = useState(50);
  const [deviceMode, setDeviceMode] = useState('mobile');

  const containerRef = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    handleConvert();
  }, [inputCode, targetFramework]);

  const handleConvert = () => {
    setIsConverting(true);
    const engine = new ConversionEngine(targetFramework);
    const result = engine.convert(inputCode);
    setTimeout(() => {
      setOutputCode(result);
      setIsConverting(false);
    }, 400);
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
    navigator.clipboard.writeText(outputCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const frameworks = [
    { id: 'flutter', name: 'Flutter', color: 'blue' },
    { id: 'react-native', name: 'R-Native', color: 'indigo' },
    { id: 'react', name: 'React', color: 'cyan' },
    { id: 'vue', name: 'Vue', color: 'emerald' },
    { id: 'html', name: 'HTML', color: 'orange' }
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#f8fafc] text-[#0f172a]'}`}>

      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full opacity-20 blur-[120px] transition-colors duration-1000 ${isDarkMode ? 'bg-blue-600/30' : 'bg-blue-400/20'}`} />
        <div className={`absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full opacity-20 blur-[120px] transition-colors duration-1000 ${isDarkMode ? 'bg-purple-600/30' : 'bg-purple-400/20'}`} />
      </div>

      {/* Modern Header */}
      <header className="relative z-50 border-b border-white/5 backdrop-blur-xl px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/40 group-hover:rotate-12 transition-transform duration-500">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
                Convert<span className="text-blue-500">Pixel</span>
                <span className="hidden sm:inline-block text-[10px] font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-blue-400">v2.0</span>
              </h1>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            {frameworks.map((fw) => (
              <button
                key={fw.id}
                onClick={() => setTargetFramework(fw.id)}
                className={`relative px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${targetFramework === fw.id ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
              >
                {targetFramework === fw.id && (
                  <motion.div layoutId="activeFw" className="absolute inset-0 bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20" />
                )}
                <span className="relative z-10">{fw.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg border border-white/10">
            <button onClick={() => setIsDarkMode(true)} className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'bg-white/10 text-blue-400' : 'text-white/40 hover:text-white'}`}><Moon size={16}/></button>
            <button onClick={() => setIsDarkMode(false)} className={`p-1.5 rounded-md transition-all ${!isDarkMode ? 'bg-black/10 text-blue-600' : 'text-white/40 hover:text-white'}`}><Sun size={16}/></button>
          </div>

          <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black hover:bg-white/90 transition-all font-bold text-xs uppercase tracking-wider shadow-xl active:scale-95">
            <Share2 size={14} />
            Share
          </button>
        </div>
      </header>

      {/* Mobile Framework Switcher (Sticky) */}
      <div className="lg:hidden relative z-40 bg-white/5 border-b border-white/5 flex overflow-x-auto no-scrollbar p-2 gap-2">
         {frameworks.map((fw) => (
            <button
              key={fw.id}
              onClick={() => setTargetFramework(fw.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${targetFramework === fw.id ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/40'}`}
            >
              {fw.name}
            </button>
          ))}
      </div>

      {/* Main Workspace */}
      <main ref={containerRef} className="relative z-10 flex flex-col lg:flex-row flex-1 overflow-hidden">

        {/* Left Panel: Input */}
        <div className="flex flex-col border-r border-white/5 bg-black/20 w-full lg:w-auto" style={{ width: window.innerWidth >= 1024 ? splitWidth + '%' : '100%', minWidth: window.innerWidth >= 1024 ? '300px' : 'auto' }}>
          <div className="flex items-center justify-between px-6 py-4 flex-shrink-0">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/50">Source HTML/Tailwind</span>
             </div>
             <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-white/5 rounded-md text-white/40 hover:text-white transition-colors">
                  <Zap size={14} />
                </button>
             </div>
          </div>

          <div className="flex-1 min-h-[300px]">
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
                  padding: { top: 24, bottom: 24 }
                }}
             />
          </div>
        </div>

        {/* Resizer */}
        <div
          onMouseDown={handleMouseDown}
          className="hidden lg:flex w-1.5 relative group cursor-col-resize items-center justify-center z-30 transition-all hover:bg-blue-500/30"
        >
           <div className="w-1 h-12 rounded-full bg-white/10 group-hover:bg-blue-500 transition-colors" />
        </div>

        {/* Right Panel: Output & Preview */}
        <div className="flex flex-col flex-1 overflow-hidden bg-[#0a0a0a]/50">
           <div className="flex items-center justify-between px-6 py-3 flex-shrink-0 border-b border-white/5">
              <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
                 <button
                  onClick={() => setActiveTab('code')}
                  className={`px-6 py-1.5 rounded-lg text-[10px] font-black tracking-widest transition-all ${activeTab === 'code' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                 >
                   CODE
                 </button>
                 <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-6 py-1.5 rounded-lg text-[10px] font-black tracking-widest transition-all ${activeTab === 'preview' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                 >
                   PREVIEW
                 </button>
              </div>

              <div className="flex items-center gap-2">
                 <button
                  onClick={copyToClipboard}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${isCopied ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500' : 'border-white/10 hover:bg-white/5 text-white/70 hover:text-white'}`}
                 >
                    {isCopied ? <CheckCircle2 size={14} /> : <Copy size={14} className="group-hover:scale-110 transition-transform" />}
                    <span className="text-[10px] font-black">{isCopied ? 'COPIED' : 'COPY'}</span>
                 </button>
              </div>
           </div>

           <div className="flex-1 relative overflow-hidden">
              <AnimatePresence mode="wait">
                 {activeTab === 'code' ? (
                    <motion.div
                      key="code"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
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
                          }}
                       />
                    </motion.div>
                 ) : (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="h-full flex flex-col p-8 items-center justify-center"
                    >
                       {/* Device Controls */}
                       <div className="flex items-center gap-4 mb-8 bg-white/5 p-1.5 rounded-2xl border border-white/10">
                          <button onClick={() => setDeviceMode('mobile')} className={`p-2 rounded-xl transition-all ${deviceMode === 'mobile' ? 'bg-blue-600 text-white' : 'text-white/40'}`}><Smartphone size={18}/></button>
                          <button onClick={() => setDeviceMode('desktop')} className={`p-2 rounded-xl transition-all ${deviceMode === 'desktop' ? 'bg-blue-600 text-white' : 'text-white/40'}`}><Monitor size={18}/></button>
                       </div>

                       {/* Device Simulator */}
                       <div className={`relative transition-all duration-700 ease-in-out ${deviceMode === 'mobile' ? 'w-[320px] h-[580px]' : 'w-full max-w-[800px] h-[500px]'} bg-black rounded-[3rem] border-[12px] border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden`}>
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-white/10 rounded-b-2xl z-20" />
                          <div className="absolute inset-0 overflow-auto bg-[#0a0a0a] p-6 no-scrollbar">
                             <div
                               dangerouslySetInnerHTML={{ __html: inputCode }}
                               className={`transition-all duration-500 origin-top ${deviceMode === 'mobile' ? 'scale-100' : 'scale-100'}`}
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
                    className="absolute inset-0 bg-black/60 backdrop-blur-xl z-50 flex items-center justify-center"
                  >
                     <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                           <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 rounded-full border-2 border-dashed border-blue-500/30"
                           />
                           <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 w-6 h-6 animate-pulse" />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <p className="text-xs font-black tracking-[0.3em] uppercase text-blue-400">Optimizing Code</p>
                          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Applying Pixel Logic...</p>
                        </div>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="relative z-50 px-6 py-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
         <div className="flex items-center gap-6 text-[10px] font-bold text-white/30 tracking-widest uppercase">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
               Engine: Active
            </div>
            <div className="w-px h-3 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
               Latency: 12ms
            </div>
         </div>

         <div className="text-[10px] font-bold text-white/20 tracking-widest uppercase">
            © 2026 Convert-Pixel • Precision Web Architect
         </div>
      </footer>

    </div>
  );
};

export default App;
