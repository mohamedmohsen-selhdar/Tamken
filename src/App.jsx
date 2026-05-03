import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Journey from './pages/Journey';
import Flapp from './pages/Flapp';
import OperationalExcellence from './pages/OperationalExcellence';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';
import { ArticleProvider } from './context/ArticleContext';
import { LanguageProvider } from './context/LanguageContext';

import { CareerProvider } from './context/CareerContext';
import { CaseStudyProvider } from './context/CaseStudyContext';
import { ContentProvider } from './context/ContentContext';
import CaseStudies from './pages/CaseStudies';
import Careers from './pages/Careers';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

const ReadingProgress = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setWidth(scrolled);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div 
    className="fixed top-0 left-0 h-1 bg-primary z-[9999] transition-all duration-100 ease-linear"
    style={{ width: `${width}%` }} 
  />;
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
      <ContentProvider>
      <CareerProvider>
        <CaseStudyProvider>
          <ArticleProvider>
            <Router>
              <ScrollToTop />
              <ReadingProgress />
              {/* Thaqeb style background with noise and dark gradient */}
              <div className="fixed inset-0 z-[-2] bg-background transition-colors duration-500">
                <div className="absolute inset-0 bg-noise pointer-events-none opacity-50 mix-blend-overlay"></div>
                {/* Damped Red/Black radial glows */}
                <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[100px] animate-pulse-slow pointer-events-none"></div>
                <div className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-ai-glow/10 blur-[120px] animate-float pointer-events-none" style={{ animationDelay: '-5s' }}></div>
              </div>
              <Navbar />
              <main className="min-h-screen relative animate-fade-in">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/journey" element={<Journey />} />
                  <Route path="/flapp" element={<Flapp />} />
                  <Route path="/operational-excellence" element={<OperationalExcellence />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/articles/:id" element={<ArticleDetail />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </main>
              <Footer />
            </Router>
          </ArticleProvider>
        </CaseStudyProvider>
      </CareerProvider>
      </ContentProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
