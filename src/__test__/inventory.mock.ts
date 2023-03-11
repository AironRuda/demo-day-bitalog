import { Material } from '../model/material.model';

export const baseInventory: Material[] = [
  { amount: 15, material: 'carbón', unit: 'units' },
  { amount: 25, material: 'arena', unit: 'units' },
  { amount: 20, material: 'tierra', unit: 'units' },
];

export const addition: Material[] = [
  { amount: 25, material: 'arena', unit: 'units' },
  { amount: 30, material: 'vidrio', unit: 'units' },
];

export const newInventory: Material[] = [
  { amount: 15, material: 'carbón', unit: 'units' },
  { amount: 50, material: 'arena', unit: 'units' },
  { amount: 20, material: 'tierra', unit: 'units' },
  { amount: 30, material: 'vidrio', unit: 'units' },
];

export const alphabeticallyInventory: Material[] = [
  { amount: 50, material: 'arena', unit: 'units' },
  { amount: 15, material: 'carbón', unit: 'units' },
  { amount: 20, material: 'tierra', unit: 'units' },
  { amount: 30, material: 'vidrio', unit: 'units' },
];

export const reverseAlphabeticallyInventory: Material[] = [
  { amount: 30, material: 'vidrio', unit: 'units' },
  { amount: 20, material: 'tierra', unit: 'units' },
  { amount: 15, material: 'carbón', unit: 'units' },
  { amount: 50, material: 'arena', unit: 'units' },
];

export const majorAmountInventory: Material[] = [
  { amount: 50, material: 'arena', unit: 'units' },
  { amount: 30, material: 'vidrio', unit: 'units' },
  { amount: 20, material: 'tierra', unit: 'units' },
  { amount: 15, material: 'carbón', unit: 'units' },
];

export const minAmountInventory: Material[] = [
  { amount: 15, material: 'carbón', unit: 'units' },
  { amount: 20, material: 'tierra', unit: 'units' },
  { amount: 30, material: 'vidrio', unit: 'units' },
  { amount: 50, material: 'arena', unit: 'units' },
];
