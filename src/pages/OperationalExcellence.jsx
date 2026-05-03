import React from 'react';
import { motion } from 'framer-motion';
import { Layers, TrendingDown, Users, Target, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { t, tx } from '../lib/translations';
import { BackgroundPaths } from '../components/BackgroundPaths';

const OperationalExcellence = () => {
  const { lang, isAr } = useLanguage();
  const content = t.operationalExcellence;

  const icons = [TrendingDown, Users, Target];

  return (
    <div className="w-full relative min-h-screen pt-32 pb-20 overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      <BackgroundPaths />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6"
          >
            <Layers size={16} />
            <span className="text-xs font-bold tracking-widest uppercase">{tx(content.badge, lang)}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-foreground"
          >
            {tx(content.heading, lang)}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            {tx(content.subheading, lang)}
          </motion.p>
        </div>

        {/* Pillars Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {content.sections.map((section, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-10 rounded-industrial border border-border/50 hover:border-primary/50 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="mb-8 text-primary bg-primary/10 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-glow-sm">
                    <Icon size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {tx(section.title, lang)}
                  </h3>
                  
                  <p className="text-muted-foreground mb-8 text-base leading-relaxed h-24">
                    {tx(section.desc, lang)}
                  </p>

                  <div className="space-y-3">
                    {section.features[lang].map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                        <CheckCircle2 size={16} className="text-primary shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Final CTA Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-industrial p-12 overflow-hidden border border-border/50 text-center bg-card shadow-industrial"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"></div>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {isAr ? 'هل أنت مستعد للبدء؟' : 'Ready to Start?'}
            </h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              {isAr 
                ? 'تواصل معنا اليوم لمناقشة كيف يمكننا تحويل عملياتك وزيادة أرباحك.' 
                : 'Connect with us today to discuss how we can transform your operations and boost your profitability.'}
            </p>
            <button className="bg-primary text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-primary-glow transition-all shadow-glow hover:shadow-glow-lg group">
              {isAr ? 'تواصل معنا' : 'Get in Touch'}
              <ArrowRight size={20} className={isAr ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OperationalExcellence;
