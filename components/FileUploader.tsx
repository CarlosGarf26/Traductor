
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
          <p className="mt-2 text-sm text-slate-400">
            <span className="font-semibold text-indigo-400">
              {imageSelected ? 'Change image' : 'Upload a file'}
            </span>
            {' '}or drag and drop
          </p>
          <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      <input 
        id="file-upload" 
        name="file-upload" 
        type="file" 
        className="sr-only" 
        onChange={onFileChange}
        accept="image/png, image/jpeg, image/gif, image/webp"
        disabled={disabled}
      />
    </label>
  </div>
);
