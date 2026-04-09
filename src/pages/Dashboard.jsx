import React, { useState } from 'react';
import { useArticles } from '../context/ArticleContext';
import { useCaseStudies } from '../context/CaseStudyContext';
import { useCareers } from '../context/CareerContext';
import { useContent } from '../context/ContentContext';
import { Settings, Plus, Trash2, Edit2, LogOut, FileText, Briefcase, BriefcaseBusiness, BarChart2, TrendingUp, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, ExternalLink, Target, Zap, Users } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageUpload from '../components/ImageUpload';

// ─── Helpers ──────────────────────────────────────────────────────
const Input = ({ label, value, onChange, type = 'text', required, placeholder, className = '' }) => (
  <div className={className}>
    {label && <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{label}</label>}
    <input required={required} type={type} value={value} onChange={onChange} placeholder={placeholder}
      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors" />
  </div>
);

const Select = ({ label, value, onChange, options, className = '' }) => (
  <div className={className}>
    {label && <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{label}</label>}
    <select value={value} onChange={onChange}
      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors">
      {options.map(o => <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>{typeof o === 'string' ? o : o.label}</option>)}
    </select>
  </div>
);

const Textarea = ({ label, value, onChange, rows = 3, className = '' }) => (
  <div className={className}>
    {label && <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{label}</label>}
    <textarea rows={rows} value={value} onChange={onChange}
      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
  </div>
);

const statusColors = {
  'Idea': 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
  'In Progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Published': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Optimizing': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Deprecated': 'bg-red-500/20 text-red-400 border-red-500/30',
};
const funnelColors = { TOFU: 'text-blue-400', MOFU: 'text-yellow-400', BOFU: 'text-green-400' };

const Badge = ({ text, colorClass }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${colorClass}`}>{text}</span>
);

const KpiCard = ({ label, value, sub, icon, color = 'text-primary' }) => (
  <div className="glass-panel rounded-xl p-5 flex items-start gap-4 border border-border/60">
    <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 ${color}`}>{icon}</div>
    <div>
      <p className="text-2xl font-black text-foreground leading-none mb-1">{value}</p>
      <p className="text-xs font-bold text-foreground/70">{label}</p>
      {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  </div>
);

// Simple bar chart using div widths
const MiniBar = ({ value, max, color = 'bg-primary' }) => {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] font-mono text-muted-foreground w-8 text-right">{value}</span>
    </div>
  );
};

// Section collapsible in the form
const FormSection = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-background/50 hover:bg-background/80 transition-colors">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">{title}</span>
        {open ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
      </button>
      {open && <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">{children}</div>}
    </div>
  );
};

// ─── Content System Tab ───────────────────────────────────────────
const SERVICES = ['The Journey', 'FLAPP', 'Supply Chain Excellence', 'Quality Systems', 'Maintenance Excellence', 'Finance Alignment'];
const PERSONAS = ['Factory Owner', 'Plant Manager', 'Operations Manager', 'Supply Chain Lead'];

const EMPTY_FORM = {
  title: '', url: '', publishDate: '', status: 'Idea',
  keywordCluster: '', searchVolume: '', searchIntent: 'Informational',
  problemSolved: '', persona: [], language: 'Arabic',
  linkedService: '', funnelStage: 'TOFU', ctaType: 'Book Consultation',
  leadMagnet: '', offerStrength: 'Medium',
  monthlyTraffic: '', avgTimeOnPage: '', bounceRate: '', scrollDepth: '',
  ctaClickRate: '', formSubmissions: '', conversionRate: '',
  leadsGenerated: '', qualifiedLeads: '', disqualifiedReason: '',
  projectOpened: false, revenueAttributed: '', conversionToProject: '',
  avgDealSize: '', timeToClose: '', leadQualityScore: '', notes: '',
};

