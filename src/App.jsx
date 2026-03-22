import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Journey from './pages/Journey';
import Flapp from './pages/Flapp';
import Footer from './components/Footer';

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

  return <div style={{ 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    height: '4px', 
    background: 'var(--accent)', 
    width: `${width}%`, 
    zIndex: 9999,
    transition: 'width 100ms linear'
  }} />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ReadingProgress />
      <div className="mesh-bg">
        <div className="mesh-blob blob-1"></div>
        <div className="mesh-blob blob-2"></div>
      </div>
      <Navbar />
      <main className="animate-fade-up">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/flapp" element={<Flapp />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
