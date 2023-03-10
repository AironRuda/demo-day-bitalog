import {
  doc,
  DocumentData,
  DocumentSnapshot,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSelectedProject } from "../../context/projectsSlice";
import { db } from "../../firebase/config";
import NoveltyCard from "./NoveltyCard";

const Notifications: React.FunctionComponent = (props) => {
  const [novelties, setNovelties] = useState([]);
  const currentProjectId = useSelector(getSelectedProject);

  useEffect(() => {
    onSnapshot(
      doc(db, "novelty", currentProjectId),
      (novelties: DocumentSnapshot<DocumentData>) => {
        setNovelties(novelties.data()?.novelties ?? []);
      }
    );
  }, [currentProjectId]);

  return (
    <div>
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
