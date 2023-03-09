import { useNavigate } from 'react-router-dom';
import Footer from '../components/presentation/Footer';
import Presentation from '../components/presentation/Presentation';
import PresentatiosFirstSecction from '../components/presentation/PresentatiosFirstSecction';

interface IAppProps {}

const Display: React.FunctionComponent<IAppProps> = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <Presentation />
      <PresentatiosFirstSecction />
      <Footer />
    </div>
  );
};

export default Display;
