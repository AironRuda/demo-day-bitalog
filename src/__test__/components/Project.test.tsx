import Project from '../../components/projects/ProjectsList/Project';
import { cleanup, render, screen } from '@testing-library/react';
import { orderedProjects } from '../mocks/projects.mock';

describe('Project', () => {
  it('should with his corresponding class', async () => {
    const alternatives: [Project, string][] = [
      [orderedProjects[0], 'bg-primary'],
      [orderedProjects[1], 'bg-secondary'],
      [orderedProjects[2], 'bg-slate-300'],
    ];

    alternatives.forEach(async (alternative) => {
      render(
        <Project
          project={alternative[0]}
          currentProject=''
          handleClick={() => {}}
        />
      );

      const item = await screen.findByRole('listitem');

      expect(item).toHaveClass(alternative[1]);
      cleanup();
    });
  });
});
