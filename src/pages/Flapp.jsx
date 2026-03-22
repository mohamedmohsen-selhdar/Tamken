import React, { useEffect, useRef } from 'react';
import { Smartphone, CheckCircle, Clock, Eye, Sliders, Database } from 'lucide-react';

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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground animate-slide-up" style={{ animationDelay: '100ms' }}>
            <span className="text-gradient">FLAPP</span> Mobile App
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: '200ms' }}>
            A lightweight, customizable mobile application built for frontline factory operations.
          </p>
        </div>
      </header>

      <section className="bg-secondary/50 border-t border-border/50 shadow-[inset_0_20px_40px_rgba(0,0,0,0.5)] pt-24 pb-32">
        <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div 
            className="md:col-span-8 md:row-span-2 glass-panel rounded-industrial transition-all duration-700 ease-out opacity-0 translate-y-6 glow-primary hover:border-primary group"
            ref={el => elementsRef.current[0] = el}
          >
            <div className="p-8 h-full flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-primary transition-colors">Your factory operations, visible on your phone.</h2>
              <p className="text-xl text-muted-foreground mb-12">
                FLAPP enables manufacturers to capture real-time operational data, convert it into clear dashboards, and make timely, data-driven decisions without the cost, complexity, or disruption of traditional ERP systems.
              </p>
              
              <div className="flex flex-col md:flex-row gap-8 mt-auto">
                <div className="flex items-center gap-4 bg-background/50 p-6 rounded-2xl border border-white/5">
                  <Clock size={40} className="text-primary shrink-0" />
                  <div>
                    <h4 className="text-4xl font-bold text-foreground">100%</h4>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Real-time visibility</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-background/50 p-6 rounded-2xl border border-white/5">
                  <Eye size={40} className="text-primary shrink-0" />
                  <div>
                    <h4 className="text-4xl font-bold text-foreground">0</h4>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Manual Reporting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="md:col-span-4 md:row-span-2 flex justify-center items-center py-16 perspective-1000 transition-all duration-700 ease-out opacity-0 translate-y-6"
            ref={el => elementsRef.current[1] = el}
          >
            <div className="w-[260px] h-[520px] rounded-[36px] bg-[#2a2a2a] border-[6px] border-[#4a4a4a] shadow-[0_20px_40px_rgba(0,0,0,0.6),inset_0_4px_8px_rgba(255,255,255,0.1)] overflow-hidden relative transition-transform duration-500 hover:-rotate-y-12 hover:rotate-x-6 hover:scale-105 group">
              <div className="w-full h-full bg-background flex flex-col">
                <div className="p-4 bg-primary text-primary-foreground font-bold font-heading text-center shadow-md">
                  FLAPP Dashboard
                </div>
                <div className="p-4 flex flex-col gap-4 grow">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i} 
                      className="h-[72px] rounded-xl bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.05)_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_ease-in-out]"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {features.map((feat, idx) => (
            <div 
              className="md:col-span-4 glass-panel rounded-industrial transition-all duration-700 ease-out opacity-0 translate-y-6 hover:-translate-y-2 hover:border-primary group"
              key={idx} 
              ref={el => elementsRef.current[2 + idx] = el}
            >
              <div className="p-8 h-full flex flex-col">
                <div className="mb-6 text-primary bg-primary/10 w-16 h-16 flex items-center justify-center rounded-xl">
                  {feat.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{feat.title}</h3>
                <p className="text-muted-foreground text-lg">{feat.desc}</p>
              </div>
            </div>
          ))}

        </div>
      </section>
      
      {/* Explicit shimmer keyframes for Tailwind since we removed the css file */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}} />
    </div>
  );
};

export default Flapp;
