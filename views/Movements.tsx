import React, { useState } from 'react';
import { Camera, Search, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Asset } from '../types';

export const Movements: React.FC = () => {
  const { assets, addMovement } = useData();
  const [selectedAssetCode, setSelectedAssetCode] = useState('');
  const [foundAsset, setFoundAsset] = useState<Asset | null>(null);
  
  // Form State
  const [destination, setDestination] = useState('');
  const [responsible, setResponsible] = useState('');
  const [observations, setObservations] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSearchAsset = () => {
    const asset = assets.find(a => 
      a.code.toLowerCase() === selectedAssetCode.toLowerCase() || 
      a.name.toLowerCase().includes(selectedAssetCode.toLowerCase())
    );
    if (asset) {
      setFoundAsset(asset);
    } else {
      setFoundAsset(null);
      alert('Activo no encontrado');
    }
  };

  const handleRegister = () => {
    if (foundAsset && destination && responsible) {
      addMovement({
        id: Date.now().toString(),
        assetName: foundAsset.name,
        origin: foundAsset.location,
        destination: destination,
        date: new Date().toISOString().split('T')[0],
        type: 'Traslado'
      });

      setSuccessMsg(`Movimiento registrado: ${foundAsset.name} ahora está en ${destination}`);
      
      // Reset form
      setFoundAsset(null);
      setSelectedAssetCode('');
      setDestination('');
      setResponsible('');
      setObservations('');
      
      setTimeout(() => setSuccessMsg(''), 5000);
    } else {
      alert('Por favor complete los campos obligatorios (Activo, Destino, Responsable)');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Registrar Movimiento / Traslado</h2>
      
      {successMsg && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center gap-2">
          <CheckCircle size={20} />
          {successMsg}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* Asset Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Seleccionar Activo</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={selectedAssetCode}
                  onChange={(e) => setSelectedAssetCode(e.target.value)}
                  placeholder="Buscar por código o nombre..." 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
                <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
              </div>
              <button 
                onClick={handleSearchAsset}
                className="bg-[#0D47A1] text-white px-4 rounded-lg font-bold"
              >
                Buscar
              </button>
            </div>
            
            {foundAsset && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                <span className="font-bold">Activo Seleccionado:</span> {foundAsset.name} ({foundAsset.code}) 
                <br/>
                <span className="font-bold">Ubicación Actual:</span> {foundAsset.location}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* New Location */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#0D47A1] border-b pb-2">Nueva Ubicación</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destino *</label>
                <input 
                  type="text" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-2.5 bg-white border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Ej: Aula 305, Laboratorio..."
                />
              </div>
            </div>

            {/* Responsibility & Evidence */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#0D47A1] border-b pb-2">Custodia y Evidencia</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nuevo Responsable *</label>
                <input 
                  type="text" 
                  value={responsible}
                  onChange={(e) => setResponsible(e.target.value)}
                  className="w-full p-2.5 bg-white border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Nombre del personal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Evidencia Fotográfica</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="text-sm text-gray-500"><span className="font-semibold">Click para subir</span></p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
            <textarea 
              rows={3} 
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-green-500 outline-none"
              placeholder="Detalles adicionales sobre el estado del activo o motivo del traslado..."
            ></textarea>
          </div>

          <div className="pt-4 flex items-center justify-end gap-4 border-t border-gray-100">
            <button type="button" className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-colors">
              Cancelar
            </button>
            <button 
              onClick={handleRegister}
              type="button" 
              className="px-6 py-2.5 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 shadow-md transition-colors"
            >
              Registrar Movimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
