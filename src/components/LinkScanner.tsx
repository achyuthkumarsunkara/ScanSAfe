import React, { useState } from 'react';
import { Link, Scan, AlertTriangle, CheckCircle, XCircle, Globe } from 'lucide-react';

interface LinkScanResult {
  url: string;
  riskLevel: 'safe' | 'suspicious' | 'dangerous';
  score: number;
  indicators: string[];
  recommendations: string[];
  details: {
    domain: string;
    isHttps: boolean;
    hasRedirects: boolean;
    reputation: string;
  };
}

const LinkScanner: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<LinkScanResult | null>(null);

  const analyzeLink = (inputUrl: string): LinkScanResult => {
    const indicators: string[] = [];
    const recommendations: string[] = [];
    let score = 0;

    try {
      const urlObj = new URL(inputUrl);
      const domain = urlObj.hostname;
      
      // Check for suspicious domain patterns
      const suspiciousDomains = [
        'bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly', 'is.gd',
        'paypal-security.com', 'amazon-update.com', 'microsoft-support.net',
        'google-verify.com', 'facebook-security.net'
      ];

      const suspiciousPatterns = [
        { pattern: /[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/, message: "Direct IP address used" },
        { pattern: /[.-](?:paypal|amazon|microsoft|google|facebook|apple)[.-]/i, message: "Suspicious brand impersonation" },
        { pattern: /urgent|verify|suspend|update|secure/i, message: "Suspicious URL keywords" },
        { pattern: /[0-9]{4,}/, message: "Unusual number sequence in URL" },
        { pattern: /[a-z]\.tk$|\.ml$|\.ga$|\.cf$/i, message: "Suspicious free domain extension" },
      ];

      // Check if it's a URL shortener
      if (suspiciousDomains.includes(domain)) {
        indicators.push("URL shortener detected");
        score += 30;
      }

      // Check for HTTPS
      const isHttps = urlObj.protocol === 'https:';
      if (!isHttps) {
        indicators.push("Insecure HTTP connection");
        score += 25;
      }

      // Check suspicious patterns
      suspiciousPatterns.forEach(({ pattern, message }) => {
        if (pattern.test(inputUrl)) {
          indicators.push(message);
          score += 20;
        }
      });

      // Check for multiple subdomains
      const subdomains = domain.split('.');
      if (subdomains.length > 3) {
        indicators.push("Multiple subdomains detected");
        score += 15;
      }

      // Check for homograph attacks (basic check)
      const homographChars = /[а-я]|[αβγδεζηθικλμνξοπρστυφχψω]/i;
      if (homographChars.test(domain)) {
        indicators.push("Possible homograph attack");
        score += 40;
      }

      // Determine risk level
      let riskLevel: 'safe' | 'suspicious' | 'dangerous';
      if (score >= 60) {
        riskLevel = 'dangerous';
        recommendations.push("Do not visit this link");
        recommendations.push("Block this domain in your security software");
        recommendations.push("Report this link as malicious");
      } else if (score >= 30) {
        riskLevel = 'suspicious';
        recommendations.push("Exercise extreme caution");
        recommendations.push("Verify the link source independently");
        recommendations.push("Consider using a sandbox environment");
      } else {
        riskLevel = 'safe';
        recommendations.push("Link appears legitimate");
        recommendations.push("Continue to practice safe browsing habits");
      }

      return {
        url: inputUrl,
        riskLevel,
        score,
        indicators,
        recommendations,
        details: {
          domain,
          isHttps,
          hasRedirects: Math.random() > 0.7, // Simulated
          reputation: score < 30 ? 'Good' : score < 60 ? 'Unknown' : 'Poor'
        }
      };
    } catch (error) {
      return {
        url: inputUrl,
        riskLevel: 'dangerous',
        score: 100,
        indicators: ['Invalid URL format'],
        recommendations: ['Enter a valid URL'],
        details: {
          domain: 'Invalid',
          isHttps: false,
          hasRedirects: false,
          reputation: 'Unknown'
        }
      };
    }
  };

  const handleScan = async () => {
    if (!url.trim()) return;
    
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = analyzeLink(url);
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
      default: return Globe;
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Link className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Link Scanner</h2>
          <p className="text-lg text-gray-600">
            Enter a URL to check for suspicious patterns and potential phishing attempts
          </p>
        </div>

        <div className="card mb-8">
          <div className="mb-6">
            <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2">
              URL to Scan
            </label>
            <input
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>
          
          <button
            onClick={handleScan}
            disabled={!url.trim() || isScanning}
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isScanning ? (
              <>
                <Scan className="h-5 w-5 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Scan className="h-5 w-5" />
                Scan Link
              </>
            )}
          </button>
        </div>

        {isScanning && (
          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full pulse-ring"></div>
                <Globe className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-600 scan-animation" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Link</h3>
            <p className="text-gray-600">Checking for malicious patterns and reputation...</p>
          </div>
        )}

        {scanResult && (
          <div className={`card border-2 ${getRiskBg(scanResult.riskLevel)}`}>
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
                <p className="text-gray-600">Risk Score: {scanResult.score}/100</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Link Details</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded-lg border">
                  <div className="text-sm text-gray-600">Domain</div>
                  <div className="font-medium text-gray-900 truncate">{scanResult.details.domain}</div>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <div className="text-sm text-gray-600">Security</div>
                  <div className={`font-medium ${scanResult.details.isHttps ? 'text-green-600' : 'text-red-600'}`}>
                    {scanResult.details.isHttps ? 'HTTPS' : 'HTTP'}
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <div className="text-sm text-gray-600">Redirects</div>
                  <div className={`font-medium ${scanResult.details.hasRedirects ? 'text-amber-600' : 'text-green-600'}`}>
                    {scanResult.details.hasRedirects ? 'Yes' : 'No'}
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <div className="text-sm text-gray-600">Reputation</div>
                  <div className={`font-medium ${
                    scanResult.details.reputation === 'Good' ? 'text-green-600' : 
                    scanResult.details.reputation === 'Unknown' ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {scanResult.details.reputation}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Indicators Found</h4>
                <ul className="space-y-2">
                  {scanResult.indicators.map((indicator, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{indicator}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
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
          </div>
        )}
      </div>
    </section>
  );
};

export default LinkScanner;