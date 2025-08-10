import React from 'react';

interface AdErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface AdErrorBoundaryState {
  hasError: boolean;
}

class AdErrorBoundary extends React.Component<AdErrorBoundaryProps, AdErrorBoundaryState> {
  constructor(props: AdErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): AdErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Ad Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="ad-error p-4 bg-gray-800 text-center text-gray-400 rounded-lg">
          Advertisement could not be loaded
        </div>
      );
    }
    return this.props.children;
  }
}

export default AdErrorBoundary;