import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRol } from '../../../context/selectors';
import { Activity } from '../../../model/activity.model';
import { confirmAlert } from '../../../utilities/alert';

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

  async function handleClick(text: string, callback: () => Promise<void>) {
    confirmAlert(text).then(async (result) => {
      if (result.isConfirmed) {
        await callback();
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
            onClick={() =>
              handleClick(
                'Al eliminar la actividad, si esta ya se ha cumplido su registro permanecerá en el inventario. Para evitar esto puede modificar el estado de la actividad antes de elimnarla.',
                confirmDelete
              )
            }
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
              onClick={() =>
                handleClick(
                  'Al cumplir con la actividad, sólo el encargado del proyecto podrá volver a modificar su estado. En caso de no estar seguro puede enviar una notificación a su encargado por medio del muro en la sección de equipo',
                  confirmChangeStatus
                )
              }
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
