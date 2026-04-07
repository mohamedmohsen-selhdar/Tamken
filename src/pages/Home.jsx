import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Activity, Cpu, ShieldCheck, Terminal, BookOpen, MessageSquare, Layers, Hexagon, Mic } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useArticles } from '../context/ArticleContext';
import { FloatingSquares } from '../components/FloatingSquares';

const testimonialsData = [
  {
      id: 1,
      testimonial: "Tamken's strategic intervention completely transformed our operational efficiency. Their ability to drill down to the core issues and implement sustainable processes is unmatched.",
      by: "Mr. Abdo Shoulah",
      role: "CEO",
      company: "RICHIE Furniture",
  },
  {
      id: 2,
      testimonial: "Working with Tamken was a turning point for GP Plast. Their insights into our supply chain directly impacted our bottom line. They bring a rare combination of industrial expertise and practical execution.",
      by: "Peter Magdy",
      role: "CEO",
      company: "GP Plast",
  },
  {
      id: 3,
      testimonial: "The clarity and direction we gained from their consulting sessions were invaluable. They have a unique talent for taking complex business challenges and breaking them down into actionable steps.",
      by: "Ayman Hosny",
      role: "CEO",
      company: "in&In",
  },
  {
      id: 4,
      testimonial: "Every time we hit a production bottleneck, Tamken's engineering frameworks help us map the exact root cause. We operate at a completely different efficiency level now.",
      by: "M.Saad",
      role: "CEO",
      company: "Alamain outdoor furniture",
  },
  {
      id: 5,
      testimonial: "They don't just provide consulting; they provide actual execution architecture. We scaled our regional distribution by 3X entirely through their optimization roadmaps.",
      by: "Mohamed El-sharkawy",
      role: "CEO",
      company: "APT Sharky",
  }
];

const clientsList = [
    "RICHIE", "Egypt Gold", "Contistahl", "EIPAL",
    "Harmony", "MITCO", "TRONIX", "GIZ"
];

