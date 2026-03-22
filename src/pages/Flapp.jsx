import React, { useEffect, useRef } from 'react';
import './Flapp.css';
import { Smartphone, CheckCircle, Clock, Eye, Sliders, Database } from 'lucide-react';

const Flapp = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    { title: "Production Tracking", desc: "Monitor output, track progress against goals, and identify bottlenecks in real-time from the factory floor.", icon: <Sliders /> },
    { title: "Inventory Oversight", desc: "Live, accurate count of raw materials and finished goods, reducing waste.", icon: <Database /> },
    { title: "Purchasing Management", desc: "Streamline procurement requests and approvals.", icon: <CheckCircle /> }
  ];

  return (
    <div className="flapp-page">
      <header className="page-header section text-center">
        <div className="container">
          <div className="hero-badge animate-fade-up">Frontline Operations, Made Visible</div>
          <h1 className="hero-title animate-fade-up" style={{ animationDelay: '100ms' }}>
            <span className="text-gradient">FLAPP</span> Mobile App
          </h1>
          <p className="hero-subtitle animate-fade-up" style={{ animationDelay: '200ms' }}>
            A lightweight, customizable mobile application built for frontline factory operations.
          </p>
        </div>
      </header>

      <section className="section section-darker flapp-features-section">
        <div className="container grid bento-grid">
          <div className="glass-panel premium-card bento-large border-beam staggered-anim" ref={el => elementsRef.current[0] = el}>
            <div className="card-content">
              <h2>Your factory operations, visible on your phone.</h2>
              <p>FLAPP enables manufacturers to capture real-time operational data, convert it into clear dashboards, and make timely, data-driven decisions without the cost, complexity, or disruption of traditional ERP systems.</p>
              
              <div className="flapp-stats mt-xl">
                <div className="stat-card horizontal-flex">
                  <Clock className="icon-large" />
                  <div>
                    <h4 className="text-large">100%</h4>
                    <span className="text-muted">Real-time visibility</span>
                  </div>
                </div>
                <div className="stat-card horizontal-flex">
                  <Eye className="icon-large" />
                  <div>
                    <h4 className="text-large">0</h4>
                    <span className="text-muted">Manual Reporting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel premium-card phone-mockup staggered-anim" ref={el => elementsRef.current[1] = el}>
            <div className="phone-frame">
              <div className="phone-screen">
                <div className="app-header">FLAPP Dashboard</div>
                <div className="app-body">
                  <div className="app-card placeholder-shimmer"></div>
                  <div className="app-card placeholder-shimmer" style={{animationDelay: '0.2s'}}></div>
                  <div className="app-card placeholder-shimmer" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          </div>

          {features.map((feat, idx) => (
            <div className="glass-panel premium-card staggered-anim" key={idx} ref={el => elementsRef.current[2 + idx] = el}>
              <div className="card-content">
                <div className="card-icon">{feat.icon}</div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
};

export default Flapp;
