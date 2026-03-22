import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer section">
      <div className="container grid footer-grid">
        <div className="footer-brand">
          <h2 className="brand-text">TAMKEN</h2>
          <p>Navigating Industrial Evolution</p>
        </div>
        <div className="footer-contact">
          <h3>Connect with us</h3>
          <ul>
            <li>Email: <a href="mailto:info@tamken-eg.com">info@tamken-eg.com</a></li>
            <li>Website: <a href="https://www.tamken-eg.com">www.tamken-eg.com</a></li>
            <li>Call: <a href="tel:+201224411114">+20 122 44 1111 4</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom text-center">
        <p>&copy; {new Date().getFullYear()} Tamken. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
