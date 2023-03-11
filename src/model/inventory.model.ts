import { Material } from './material.model';

export interface Inventory {
  materials: Material[];
}

export type InventoryFilter = '' | 'reverse' | 'max' | 'min';
