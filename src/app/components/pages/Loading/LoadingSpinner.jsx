export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-6 text-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-500 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
