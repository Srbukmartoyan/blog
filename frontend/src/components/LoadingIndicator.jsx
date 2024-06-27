const LoadingIndicator = () => (
  <div className="mt-4 text-center flex flex-col items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    <p className="mt-2 text-gray-600">Loading...</p>
  </div>
);

export default LoadingIndicator;