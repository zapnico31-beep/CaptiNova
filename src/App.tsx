import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Send,
  Loader2,
  Smile,
  Zap,
  Heart,
  Quote,
  Flame,
  Star,
  Moon,
  Sun,
  XCircle,
  CloudRain,
  Palette,
  LayoutGrid,
  Menu,
  MoreVertical,
  Share2
} from 'lucide-react';
import { generateCaptions, CaptionStyle } from './lib/gemini';

// --- Types ---
interface GeneratedCaption {
  id: string;
  text: string;
  tone: CaptionStyle;
}

// --- Components ---

const Button = ({ 
  children, 
  onClick, 
  disabled, 
  className = "", 
  variant = 'primary' 
}: { 
  children: React.ReactNode, 
  onClick?: () => void, 
  disabled?: boolean, 
  className?: string,
  variant?: 'primary' | 'secondary' | 'ghost'
}) => {
  const base = "px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 text-sm";
  const variants = {
    primary: "bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-lg shadow-green-500/20 disabled:opacity-50",
    secondary: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-700",
    ghost: "bg-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
  };
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<CaptionStyle>('aesthetic');
  const [captions, setCaptions] = useState<GeneratedCaption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const tones: { id: CaptionStyle; label: string; icon: any; color: string }[] = [
    { id: 'funny', label: 'Funny', icon: Smile, color: 'text-orange-500 bg-orange-500/10' },
    { id: 'romantic', label: 'Romantic', icon: Heart, color: 'text-pink-500 bg-pink-500/10' },
    { id: 'motivational', label: 'Motivational', icon: Flame, color: 'text-blue-500 bg-blue-500/10' },
    { id: 'sad', label: 'Sad', icon: CloudRain, color: 'text-indigo-500 bg-indigo-500/10' },
    { id: 'aesthetic', label: 'Aesthetic', icon: Palette, color: 'text-purple-500 bg-purple-500/10' },
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please tell us what your status is about!');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const results = await generateCaptions(topic, tone);
      const newCaptions = results.map(text => ({
        id: Math.random().toString(36).substring(7),
        text: text.replace(/^"|"$/g, ''),
        tone
      }));
      setCaptions(newCaptions);
    } catch (err) {
      setError('Failed to generate captions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'} transition-colors duration-500`}>
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full ${isDark ? 'bg-green-500/5' : 'bg-green-500/10'} blur-[120px]`} />
        <div className={`absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full ${isDark ? 'bg-purple-500/5' : 'bg-purple-500/10'} blur-[120px]`} />
      </div>

      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#22c55e] rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/40 transform rotate-3 hover:rotate-0 transition-transform">
            <Sparkles className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter">CaptiNova</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 leading-none">Viral AI Magic</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          >
            {isDark ? <Sun size={20} className="text-orange-400" /> : <Moon size={20} className="text-zinc-600" />}
          </button>
          <button className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center lg:hidden">
            <Menu size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Panel */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-[40px] border border-white/20 dark:border-zinc-800/50 shadow-2xl backdrop-blur-xl">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-zinc-500 ml-1">What's your idea?</label>
                  <textarea 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. My first trip to Bali, feeling hungry at midnight, getting promoted..."
                    className="w-full bg-zinc-50 dark:bg-zinc-900/80 p-6 rounded-3xl text-lg font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#22c55e]/30 transition-all min-h-[160px] resize-none"
                  />
                  <AnimatePresence>
                    {error && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500 text-xs font-bold pl-2 flex items-center gap-1"
                      >
                        <XCircle size={14} /> {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-zinc-500 ml-1">Select Vibe</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {tones.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTone(t.id)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-[24px] transition-all duration-300 group
                          ${tone === t.id 
                            ? 'bg-[#22c55e] text-white shadow-lg shadow-green-500/30' 
                            : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white'
                          }`}
                      >
                        <t.icon size={20} className={tone === t.id ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
                        <span className="text-[10px] font-black uppercase tracking-tighter">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full py-5 text-base uppercase tracking-[0.2em]"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>Generate Caption <Send size={18} /></>
                  )}
                </Button>
              </div>
            </div>

            {/* Extra Bento Card */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-[40px] text-white space-y-4">
              <h3 className="text-2xl font-black italic">Go Viral 🚀</h3>
              <p className="text-sm font-medium opacity-90 leading-relaxed">
                CaptiNova uses Neural AI to craft captions that drive engagement and status views.
              </p>
              <div className="flex gap-2 pt-2">
                <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold">#AI_MAGIC</div>
                <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold">#NO_LIMITS</div>
              </div>
            </div>
          </div>

          {/* Right Column: Results Grid */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-black italic uppercase tracking-tighter">Your Masterpieces</h2>
                <div className="flex gap-2">
                   <div className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                     {captions.length} Options
                   </div>
                </div>
              </div>

              {captions.length === 0 && !loading ? (
                <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4 bg-zinc-100/50 dark:bg-zinc-900/20 rounded-[40px] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                  <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-3xl flex items-center justify-center text-zinc-400">
                    <LayoutGrid size={32} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold dark:text-zinc-600">Waiting for magic...</p>
                    <p className="text-sm text-zinc-400">Fill in the prompt to generate captions.</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {loading ? (
                    Array(4).fill(0).map((_, i) => (
                      <div key={i} className="h-48 bg-zinc-100 dark:bg-zinc-900 rounded-[32px] animate-pulse border border-zinc-200 dark:border-zinc-800" />
                    ))
                  ) : (
                    <AnimatePresence>
                      {captions.map((cap, i) => (
                        <motion.div
                          key={cap.id}
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`group p-8 rounded-[40px] relative overflow-hidden flex flex-col justify-between min-h-[220px] transition-all duration-500 border ${
                            isDark ? 'bg-zinc-900/50 hover:bg-zinc-900 border-zinc-800' : 'bg-white hover:bg-zinc-50 border-zinc-200 shadow-bento shadow-zinc-200'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${tones.find(t => t.id === cap.tone)?.color}`}>
                              {cap.tone}
                            </span>
                            <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                              <MoreVertical size={16} />
                            </button>
                          </div>
                          
                          <p className="text-lg font-bold leading-relaxed pr-6 italic">
                            "{cap.text}"
                          </p>

                          <div className="mt-8 flex items-center justify-between">
                            <div className="flex -space-x-2">
                              <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-zinc-900 flex items-center justify-center"><Zap size={10} /></div>
                              <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-zinc-900" />
                              <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-zinc-900" />
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => copy(cap.text, cap.id)}
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                                  copiedId === cap.id ? 'bg-[#22c55e] text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                }`}
                              >
                                {copiedId === cap.id ? <Check size={20} /> : <Copy size={20} />}
                              </button>
                              <button className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700">
                                <Share2 size={20} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-200 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 text-zinc-500">
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 bg-[#22c55e] rounded-lg"></div>
           <span className="font-black text-sm tracking-tighter dark:text-zinc-400">CaptiNova v1.0</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
          <span>Neural Engine</span>
          <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
          <span>Open Standards</span>
        </div>
        <p className="text-xs font-bold italic tracking-wider flex items-center gap-1.5">
          Made with <Heart size={14} className="text-red-500 fill-red-500" /> by AI Magic
        </p>
      </footer>
    </div>
  );
}

