import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Sparkles, 
  Type, 
  Moon, 
  Sun, 
  Smartphone, 
  History, 
  Copy, 
  Check, 
  Send,
  Loader2,
  Smile,
  Zap,
  Heart,
  Quote
} from 'lucide-react';
import { generateCaptions, CaptionStyle } from './lib/gemini';

// --- Types ---
type Page = 'status' | 'ai' | 'fancy';

// --- Components ---

const StatusSaver = () => (
  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
    <div className="w-20 h-20 bg-[#202C33] rounded-full flex items-center justify-center mb-6 shadow-xl border border-slate-700/50">
      <Download className="text-[#00A884] w-10 h-10" />
    </div>
    <div className="space-y-2 mb-8 text-center">
        <h2 className="text-xl font-bold text-white">WhatsApp Status Saver</h2>
        <p className="text-slate-400 max-w-xs mx-auto text-sm leading-relaxed">
        View and download your recently watched WhatsApp statuses safely.
        </p>
    </div>
    <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl text-[11px] text-emerald-400 flex gap-3 items-start text-left leading-relaxed">
      <Zap className="shrink-0 w-4 h-4 mt-0.5" />
      <span>Note: Web apps have sandbox restrictions. To save actual statuses, you may need to grant file permissions or use our companion mobile app.</span>
    </div>
    <div className="grid grid-cols-2 gap-3 mt-8 w-full">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="aspect-[9/16] bg-[#202C33] rounded-2xl animate-pulse border border-slate-700/50 flex items-center justify-center">
            <Download className="text-slate-700" size={32} />
        </div>
      ))}
    </div>
  </div>
);

