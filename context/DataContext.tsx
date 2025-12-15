import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Asset, Movement, Location } from '../types';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'movement' | 'audit' | 'alert';
  read: boolean;
}

interface DataContextType {
  assets: Asset[];
  movements: Movement[];
  notifications: Notification[];
  locations: Location[];
  addAsset: (asset: Asset) => void;
  addMovement: (movement: Movement) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  markNotificationRead: (id: string) => void;
  getAssetByCode: (code: string) => Asset | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialAssets: Asset[] = [
  { id: '1', code: 'UMSS-00123', name: 'Proyector Epson X41', brand: 'Epson', model: 'X41', series: 'SN-9982', location: 'Aula 402', responsible: 'Juan Pérez', status: 'Bueno' },
  { id: '2', code: 'UMSS-00124', name: 'Silla Ejecutiva', brand: 'Muebles Bo', model: 'Ergo', series: 'N/A', location: 'Secretaría', responsible: 'Ana García', status: 'Regular' },
  { id: '3', code: 'UMSS-00125', name: 'Laptop Dell Inspiron', brand: 'Dell', model: '5510', series: 'DLL-3321', location: 'Lab. Comp 1', responsible: 'Carlos Admin', status: 'Malo' },
  { id: '4', code: 'UMSS-00126', name: 'Pizarra Acrílica', brand: 'Generico', model: '2x1m', series: 'N/A', location: 'Aula 201', responsible: 'Roberto M.', status: 'Bueno' },
  { id: '5', code: 'UMSS-00127', name: 'Microscopio Zeiss', brand: 'Zeiss', model: 'Primo Star', series: 'ZS-112', location: 'Lab. Bio', responsible: 'Dra. López', status: 'Bueno' },
];

const initialMovements: Movement[] = [
  { id: '1', assetName: 'Proyector Epson X41', origin: 'Almacén Central', destination: 'Aula 402', date: '2023-10-25', type: 'Asignación' },
  { id: '2', assetName: 'Laptop Dell Inspiron', origin: 'Lab. Computación', destination: 'Soporte Técnico', date: '2023-10-24', type: 'Traslado' },
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [movements, setMovements] = useState<Movement[]>(initialMovements);
  const [notifications, setNotifications] = useState<Notification[]>([
     { id: '1', title: 'Bienvenido', message: 'Sistema iniciado correctamente.', time: 'Ahora', type: 'alert', read: false }
  ]);
  const [locations] = useState<Location[]>([]); // Placeholder for now

  const addAsset = (asset: Asset) => {
    setAssets(prev => [asset, ...prev]);
    addNotification({
      title: 'Nuevo Activo',
      message: `${asset.name} (${asset.code}) ha sido registrado.`,
      type: 'alert'
    });
  };

  const updateAsset = (id: string, updates: Partial<Asset>) => {
    setAssets(prev => prev.map(asset => asset.id === id ? { ...asset, ...updates } : asset));
  };

  const addMovement = (movement: Movement) => {
    setMovements(prev => [movement, ...prev]);
    
    // Find asset to update its location automatically
    const asset = assets.find(a => a.name === movement.assetName || a.code === movement.assetName); // Simple matching
    if (asset) {
        updateAsset(asset.id, { location: movement.destination });
    }

    addNotification({
      title: 'Traslado Registrado',
      message: `Activo movido a ${movement.destination}`,
      type: 'movement'
    });
  };

  const addNotification = (note: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNote: Notification = {
      id: Date.now().toString(),
      time: 'Hace un momento',
      read: false,
      ...note
    };
    setNotifications(prev => [newNote, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getAssetByCode = (code: string) => {
    return assets.find(a => a.code === code);
  };

  return (
    <DataContext.Provider value={{ 
      assets, 
      movements, 
      notifications, 
      locations, 
      addAsset, 
      addMovement, 
      updateAsset, 
      markNotificationRead,
      getAssetByCode 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
