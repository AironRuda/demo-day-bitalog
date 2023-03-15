import { getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { userRef } from '../../../firebase/config';

interface Props {
  workerId: string;
}

const Member: React.FunctionComponent<Props> = ({ workerId }) => {
  const [name, setName] = useState(workerId);

  useEffect(() => {
    getDoc(userRef(workerId)).then((res) => {
      const user = res.data();
      user && setName(user.name);
    });
  }, []);

  return (
    <li className='flex flex-col items-center py-5 m-2 rounded-xl bg-primary w-72'>
      <img
        src={`https://api.dicebear.com/5.x/lorelei/svg?seed=${workerId}`}
        alt=''
        className='w-24 h-24 mb-3 rounded-full shadow-lg bg-white'
      />
      <h5 className='mb-1 text-xl text-slate-900 font-bold'>
        {workerId !== name && name}
      </h5>
      <small className='text-sm text-white cursor-text select-text'>{workerId}</small>
    </li>
  );
};

export default Member;
