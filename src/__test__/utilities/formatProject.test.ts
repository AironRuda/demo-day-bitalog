import { filterProjects, Project } from '../../model/projects.model';
import { formatProjectsList } from '../../utilities/formatProjects';
import { orderedProjects, unorderedProjects } from '../mocks/projects.mock';

describe('The utilities of the projects page works', () => {
  test('obtain the expected formated array', () => {
    const options: [filterProjects, Project[]][] = [
      ['', orderedProjects],
      ['new', [orderedProjects[0]]],
      ['pending', [orderedProjects[1]]],
      ['done', [orderedProjects[2]]],
    ];
    options.forEach((item) => {
      expect(formatProjectsList(unorderedProjects, item[0])).toStrictEqual(
        item[1]
      );
    });
  });
});
