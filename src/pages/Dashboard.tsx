import { Unsubscribe } from 'firebase/auth';
import { DocumentData, DocumentSnapshot, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Logout from '../components/common/Logout';
import Navbar from '../components/common/Navbar';
import { setNovelties } from '../context/noveltiesSlice';
import { getSelectedProject } from '../context/selectors';
import { selectUser } from '../context/selectors';
import { setWorkers } from '../context/workersSlice';
import { searchWorkers } from '../firebase/queries';
import { listenNovelty } from '../services/novelty.service';

const Dashboard: React.FunctionComponent = (props) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentProjectId = useSelector(getSelectedProject);

  useEffect(() => {
    getDocs(searchWorkers).then((response) => {
      const workers = response.docs.map((doc) => {
        return { id: doc.id, name: doc.data().name };
      });
      dispatch(setWorkers(workers));
    });
  }, []);

  useEffect(() => {
    let unsub: Unsubscribe | undefined;
    if (!!currentProjectId) {
      listenNovelty(
        currentProjectId,
        (novelties: DocumentSnapshot<DocumentData>) =>
          dispatch(setNovelties(novelties.data()?.novelties ?? []))
      ).then((res) => {
        unsub = res;
      });
    }
    return () => {
      unsub && unsub();
    };
  }, [currentProjectId]);

  useEffect(() => {
    if (user.id === '') navigate('/app');
  }, [user]);

  return (
    <div className='w-screen h-full'>
      <Logout />
      <main className='pt-12 w-screen h-fit pb-32 bg-white'>
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};

export default Dashboard;
