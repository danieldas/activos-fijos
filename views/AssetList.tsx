import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Download, 
  Printer, 
  Eye, 
  Edit,
  Search,
  X
} from 'lucide-react';
import { Asset, AssetStatus } from '../types';
import { useData } from '../context/DataContext';

interface AssetListProps {
  onSelectAsset: (asset: Asset) => void;
  externalSearchTerm?: string;
}

export const AssetList: React.FC<AssetListProps> = ({ onSelectAsset, externalSearchTerm }) => {
  const { assets, addAsset } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [newAsset, setNewAsset] = useState<Partial<Asset>>({
    status: 'Bueno'
  });

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

  const filteredAssets = assets.filter(asset => 
    asset.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Codigo,Nombre,Marca,Serie,Ubicacion,Responsable,Estado\n"
      + assets.map(a => `${a.code},"${a.name}",${a.brand},${a.series},"${a.location}","${a.responsible}",${a.status}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inventario_activos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAsset.code && newAsset.name) {
      const assetToAdd: Asset = {
        id: Date.now().toString(),
        code: newAsset.code || '',
        name: newAsset.name || '',
        brand: newAsset.brand || '',
        model: newAsset.model || '',
        series: newAsset.series || 'S/N',
        location: newAsset.location || 'Sin asignar',
        responsible: newAsset.responsible || 'Sin asignar',
        status: newAsset.status as AssetStatus || 'Bueno'
      };
      addAsset(assetToAdd);
      setIsModalOpen(false);
      setNewAsset({ status: 'Bueno' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Inventario de Activos</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700 transition-colors"
          >
            <Plus size={18} /> Nuevo Activo
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-700 transition-colors"
          >
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
          <span className="text-sm text-gray-700">Mostrando {filteredAssets.length} de {assets.length} entradas</span>
        </div>
      </div>

      {/* NEW ASSET MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="bg-[#0D47A1] p-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">Registrar Nuevo Activo</h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-blue-800 p-1 rounded">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código *</label>
                  <input 
                    required
                    type="text" 
                    value={newAsset.code || ''} 
                    onChange={e => setNewAsset({...newAsset, code: e.target.value})}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" 
                    placeholder="Ej: UMSS-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre / Descripción *</label>
                  <input 
                    required
                    type="text" 
                    value={newAsset.name || ''} 
                    onChange={e => setNewAsset({...newAsset, name: e.target.value})}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" 
                    placeholder="Ej: Laptop HP"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                  <input 
                    type="text" 
                    value={newAsset.brand || ''} 
                    onChange={e => setNewAsset({...newAsset, brand: e.target.value})}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                  <input 
                    type="text" 
                    value={newAsset.model || ''} 
                    onChange={e => setNewAsset({...newAsset, model: e.target.value})}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación Inicial</label>
                  <input 
                    type="text" 
                    value={newAsset.location || ''} 
                    onChange={e => setNewAsset({...newAsset, location: e.target.value})}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select 
                    value={newAsset.status}
                    onChange={e => setNewAsset({...newAsset, status: e.target.value as AssetStatus})}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                  >
                    <option value="Bueno">Bueno</option>
                    <option value="Regular">Regular</option>
                    <option value="Malo">Malo</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold">Guardar Activo</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
