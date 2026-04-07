import React, { createContext, useContext, useState, useEffect } from 'react';

const CaseStudyContext = createContext();

const DUMMY_CASE_STUDIES = [
  {
    id: '1',
    client: 'Industrial Corp',
    challenge: 'Factory line XYZ facing 30% downtime due to unoptimized machine cycles and lack of real-time monitoring.',
    solution: 'Implemented the FLAPP ecosystem directly on the production line, paired with THE Journey 3-phase transformation.',
    impact: 'Downtime reduced by 85%. Overall Output increased by 42%.',
    imageUrl: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80',
    date: '2025-10-12'
  }
];

export function CaseStudyProvider({ children }) {
  const [caseStudies, setCaseStudies] = useState(() => {
    const saved = localStorage.getItem('tamken-casestudies');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DUMMY_CASE_STUDIES;
      }
    }
    return DUMMY_CASE_STUDIES;
  });

  useEffect(() => {
    localStorage.setItem('tamken-casestudies', JSON.stringify(caseStudies));
  }, [caseStudies]);

  const addCaseStudy = (caseStudy) => {
    const newCS = { ...caseStudy, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] };
    setCaseStudies([newCS, ...caseStudies]);
  };

  const updateCaseStudy = (id, updatedFields) => {
    setCaseStudies(caseStudies.map(cs => cs.id === id ? { ...cs, ...updatedFields } : cs));
  };

  const deleteCaseStudy = (id) => {
    setCaseStudies(caseStudies.filter(cs => cs.id !== id));
  };

  return (
    <CaseStudyContext.Provider value={{ caseStudies, addCaseStudy, updateCaseStudy, deleteCaseStudy }}>
      {children}
    </CaseStudyContext.Provider>
  );
}

export const useCaseStudies = () => {
  const context = useContext(CaseStudyContext);
  if (context === undefined) {
    throw new Error('useCaseStudies must be used within a CaseStudyProvider');
  }
  return context;
};
