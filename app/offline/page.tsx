export default function Offline() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">You're Offline</h1>
          <p className="text-gray-500">
            Please check your internet connection and try again
          </p>
        </div>
      </div>
    </main>
  );
} 