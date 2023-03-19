import { useSelector } from 'react-redux';
import {
  getCurrentProject,
  getNovelties,
  getWorkers,
} from '../../../context/selectors';
import { handleDeleteNotify } from '../../../handlers/handleNovelties';
import { Novelty } from '../../../model/novelties.model';
import { successAlert } from '../../../utilities/alert';

interface Props {
  novelty: Novelty;
}
const NoveltyCard = ({ novelty }: Props) => {
  const novelties = useSelector(getNovelties) as unknown as Novelty[];
  const admin = useSelector(getCurrentProject)?.adminId;
  const sender = useSelector(getWorkers).find(
    (worker) => worker.id === novelty.senderId
  );

  const handleClick = async (id: string) => {
    await handleDeleteNotify(id, novelties);
    successAlert('Su novedad fue completada correctamente 😀');
  };

  return (
    <li className='bg-slate-100 w-full h-fit flex flex-col items-center justify-center rounded-md m-3 p-3 border-2 border-slate-700'>
      {novelty.text?.trim() !== '' && (
        <p className='mt-7 mx-5 px-10 py-2 bg-white w-11/12 text-justify text-slate-800'>
          {novelty.text}
        </p>
      )}
      {novelty.img && (
        <div className='bg-white w-fit p-2 mt-7'>
          <img src={novelty.img} className='rounded-md mx-auto' alt='' />
        </div>
      )}
      <div className='w-full flex items-center justify-between px-5'>
        <small className='font-bold text-black m-3 p-1'>
          <b className='mr-2'>Enviado por:</b>
          <span className='text-slate-800 font-medium'>
            {admin === novelty.senderId
              ? 'Administrador'
              : sender?.name ?? novelty.senderId}
          </span>
        </small>
        <button
          className='m-2 p-2 text-2xl'
          onClick={() => handleClick(novelty.noveltyId)}
        >
          ✔
        </button>
      </div>
    </li>
  );
};

export default NoveltyCard;
