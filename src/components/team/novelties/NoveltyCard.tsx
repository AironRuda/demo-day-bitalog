import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getNovelties } from '../../../context/noveltiesSlice';
import { getCurrentProject, selectUser } from '../../../context/selectors';
import { handleDeleteNotify } from '../../../handlers/handleNovelties';
import { Novelty } from '../../../model/novelties.model';

interface Props {
  novelty: Novelty;
}
const NoveltyCard = ({ novelty }: Props) => {
  const novelties = useSelector(getNovelties) as unknown as Novelty[];
  const admin = useSelector(getCurrentProject)?.adminId;
  const currentUser = useSelector(selectUser).id;

  const handleClick = async (id: string) => {
    await handleDeleteNotify(id, novelties);
    Swal.fire({
      text: 'Su novedad fue completada correctamente 😀',
      icon: 'success',
      confirmButtonColor: '#31C48D',
      confirmButtonText: 'Aceptar',
    });
  };

  return (
    <li className='bg-slate-100 w-full h-fit flex flex-col items-center justify-center rounded-md m-3 p-3 border-2 border-slate-700'>
      {novelty.text?.trim() !== '' && (
        <p className='mt-7 mx-5 px-10 py-2 bg-white w-11/12 text-justify text-slate-800'>
          {novelty.text}
        </p>
      )}
      {novelty.img && (
        <div className='bg-white w-fit p-2'>
          <img src={novelty.img} className='rounded-md mx-auto' alt='' />
        </div>
      )}
      <div className='w-full flex items-center justify-between px-5'>
        <small className='font-bold text-black m-3 p-1'>
          <b>Enviado por:</b>
          <span className='text-slate-800 font-medium'>
            {currentUser === novelty.senderId
              ? ' Usuario actual'
              : admin && admin === novelty.senderId
              ? ' Administrador'
              : ' ' + novelty.senderId}
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
