import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const links = [
  {
    title: 'Main Website',
    url: 'https://brandgoto.com/ca',
    icon: '🌐',
  },
  {
    title: 'Instagram',
    url: 'https://instagram.com/brandgoto',
    icon: '📸',
  },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/company/brandgoto/',
    icon: '💼',
  }
];

const smartLaunch = {
  title: 'SmartLaunch™',
  url: 'https://smartlaunch.brandgoto.com/',
  icon: '🚀',
};

const Links: React.FC = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Hero Section */}
      <section className="hero-section w-full relative flex flex-col items-center justify-center">
        <div className="hero-bg-gradient"></div>
        <div className="hero-bg-radial"></div>
        {/* Floating shapes */}
        <div className="hero-floating-1"></div>
        <div className="hero-floating-2"></div>
        <div className="hero-floating-3"></div>
        <div className="hero-content px-4 pt-16 pb-8 w-full">
          <div className="flex flex-col items-center mb-8">
            <img src="/images/logo.png" alt="BrandGoto Logo" className="w-20 h-20 mb-4 rounded-full bg-black border border-white/10" />
            <span className="hero-badge mb-4">Official BrandGoto Links</span>
            <h1 className="hero-headline gradient-text mb-4">SmartLaunch™</h1>
            <p className="hero-subtext mb-6">Your bold brand, one smart link. Connect, launch, and grow with BrandGoto.</p>
          </div>
          <div className="hero-cta w-full flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href={smartLaunch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-lg flex items-center gap-2 w-full sm:w-auto justify-center"
              style={{ boxShadow: '0 0 20px rgba(247,95,11,0.15)' }}
            >
              <span className="text-2xl">{smartLaunch.icon}</span>
              <span>{smartLaunch.title}</span>
            </a>
          </div>
          <div className="flex flex-col items-center mb-8">
            <div className="card mb-2 inline-block">
              <QRCodeSVG
                value={window.location.href}
                size={140}
                level="H"
                includeMargin={true}
              />
            </div>
            <span className="hero-badge mt-2">Scan to Connect</span>
          </div>
          <div className="grid grid-cols-1 gap-4 w-full max-w-3xl mx-auto mb-8">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary btn-lg flex items-center gap-3 w-full justify-center"
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.title}</span>
              </a>
            ))}
          </div>
          <div className="hero-social-proof gap-4 mt-8">
            <div className="hero-social-item">
              <span className="hero-social-dot"></span>
              <span>Trusted by bold brands</span>
            </div>
            <div className="hero-social-item">
              <span className="hero-social-dot"></span>
              <span>Secure &amp; fast</span>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full text-center py-8 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} BrandGoto. All rights reserved.
      </footer>
    </div>
  );
};

export default Links; 