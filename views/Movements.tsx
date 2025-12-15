import React from 'react';
import { Camera, Search } from 'lucide-react';

export const Movements: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Registrar Movimiento / Traslado</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
        <form className="space-y-6">
          
          {/* Asset Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Seleccionar Activo</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar por código o nombre..." 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
            </div>
            <p className="text-xs text-gray-500 mt-1">Escanear código de barras o QR para búsqueda rápida.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* New Location */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#0D47A1] border-b pb-2">Nueva Ubicación</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campus / Sede</label>
                <select className="w-full p-2.5 bg-white border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                  <option>Campus Central</option>
                  <option>Campus Agronomía</option>
                  <option>Medicina</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bloque</label>
                <select className="w-full p-2.5 bg-white border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                  <option>Bloque Tecnológico</option>
                  <option>Bloque Administrativo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ambiente</label>
                <select className="w-full p-2.5 bg-white border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                  <option>Aula 402</option>
                  <option>Laboratorio 1</option>
                  <option>Oficina 101</option>
                </select>
              </div>
            </div>

            {/* Responsibility & Evidence */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#0D47A1] border-b pb-2">Custodia y Evidencia</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nuevo Responsable</label>
                <select className="w-full p-2.5 bg-white border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                  <option>Seleccionar personal...</option>
                  <option>Juan Pérez</option>
                  <option>Ana García</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Evidencia Fotográfica</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="text-sm text-gray-500"><span className="font-semibold">Click para subir</span></p>
                      <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
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
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-green-500 outline-none"
              placeholder="Detalles adicionales sobre el estado del activo o motivo del traslado..."
            ></textarea>
          </div>

          <div className="pt-4 flex items-center justify-end gap-4 border-t border-gray-100">
            <button type="button" className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-colors">
              Cancelar
            </button>
            <button type="button" className="px-6 py-2.5 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 shadow-md transition-colors">
              Registrar Movimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
