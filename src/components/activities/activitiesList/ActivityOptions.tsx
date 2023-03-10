import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRol } from '../../../context/selectors';
import { Activity } from '../../../model/activity.model';
import Swal from 'sweetalert2';

interface Props {
  confirmDelete(): Promise<void>;
  confirmChangeStatus(): Promise<void>;
  currentActivity: Activity;
}

const ActivityOptions: React.FunctionComponent<Props> = ({
  confirmDelete,
  confirmChangeStatus,
  currentActivity,
}) => {
  const navigate = useNavigate();
  const rol = useSelector(selectRol);

  async function handleClickDelete() {
    Swal.fire({
      title: '¿Estás seguro de eliminar la actividad?',
      text: 'Al eliminar la actividad, si esta ya se ha cumplido su registro permanecerá en el inventario. Para evitar esto puede modificar el estado de la actividad antes de elimnarla.',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'red',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await confirmDelete();
      }
    });
  }
  async function handleClickStatus() {
    Swal.fire({
      title: '¿Estás seguro de finalizar la actividad?',
      text: 'Al cumplir con la actividad, sólo el encargado del proyecto podrá volver a modificar su estado. En caso de no estar seguro puede enviar una notificación a su encargado por medio del muro en la sección de equipo',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Finalizar',
      confirmButtonColor: '#31C48D',
    }).then(async (result) => {
      if (result.isConfirmed) {
        confirmChangeStatus();
      }
    });
  }

  return (
    <>
      {rol === 'admin' ? (
        <div className='h-full flex md:flex-row flex-col md:justify-around justify-between items-center'>
          <span
            className='cursor-pointer text-secondary'
            onClick={() => navigate(`update-project/${currentActivity.id}`)}
          >
            ✏️
          </span>
          <span
            className='cursor-pointer text-red-500'
            onClick={handleClickDelete}
          >
            ❌
          </span>
        </div>
      ) : (
        <div className='flex justify-center'>
          {!currentActivity?.completed && (
            <button
              className='btn btn-xs btn-primary'
              type='button'
              onClick={handleClickStatus}
            >
              Cumplir
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ActivityOptions;
