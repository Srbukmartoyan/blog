import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    const handleRetry = () => {
        resetErrorBoundary();
    };

    return (
        <div role="alert" className="flex flex-col items-center mt-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong...</h2>
            <div className="p-4 border border-red-500 rounded-lg shadow-lg">
                <p className="text-red-700 mb-4">{error.message}</p>
                <button
                    onClick={handleRetry}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Try again
                </button>
            </div>
        </div>
    );
};

const ErrorBoundary = ({ children }) => (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
        {children}
    </ReactErrorBoundary>
);

export default ErrorBoundary;
