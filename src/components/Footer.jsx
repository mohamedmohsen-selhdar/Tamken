import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-md pt-16 pb-8 relative z-50">
      <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">TAMKEN</h2>
          <p className="text-muted-foreground text-lg">Navigating Industrial Evolution</p>
        </div>
        <div>
          <h3 className="font-mono text-sm uppercase tracking-widest text-foreground mb-6">Connect with us</h3>
          <ul className="space-y-4">
            <li>
              <span className="text-muted-foreground">Email: </span>
              <a href="mailto:info@tamken-eg.com" className="text-primary hover:text-primary-glow font-medium transition-colors hover:underline underline-offset-4">
                info@tamken-eg.com
              </a>
            </li>
            <li>
              <span className="text-muted-foreground">Website: </span>
              <a href="https://www.tamken-eg.com" className="text-primary hover:text-primary-glow font-medium transition-colors hover:underline underline-offset-4">
                www.tamken-eg.com
              </a>
            </li>
            <li>
              <span className="text-muted-foreground">Call: </span>
              <a href="tel:+201224411114" className="text-primary hover:text-primary-glow font-medium transition-colors hover:underline underline-offset-4">
                +20 122 44 1111 4
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 max-w-7xl mt-16 pt-8 border-t border-border/50 text-center">
        <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} Tamken. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
