import React, { useState, useEffect } from 'react';
import { Mail, Scan, AlertTriangle, CheckCircle, XCircle, Info, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScanResult {
  riskLevel: 'safe' | 'suspicious' | 'dangerous';
  score: number;
  indicators: { text: string; severity: 'low' | 'medium' | 'high' }[];
  recommendations: string[];
  senderAnalysis?: {
    domainMatch: boolean;
    displayNameVsEmail?: string;
  };
}

const EmailScanner: React.FC = () => {
  const [emailContent, setEmailContent] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [displayScore, setDisplayScore] = useState(0);

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

  useEffect(() => {
    if (scanResult) {
      let start = 0;
      const interval = setInterval(() => {
        start += 1;
        if (start >= scanResult.score) {
          start = scanResult.score;
          clearInterval(interval);
        }
        setDisplayScore(start);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [scanResult]);

  const analyzeEmail = (content: string): ScanResult => {
    const indicators: { text: string; severity: 'low' | 'medium' | 'high' }[] = [];
    const recommendations: string[] = [];
    let score = 0;

    // Enhanced detection patterns with severity levels
    const detectionPatterns = [
      // High severity patterns
      { 
        pattern: /(?:https?:\/\/)?(?:www\.)?(?!scansafe\.com|trusteddomain\.org)([^\/\s]+)/i, 
        message: "Link to untrusted domain", 
        severity: 'high' as const,
        score: 30 
      },
      { 
        pattern: /(From|Reply-To):.*@([^\s]+).*(From|Reply-To):.*@(?!\2)[^\s]+/i, 
        message: "Sender/Reply-To address mismatch", 
        severity: 'high' as const,
        score: 40 
      },
      { 
        pattern: /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)|<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\3[^>]*>(.*?)<\/a>/gi, 
        message: "Hidden link detected (text doesn't match URL)", 
        severity: 'high' as const,
        score: 35 
      },
      
      // Medium severity patterns
      { 
        pattern: /urgent|immediate|act now|within \d+ (hours?|minutes?)/i, 
        message: "Urgency/scarcity tactics", 
        severity: 'medium' as const,
        score: 25 
      },
      { 
        pattern: /click (here|now)|verify (account|details)|update (info|billing)/i, 
        message: "Suspicious call-to-action", 
        severity: 'medium' as const,
        score: 20 
      },
      { 
        pattern: /(account (suspended|locked)|security alert|unauthorized access)/i, 
        message: "Account threat language", 
        severity: 'medium' as const,
        score: 25 
      },
      
      // Low severity patterns
      { 
        pattern: /dear (customer|user|valued (member|client)|hello friend)/i, 
        message: "Generic/impersonal greeting", 
        severity: 'low' as const,
        score: 15 
      },
      { 
        pattern: /(recieve|occured|seperate|definately|accomodate)/i, 
        message: "Common misspellings", 
        severity: 'low' as const,
        score: 10 
      },
      { 
        pattern: /(congratulations|you('ve| have) (won|been selected)|free (gift|prize))/i, 
        message: "Too-good-to-be-true offers", 
        severity: 'low' as const,
        score: 15 
      }
    ];

    // Sender analysis
    const senderMatch = content.match(/From:\s*"?(.*?)"?\s*<([^>]+)>/i);
    const senderAnalysis = {
      domainMatch: false,
      displayNameVsEmail: undefined as string | undefined
    };

    if (senderMatch) {
      const displayName = senderMatch[1];
      const email = senderMatch[2];
      const domain = email.split('@')[1];
      
      // Check if display name matches email domain
      if (displayName && domain && !displayName.toLowerCase().includes(domain.split('.')[0])) {
        senderAnalysis.displayNameVsEmail = `Display name "${displayName}" doesn't match email domain`;
        score += 20;
      }
    }

    // Check all patterns
    detectionPatterns.forEach(({ pattern, message, severity, score: patternScore }) => {
      const matches = content.match(pattern) || [];
      if (matches.length > 0) {
        indicators.push({ 
          text: `${message} (${matches.length} instance${matches.length > 1 ? 's' : ''})`,
          severity
        });
        score += matches.length * patternScore;
      }
    });

    // Attachment analysis
    const attachmentPattern = /(attachment|file|document|invoice)\s*:\s*(.*?\.(pdf|docx?|xlsx?|zip|exe))/gi;
    const attachments = [...content.matchAll(attachmentPattern)];
    if (attachments.length > 0) {
      indicators.push({
        text: `Contains ${attachments.length} suspicious attachment${attachments.length > 1 ? 's' : ''}`,
        severity: 'high' as const
      });
      score += attachments.length * 30;
    }

    // Determine risk level
    let riskLevel: 'safe' | 'suspicious' | 'dangerous';
    if (score >= 70) {
      riskLevel = 'dangerous';
      recommendations.push(
        "❌ Do NOT click any links or download attachments",
        "⚠️ Report this email as phishing to your email provider",
        "🗑️ Delete this email immediately",
        "🌐 If concerned about your account, visit the official website directly (don't use links from the email)"
      );
    } else if (score >= 40) {
      riskLevel = 'suspicious';
      recommendations.push(
        "🔍 Verify sender identity through official channels",
        "🖱️ Hover over links to check destinations before clicking",
        "📞 Contact the organization directly using known contact information",
        "🚫 Don't provide personal information via email"
      );
    } else {
      riskLevel = 'safe';
      recommendations.push(
        "✅ Email appears legitimate but remain vigilant",
        "🔒 Always verify unexpected requests for information",
        "🔄 Keep your security software updated"
      );
    }

    return { 
      riskLevel, 
      score: Math.min(score, 100), 
      indicators, 
      recommendations,
      senderAnalysis 
    };
  };

  const handleScan = async () => {
    if (!emailContent.trim()) return;
    
    setIsScanning(true);
    setScanResult(null);
    setDisplayScore(0);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = analyzeEmail(emailContent);
    setScanResult(result);
    setIsScanning(false);
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-amber-400';
      case 'low': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getSeverityIcon = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high': return XCircle;
      case 'medium': return AlertTriangle;
      case 'low': return Info;
      default: return Info;
    }
  };

  const getRiskColor = (level: 'safe' | 'suspicious' | 'dangerous') => {
    switch (level) {
      case 'safe': return 'text-green-400';
      case 'suspicious': return 'text-amber-400';
      case 'dangerous': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRiskBgColor = (level: 'safe' | 'suspicious' | 'dangerous') => {
    switch (level) {
      case 'safe': return 'bg-green-500';
      case 'suspicious': return 'bg-amber-500';
      case 'dangerous': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskBg = (level: 'safe' | 'suspicious' | 'dangerous') => {
    switch (level) {
      case 'safe': return 'bg-green-900/20 border-green-400/20';
      case 'suspicious': return 'bg-amber-900/20 border-amber-400/20';
      case 'dangerous': return 'bg-red-900/20 border-red-400/20';
      default: return 'bg-gray-900/20 border-gray-400/20';
    }
  };

  const getRiskIcon = (level: 'safe' | 'suspicious' | 'dangerous') => {
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
            <h2 className="text-3xl font-bold text-white mb-4">Phishing Email Analyzer</h2>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <p className="text-lg text-gray-300">
              Detect phishing attempts by analyzing email headers and content for suspicious patterns
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-gray-700/50"
        >
          <div className="mb-6">
            <label htmlFor="email-content" className="block text-sm font-medium text-gray-300 mb-2">
              Paste Email Content (Headers + Body)
            </label>
            <textarea
              id="email-content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              rows={12}
              className="w-full px-3 py-2 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400 font-mono text-sm"
              placeholder={`Example:\nFrom: "Amazon Support" <support@amaz0n-security.com>\nSubject: Urgent: Your account has been locked\n\nDear Customer,\nYour account has been suspended due to suspicious activity. Click here to verify your identity: http://amzn-verify.com/account...`}
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
                  <ShieldAlert className="h-5 w-5" />
                  Scan for Phishing
                </>
              )}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {isScanning && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
              <p className="text-gray-400">Checking for phishing indicators, suspicious links, and sender verification...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {scanResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`rounded-xl shadow-lg p-6 border-2 ${getRiskBg(scanResult.riskLevel)} backdrop-blur-sm`}
            >
              <div className="flex items-center gap-3 mb-6">
                {React.createElement(getRiskIcon(scanResult.riskLevel), {
                  className: `h-8 w-8 ${getRiskColor(scanResult.riskLevel)}`
                })}
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Risk Assessment:{" "}
                    <span className={getRiskColor(scanResult.riskLevel)}>
                      {scanResult.riskLevel.charAt(0).toUpperCase() + scanResult.riskLevel.slice(1)}
                    </span>
                  </h3>
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2 overflow-hidden">
                    <motion.div
                      className={`h-2.5 rounded-full ${getRiskBgColor(scanResult.riskLevel)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${scanResult.score}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-gray-300 mt-2">
                    Detection Score: {displayScore}/100
                  </p>
                </div>
              </div>

              {scanResult.senderAnalysis?.displayNameVsEmail && (
                <div className="mb-6 p-3 bg-amber-900/20 border border-amber-400/20 rounded-lg">
                  <div className="flex items-center gap-2 text-amber-400">
                    <AlertTriangle className="h-4 w-4" />
                    <h4 className="font-medium text-sm">{scanResult.senderAnalysis.displayNameVsEmail}</h4>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4" />
                    Suspicious Indicators
                  </h4>
                  {scanResult.indicators.length > 0 ? (
                    <ul className="space-y-3">
                      {scanResult.indicators.map((indicator, index) => (
                        <motion.li 
                          key={index} 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2"
                        >
                          {React.createElement(getSeverityIcon(indicator.severity), {
                            className: `h-4 w-4 mt-0.5 flex-shrink-0 ${getSeverityColor(indicator.severity)}`
                          })}
                          <span className={`text-sm ${indicator.severity === 'high' ? 'text-red-300' : 'text-gray-300'}`}>
                            {indicator.text}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <p className="text-sm">No suspicious indicators detected</p>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Recommended Actions
                  </h4>
                  <ul className="space-y-3">
                    {scanResult.recommendations.map((rec, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        {rec.startsWith('❌') ? (
                          <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        ) : rec.startsWith('⚠️') ? (
                          <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        )}
                        <span className="text-sm text-gray-300">{rec.replace(/^[^\s]+\s/, '')}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {scanResult.riskLevel === 'dangerous' && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-6 p-4 bg-red-900/30 border border-red-400/30 rounded-lg"
                >
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle className="h-5 w-5" />
                    <h4 className="font-semibold">🚨 High Risk Phishing Alert</h4>
                  </div>
                  <p className="text-sm text-red-300 mt-2">
                    This email exhibits multiple characteristics of sophisticated phishing attempts. 
                    Interacting with this email could compromise your personal information or infect 
                    your device with malware.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EmailScanner;