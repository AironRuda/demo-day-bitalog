import { formatProjectsList } from '../../utilities/formatProjects';
import { orderedProjects, unorderedProjects } from '../mocks/projects.mock';

describe('The utilities of the projects page works', () => {
  test('obtain the expected formated array', () => {
    expect(formatProjectsList(unorderedProjects, '')).toStrictEqual(
      orderedProjects
    );
    expect(formatProjectsList(unorderedProjects, 'new')).toStrictEqual([
      orderedProjects[0],
    ]);
    expect(formatProjectsList(unorderedProjects, 'pending')).toStrictEqual([
      orderedProjects[1],
    ]);
    expect(formatProjectsList(unorderedProjects, 'done')).toStrictEqual([
      orderedProjects[2],
    ]);
  });
});
