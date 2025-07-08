import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '/logo.png';
import icon from '/icon.svg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src={logo}
                alt="ScanSAfe Logo"
                className="h-24 w-auto" // Adjust height as needed (width auto maintains aspect ratio)
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Protecting users from phishing attacks with advanced AI technology. 
              Stay safe online with our comprehensive security scanning tools.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Phone className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <MapPin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Email Scanner</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Link Scanner</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Learn</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Report Phishing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 ScanSAfe. All rights reserved. | Protecting users from cyber threats worldwide.
          </p>
          <div className="flex justify-center mt-4">
            <img 
              src={icon}
              alt="Icon"
              className="h-10 w-auto" // Adjust height as needed
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;