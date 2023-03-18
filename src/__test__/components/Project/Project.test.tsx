import Project from '../../../components/projects/ProjectsList/Project';
import { cleanup, render, screen } from '@testing-library/react';
import { orderedProjects } from '../../mocks/projects.mock';

describe('Project', () => {
  afterEach(() => cleanup());

  it('should appears with his corresponding color', async () => {
    const alternatives: [Project, string][] = [
      [orderedProjects[0], 'bg-primary'],
      [orderedProjects[1], 'bg-[#3A80BF]'],
      [orderedProjects[2], 'bg-slate-300'],
    ];

    alternatives.forEach(async (alternative) => {
      cleanup();

      render(
        <Project
          project={alternative[0]}
          currentProject={alternative[0].id}
          handleClick={() => {}}
        />
      );

      const item = await screen.findByRole('listitem');

      expect(item).toHaveClass(alternative[1]);
    });
  });
  it('should appears with a border if its id is equal to the current project', async () => {
    render(
      <Project
        project={orderedProjects[0]}
        currentProject={orderedProjects[0].id}
        handleClick={() => {}}
      />
    );
    const item = await screen.findByRole('listitem');

    expect(item).toHaveClass('border-4 border-slate-700');
  });
});
