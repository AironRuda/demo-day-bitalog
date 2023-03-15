import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProjects } from '../../../context/selectors';
import {
  selectProject,
  updateStatusProject,
} from '../../../context/projectsSlice';
import { getSelectedProject } from '../../../context/selectors';
import Filter from './Filter';
import { updateDoc } from 'firebase/firestore';
import { projectsRef } from '../../../firebase/config';
import Project from './Project';
import { formatProjectsList } from '../../../utilities/formatProjects';
import { filterProjects } from '../../../model/projects.model';

const ProjectList: React.FunctionComponent = (props) => {
  const projects = useSelector(selectProjects);
  const currentProject = useSelector(getSelectedProject);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<filterProjects>('');

  function handleClick(id: string) {
    dispatch(selectProject(id));
  }

  useEffect(() => {
    projects.forEach(async (project) => {
      if (
        (project.activities.every((activity) => activity.completed === true) &&
          project.completed === false &&
          !!project.activities.length) ||
        (project.activities.some((activity) => activity.completed === false) &&
          project.completed === true &&
          !!project.activities.length)
      ) {
        dispatch(updateStatusProject());
        try {
          await updateDoc(projectsRef(project.id), {
            completed: !project.completed,
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  }, [projects]);

  return (
    <div className='h-full w-full flex flex-col gap-10 justify-center items-center py-5 px-3 mx-2 '>
      <Filter
        filter={filter}
        setFilter={(filter: filterProjects) => setFilter(filter)}
      />
      {projects.length ? (
        <ul className='h-full md:w-4/5 flex flex-wrap lg:justify-start justify-center items-center lg:gap-10 gap-5'>
          {formatProjectsList(projects, filter).map((project) => (
            <Project
              key={project.id}
              project={project}
              currentProject={currentProject}
              handleClick={handleClick}
            />
          ))}
        </ul>
      ) : (
        <div className='text-3xl text-center px-20 text-secondary'>
          En el momento no hay proyectos disponibles, crea alguno o contacta a
          tu encargado para que te asigne a alguno 🧐
        </div>
      )}
    </div>
  );
};

export default ProjectList;
