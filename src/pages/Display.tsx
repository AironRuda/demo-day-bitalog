import Footer from '../components/presentation/Footer';
import Presentation from '../components/presentation/Presentation';
import PresentatiosFirstSecction from '../components/presentation/PresentatiosFirstSecction';

const Display: React.FunctionComponent = () => {
  return (
    <div>
      <Presentation />
      <PresentatiosFirstSecction />
      <Footer />
    </div>
  );
};

export default Display;
