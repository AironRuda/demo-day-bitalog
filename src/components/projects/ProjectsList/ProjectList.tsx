import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProjects } from '../../../context/selectors';
import { updateStatusProject } from '../../../context/projectsSlice';
import Filter from './Filter';
import RenderProjects from './RenderProjects';
import { updateDoc } from 'firebase/firestore';
import { projectsRef } from '../../../firebase/config';

const ProjectList: React.FunctionComponent = (props) => {
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');

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
        try {
          await updateDoc(projectsRef(project.id), {
            completed: !project.completed,
          });
        } catch (error) {
          console.log(error);
        }
        dispatch(updateStatusProject(project.id));
      }
    });
  }, [projects]);

  return (
    <div className='h-full w-full flex flex-col gap-10 justify-center items-center py-5 px-3 mx-2 '>
      <Filter
        filter={filter}
        setFilter={(filter: string) => setFilter(filter)}
      />
      {projects.length ? (
        <ul className='h-full md:w-4/5 flex flex-wrap lg:justify-start justify-center items-center lg:gap-10 gap-5'>
          {<RenderProjects filter={filter} projects={projects} />}
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
