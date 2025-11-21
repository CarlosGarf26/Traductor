
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
      setError('Por favor, sube un archivo primero.');
      return;
    }

    setIsLoading(true);
    setTranscription(null);
    setError(null);

    try {
      const base64Image = await fileToBase64(imageFile);
      // Updated prompt to be more descriptive and handle forms better
      const prompt = "Transcribe el contenido de este documento. Si es un formulario, trata de mantener la estructura utilizando formato Markdown.";
      const result = await analyzeImage(base64Image, imageFile.type, prompt);
      setTranscription(result);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError('No se pudo analizar el archivo. Revisa la consola para más detalles.');
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
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl">
        <Header />

        <main className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Uploader and Preview */}
            <div className="flex flex-col gap-6 p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
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

            {/* Right Column: Results */}
            <div className="p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
              <ResultDisplay 
                transcription={transcription} 
                isLoading={isLoading} 
                error={error} 
                hasImage={!!imageFile}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
