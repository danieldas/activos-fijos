export type AssetStatus = 'Bueno' | 'Regular' | 'Malo';

export interface Asset {
  id: string;
  code: string;
  name: string;
  brand: string;
  model: string;
  series: string;
  location: string;
  responsible: string;
  status: AssetStatus;
  image?: string;
}

export interface Movement {
  id: string;
  assetName: string;
  origin: string;
  destination: string;
  date: string;
  type: 'Asignación' | 'Traslado' | 'Baja';
}

export interface Location {
  id: string;
  name: string;
  type: 'Campus' | 'Bloque' | 'Aula' | 'Laboratorio' | 'Oficina' | 'Depósito';
  parent: string; // e.g., "Campus Central > Bloque B"
  assetCount: number;
  status: 'Operativo' | 'Mantenimiento' | 'Clausurado';
  manager: string;
}

export type ViewState = 
  | 'dashboard' 
  | 'assets' 
  | 'asset-detail' 
  | 'movements' 
  | 'audit' 
  | 'locations' 
  | 'reports' 
  | 'settings';