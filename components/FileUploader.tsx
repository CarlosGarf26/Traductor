
import React from 'react';

interface FileUploaderProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  imageSelected: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileChange, disabled, imageSelected }) => (
  <div>
    <label 
      htmlFor="file-upload" 
      className={`relative cursor-pointer rounded-lg font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-slate-800 transition-colors duration-200 ${
        imageSelected 
          ? 'text-green-400 hover:text-green-300 focus-within:ring-green-500' 
          : 'text-indigo-400 hover:text-indigo-300 focus-within:ring-indigo-500'
      }`}
    >
      <div className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg transition-colors duration-200 ${
        imageSelected 
          ? 'border-green-500 bg-green-500/10'
          : 'border-slate-600 hover:border-indigo-500 bg-slate-700/50 hover:bg-slate-700'
      }`}>
        <div className="text-center">
          {imageSelected ? (
             <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )}
          <p className="mt-2 text-sm text-slate-400">
            <span className="font-semibold text-indigo-400">
              {imageSelected ? 'Cambiar archivo' : 'Subir archivo'}
            </span>
            {' '}o arrastra y suelta
          </p>
          <p className="text-xs text-slate-500">PDF, PNG, JPG, GIF hasta 10MB</p>
        </div>
      </div>
      <input 
        id="file-upload" 
        name="file-upload" 
        type="file" 
        className="sr-only" 
        onChange={onFileChange}
        accept="image/png, image/jpeg, image/gif, image/webp, application/pdf"
        disabled={disabled}
      />
    </label>
  </div>
);
