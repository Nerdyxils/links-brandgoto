import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoSvg from '../assets/LogoSvg';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Create and inject CSS animation styles
    const style = document.createElement('style');
    style.textContent = `
      .orange-stroke {
        animation: fillAnimation 4s ease-in-out forwards;
      }

      @keyframes fillAnimation {
        0% {
          fill: transparent;
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
        }
        60% {
          fill: transparent;
          stroke-dashoffset: 0;
        }
        100% {
          fill: #f97316;
          stroke-dashoffset: 0;
        }
      }
    `;
    document.head.appendChild(style);

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 9000); // Set to 4 seconds total timing

    return () => {
      clearTimeout(timer);
      // Clean up the style element
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const logoVariants = {
    initial: { scale: 1, opacity: 1 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 5, opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        onComplete();
      }}
    >
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50 min-h-screen w-full"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex items-center justify-center relative"
            variants={logoVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Static white logo stroke */}
            <LogoSvg className="w-[50vw] sm:w-[40vw] md:w-[30vw] max-w-[400px] h-auto absolute" />

            {/* Animated orange logo stroke - just like your original */}
            <LogoSvg className="w-[50vw] sm:w-[40vw] md:w-[30vw] max-w-[400px] h-auto absolute orange-stroke" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;