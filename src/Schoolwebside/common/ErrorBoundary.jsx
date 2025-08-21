import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    this.setState({ error, errorInfo });
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo);
  }

  handleReload = () => {
    // A simple reload to recover from unexpected errors
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
          <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-semibold text-red-600 mb-2">Something went wrong</h2>
            <p className="text-sm text-gray-600 mb-4">An unexpected error occurred while rendering the application.</p>
            <details className="text-xs text-left mb-4 whitespace-pre-wrap text-gray-700">
              {this.state.error && String(this.state.error)}
              {this.state.errorInfo && '\n' + JSON.stringify(this.state.errorInfo)}
            </details>
            <div className="flex justify-center gap-3">
              <button onClick={this.handleReload} className="px-4 py-2 bg-blue-600 text-white rounded-md">Reload</button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
