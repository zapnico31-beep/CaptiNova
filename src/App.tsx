import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Sparkles, 
  Type, 
  History, 
  Copy, 
  Check, 
  Send,
  Loader2,
  Smile,
  Zap,
  Heart,
  Quote,
  Share2,
  MoreVertical,
  Flame,
  Star,
  Settings,
  Bell,
  Search,
  MessageCircle
} from 'lucide-react';
import { generateCaptions, CaptionStyle } from './lib/gemini';

// --- Types ---
type Page = 'saver' | 'viral' | 'stylizer';

// --- Components ---

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-0.5 bg-[#6C63FF] text-white text-[8px] font-black rounded-full shadow-lg shadow-[#6C63FF]/20 tracking-widest uppercase">
    {children}
  </span>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-[#1E293B] border border-slate-700/50 rounded-3xl overflow-hidden shadow-xl ${className}`}>
    {children}
  </div>
);

const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="p-6 pb-2 space-y-1">
    <h2 className="text-2xl font-black text-white tracking-tight italic uppercase">{title}</h2>
    {subtitle && <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">{subtitle}</p>}
  </div>
);

// --- Pages ---

const SaverPage = () => {
  const users = [
    { name: 'Me', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', active: true, user: true },
    { name: 'Rahul', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', active: true },
    { name: 'Simran', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', active: true },
    { name: 'Dev', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', active: false },
  ];

  const grid = [
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop',
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Header title="Statuses" subtitle="Watch and save updates" />
      
      <div className="px-6">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
          {users.map((u, i) => (
            <div key={i} className="flex flex-col items-center gap-2 shrink-0">
              <div className={`p-[3px] rounded-2xl ${u.active ? 'bg-gradient-to-tr from-[#6C63FF] to-[#00C853]' : 'bg-slate-800'}`}>
                <div className="w-16 h-16 rounded-[18px] overflow-hidden border-[3px] border-[#0F172A] relative">
                  <img src={u.img} className={`w-full h-full object-cover transition-all ${u.active ? 'opacity-100' : 'opacity-40 grayscale'}`} alt={u.name} />
                  {u.user && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                      <Share2 size={16} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
              <span className={`text-[10px] font-black tracking-widest ${u.active ? 'text-slate-100' : 'text-slate-600'}`}>{u.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Live Feed</h3>
          <Badge>New 3</Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {grid.map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 0.98 }}
              className="aspect-[9/13] bg-slate-800 rounded-[32px] relative overflow-hidden group shadow-2xl border border-slate-700/30"
            >
              <img src={img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-[#6C63FF] flex items-center justify-center text-[8px] font-black">AI</div>
                  <span className="text-[9px] text-white font-black uppercase tracking-wider">Save Meta</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 h-10 rounded-xl bg-[#6C63FF] flex items-center justify-center text-white active:scale-95 transition-transform">
                    <Download size={18} strokeWidth={3} />
                  </button>
                  <button className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <MessageCircle size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-24">
        <Card className="p-5 flex gap-4 items-center bg-gradient-to-br from-[#1E293B] to-[#0F172A]">
          <div className="w-12 h-12 rounded-2xl bg-[#00C853]/10 flex items-center justify-center text-[#00C853] shrink-0 border border-[#00C853]/20 shadow-lg shadow-[#00C853]/10">
            <Zap size={24} />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest italic">Optimization</h4>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
              Recent statuses sync automatically. Capture them within 24h.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

const ViralPage = () => {
  const [desc, setDesc] = useState('');
  const [style, setStyle] = useState<CaptionStyle>('witty');
  const [captions, setCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const styles: { id: CaptionStyle; icon: any; label: string }[] = [
    { id: 'witty', icon: Flame, label: 'Viral' },
    { id: 'funny', icon: Smile, label: 'Funny' },
    { id: 'emotional', icon: Heart, label: 'Deep' },
    { id: 'short', icon: Star, label: 'Short' },
    { id: 'cool', icon: Zap, label: 'Cool' },
    { id: 'inspirational', icon: Quote, label: 'Mind' },
  ];

  const handleGenerate = async () => {
    if (!desc.trim()) return;
    setLoading(true);
    try {
      const res = await generateCaptions(desc, style);
      setCaptions(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Header title="Neural Captions" subtitle="AI Viral Logic Engine" />

      <div className="px-6 space-y-6">
        <Card className="p-1 focus-within:ring-2 focus-within:ring-[#6C63FF]/50 transition-all shadow-2xl">
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Type your mood... (e.g. Rainy day, new car, beach life)"
            className="w-full bg-slate-900/50 p-5 rounded-[28px] text-white placeholder:text-slate-600 focus:outline-none min-h-[160px] text-sm font-medium leading-relaxed resize-none"
          />
        </Card>

        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Algorithm Selection</h3>
          <div className="grid grid-cols-3 gap-2">
            {styles.map(s => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`flex flex-col items-center justify-center gap-1.5 py-4 rounded-2xl transition-all duration-500 border ${
                  style === s.id 
                    ? 'bg-[#6C63FF] border-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/30 scale-[1.03]' 
                    : 'bg-[#1E293B] border-slate-700/50 text-slate-500 hover:text-slate-300'
                }`}
              >
                <s.icon size={16} className={style === s.id ? 'animate-pulse' : ''} />
                <span className="text-[9px] font-black uppercase tracking-widest">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          disabled={loading || !desc.trim()}
          className="w-full h-15 bg-gradient-to-r from-[#6C63FF] to-[#8E87FF] text-white rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-2xl shadow-[#6C63FF]/40 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-30"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <><Send size={18} strokeWidth={3} /> Inject AI Magic</>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {captions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 pb-32 space-y-3"
          >
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Generated Output</h3>
            {captions.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1E293B] p-5 rounded-3xl border border-slate-700/50 shadow-lg relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#6C63FF]" />
                <p className="text-slate-200 text-sm leading-relaxed font-semibold pr-10">"{cap}"</p>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(cap);
                    setCopiedId(i);
                    setTimeout(() => setCopiedId(null), 2000);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-500 hover:text-[#00C853] transition-all"
                >
                  {copiedId === i ? <Check size={18} strokeWidth={3} /> : <Copy size={18} />}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StylizerPage = () => {
  const [text, setText] = useState('');
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const styleGens = [
    { name: 'CHROME BOLD', fn: (t: string) => t.toUpperCase().split('').join(' ') },
    { name: 'NEURAL WAVE', fn: (t: string) => t.split('').map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('') },
    { name: 'GHOST BUBBLE', fn: (t: string) => t.split('').map(c => `(${c})`).join('') },
    { name: 'CORE SQUARE', fn: (t: string) => t.split('').map(c => `[${c}]`).join('') },
    { name: 'REVERSE LOGIC', fn: (t: string) => t.split('').reverse().join('') },
    { name: 'CELESTIAL', fn: (t: string) => `✨ ${t} ✨` },
    { name: 'HYPER BOLT', fn: (t: string) => `⚡ ${t} ⚡` },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Header title="Stylizer" subtitle="Text Transformation Matrix" />
      
      <div className="px-6 space-y-8">
        <Card className="p-1 focus-within:ring-2 focus-within:ring-[#6C63FF]/50 transition-all shadow-2xl">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type anything..."
            className="w-full bg-slate-900/50 p-5 rounded-[24px] text-white placeholder:text-slate-700 focus:outline-none text-base font-black tracking-widest italic"
          />
        </Card>

        {text && (
          <div className="space-y-3 pb-32">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Styles Matrix</h3>
            {styleGens.map(s => {
              const res = s.fn(text);
              return (
                <div key={s.name} className="group">
                  <div className="bg-[#1E293B] p-5 rounded-3xl border border-slate-700/50 flex items-center justify-between transition-all group-hover:bg-[#2A3441] border-l-4 border-l-transparent group-hover:border-l-[#6C63FF] shadow-lg">
                    <div className="space-y-1">
                      <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em]">{s.name}</span>
                      <p className="text-white text-base font-black tracking-tight">{res}</p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(res);
                        setCopiedName(s.name);
                        setTimeout(() => setCopiedName(null), 2000);
                      }}
                      className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 hover:text-[#6C63FF] transition-all"
                    >
                      {copiedName === s.name ? <Check size={20} strokeWidth={3} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('viral');

  return (
    <div className="min-h-screen bg-[#0F172A] flex justify-center selection:bg-[#6C63FF]/40 selection:text-white">
      <div className="w-full max-w-[420px] h-screen bg-[#0F172A] flex flex-col relative overflow-hidden text-slate-100">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-50 bg-[#0F172A]/80 backdrop-blur-2xl border-b border-slate-800/50 px-6 pt-10 pb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#6C63FF] to-[#8E87FF] rounded-[18px] flex items-center justify-center shadow-2xl shadow-[#6C63FF]/30 relative overflow-hidden group">
              <motion.div 
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,transparent_70%)]"
              />
              <span className="text-white font-black text-2xl z-10 italic">C</span>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 backdrop-blur-sm pointer-events-none" />
              <div className="absolute -bottom-1 -right-1">
                <Sparkles size={12} className="text-[#00C853] fill-[#00C853]" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black text-white tracking-[0.1em] italic leading-none">CAPTINOVA</h1>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-pulse" />
                <span className="text-[7px] text-slate-500 font-extrabold uppercase tracking-[0.3em]">Neural Engine Enabled</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-slate-700/50">
              <Bell size={18} />
            </button>
            <button className="w-10 h-10 rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-slate-700/50">
              <Settings size={18} />
            </button>
          </div>
        </header>

        {/* Content Section */}
        <main className="flex-1 overflow-y-auto scrollbar-none relative pb-10">
          <AnimatePresence mode="wait">
            {page === 'saver' && <SaverPage key="saver" />}
            {page === 'viral' && <ViralPage key="viral" />}
            {page === 'stylizer' && <StylizerPage key="stylizer" />}
          </AnimatePresence>
        </main>

        {/* Floating Tab Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] z-50">
          <nav className="bg-[#1E293B]/90 backdrop-blur-3xl border border-slate-700/50 rounded-[40px] p-2.5 flex justify-between items-center shadow-[0_25px_60px_rgba(0,0,0,0.7)] border-t-white/5">
            {[
              { id: 'saver', icon: Download, label: 'SAVER' },
              { id: 'viral', icon: Sparkles, label: 'MAGIC' },
              { id: 'stylizer', icon: Type, label: 'STYLE' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setPage(tab.id as Page)}
                className={`flex flex-col items-center gap-1 px-7 py-3 rounded-[30px] transition-all relative overflow-hidden group ${
                  page === tab.id ? 'text-[#6C63FF]' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {page === tab.id && (
                  <motion.div 
                    layoutId="navTabActive"
                    className="absolute inset-0 bg-[#6C63FF]/10 rounded-[28px] -z-10"
                    transition={{ type: 'spring', bounce: 0.1, duration: 0.8 }}
                  />
                )}
                <tab.icon size={22} strokeWidth={page === tab.id ? 3 : 2} className="relative z-10 transition-transform group-active:scale-90" />
                <span className="text-[7px] font-black tracking-[0.2em] relative z-10">{tab.label}</span>
                {page === tab.id && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-1.5 w-1.5 h-1.5 bg-[#6C63FF] rounded-full shadow-[0_0_12px_#6C63FF]"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

      </div>
    </div>
  );
}

