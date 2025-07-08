import React from 'react';
import { BookOpen, Users, Target, Shield, AlertTriangle, Eye } from 'lucide-react';

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

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn About Phishing</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Educate yourself about different types of phishing attacks and how to protect yourself from cyber threats
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Types of Phishing Attacks</h3>
            <div className="space-y-6">
              {phishingTypes.map((type, index) => (
                <div key={index} className="card">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <type.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{type.title}</h4>
                      <p className="text-gray-600 mb-3">{type.description}</p>
                      <ul className="text-sm text-gray-500 space-y-1">
                        {type.examples.map((example, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Warning Signs</h3>
            
            <div className="card mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Email Warning Signs</h4>
              <ul className="space-y-2">
                {warningSignsEmail.map((sign, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h4 className="font-semibold text-gray-900 mb-4">Link Warning Signs</h4>
              <ul className="space-y-2">
                {warningSignsLinks.map((sign, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-green-600" />
            <h3 className="text-2xl font-bold text-gray-900">Best Practices for Protection</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestPractices.map((practice, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">{practice.title}</h4>
                <p className="text-sm text-gray-600">{practice.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationalContent;