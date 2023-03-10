import { Material } from '../model/material.model';

export const getMajorSpents = (inventory: Material[]) => {
  return inventory.sort((a, b) => a.amount - b.amount).reverse().slice(0, 5)
};

export const formatNewInventory = (
  baseInventory: Material[],
  newMaterials: Material[]
) => {
  const newInventory = [...baseInventory];
  newMaterials.forEach((material) => {
    if (newInventory.find((item) => item.material === material.material)) {
      const indexItem = newInventory.findIndex(
        (item) => item.material === material.material
      );
      newInventory[indexItem].amount += material.amount;
    } else {
      newInventory.push(material);
    }
  });
  return newInventory;
};
