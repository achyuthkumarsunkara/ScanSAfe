import React from 'react';
import logo from '/logo.png';
import icon from '/icon.svg';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Email Scanner', url: '#email' },
    { name: 'Link Scanner', url: '#link' },
    { name: 'Learn', url: '#learn' },
    { name: 'Report Phishing', url: '#report' }
  ];

  const supportLinks = [
    { name: 'Help Center', url: '#help' },
    { name: 'Privacy Policy', url: '#privacy' },
    { name: 'Terms of Service', url: '#terms' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src={logo}
                alt="ScanSAfe Logo"
                className="h-20 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-md text-lg">
              Protecting users from phishing attacks with advanced AI technology. 
              Stay safe online with our comprehensive security scanning tools.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-lg"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-lg"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-lg">
            © {new Date().getFullYear()} ScanSAfe. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <img 
              src={icon}
              alt="ScanSAfe Icon"
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;