const ContentSystemTab = () => {
  const { items, addItem, updateItem, deleteItem, optimizationQueue, kpis, avgConvRate } = useContent();
  const [view, setView] = useState('table'); // table | analytics | gaps | form
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  const set = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [field]: val }));
  };

  const togglePersona = (p) => setForm(f => ({
    ...f, persona: f.persona.includes(p) ? f.persona.filter(x => x !== p) : [...f.persona, p]
  }));

  const openAdd = () => { setForm(EMPTY_FORM); setEditingId(null); setView('form'); };
  const openEdit = (item) => { setForm({ ...EMPTY_FORM, ...item }); setEditingId(item.id); setView('form'); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) updateItem(editingId, form);
    else addItem(form);
    setView('table');
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const maxLeads = Math.max(...items.map(i => Number(i.leadsGenerated) || 0), 1);
  const maxTraffic = Math.max(...items.map(i => Number(i.monthlyTraffic) || 0), 1);

  const optimTriggers = (item) => {
    const triggers = [];
    const traffic = Number(item.monthlyTraffic) || 0;
    const leads = Number(item.leadsGenerated) || 0;
    const conv = Number(item.conversionRate) || 0;
    const bounce = Number(item.bounceRate) || 0;
    const quality = Number(item.leadQualityScore) || 0;
    const monthsOld = item.lastUpdated
      ? Math.floor((Date.now() - new Date(item.lastUpdated)) / (1000 * 60 * 60 * 24 * 30)) : 0;
    if (traffic > 200 && leads === 0) triggers.push('High traffic · 0 leads → Fix CTA');
    if (conv > 0 && conv < 0.5) triggers.push('Conv < 0.5% → Change offer');
    if (bounce > 80) triggers.push('Bounce > 80% → Improve opening');
    if (quality > 0 && quality < 2) triggers.push('Low lead quality → Reframe persona');
    if (monthsOld > 6 && item.status === 'Published') triggers.push('>6 months old → Refresh content');
    return triggers;
  };

  if (view === 'form') return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">{editingId ? 'Edit Content Item' : 'New Content Item'}</h3>
        <button type="button" onClick={() => setView('table')} className="text-sm text-muted-foreground hover:text-foreground">Cancel</button>
      </div>

      <FormSection title="A · Content Identity">
        <Input label="Article Title" value={form.title} onChange={set('title')} required className="col-span-2 md:col-span-2" />
        <Input label="URL" value={form.url} onChange={set('url')} placeholder="https://..." />
        <Input label="Publish Date" type="date" value={form.publishDate} onChange={set('publishDate')} />
        <Select label="Status" value={form.status} onChange={set('status')} options={['Idea','In Progress','Published','Optimizing','Deprecated']} />
      </FormSection>

      <FormSection title="B · Strategy Layer" defaultOpen={true}>
        <Input label="Keyword Cluster" value={form.keywordCluster} onChange={set('keywordCluster')} className="col-span-2" />
        <Input label="Monthly Search Vol." type="number" value={form.searchVolume} onChange={set('searchVolume')} />
        <Select label="Search Intent" value={form.searchIntent} onChange={set('searchIntent')} options={['Informational','Comparison','Transactional','Navigational']} />
        <Select label="Language" value={form.language} onChange={set('language')} options={['Arabic','English','Both']} />
        <Textarea label="Problem Being Solved" value={form.problemSolved} onChange={set('problemSolved')} rows={2} className="col-span-2 md:col-span-3" />
        <div className="col-span-2 md:col-span-3">
          <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Target Persona</label>
          <div className="flex flex-wrap gap-2">
            {PERSONAS.map(p => (
              <button key={p} type="button" onClick={() => togglePersona(p)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${form.persona.includes(p) ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}>{p}</button>
            ))}
          </div>
        </div>
      </FormSection>

      <FormSection title="C · Revenue Link">
        <Select label="Linked Service" value={form.linkedService} onChange={set('linkedService')} options={['', ...SERVICES]} />
        <Select label="Funnel Stage" value={form.funnelStage} onChange={set('funnelStage')} options={['TOFU','MOFU','BOFU']} />
        <Select label="CTA Type" value={form.ctaType} onChange={set('ctaType')} options={['Book Consultation','Request Audit','Download Tool','Watch Demo','Contact Us']} />
        <Input label="Lead Magnet" value={form.leadMagnet} onChange={set('leadMagnet')} placeholder="e.g. OEE Checklist" />
        <Select label="Offer Strength" value={form.offerStrength} onChange={set('offerStrength')} options={['Weak','Medium','Strong']} />
      </FormSection>

      <FormSection title="D · Performance Metrics" defaultOpen={false}>
        <Input label="Monthly Traffic" type="number" value={form.monthlyTraffic} onChange={set('monthlyTraffic')} />
        <Input label="Avg Time on Page" value={form.avgTimeOnPage} onChange={set('avgTimeOnPage')} placeholder="2:30" />
        <Input label="Bounce Rate (%)" type="number" value={form.bounceRate} onChange={set('bounceRate')} />
        <Input label="CTA Click Rate (%)" type="number" value={form.ctaClickRate} onChange={set('ctaClickRate')} />
        <Input label="Conversion Rate (%)" type="number" value={form.conversionRate} onChange={set('conversionRate')} />
        <Input label="Leads Generated" type="number" value={form.leadsGenerated} onChange={set('leadsGenerated')} />
        <Input label="Qualified Leads" type="number" value={form.qualifiedLeads} onChange={set('qualifiedLeads')} />
        <Input label="Disqualified Reason" value={form.disqualifiedReason} onChange={set('disqualifiedReason')} className="col-span-2" />
      </FormSection>

      <FormSection title="E · Business Impact" defaultOpen={false}>
        <div className="flex items-center gap-2 col-span-2 md:col-span-3">
          <input type="checkbox" id="projectOpened" checked={form.projectOpened} onChange={set('projectOpened')} className="accent-primary" />
          <label htmlFor="projectOpened" className="text-sm font-medium">Project Opened from this article</label>
        </div>
        <Input label="Revenue Attributed (EGP)" type="number" value={form.revenueAttributed} onChange={set('revenueAttributed')} />
        <Input label="Avg Deal Size (EGP)" type="number" value={form.avgDealSize} onChange={set('avgDealSize')} />
        <Input label="Conv. to Project (%)" type="number" value={form.conversionToProject} onChange={set('conversionToProject')} />
        <Input label="Time to Close (Days)" type="number" value={form.timeToClose} onChange={set('timeToClose')} />
        <Input label="Lead Quality Score (1–5)" type="number" value={form.leadQualityScore} onChange={set('leadQualityScore')} placeholder="1–5" />
        <Textarea label="Notes on Lead Quality" value={form.notes} onChange={set('notes')} rows={2} className="col-span-2 md:col-span-3" />
      </FormSection>

      <div className="flex justify-end pt-2">
        <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-xl font-bold transition-colors shadow-[0_0_20px_rgba(220,38,38,0.3)]">
          {editingId ? 'Update Record' : 'Save Record'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Sub-nav */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 p-1 glass-panel rounded-xl border border-border/60">
          {[['table','Table'], ['analytics','Analytics'], ['gaps','Gap Tracker']].map(([v, label]) => (
            <button key={v} onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${view === v ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}>
              {label}
            </button>
          ))}
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors text-sm">
          <Plus size={16} /> Add Article
        </button>
      </div>

      {/* ── ANALYTICS VIEW ─────────────────── */}
      {view === 'analytics' && (
        <div className="space-y-6">
          {/* KPI Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KpiCard label="Total Leads" value={kpis.totalLeads} sub="All content sources" icon={<Users size={18} />} />
            <KpiCard label="Qualified Leads" value={kpis.qualifiedLeads} sub="Matched ICP" icon={<CheckCircle size={18} />} color="text-green-400" />
            <KpiCard label="Avg Conv. Rate" value={`${avgConvRate}%`} sub="Across all articles" icon={<TrendingUp size={18} />} color="text-blue-400" />
            <KpiCard label="Revenue Attributed" value={`${kpis.totalRevenue.toLocaleString()} EGP`} sub="From content leads" icon={<Zap size={18} />} color="text-yellow-400" />
          </div>

          {/* Leads per Article */}
          {items.length > 0 && (
            <div className="glass-panel rounded-xl border border-border/60 p-5">
              <h4 className="text-sm font-bold mb-4 flex items-center gap-2"><BarChart2 size={16} className="text-primary" /> Leads per Article</h4>
              <div className="space-y-3">
                {[...items].sort((a,b) => (Number(b.leadsGenerated)||0) - (Number(a.leadsGenerated)||0)).map(i => (
                  <div key={i.id} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-40 truncate shrink-0">{i.title || 'Untitled'}</span>
                    <div className="flex-1">
                      <MiniBar value={Number(i.leadsGenerated)||0} max={maxLeads} color="bg-primary" />
                    </div>
                    <span className={`text-[10px] font-bold ${funnelColors[i.funnelStage]}`}>{i.funnelStage}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Traffic vs Leads */}
          {items.length > 0 && (
            <div className="glass-panel rounded-xl border border-border/60 p-5">
              <h4 className="text-sm font-bold mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-primary" /> Traffic vs Leads (Conversion Efficiency)</h4>
              <div className="space-y-3">
                {[...items].sort((a,b) => (Number(b.monthlyTraffic)||0) - (Number(a.monthlyTraffic)||0)).map(i => {
                  const traffic = Number(i.monthlyTraffic)||0;
                  const leads = Number(i.leadsGenerated)||0;
                  const isTrafficTrap = traffic > 200 && leads === 0;
                  return (
                    <div key={i.id} className={`flex items-center gap-3 p-2 rounded-lg ${isTrafficTrap ? 'bg-red-500/5 border border-red-500/20' : ''}`}>
                      <div className="w-4">{isTrafficTrap && <AlertTriangle size={12} className="text-red-400" />}</div>
                      <span className="text-xs text-muted-foreground w-36 truncate shrink-0">{i.title || 'Untitled'}</span>
                      <div className="flex-1">
                        <MiniBar value={traffic} max={maxTraffic} color="bg-blue-500/60" />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground w-16 text-right">{traffic} visits</span>
                      <span className="text-[10px] font-bold text-green-400 w-12 text-right">{leads} leads</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Service→Revenue Map */}
          {items.length > 0 && (() => {
            const byService = {};
            items.forEach(i => {
              if (!i.linkedService) return;
              if (!byService[i.linkedService]) byService[i.linkedService] = { revenue: 0, leads: 0, articles: 0 };
              byService[i.linkedService].revenue += Number(i.revenueAttributed) || 0;
              byService[i.linkedService].leads += Number(i.leadsGenerated) || 0;
              byService[i.linkedService].articles += 1;
            });
            const entries = Object.entries(byService);
            if (!entries.length) return null;
            const maxRev = Math.max(...entries.map(([,v]) => v.revenue), 1);
            return (
              <div className="glass-panel rounded-xl border border-border/60 p-5">
                <h4 className="text-sm font-bold mb-4 flex items-center gap-2"><Target size={16} className="text-primary" /> Content → Service Revenue Map</h4>
                <div className="space-y-3">
                  {entries.sort((a,b) => b[1].revenue - a[1].revenue).map(([service, data]) => (
                    <div key={service} className="flex items-center gap-3">
                      <span className="text-xs font-medium text-foreground w-44 shrink-0">{service}</span>
                      <div className="flex-1">
                        <MiniBar value={data.revenue} max={maxRev} color="bg-yellow-500/60" />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{data.articles} articles · {data.leads} leads · {data.revenue.toLocaleString()} EGP</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {items.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <BarChart2 size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No content items yet</p>
              <p className="text-sm">Add articles to see analytics</p>
            </div>
          )}
        </div>
      )}

      {/* ── GAP TRACKER VIEW ───────────────── */}
      {view === 'gaps' && (
        <div className="space-y-6">
          {/* Optimization Queue */}
          <div className="glass-panel rounded-xl border border-border/60 overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border/40 bg-red-500/5">
              <AlertTriangle size={18} className="text-red-400" />
              <h4 className="font-bold text-sm">Optimization Queue <span className="ml-2 bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/30">{optimizationQueue.length}</span></h4>
            </div>
            {optimizationQueue.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground text-center">No articles triggering optimization alerts. 🎉</p>
            ) : (
              <div className="divide-y divide-border/30">
                {optimizationQueue.map(item => (
                  <div key={item.id} className="p-4 flex items-start justify-between gap-4 hover:bg-white/3 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{item.title || 'Untitled'}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {optimTriggers(item).map((t, i) => (
                          <span key={i} className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full font-medium">{t}</span>
                        ))}
                      </div>
                    </div>
                    <button onClick={() => openEdit(item)} className="shrink-0 text-xs font-semibold text-primary hover:underline flex items-center gap-1"><Edit2 size={12} /> Fix</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Gap Matrix */}
          <div className="glass-panel rounded-xl border border-border/60 overflow-hidden">
            <div className="px-5 py-4 border-b border-border/40">
              <h4 className="font-bold text-sm">Service Coverage Gap Analysis</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Services with no published BOFU content</p>
            </div>
            <div className="divide-y divide-border/30">
              {SERVICES.map(service => {
                const published = items.filter(i => i.linkedService === service && i.status === 'Published');
                const bofu = published.filter(i => i.funnelStage === 'BOFU');
                const mofu = published.filter(i => i.funnelStage === 'MOFU');
                const tofu = published.filter(i => i.funnelStage === 'TOFU');
                const hasBofuGap = bofu.length === 0;
                const hasCriticalGap = published.length === 0;
                return (
                  <div key={service} className={`p-4 flex items-center gap-4 ${hasCriticalGap ? 'bg-red-500/5' : ''}`}>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{service}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[10px] text-blue-400">{tofu.length} TOFU</span>
                        <span className="text-[10px] text-yellow-400">{mofu.length} MOFU</span>
                        <span className="text-[10px] text-green-400">{bofu.length} BOFU</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {hasCriticalGap && <Badge text="No Content" colorClass="bg-red-500/20 text-red-400 border-red-500/30" />}
                      {!hasCriticalGap && hasBofuGap && <Badge text="BOFU Gap" colorClass="bg-yellow-500/20 text-yellow-400 border-yellow-500/30" />}
                      {!hasCriticalGap && !hasBofuGap && <Badge text="Covered ✓" colorClass="bg-green-500/20 text-green-400 border-green-500/30" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Funnel Balance */}
          <div className="glass-panel rounded-xl border border-border/60 p-5">
            <h4 className="font-bold text-sm mb-4">Funnel Balance</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              {['TOFU','MOFU','BOFU'].map(stage => {
                const count = items.filter(i => i.funnelStage === stage && i.status === 'Published').length;
                const total = items.filter(i => i.status === 'Published').length || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={stage} className={`rounded-xl p-4 border ${stage === 'TOFU' ? 'border-blue-500/30 bg-blue-500/5' : stage === 'MOFU' ? 'border-yellow-500/30 bg-yellow-500/5' : 'border-green-500/30 bg-green-500/5'}`}>
                    <div className={`text-2xl font-black mb-1 ${funnelColors[stage]}`}>{count}</div>
                    <div className="text-xs font-bold text-foreground">{stage}</div>
                    <div className="text-[10px] text-muted-foreground mt-1">{pct}% of published</div>
                  </div>
                );
              })}
            </div>
            {items.filter(i => i.status === 'Published').length > 0 && (() => {
              const pub = items.filter(i => i.status === 'Published');
              const bofuPct = Math.round((pub.filter(i => i.funnelStage === 'BOFU').length / pub.length) * 100);
              if (bofuPct < 20) return (
                <div className="mt-4 flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <AlertTriangle size={14} className="text-yellow-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-300">Only {bofuPct}% of your content is BOFU. You are generating awareness with no conversion path. Create more transactional content linked to direct service booking.</p>
                </div>
              );
              return null;
            })()}
          </div>
        </div>
      )}

      {/* ── TABLE VIEW ─────────────────────── */}
      {view === 'table' && (
        <div className="glass-panel rounded-xl border border-border/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-surface-elevated">
                  {['Article','Status','Intent','Service','Stage','Traffic','Leads','Revenue',''].map((h, i) => (
                    <th key={i} className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {items.length === 0 && (
                  <tr><td colSpan={9} className="text-center py-12 text-muted-foreground">No content items. Add your first article.</td></tr>
                )}
                {items.map(item => {
                  const triggers = optimTriggers(item);
                  const isExpanded = expandedRow === item.id;
                  return (
                    <React.Fragment key={item.id}>
                      <tr className={`hover:bg-white/3 transition-colors cursor-pointer ${triggers.length > 0 ? 'border-l-2 border-l-red-500/50' : ''}`}
                        onClick={() => setExpandedRow(isExpanded ? null : item.id)}>
                        <td className="px-4 py-3 max-w-[180px]">
                          <div className="font-semibold text-foreground truncate">{item.title || '—'}</div>
                          {triggers.length > 0 && <div className="flex items-center gap-1 mt-0.5"><AlertTriangle size={10} className="text-red-400" /><span className="text-[9px] text-red-400 font-bold">{triggers.length} alert{triggers.length > 1 ? 's' : ''}</span></div>}
                          {item.url && <a href={item.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="text-[10px] text-primary hover:underline flex items-center gap-0.5 mt-0.5"><ExternalLink size={9}/>View</a>}
                        </td>
                        <td className="px-4 py-3"><Badge text={item.status} colorClass={statusColors[item.status] || ''} /></td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{item.searchIntent?.slice(0,4) || '—'}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground max-w-[120px] truncate">{item.linkedService || '—'}</td>
                        <td className="px-4 py-3"><span className={`text-xs font-bold ${funnelColors[item.funnelStage]}`}>{item.funnelStage || '—'}</span></td>
                        <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{item.monthlyTraffic || '—'}</td>
                        <td className="px-4 py-3 text-xs font-mono">{item.leadsGenerated || '—'}</td>
                        <td className="px-4 py-3 text-xs font-mono text-yellow-400">{item.revenueAttributed ? `${Number(item.revenueAttributed).toLocaleString()} EGP` : '—'}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1 justify-end" onClick={e => e.stopPropagation()}>
                            <button onClick={() => openEdit(item)} className="p-1.5 hover:text-primary text-muted-foreground transition-colors rounded-md border border-border hover:border-primary/40 bg-background"><Edit2 size={13}/></button>
                            <button onClick={() => { if(window.confirm('Delete?')) deleteItem(item.id); }} className="p-1.5 hover:text-red-400 text-muted-foreground transition-colors rounded-md border border-border bg-background"><Trash2 size={13}/></button>
                          </div>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="bg-white/2">
                          <td colSpan={9} className="px-6 py-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
                              <div><p className="text-muted-foreground font-bold mb-1 uppercase tracking-wider text-[10px]">Problem Solved</p><p className="text-foreground/80">{item.problemSolved || '—'}</p></div>
                              <div><p className="text-muted-foreground font-bold mb-1 uppercase tracking-wider text-[10px]">Keyword Cluster</p><p className="text-foreground/80">{item.keywordCluster || '—'}</p></div>
                              <div><p className="text-muted-foreground font-bold mb-1 uppercase tracking-wider text-[10px]">CTA Type</p><p className="text-foreground/80">{item.ctaType || '—'}</p></div>
                              <div><p className="text-muted-foreground font-bold mb-1 uppercase tracking-wider text-[10px]">Lead Magnet</p><p className="text-foreground/80">{item.leadMagnet || '—'}</p></div>
                              <div><p className="text-muted-foreground font-bold mb-1 uppercase tracking-wider text-[10px]">Bounce Rate</p><p className="text-foreground/80">{item.bounceRate ? item.bounceRate + '%' : '—'}</p></div>
                              <div><p className="text-muted-foreground font-bold mb-1 uppercase tracking-wider text-[10px]">Conv. Rate</p><p className="text-foreground/80">{item.conversionRate ? item.conversionRate + '%' : '—'}</p></div>
                              <div><p className="text-muted-foreground font-bold mb-1 uppercase tracking-wider text-[10px]">Qualified Leads</p><p className="text-foreground/80">{item.qualifiedLeads || '—'}</p></div>
                              <div><p className="text-muted-foreground font-bold mb-1 uppercase tracking-wider text-[10px]">Lead Quality</p><p className="text-foreground/80">{item.leadQualityScore ? `${item.leadQualityScore}/5` : '—'}</p></div>
                              <div><p className="text-muted-foreground font-bold mb-1 uppercase tracking-wider text-[10px]">Persona</p><p className="text-foreground/80">{item.persona?.join(', ') || '—'}</p></div>
                              <div><p className="text-muted-foreground font-bold mb-1 uppercase tracking-wider text-[10px]">Project Opened</p><p className={item.projectOpened ? 'text-green-400 font-bold' : 'text-muted-foreground'}>{item.projectOpened ? 'Yes ✓' : 'No'}</p></div>
                              <div><p className="text-muted-foreground font-bold mb-1 uppercase tracking-wider text-[10px]">Time to Close</p><p className="text-foreground/80">{item.timeToClose ? item.timeToClose + ' days' : '—'}</p></div>
                              <div className="col-span-2"><p className="text-muted-foreground font-bold mb-1 uppercase tracking-wider text-[10px]">Notes</p><p className="text-foreground/80">{item.notes || '—'}</p></div>
                              {triggers.length > 0 && (
                                <div className="col-span-2 md:col-span-4">
                                  <p className="text-red-400 font-bold mb-2 uppercase tracking-wider text-[10px]">⚠ Optimization Triggers</p>
                                  <div className="flex flex-wrap gap-2">
                                    {triggers.map((t,i) => <Badge key={i} text={t} colorClass="bg-red-500/10 text-red-400 border-red-500/20" />)}
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────
const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { articles, addArticle, updateArticle, deleteArticle } = useArticles();
  const { caseStudies, addCaseStudy, updateCaseStudy, deleteCaseStudy } = useCaseStudies();
  const { careers, addCareer, updateCareer, deleteCareer } = useCareers();
  const [activeTab, setActiveTab] = useState('articles');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [articleForm, setArticleForm] = useState({ title: '', content: '', category: '', imageUrl: '', seoTitle: '', seoDescription: '', seoKeywords: '' });
  const [caseStudyForm, setCaseStudyForm] = useState({ client: '', challenge: '', solution: '', impact: '', imageUrl: '' });
  const [careerForm, setCareerForm] = useState({ title: '', department: '', location: '', type: '', description: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '123456789' || password === 'admin') setIsAuthenticated(true);
    else alert('Invalid password');
  };

  const resetForms = () => {
    setArticleForm({ title: '', content: '', category: '', imageUrl: '', seoTitle: '', seoDescription: '', seoKeywords: '' });
    setCaseStudyForm({ client: '', challenge: '', solution: '', impact: '', imageUrl: '' });
    setCareerForm({ title: '', department: '', location: '', type: '', description: '' });
  };

  const handleTabSwitch = (tab) => { setActiveTab(tab); setIsAdding(false); setEditingId(null); resetForms(); };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'articles') { if (!articleForm.title) return; addArticle({ ...articleForm, author: 'Admin' }); }
    else if (activeTab === 'casestudies') { if (!caseStudyForm.client) return; addCaseStudy(caseStudyForm); }
    else if (activeTab === 'careers') { if (!careerForm.title) return; addCareer(careerForm); }
    setIsAdding(false); resetForms();
  };

  const handleEditClick = (item) => {
    setIsAdding(false); setEditingId(item.id);
    if (activeTab === 'articles') setArticleForm({ title: item.title, content: item.content, category: item.category, imageUrl: item.imageUrl || '', seoTitle: item.seoTitle || '', seoDescription: item.seoDescription || '', seoKeywords: item.seoKeywords || '' });
    else if (activeTab === 'casestudies') setCaseStudyForm({ client: item.client, challenge: item.challenge, solution: item.solution, impact: item.impact, imageUrl: item.imageUrl || '' });
    else if (activeTab === 'careers') setCareerForm({ title: item.title, department: item.department, location: item.location, type: item.type, description: item.description });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'articles') updateArticle(editingId, articleForm);
    else if (activeTab === 'casestudies') updateCaseStudy(editingId, caseStudyForm);
    else if (activeTab === 'careers') updateCareer(editingId, careerForm);
    setEditingId(null); resetForms();
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure?')) return;
    if (activeTab === 'articles') deleteArticle(id);
    else if (activeTab === 'casestudies') deleteCaseStudy(id);
    else if (activeTab === 'careers') deleteCareer(id);
  };

  if (!isAuthenticated) return (
    <div className="pt-32 pb-20 px-6 min-h-screen flex items-center justify-center">
      <div className="glass-panel p-8 rounded-industrial max-w-md w-full">
        <div className="flex items-center gap-3 mb-6 justify-center text-primary">
          <Settings size={32} /><h1 className="text-2xl font-bold">Admin Login</h1>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors" placeholder="Enter admin password" />
          </div>
          <button type="submit" className="bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary/90 transition-colors">Login</button>
        </form>
      </div>
    </div>
  );

  const getTableHeaders = () => {
    if (activeTab === 'articles') return ['Title', 'Category', 'Date', 'Actions'];
    if (activeTab === 'casestudies') return ['Client', 'Challenge Snippet', 'Date', 'Actions'];
    if (activeTab === 'careers') return ['Job Title', 'Department', 'Type', 'Actions'];
  };

  const renderTableRows = () => {
    const list = activeTab === 'articles' ? articles : activeTab === 'casestudies' ? caseStudies : careers;
    if (list.length === 0) return <tr><td colSpan="4" className="p-8 text-center text-muted-foreground">No records found.</td></tr>;
    return list.map(item => (
      <tr key={item.id} className="border-b border-border/50 hover:bg-white/3 transition-colors">
        <td className="p-4 font-medium">{activeTab === 'casestudies' ? item.client : item.title}</td>
        <td className="p-4 text-sm text-muted-foreground truncate max-w-[200px]">{activeTab === 'articles' ? item.category : activeTab === 'casestudies' ? item.challenge : item.department}</td>
        <td className="p-4 text-sm text-muted-foreground">{activeTab === 'careers' ? item.type : item.date}</td>
        <td className="p-4 flex justify-end gap-2">
          <button onClick={() => handleEditClick(item)} className="p-2 text-muted-foreground hover:text-primary transition-colors bg-background rounded-md border border-border"><Edit2 size={16} /></button>
          <button onClick={() => handleDelete(item.id)} className="p-2 text-muted-foreground hover:text-red-400 transition-colors bg-background rounded-md border border-border"><Trash2 size={16} /></button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="pt-28 pb-20 px-6 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Control Dashboard</h1>
            <p className="text-muted-foreground text-sm">Manage content, track growth, and monitor revenue impact.</p>
          </div>
          <div className="flex gap-3 items-center">
            {activeTab !== 'content' && (
              <button onClick={() => { setIsAdding(!isAdding); setEditingId(null); resetForms(); }}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors text-sm">
                <Plus size={16} />{isAdding ? 'Cancel' : 'Add New'}
              </button>
            )}
            <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 bg-background border border-border px-4 py-2 rounded-xl hover:bg-white/5 transition-colors text-sm">
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-8 p-1 glass-panel rounded-xl max-w-fit border border-border/60">
          <button onClick={() => handleTabSwitch('articles')} className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'articles' ? 'bg-primary text-white' : 'hover:bg-background/50 text-muted-foreground'}`}><FileText size={16}/> Articles</button>
          <button onClick={() => handleTabSwitch('casestudies')} className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'casestudies' ? 'bg-primary text-white' : 'hover:bg-background/50 text-muted-foreground'}`}><BriefcaseBusiness size={16}/> Case Studies</button>
          <button onClick={() => handleTabSwitch('careers')} className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'careers' ? 'bg-primary text-white' : 'hover:bg-background/50 text-muted-foreground'}`}><Briefcase size={16}/> Careers</button>
          <button onClick={() => handleTabSwitch('content')} className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'content' ? 'bg-primary text-white' : 'hover:bg-background/50 text-muted-foreground'}`}><BarChart2 size={16}/> Content System</button>
        </div>

        {/* Content System tab */}
        {activeTab === 'content' && <ContentSystemTab />}

        {/* Standard tabs */}
        {activeTab !== 'content' && (
          <>
            {(isAdding || editingId !== null) && (
              <div className={`glass-panel p-6 rounded-industrial border mb-8 animate-fade-in ${editingId ? 'border-primary/50' : 'border-border'}`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">{editingId ? `Edit ${activeTab}` : `New ${activeTab}`}</h2>
                  <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-muted-foreground hover:text-foreground text-sm font-semibold">Cancel</button>
                </div>
                <form onSubmit={editingId ? handleUpdateSubmit : handleAddSubmit} className="grid gap-4 md:grid-cols-2">
                  {activeTab === 'articles' && (<>
                    <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Title</label><input required type="text" value={articleForm.title} onChange={e => setArticleForm({...articleForm, title: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                    <div><label className="block text-sm mb-1 text-muted-foreground">Category</label><input required type="text" value={articleForm.category} onChange={e => setArticleForm({...articleForm, category: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                    <div className="md:col-span-2"><ImageUpload currentUrl={articleForm.imageUrl} onUpload={(url) => setArticleForm({...articleForm, imageUrl: url})} folder="articles" label="Cover Image (upload to Supabase)" /></div>
                    <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">SEO Title (Ideal: 50-60 chars)</label><input type="text" value={articleForm.seoTitle} onChange={e => setArticleForm({...articleForm, seoTitle: e.target.value})} placeholder="Focus Keyword - Modifier - Tamken" className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                    <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">SEO Description (Ideal: 150-160 chars)</label><textarea rows="2" value={articleForm.seoDescription} onChange={e => setArticleForm({...articleForm, seoDescription: e.target.value})} placeholder="Compelling snippet containing primary keyword and CTA..." className="w-full bg-background border border-border rounded-md px-3 py-2"></textarea></div>
                    <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">SEO Keywords (Comma Separated)</label><input type="text" value={articleForm.seoKeywords} onChange={e => setArticleForm({...articleForm, seoKeywords: e.target.value})} placeholder="operational excellence, lean manufacturing, factory setup" className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                    <div className="md:col-span-2">
                       <label className="block text-sm mb-1 text-muted-foreground">Rich Content</label>
                       <ReactQuill theme="snow" value={articleForm.content} onChange={content => setArticleForm({...articleForm, content})} className="bg-background text-foreground rounded-md border border-border [&_.ql-toolbar]:border-b-border [&_.ql-container]:border-none [&_.ql-editor]:min-h-[200px]" />
                    </div>
                  </>)}
                  {activeTab === 'casestudies' && (<>
                    <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Client Name</label><input required type="text" value={caseStudyForm.client} onChange={e => setCaseStudyForm({...caseStudyForm, client: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                    <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Challenge</label><textarea required rows="2" value={caseStudyForm.challenge} onChange={e => setCaseStudyForm({...caseStudyForm, challenge: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2"></textarea></div>
                    <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Solution</label><textarea required rows="3" value={caseStudyForm.solution} onChange={e => setCaseStudyForm({...caseStudyForm, solution: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2"></textarea></div>
                    <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Impact (Results)</label><input required type="text" value={caseStudyForm.impact} onChange={e => setCaseStudyForm({...caseStudyForm, impact: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                    <div className="md:col-span-2"><ImageUpload currentUrl={caseStudyForm.imageUrl} onUpload={(url) => setCaseStudyForm({...caseStudyForm, imageUrl: url})} folder="case-studies" label="Case Study Image (upload to Supabase)" /></div>
                  </>)}
                  {activeTab === 'careers' && (<>
                    <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Job Title</label><input required type="text" value={careerForm.title} onChange={e => setCareerForm({...careerForm, title: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                    <div><label className="block text-sm mb-1 text-muted-foreground">Department</label><input required type="text" value={careerForm.department} onChange={e => setCareerForm({...careerForm, department: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                    <div><label className="block text-sm mb-1 text-muted-foreground">Location</label><input required type="text" value={careerForm.location} onChange={e => setCareerForm({...careerForm, location: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                    <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Type</label><input required type="text" value={careerForm.type} onChange={e => setCareerForm({...careerForm, type: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                    <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Description</label><textarea required rows="4" value={careerForm.description} onChange={e => setCareerForm({...careerForm, description: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2"></textarea></div>
                  </>)}
                  <div className="md:col-span-2 flex justify-end mt-2">
                    <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-xl font-bold transition-colors">{editingId ? 'Update Record' : 'Save Record'}</button>
                  </div>
                </form>
              </div>
            )}
            <div className="glass-panel rounded-industrial border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-elevated border-b border-border">
                      {getTableHeaders().map((head, i) => <th key={i} className={`p-4 font-semibold text-muted-foreground text-sm ${i === getTableHeaders().length - 1 ? 'text-right' : ''}`}>{head}</th>)}
                    </tr>
                  </thead>
                  <tbody>{renderTableRows()}</tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
