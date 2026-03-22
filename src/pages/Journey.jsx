import React, { useEffect } from 'react';
import './Journey.css';
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
    <div className="journey-page">
      <header className="page-header section text-center">
        <div className="container">
          <h1 className="hero-title animate-fade-up">THE Journey</h1>
          <p className="hero-subtitle animate-fade-up" style={{ animationDelay: '100ms' }}>
            A comprehensive, phased transformation service designed to elevate factory performance across all core operational pillars.
          </p>
        </div>
      </header>

      <section className="horizontal-gallery-section section pt-0">
        <div className="container">
          <div className="horizontal-gallery">
            {phases.map((phase, idx) => (
              <div 
                className="gallery-card glass-panel premium-card animate-fade-up" 
                key={idx}
                style={{ animationDelay: `${200 + idx * 100}ms` }}
              >
                <div className="phase-number">0{idx + 1}</div>
                <div className="phase-icon card-icon">
                  {phase.icon}
                </div>
                <h3>{phase.title}</h3>
                <p>{phase.desc}</p>
                <div className="phase-metrics">
                  {phase.metrics.map((m, i) => (
                    <span key={i} className="metric-badge">{m}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Journey;
