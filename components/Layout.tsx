import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Box, 
  ArrowRightLeft, 
  ClipboardCheck, 
  MapPin, 
  FileText, 
  Settings, 
  Search, 
  Bell, 
  Menu,
  X,
  User,
  ChevronDown,
  LogOut,
  Activity
} from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  onSearch: (term: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, onLogout, onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMovementsOpen, setIsMovementsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchInput);
    }
  };

  const navItemClass = (view: ViewState) => `
    flex items-center px-6 py-3 text-gray-300 hover:bg-blue-800 hover:text-white transition-colors cursor-pointer
    ${currentView === view ? 'bg-blue-800 text-white border-r-4 border-green-500' : ''}
  `;

  const SidebarContent = () => (
    <>
      <div className="p-6 flex items-center justify-center border-b border-blue-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
            <Activity size={20} />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide">Activa360</h1>
        </div>
      </div>

      <nav className="mt-6 flex-1 overflow-y-auto">
        <div onClick={() => onNavigate('dashboard')} className={navItemClass('dashboard')}>
          <LayoutDashboard size={20} className="mr-3" />
          Dashboard
        </div>
        
        <div onClick={() => onNavigate('assets')} className={navItemClass('assets')}>
          <Box size={20} className="mr-3" />
          Gestión de Activos
        </div>

        <div>
          <div 
            onClick={() => setIsMovementsOpen(!isMovementsOpen)} 
            className="flex items-center justify-between px-6 py-3 text-gray-300 hover:bg-blue-800 hover:text-white transition-colors cursor-pointer"
          >
            <div className="flex items-center">
              <ArrowRightLeft size={20} className="mr-3" />
              Movimientos
            </div>
            <ChevronDown size={16} className={`transform transition-transform ${isMovementsOpen ? 'rotate-180' : ''}`} />
          </div>
          
          {isMovementsOpen && (
            <div className="bg-[#0a3678] py-2">
              <div onClick={() => onNavigate('movements')} className="pl-14 py-2 text-sm text-gray-300 hover:text-white cursor-pointer">
                Asignaciones / Traslados
              </div>
              <div className="pl-14 py-2 text-sm text-gray-300 hover:text-white cursor-pointer">
                Bajas
              </div>
            </div>
          )}
        </div>

        <div onClick={() => onNavigate('audit')} className={navItemClass('audit')}>
          <ClipboardCheck size={20} className="mr-3" />
          Auditoría
        </div>

        <div onClick={() => onNavigate('locations')} className={navItemClass('locations')}>
          <MapPin size={20} className="mr-3" />
          Ubicaciones
        </div>

        <div onClick={() => onNavigate('reports')} className={navItemClass('reports')}>
          <FileText size={20} className="mr-3" />
          Reportes
        </div>

        <div onClick={() => onNavigate('settings')} className={navItemClass('settings')}>
          <Settings size={20} className="mr-3" />
          Configuración
        </div>
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex font-sans">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={toggleMobileMenu}></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#0D47A1] text-white transform transition-transform duration-300 ease-in-out flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <SidebarContent />
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-h-screen w-full">
        {/* Top Bar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sticky top-0 z-10">
          <div className="flex items-center">
            <button onClick={toggleMobileMenu} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <Menu size={24} />
            </button>
            
            <div className="hidden md:flex ml-4 relative w-96">
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Buscar por código, serie o nombre..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-sm"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-green-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">Carlos Admin</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                <User className="text-gray-500" size={24} />
              </div>
              <button 
                onClick={onLogout}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors ml-1"
                title="Cerrar Sesión"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
