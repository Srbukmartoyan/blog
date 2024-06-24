const ErrorDisplay = ({ message = 'Error fetching data' }) => (
  <div className="mt-4 text-center text-red-700">
    <svg className="inline-block w-8 h-8 mb-2 text-red-700" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 4a1 1 0 112 0v6a1 1 0 11-2 0V4zm1 12a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      />
    </svg>
    <p className="font-bold">{message}</p>
  </div>
);

export default ErrorDisplay;
