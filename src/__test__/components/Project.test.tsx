import Project from '../../components/projects/ProjectsList/Project';
import { render, screen } from '@testing-library/react';
import { orderedProjects } from '../mocks/projects.mock';
import '@testing-library/jest-dom/extend-expect';

describe('Project', () => {
  test('Should appear with the corresponding color', () => {
    render(
      <Project
        project={orderedProjects[0]}
        currentProject=''
        handleClick={() => {}}
      />
    );

    const item = screen.findByRole('listitem');

    expect(item)
  });
});

//why doesn't appear the matchers of '@testing-library/jest-dom/matchers' if I have extend it to the expect of vitest