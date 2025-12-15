import React from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  FileSpreadsheet, 
  PieChart as PieChartIcon,
  Clock,
  Filter,
  ArrowDownToLine,
  AlertTriangle,
  TrendingDown,
  Trash2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const reportHistory = [
  { id: 1, name: 'Inventario General - Octubre 2023', type: 'Inventario', format: 'PDF', date: '25/10/2023', size: '2.4 MB', user: 'Carlos Admin' },
  { id: 2, name: 'Bajas y Retiros - Q3 2023', type: 'Movimientos', format: 'Excel', date: '20/10/2023', size: '856 KB', user: 'Ana García' },
  { id: 3, name: 'Activos por Ubicación (Campus Central)', type: 'Ubicación', format: 'PDF', date: '15/10/2023', size: '1.2 MB', user: 'Carlos Admin' },
  { id: 4, name: 'Depreciación Anual 2023 - Preliminar', type: 'Contable', format: 'Excel', date: '01/10/2023', size: '3.1 MB', user: 'Contabilidad' },
];

const lifeSpanData = [
  { name: '0-1 Años (Crítico)', cantidad: 45, color: '#dc3545' },
  { name: '1-3 Años', cantidad: 120, color: '#ffc107' },
  { name: '3-5 Años', cantidad: 200, color: '#198754' },
  { name: '+5 Años', cantidad: 85, color: '#0D47A1' },
];

const assetsForDisposal = [
  { code: 'UMSS-00045', name: 'PC Pentium 4', location: 'Depósito', usefulLife: '0%', status: 'Obsoleto', value: '10.00' },
  { code: 'UMSS-00092', name: 'Silla Giratoria Rota', location: 'Almacén', usefulLife: '0%', status: 'Mal Estado', value: '1.00' },
  { code: 'UMSS-00101', name: 'Impresora HP 1010', location: 'Oficina 3', usefulLife: '5%', status: 'Requiere Mantenimiento', value: '50.00' },
  { code: 'UMSS-00115', name: 'Escritorio Melamina', location: 'Aula 101', usefulLife: '10%', status: 'Deteriorado', value: '120.00' },
];

export const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Centro de Reportes</h2>
          <p className="text-gray-500 text-sm">Genera, visualiza y descarga reportes del estado de activos.</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700 transition-colors">
          <FileText size={18} /> Nuevo Reporte Personalizado
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-[#0D47A1] rounded-full group-hover:bg-[#0D47A1] group-hover:text-white transition-colors">
              <FileSpreadsheet size={24} />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase">Excel</span>
          </div>
          <h3 className="font-bold text-gray-800 mb-1">Inventario General</h3>
          <p className="text-sm text-gray-500 mb-4">Listado completo de todos los activos activos.</p>
          <div className="text-[#0D47A1] text-sm font-medium flex items-center group-hover:underline">
            Descargar ahora <ArrowDownToLine size={16} className="ml-1" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-full group-hover:bg-green-600 group-hover:text-white transition-colors">
              <PieChartIcon size={24} />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase">PDF</span>
          </div>
          <h3 className="font-bold text-gray-800 mb-1">Activos por Estado</h3>
          <p className="text-sm text-gray-500 mb-4">Resumen gráfico de estado (Bueno, Regular, Malo).</p>
          <div className="text-green-600 text-sm font-medium flex items-center group-hover:underline">
            Descargar ahora <ArrowDownToLine size={16} className="ml-1" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-full group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <Clock size={24} />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase">Excel</span>
          </div>
          <h3 className="font-bold text-gray-800 mb-1">Movimientos del Mes</h3>
          <p className="text-sm text-gray-500 mb-4">Historial de traslados y asignaciones recientes.</p>
          <div className="text-orange-600 text-sm font-medium flex items-center group-hover:underline">
            Descargar ahora <ArrowDownToLine size={16} className="ml-1" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <FileText size={24} />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase">PDF</span>
          </div>
          <h3 className="font-bold text-gray-800 mb-1">Auditoría de Bajas</h3>
          <p className="text-sm text-gray-500 mb-4">Reporte oficial para contraloría de activos dados de baja.</p>
          <div className="text-purple-600 text-sm font-medium flex items-center group-hover:underline">
            Descargar ahora <ArrowDownToLine size={16} className="ml-1" />
          </div>
        </div>
      </div>

      {/* Useful Life Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <TrendingDown size={20} className="text-gray-500" />
                Análisis de Vida Útil
              </h3>
              <p className="text-sm text-gray-500">Proyección de activos restantes por años de vida útil.</p>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lifeSpanData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" name="Cantidad de Activos" fill="#16a34a" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-red-600 flex items-center gap-2">
                <AlertTriangle size={20} />
                Sugerencia de Bajas
              </h3>
              <p className="text-sm text-gray-500">Activos con vida útil &lt; 10% o estado crítico.</p>
            </div>
            <button className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded-full font-medium border border-red-100 hover:bg-red-100 transition-colors">
              Exportar Lista
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-red-50 text-red-800 uppercase text-xs">
                <tr>
                  <th className="px-3 py-2">Código</th>
                  <th className="px-3 py-2">Activo</th>
                  <th className="px-3 py-2">Vida Útil</th>
                  <th className="px-3 py-2">Valor Libros</th>
                  <th className="px-3 py-2 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {assetsForDisposal.map((asset, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-3 py-3 font-medium text-gray-700">{asset.code}</td>
                    <td className="px-3 py-3">
                      <div className="font-medium text-gray-900">{asset.name}</div>
                      <div className="text-xs text-gray-500">{asset.status}</div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-bold">
                        {asset.usefulLife}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-gray-600">Bs {asset.value}</td>
                    <td className="px-3 py-3 text-right">
                      <button className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors" title="Iniciar trámite de baja">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Custom Report Generator */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Filter size={20} className="text-gray-500" />
            Configurar Reporte
          </h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Reporte</label>
              <select className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm">
                <option>Inventario Detallado</option>
                <option>Resumen por Responsable</option>
                <option>Activos por Ubicación</option>
                <option>Depreciación Contable</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
                <div className="relative">
                  <input type="date" className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-green-500 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
                <div className="relative">
                  <input type="date" className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-green-500 text-sm" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Formato de Salida</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="format" className="text-green-600 focus:ring-green-500" defaultChecked />
                  <span className="text-sm text-gray-700">PDF Documento</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="format" className="text-green-600 focus:ring-green-500" />
                  <span className="text-sm text-gray-700">Excel (.xlsx)</span>
                </label>
              </div>
            </div>

            <button type="button" className="w-full mt-4 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
              <Download size={16} /> Generar Reporte
            </button>
          </form>
        </div>

        {/* History Table */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              <Clock size={20} className="text-gray-500" />
              Historial de Descargas
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3">Nombre del Reporte</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Usuario</th>
                  <th className="px-4 py-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reportHistory.map((report) => (
                  <tr key={report.id} className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{report.name}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        {report.format === 'PDF' ? <FileText size={12}/> : <FileSpreadsheet size={12}/>}
                        {report.format} • {report.size}
                      </div>
                    </td>
                    <td className="px-4 py-3">{report.date}</td>
                    <td className="px-4 py-3">{report.user}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-[#0D47A1] hover:text-green-600 hover:underline font-medium text-sm">
                        Descargar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
