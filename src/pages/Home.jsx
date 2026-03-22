import React, { useEffect, useRef } from 'react';
import { ArrowRight, Activity, Cpu, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const bg = heroRef.current.querySelector('.hero-bg');
        const content = heroRef.current.querySelector('.hero-content');
        if (bg && content) {
          bg.style.transform = `translateY(${scrollY * 0.5}px)`;
          content.style.transform = `translateY(${scrollY * 1.2}px)`;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-bg"></div>
        <div className="container hero-content">
          <div className="hero-badge animate-fade-up">Navigating Industrial Evolution</div>
          <h1 className="hero-title animate-fade-up" style={{ animationDelay: '100ms' }}>
            Transforming <span className="text-gradient">Manufacturing</span><br/>
            Into Excellence
          </h1>
          <p className="hero-subtitle animate-fade-up" style={{ animationDelay: '200ms' }}>
            We partner with manufacturers to transform operations, enhance efficiency,
            and drive sustainable performance improvement through structured methodologies.
          </p>
          <div className="hero-cta animate-fade-up" style={{ animationDelay: '300ms' }}>
            <Link to="/journey" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Explore THE Journey <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Offerings Section (CSS Grid, varying card sizes) */}
      <section className="section offerings-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Our Core Offerings</h2>
            <p className="section-desc">End-to-End Industrial Transformation</p>
          </div>

          <div className="grid bento-grid">
            {/* Journey Card - Large Span */}
            <div className="glass-panel premium-card bento-large border-beam">
              <div className="card-content">
                <div className="card-icon"><Activity size={32} /></div>
                <h3>THE Journey</h3>
                <p>A comprehensive, phased transformation service designed to elevate factory performance across all core operational pillars. Integrates process design, KPIs, digital tools, and on-ground implementation.</p>
                <Link to="/journey" className="card-link">Discover THE Journey <span>&rarr;</span></Link>
              </div>
            </div>

            {/* FLAPP Card */}
            <div className="glass-panel premium-card border-beam">
              <div className="card-content">
                <div className="card-icon"><Cpu size={32} /></div>
                <h3>FLAPP</h3>
                <p>A mobile-first system capturing real-time shop floor data.</p>
                <Link to="/flapp" className="card-link">Learn About FLAPP <span>&rarr;</span></Link>
              </div>
            </div>

            {/* Stats Card */}
            <div className="glass-panel premium-card">
              <div className="card-content stat-card">
                <div className="stat-number">197+</div>
                <div className="stat-label">Improvement Projects</div>
              </div>
            </div>

            {/* Quality Card */}
            <div className="glass-panel premium-card bento-wide">
              <div className="card-content row-content">
                <ShieldCheck size={48} className="icon-large" />
                <div>
                  <h3>Quality into Practice</h3>
                  <p>Building robust systems to align with expectations, ensuring high-standard outputs and sustainable growth.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission Section */}
      <section className="section vision-section">
        <div className="container">
          <div className="grid vision-grid">
            <div className="vision-text">
              <h2>Vision & Mission</h2>
              <p>Becoming the leading transformation partner for industrial excellence, empowering factories to reach world-class operational standards.</p>
              <p>We design, implement, monitor, and sustain operational excellence initiatives directly on the ground, ensuring real results.</p>
            </div>
            <div className="vision-stats grid">
              <div className="stat-box glass-panel premium-card">
                <h4>60+</h4><span>Businesses</span>
              </div>
              <div className="stat-box glass-panel premium-card">
                <h4>23+</h4><span>Sectors</span>
              </div>
              <div className="stat-box glass-panel premium-card" style={{gridColumn: 'span 2'}}>
                <h4>100%</h4><span>Real-time Visibility</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
