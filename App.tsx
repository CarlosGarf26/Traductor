import React, { useState, useCallback } from 'react';
import { analyzeImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { FileUploader } from './components/FileUploader';
import { ImagePreview } from './components/ImagePreview';
import { ResultDisplay } from './components/ResultDisplay';
import { Header } from './components/Header';
import { AnalyzeButton } from './components/AnalyzeButton';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
      setTranscription(null);
      setError(null);
    }
  };

  const handleAnalysis = useCallback(async () => {
    if (!imageFile) {
      setError('Por favor, carga un archivo primero.');
      return;
    }

    setIsLoading(true);
    setTranscription(null);
    setError(null);

    try {
      const base64Image = await fileToBase64(imageFile);
      // System prompt for data extraction
      const prompt = "Actúa como un sistema OCR avanzado y experto en entrada de datos. Transcribe el contenido completo de este documento con alta fidelidad. Si detectas una estructura de formulario, tabla o campos clave-valor, utiliza formato Markdown para preservar esa estructura visualmente. Ignora marcas de agua irrelevantes.";
      const result = await analyzeImage(base64Image, imageFile.type, prompt);
      setTranscription(result);
    } catch (err) {
      console.error('Process failed:', err);
      setError('Error en el procesamiento del archivo. Consulte al administrador del sistema.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);
  
  const resetState = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    setImageFile(null);
    setImageUrl(null);
    setTranscription(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center">
      <div className="w-full max-w-7xl p-4 sm:p-6 lg:p-8 flex-grow">
        <Header />

        <main className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Input Zone */}
            <div className="flex flex-col gap-6 p-6 bg-slate-900 rounded-xl shadow-xl border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                 <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Fuente de Datos</h3>
                 <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-500">Input</span>
              </div>
              <FileUploader onFileChange={handleFileChange} disabled={isLoading} imageSelected={!!imageFile} />
              <ImagePreview 
                imageUrl={imageUrl} 
                mimeType={imageFile?.type} 
                onClear={resetState} 
              />
              <AnalyzeButton 
                onClick={handleAnalysis} 
                isLoading={isLoading} 
                disabled={!imageFile} 
              />
            </div>

            {/* Right Column: Output Zone */}
            <div className="p-6 bg-slate-900 rounded-xl shadow-xl border border-slate-800 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Datos Extraídos</h3>
                 <span className="px-2 py-1 bg-indigo-900/30 text-indigo-400 rounded text-xs border border-indigo-900/50">Output JSON/MD</span>
              </div>
              <div className="flex-grow">
                <ResultDisplay 
                    transcription={transcription} 
                    isLoading={isLoading} 
                    error={error} 
                    hasImage={!!imageFile}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Corporate Footer */}
      <footer className="w-full py-4 border-t border-slate-800 bg-slate-900 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} IT Solutions Dept. Todos los derechos reservados.</p>
            <div className="flex gap-4 mt-2 sm:mt-0">
                <span>v2.1.0 (Stable)</span>
                <span className="hidden sm:inline">|</span>
                <span>Uso Interno Exclusivo</span>
                <span className="hidden sm:inline">|</span>
                <span className="text-emerald-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Sistema Online
                </span>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;