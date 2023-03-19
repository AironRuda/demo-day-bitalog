import {
  pointerLogo,
  historyLogo,
  listLogo,
  priorityListLogo,
  projectsLogo,
  taskLogo,
  userLogo,
} from '../../assets/icons';

const PresentatiosFirstSecction: React.FunctionComponent = (props) => {
  return (
    <section className='text-white bg-secondary'>
      <div className='max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8 mx-auto'>
        <div className=' grid grid-cols-1 gap-8  md:grid-cols-2 md:gap-12 lg:grid-cols-3'>
          <div className='flex items-center gap-4'>
            <span className='shrink-0 rounded-lg bg-primary p-4'>
              <img src={pointerLogo} />
            </span>
            <div>
              <h2 className='text-lg font-bold'>Plataforma de fácil acceso</h2>
              <p className='mt-1 text-sm text-white'>
                Acceso desde cualquier dispositivo con una conexión a internet.
              </p>
            </div>
          </div>

          <div className='flex items-center gap-4 '>
            <span className='shrink-0 rounded-lg bg-primary p-4'>
              <img src={listLogo} />
            </span>
            <div>
              <h2 className='text-lg font-bold'>
                Monitoreo de actividades y materiales
              </h2>
              <p className='mt-1 text-sm text-white'>
                Fácil identificación de material gastado y personal asignado
              </p>
            </div>
          </div>

          <div className='flex items-center gap-4 '>
            <span className='shrink-0 rounded-lg bg-primary p-4'>
              <img src={taskLogo} />
            </span>
            <div>
              <h2 className='text-lg font-bold'>
                Programación y asignación de tareas
              </h2>
              <p className='mt-1 text-sm text-white'>
                Creación de tareas asignando a un personal y material a
                implementar
              </p>
            </div>
          </div>

          <div className='flex items-center gap-4 '>
            <span className='shrink-0 rounded-lg bg-primary p-4'>
              <img src={historyLogo} />
            </span>
            <div>
              <h2 className='text-lg font-bold'>
                Registro de historial de actividades completadas
              </h2>
              <p className='mt-1 text-sm text-white'>
                Es posible identificar tareas pendientes y realizadas
              </p>
            </div>
          </div>

          <div className='flex items-center gap-4 '>
            <span className='shrink-0 rounded-lg bg-primary p-4'>
              <img src={userLogo} />
            </span>
            <div>
              <h2 className='text-lg font-bold'>Manejo de roles</h2>
              <p className='mt-1 text-sm text-white'>
                Diferencia de responsabilidades y permisos según el rol de
                usuario
              </p>
            </div>
          </div>

          <div className='flex items-center gap-4 '>
            <span className='shrink-0 rounded-lg bg-primary p-4'>
              <img src={projectsLogo} />
            </span>
            <div>
              <h2 className='text-lg font-bold'>Múltiples proyectos</h2>
              <p className='mt-1 text-sm text-white'>
                Un solo usuario tiene la posibilidad de administrar múltiples
                proyectos
              </p>
            </div>
          </div>
          <div className='flex items-center gap-4 '>
            <span className='shrink-0 rounded-lg bg-primary p-4'>
              <img src={priorityListLogo} />
            </span>
            <div>
              <h2 className='text-lg font-bold'>Prioridad en actividades</h2>
              <p className='mt-1 text-sm text-white'>
                Es posible identificar la prioridad de la actividad según se
                requiera
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresentatiosFirstSecction;
