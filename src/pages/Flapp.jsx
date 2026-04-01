import React, { useEffect, useRef, useState } from 'react';
import { Smartphone, CheckCircle, Clock, Eye, Sliders, Database, Menu, Bell, Home as HomeIcon, Settings, BarChart2, Activity, AlertTriangle } from 'lucide-react';

const InteractiveMobileApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ eff: 87.2, out: 1240, scrap: 2.1 });

  const handleTabClick = (tab) => {
    if(tab !== activeTab) {
      setLoading(true);
      setActiveTab(tab);
      setTimeout(() => setLoading(false), 300); // Simulate network load
    }
  };

  const updateMetrics = () => {
    setLoading(true);
    setTimeout(() => {
      setStats({
        eff: (80 + Math.random() * 15).toFixed(1),
        out: Math.floor(1000 + Math.random() * 800),
        scrap: (1 + Math.random() * 3).toFixed(1)
      });
      setLoading(false);
    }, 400);
  };

  return (
    <div className="w-full h-full bg-[#0a0a0a] text-white flex flex-col font-sans relative overflow-hidden select-none">
      {/* Top Status Bar */}
      <div className="h-6 w-full flex justify-between items-center px-4 text-[10px] text-zinc-400 bg-black/50 z-20">
        <span className="font-bold">9:41</span>
        <div className="flex gap-1.5 items-center">
           {/* Simulate signals/battery */}
           <div className="flex gap-0.5 items-end h-[10px]">
             <span className="w-0.5 h-1 bg-white"></span>
             <span className="w-0.5 h-1.5 bg-white"></span>
             <span className="w-0.5 h-2 bg-white"></span>
             <span className="w-0.5 h-2.5 bg-white/30"></span>
           </div>
           <span className="w-[18px] h-2.5 border border-white/50 rounded-sm relative opacity-80">
              <span className="absolute inset-[1px] bg-white w-2/3"></span>
           </span>
        </div>
      </div>

      {/* App Header */}
      <div className="py-3 px-4 flex justify-between items-center bg-black border-b border-white/10 z-10 shadow-sm">
        <button className="text-zinc-400 hover:text-white transition-colors">
          <Menu size={18} />
        </button>
        <span className="font-heading font-black text-primary tracking-widest text-sm">FLAPP</span>
        <button className="text-zinc-400 hover:text-white transition-colors relative">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]"></span>
        </button>
      </div>

      {/* App Content */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-none relative">
        {loading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-20 flex justify-center items-center animate-fade-in">
            <div className="w-6 h-6 border-[3px] border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="animate-fade-in flex flex-col gap-4 pb-4">
             <div className="bg-gradient-to-br from-primary/20 to-black border border-primary/30 p-4 rounded-xl shadow-[0_4px_20px_rgba(220,38,38,0.1)] relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
                <p className="text-xs text-primary mb-1 uppercase font-bold tracking-wider">Live Plant OEE</p>
                <div className="flex items-end gap-3 mt-1">
                  <span className="text-4xl font-bold tracking-tighter text-white drop-shadow-md">{stats.eff}%</span>
                  <span className="text-xs text-green-400 font-semibold mb-1 flex items-center bg-green-400/10 px-1.5 py-0.5 rounded">
                    +2.4%
                  </span>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl">
                   <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1">Total Output</p>
                   <p className="font-bold text-xl">{stats.out}</p>
                </div>
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl">
                   <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1">Scrap Rate</p>
                   <p className="font-bold text-xl text-red-400">{stats.scrap}%</p>
                </div>
             </div>
             
             <button 
                className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between active:bg-white/10 active:scale-[0.98] transition-all hover:bg-white/10 group mt-1" 
                onClick={updateMetrics}
             >
                <span className="text-xs text-zinc-200 flex items-center gap-2 font-medium">
                  <Activity size={14} className="text-primary group-hover:animate-pulse" /> 
                  Refresh Sensors
                </span>
                <span className="bg-white/10 px-2 py-1 rounded text-[9px] uppercase tracking-wider text-zinc-400 font-bold group-hover:text-white transition-colors">Tap</span>
             </button>
             
             <div className="mt-2 flex flex-col gap-2">
                <h4 className="text-[10px] uppercase text-zinc-500 font-bold mb-1 tracking-widest">Recent Alerts</h4>
                <div className="bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg flex gap-3 items-start">
                  <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-zinc-300 leading-tight">Line A: Extruder temperature exceeded safe threshold by 2°C.</p>
                </div>
                <div className="bg-white/5 border border-white/5 p-2.5 rounded-lg flex gap-3 items-start">
                  <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-zinc-300 leading-tight">Batch #4429 completed successfully.</p>
                </div>
             </div>
          </div>
        )}

        {/* METRICS TAB */}
        {activeTab === 'metrics' && (
          <div className="animate-fade-in flex flex-col gap-4 pb-4">
             <h3 className="text-sm font-bold tracking-wider uppercase text-zinc-400">Weekly Performance</h3>
             <div className="h-36 bg-white/5 border border-white/5 rounded-xl flex items-end justify-between p-4 gap-2">
                {[45, 75, 50, 95, 65, 80, 55].map((h, i) => (
                  <div key={i} className="w-full flex justify-center h-full items-end group">
                    <div 
                      className="w-full bg-primary/80 group-hover:bg-primary transition-all rounded-t-sm" 
                      style={{height: `${h}%`}}
                    ></div>
                  </div>
                ))}
             </div>
             <div className="grid grid-cols-2 gap-3 mt-2">
               <div className="bg-primary/20 border border-primary/30 p-3 rounded-lg text-center">
                 <div className="text-[10px] uppercase tracking-widest text-primary mb-1">Avg Efficiency</div>
                 <div className="text-xl font-bold">78.5%</div>
               </div>
               <div className="bg-white/5 border border-white/5 p-3 rounded-lg text-center">
                 <div className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">Downtime</div>
                 <div className="text-xl font-bold text-red-400">4.2h</div>
               </div>
             </div>
          </div>
        )}

        {/* INVENTORY TAB */}
        {activeTab === 'inventory' && (
          <div className="animate-fade-in flex flex-col gap-2 pb-4">
             <h3 className="text-sm font-bold tracking-wider uppercase text-zinc-400 mb-2">Live Inventory</h3>
             {['Raw Material Alpha', 'Packaging Type C', 'Machinery Part 9X', 'Chemical Solvent', 'Finished Goods Batch'].map((item, i) => (
               <div key={i} className="bg-white/5 border border-white/5 p-3.5 rounded-xl flex justify-between items-center active:scale-[0.98] transition-transform cursor-pointer hover:bg-white/10">
                 <span className="text-xs font-medium text-zinc-200">{item}</span>
                 <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                   {Math.floor(Math.random() * 500) + 10}
                 </span>
               </div>
             ))}
          </div>
        )}

      </div>

      {/* App Bottom Nav */}
      <div className="h-[60px] bg-[#0a0a0a] border-t border-white/10 flex justify-between items-center px-8 z-20 pb-2 pt-2">
        <button 
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'home' ? 'text-primary scale-110' : 'text-zinc-500 hover:text-white'}`} 
          onClick={() => handleTabClick('home')}
        >
           <HomeIcon size={20} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
           <span className="text-[9px] font-bold tracking-widest uppercase">Home</span>
        </button>
        <button 
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'metrics' ? 'text-primary scale-110' : 'text-zinc-500 hover:text-white'}`} 
          onClick={() => handleTabClick('metrics')}
        >
           <BarChart2 size={20} strokeWidth={activeTab === 'metrics' ? 2.5 : 2} />
           <span className="text-[9px] font-bold tracking-widest uppercase">Metrics</span>
        </button>
        <button 
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'inventory' ? 'text-primary scale-110' : 'text-zinc-500 hover:text-white'}`} 
          onClick={() => handleTabClick('inventory')}
        >
           <Database size={20} strokeWidth={activeTab === 'inventory' ? 2.5 : 2} />
           <span className="text-[9px] font-bold tracking-widest uppercase">Stock</span>
        </button>
      </div>
    </div>
  )
}

const Flapp = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-6');
        }
      });
    }, { threshold: 0.1 });

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    { title: "Production Tracking", desc: "Monitor output, track progress against goals, and identify bottlenecks in real-time from the factory floor.", icon: <Sliders size={32} /> },
    { title: "Inventory Oversight", desc: "Live, accurate count of raw materials and finished goods, reducing waste.", icon: <Database size={32} /> },
    { title: "Purchasing Management", desc: "Streamline procurement requests and approvals.", icon: <CheckCircle size={32} /> }
  ];

  return (
    <div className="w-full relative z-10">
      <header className="min-h-[40vh] flex flex-col justify-center items-center pt-32 pb-16 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-sm animate-slide-up">
            Frontline Operations, Made Visible
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-foreground animate-slide-up" style={{ animationDelay: '100ms' }}>
            <span className="text-gradient">FLAPP</span> Mobile App
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up max-w-2xl mx-auto" style={{ animationDelay: '200ms' }}>
            A lightweight, customizable mobile application built for frontline factory operations. Interact with the simulation below to experience it.
          </p>
        </div>
      </header>

      <section className="bg-secondary/50 border-t border-border/50 shadow-[inset_0_20px_40px_rgba(0,0,0,0.5)] pt-24 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div 
            className="lg:col-span-7 flex flex-col justify-center transition-all duration-700 ease-out opacity-0 translate-y-6"
            ref={el => elementsRef.current[0] = el}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">Your factory operations, visible on your phone.</h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              FLAPP enables manufacturers to capture real-time operational data, convert it into clear dashboards, and make timely, data-driven decisions without the cost, complexity, or disruption of traditional ERP systems.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mt-auto">
              <div className="flex items-center gap-4 bg-card/60 backdrop-blur p-6 rounded-2xl border border-white/5 shadow-xl">
                <Clock size={40} className="text-primary shrink-0" />
                <div>
                  <h4 className="text-4xl font-black text-foreground tracking-tighter">100%</h4>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-bold">Real-time visibility</span>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-card/60 backdrop-blur p-6 rounded-2xl border border-white/5 shadow-xl">
                <Eye size={40} className="text-primary shrink-0" />
                <div>
                  <h4 className="text-4xl font-black text-foreground tracking-tighter">0</h4>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-bold">Manual Reporting</span>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="lg:col-span-5 flex justify-center items-center py-8 lg:py-0 perspective-1000 transition-all duration-1000 ease-out opacity-0 translate-y-6"
            ref={el => elementsRef.current[1] = el}
          >
            {/* Phone Container */}
            <div className="w-[300px] h-[600px] rounded-[48px] bg-[#1a1a1a] p-[10px] shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_4px_12px_rgba(255,255,255,0.1)] relative transition-transform duration-700 hover:rotate-y-[-5deg] hover:rotate-x-[2deg] hover:scale-105 group border border-[#333]">
              
              {/* Hardware Details */}
              <div className="absolute top-0 right-1/2 translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-[20px] z-30 flex justify-center items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-black shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]"></div>
                <div className="w-12 h-1.5 rounded-full bg-black shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]"></div>
              </div>
              <div className="absolute -left-[3px] top-32 w-[3px] h-12 bg-[#333] rounded-l-md"></div>
              <div className="absolute -left-[3px] top-48 w-[3px] h-24 bg-[#333] rounded-l-md"></div>
              <div className="absolute -right-[3px] top-40 w-[3px] h-16 bg-[#333] rounded-r-md"></div>

              {/* Screen Content Wrapper */}
              <div className="w-full h-full rounded-[38px] overflow-hidden bg-black relative isolate">
                 <InteractiveMobileApp />
                 
                 {/* Internal Screen Glare */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent mix-blend-overlay rotate-12 scale-[1.5] translate-y-[-20%] pointer-events-none transition-transform duration-700 group-hover:translate-x-1/4"></div>
              </div>
            </div>
            
            {/* Interactive Prompt Tooltip */}
            <div className="absolute -right-8 bottom-24 bg-primary text-white font-bold text-xs uppercase tracking-widest py-2 px-4 rounded-full shadow-xl animate-bounce hidden md:block z-50 pointer-events-none">
              Try It Out!
              <div className="absolute right-full top-1/2 -translate-y-1/2 translate-x-1 border-4 border-transparent border-r-primary"></div>
            </div>
          </div>

        </div>
      </section>

      <section className="py-24 relative z-10 container mx-auto px-6 max-w-7xl">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <div 
                className="glass-panel rounded-industrial transition-all duration-700 ease-out opacity-0 translate-y-6 hover:-translate-y-2 hover:border-primary group"
                key={idx} 
                ref={el => elementsRef.current[2 + idx] = el}
              >
                <div className="p-8 h-full flex flex-col bg-gradient-to-b from-card to-background">
                  <div className="mb-6 text-primary bg-primary/10 w-16 h-16 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                    {feat.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{feat.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
         </div>
      </section>

    </div>
  );
};

export default Flapp;
