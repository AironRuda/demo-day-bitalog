import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { imgLogo } from "../../assets/icons";
import { getSelectedProject } from "../../context/projectsSlice";
import { selectUser } from "../../context/selectors";
import { db, storage } from "../../firebase/config";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Swal from "sweetalert2";

const CreateNotification: React.FunctionComponent = (props) => {
  const user = useSelector(selectUser);
  const currentProjectId = useSelector(getSelectedProject);

  const [text, setText] = useState("");
  const [img, setImg] = useState<File | null>(null);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (img) {
      const storageRef = ref(storage, uuid());
      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateDoc(doc(db, "novelty", currentProjectId), {
              messages: arrayUnion({
                messageId: uuid(),
                text,
                senderId: user.id,
                img: downloadURL,
              }),
            });
          } catch (error) {
            console.log(error);
          }
        });
      });
    } else {
      await updateDoc(doc(db, "novelty", currentProjectId), {
        messages: arrayUnion({
          messageId: uuid(),
          text,
          senderId: user.id,
        }),
      });
    }
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
