
import React from 'react';
import { Spinner } from './Spinner';

interface AnalyzeButtonProps {
    onClick: () => void;
    isLoading: boolean;
    disabled: boolean;
}

export const AnalyzeButton: React.FC<AnalyzeButtonProps> = ({ onClick, isLoading, disabled }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled || isLoading}
            className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-800 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200"
        >
            {isLoading ? (
                <>
                    <Spinner />
                    <span className="ml-2">Analyzing...</span>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 2a1 1 0 00-1 1v1h14V3a1 1 0 00-1-1H5zM3 6h14v9a2 2 0 01-2 2H5a2 2 0 01-2-2V6zm2 4a1 1 0 100 2h8a1 1 0 100-2H5z" clipRule="evenodd" />
                    </svg>
                    Analyze Image
                </>
            )}
        </button>
    );
};
