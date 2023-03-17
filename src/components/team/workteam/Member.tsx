import { IWorker } from '../../../model/user.model';

interface Props {
  worker: IWorker;
}

const Member: React.FunctionComponent<Props> = ({ worker }) => {
  return (
    <li className='flex flex-col items-center py-5 m-2 rounded-xl bg-primary w-72'>
      <img
        src={`https://api.dicebear.com/5.x/lorelei/svg?seed=${worker.id}`}
        alt=''
        className='w-24 h-24 mb-3 rounded-full shadow-lg bg-white'
      />
      <h5 className='mb-1 text-xl text-slate-900 font-bold'>{worker.name}</h5>
      <small className='text-sm text-white cursor-text select-text'>
        {worker.id}
      </small>
    </li>
  );
};

export default Member;
