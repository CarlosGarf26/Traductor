import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center border-b border-slate-800 pb-6 mb-6">
    <div className="flex items-center justify-center gap-3 mb-2">
        <div className="bg-indigo-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight flex flex-col sm:block">
        Gestor de Documentos Inteligente <span className="text-indigo-500 sm:ml-2">COMEXA</span>
        </h1>
    </div>
    <p className="mt-2 text-sm text-slate-500 uppercase tracking-widest font-semibold">
      Sistema de Digitalización y Extracción de Datos
    </p>
  </header>
);