import React, { useState } from 'react';
import { User, Lock, Activity } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      // Mock authentication
      onLogin();
    } else {
      setError('Por favor ingrese usuario y contraseña');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6f9] p-4 font-sans">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full flex flex-col">
        <div className="bg-[#0D47A1] p-8 text-center relative overflow-hidden">
           {/* Background Pattern */}
           <div className="absolute top-0 left-0 w-full h-full opacity-10">
             <div className="absolute right-0 top-0 w-32 h-32 bg-white rounded-full transform translate-x-10 -translate-y-10"></div>
             <div className="absolute left-0 bottom-0 w-24 h-24 bg-white rounded-full transform -translate-x-10 translate-y-10"></div>
           </div>

           <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-green-600 font-bold text-2xl mx-auto mb-4 border-4 border-green-400">
              <Activity size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-wide font-['Exo']">Activa360</h1>
            <p className="text-blue-100 mt-2 text-sm">Gestión Inteligente de Activos</p>
           </div>
        </div>
        
        <div className="p-8 pt-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Usuario</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                  placeholder="admin"
                />
                <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                  placeholder="••••••"
                />
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              </div>
            </div>

            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-100 flex items-center justify-center">{error}</div>}

            <button 
              type="submit" 
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-md transform active:scale-[0.98]"
            >
              Iniciar Sesión
            </button>
            
            <div className="text-center mt-4">
              <a href="#" className="text-sm text-[#0D47A1] font-medium hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
          </form>
        </div>
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-500">© 2023 Activa360 Startup</p>
        </div>
      </div>
    </div>
  );
};
