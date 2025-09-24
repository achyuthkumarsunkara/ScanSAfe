import React from 'react';
import { Users, Target, Award, Shield, Heart, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutUs: React.FC = () => {
  const teamMembers = [
    {
      name: 'Achyuth Kumar Sunkara',
      role: 'Main Developer',
      expertise: 'B.Tech CSE(IoT&CSBT) | Cybersecurity Enthusiast',
      image: '/team/achyuth-kumar.jpg',
      description: 'Student at PACE Institute of Technology and Sciences, passionate about cybersecurity and developing secure applications.'
    },
    {
      name: 'Leela Satya Sai Renu Sree',
      role: 'UI/UX Designer',
      expertise: 'B.Tech CSE(IoT&CSBT) | Cybersecurity Enthusiast',
      image: '/team/leela-satya.jpg',
      description: 'Student at PACE Institute of Technology and Sciences, specializing in user interface design and user experience optimization.'
    }
  ];

  const milestones = [
    {
      year: '2025, May',
      title: 'Project Started',
      description: 'Began development with a vision to create accessible cybersecurity tools',
      icon: Heart
    },
    {
      year: '2025, June',
      title: 'Core Development',
      description: 'Achyuth Kumar built the foundation with robust security features',
      icon: Zap
    },
    {
      year: '2025, July',
      title: 'UI/UX Design',
      description: 'Leela Satya designed intuitive and user-friendly interfaces',
      icon: Target
    },
    {
      year: '2025, July',
      title: 'Integration',
      description: 'Combined development and design for seamless user experience',
      icon: Globe
    },
    {
      year: '2025, July',
      title: 'Launch Ready',
      description: 'Prepared to serve users with innovative security solutions',
      icon: Award
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We prioritize user safety above all else, implementing robust security measures in everything we build.'
    },
    {
      icon: Users,
      title: 'User-Centric',
      description: 'Our tools are designed with real users in mind, making complex security simple and accessible.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'We believe in protecting users regardless of their technical expertise or background.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuous learning and adaptation to stay ahead of evolving cyber threats.'
    }
  ];

  const stats = [
    { number: '100%', label: 'Student-Driven', icon: Users },
    { number: '2', label: 'Dedicated Team Members', icon: Award },
    { number: 'IoT&CSBT', label: 'Specialization', icon: Shield },
    { number: 'PACE', label: 'Institute of Technology', icon: Globe }
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
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-20">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-500 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-indigo-500 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-purple-500 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">About ScanSAfe</span>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Student-Driven
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 block">
                Cybersecurity Innovation
              </span>
            </h1>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              ScanSAfe is the result of passionate collaboration between two cybersecurity enthusiasts from PACE Institute of Technology and Sciences. 
              As B.Tech students specializing in IoT and Cybersecurity, we're committed to creating accessible security solutions for everyone.
            </p>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl text-center border border-gray-700/50 hover:border-gray-600 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg mb-4 mx-auto">
                <stat.icon className="h-6 w-6 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  As students at PACE Institute of Technology and Sciences, we recognized the growing need for 
                  accessible cybersecurity solutions. While studying B.Tech in Computer Science with specialization 
                  in IoT and Cybersecurity, we witnessed how complex security tools could be for everyday users.
                </p>
                <p>
                  Achyuth Kumar, our main developer, brought his cybersecurity expertise to build a robust foundation, 
                  while Leela Satya focused on creating intuitive user interfaces that make security approachable 
                  for everyone.
                </p>
                <p>
                  Together, we combined our academic knowledge with practical skills to develop ScanSAfe - a platform 
                  that demonstrates how student innovation can contribute to real-world cybersecurity challenges.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 border border-blue-500/20">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Target className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Our Mission</h3>
                      <p className="text-gray-400 text-sm">Make cybersecurity accessible through student-driven innovation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <Globe className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Our Vision</h3>
                      <p className="text-gray-400 text-sm">Bridge the gap between academic learning and practical cybersecurity solutions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Heart className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Our Approach</h3>
                      <p className="text-gray-400 text-sm">Combine technical expertise with user-centered design principles</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-gray-400">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg mb-4">
                  <value.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-gray-400">From classroom learning to practical application</p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-cyan-500"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                      <div className="flex items-center gap-3 mb-2">
                        <milestone.icon className="h-5 w-5 text-blue-400" />
                        <span className="text-blue-400 font-semibold">{milestone.year}</span>
                      </div>
                      <h3 className="text-white font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-gray-400 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-gray-900 z-10"></div>
                  
                  {/* Spacer for the other side */}
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-gray-400">Passionate students from PACE Institute of Technology and Sciences</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all duration-300 overflow-hidden"
              >
                <div className="h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Users className="h-12 w-12 text-cyan-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-cyan-400 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-gray-400 text-xs font-medium mb-3">{member.expertise}</p>
                  <p className="text-gray-500 text-sm">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8">
            <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Join Our Mission</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              As students passionate about cybersecurity, we believe in making digital protection accessible to all. 
              Your support helps us continue learning and innovating in the field of cybersecurity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Started Free
              </button>
              <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300">
                Contact Our Team
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;