import { useState } from "react";
import { useSelector } from "react-redux";
import { imgLogo } from "../../assets/icons";
import { selectUser } from "../../context/selectors";
import Swal from "sweetalert2";
import { handleCreateNovelty } from "../../handlers/handleNovelties";

const CreateNotification: React.FunctionComponent = (props) => {
  const user = useSelector(selectUser);

  const [text, setText] = useState("");
  const [img, setImg] = useState<File | null>(null);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleCreateNovelty(user.id, text, img);
    Swal.fire({
      text: "Su notifiacacion fue enviada correctamente",
      icon: "success",
      confirmButtonColor: "#31C48D",
      confirmButtonText: "Aceptar",
    });
    setText("");
    setImg(null);
  };

  return (
    <form onSubmit={handleSend}>
      <h1>Generar notificacion</h1>
      <input
        type="text"
        name="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div className="send">
        <input
          type="file"
          name="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => e.target.files && setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={imgLogo} alt="" />
        </label>
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

export default CreateNotification;
