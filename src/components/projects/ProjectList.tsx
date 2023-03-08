import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedProject, selectProject } from '../../context/projectsSlice';
import { selectProjects } from '../../context/selectors';
import { updateStatusProject } from '../../context/projectsSlice';
import { folder } from '../../assets/icons';

const ProjectList: React.FunctionComponent = (props) => {
  const projects = useSelector(selectProjects);
  const currentProject = useSelector(getSelectedProject);
  const dispatch = useDispatch();

  useEffect(() => {
    projects.forEach((project) => {
      if (
        (project.activities.every((activity) => activity.completed === true) &&
          project.completed === false) ||
        (project.activities.some((activity) => activity.completed === false) &&
          project.completed === true)
      ) {
        dispatch(updateStatusProject(project.id));
      }
    });
  }, [projects]);

  return (
    <div className='h-4/5 w-full flex justify-center items-center'>
      {projects.length ? (
        <ul className='h-full md:w-4/5 border-2 py-5 px-3 mx-2 border-secondary flex flex-wrap justify-center items-center lg:gap-10 gap-5 overflow-auto'>
          {projects
            .filter((item) => item)
            .sort((a, b) => {
              if (!a.completed || !a.activities.length) return -1;
              if (a.completed) return 1;
              return 0;
            })
            .map((project) => (
              <li
                key={project.id}
                className={`flex flex-col md:w-40 w-36 h-36 justify-center items-center p-3 rounded cursor-pointer ${
                  !project.completed
                    ? 'text-white bg-primary'
                    : !project.activities.length
                    ? 'bg-secondary text-white'
                    : 'text-slate-700 bg-slate-300'
                } ${
                  currentProject === project.id && 'border-2 border-black'
                }`}
                onClick={() => {
                  dispatch(selectProject(project.id));
                }}
              >
                <img
                  className='w-20'
                  style={
                    !project.completed || !project.activities.length
                      ? {
                          filter:
                            'invert(100%) sepia(94%) saturate(0%) hue-rotate(248deg) brightness(106%) contrast(106%)',
                        }
                      : {}
                  }
                  src={folder}
                />
                <b>{project.name}</b>
              </li>
            ))}
        </ul>
      ) : (
        <div className='text-3xl text-center px-20 text-secondary'>
          En el momento no hay proyectos disponibles, crea alguno o contacta a
          tu encargado para que te asigne a alguno
        </div>
      )}
    </div>
  );
};

export default ProjectList;
