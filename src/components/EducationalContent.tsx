import React from 'react';
import { BookOpen, Users, Target, Shield, AlertTriangle, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const EducationalContent: React.FC = () => {
  const phishingTypes = [
    {
      title: "Email Phishing",
      description: "Fraudulent emails designed to steal credentials or personal information",
      icon: Target,
      examples: ["Fake banking alerts", "Lottery winning notifications", "Account suspension warnings"]
    },
    {
      title: "Spear Phishing",
      description: "Targeted attacks on specific individuals or organizations",
      icon: Users,
      examples: ["Personalized executive emails", "Vendor impersonation", "Social media targeting"]
    },
    {
      title: "Pharming",
      description: "Redirecting users to fake websites through DNS manipulation",
      icon: Eye,
      examples: ["Fake banking websites", "Compromised DNS servers", "Malicious redirects"]
    },
    {
      title: "Smishing",
      description: "Phishing attacks conducted via SMS text messages",
      icon: AlertTriangle,
      examples: ["Fake delivery notifications", "Bank security alerts", "Prize claim messages"]
    }
  ];

  const warningSignsEmail = [
    "Generic greetings (Dear Customer, Dear User)",
    "Urgent language or threats",
    "Poor grammar and spelling",
    "Requests for personal information",
    "Suspicious sender addresses",
    "Unusual attachments or links",
    "Too-good-to-be-true offers"
  ];

  const warningSignsLinks = [
    "URLs that don't match the claimed destination",
    "Shortened URLs (bit.ly, tinyurl.com)",
    "Misspelled domain names",
    "Unusual domain extensions",
    "HTTP instead of HTTPS for sensitive sites",
    "Multiple subdomains",
    "Direct IP addresses instead of domain names"
  ];

  const bestPractices = [
    {
      title: "Verify Before You Click",
      description: "Always hover over links to see the actual destination before clicking"
    },
    {
      title: "Check the Sender",
      description: "Verify the sender's email address and look for inconsistencies"
    },
    {
      title: "Be Skeptical of Urgency",
      description: "Take time to verify urgent requests through alternative channels"
    },
    {
      title: "Use Two-Factor Authentication",
      description: "Enable 2FA on all important accounts for additional security"
    },
    {
      title: "Keep Software Updated",
      description: "Regularly update your browser, email client, and security software"
    },
    {
      title: "Report Suspicious Activity",
      description: "Report phishing attempts to help protect others"
    }
  ];

  // Animation variants
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
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-20">
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
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4 mx-auto">
              <BookOpen className="h-8 w-8 text-blue-400" />
            </div>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-white mb-4">Learn About Phishing</h2>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Educate yourself about different types of phishing attacks and how to protect yourself from cyber threats
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-bold text-white mb-6">Types of Phishing Attacks</h3>
            <div className="space-y-4">
              {phishingTypes.map((type, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/20 p-3 rounded-lg">
                      <type.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-2">{type.title}</h4>
                      <p className="text-gray-400 mb-3">{type.description}</p>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {type.examples.map((example, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                            {example}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-bold text-white mb-6">Warning Signs</h3>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all mb-6"
            >
              <h4 className="font-semibold text-white mb-4">Email Warning Signs</h4>
              <ul className="space-y-3">
                {warningSignsEmail.map((sign, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{sign}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all"
            >
              <h4 className="font-semibold text-white mb-4">Link Warning Signs</h4>
              <ul className="space-y-3">
                {warningSignsLinks.map((sign, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{sign}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Best Practices for Protection</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestPractices.map((practice, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700/30 p-6 rounded-lg border border-gray-600/30 hover:border-gray-500 transition-all"
              >
                <h4 className="font-semibold text-white mb-2">{practice.title}</h4>
                <p className="text-sm text-gray-400">{practice.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationalContent;