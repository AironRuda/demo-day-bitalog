import Project from '../../components/projects/ProjectsList/Project';
import { cleanup, render, screen } from '@testing-library/react';
import { orderedProjects } from '../mocks/projects.mock';

describe('Project', () => {
  afterEach(() => {
    cleanup();
  });

  describe('Should appear with the corresponding color', async () => {
    test('should appear as new and selected', async () => {
      render(
        <Project
          project={orderedProjects[0]}
          currentProject={orderedProjects[0].id}
          handleClick={() => {}}
        />
      );

      const item = await screen.findByRole('listitem');

      expect(item).toHaveClass('bg-primary border-4 border-slate-700');
    });
    test('should appear as pending', async () => {
      render(
        <Project
          project={orderedProjects[1]}
          currentProject=''
          handleClick={() => {}}
        />
      );

      const item = await screen.findByRole('listitem');

      expect(item).toHaveClass('bg-secondary');
    });

    test('should appear as done', async () => {
      render(
        <Project
          project={orderedProjects[2]}
          currentProject=''
          handleClick={() => {}}
        />
      );

      const item = await screen.findByRole('listitem');

      expect(item).toHaveClass('bg-slate-300');
    });
  });
});
