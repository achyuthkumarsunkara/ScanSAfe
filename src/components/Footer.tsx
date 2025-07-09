import React from 'react';
import logo from '/logo.png';
import icon from '/icon.svg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-10">
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
            <h3 className="text-lg font-semibold text-white mb-6">About Phishing</h3>
            <p className="text-gray-400 text-lg">
              <b>Phishing attacks</b> are deceptive attempts by cybercriminals to steal personal or financial information by tricking you through fake emails, messages, or websites. 
              These attacks often look real but contain malicious links designed to capture your data. 
              With <b>ScanSAfe</b>, you can quickly scan suspicious emails and links to detect potential threats and stay safe online — before it’s too late.
            </p>
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
              className="h-14 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;