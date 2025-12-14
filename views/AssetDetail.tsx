import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Printer, 
  MapPin, 
  Calendar,
  User,
  QrCode
} from 'lucide-react';
import { Asset } from '../types';

interface AssetDetailProps {
  asset: Asset;
  onBack: () => void;
}

export const AssetDetail: React.FC<AssetDetailProps> = ({ asset, onBack }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'location' | 'history'>('general');

  return (
    <div className="space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-[#D32F2F] transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" /> Volver al listado
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{asset.name}</h1>
                  <span className="inline-block mt-2 bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full border border-gray-300">
                    {asset.code}
                  </span>
                </div>
                <div className={`px-4 py-1 rounded-full text-sm font-bold border ${
                  asset.status === 'Bueno' ? 'bg-green-50 text-green-700 border-green-200' : 
                  asset.status === 'Regular' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                  'bg-red-50 text-red-700 border-red-200'
                }`}>
                  {asset.status}
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px px-6" aria-label="Tabs">
                {['general', 'location', 'history'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`
                      py-4 px-6 font-medium text-sm border-b-2 transition-colors
                      ${activeTab === tab 
                        ? 'border-[#D32F2F] text-[#D32F2F]' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                    `}
                  >
                    {tab === 'general' ? 'General' : tab === 'location' ? 'Ubicación y Custodia' : 'Historial'}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'general' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Marca</label>
                    <p className="mt-1 text-lg text-gray-900">{asset.brand}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Modelo</label>
                    <p className="mt-1 text-lg text-gray-900">{asset.model}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Serie</label>
                    <p className="mt-1 text-lg text-gray-900">{asset.series}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Color</label>
                    <p className="mt-1 text-lg text-gray-900">Blanco/Gris</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Material</label>
                    <p className="mt-1 text-lg text-gray-900">Plástico Endurecido</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Dimensiones</label>
                    <p className="mt-1 text-lg text-gray-900">30x24x8 cm</p>
                  </div>
                </div>
              )}

              {activeTab === 'location' && (
                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <MapPin className="text-[#0D47A1] w-8 h-8 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Ubicación Actual</p>
                      <p className="text-lg font-bold text-gray-800">Campus Central {'>'} Bloque Tecnológico {'>'} {asset.location}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">Responsable Actual</h4>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                        <User size={32} />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-800">{asset.responsible}</p>
                        <p className="text-gray-500">Departamento de Sistemas</p>
                        <p className="text-sm text-[#0D47A1]">juan.perez@umss.edu.bo</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 py-2">
                  <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#0D47A1] border-2 border-white"></div>
                    <p className="text-sm text-gray-500 mb-1">25 Oct 2023 - 10:30 AM</p>
                    <h4 className="text-lg font-bold text-gray-800">Asignación de Activo</h4>
                    <p className="text-gray-600">Asignado a Juan Pérez en Aula 402.</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-300 border-2 border-white"></div>
                    <p className="text-sm text-gray-500 mb-1">20 Oct 2023 - 14:15 PM</p>
                    <h4 className="text-lg font-bold text-gray-800">Ingreso a Almacén</h4>
                    <p className="text-gray-600">Registrado por Ana (Auditoría).</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-300 border-2 border-white"></div>
                    <p className="text-sm text-gray-500 mb-1">15 Oct 2023 - 09:00 AM</p>
                    <h4 className="text-lg font-bold text-gray-800">Compra Registrada</h4>
                    <p className="text-gray-600">Adquisición Orden #9921.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Rights (Image & QR) */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <img 
                src="https://picsum.photos/300/300" 
                alt="Asset Placeholder" 
                className="w-full h-full object-cover rounded-lg opacity-80" 
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center">
             <div className="bg-white p-2 border-4 border-black rounded-lg mb-4">
               <QrCode size={120} className="text-black"/>
             </div>
             <p className="font-mono text-lg font-bold text-gray-800 mb-4">{asset.code}</p>
             <button className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-colors">
               <Printer size={18} /> Imprimir Etiqueta
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};