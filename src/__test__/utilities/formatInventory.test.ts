import { InventoryFilter } from '../../model/inventory.model';
import { Material } from '../../model/material.model';
import {
  formatNewInventory,
  formatSpentsList,
} from '../../utilities/formatInventory';
import {
  addition,
  alphabeticallyInventory,
  baseInventory,
  majorAmountInventory,
  minAmountInventory,
  newInventory,
  reducedInventory,
  reverseAlphabeticallyInventory,
} from '../mocks/inventory.mock';

describe('The utilities of inventory page works', () => {
  test('Return the aumented array', () => {
    expect(formatNewInventory(baseInventory, addition, false)).toStrictEqual(
      newInventory
    );
  });

  test('Return the expected formatted array', () => {
    const options: [Material[], InventoryFilter][] = [
      [alphabeticallyInventory, ''],
      [reverseAlphabeticallyInventory, 'reverse'],
      [majorAmountInventory, 'max'],
      [minAmountInventory, 'min'],
    ];

    options.forEach((item) => {
      expect(formatSpentsList(newInventory, item[1])).toStrictEqual(item[0]);
    });
  });

  test('Return the reduced array', () => {
    expect(formatNewInventory(baseInventory, addition, true)).toStrictEqual(
      reducedInventory
    );
  });
});
