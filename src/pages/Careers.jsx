import React from 'react';
import { useCareers } from '../context/CareerContext';
import { Briefcase, MapPin, Building, Clock, ArrowRight } from 'lucide-react';

const Careers = () => {
  const { careers } = useCareers();

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen relative z-10">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
            <Briefcase size={16} />
            <span className="text-sm font-semibold tracking-wide">CAREERS</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground dark:text-white leading-tight">
            Build the <span className="text-primary text-gradient">Future</span> of Manufacturing.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Join a specialized squad of engineers and transformation agents obsessed with unlocking operational excellence on the factory floor.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {careers.map(job => (
            <div key={job.id} className="glass-panel p-8 rounded-industrial border border-border hover:border-primary/50 transition-all duration-300 group flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-[0_0_20px_rgba(220,38,38,0.1)]">
              <div>
                <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-4">{job.title}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5"><Building size={16} className="text-primary"/> {job.department}</div>
                  <div className="hidden sm:block text-border">•</div>
                  <div className="flex items-center gap-1.5"><MapPin size={16} className="text-primary"/> {job.location}</div>
                  <div className="hidden sm:block text-border">•</div>
                  <div className="flex items-center gap-1.5"><Clock size={16} className="text-primary"/> {job.type}</div>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-3xl">
                  {job.description}
                </p>
              </div>
              <div className="shrink-0 pt-4 md:pt-0">
                <button className="w-full md:w-auto bg-card border border-border group-hover:bg-primary group-hover:text-primary-foreground text-foreground px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all">
                  Apply Now <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}

          {careers.length === 0 && (
            <div className="text-center py-24 glass-panel rounded-industrial">
              <span className="text-4xl mb-4 block">🚀</span>
              <h3 className="text-2xl font-bold mb-2">No Open Roles</h3>
              <p className="text-muted-foreground">We aren't actively hiring right now, but we are always looking for exceptional talent. Check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Careers;
