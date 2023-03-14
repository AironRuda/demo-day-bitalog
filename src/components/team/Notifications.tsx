import { useSelector } from "react-redux";
import { getNovelties } from "../../context/noveltiesSlice";
import NoveltyCard from "./NoveltyCard";

const Notifications: React.FunctionComponent = (props) => {
  const novelties = [...useSelector(getNovelties)] as unknown as NoveltyCard[];

  return (
    <div className="flex flex-row items-center justify-between">
      <ul>
        {novelties.length ? (
          novelties
            .reverse()
            .map((novelty: NoveltyCard) => (
              <NoveltyCard key={novelty.noveltyId} novelty={novelty} />
            ))
        ) : (
          <li>
            <h5 className="text-3xl text-center px-20 text-secondary mt-20">
              No se han reportado novedades
            </h5>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Notifications;
