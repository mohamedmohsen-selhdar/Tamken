import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const CaseStudyContext = createContext();

export function CaseStudyProvider({ children }) {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCaseStudies = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching case studies:', error);
    } else {
      setCaseStudies(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const addCaseStudy = async (caseStudy) => {
    const { data, error } = await supabase
      .from('case_studies')
      .insert([{ 
        client: caseStudy.client,
        client_ar: caseStudy.client_ar,
        challenge: caseStudy.challenge,
        challenge_ar: caseStudy.challenge_ar,
        solution: caseStudy.solution,
        solution_ar: caseStudy.solution_ar,
        impact: caseStudy.impact,
        impact_ar: caseStudy.impact_ar,
        imageUrl: caseStudy.imageUrl,
        date: new Date().toISOString()
      }])
      .select()
      .single();
      
    if (error) {
      console.error('Error adding case study:', error);
      alert('Failed to add Case Study to Database. Ensure you have run the SQL script.');
    } else if (data) {
      setCaseStudies([data, ...caseStudies]);
    }
  };

  const updateCaseStudy = async (id, updatedFields) => {
    const { data, error } = await supabase
      .from('case_studies')
      .update(updatedFields)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating case study:', error);
    } else if (data) {
      setCaseStudies(caseStudies.map(cs => cs.id === id ? data : cs));
    }
  };

  const deleteCaseStudy = async (id) => {
    const { error } = await supabase
      .from('case_studies')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting case study:', error);
    } else {
      setCaseStudies(caseStudies.filter(cs => cs.id !== id));
    }
  };

  return (
    <CaseStudyContext.Provider value={{ caseStudies, loading, addCaseStudy, updateCaseStudy, deleteCaseStudy }}>
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
