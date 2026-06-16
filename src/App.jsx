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
  GripVertical
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import { ConversionEngine } from './lib/engine/converter';

const DEFAULT_CODE = '<div class="flex flex-col items-center p-8 bg-blue-600 rounded-2xl shadow-2xl max-w-sm">\n' +
  '  <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-xl border border-white/30">\n' +
  '    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n' +
  '      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />\n' +
  '    </svg>\n' +
  '  </div>\n' +
  '  <h1 class="text-white text-2xl font-bold tracking-tight">Convert-Pixel</h1>\n' +
  '  <p class="text-blue-100 mt-2 text-center text-sm leading-relaxed">\n' +
  '    Precision-engineered conversion for the next generation of web and mobile apps.\n' +
  '  </p>\n' +
  '  <button class="mt-6 px-8 py-2.5 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all active:scale-95 shadow-lg">\n' +
  '    Activate Engine\n' +
  '  </button>\n' +
  '</div>';

const App = () => {
  const [inputCode, setInputCode] = useState(DEFAULT_CODE);
  const [outputCode, setOutputCode] = useState('');
  const [targetFramework, setTargetFramework] = useState('flutter');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('code');
  const [isConverting, setIsConverting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [splitWidth, setSplitWidth] = useState(50);
  const [isHoveringCode, setIsHoveringCode] = useState(false);

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
    }, 300);
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
    if (newWidth > 20 && newWidth < 80) {
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

  const themeColors = isDarkMode ? {
    bg: '#050505',
    text: '#ffffff',
    panel: 'rgba(255,255,255,0.03)',
    border: 'rgba(255,255,255,0.08)'
  } : {
    bg: '#f8fafc',
    text: '#0f172a',
    panel: 'rgba(0,0,0,0.02)',
    border: 'rgba(0,0,0,0.08)'
  };

  return (
    <div className="fixed inset-0 flex flex-col font-sans overflow-hidden" style={{ backgroundColor: themeColors.bg, color: themeColors.text }}>
      {/* 2026 Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative z-30 border-b px-6 py-3 flex items-center justify-between flex-shrink-0 backdrop-blur-2xl" style={{ borderColor: themeColors.border }}>
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20"
          >
            <Cpu className="text-white w-5 h-5" />
          </motion.div>
          <div>
            <h1 className="text-lg font-black tracking-tighter flex items-center gap-2">
              CONVERT-PIXEL
              <span className="text-[8px] font-bold bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full border border-blue-500/20 tracking-widest uppercase">Precision Architect</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ backgroundColor: themeColors.panel, border: `1px solid ${themeColors.border}` }}>
          {['react', 'vue', 'flutter', 'react-native', 'html'].map((fw) => (
            <button
              key={fw}
              onClick={() => setTargetFramework(fw)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${targetFramework === fw ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'opacity-40 hover:opacity-100'}`}
            >
              {fw}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-9 h-9 flex items-center justify-center rounded-lg border hover:bg-white/5 transition-all"
            style={{ borderColor: themeColors.border }}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20">
            <Download size={12} />
            Export
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main ref={containerRef} className="relative z-10 flex flex-col md:flex-row flex-1 overflow-hidden">

        {/* Left Panel: Input Code */}
        <div className="flex flex-col border-r h-1/2 md:h-full" style={{ width: `${splitWidth}%`, borderColor: themeColors.border }}>
          <div className="flex items-center justify-between px-5 py-2.5 flex-shrink-0 border-b" style={{ borderColor: themeColors.border }}>
            <div className="flex items-center gap-2 text-[9px] font-black tracking-widest text-blue-500">
              <Code2 size={12} />
              SOURCE ENGINE
            </div>
          </div>
          <div
            className="flex-1 overflow-hidden transition-all duration-300"
            onMouseEnter={() => setIsHoveringCode(true)}
            onMouseLeave={() => setIsHoveringCode(false)}
          >
             <Editor
              height="100%"
              defaultLanguage="html"
              theme={isDarkMode ? 'vs-dark' : 'light'}
              value={inputCode}
              onChange={(value) => setInputCode(value)}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                padding: { top: 20 },
                lineNumbers: 'on',
                fontFamily: 'JetBrains Mono, monospace',
                scrollBeyondLastLine: false,
                backgroundColor: 'transparent',
                cursorSmoothCaretAnimation: "on",
                smoothScrolling: true,
              }}
            />
          </div>
        </div>

        {/* Draggable Divider */}
        <div
          onMouseDown={handleMouseDown}
          className="hidden md:flex w-1 hover:bg-blue-600/50 cursor-col-resize transition-all items-center justify-center relative z-20 group"
          style={{ backgroundColor: themeColors.border }}
        >
            <div className="w-5 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical size={12} className="text-white/40" />
            </div>
        </div>

        {/* Right Panel: Output & Preview */}
        <div className="flex flex-col flex-1 h-1/2 md:h-full overflow-hidden bg-black/10">
          <div className="flex items-center justify-between px-5 py-2 flex-shrink-0 border-b" style={{ borderColor: themeColors.border }}>
            <div className="flex p-1 rounded-lg border" style={{ backgroundColor: themeColors.bg, borderColor: themeColors.border }}>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-5 py-1 rounded-md text-[9px] font-black tracking-widest transition-all ${activeTab === 'code' ? 'bg-blue-600 text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}
              >
                OUTPUT
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-5 py-1 rounded-md text-[9px] font-black tracking-widest transition-all ${activeTab === 'preview' ? 'bg-blue-600 text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}
              >
                PREVIEW
              </button>
            </div>

            <button
              onClick={copyToClipboard}
              className={`flex items-center gap-2 px-3 py-1 rounded-md border transition-all text-[9px] font-bold ${isCopied ? 'bg-green-500/10 border-green-500/50 text-green-500' : 'hover:bg-white/5 opacity-70 hover:opacity-100'}`}
              style={{ borderColor: isCopied ? '' : themeColors.border }}
            >
              {isCopied ? <CheckCircle2 size={10} /> : <Copy size={10} />}
              {isCopied ? 'COPIED' : 'COPY'}
            </button>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              {activeTab === 'code' ? (
                <motion.div
                  key="code"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
                      fontSize: 13,
                      padding: { top: 20 },
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full p-8 flex items-center justify-center bg-[#080808] relative"
                >
                  {/* Magic Mirror Glow Effect */}
                  <div className={`absolute inset-0 bg-blue-500/5 transition-opacity duration-500 ${isHoveringCode ? 'opacity-100' : 'opacity-0'} pointer-events-none`} />

                  {/* High-Fidelity Simulator Frame */}
                  <div className={`relative w-full max-w-sm h-full max-h-[580px] rounded-[2.5rem] border-[10px] border-white/10 shadow-2xl overflow-hidden flex flex-col z-10 bg-black transition-all duration-500 ${isHoveringCode ? 'scale-[1.02] shadow-blue-500/20 border-blue-500/20' : ''}`}>
                    <div className="h-6 w-full flex items-center justify-center relative">
                       <div className="w-16 h-4 bg-white/5 rounded-full" />
                    </div>

                    <div className="flex-1 overflow-auto p-6 flex flex-col items-center justify-center bg-[#0a0a0a]">
                       <div dangerouslySetInnerHTML={{ __html: inputCode }} className="w-full scale-90 origin-center transition-all duration-500" style={{ filter: isHoveringCode ? 'drop-shadow(0 0 20px rgba(37, 99, 235, 0.4))' : 'none' }} />
                    </div>

                    <div className="h-14 w-full backdrop-blur-3xl bg-white/[0.02] border-t border-white/5 flex items-center justify-around">
                       <Smartphone size={16} className={targetFramework === 'flutter' || targetFramework === 'react-native' ? 'text-blue-500' : 'text-white/20'} />
                       <Monitor size={16} className={targetFramework === 'react' || targetFramework === 'vue' || targetFramework === 'html' ? 'text-blue-500' : 'text-white/20'} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Conversion Indicator */}
            {isConverting && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
                <div className="flex flex-col items-center gap-4">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}>
                    <Cpu className="text-blue-500" size={32} />
                  </motion.div>
                  <p className="text-[10px] font-black tracking-[0.3em] uppercase text-blue-400">Processing Neural Map...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-30 px-6 py-2 border-t flex items-center justify-between text-[8px] font-bold opacity-30 uppercase tracking-[0.2em] flex-shrink-0" style={{ borderColor: themeColors.border }}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><Terminal size={10} /> Neural Status: Optimal</span>
          <div className="w-px h-3 bg-current opacity-20" />
          <span>Precision: 100% Pixel-Perfect</span>
        </div>
        <span>© 2026 Convert-Pixel Precision Laboratory</span>
      </footer>
    </div>
  );
};

export default App;
