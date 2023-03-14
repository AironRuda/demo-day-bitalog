import { useState } from "react";
import { useSelector } from "react-redux";
import { imgLogo, plusLogo } from "../../assets/icons";
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
    <form
      className="bg-secondary p-3 m-5 rounded-md flex flex-col items-center h-72"
      onSubmit={handleSend}
    >
      <h1 className="text-black font-bold mb-4">GENERAR NOTIFICACION</h1>
      <input
        className="p-2 rounded-md border-2 border-primary m-1 text-black"
        placeholder="Ingrese texto"
        type="text"
        name="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div className="">
        <input
          type="file"
          name="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => e.target.files && setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img className="w-20 cursor-pointer" src={imgLogo} alt="imgLogo" />
        </label>
        <button type="submit">
          <img src={plusLogo} className="w-20 cursor-cell" alt="" />
        </button>
      </div>
    </form>
  );
};

export default CreateNotification;
