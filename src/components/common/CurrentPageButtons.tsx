import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  firstPage: string;
  secondPage: string;
  firstButtonText: string;
  secondButtonText: string;
}

const CurrentPageButtons: React.FunctionComponent<Props> = ({
  firstPage,
  firstButtonText,
  secondPage,
  secondButtonText,
}) => {
  const selectedButton = useLocation().pathname.split('/').at(-1);
  const navigate = useNavigate();

  return (
    <menu className='btn-group mt-5'>
      <button
        className={`btn md:w-64 ${
          selectedButton !== secondPage
            ? 'btn-active'
            : 'btn-outline btn-primary'
        }`}
        onClick={() => {
          navigate(firstPage);
        }}
      >
        {firstButtonText}
      </button>
      <button
        className={`btn md:w-64 ${
          selectedButton === secondPage
            ? 'btn-active'
            : 'btn-outline btn-primary'
        }`}
        onClick={() => {
          navigate(secondPage);
        }}
      >
        {secondButtonText}
      </button>{' '}
    </menu>
  );
};

export default CurrentPageButtons;
