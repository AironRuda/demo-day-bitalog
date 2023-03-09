import { Activity } from '../model/activity.model';

export function sortByPriority(activities: Activity[]) {
  return activities.sort((a, b) => {
    if (a.priority > b.priority) return -1;
    if (a.priority < b.priority) return 1;
    return 0;
  });
}

export function formatActivitiesList(activities: Activity[], filter: boolean) {
  const pending = activities.filter((activity) => !activity.completed);
  const done = activities.filter((activity) => activity.completed);
  if (filter) return [...sortByPriority(pending), ...sortByPriority(done)];
  return [...sortByPriority(done), ...sortByPriority(pending)];
}
