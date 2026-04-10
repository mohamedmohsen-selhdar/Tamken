import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'THE Journey', path: '/journey' },
    { name: 'FLAPP', path: '/flapp' },
    { name: 'Articles', path: '/articles' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Careers', path: '/careers' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled || mobileOpen ? 'bg-background/95 backdrop-blur-xl border-border/50 py-4 shadow-sm' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-2xl tracking-tight text-foreground transition-transform group-hover:scale-105">
              TAMKEN
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex gap-8 items-center">
            {links.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-medium text-sm transition-colors hover:text-foreground group ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-primary rounded-full transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-surface-hover text-muted-foreground hover:text-foreground transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href="https://drive.google.com/file/d/17jU6B6lLvaqUP4h9B-3-mTX8pDETZoQD/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:translate-y-[-2px] hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] relative overflow-hidden group hidden md:block">
              <span className="relative z-10">Download Company Profile</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </a>
            {/* Hamburger - mobile only */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-border/70 bg-background/60 text-foreground hover:bg-surface-hover transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" onClick={() => setMobileOpen(false)} />

        {/* Menu content */}
        <div className={`absolute top-0 left-0 right-0 bottom-0 flex flex-col pt-24 px-8 pb-12 transition-transform duration-300 ${mobileOpen ? 'translate-y-0' : '-translate-y-4'}`}>
          {/* Red accent glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vh] bg-primary/10 blur-[80px] pointer-events-none rounded-full" />

          <nav className="flex flex-col gap-2 flex-1 justify-center">
            {links.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center justify-between py-4 px-4 rounded-xl text-xl font-bold transition-all duration-200 group ${
                    isActive
                      ? 'text-primary bg-primary/10 border border-primary/30'
                      : 'text-foreground hover:text-primary hover:bg-primary/5 border border-transparent'
                  }`}
                  style={{ transitionDelay: mobileOpen ? `${i * 40}ms` : '0ms' }}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto">
            <a href="https://drive.google.com/file/d/17jU6B6lLvaqUP4h9B-3-mTX8pDETZoQD/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-primary text-primary-foreground px-6 py-4 rounded-2xl font-bold text-base hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all">
              Download Company Profile
            </a>
            <p className="text-center text-muted-foreground text-xs mt-4">© 2025 TAMKEN. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
