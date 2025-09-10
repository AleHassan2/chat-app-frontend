import React from "react";
import { RefreshCw, AlertTriangle } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-wa-light-primary dark:bg-wa-dark-primary flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-wa-light-secondary dark:bg-wa-dark-secondary rounded-lg shadow-lg p-6 text-center">
            {/* Error Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
            </div>

            {/* Error Title */}
            <h1 className="text-xl font-semibold text-wa-light-900 dark:text-wa-light-50 mb-2">
              Oops! Something went wrong
            </h1>

            {/* Error Message */}
            <p className="text-wa-light-600 dark:text-wa-light-400 mb-6">
              We encountered an unexpected error. Please try refreshing the
              page.
            </p>

            {/* Error Details (Development only) */}
            {import.meta.env.NODE_ENV === "development" && this.state.error && (
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 text-left">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                  Error Details:
                </h3>
                <pre className="text-xs text-red-600 dark:text-red-300 whitespace-pre-wrap break-all">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-wa-green-500 hover:bg-wa-green-600 text-white rounded-lg transition-colors duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Page
              </button>

              <button
                onClick={() => {
                  this.setState({
                    hasError: false,
                    error: null,
                    errorInfo: null,
                  });
                }}
                className="px-4 py-2 border border-wa-light-300 dark:border-wa-dark-tertiary text-wa-light-700 dark:text-wa-light-300 rounded-lg hover:bg-wa-light-100 dark:hover:bg-wa-dark-tertiary transition-colors duration-200"
              >
                Try Again
              </button>
            </div>

            {/* Support Link */}
            <p className="mt-6 text-sm text-wa-light-500 dark:text-wa-light-500">
              If the problem persists, please{" "}
              <a
                href="mailto:support@example.com"
                className="text-wa-green-500 hover:text-wa-green-600 underline"
              >
                contact support
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
