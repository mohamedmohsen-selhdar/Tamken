import React, { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

const EMPTY_ITEM = {
  id: null,
  // A — Identity
  title: '',
  url: '',
  publishDate: '',
  lastUpdated: '',
  status: 'Idea', // Idea | In Progress | Published | Optimizing | Deprecated
  // B — Strategy
  keywordCluster: '',
  searchVolume: '',
  searchIntent: 'Informational', // Informational | Comparison | Transactional | Navigational
  problemSolved: '',
  persona: [], // Factory Owner | Plant Manager | Operations Manager | Supply Chain Lead
  language: 'Arabic', // Arabic | English | Both
  // C — Revenue Link
  linkedService: '', // The Journey | FLAPP | Supply Chain | Quality | Maintenance | Finance
  funnelStage: 'TOFU', // TOFU | MOFU | BOFU
  ctaType: 'Book Consultation', // Book Consultation | Request Audit | Download Tool | Watch Demo | Contact Us
  leadMagnet: '',
  offerStrength: 'Medium', // Weak | Medium | Strong
  // D — Performance
  monthlyTraffic: '',
  avgTimeOnPage: '',
  bounceRate: '',
  scrollDepth: '',
  ctaClickRate: '',
  formSubmissions: '',
  conversionRate: '',
  leadsGenerated: '',
  qualifiedLeads: '',
  disqualifiedReason: '',
  // E — Business Impact
  projectOpened: false,
  revenueAttributed: '',
  conversionToProject: '',
  avgDealSize: '',
  timeToClose: '',
  leadQualityScore: '',
  notes: '',
};

export const ContentProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('tamken_content_system');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('tamken_content_system', JSON.stringify(items));
  }, [items]);

  const addItem = (data) => {
    const now = new Date().toISOString().slice(0, 10);
    setItems(prev => [...prev, {
      ...EMPTY_ITEM, ...data,
      id: Date.now(),
      publishDate: data.publishDate || now,
      lastUpdated: now,
    }]);
  };

  const updateItem = (id, data) => {
    const now = new Date().toISOString().slice(0, 10);
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...data, lastUpdated: now } : i));
  };

  const deleteItem = (id) => setItems(prev => prev.filter(i => i.id !== id));

  // Derived: optimization queue — items triggering alerts
  const optimizationQueue = items.filter(i => {
    const traffic = Number(i.monthlyTraffic) || 0;
    const leads = Number(i.leadsGenerated) || 0;
    const conv = Number(i.conversionRate) || 0;
    const bounce = Number(i.bounceRate) || 0;
    const quality = Number(i.leadQualityScore) || 0;
    const monthsOld = i.lastUpdated
      ? Math.floor((Date.now() - new Date(i.lastUpdated)) / (1000 * 60 * 60 * 24 * 30))
      : 0;
    return (
      (traffic > 200 && leads === 0) ||
      (conv < 0.5 && conv > 0 && traffic > 50) ||
      (bounce > 80) ||
      (quality > 0 && quality < 2) ||
      (monthsOld > 6 && i.status === 'Published')
    );
  });

  // Aggregated KPIs
  const kpis = items.reduce((acc, i) => ({
    totalLeads: acc.totalLeads + (Number(i.leadsGenerated) || 0),
    qualifiedLeads: acc.qualifiedLeads + (Number(i.qualifiedLeads) || 0),
    totalRevenue: acc.totalRevenue + (Number(i.revenueAttributed) || 0),
    totalTraffic: acc.totalTraffic + (Number(i.monthlyTraffic) || 0),
  }), { totalLeads: 0, qualifiedLeads: 0, totalRevenue: 0, totalTraffic: 0 });

  const avgConvRate = items.length > 0
    ? (items.reduce((s, i) => s + (Number(i.conversionRate) || 0), 0) / items.length).toFixed(2)
    : 0;

  return (
    <ContentContext.Provider value={{
      items, addItem, updateItem, deleteItem,
      optimizationQueue, kpis, avgConvRate, EMPTY_ITEM,
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
