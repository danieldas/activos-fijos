import React from 'react';
import { 
  ScanLine, 
  CheckCircle2, 
  Circle,
  MoreVertical
} from 'lucide-react';

const auditItems = [
  { id: 1, code: 'UMSS-00123', name: 'Proyector Epson X41', scanned: true },
  { id: 2, code: 'UMSS-00125', name: 'Laptop Dell Inspiron', scanned: true },
  { id: 3, code: 'UMSS-00126', name: 'Pizarra Acrílica', scanned: false },
  { id: 4, code: 'UMSS-00128', name: 'Escritorio Docente', scanned: false },
  { id: 5, code: 'UMSS-00129', name: 'Silla Ejecutiva', scanned: false },
  { id: 6, code: 'UMSS-00130', name: 'CPU HP ProDesk', scanned: false },
];

export const Audit: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Header for Mobile Context */}
      <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#0D47A1]">
        <h2 className="text-lg font-bold text-gray-800">Toma de Inventario</h2>
        <p className="text-gray-500">Lab. Computación • Bloque B</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Progreso</span>
          <span className="text-sm font-bold text-[#D32F2F]">2/6 Verificados</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-[#D32F2F] h-3 rounded-full transition-all duration-500" style={{ width: '33%' }}></div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50 font-bold text-gray-700">Lista de Activos Esperados</div>
        <div className="divide-y divide-gray-100">
          {auditItems.map((item) => (
            <div key={item.id} className={`p-4 flex items-center justify-between ${item.scanned ? 'bg-green-50' : 'bg-white'}`}>
              <div className="flex-1">
                <p className={`font-semibold ${item.scanned ? 'text-green-800' : 'text-gray-800'}`}>{item.name}</p>
                <p className="text-xs text-gray-500">{item.code}</p>
              </div>
              <div className="flex items-center gap-3">
                {item.scanned ? (
                  <button className="flex items-center gap-1 text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm font-bold">
                    <CheckCircle2 size={16} /> Verificado
                  </button>
                ) : (
                  <button className="flex items-center gap-1 text-gray-400 border border-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-50">
                    <Circle size={16} /> Pendiente
                  </button>
                )}
                <button className="text-gray-400"><MoreVertical size={18}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer for FAB */}
      <div className="h-20"></div>

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-20">
        <button className="bg-[#D32F2F] text-white p-4 rounded-full shadow-lg hover:bg-red-800 hover:scale-105 transition-all flex items-center justify-center">
          <ScanLine size={32} />
        </button>
      </div>
    </div>
  );
};