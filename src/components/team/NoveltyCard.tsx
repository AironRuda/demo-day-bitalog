import { doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getNovelties } from "../../context/noveltiesSlice";
import { getSelectedProject } from "../../context/projectsSlice";
import { db } from "../../firebase/config";
import { NoveltyCard } from "../../model/novelties.model";

interface Props {
  novelty: NoveltyCard;
}
const NoveltyCard = ({ novelty }: Props) => {
  const currentProjectId = useSelector(getSelectedProject);
  const novelties = useSelector(getNovelties);

  const handleDelete = async (id: string) => {
    await updateDoc(doc(db, "novelty", currentProjectId), {
      novelties: novelties.filter((novelty) => novelty.noveltyId !== id),
    });
    Swal.fire({
      text: "Su notifiacacion fue eliminada correctamente",
      icon: "success",
      confirmButtonColor: "#31C48D",
      confirmButtonText: "Aceptar",
    });
  };

  return (
    <li className="bg-primary flex flex-col items-center justify-center rounded-md m-3">
      <div className="flex justify-between">
        <p className="font-bold text-black m-3 p-1">
          Enviado por: <br />
          {novelty.senderId}
        </p>
        <button
          className="m-2 p-2"
          onClick={() => handleDelete(novelty.noveltyId)}
        >
          ❌
        </button>
      </div>

      <p className="m-3 p-3 text-black">{novelty.text}</p>
      {/* <p>{novelty.noveltyId}</p> */}
      {novelty.img && (
        <img src={novelty.img} className="rounded-md m-3" alt="" />
      )}
    </li>
  );
};

export default NoveltyCard;
