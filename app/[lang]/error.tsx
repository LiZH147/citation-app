"use client";

export default function LangError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Something went wrong</h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          An error occurred while loading this page. Please try refreshing.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md">Try Again</button>
          <a href="/" className="px-5 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Back to Home</a>
        </div>
      </div>
    </div>
  );
}