import React, { useRef, useState, useEffect } from 'react';
import { Network, Search, Briefcase, Zap, Trello, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { t, tx } from '../lib/translations';

const Journey = () => {
  const scrollRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { lang, isAr } = useLanguage();

  const CARD_W = 370; // card width + gap

  const phases = t.journey.phases.map((phase, i) => ({
    title: tx(phase.title, lang),
    desc:  tx(phase.desc,  lang),
    metrics: phase.metrics[lang] || phase.metrics.en,
    icon: [<Network size={40} />, <Trello size={40} />, <Search size={40} />, <Briefcase size={40} />, <Zap size={40} />][i],
    color: ['#dc2626','#b91c1c','#991b1b','#7f1d1d','#dc2626'][i],
  }));

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    // Detect active card
    const idx = Math.round(el.scrollLeft / CARD_W);
    setActiveIdx(Math.min(idx, phases.length - 1));
  };

  const scrollTo = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * CARD_W, behavior: 'smooth' });
  };

  const scrollToCard = (idx) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * CARD_W, behavior: 'smooth' });
  };

  // Mouse drag support
  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX);
  };
  const onMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, []);

  return (
    <div className="w-full relative z-10">
      <header className="min-h-[42vh] flex flex-col justify-center items-center pt-32 pb-16 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-sm animate-slide-up">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {tx(t.journey.badge, lang)}
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-foreground animate-slide-up">
            {isAr ? <span className="text-gradient">{tx(t.journey.heading, lang)}</span> : <>THE <span className="text-gradient">Journey</span></>}
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up max-w-2xl mx-auto" style={{ animationDelay: '100ms' }}>
            {tx(t.journey.subheading, lang)}
          </p>
        </div>
      </header>

      {/* Swipe Section */}
      <section className="overflow-hidden pb-16">

        {/* Swipe Hint Bar */}
        <div className="flex items-center justify-between px-6 md:px-12 mb-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium animate-pulse">
            <span className="flex items-center gap-1">
              <ChevronLeft size={14} className="opacity-50" />
              <span className="text-xs tracking-widest uppercase font-bold">{tx(t.journey.swipeHint, lang)}</span>
              <ChevronRight size={14} />
            </span>
          </div>

          {/* Scroll Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo(-1)}
              disabled={!canScrollLeft}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
                canScrollLeft
                  ? 'border-primary/50 bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105'
                  : 'border-border/30 bg-background/50 text-muted-foreground/30 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollTo(1)}
              disabled={!canScrollRight}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
                canScrollRight
                  ? 'border-primary/50 bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105'
                  : 'border-border/30 bg-background/50 text-muted-foreground/30 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scroll Track */}
        <div className="relative">
          {/* Left fade */}
          <div className={`absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
          {/* Right fade */}
          <div className={`absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

          {/* Cards */}
          <div
            ref={scrollRef}
            className={`flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 px-6 md:px-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {phases.map((phase, idx) => (
              <div
                key={idx}
                className={`glass-panel rounded-industrial min-w-[340px] md:min-w-[370px] w-[340px] md:w-[370px] shrink-0 snap-center relative p-8 flex flex-col cursor-pointer transition-all duration-500 group ${
                  activeIdx === idx
                    ? 'border-primary/60 shadow-[0_0_40px_rgba(220,38,38,0.15)] scale-[1.01]'
                    : 'hover:border-primary/30 hover:shadow-[0_0_20px_rgba(220,38,38,0.08)]'
                }`}
                style={{ animationDelay: `${200 + idx * 100}ms` }}
                onClick={() => scrollToCard(idx)}
              >
                {/* Phase number watermark */}
                <div className="absolute top-6 right-6 font-mono text-7xl font-black text-white/[0.04] leading-none select-none">
                  0{idx + 1}
                </div>

                {/* Active indicator */}
                {activeIdx === idx && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-t-2xl" />
                )}

                {/* Icon */}
                <div className="mb-8 text-primary bg-primary/10 w-16 h-16 flex items-center justify-center rounded-xl relative z-10 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.1)]">
                  {phase.icon}
                </div>

                {/* Phase label */}
                <div className="text-[10px] font-mono tracking-[0.2em] text-primary uppercase mb-2 z-10 relative">
                  Phase {String(idx + 1).padStart(2, '0')}
                </div>

                <h3 className="text-2xl font-bold mb-4 relative z-10 group-hover:text-primary transition-colors duration-300">
                  {phase.title}
                </h3>
                <p className="text-muted-foreground flex-grow relative z-10 text-base leading-relaxed">
                  {phase.desc}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-2 mt-8 relative z-10">
                  {phase.metrics.map((m, i) => (
                    <span key={i} className="text-[11px] font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {m}
                    </span>
                  ))}
                </div>

                {/* Arrow hint */}
                {idx < phases.length - 1 && activeIdx === idx && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg animate-bounce hidden md:flex">
                    <ArrowRight size={12} className="text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* End spacer */}
            <div className="min-w-[40px] shrink-0" />
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {phases.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className={`transition-all duration-300 rounded-full ${
                activeIdx === i
                  ? 'w-6 h-2 bg-primary shadow-[0_0_8px_rgba(220,38,38,0.6)]'
                  : 'w-2 h-2 bg-border hover:bg-primary/40'
              }`}
            />
          ))}
        </div>

        {/* Phase counter */}
        <p className="text-center text-muted-foreground text-xs font-mono tracking-widest uppercase mt-3">
          Phase {String(activeIdx + 1).padStart(2, '0')} / {String(phases.length).padStart(2, '0')}
        </p>
      </section>
    </div>
  );
};

export default Journey;
