import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { t, tx } from '../lib/translations';

const Footer = () => {
  const { lang, isAr } = useLanguage();

  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-md pt-16 pb-8 relative z-50">
      <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className={isAr ? 'text-right' : 'text-left'}>
          <h2 className="text-3xl font-bold text-foreground mb-2">TAMKEN</h2>
          <p className="text-muted-foreground text-lg">{tx(t.footer.tagline, lang)}</p>
        </div>
        <div className={isAr ? 'text-right' : 'text-left'}>
          <h3 className="font-mono text-sm uppercase tracking-widest text-foreground mb-6">
            {tx(t.footer.contact, lang)}
          </h3>
          <ul className="space-y-4">
            <li>
              <span className="text-muted-foreground">{isAr ? 'البريد الإلكتروني: ' : 'Email: '}</span>
              <a href="mailto:info@tamken-eg.com" className="text-primary hover:text-primary-glow font-medium transition-colors hover:underline underline-offset-4 ltr-force">
                info@tamken-eg.com
              </a>
            </li>
            <li>
              <span className="text-muted-foreground">{isAr ? 'الموقع الإلكتروني: ' : 'Website: '}</span>
              <a href="https://www.tamken-eg.com" className="text-primary hover:text-primary-glow font-medium transition-colors hover:underline underline-offset-4 ltr-force">
                www.tamken-eg.com
              </a>
            </li>
            <li>
              <span className="text-muted-foreground">{isAr ? 'اتصل بنا: ' : 'Call: '}</span>
              <a href="tel:+201224411114" className="text-primary hover:text-primary-glow font-medium transition-colors hover:underline underline-offset-4 ltr-force">
                +20 122 44 1111 4
              </a>
            </li>
            <li className="pt-2">
              <a 
                href="https://drive.google.com/file/d/17jU6B6lLvaqUP4h9B-3-mTX8pDETZoQD/view?usp=sharing"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-primary-glow font-bold transition-all group"
              >
                <span className="group-hover:translate-x-1 transition-transform">{tx(t.footer.download, lang)}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 max-w-7xl mt-16 pt-8 border-t border-border/50 text-center">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} <span className="ltr-force">TAMKEN</span>. {tx(t.footer.rights, lang)}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

