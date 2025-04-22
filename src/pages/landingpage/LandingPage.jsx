import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from './Hero.jsx';
import FeaturesSection from './FeaturesSection.jsx';
import CallToActionSection from './CallToActionSection.jsx';

const LandingPage = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <FeaturesSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <CallToActionSection />
      </motion.div>
    </div>
  );
};

export default LandingPage;
