import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Download, 
  Printer, 
  Eye, 
  Edit,
  Search
} from 'lucide-react';
import { Asset } from '../types';

const assetsData: Asset[] = [
  { id: '1', code: 'UMSS-00123', name: 'Proyector Epson X41', brand: 'Epson', model: 'X41', series: 'SN-9982', location: 'Aula 402', responsible: 'Juan Pérez', status: 'Bueno' },
  { id: '2', code: 'UMSS-00124', name: 'Silla Ejecutiva', brand: 'Muebles Bo', model: 'Ergo', series: 'N/A', location: 'Secretaría', responsible: 'Ana García', status: 'Regular' },
  { id: '3', code: 'UMSS-00125', name: 'Laptop Dell Inspiron', brand: 'Dell', model: '5510', series: 'DLL-3321', location: 'Lab. Comp 1', responsible: 'Carlos Admin', status: 'Malo' },
  { id: '4', code: 'UMSS-00126', name: 'Pizarra Acrílica', brand: 'Generico', model: '2x1m', series: 'N/A', location: 'Aula 201', responsible: 'Roberto M.', status: 'Bueno' },
  { id: '5', code: 'UMSS-00127', name: 'Microscopio Zeiss', brand: 'Zeiss', model: 'Primo Star', series: 'ZS-112', location: 'Lab. Bio', responsible: 'Dra. López', status: 'Bueno' },
];

interface AssetListProps {
  onSelectAsset: (asset: Asset) => void;
  externalSearchTerm?: string;
}

export const AssetList: React.FC<AssetListProps> = ({ onSelectAsset, externalSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Update local search term if the external one changes (e.g., from global header search)
  useEffect(() => {
    if (externalSearchTerm !== undefined) {
      setSearchTerm(externalSearchTerm);
    }
  }, [externalSearchTerm]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Bueno': return <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Bueno</span>;
      case 'Regular': return <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">Regular</span>;
      case 'Malo': return <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">Malo</span>;
      default: return null;
    }
  };

  const filteredAssets = assetsData.filter(asset => 
    asset.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Inventario de Activos</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700 transition-colors">
            <Plus size={18} /> Nuevo Activo
          </button>
          <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-700 transition-colors">
            <Download size={18} /> Exportar
          </button>
          <button className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
            <Printer size={18} /> Etiquetas
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Search Toolbar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="relative max-w-md">
            <input 
              type="text" 
              placeholder="Buscar por código o descripción..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-sm"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-[#0D47A1]">
              <tr>
                <th className="px-6 py-3">Código</th>
                <th className="px-6 py-3">Descripción</th>
                <th className="px-6 py-3">Marca</th>
                <th className="px-6 py-3">Serie</th>
                <th className="px-6 py-3">Ubicación</th>
                <th className="px-6 py-3">Responsable</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => (
                  <tr key={asset.id} className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{asset.code}</td>
                    <td className="px-6 py-4">{asset.name}</td>
                    <td className="px-6 py-4">{asset.brand}</td>
                    <td className="px-6 py-4">{asset.series}</td>
                    <td className="px-6 py-4">{asset.location}</td>
                    <td className="px-6 py-4">{asset.responsible}</td>
                    <td className="px-6 py-4">{getStatusBadge(asset.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => onSelectAsset(asset)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded" title="Ver"
                        >
                          <Eye size={18} />
                        </button>
                        <button className="p-1 text-gray-600 hover:bg-gray-100 rounded" title="Editar">
                          <Edit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No se encontraron activos que coincidan con "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <span className="text-sm text-gray-700">Mostrando {filteredAssets.length} de {assetsData.length} entradas</span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l hover:bg-gray-100 disabled:opacity-50">
              Anterior
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r hover:bg-gray-100 disabled:opacity-50">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
