
import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center">
    <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
      Transcriptor de Formularios
    </h1>
    <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
      Sube una imagen o PDF de un formulario y deja que Gemini transcriba el contenido por ti.
    </p>
  </header>
);
