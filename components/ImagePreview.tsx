
import React from 'react';

interface ImagePreviewProps {
  imageUrl: string | null;
  mimeType?: string | null;
  onClear: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, mimeType, onClear }) => {
  if (!imageUrl) {
    return (
      <div className="flex-grow flex items-center justify-center bg-slate-700/50 rounded-lg min-h-[200px]">
        <p className="text-slate-500">La vista previa aparecerá aquí</p>
      </div>
    );
  }

  const isPdf = mimeType === 'application/pdf';

  return (
    <div className="relative flex-grow min-h-[200px] group flex flex-col">
      {isPdf ? (
        <div className="flex flex-col w-full h-full">
          <iframe
            src={imageUrl}
            title="PDF Preview"
            className="w-full h-[500px] rounded-lg border border-slate-700 bg-slate-800"
          />
           <a 
            href={imageUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-2 text-sm text-indigo-400 hover:text-indigo-300 text-center"
          >
            ¿No ves el PDF? Ábrelo en una nueva pestaña
          </a>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt="Uploaded preview"
          className="w-full h-full object-contain rounded-lg max-h-96"
        />
      )}
      
      <button
        onClick={onClear}
        className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 z-10"
        aria-label="Eliminar archivo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
