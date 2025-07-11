import React, { useState } from 'react';
import { Mail, Scan, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScanResult {
  riskLevel: 'safe' | 'suspicious' | 'dangerous';
  score: number;
  indicators: string[];
  recommendations: string[];
}

const EmailScanner: React.FC = () => {
  const [emailContent, setEmailContent] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

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

  const analyzeEmail = (content: string): ScanResult => {
    const indicators: string[] = [];
    const recommendations: string[] = [];
    let score = 0;

    // Enhanced suspicious patterns with individual scoring
    const suspiciousPatterns = [
      { pattern: /urgent|immediate|act now|limited time|action required|within \d+ hours/i, message: "Urgency tactics detected", score: 25 },
      { pattern: /click here|verify (account|identity)|secure (account|access)|login now|update now/i, message: "Suspicious call-to-action phrases", score: 30 },
      { pattern: /congratulations|you('ve| have) won|lottery|prize|reward/i, message: "Prize/lottery scam indicators", score: 20 },
      { pattern: /suspended|compromised|violation|security alert|unusual activity/i, message: "Account threat language", score: 25 },
      { pattern: /bitcoin|cryptocurrency|investment opportunity|payment required/i, message: "Financial scam keywords", score: 20 },
      { pattern: /dear (customer|user|valued (member|client))|hello friend/i, message: "Generic/impersonal greeting", score: 15 },
      { pattern: /support@.*fake\.com|noreply@.*suspect\.org/i, message: "Suspicious sender email", score: 40 },
      { pattern: /(?!scansafe\.com)\bscansafe-[a-z]+\.com\b/i, message: "Spoofed domain detected", score: 50 },
      { pattern: /(?:[0-9]{1,3}\.){3}[0-9]{1,3}/, message: "IP address mentioned in email", score: 20 },
      { pattern: /(?:https?:\/\/)?(?:www\.)?([^\/\s]+)\/[^\s]*/i, message: "URL with potential domain mismatch", score: 30 }
    ];

    // URL analysis
    const urlPattern = /(?:https?:\/\/)?(?:www\.)?([^\/\s]+)\/[^\s]*/gi;
    const urls = content.match(urlPattern) || [];
    
    if (urls.length > 0) {
      indicators.push(`Contains ${urls.length} link(s) - always verify before clicking`);
      score += urls.length * 15;

      // Check for suspicious domains
      const suspiciousDomains = urls.filter(url => {
        const domain = url.match(/(?:https?:\/\/)?(?:www\.)?([^\/\s]+)/i)?.[1];
        return domain && !/scansafe\.com|trusteddomain\.org/i.test(domain);
      });

      if (suspiciousDomains.length > 0) {
        indicators.push(`Suspicious domains detected: ${suspiciousDomains.join(', ')}`);
        score += suspiciousDomains.length * 25;
      }
    }

    // Hidden link detection
    const hiddenLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)|<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>(.*?)<\/a>/gi;
    const hiddenLinks = [...content.matchAll(hiddenLinkPattern)];
    
    hiddenLinks.forEach(link => {
      const displayText = link[1] || link[5];
      const url = link[2] || link[4];
      if (url && displayText && !displayText.includes(url)) {
        indicators.push(`Hidden link detected: "${displayText}" points to "${url}"`);
        score += 35;
      }
    });

    // Check patterns with individual scoring
    suspiciousPatterns.forEach(({ pattern, message, score: patternScore }) => {
      if (pattern.test(content)) {
        indicators.push(message);
        score += patternScore;
      }
    });

    // Grammar/spelling check
    const commonMisspellings = [
      'recieve', 'occured', 'seperate', 'definately', 'accomodate',
      'wich', 'teh', 'adress', 'allready', 'untill'
    ];
    const grammarPattern = new RegExp(`\\b(${commonMisspellings.join('|')})\\b`, 'gi');
    const grammarIssues = content.match(grammarPattern);
    
    if (grammarIssues && grammarIssues.length > 0) {
      indicators.push(`Grammar/spelling errors detected (${grammarIssues.length} instances)`);
      score += grammarIssues.length * 10;
    }

    // Sender analysis
    const senderReplyMismatch = /From:.*@([^\s]+).*Reply-To:.*@(?!\1)[^\s]+/i.test(content);
    if (senderReplyMismatch) {
      indicators.push("Sender and Reply-To address mismatch");
      score += 30;
    }

    // Determine risk level
    let riskLevel: 'safe' | 'suspicious' | 'dangerous';
    if (score >= 75) {
      riskLevel = 'dangerous';
      recommendations.push("Do not click any links or download attachments");
      recommendations.push("Report this email as phishing to your email provider");
      recommendations.push("Delete this email immediately");
      recommendations.push("If concerned about your account, visit the official website directly");
    } else if (score >= 40) {
      riskLevel = 'suspicious';
      recommendations.push("Exercise extreme caution with this email");
      recommendations.push("Verify sender identity through official channels");
      recommendations.push("Hover over links to check destinations before clicking");
      recommendations.push("Contact the organization directly using known contact information");
    } else {
      riskLevel = 'safe';
      recommendations.push("Email appears legitimate but remain vigilant");
      recommendations.push("Always verify unexpected requests for information");
      recommendations.push("Keep your security software updated");
    }

    return { riskLevel, score: Math.min(score, 100), indicators, recommendations };
  };

  const handleScan = async () => {
    if (!emailContent.trim()) return;
    
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = analyzeEmail(emailContent);
    setScanResult(result);
    setIsScanning(false);
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
      default: return Info;
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-20">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-500 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-indigo-500 blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUp}>
            <Mail className="h-16 w-16 text-blue-400 mx-auto mb-4" />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-white mb-4">Advanced Email Scanner</h2>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <p className="text-lg text-gray-300">
              Detect phishing attempts by analyzing email content for suspicious patterns
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-gray-700/50"
        >
          <div className="mb-6">
            <label htmlFor="email-content" className="block text-sm font-medium text-gray-300 mb-2">
              Email Content
            </label>
            <textarea
              id="email-content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              rows={12}
              className="w-full px-3 py-2 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400"
              placeholder="Paste the email content here..."
            />
          </div>
          
          <motion.button
            onClick={handleScan}
            disabled={!emailContent.trim() || isScanning}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isScanning ? (
                <>
                  <Scan className="h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Scan className="h-5 w-5" />
                  Scan Email
                </>
              )}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
        </motion.div>

        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center border border-gray-700/50"
          >
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-400/20 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-400 rounded-full animate-ping opacity-75"></div>
                <Scan className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-400 animate-pulse" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Analyzing Email</h3>
            <p className="text-gray-400">Scanning for phishing indicators and suspicious patterns...</p>
          </motion.div>
        )}

        {scanResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-xl shadow-lg p-6 border-2 ${getRiskBg(scanResult.riskLevel)} backdrop-blur-sm`}
          >
            <div className="flex items-center gap-3 mb-6">
              {React.createElement(getRiskIcon(scanResult.riskLevel), {
                className: `h-8 w-8 ${getRiskColor(scanResult.riskLevel)}`
              })}
              <div>
                <h3 className="text-xl font-bold text-white">
                  Risk Level: <span className={getRiskColor(scanResult.riskLevel)}>
                    {scanResult.riskLevel.charAt(0).toUpperCase() + scanResult.riskLevel.slice(1)}
                  </span>
                </h3>
                <p className="text-gray-400">Detection Score: {scanResult.score}/100</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Suspicious Indicators</h4>
                {scanResult.indicators.length > 0 ? (
                  <ul className="space-y-2">
                    {scanResult.indicators.map((indicator, index) => (
                      <motion.li 
                        key={index} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{indicator}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">No suspicious indicators detected</p>
                )}
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Recommended Actions</h4>
                <ul className="space-y-2">
                  {scanResult.recommendations.map((rec, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{rec}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {scanResult.riskLevel === 'dangerous' && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-6 p-4 bg-red-900/20 border border-red-400/20 rounded-lg"
              >
                <div className="flex items-center gap-2 text-red-400">
                  <XCircle className="h-5 w-5" />
                  <h4 className="font-semibold">High Risk Warning</h4>
                </div>
                <p className="text-sm text-red-400 mt-1">
                  This email exhibits multiple characteristics of phishing attempts. 
                  Do not interact with any links or attachments.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EmailScanner;