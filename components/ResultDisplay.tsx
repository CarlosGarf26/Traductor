
import React from 'react';
import { Spinner } from './Spinner';

interface ResultDisplayProps {
  transcription: string | null;
  isLoading: boolean;
  error: string | null;
  hasImage: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ transcription, isLoading, error, hasImage }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Spinner />
          <p className="mt-4 text-slate-400 animate-pulse">Analyzing image...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 font-semibold">An Error Occurred</p>
          <p className="text-sm">{error}</p>
        </div>
      );
    }
    if (transcription) {
      return (
        <div className="prose prose-invert prose-slate max-w-none">
          <pre className="bg-slate-900/50 p-4 rounded-md whitespace-pre-wrap font-sans text-slate-300">
            {transcription}
          </pre>
        </div>
      );
    }
    if (hasImage) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="mt-4 text-slate-400">Ready to analyze</p>
              <p className="text-sm text-slate-500">Click the "Analyze Image" button to start.</p>
            </div>
          );
    }

    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <p className="mt-4 text-slate-400">Transcription results will be shown here.</p>
        </div>
    );
  };

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-4 text-slate-300">Transcription Result</h2>
      <div className="bg-slate-900/50 rounded-lg min-h-[300px] lg:min-h-full p-4">
        {renderContent()}
      </div>
    </div>
  );
};
