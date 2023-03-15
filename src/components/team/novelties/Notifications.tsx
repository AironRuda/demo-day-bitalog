import { useSelector } from 'react-redux';
import { getNovelties } from '../../../context/noveltiesSlice';
import { Novelty } from '../../../model/novelties.model';
import NoveltyCard from './NoveltyCard';

const Notifications: React.FunctionComponent = (props) => {
  const novelties = [...useSelector(getNovelties)];

  return (
    <ul className='flex flex-col items-center justify-between w-full'>
      {novelties.length ? (
        novelties
          .reverse()
          .map((novelty: Novelty) => (
            <NoveltyCard key={novelty.noveltyId} novelty={novelty} />
          ))
      ) : (
        <li>
          <h5 className='text-3xl text-center px-20 text-secondary md:mt-20 mt-5'>
            No se han reportado novedades
          </h5>
        </li>
      )}
    </ul>
  );
};

export default Notifications;
