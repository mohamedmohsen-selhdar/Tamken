import React from 'react';
import { useCaseStudies } from '../context/CaseStudyContext';
import { BriefcaseBusiness, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { t, tx } from '../lib/translations';

const CaseStudies = () => {
  const { caseStudies } = useCaseStudies();
  const { lang, isAr } = useLanguage();

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen relative z-10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 font-arabic">
            <BriefcaseBusiness size={16} />
            <span className="text-sm font-semibold tracking-wide uppercase">{tx(t.caseStudies.badge, lang)}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground dark:text-white leading-tight">
            {isAr ? (
              <>أثرٌ <span className="text-primary text-gradient">مُنجَز.</span></>
            ) : (
              <>Impact <span className="text-primary text-gradient">Delivered.</span></>
            )}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {tx(t.caseStudies.subheading, lang)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map(cs => (
            <div key={cs.id} className="glass-panel rounded-industrial overflow-hidden flex flex-col group hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] transition-all duration-300">
              {cs.imageUrl && (
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <img src={cs.imageUrl?.match(/(?:id=|d\/)([a-zA-Z0-9_-]{25,})/) ? `https://drive.google.com/uc?id=${cs.imageUrl.match(/(?:id=|d\/)([a-zA-Z0-9_-]{25,})/)[1]}` : cs.imageUrl} alt={isAr && cs.client_ar ? cs.client_ar : cs.client} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className={`absolute bottom-4 ${isAr ? 'right-4' : 'left-4'} z-20`}>
                    <span className="bg-primary px-3 py-1 text-white text-xs font-bold uppercase tracking-widest rounded-sm">
                      {tx(t.caseStudies.caseStudyTag, lang)}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="p-8 flex-grow flex flex-col">
                <h2 className="text-3xl font-bold mb-6 text-foreground group-hover:text-primary transition-colors">{isAr && cs.client_ar ? cs.client_ar : cs.client}</h2>
                
                <div className="mb-6 relative">
                  <h4 className={`text-sm text-primary font-bold uppercase tracking-widest mb-2 border-b border-border/50 pb-2 ${isAr ? 'text-right' : 'text-left'}`}>
                    {tx(t.caseStudies.challenge, lang)}
                  </h4>
                  <div 
                    className="prose dark:prose-invert prose-sm max-w-none text-muted-foreground leading-relaxed prose-headings:font-display prose-headings:text-foreground prose-a:text-primary" 
                    style={{ textAlign: isAr ? 'right' : 'left', direction: isAr ? 'rtl' : 'ltr' }}
                    dangerouslySetInnerHTML={{ __html: isAr && cs.challenge_ar ? cs.challenge_ar : cs.challenge }} 
                  />
                </div>
                
                <div className="mb-6 relative">
                  <h4 className={`text-sm text-primary font-bold uppercase tracking-widest mb-2 border-b border-border/50 pb-2 ${isAr ? 'text-right' : 'text-left'}`}>
                    {tx(t.caseStudies.solution, lang)}
                  </h4>
                  <div 
                    className="prose dark:prose-invert prose-sm max-w-none text-muted-foreground leading-relaxed flex-grow prose-headings:font-display prose-headings:text-foreground prose-a:text-primary" 
                    style={{ textAlign: isAr ? 'right' : 'left', direction: isAr ? 'rtl' : 'ltr' }}
                    dangerouslySetInnerHTML={{ __html: isAr && cs.solution_ar ? cs.solution_ar : cs.solution }} 
                  />
                </div>

                <div className="mt-auto bg-card border border-border p-6 rounded-lg relative overflow-hidden group/impact">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover/impact:opacity-100 transition-opacity"></div>
                  <h4 className={`text-sm text-foreground font-bold uppercase tracking-widest mb-2 ${isAr ? 'text-right' : 'text-left'}`}>
                    {tx(t.caseStudies.impact, lang)}
                  </h4>
                  <p className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 dark:from-white dark:to-white/70 ${isAr ? 'text-right' : 'text-left'}`}>
                    {isAr && cs.impact_ar ? cs.impact_ar : cs.impact}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {caseStudies.length === 0 && (
            <div className="lg:col-span-2 text-center py-24 glass-panel rounded-industrial">
              <BriefcaseBusiness size={48} className="mx-auto mb-6 text-muted-foreground opacity-50" />
              <h3 className="text-2xl font-bold mb-2">{tx(t.caseStudies.noResults, lang)}</h3>
              <p className="text-muted-foreground">{tx(t.caseStudies.checkBack, lang)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;

