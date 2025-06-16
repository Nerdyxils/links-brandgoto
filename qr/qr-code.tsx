import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './qr-code.css';
import { motion } from 'framer-motion';

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

interface CTAButton {
  href: string;
  title: string;
  description: string;
  icon: string;
  variant: 'primary' | 'secondary' | 'tertiary';
  onClick: string;
  isExternal?: boolean;
  isCommented?: boolean;
}

interface SocialLink {
  href: string;
  title: string;
  icon: string;
  onClick: string;
}

const QRLanding: React.FC = () => {
  // Track QR scan event on page load
  useEffect(() => {
    // Google Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'qr_scan', {
        'event_category': 'engagement',
        'event_label': 'qr_landing_page'
      });
    }
  }, []);

  const ctaButtons: CTAButton[] = [
    {
      href: '/',
      title: 'Go to Main Website',
      description: 'See our portfolio & services',
      icon: '🏠',
      variant: 'primary',
      onClick: 'main_website'
    },
    // {
    //   href: '/complete-business-assessment',
    //   title: 'Free Business Assessment',
    //   description: 'Get your brand score in 60 seconds',
    //   icon: '📊',
    //   variant: 'primary',
    //   onClick: 'business_assessment'
    // },
    {
      href: 'https://calendly.com/silas-brandgoto/30min',
      title: 'Book Free Consultation',
      description: '30-minute strategy session',
      icon: '📞',
      variant: 'tertiary',
      onClick: 'book_consultation',
      isExternal: true
    },
    // Client Onboarding Form - Ready to use
    {
      href: 'https://docs.google.com/forms/d/e/1FAIpQLSffvSHeZGFyUK5GsubUaQp71m8y7Me-4VZrcj7AmejOzUgleA/viewform?usp=header',
      title: 'Client Onboarding',
      description: 'Ready to start? Complete your intake',
      icon: '📋',
      variant: 'secondary',
      onClick: 'client_onboarding',
      isExternal: true
    },
    // BrandGoto Smart Launch - Commented out (uncomment when ready)
    // {
    //   href: '/smart-launch',
    //   title: 'BrandGoto Smart Launch™',
    //   description: 'Launch faster, grow stronger',
    //   icon: '🚀',
    //   variant: 'secondary',
    //   onClick: 'smart_launch',
    //   isCommented: true
    // },
    // Tech Outsourcing - Commented out (uncomment when ready)
    // {
    //   href: '/tech-outsourcing',
    //   title: 'Tech Team Outsourcing',
    //   description: 'Scale with expert developers',
    //   icon: '💻',
    //   variant: 'secondary',
    //   onClick: 'tech_outsourcing',
    //   isCommented: true
    // }
  ];

  const socialLinks: SocialLink[] = [
    {
      href: 'https://www.instagram.com/brand_goto/',
      title: 'Instagram',
      icon: 'fab fa-instagram',
      onClick: 'instagram'
    },
    {
      href: 'https://x.com/Brand_goto',
      title: 'Twitter',
      icon: 'fab fa-x-twitter',
      onClick: 'twitter'
    },
    {
      href: '#',
      title: 'LinkedIn',
      icon: 'fab fa-linkedin-in',
      onClick: 'linkedin'
    },
    {
      href: '#',
      title: 'Facebook',
      icon: 'fab fa-facebook-f',
      onClick: 'facebook'
    }
  ];

  const trackClick = (action: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        'event_category': 'qr_cta',
        'event_label': action,
        'value': 1
      });
    }
    console.log('Tracked click:', action);
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

  const renderCTAButton = (button: CTAButton) => {
    const buttonContent = (
      <>
        <span className="qr-cta-icon">{button.icon}</span>
        {button.title}
        <div className="qr-cta-description">{button.description}</div>
      </>
    );

    const buttonProps = {
      className: `qr-cta-button ${button.variant}`,
      onClick: () => trackClick(button.onClick)
    };

    if (button.isExternal) {
      return (
        <motion.a
          href={button.href}
          target="_blank"
          rel="noopener noreferrer"
          {...buttonProps}
        >
          {buttonContent}
        </motion.a>
      );
    }

    return (
      <Link 
        to={button.href}
        {...buttonProps}
      >
        {buttonContent}
      </Link>
    );
  };

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
          <img 
            src="/images/logo.png" 
            alt="BrandGoto Logo" 
            className="qr-logo"
          />
          <p className="qr-welcome-text">Welcome to</p>
          <h1 className="qr-brand-title">BrandGoto</h1>
          <p className="qr-tagline">Where Bold Brands Begin</p>
        </motion.header>

        {/* Trust Badges */}
        <motion.div className="qr-trust-badges" variants={itemVariants}>
          <div className="qr-trust-badge">
            <i className="fas fa-shield-alt"></i>
            Trusted & Secure
          </div>
          <div className="qr-trust-badge">
            <i className="fas fa-users"></i>
            Served Brands Worldwide
          </div>
        </motion.div>

        {/* Main CTAs */}
        <motion.section className="qr-main-ctas" variants={itemVariants}>
          <h2 className="qr-section-title">🚀 Get Started Today</h2>
          
          {ctaButtons
            .filter(button => !button.isCommented)
            .map((button) => (
            <motion.div
              key={button.onClick}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {renderCTAButton(button)}
            </motion.div>
          ))}
        </motion.section>

        {/* Social Links */}
        <motion.section className="qr-social-section" variants={itemVariants}>
          <h3 className="qr-social-title">🌟 Connect With Us</h3>
          <div className="qr-social-links">
            {socialLinks.map((social) => (
              <motion.a
                key={social.onClick}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="qr-social-link"
                onClick={() => trackClick(social.onClick)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={social.icon}></i>
                {social.title}
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Contact Info */}
        <motion.section className="qr-contact-info" variants={itemVariants}>
          <div className="qr-contact-item">
            <i className="fas fa-envelope"></i>
            <a href="mailto:hello@brandgoto.com">hello@brandgoto.com</a>
          </div>
          <div className="qr-contact-item">
            <i className="fas fa-globe"></i>
            <a href="https://brandgoto.com">brandgoto.com</a>
          </div>
          <div className="qr-contact-item">
            <i className="fas fa-globe"></i>
            <a href="https://brandgoto.ca">brandgoto.ca</a>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer className="qr-footer" variants={itemVariants}>
          <p className="qr-footer-text">© 2025 BrandGoto. All rights reserved.</p>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default QRLanding;