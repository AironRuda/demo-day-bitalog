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

  test('Return the reduced array', () => {
    expect(formatNewInventory(baseInventory, addition, true)).toStrictEqual(
      reducedInventory
    );
  });
});
