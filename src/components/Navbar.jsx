import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="brand">
          <span className="brand-text">TAMKEN</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/journey" className={location.pathname === '/journey' ? 'active' : ''}>THE Journey</Link>
          <Link to="/flapp" className={location.pathname === '/flapp' ? 'active' : ''}>FLAPP</Link>
        </div>
        <button className="btn-primary">Connect With Us</button>
      </div>
    </nav>
  );
};

export default Navbar;
