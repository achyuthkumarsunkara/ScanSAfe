import React, { useState } from 'react';
import { Mail, Scan, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

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
      case 'safe': return 'text-green-600';
      case 'suspicious': return 'text-amber-600';
      case 'dangerous': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskBg = (level: string) => {
    switch (level) {
      case 'safe': return 'bg-green-50 border-green-200';
      case 'suspicious': return 'bg-amber-50 border-amber-200';
      case 'dangerous': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Mail className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Email Scanner</h2>
          <p className="text-lg text-gray-600">
            Detect phishing attempts by analyzing email content for suspicious patterns
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="mb-6">
            <label htmlFor="email-content" className="block text-sm font-medium text-gray-700 mb-2">
              Email Content
            </label>
            <textarea
              id="email-content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Paste the email content here..."
            />
          </div>
          
          <button
            onClick={handleScan}
            disabled={!emailContent.trim() || isScanning}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
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
          </button>
        </div>

        {isScanning && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full animate-ping opacity-75"></div>
                <Scan className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-600 animate-pulse" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Email</h3>
            <p className="text-gray-600">Scanning for phishing indicators and suspicious patterns...</p>
          </div>
        )}

        {scanResult && (
          <div className={`bg-white rounded-xl shadow-md p-6 border-2 ${getRiskBg(scanResult.riskLevel)}`}>
            <div className="flex items-center gap-3 mb-6">
              {React.createElement(getRiskIcon(scanResult.riskLevel), {
                className: `h-8 w-8 ${getRiskColor(scanResult.riskLevel)}`
              })}
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Risk Level: <span className={getRiskColor(scanResult.riskLevel)}>
                    {scanResult.riskLevel.charAt(0).toUpperCase() + scanResult.riskLevel.slice(1)}
                  </span>
                </h3>
                <p className="text-gray-600">Detection Score: {scanResult.score}/100</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Suspicious Indicators</h4>
                {scanResult.indicators.length > 0 ? (
                  <ul className="space-y-2">
                    {scanResult.indicators.map((indicator, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{indicator}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No suspicious indicators detected</p>
                )}
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Recommended Actions</h4>
                <ul className="space-y-2">
                  {scanResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {scanResult.riskLevel === 'dangerous' && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-600">
                  <XCircle className="h-5 w-5" />
                  <h4 className="font-semibold">High Risk Warning</h4>
                </div>
                <p className="text-sm text-red-600 mt-1">
                  This email exhibits multiple characteristics of phishing attempts. 
                  Do not interact with any links or attachments.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default EmailScanner;