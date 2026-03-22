import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'THE Journey', path: '/journey' },
    { name: 'FLAPP', path: '/flapp' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-background/80 backdrop-blur-xl border-border/50 py-4 shadow-sm' : 'bg-transparent border-transparent py-6'}`}>
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display font-bold text-2xl tracking-tight text-foreground transition-transform group-hover:scale-105">
            TAMKEN
          </span>
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          {links.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`relative font-medium text-sm transition-colors hover:text-foreground ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-primary rounded-full transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            )
          })}
        </div>
        <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:translate-y-[-2px] hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] relative overflow-hidden group">
          <span className="relative z-10">Connect With Us</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
