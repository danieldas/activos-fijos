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
  Activity,
  ScanLine,
  Truck,
  ArrowRight
} from 'lucide-react';
import { ViewState } from '../types';
import { useData } from '../context/DataContext';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  onSearch: (term: string) => void;
  onScan: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, onLogout, onSearch, onScan }) => {
  const { notifications, markNotificationRead } = useData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMovementsOpen, setIsMovementsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchInput);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
            
            <button 
              onClick={onScan}
              className="lg:hidden ml-2 p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
              title="Escanear QR"
            >
              <ScanLine size={24} />
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
            
            {/* Desktop Scan Button Shortcut */}
            <button 
              onClick={onScan}
              className="hidden md:flex ml-3 items-center gap-2 text-sm text-gray-500 hover:text-green-600 px-3 py-1.5 rounded-full hover:bg-green-50 transition-colors border border-transparent hover:border-green-200"
            >
              <ScanLine size={18} />
              <span>Escanear</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`relative p-2 transition-colors ${isNotificationsOpen ? 'text-green-600 bg-green-50 rounded-full' : 'text-gray-500 hover:text-green-600'}`}
              >
                <Bell size={20} />
                {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden">
                  <div className="p-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-700">Notificaciones</span>
                    <span className="text-xs text-green-600 font-medium cursor-pointer">Marcar leídas</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(note => (
                        <div 
                          key={note.id} 
                          onClick={() => markNotificationRead(note.id)}
                          className={`p-3 border-b border-gray-100 cursor-pointer transition-colors ${note.read ? 'bg-white' : 'bg-blue-50 hover:bg-blue-100'}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full mt-1 ${
                              note.type === 'movement' ? 'bg-blue-100 text-blue-600' :
                              note.type === 'alert' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                            }`}>
                              {note.type === 'movement' ? <Truck size={14} /> : note.type === 'alert' ? <Activity size={14}/> : <User size={14} />}
                            </div>
                            <div>
                              <p className={`text-sm font-semibold text-gray-800 ${!note.read && 'font-bold'}`}>{note.title}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{note.message}</p>
                              <p className="text-[10px] text-gray-400 mt-1">{note.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-400">Sin notificaciones</div>
                    )}
                  </div>
                </div>
              )}
            </div>

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
