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
  <div className="flex flex-col h-full p-5 space-y-6">
    <div className="space-y-3">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recent Updates</h3>
        <span className="text-[9px] bg-[#6C63FF] text-white px-2 py-0.5 rounded-full font-bold">4 NEW</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
        {[
          { name: 'Alex J.', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop', active: true },
          { name: 'Sarah W.', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop', active: false },
          { name: 'Michael', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', active: false },
          { name: 'Luna', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop', active: false },
        ].map((story, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 shrink-0">
            <div className={`p-0.5 rounded-2xl ${story.active ? 'bg-gradient-to-tr from-[#6C63FF] to-[#00C853]' : 'bg-slate-700'}`}>
              <div className="w-14 h-14 rounded-[14px] overflow-hidden border-2 border-[#0F172A]">
                <img src={story.img} className={`w-full h-full object-cover ${story.active ? 'opacity-100' : 'opacity-60'}`} alt={story.name} />
              </div>
            </div>
            <span className="text-[9px] text-slate-400 font-medium">{story.name}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Statuses to Save</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        {[
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop',
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=400&fit=crop',
          'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&h=400&fit=crop',
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=400&fit=crop'
        ].map((img, i) => (
          <div key={i} className="aspect-[9/12] bg-[#1E293B] rounded-2xl relative overflow-hidden group border border-slate-700/30">
            <img src={img} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <button className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#6C63FF] flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform">
              <Download size={16} strokeWidth={3} />
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="p-4 bg-[#6C63FF]/10 border border-[#6C63FF]/20 rounded-2xl flex gap-3 items-start">
      <Zap className="shrink-0 w-4 h-4 text-[#00C853] mt-0.5" />
      <p className="text-[10px] text-slate-400 leading-relaxed">
        Statuses you watch on WhatsApp will appear here for 24 hours. Tap the download icon to save them forever.
      </p>
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
          CaptiNova AI
        </h2>
        <p className="text-xs text-slate-400 font-medium leading-relaxed">Transform your thoughts into catchy status captions.</p>
      </div>

      <div className="space-y-5">
        <div className="relative">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's your status about? (e.g., Beach trip, sushi night...)"
            className="w-full p-4 rounded-2xl bg-[#0F172A] border border-slate-700/50 text-slate-100 placeholder:text-slate-600 focus:ring-1 focus:ring-[#6C63FF] focus:border-transparent outline-none min-h-[120px] transition-all resize-none text-[13px] leading-relaxed"
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
                    ? 'bg-[#6C63FF]/10 text-[#6C63FF] border-[#6C63FF]'
                    : 'bg-[#1E293B] border-slate-700/50 text-slate-500'
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
          className="w-full bg-[#6C63FF] hover:bg-[#5a52e5] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-30 shadow-lg shadow-[#6C63FF]/20 active:scale-[0.98] text-sm"
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
                className="group relative bg-[#1E293B] p-4 rounded-xl border border-slate-700/50 shadow-sm hover:border-[#6C63FF]/30 transition-all"
              >
                <p className="text-slate-200 pr-10 text-[13px] leading-relaxed italic">"{caption}"</p>
                <button
                  onClick={() => copyToClipboard(caption, index)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-[#6C63FF] transition-all"
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
          className="w-full p-4 rounded-2xl bg-[#0F172A] border border-slate-700/50 text-slate-100 placeholder:text-slate-600 focus:ring-1 focus:ring-[#6C63FF] focus:border-transparent outline-none shadow-sm text-base transition-all"
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
                className="bg-[#1E293B] p-4 rounded-xl border border-slate-700/50 shadow-sm flex items-center justify-between group hover:border-[#6C63FF]/30 transition-all"
              >
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest">{s.name}</span>
                  <p className="text-slate-200 text-sm font-medium">{styled}</p>
                </div>
                <button
                  onClick={() => copy(styled, s.name)}
                  className="p-2.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-[#6C63FF] transition-all"
                >
                  {copiedStyle === s.name ? <Check className="text-[#6C63FF]" size={18} /> : <Copy size={18} />}
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
  const [currentPage, setCurrentPage] = useState<Page>('ai');

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] h-full max-h-[720px] bg-[#1E293B] border border-slate-700 rounded-[40px] shadow-2xl flex flex-col overflow-hidden relative">
        {/* Top bar */}
        <header className="bg-[#1E293B]/80 backdrop-blur-md px-6 pt-10 pb-6 flex items-center justify-between border-b border-slate-700/50">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#6C63FF] to-[#8E87FF] rounded-xl flex items-center justify-center shadow-lg shadow-[#6C63FF]/20 relative group">
              <span className="text-white font-black text-xl">C</span>
              <div className="absolute -top-1 -right-1">
                <Sparkles size={14} className="text-[#00C853] fill-[#00C853] animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black text-white tracking-tight">CaptiNova</h1>
              <p className="text-[9px] text-[#00C853] font-bold uppercase tracking-wider">Neural Magic ✨</p>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-slate-700/50">
              <History size={18} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto px-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
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
        <nav className="bg-[#1E293B] p-4 flex justify-around items-center border-t border-slate-700/50">
          {[
            { id: 'status', label: 'Statuses', icon: Download },
            { id: 'ai', label: 'AI Magic', icon: Sparkles },
            { id: 'fancy', label: 'Styles', icon: Type },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentPage(tab.id as Page)}
              className={`flex flex-col items-center gap-1.5 transition-all outline-none relative group ${
                currentPage === tab.id 
                  ? 'text-[#6C63FF]' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className="relative">
                <tab.icon size={22} className={currentPage === tab.id ? 'stroke-[2.5px]' : 'stroke-[2px]'} />
                {currentPage === tab.id && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-[#6C63FF]/30 blur-xl rounded-full -z-10"
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                  />
                )}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-widest ${currentPage === tab.id ? 'opacity-100' : 'opacity-60'}`}>
                {tab.label}
              </span>
              {currentPage === tab.id && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute -bottom-4 w-1 h-1 bg-[#6C63FF] rounded-full"
                />
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
