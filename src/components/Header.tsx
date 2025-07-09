import React from 'react';
import { Menu, X, Shield, Scan, ChevronLeft } from 'lucide-react';
import logo from '/logo.png';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Home', id: 'home', icon: null },
    { name: 'Email Scanner', id: 'email', icon: <Shield className="w-4 h-4" /> },
    { name: 'Link Scanner', id: 'link', icon: <Scan className="w-4 h-4" /> },
    { name: 'Learn', id: 'learn', icon: null },
  ];

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            {activeSection !== 'home' ? (
              <button
                onClick={() => setActiveSection('home')}
                className="mr-2 flex items-center justify-center p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                aria-label="Back to home"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            ) : null}
            <img 
              src={logo}
              alt="ScanSAfe Logo"
              className="h-24 w-auto transition-transform hover:scale-105"
            />
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gray-800 text-cyan-400 shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.name}
              </button>
            ))}
          </nav>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl mx-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-cyan-500/10 text-cyan-400'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;