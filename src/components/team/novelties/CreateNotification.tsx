import { useState } from 'react';
import { useSelector } from 'react-redux';
import { imgLogo, plusLogo } from '../../../assets/icons';
import { selectUser } from '../../../context/selectors';
import Swal from 'sweetalert2';
import { handleCreateNovelty } from '../../../handlers/handleNovelties';
import { filterPrimary } from '../../common/customStyles';

const CreateNotification: React.FunctionComponent = (props) => {
  const user = useSelector(selectUser);

  const [text, setText] = useState('');
  const [img, setImg] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (img !== null || text !== '') {
      await handleCreateNovelty(user.id, text, img);
      Swal.fire({
        text: 'Su novedad fue publicada correctamente 😀',
        icon: 'success',
        confirmButtonColor: '#31C48D',
        confirmButtonText: 'Aceptar',
      });
      setText('');
      setImg(null);
      setError('');
    } else {
      setError('Se requiere un dato para crear una novedad');
    }
  };

  return (
    <form
      className='px-3 pt-4 rounded-md flex flex-col items-center border-2 border-primary w-11/12 mt-3'
      onSubmit={handleSend}
    >
      <h3 className='text-slate-500 font-bold mb-4 text-lg'>Generar notificación</h3>
      <div className='flex sm:flex-row flex-col items-center gap-2 md:w-4/5 w-full mx-5 mb-10'>
        <textarea
          className='textarea textarea-bordered textarea-sm p-2 rounded-md border-2 bg-white border-primary mx-2 text-black h-10 md:w-3/4 w-full px-5 text-xl'
          placeholder='Describa la novedad'
          name='text'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <div className='sm:w-1/4 w-full flex justify-center gap-5'>
          <input
            type='file'
            name='file'
            style={{ display: 'none' }}
            id='file'
            onChange={(e) => e.target.files && setImg(e.target.files[0])}
          />
          <label htmlFor='file'>
            <img
              className='cursor-pointer'
              style={{ ...filterPrimary, width: 35, minWidth: 30 }}
              src={imgLogo}
              alt='imgLogo'
            />
          </label>
          <button type='submit'>
            <img
              src={plusLogo}
              style={{ ...filterPrimary, width: 35, minWidth: 30 }}
              className='cursor-pointer'
              alt=''
            />
          </button>
        </div>
      </div>
      <span className='text-red-500 text-center -mt-6 mb-2'>
        {!!error && error}
      </span>
    </form>
  );
};

export default CreateNotification;
