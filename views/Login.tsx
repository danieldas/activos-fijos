import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

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
        <div className="bg-[#0D47A1] p-8 text-center">
           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#0D47A1] font-bold text-2xl mx-auto mb-4 border-4 border-blue-100">
            U
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide font-['Exo']">UMSS Activos</h1>
          <p className="text-blue-200 mt-2 text-sm">Sistema de Gestión de Activos Fijos</p>
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
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D32F2F] focus:border-transparent outline-none transition-all"
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
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D32F2F] focus:border-transparent outline-none transition-all"
                  placeholder="••••••"
                />
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              </div>
            </div>

            {error && <div className="bg-red-50 text-[#D32F2F] text-sm p-3 rounded-md border border-red-100 flex items-center justify-center">{error}</div>}

            <button 
              type="submit" 
              className="w-full bg-[#D32F2F] text-white py-3 rounded-lg font-bold hover:bg-red-800 transition-colors shadow-md transform active:scale-[0.98]"
            >
              Iniciar Sesión
            </button>
            
            <div className="text-center mt-4">
              <a href="#" className="text-sm text-[#0D47A1] font-medium hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
          </form>
        </div>
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-500">© 2023 Universidad Mayor de San Simón</p>
        </div>
      </div>
    </div>
  );
};