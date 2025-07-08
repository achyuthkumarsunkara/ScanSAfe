import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EmailScanner from './components/EmailScanner';
import LinkScanner from './components/LinkScanner';
import EducationalContent from './components/EducationalContent';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'email':
        return <EmailScanner />;
      case 'link':
        return <LinkScanner />;
      case 'learn':
        return <EducationalContent />;
      default:
        return <Hero setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
