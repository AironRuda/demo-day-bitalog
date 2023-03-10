import { NoveltyCard } from "../../model/novelties.model";

interface Props {
  novelty: NoveltyCard;
}
const NoveltyCard = ({ novelty }: Props) => {
  return (
    <li>
      <p>{novelty.senderId}</p>
      <p>{novelty.text}</p>
      <p>{novelty.noveltyId}</p>
      {novelty.img && <img src={novelty.img} alt="" />}
    </li>
  );
};

export default NoveltyCard;
