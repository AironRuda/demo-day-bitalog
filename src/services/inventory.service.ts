import { getDoc, updateDoc } from 'firebase/firestore';
import { inventoryRef } from '../firebase/config';
import { Material } from '../model/material.model';
import { formatNewInventory } from '../utilities/formatInventory';

export const updateInventory = async (
  inventoryId: string,
  materials: Material[],
  reduceInventory: boolean
) => {
  try {
    const inventory = await (await getDoc(inventoryRef(inventoryId))).data();
    if (inventory) {
      let newInventory;
      if (inventory.materials)
        newInventory = formatNewInventory(
          inventory.materials,
          materials,
          reduceInventory
        );
      else newInventory = materials;
      await updateDoc(inventoryRef(inventoryId), {
        materials: newInventory.map((material) => {
          return {
            material: material.material,
            amount: material.amount,
            unit: material.unit,
          };
        }),
      });
    }
  } catch (error) {
    throw error;
  }
};
