import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Activity, Cpu, ShieldCheck, Terminal, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useArticles } from '../context/ArticleContext';

const Typewriter = ({ phrases, typingSpeed = 50, deletingSpeed = 30, pause = 2000, className = 'font-mono' }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer;
    const currentPhase = phrases[loopNum % phrases.length];
    
    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        timer = setTimeout(() => {}, 500);
      } else {
        timer = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
      }
    } else {
      if (text === currentPhase) {
        timer = setTimeout(() => setIsDeleting(true), pause);
      } else {
        timer = setTimeout(() => setText(currentPhase.slice(0, text.length + 1)), typingSpeed);
      }
    }
    
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, phrases, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={`inline-block text-primary ${className}`}>
      {text}
      <span className="animate-pulse ml-1 inline-block w-2 bg-primary h-[1em] align-middle -mt-1"></span>
    </span>
  );
};

const Home = () => {
  const heroRef = useRef(null);
  const { articles } = useArticles();

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const bg = heroRef.current.querySelector('.hero-bg-parallax');
        const content = heroRef.current.querySelector('.hero-content-parallax');
        if (bg && content) {
          bg.style.transform = `translateY(${scrollY * 0.5}px)`;
          content.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-end justify-start pb-24 pt-32 overflow-hidden" ref={heroRef}>
        {/* Abstract Parallax Background */}
        <div className="hero-bg-parallax absolute inset-0 -z-20 bg-background bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/20 via-background to-background">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30 mix-blend-overlay"></div>
          {/* Heavy Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="hero-content-parallax container mx-auto px-6 max-w-7xl z-10 w-full transition-transform duration-300 ease-out">
          <div className="flex flex-col items-start gap-6">
            
            {/* Interactive Telemetry Artifact */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 animate-slide-up shadow-[0_0_20px_rgba(220,38,38,0.15)]">
              <Terminal size={16} className="text-primary opacity-80" />
              <div className="text-xs tracking-wider uppercase font-mono text-zinc-400">
                <span className="hidden sm:inline">STATUS: </span>
                <Typewriter phrases={[
                  "SYS.OP_EXCELLENCE_INIT",
                  "AWAITING_MANUFACTURING_DATA...",
                  "OPTIMIZING_FACTORY_PERFORMANCE",
                  "TRACKING_KPI: 99.4%"
                ]} />
              </div>
            </div>
            
            {/* Aggressive Typography & Contrast */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black leading-[0.9] text-white tracking-tighter animate-slide-up" style={{ animationDelay: '100ms' }}>
              TRANSFORM<br/>
              <Typewriter phrases={['MANUFACTURING', 'OPERATIONS', 'EFFICIENCY']} pause={2500} className="" /><br/>
              INTO EXCELLENCE.
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl animate-slide-up mt-2 font-medium" style={{ animationDelay: '200ms' }}>
              We partner with manufacturers to transform operations, enhance efficiency,
              and drive sustainable performance improvement through structured methodologies.
            </p>
            
            <div className="animate-slide-up mt-6 flex gap-4" style={{ animationDelay: '300ms' }}>
              <Link to="/journey" className="inline-flex items-center gap-3 bg-white text-black hover:bg-primary hover:text-white px-8 py-5 rounded-none font-bold tracking-widest uppercase transition-all duration-300 hover:translate-x-2">
                EXPLORE THE JOURNEY <ArrowRight size={20} />
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Offerings</h2>
            <p className="text-muted-foreground text-lg">End-to-End Industrial Transformation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(180px,auto)] gap-8">
            {/* Journey Card - Large Span */}
            <div className="md:col-span-8 md:row-span-2 glass-panel rounded-industrial transition-all duration-300 hover:-translate-y-2 hover:border-primary glow-primary overflow-hidden group">
              <div className="p-8 h-full flex flex-col relative z-10 bg-gradient-to-br from-card to-background">
                <div className="mb-8 text-primary bg-primary/10 w-16 h-16 flex items-center justify-center rounded-xl">
                  <Activity size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">THE Journey</h3>
                <p className="text-muted-foreground flex-grow mb-8 text-lg">A comprehensive, phased transformation service designed to elevate factory performance across all core operational pillars. Integrates process design, KPIs, digital tools, and on-ground implementation.</p>
                <Link to="/journey" className="font-heading font-semibold text-primary inline-flex items-center gap-2 hover:gap-3 transition-all">
                  Discover THE Journey <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* FLAPP Card */}
            <div className="md:col-span-4 glass-panel rounded-industrial transition-all duration-300 hover:-translate-y-2 hover:border-primary glow-primary group">
              <div className="p-8 h-full flex flex-col bg-gradient-to-b from-card to-background">
                <div className="mb-8 text-primary bg-primary/10 w-16 h-16 flex items-center justify-center rounded-xl">
                  <Cpu size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">FLAPP</h3>
                <p className="text-muted-foreground flex-grow mb-8">A mobile-first system capturing real-time shop floor data.</p>
                <Link to="/flapp" className="font-heading font-semibold text-primary inline-flex items-center gap-2 hover:gap-3 transition-all">
                  Learn About FLAPP <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Stats Card */}
            <div className="md:col-span-4 glass-panel rounded-industrial flex flex-col items-center justify-center text-center p-8 transition-transform hover:scale-[1.02]">
              <div className="text-6xl font-bold font-heading bg-gradient-to-t from-muted-foreground to-foreground bg-clip-text text-transparent mb-2">
                197+
              </div>
              <div className="font-mono text-muted-foreground uppercase tracking-widest text-sm">Improvement Projects</div>
            </div>

            {/* Quality Card */}
            <div className="md:col-span-12 glass-panel rounded-industrial flex items-center p-8 transition-all duration-300 hover:border-primary">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                <ShieldCheck size={48} className="text-success shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Quality into Practice</h3>
                  <p className="text-muted-foreground text-lg">Building robust systems to align with expectations, ensuring high-standard outputs and sustainable growth.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-32 relative z-10 border-t border-border/50 bg-background/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
                <BookOpen size={16} />
                <span className="text-sm font-semibold tracking-wide">INSIGHTS & NEWS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">Latest Knowledge</h2>
            </div>
            <Link to="/articles" className="inline-flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all shrink-0">
              View All Articles <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article) => (
              <Link to={`/articles/${article.id}`} key={article.id} className="group glass-panel rounded-industrial overflow-hidden flex flex-col transition-all hover:scale-[1.02] hover:shadow-glow cursor-pointer">
                <div className="relative h-48 overflow-hidden bg-muted">
                  {article.imageUrl ? (
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <BookOpen size={40} className="opacity-20" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.author}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                    {article.content}
                  </p>
                  
                  <span className="flex items-center gap-2 text-sm font-bold text-primary w-fit group/btn">
                    Read More
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
            
            {articles.length === 0 && (
              <div className="md:col-span-3 text-center py-16 text-muted-foreground glass-panel rounded-industrial">
                <BookOpen size={40} className="mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-bold mb-2">No Articles Found</h3>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Vision / Mission Section */}
      <section className="py-32 bg-secondary/50 border-t border-border/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Vision & Mission</h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Becoming the leading transformation partner for industrial excellence, empowering factories to reach world-class operational standards.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We design, implement, monitor, and sustain operational excellence initiatives directly on the ground, ensuring real results.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-panel p-8 text-center rounded-industrial">
                <h4 className="text-4xl font-bold text-primary mb-2">60+</h4>
                <span className="text-muted-foreground font-medium">Businesses</span>
              </div>
              <div className="glass-panel p-8 text-center rounded-industrial">
                <h4 className="text-4xl font-bold text-primary mb-2">23+</h4>
                <span className="text-muted-foreground font-medium">Sectors</span>
              </div>
              <div className="col-span-2 glass-panel p-8 text-center rounded-industrial bg-card/40">
                <h4 className="text-4xl font-bold text-primary mb-2">100%</h4>
                <span className="text-muted-foreground font-medium">Real-time Visibility</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
