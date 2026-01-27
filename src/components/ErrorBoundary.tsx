// Error Bundeling Component

"use client"; // Global Error Boundary must be a client component

import { Component, ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Global Error Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center h-screen bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
              <p className="mb-4">Please refresh the page or contact support.</p>
              <button
                onClick={() => location.reload()}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Reload
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
