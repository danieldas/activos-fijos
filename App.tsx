import React, { useState } from 'react';
import { DataProvider } from './context/DataContext';
import { Layout } from './components/Layout';
import { Login } from './views/Login';
import { Dashboard } from './views/Dashboard';
import { AssetList } from './views/AssetList';
import { AssetDetail } from './views/AssetDetail';
import { Movements } from './views/Movements';
import { Audit } from './views/Audit';
import { Locations } from './views/Locations';
import { Reports } from './views/Reports';
import { QRScanner } from './views/QRScanner';
import { Asset, ViewState } from './types';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [lastView, setLastView] = useState<ViewState>('dashboard');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [verifiedAssets, setVerifiedAssets] = useState<string[]>([]);

  const handleNavigate = (view: ViewState) => {
    setLastView(currentView);
    setCurrentView(view);
    if (view !== 'asset-detail') {
      setSelectedAsset(null);
    }
    if (view !== 'assets') {
      setGlobalSearchTerm('');
    }
  };

  const handleGlobalSearch = (term: string) => {
    setGlobalSearchTerm(term);
    setLastView(currentView);
    setCurrentView('assets');
  };

  const handleScanRequest = () => {
    setLastView(currentView);
    setCurrentView('qr-scanner');
  };

  const handleSelectAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setLastView(currentView);
    setCurrentView('asset-detail');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
    setVerifiedAssets([]);
  };

  const handleScanComplete = (code: string) => {
    if (!verifiedAssets.includes(code)) {
      setVerifiedAssets(prev => [...prev, code]);
    }
    setCurrentView('audit');
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
        return <Audit 
          onScanRequest={handleScanRequest} 
          verifiedCodes={verifiedAssets}
        />;
      case 'qr-scanner':
        return <QRScanner 
          onBack={() => setCurrentView(lastView)} 
          onScanComplete={handleScanComplete}
        />;
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

  if (currentView === 'qr-scanner') {
      return <QRScanner onBack={() => setCurrentView(lastView)} onScanComplete={handleScanComplete} />;
  }

  return (
    <Layout 
      currentView={currentView} 
      onNavigate={handleNavigate} 
      onLogout={handleLogout}
      onSearch={handleGlobalSearch}
      onScan={handleScanRequest}
    >
      {renderContent()}
    </Layout>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
