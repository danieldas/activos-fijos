import React from 'react';
import { 
  Package, 
  DollarSign, 
  AlertTriangle, 
  ClipboardList 
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { StatCard } from '../components/StatCard';
import { useData } from '../context/DataContext';

export const Dashboard: React.FC = () => {
  const { assets, movements } = useData();

  const goodCount = assets.filter(a => a.status === 'Bueno').length;
  const regularCount = assets.filter(a => a.status === 'Regular').length;
  const badCount = assets.filter(a => a.status === 'Malo').length;

  const data = [
    { name: 'Bueno', value: goodCount, color: '#198754' }, 
    { name: 'Regular', value: regularCount, color: '#ffc107' },
    { name: 'Malo', value: badCount, color: '#dc3545' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard General</h2>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Activos" 
          value={assets.length.toLocaleString()} 
          icon={Package} 
          borderColorClass="border-[#0D47A1]" 
        />
        <StatCard 
          title="Valor Total (Bs)" 
          value="45.2M" 
          icon={DollarSign} 
          borderColorClass="border-green-600" 
        />
        <StatCard 
          title="Pendientes Revisión" 
          value={badCount.toString()} 
          icon={AlertTriangle} 
          borderColorClass="border-[#D32F2F]"
          subtext={<span className="text-xs text-[#D32F2F] font-semibold">Acción requerida</span>}
        />
        <StatCard 
          title="Avance Inventario" 
          value="65%" 
          icon={ClipboardList} 
          borderColorClass="border-yellow-500"
          subtext={
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-[#0D47A1] h-2.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Movements Table */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-700">Últimos Movimientos</h3>
            <button className="text-sm text-[#0D47A1] hover:underline">Ver todos</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#0D47A1] text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Activo</th>
                  <th className="px-4 py-3">Origen</th>
                  <th className="px-4 py-3">Destino</th>
                  <th className="px-4 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {movements.slice(0, 5).map((mov) => (
                  <tr key={mov.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{mov.assetName}</td>
                    <td className="px-4 py-3 text-gray-500">{mov.origin}</td>
                    <td className="px-4 py-3 text-gray-500">{mov.destination}</td>
                    <td className="px-4 py-3 text-gray-500">{mov.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col">
          <h3 className="font-bold text-gray-700 mb-4">Estado de Activos</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
