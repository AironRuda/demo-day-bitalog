import { formatActivitiesList } from '../utilities/formatActivities';
import {
  orderedActivitiesFirstDone,
  orderedActivitiesFirstPending,
  unorderedActivities,
} from './activities.mock';

describe('The utilities of the activities page works', () => {
  test('Obtain the expected formated array', () => {
    expect(formatActivitiesList(unorderedActivities, true)).toStrictEqual(
      orderedActivitiesFirstPending
    );

    expect(formatActivitiesList(unorderedActivities, false)).toStrictEqual(
      orderedActivitiesFirstDone
    );
  });
});
