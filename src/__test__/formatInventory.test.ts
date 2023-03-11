import {
  formatNewInventory,
  formatSpentsList,
} from '../utilities/formatInventory';
import {
  addition,
  alphabeticallyInventory,
  baseInventory,
  majorAmountInventory,
  minAmountInventory,
  newInventory,
  reverseAlphabeticallyInventory,
} from './inventory.mock';

describe('The utilities of inventory page works', () => {
  test('Return the correct new array', () => {
    expect(formatNewInventory(baseInventory, addition)).toStrictEqual(
      newInventory
    );
  });

  test('Return the formatted array', () => {
    expect(formatSpentsList(newInventory, '')).toStrictEqual(
      alphabeticallyInventory
    );
    expect(formatSpentsList(newInventory, 'reverse')).toStrictEqual(
      reverseAlphabeticallyInventory
    );
    expect(formatSpentsList(newInventory, 'max')).toStrictEqual(
      majorAmountInventory
    );
    expect(formatSpentsList(newInventory, 'min')).toStrictEqual(
      minAmountInventory
    );
  });
});