const Typewriter = ({ phrases, typingSpeed = 100, deletingSpeed = 50, pause = 1500, className = "" }) => {
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
  const navigate = useNavigate();
  const { articles } = useArticles();

  const [currentWord, setCurrentWord] = useState(0);
  const words = ["MANUFACTURING", "EFFICIENCY", "EXCELLENCE"];

  useEffect(() => {
      const interval = setInterval(() => {
          setCurrentWord((prev) => (prev + 1) % words.length);
      }, 3000);
      return () => clearInterval(interval);
  }, []);

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
    <div className="w-full relative">
      {/* Floating Action Button - AI Agent */}
      <div className="fixed bottom-8 left-8 z-50 animate-fade-in group" style={{ animationDelay: '1000ms' }}>
        <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md group-hover:bg-primary/40 transition-all duration-300 animate-pulse"></div>
        <a href="https://elevenlabs.io/app/talk-to?agent_id=agent_8701knmfpehweyxa79pzab4m9agd&branch_id=agtbrch_8601knmfpgfnfvvsvt281q93ykxa" target="_blank" rel="noopener noreferrer" className="relative flex items-center justify-center w-14 h-14 bg-black text-white dark:bg-white dark:text-black rounded-full shadow-[0_4px_30px_rgba(220,38,38,0.5)] border border-white/10 hover:scale-110 transition-transform duration-300">
          <Mic className="w-6 h-6" />
        </a>
      </div>
      {/* Hero Section */}
      <section className="relative min-h-[95vh] w-full overflow-hidden bg-background flex flex-col items-center justify-center p-4 md:p-8 pt-24" ref={heroRef}>
        
        {/* Top-Left Volumetric Light Ray (Sunlight Shadow) */}
        <div className="absolute top-[-20%] left-[20%] w-[120%] h-[150%] origin-top-left -rotate-45 pointer-events-none z-0 mix-blend-screen opacity-100">
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-transparent blur-3xl"></div>
        </div>

        {/* Abstract Parallax Background */}
        <div className="hero-bg-parallax absolute inset-0 -z-20 bg-background bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background dark:from-primary/10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-10 dark:opacity-30 mix-blend-overlay"></div>
          {/* Heavy Overlay */}
          <div className="absolute inset-0 dark:bg-black/80"></div>
        </div>

        <FloatingSquares />

        <div className="hero-content-parallax relative z-10 max-w-5xl text-center flex flex-col items-center mt-16 w-full transition-transform duration-300 ease-out pointer-events-none">
          
          {/* Semantic Badge */}
          <div className="flex items-center gap-2 mb-8 text-foreground/70 dark:text-zinc-400 font-mono tracking-widest uppercase text-[10px] md:text-xs border border-border/50 px-4 py-1.5 rounded-full bg-background/40 backdrop-blur-md animate-fade-in">
            <span>MANUFACTURING NETWORK</span>
          </div>

          {/* Sliding Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-sans tracking-tight text-foreground dark:text-white mb-8 leading-[0.9] drop-shadow-xl w-full animate-slide-up uppercase" style={{ animationDelay: '100ms' }}>
            TRANSFORM OPERATIONS INTO
            <span className="relative block w-full h-[1.1em] text-center align-top overflow-hidden font-bold mt-4 text-primary text-gradient drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                {words.map((word, index) => (
                    <span
                        key={word}
                        className={`absolute left-0 top-0 w-full transition-all duration-700 ease-in-out ${currentWord === index
                            ? "opacity-100 translate-y-0"
                            : currentWord < index
                                ? "opacity-0 translate-y-full"
                                : "opacity-0 -translate-y-full"
                            }`}
                    >
                        {word}
                    </span>
                ))}
            </span>
          </h1>

          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed mb-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
            Transform designs into high-precision fabricated parts that captivate your customers and fuel business growth.
          </p>

          {/* Central Glowing CTA */}
          <div className="relative pointer-events-auto flex items-center justify-center w-full max-w-[600px] mt-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
              
              {/* Orbiting Icons */}
              <div className="absolute inset-0 pointer-events-none opacity-20 hidden md:block">
                  <div className="absolute top-[10%] left-[20%] text-foreground/40 bg-surface-elevated p-3 rounded-xl border border-border/50 shadow-industrial backdrop-blur-sm animate-float" style={{ animationDelay: '0ms' }}>
                      <Cpu className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="absolute bottom-[20%] left-[10%] text-foreground/40 bg-surface-elevated p-3 rounded-xl border border-border/50 shadow-industrial backdrop-blur-sm animate-float" style={{ animationDelay: '600ms' }}>
                      <Layers className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="absolute top-[20%] right-[15%] text-foreground/40 bg-surface-elevated p-3 rounded-xl border border-border/50 shadow-industrial backdrop-blur-sm animate-float" style={{ animationDelay: '1200ms' }}>
                      <Activity className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="absolute bottom-[25%] right-[15%] text-foreground/40 bg-surface-elevated p-3 rounded-xl border border-border/50 shadow-industrial backdrop-blur-sm animate-float" style={{ animationDelay: '1800ms' }}>
                      <Hexagon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-6">
                <button
                    className="relative group cursor-pointer"
                    onClick={() => navigate("/journey")}
                >
                    <span className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></span>
                    <span className="absolute inset-0 rounded-full overflow-hidden">
                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                    </span>
                    <div className="relative flex items-center justify-center gap-3 space-x-2 rounded-full bg-[#1f1f1f] border border-[#2a2a2a] px-8 py-4 text-base md:text-lg font-medium text-white z-10 hover:bg-[#2a2a2a] transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                        <span className="relative mt-0.5 tracking-wide">Explore the Journey</span>
                    </div>
                </button>
              </div>
          </div>
        </div>

        {/* Subtle Overlay Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
      </section>

      {/* Offerings Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Offerings</h2>
            <p className="text-muted-foreground text-lg">End-to-End Industrial Transformation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Journey Card */}
            <div className="glass-panel p-10 rounded-industrial overflow-hidden relative group hover:shadow-[0_0_40px_rgba(220,38,38,0.2)] transition-all duration-500 hover:-translate-y-2 border border-border/50 hover:border-primary/50">
              <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-primary/5 group-hover:to-primary/10 transition-colors duration-500"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8 text-primary bg-primary/10 w-16 h-16 flex items-center justify-center rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                  <Activity size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">THE Journey</h3>
                <p className="text-muted-foreground flex-grow mb-8 text-lg leading-relaxed">A comprehensive, phased transformation service designed to elevate factory performance across all core operational pillars. Integrates process design, KPIs, digital tools, and on-ground implementation.</p>
                <Link to="/journey" className="font-heading font-semibold text-primary inline-flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-wide">
                  Discover THE Journey <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* FLAPP Card */}
            <div className="glass-panel p-10 rounded-industrial overflow-hidden relative group hover:shadow-[0_0_40px_rgba(220,38,38,0.2)] transition-all duration-500 hover:-translate-y-2 border border-border/50 hover:border-primary/50">
              <div className="absolute inset-0 bg-gradient-to-bl from-card via-background to-primary/5 group-hover:to-primary/10 transition-colors duration-500"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8 text-primary bg-primary/10 w-16 h-16 flex items-center justify-center rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                  <Cpu size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">FLAPP</h3>
                <p className="text-muted-foreground flex-grow mb-8 text-lg leading-relaxed">A mobile-first system capturing real-time shop floor data. Identifies inefficiencies to drive precision and maintain uncompromised standards.</p>
                <Link to="/flapp" className="font-heading font-semibold text-primary inline-flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-wide">
                  Learn About FLAPP <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats and Clients Marquee Section */}
      <section className="py-24 bg-card border-y border-border/50 overflow-hidden relative">
        <div className="container mx-auto px-6 max-w-7xl mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="glass-panel p-8 rounded-industrial hover:shadow-glow transition-all group">
                <h3 className="text-5xl md:text-6xl font-black text-foreground mb-2 flex justify-center items-center group-hover:text-primary transition-colors">+70</h3>
                <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm md:text-md">Clients</p>
            </div>
            <div className="glass-panel p-8 rounded-industrial hover:shadow-glow transition-all group">
                <h3 className="text-5xl md:text-6xl font-black text-foreground mb-2 flex justify-center items-center group-hover:text-primary transition-colors">197</h3>
                <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm md:text-md">Implemented Projects</p>
            </div>
            <div className="glass-panel p-8 rounded-industrial hover:shadow-glow transition-all group">
                <h3 className="text-5xl md:text-6xl font-black text-foreground mb-2 flex justify-center items-center group-hover:text-primary transition-colors">23</h3>
                <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm md:text-md">Different Industry</p>
            </div>
          </div>
        </div>

        {/* Infinite Clients Marquee */}
        <div className="relative flex overflow-hidden whitespace-nowrap py-4">
            <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-card to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-card to-transparent z-10" />
            <div className="flex animate-marquee whitespace-nowrap items-center w-max hover:[animation-play-state:paused]">
                {[...clientsList, ...clientsList, ...clientsList, ...clientsList].map((client, i) => (
                    <span key={i} className="text-3xl md:text-5xl font-black text-foreground/20 hover:text-foreground transition-all duration-300 uppercase tracking-widest cursor-default mx-12 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                        {client}
                    </span>
                ))}
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

      {/* Testimonials Section */}
      <section className="py-32 relative z-10 border-t border-border/50 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 max-w-7xl z-10 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
              <MessageSquare size={16} />
              <span className="text-sm font-semibold tracking-wide">CLIENT SUCCESS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-sans font-bold mb-6 text-white">Real-world Transformations</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Driven by precision methodologies and uncompromised standards.</p>
          </div>
        </div>

        {/* Moving Testimonials Marquee */}
        <div className="relative flex overflow-hidden py-10 w-full max-w-[100vw]">
            {/* Fade Edges for the Testimonials Marquee */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
            
            <div className="flex animate-marquee whitespace-nowrap items-stretch w-max hover:[animation-play-state:paused] ease-linear duration-1000">
                {[...testimonialsData, ...testimonialsData].map((item, i) => (
                  <div key={`${item.id}-${i}`} className="inline-flex flex-col justify-between w-[350px] md:w-[450px] whitespace-normal glass-panel p-8 mx-4 rounded-industrial transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] bg-[#111] border-border/50 hover:border-primary/50 group/testi">
                    <div className="mb-8">
                      <div className="text-primary opacity-30 mb-8 h-8 group-hover/testi:opacity-100 transition-opacity">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" /></svg>
                      </div>
                      <p className="text-base md:text-lg leading-relaxed text-zinc-300 italic flex-grow hover:text-white transition-colors">"{item.testimonial}"</p>
                    </div>
                    <div className="mt-auto pt-6 border-t border-border/20">
                      <h4 className="font-bold text-white tracking-wide">{item.by}</h4>
                      <p className="text-sm text-primary font-medium">{item.role}, {item.company}</p>
                    </div>
                  </div>
                ))}
            </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
