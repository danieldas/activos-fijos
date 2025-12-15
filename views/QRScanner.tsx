import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Camera, CheckCircle2, X } from 'lucide-react';

interface QRScannerProps {
  onBack: () => void;
  onScanComplete: (code: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onBack, onScanComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    // Request camera access
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setPermissionGranted(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setPermissionGranted(false);
      }
    };

    startCamera();

    return () => {
      // Cleanup stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleSimulateScan = () => {
    setScanning(false);
    // Simulate finding a code
    const mockCode = "UMSS-00123";
    setScanResult(mockCode);
    
    // Auto complete after showing success
    setTimeout(() => {
      onScanComplete(mockCode);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/70 to-transparent">
        <button onClick={onBack} className="text-white p-2 rounded-full hover:bg-white/20">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-white font-bold text-lg">Escanear Activo</h2>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* Camera View */}
      <div className="flex-1 relative flex items-center justify-center bg-gray-900">
        {!permissionGranted && (
          <div className="text-white text-center p-6">
            <Camera size={48} className="mx-auto mb-4 text-gray-400" />
            <p>Solicitando permiso de cámara...</p>
            <p className="text-sm text-gray-400 mt-2">Asegúrate de permitir el acceso.</p>
          </div>
        )}
        
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className={`absolute inset-0 w-full h-full object-cover ${!permissionGranted ? 'hidden' : ''}`}
        />

        {/* Overlay Scanner UI */}
        {scanning && (
          <>
            <div className="absolute inset-0 border-[50px] border-black/50 pointer-events-none"></div>
            <div className="absolute w-64 h-64 border-2 border-green-500 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.5)] z-0 animate-pulse flex items-center justify-center">
                <div className="w-60 h-0.5 bg-green-500 shadow-[0_0_10px_rgba(16,185,129,1)] animate-scan"></div>
            </div>
            <p className="absolute bottom-32 text-white font-medium bg-black/50 px-4 py-2 rounded-full">
              Apunte al código QR del activo
            </p>
          </>
        )}

        {/* Success Overlay */}
        {scanResult && (
          <div className="absolute inset-0 bg-green-600/90 flex flex-col items-center justify-center text-white animate-in fade-in duration-300">
            <div className="bg-white text-green-600 p-4 rounded-full mb-4 shadow-lg">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-2xl font-bold">¡Activo Verificado!</h3>
            <p className="mt-2 text-lg font-mono">{scanResult}</p>
            <p className="mt-8 text-sm opacity-80">Redirigiendo...</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-black p-6 flex justify-center pb-10">
        <button 
          onClick={handleSimulateScan}
          className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm shadow-lg active:scale-95 transition-transform"
        >
          SIMULAR ESCANEO
        </button>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-120px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(120px); opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
};
