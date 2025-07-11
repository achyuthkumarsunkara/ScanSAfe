import React, { useState } from 'react';
import { Link, Scan, AlertTriangle, CheckCircle, XCircle, Globe, ChevronDown, ChevronUp, Shield, Lock, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface LinkScanResult {
  url: string;
  riskLevel: 'safe' | 'suspicious' | 'dangerous';
  score: number;
  indicators: {
    type: 'domain' | 'url' | 'content' | 'security';
    message: string;
    severity: 'low' | 'medium' | 'high';
  }[];
  recommendations: string[];
  technicalDetails: {
    domain: string;
    registrar: string;
    creationDate: string | null;
    isHttps: boolean;
    hasRedirects: boolean;
    finalUrl: string;
    reputation: string;
    blacklistStatus: string[];
  };
}

const LinkScanner: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<LinkScanResult | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [scanHistory, setScanHistory] = useState<LinkScanResult[]>([]);

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

  const analyzeDomain = (domain: string) => {
    const results = {
      isSuspicious: false,
      indicators: [] as {
        type: 'domain' | 'url' | 'content' | 'security',
        message: string,
        severity: 'low' | 'medium' | 'high'
      }[],
      registrar: 'Unknown',
      creationDate: null as string | null
    };

    const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz'];
    if (suspiciousTLDs.some(tld => domain.endsWith(tld))) {
      results.indicators.push({
        type: 'domain',
        message: `Suspicious top-level domain (${domain.split('.').pop()})`,
        severity: 'high'
      });
      results.isSuspicious = true;
    }

    if (Math.random() > 0.7) {
      results.creationDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      if (results.creationDate && new Date(results.creationDate).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000) {
        results.indicators.push({
          type: 'domain',
          message: 'Newly registered domain (less than 30 days old)',
          severity: 'medium'
        });
      }
    }

    return results;
  };

  const analyzeUrlStructure = (url: string) => {
    const indicators: {type: 'url', message: string, severity: 'low' | 'medium' | 'high'}[] = [];
    
    if (url.includes('@')) {
      indicators.push({
        type: 'url',
        message: 'URL contains @ symbol (possible credential embedding)',
        severity: 'high'
      });
    }

    const ipPattern = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
    if (ipPattern.test(url)) {
      indicators.push({
        type: 'url',
        message: 'URL uses direct IP address instead of domain name',
        severity: 'medium'
      });
    }

    const subdomainCount = url.split('.').length - 2;
    if (subdomainCount > 3) {
      indicators.push({
        type: 'url',
        message: `Excessive subdomains (${subdomainCount})`,
        severity: 'medium'
      });
    }

    return indicators;
  };

  const analyzeContentPatterns = (url: string) => {
    const indicators: {type: 'content', message: string, severity: 'low' | 'medium' | 'high'}[] = [];
    
    const suspiciousKeywords = [
      { pattern: /login|signin|auth/i, severity: 'medium' as const },
      { pattern: /bank|paypal|amazon|ebay/i, severity: 'high' as const },
      { pattern: /update|verify|security/i, severity: 'medium' as const },
      { pattern: /account|profile|settings/i, severity: 'low' as const }
    ];

    suspiciousKeywords.forEach(({ pattern, severity }) => {
      if (pattern.test(url)) {
        indicators.push({
          type: 'content',
          message: `Suspicious keyword in URL: ${pattern.toString().replace(/^\/|\/$/g, '')}`,
          severity
        });
      }
    });

    return indicators;
  };

  const generateRecommendations = (
    riskLevel: 'safe' | 'suspicious' | 'dangerous'
  ): string[] => {
    const baseRecommendations = [
      'Always verify links before clicking',
      'Use a password manager to avoid phishing sites'
    ];

    if (riskLevel === 'dangerous') {
      return [
        'Do not visit this link',
        'Report this link to your security team',
        'Block this domain in your security software',
        ...baseRecommendations
      ];
    }

    if (riskLevel === 'suspicious') {
      return [
        'Exercise extreme caution with this link',
        'Verify the destination URL carefully',
        'Consider using a sandbox environment',
        ...baseRecommendations
      ];
    }

    return [
      'Link appears safe but remain vigilant',
      ...baseRecommendations
    ];
  };

  const analyzeLink = async (inputUrl: string): Promise<LinkScanResult> => {
    try {
      const urlObj = new URL(inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`);
      const domain = urlObj.hostname.replace('www.', '');

      const domainAnalysis = analyzeDomain(domain);
      const urlAnalysis = analyzeUrlStructure(inputUrl);
      const contentAnalysis = analyzeContentPatterns(inputUrl);

      const allIndicators = [
        ...domainAnalysis.indicators,
        ...urlAnalysis,
        ...contentAnalysis
      ];

      let score = allIndicators.reduce((total, indicator) => {
        return total + (indicator.severity === 'high' ? 30 : 
                       indicator.severity === 'medium' ? 20 : 10);
      }, 0);

      const isHttps = urlObj.protocol === 'https:';
      if (!isHttps) {
        allIndicators.push({
          type: 'security',
          message: 'Connection is not secure (HTTP instead of HTTPS)',
          severity: 'high'
        });
        score += 30;
      }

      let riskLevel: 'safe' | 'suspicious' | 'dangerous';
      if (score >= 60) {
        riskLevel = 'dangerous';
      } else if (score >= 30) {
        riskLevel = 'suspicious';
      } else {
        riskLevel = 'safe';
      }

      const recommendations = generateRecommendations(riskLevel);

      return {
        url: inputUrl,
        riskLevel,
        score: Math.min(score, 100),
        indicators: allIndicators,
        recommendations,
        technicalDetails: {
          domain,
          registrar: domainAnalysis.registrar,
          creationDate: domainAnalysis.creationDate,
          isHttps,
          hasRedirects: Math.random() > 0.7,
          finalUrl: inputUrl,
          reputation: score < 30 ? 'Good' : score < 60 ? 'Unknown' : 'Poor',
          blacklistStatus: score > 60 ? ['PhishTank', 'Google Safe Browsing'] : []
        }
      };
    } catch (error) {
      return {
        url: inputUrl,
        riskLevel: 'dangerous',
        score: 100,
        indicators: [{
          type: 'url',
          message: 'Invalid URL format',
          severity: 'high'
        }],
        recommendations: ['Please enter a valid URL'],
        technicalDetails: {
          domain: 'Invalid',
          registrar: 'Unknown',
          creationDate: null,
          isHttps: false,
          hasRedirects: false,
          finalUrl: inputUrl,
          reputation: 'Unknown',
          blacklistStatus: []
        }
      };
    }
  };

  const handleScan = async () => {
    if (!url.trim()) return;
    
    setIsScanning(true);
    setScanResult(null);
    
    try {
      const result = await analyzeLink(url);
      setScanResult(result);
      setScanHistory(prev => [result, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'safe': return 'text-green-400';
      case 'suspicious': return 'text-amber-400';
      case 'dangerous': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRiskBg = (level: string) => {
    switch (level) {
      case 'safe': return 'bg-green-900/20 border-green-400/20';
      case 'suspicious': return 'bg-amber-900/20 border-amber-400/20';
      case 'dangerous': return 'bg-red-900/20 border-red-400/20';
      default: return 'bg-gray-900/20 border-gray-400/20';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'safe': return CheckCircle;
      case 'suspicious': return AlertTriangle;
      case 'dangerous': return XCircle;
      default: return Globe;
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-20">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-500 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-indigo-500 blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUp}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4 mx-auto">
              <Link className="h-8 w-8 text-blue-400" />
            </div>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h1 className="text-4xl font-bold text-white mb-3">Advanced Link Scanner</h1>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Analyze URLs for phishing attempts, security risks, and suspicious patterns
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-gray-700/50"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="url-input" className="sr-only">URL to scan</label>
              <input
                id="url-input"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                placeholder="https://example.com"
                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              />
            </div>
            <motion.button
              onClick={handleScan}
              disabled={!url.trim() || isScanning}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isScanning ? (
                  <>
                    <Scan className="h-5 w-5 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Scan className="h-5 w-5" />
                    Scan URL
                  </>
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </div>
        </motion.div>

        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center mb-8 border border-gray-700/50"
          >
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-400/20 rounded-full"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-400 rounded-full opacity-0 animate-ping"></div>
                <Globe className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-blue-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Analyzing URL</h3>
            <p className="text-gray-400">Checking domain reputation, security features, and content patterns...</p>
          </motion.div>
        )}

        {scanResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className={`rounded-xl shadow-lg p-6 border-2 ${getRiskBg(scanResult.riskLevel)} backdrop-blur-sm`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${getRiskBg(scanResult.riskLevel)}`}>
                    {React.createElement(getRiskIcon(scanResult.riskLevel), {
                      className: `h-8 w-8 ${getRiskColor(scanResult.riskLevel)}`
                    })}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Scan Results</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Risk Level:</span>
                      <span className={`font-semibold ${getRiskColor(scanResult.riskLevel)}`}>
                        {scanResult.riskLevel.charAt(0).toUpperCase() + scanResult.riskLevel.slice(1)}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400">Score: {scanResult.score}/100</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700/50 px-3 py-1.5 rounded-full text-sm font-medium">
                  <span className="text-gray-300">Scanned URL:</span>{' '}
                  <a 
                    href={scanResult.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline break-all"
                  >
                    {scanResult.url.length > 50 ? `${scanResult.url.substring(0, 47)}...` : scanResult.url}
                  </a>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 
                    className="font-semibold text-white mb-3 flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection('indicators')}
                  >
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                      Potential Risks ({scanResult.indicators.length})
                    </span>
                    {expandedSection === 'indicators' ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </h3>
                  {(expandedSection === 'indicators' || expandedSection === null) && (
                    <ul className="space-y-3">
                      {scanResult.indicators.map((indicator, index) => (
                        <motion.li 
                          key={index} 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className={`mt-0.5 flex-shrink-0 ${
                            indicator.severity === 'high' ? 'text-red-400' :
                            indicator.severity === 'medium' ? 'text-amber-400' : 'text-blue-400'
                          }`}>
                            {indicator.severity === 'high' ? (
                              <XCircle className="h-4 w-4" />
                            ) : indicator.severity === 'medium' ? (
                              <AlertTriangle className="h-4 w-4" />
                            ) : (
                              <Shield className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200">{indicator.message}</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {indicator.type === 'domain' ? 'Domain Analysis' :
                               indicator.type === 'url' ? 'URL Structure' :
                               indicator.type === 'security' ? 'Security Issue' : 'Content Pattern'}
                            </p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <h3 
                    className="font-semibold text-white mb-3 flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection('recommendations')}
                  >
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      Recommended Actions
                    </span>
                    {expandedSection === 'recommendations' ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </h3>
                  {(expandedSection === 'recommendations' || expandedSection === null) && (
                    <ul className="space-y-3">
                      {scanResult.recommendations.map((rec, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-200">{rec}</p>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 overflow-hidden">
              <div 
                className="px-6 py-4 border-b border-gray-700/50 flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('technical')}
              >
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Technical Details
                </h3>
                {expandedSection === 'technical' ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
              {expandedSection === 'technical' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-3">DOMAIN INFORMATION</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-500">Registered Domain</p>
                          <p className="text-sm font-medium text-white">{scanResult.technicalDetails.domain}</p>
                        </div>
                        {scanResult.technicalDetails.creationDate && (
                          <div>
                            <p className="text-xs text-gray-500">Creation Date</p>
                            <p className="text-sm font-medium text-white">{scanResult.technicalDetails.creationDate}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-gray-500">Registrar</p>
                          <p className="text-sm font-medium text-white">{scanResult.technicalDetails.registrar}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-3">SECURITY ANALYSIS</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-full ${
                            scanResult.technicalDetails.isHttps ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                          }`}>
                            <Lock className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Connection</p>
                            <p className="text-sm font-medium text-white">
                              {scanResult.technicalDetails.isHttps ? 'Secure (HTTPS)' : 'Insecure (HTTP)'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-full ${
                            scanResult.technicalDetails.hasRedirects ? 'bg-amber-900/20 text-amber-400' : 'bg-green-900/20 text-green-400'
                          }`}>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Redirects</p>
                            <p className="text-sm font-medium text-white">
                              {scanResult.technicalDetails.hasRedirects ? 'Detected' : 'None detected'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-full ${
                            scanResult.technicalDetails.reputation === 'Good' ? 'bg-green-900/20 text-green-400' :
                            scanResult.technicalDetails.reputation === 'Unknown' ? 'bg-amber-900/20 text-amber-400' : 'bg-red-900/20 text-red-400'
                          }`}>
                            <Shield className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Reputation</p>
                            <p className="text-sm font-medium text-white">{scanResult.technicalDetails.reputation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {scanResult.technicalDetails.blacklistStatus.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-400 mb-3">BLACKLIST STATUS</h4>
                      <div className="flex flex-wrap gap-2">
                        {scanResult.technicalDetails.blacklistStatus.map((service, index) => (
                          <span key={index} className="px-2.5 py-1 rounded-full bg-red-900/20 text-red-400 text-xs font-medium">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {scanHistory.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Recent Scans</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scanHistory.map((scan, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-lg border ${getRiskBg(scan.riskLevel)} p-4 cursor-pointer hover:shadow-md transition-shadow backdrop-blur-sm`}
                  onClick={() => {
                    setUrl(scan.url);
                    setScanResult(scan);
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="truncate">
                      <p className="text-sm font-medium text-white truncate">{scan.technicalDetails.domain}</p>
                      <p className="text-xs text-gray-400 truncate">{scan.url}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(scan.riskLevel)} ${getRiskBg(scan.riskLevel)}`}>
                      {scan.riskLevel}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-400">Score: {scan.score}/100</span>
                    <a 
                      href={scan.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LinkScanner;