const AICaptionGenerator = () => {
  const [description, setDescription] = useState('');
  const [style, setStyle] = useState<CaptionStyle>('witty');
  const [captions, setCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const styles: { id: CaptionStyle; label: string; icon: any }[] = [
    { id: 'witty', label: 'Witty', icon: Zap },
    { id: 'funny', label: 'Funny', icon: Smile },
    { id: 'inspirational', label: 'Inspirational', icon: Quote },
    { id: 'short', label: 'Short', icon: Smartphone },
    { id: 'cool', label: 'Cool', icon: Sparkles },
    { id: 'emotional', label: 'Emotional', icon: Heart },
  ];

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setCaptions([]);
    try {
      const results = await generateCaptions(description, style);
      setCaptions(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="space-y-2">
        <h2 className="text-xl font-bold flex items-center gap-2 text-white">
          AI Caption Generator
        </h2>
        <p className="text-xs text-slate-400 font-medium leading-relaxed">Transform your thoughts into catchy status captions.</p>
      </div>

      <div className="space-y-5">
        <div className="relative">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's your status about? (e.g., Beach trip, sushi night...)"
            className="w-full p-4 rounded-2xl bg-[#111B21] border border-slate-700/50 text-slate-100 placeholder:text-slate-600 focus:ring-1 focus:ring-[#00A884] focus:border-transparent outline-none min-h-[120px] transition-all resize-none text-[13px] leading-relaxed"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Select Style</label>
          <div className="grid grid-cols-3 gap-2">
            {styles.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl text-[10px] font-bold uppercase transition-all border ${
                  style === s.id
                    ? 'bg-[#00A884]/10 text-[#00A884] border-[#00A884]'
                    : 'bg-[#202C33] border-slate-700/50 text-slate-500'
                }`}
              >
                <s.icon size={16} />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !description.trim()}
          className="w-full bg-[#00A884] hover:bg-[#008f70] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-30 shadow-lg shadow-[#00A884]/20 active:scale-[0.98] text-sm"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <Send size={18} />
              Generate Magic
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {captions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Magic Results</h3>
            {captions.map((caption, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-[#202C33] p-4 rounded-xl border border-slate-700/50 shadow-sm hover:border-[#00A884]/30 transition-all"
              >
                <p className="text-slate-200 pr-10 text-[13px] leading-relaxed italic">"{caption}"</p>
                <button
                  onClick={() => copyToClipboard(caption, index)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-[#00A884] transition-all"
                >
                  {copiedIndex === index ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FancyTextGenerator = () => {
  const [text, setText] = useState('');
  const [copiedStyle, setCopiedStyle] = useState<string | null>(null);

  const styleGenerators = [
    { name: 'Bold Italic', gen: (t: string) => t.toUpperCase() },
    { name: 'Spaced', gen: (t: string) => t.split('').map(c => c + ' ').join('').trim() },
    { name: 'Bubble', gen: (t: string) => t.split('').map(c => `(${c})`).join('') },
    { name: 'Square', gen: (t: string) => t.split('').map(c => `[${c}]`).join('') },
    { name: 'Wavy', gen: (t: string) => t.split('').map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('') },
    { name: 'Inverted', gen: (t: string) => t.split('').reverse().join('') },
    { name: 'Mirror', gen: (t: string) => `| ${t} |` },
    { name: 'Starry', gen: (t: string) => `✨ ${t} ✨` },
  ];

  const copy = (styledText: string, name: string) => {
    navigator.clipboard.writeText(styledText);
    setCopiedStyle(name);
    setTimeout(() => setCopiedStyle(null), 2000);
  };

  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="space-y-2">
        <h2 className="text-xl font-bold flex items-center gap-2 text-white">
          Fancy Text Generator
        </h2>
        <p className="text-xs text-slate-400 font-medium tracking-tight">Style your text to stand out in chats and statuses.</p>
      </div>

      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something here..."
          className="w-full p-4 rounded-2xl bg-[#111B21] border border-slate-700/50 text-slate-100 placeholder:text-slate-600 focus:ring-1 focus:ring-[#00A884] focus:border-transparent outline-none shadow-sm text-base transition-all"
        />
      </div>

      {text && (
        <div className="grid grid-cols-1 gap-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Available Styles</h3>
          {styleGenerators.map((s) => {
            const styled = s.gen(text);
            return (
              <div
                key={s.name}
                className="bg-[#202C33] p-4 rounded-xl border border-slate-700/50 shadow-sm flex items-center justify-between group hover:border-[#00A884]/30 transition-all"
              >
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest">{s.name}</span>
                  <p className="text-slate-200 text-sm font-medium">{styled}</p>
                </div>
                <button
                  onClick={() => copy(styled, s.name)}
                  className="p-2.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-[#00A884] transition-all"
                >
                  {copiedStyle === s.name ? <Check className="text-[#00A884]" size={18} /> : <Copy size={18} />}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function App() {

  return (
    <div className="min-h-screen bg-[#0B141B] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] h-full max-h-[720px] bg-[#111B21] border border-slate-800 rounded-[40px] shadow-2xl flex flex-col overflow-hidden relative">
        {/* Top bar */}
        <header className="bg-[#202C33] px-6 pt-10 pb-6 flex items-center justify-between border-b border-slate-700/50">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col"
          >
            <h1 className="text-xl font-bold text-[#00A884] tracking-tight">Status Saver AI</h1>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Powered by Neural Captions</p>
          </motion.div>
          
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-[#111B21] flex items-center justify-center text-slate-300 hover:text-white transition-colors">
              <History size={18} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto px-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {currentPage === 'status' && <StatusSaver />}
              {currentPage === 'ai' && <AICaptionGenerator />}
              {currentPage === 'fancy' && <FancyTextGenerator />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        <nav className="bg-[#202C33] p-4 flex justify-around items-center border-t border-slate-700">
          {[
            { id: 'status', label: 'Statuses', icon: Download },
            { id: 'ai', label: 'AI Magic', icon: Sparkles },
            { id: 'fancy', label: 'Styles', icon: Type },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentPage(tab.id as Page)}
              className={`flex flex-col items-center gap-1.5 transition-all outline-none ${
                currentPage === tab.id 
                  ? 'text-[#00A884]' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className="relative">
                <tab.icon size={22} className={currentPage === tab.id ? 'stroke-[2.5px]' : 'stroke-[2px]'} />
                {currentPage === tab.id && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-[#00A884]/20 blur-md rounded-full -z-10"
                  />
                )}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${currentPage === tab.id ? 'opacity-100' : 'opacity-70'}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
