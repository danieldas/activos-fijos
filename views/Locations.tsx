import React from 'react';
import { 
  Plus, 
  Search, 
  MapPin, 
  Building2, 
  School, 
  Filter,
  MoreVertical,
  Edit2,
  Map
} from 'lucide-react';
import { Location } from '../types';

const mockLocations: Location[] = [
  { id: '1', name: 'Aula 402', type: 'Aula', parent: 'Campus Central > Bloque Tecnológico', assetCount: 45, status: 'Operativo', manager: 'Lic. Rios' },
  { id: '2', name: 'Laboratorio de Computación 1', type: 'Laboratorio', parent: 'Campus Central > Bloque Tecnológico', assetCount: 120, status: 'Operativo', manager: 'Ing. Mamani' },
  { id: '3', name: 'Oficina Decanatura', type: 'Oficina', parent: 'Campus Central > Edificio Administrativo', assetCount: 32, status: 'Operativo', manager: 'Sra. Flores' },
  { id: '4', name: 'Auditorio Principal', type: 'Aula', parent: 'Campus Agronomía > Bloque A', assetCount: 200, status: 'Mantenimiento', manager: 'Arq. Vargas' },
  { id: '5', name: 'Depósito General', type: 'Depósito', parent: 'Campus Central > Zona Norte', assetCount: 540, status: 'Operativo', manager: 'Sr. Quispe' },
  { id: '6', name: 'Laboratorio de Química', type: 'Laboratorio', parent: 'Campus Medicina > Bloque C', assetCount: 85, status: 'Clausurado', manager: 'Dra. Méndez' },
];

export const Locations: React.FC = () => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Campus': return 'bg-blue-100 text-blue-800';
      case 'Laboratorio': return 'bg-purple-100 text-purple-800';
      case 'Aula': return 'bg-gray-100 text-gray-800';
      case 'Oficina': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Operativo': return 'bg-green-500';
      case 'Mantenimiento': return 'bg-yellow-500';
      case 'Clausurado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Ubicaciones</h2>
          <p className="text-gray-500 text-sm">Administra campus, bloques, aulas y oficinas.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
            <Map size={18} /> Ver Mapa
          </button>
          <button className="flex items-center gap-2 bg-[#D32F2F] text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-800 transition-colors">
            <Plus size={18} /> Nueva Ubicación
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#0D47A1] flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-bold uppercase">Total Campus</p>
            <h3 className="text-2xl font-bold text-gray-800">4</h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-full text-[#0D47A1]">
            <MapPin size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-bold uppercase">Laboratorios</p>
            <h3 className="text-2xl font-bold text-gray-800">12</h3>
          </div>
          <div className="p-3 bg-purple-50 rounded-full text-purple-500">
            <Building2 size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-bold uppercase">Aulas / Oficinas</p>
            <h3 className="text-2xl font-bold text-gray-800">145</h3>
          </div>
          <div className="p-3 bg-orange-50 rounded-full text-orange-500">
            <School size={24} />
          </div>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50">
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Buscar ubicación..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-[#0D47A1] focus:border-[#0D47A1] outline-none text-sm"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
             <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex-1 md:flex-none">
              <Filter size={16} /> Filtros
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-[#0D47A1]">
              <tr>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Tipo</th>
                <th className="px-6 py-3">Dependencia (Campus / Bloque)</th>
                <th className="px-6 py-3 text-center">Cant. Activos</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockLocations.map((loc) => (
                <tr key={loc.id} className="bg-white hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{loc.name}</div>
                    <div className="text-xs text-gray-400">Encargado: {loc.manager}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getTypeColor(loc.type)}`}>
                      {loc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {loc.parent}
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900">
                    {loc.assetCount}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${getStatusDot(loc.status)}`}></div>
                      <span className="text-gray-700">{loc.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded transition-colors" title="Editar">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded transition-colors" title="Más opciones">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <span className="text-sm text-gray-700">Mostrando 6 de 45 ubicaciones</span>
          <div className="inline-flex gap-2">
            <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50">
              Anterior
            </button>
            <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};