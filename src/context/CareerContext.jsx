import React, { createContext, useContext, useState, useEffect } from 'react';

const CareerContext = createContext();

const DUMMY_CAREERS = [
  {
    id: '1',
    title: 'Senior Operations Consultant',
    department: 'Consulting',
    location: 'Hybrid / On-site',
    type: 'Full-time',
    description: 'We are seeking an experienced manufacturing consultant to lead lean transformations on factory floors. You will be responsible for deploying THE Journey methodology.',
    date: '2026-03-15'
  }
];

export function CareerProvider({ children }) {
  const [careers, setCareers] = useState(() => {
    const saved = localStorage.getItem('tamken-careers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DUMMY_CAREERS;
      }
    }
    return DUMMY_CAREERS;
  });

  useEffect(() => {
    localStorage.setItem('tamken-careers', JSON.stringify(careers));
  }, [careers]);

  const addCareer = (career) => {
    const newCareer = { ...career, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] };
    setCareers([newCareer, ...careers]);
  };

  const updateCareer = (id, updatedFields) => {
    setCareers(careers.map(c => c.id === id ? { ...c, ...updatedFields } : c));
  };

  const deleteCareer = (id) => {
    setCareers(careers.filter(c => c.id !== id));
  };

  return (
    <CareerContext.Provider value={{ careers, addCareer, updateCareer, deleteCareer }}>
      {children}
    </CareerContext.Provider>
  );
}

export const useCareers = () => {
  const context = useContext(CareerContext);
  if (context === undefined) {
    throw new Error('useCareers must be used within a CareerProvider');
  }
  return context;
};
