import React from 'react';
import { Shield, Scan, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  const stats = [
    { label: 'Phishing Attempts Blocked', value: '1.2M+', icon: Shield },
    { label: 'Accuracy Rate', value: '99.8%', icon: CheckCircle },
    { label: 'Scans Performed', value: '50K+', icon: Scan },
    { label: 'Threats Detected', value: '15K+', icon: AlertTriangle },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-20 lg:py-28">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-500 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-indigo-500 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Protect Yourself from
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 block">
                Phishing Attacks
              </span>
            </h1>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Our AI-powered tool analyzes emails and links in real-time to detect phishing attempts, 
              protecting you from cyber threats with industry-leading accuracy.
            </p>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button
              onClick={() => setActiveSection('email')}
              className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Scan Email
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
            <button
              onClick={() => setActiveSection('link')}
              className="relative px-8 py-4 bg-gray-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform group border border-gray-700 hover:border-gray-600"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Check Link
              </span>
              <span className="absolute inset-0 bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center border border-gray-700/50 hover:border-gray-600"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg mb-4 mx-auto">
                  <stat.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;