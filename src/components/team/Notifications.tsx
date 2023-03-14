import { useSelector } from "react-redux";
import { getNovelties } from "../../context/noveltiesSlice";
import NoveltyCard from "./NoveltyCard";

const Notifications: React.FunctionComponent = (props) => {
  const novelties = useSelector(getNovelties) as unknown as NoveltyCard[];
  return (
    <div className="flex">
      <ul>
        {novelties.length ? (
          novelties.map((novelty: NoveltyCard) => (
            <NoveltyCard key={novelty.noveltyId} novelty={novelty} />
          ))
        ) : (
          <li>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              No se han reportado novedades
            </h5>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Notifications;
