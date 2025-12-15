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
import { QRScanner } from './views/QRScanner';
import { Asset, ViewState } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [lastView, setLastView] = useState<ViewState>('dashboard'); // Track history for back button
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  
  // State to track assets verified by QR scan
  const [verifiedAssets, setVerifiedAssets] = useState<string[]>([]);

  const handleNavigate = (view: ViewState) => {
    setLastView(currentView); // Save current view before navigating
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
    // Add code to verified list if not already present
    if (!verifiedAssets.includes(code)) {
      setVerifiedAssets(prev => [...prev, code]);
    }
    // After scanning, it usually makes sense to see the Audit list to confirm verification
    // Or if we came from somewhere else, maybe just go back there?
    // For this use case (Inventory), going to Audit is the most logical flow.
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

  // If viewing QR Scanner, we might want to hide the layout sidebar/header for full immersion
  // or keep it. Let's keep it consistent but overlay handled inside component.
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

export default App;
