// Error Bundeling Component

"use client";

import { Component, ReactNode } from "react";
import { useTranslations } from "next-intl";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

/**
 * Standalone functional component for the fallback UI.
 * Extracted here because class components cannot call React hooks.
 */
function ErrorFallback() {
  const t = useTranslations("error_boundary");
  return (
    <div className="flex items-center justify-center h-screen bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
        <p className="mb-4">{t("description")}</p>
        <button
          onClick={() => location.reload()}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          {t("reload")}
        </button>
      </div>
    </div>
  );
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {

  /**
   * 
   * @param props 
   *  This component is designed to catch JavaScript errors anywhere in its child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. It uses React's error boundary lifecycle methods to achieve this functionality.
   * - `constructor`: Initializes the state to track whether an error has occurred and to store the error object.
   * 
   */

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
      return this.props.fallback || <ErrorFallback />;
    }
    return this.props.children;
  }
}
