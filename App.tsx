import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Login } from './views/Login';
import { Dashboard } from './views/Dashboard';
import { AssetList } from './views/AssetList';
import { AssetDetail } from './views/AssetDetail';
import { Movements } from './views/Movements';
import { Audit } from './views/Audit';
import { Locations } from './views/Locations';
import { Reports } from './views/Reports';
import { Asset, ViewState } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    if (view !== 'asset-detail') {
      setSelectedAsset(null);
    }
    // Clear search term when navigating via menu
    if (view !== 'assets') {
      setGlobalSearchTerm('');
    }
  };

  const handleGlobalSearch = (term: string) => {
    setGlobalSearchTerm(term);
    setCurrentView('assets');
  };

  const handleSelectAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setCurrentView('asset-detail');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'assets':
        return <AssetList onSelectAsset={handleSelectAsset} externalSearchTerm={globalSearchTerm} />;
      case 'asset-detail':
        return selectedAsset ? (
          <AssetDetail 
            asset={selectedAsset} 
            onBack={() => setCurrentView('assets')} 
          />
        ) : (
          <AssetList onSelectAsset={handleSelectAsset} />
        );
      case 'movements':
        return <Movements />;
      case 'audit':
        return <Audit />;
      case 'locations':
        return <Locations />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return (
          <div className="flex items-center justify-center h-full text-gray-400">
            Vista de Configuración (En Desarrollo)
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      currentView={currentView} 
      onNavigate={handleNavigate} 
      onLogout={handleLogout}
      onSearch={handleGlobalSearch}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;
