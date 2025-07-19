import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './QRLanding.css';
import logoImage from '../assets/logo.png';

// Google Analytics gtag type declaration
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: any
    ) => void;
  }
}

interface LinkItem {
  id: string;
  href: string;
  title: string;
  description?: string;
  variant: 'primary' | 'secondary' | 'tertiary';
  isExternal?: boolean;
  isActive?: boolean;
}

interface SocialLink {
  id: string;
  href: string;
  icon: string;
  title: string;
}

// Dynamic data configuration
const linksData: LinkItem[] = [
  {
    id: 'main-website',
    href: 'https://brandgoto.com',
    title: 'Visit Website',
    variant: 'primary',
    isExternal: true,
    isActive: true
  },
  {
    id: 'smartlaunch',
    href: 'https://smartlaunch.brandgoto.com/',
    title: 'SmartLaunch™',
    description: 'Your bold brand, one smart link',
    variant: 'secondary',
    isExternal: true,
    isActive: true
  },
  {
    id: 'book-consultation',
    href: 'https://calendly.com/silas-brandgoto/30min',
    title: 'Book Call',
    variant: 'tertiary',
    isExternal: true,
    isActive: true
  },
  {
    id: 'client-onboarding',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSffvSHeZGFyUK5GsubUaQp71m8y7Me-4VZrcj7AmejOzUgleA/viewform?usp=header',
    title: 'Get Started',
    variant: 'secondary',
    isExternal: true,
    isActive: true
  }
];

const socialLinksData: SocialLink[] = [
  {
    id: 'instagram',
    href: 'https://www.instagram.com/brand_goto/',
    icon: 'fab fa-instagram',
    title: 'Instagram'
  },
  {
    id: 'twitter',
    href: 'https://x.com/Brand_goto',
    icon: 'fab fa-x-twitter',
    title: 'Twitter'
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/company/brandgoto',
    icon: 'fab fa-linkedin-in',
    title: 'LinkedIn'
  }
];

const QRLanding: React.FC = () => {
  const [logoError, setLogoError] = useState(false);

  // Track QR scan event on page load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'qr_scan', {
        'event_category': 'engagement',
        'event_label': 'qr_landing_page'
      });
    }
  }, []);

  const handleLogoError = () => {
    console.error('Logo failed to load from assets');
    setLogoError(true);
  };

  const handleLogoLoad = () => {
    console.log('Logo loaded successfully from assets');
    setLogoError(false);
  };

  const trackClick = (action: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        'event_category': 'qr_cta',
        'event_label': action,
        'value': 1
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const LinkButton: React.FC<{ link: LinkItem }> = ({ link }) => {
    const buttonContent = (
      <motion.div
        className={`link-button ${link.variant}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => trackClick(link.id)}
      >
        <span className="link-title">{link.title}</span>
        {link.description && (
          <span className="link-description">{link.description}</span>
        )}
      </motion.div>
    );

    if (link.isExternal) {
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-wrapper"
        >
          {buttonContent}
        </a>
      );
    }

    return (
      <Link to={link.href} className="link-wrapper">
        {buttonContent}
      </Link>
    );
  };

  const SocialIcon: React.FC<{ social: SocialLink }> = ({ social }) => (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon"
      onClick={() => trackClick(social.id)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={social.title}
    >
      <i className={social.icon}></i>
    </motion.a>
  );

  return (
    <div className="qr-landing">
      <motion.div 
        className="qr-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header className="qr-header" variants={itemVariants}>
          {!logoError ? (
            <img 
              src={logoImage} 
              alt="BrandGoto" 
              className="qr-logo"
              loading="lazy"
              onError={handleLogoError}
              onLoad={handleLogoLoad}
            />
          ) : (
            <div className="qr-logo-fallback">
              <span>BrandGoto</span>
            </div>
          )}
          <h1 className="qr-brand-title">BrandGoto</h1>
        </motion.header>

        {/* Links */}
        <motion.section className="qr-links" variants={itemVariants}>
          {linksData
            .filter(link => link.isActive)
            .map((link) => (
            <motion.div
              key={link.id}
              variants={itemVariants}
            >
              <LinkButton link={link} />
            </motion.div>
          ))}
        </motion.section>

        {/* Social Links */}
        <motion.section className="qr-social-section" variants={itemVariants}>
          <div className="qr-social-links">
            {socialLinksData.map((social) => (
              <SocialIcon key={social.id} social={social} />
            ))}
          </div>
        </motion.section>

        {/* Contact & Footer */}
        <motion.footer className="qr-footer" variants={itemVariants}>
          <div className="qr-contact">
            <a href="mailto:hello@brandgoto.com" className="contact-link">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="tel:+16479377031" className="contact-link">
              <i className="fas fa-phone"></i>
            </a>
          </div>
          <p className="qr-copyright">
            © {new Date().getFullYear()} BrandGoto
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default QRLanding; 