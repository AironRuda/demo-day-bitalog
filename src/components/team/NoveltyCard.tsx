import { NoveltyCard } from "../../model/novelties.model";

interface Props {
  novelty: NoveltyCard;
}
const NoveltyCard = ({ novelty }: Props) => {
  return (
    <li className="bg-primary flex flex-col items-center justify-center rounded-md m-3">
      <div className="flex justify-between">
        <p className="font-bold text-black m-3 p-1">
          Enviado por: <br />
          {novelty.senderId}
        </p>
        <button className="m-2">delete</button>
      </div>

      <p className="m-3 p-3">{novelty.text}</p>
      {/* <p>{novelty.noveltyId}</p> */}
      {novelty.img && (
        <img src={novelty.img} className="rounded-md m-3" alt="" />
      )}
    </li>
  );
};

export default NoveltyCard;
