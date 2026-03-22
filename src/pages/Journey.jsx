import React from 'react';
import { Network, Search, Briefcase, Zap, Trello } from 'lucide-react';

const Journey = () => {
  const phases = [
    {
      title: "Foundation",
      desc: "Refining processes, defining structures, aligning teams, and enhancing data-driven decision-making.",
      icon: <Network size={40} />,
      metrics: ["12~15 Weeks", "Complexity Management", "As-is Mapping"]
    },
    {
      title: "Supply Chain Excellence",
      desc: "Streamlines supply chain operations, enhancing planning, sourcing, and inventory management.",
      icon: <Trello size={40} />,
      metrics: ["10~13 Weeks", "Scaling Production", "Demand Forecasting"]
    },
    {
      title: "Quality Excellence",
      desc: "Builds robust quality systems to align with customer expectations, ensuring consistent outputs.",
      icon: <Search size={40} />,
      metrics: ["8~10 Weeks", "Maintaining Standards", "CTQ Parameters"]
    },
    {
      title: "Maintenance Excellence",
      desc: "Optimizes maintenance practices to maximize equipment reliability and minimize downtime.",
      icon: <Briefcase size={40} />,
      metrics: ["8~11 Weeks", "Reliability at Scale", "Criticality Analysis"]
    },
    {
      title: "Finance & Operation Alignment",
      desc: "Integrates financial insights with operational strategies to ensure data-driven decision-making.",
      icon: <Zap size={40} />,
      metrics: ["8~11 Weeks", "Financial Transparency", "ABC Costing"]
    }
  ];

  return (
    <div className="w-full relative z-10">
      <header className="min-h-[40vh] flex flex-col justify-center items-center pt-32 pb-16 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground animate-slide-up">THE Journey</h1>
          <p className="text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: '100ms' }}>
            A comprehensive, phased transformation service designed to elevate factory performance across all core operational pillars.
          </p>
        </div>
      </header>

      <section className="overflow-hidden pb-32">
        <div className="px-6 md:px-12">
          {/* Horizontal Gallery with Snap Scroll */}
          <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" 
               style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
            
            {phases.map((phase, idx) => (
              <div 
                key={idx}
                className="glass-panel rounded-industrial min-w-[350px] w-[350px] shrink-0 snap-center relative p-8 flex flex-col animate-slide-in-right hover:border-primary transition-colors"
                style={{ animationDelay: `${200 + idx * 100}ms` }}
              >
                <div className="absolute top-6 right-6 font-mono text-6xl font-bold text-white/5 leading-none">
                  0{idx + 1}
                </div>
                
                <div className="mb-8 text-primary bg-primary/10 w-16 h-16 flex items-center justify-center rounded-xl relative z-10">
                  {phase.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 relative z-10">{phase.title}</h3>
                <p className="text-muted-foreground flex-grow relative z-10 text-lg">{phase.desc}</p>
                
                <div className="flex flex-wrap gap-2 mt-8 relative z-10">
                  {phase.metrics.map((m, i) => (
                    <span key={i} className="text-[13px] font-mono px-3 py-1 rounded-full bg-success/10 text-success border border-success/30">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Spacer for ending scroll nicely */}
            <div className="min-w-[5vw] shrink-0"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Journey;
