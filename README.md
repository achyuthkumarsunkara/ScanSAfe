# ScanSafe - Phishing Detection Platform

![ScanSafe](https://img.shields.io/badge/ScanSafe-Phishing%20Detection-blue)

A comprehensive web application for detecting and educating about phishing threats. ScanSafe provides real-time analysis of emails and URLs to identify potential phishing attempts and security risks.

## 🚀 Features

### 🔍 Email Scanner
- **Real-time Analysis**: Scan email content for phishing indicators
- **Risk Assessment**: Categorize threats as Safe, Suspicious, or Dangerous
- **Pattern Detection**: Identify common phishing tactics and red flags
- **Sender Verification**: Analyze sender information for inconsistencies
- **Actionable Recommendations**: Get specific guidance based on threat level

### 🌐 Link Scanner
- **URL Analysis**: Deep scan of website URLs for security risks
- **Domain Reputation**: Check domain age, registrar, and reputation
- **Technical Security**: Verify HTTPS, redirects, and security features
- **Content Pattern Recognition**: Detect suspicious keywords and patterns
- **Blacklist Checking**: Cross-reference with known malicious sites

### 📚 Educational Content
- **Phishing Types**: Learn about different phishing techniques
- **Warning Signs**: Recognize common indicators of phishing attempts
- **Best Practices**: Implement security measures to stay protected
- **Interactive Learning**: Engaging, animated educational components

## 🛠 Tech Stack

- **Frontend**: React 18.2.0 with TypeScript
- **Framework**: Next.js 14.0
- **Animation**: Framer Motion for smooth interactions
- **Styling**: Tailwind CSS for modern, responsive design
- **Icons**: Lucide React for consistent iconography
- **Ads**: Google AdSense integration ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/scansafe.git
   cd scansafe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   # For AdSense (optional)
   NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=your-publisher-id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
scansafe/
├── components/
│   ├── EducationalContent.tsx    # Phishing education section
│   ├── EmailScanner.tsx          # Email analysis component
│   └── LinkScanner.tsx           # URL analysis component
├── pages/
│   ├── index.tsx                 # Main application page
│   ├── email-scanner.tsx         # Email scanner page
│   └── link-scanner.tsx          # Link scanner page
├── styles/
│   └── globals.css               # Global styles
├── public/                       # Static assets
└── package.json
```

## 🎯 Usage

### Email Scanning
1. Navigate to the Email Scanner
2. Paste the full email content (headers + body)
3. Click "Scan for Phishing"
4. Review the risk assessment and recommendations

### Link Scanning
1. Go to the Link Scanner
2. Enter the URL to analyze
3. Click "Scan URL"
4. Examine the detailed security report

### Learning Resources
- Browse the Educational Content section
- Learn about different phishing types
- Understand warning signs and best practices

## 🔧 Configuration

### AdSense Integration
To enable AdSense ads, update the publisher ID in the components:

```typescript
// In LinkScanner.tsx and other components
data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
```

### Custom Detection Rules
Modify the detection patterns in the scanner components:

```typescript
// Example: Add custom phishing patterns
const customPatterns = [
  { 
    pattern: /your-custom-pattern/i, 
    message: "Custom threat detected", 
    severity: 'high' as const,
    score: 25 
  }
];
```

## 📊 Detection Capabilities

### Email Scanner Detects:
- ✅ Suspicious sender addresses
- ✅ Urgency/scarcity language
- ✅ Hidden or mismatched links
- ✅ Attachment risks
- ✅ Grammar and spelling issues
- ✅ Generic greetings
- ✅ Too-good-to-be-true offers

### Link Scanner Analyzes:
- ✅ Domain reputation and age
- ✅ HTTPS security
- ✅ Suspicious TLDs
- ✅ URL structure anomalies
- ✅ Content patterns
- ✅ Redirect chains
- ✅ Blacklist status

## 🛡 Security Features

- **Client-side Processing**: All analysis happens in the browser
- **No Data Storage**: Emails and URLs are not stored on servers
- **Real-time Validation**: Immediate feedback and risk scoring
- **Comprehensive Reporting**: Detailed breakdown of security findings

## 🎨 UI/UX Features

- **Responsive Design**: Works on all device sizes
- **Dark Theme**: Easy on the eyes with modern aesthetics
- **Smooth Animations**: Enhanced user experience with Framer Motion
- **Progress Indicators**: Real-time scanning feedback
- **Interactive Elements**: Hover effects and engaging components

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

ScanSafe is designed for educational and preventive purposes. While it uses advanced detection algorithms, no phishing detection system is 100% accurate. Always exercise caution and follow security best practices when dealing with suspicious emails and links.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/achyuthkumarsunkara/scansafe/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔄 Updates

Stay tuned for regular updates including:
- Enhanced detection algorithms
- Additional phishing techniques
- Improved user interface
- Mobile app development
- API access for developers

---

**Stay Safe, Stay Secure with ScanSafe!** 🔒
