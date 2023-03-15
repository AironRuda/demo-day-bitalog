import Team from './workteam/Team';
import NotificationField from './novelties/NotificationField';

const TeamInfo: React.FunctionComponent = (props) => {
  return (
    <div className='flex flex-col'>
      <h1 className='text-center text-4xl text-slate-700 font-bold'>EQUIPO</h1>
      <div className='flex md:flex-row flex-col md:items-start items-center mt-5'>
        <NotificationField />
        <Team />
      </div>
    </div>
  );
};

export default TeamInfo;
