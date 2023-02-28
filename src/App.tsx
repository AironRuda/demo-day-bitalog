import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux/es/exports";
import { Outlet } from "react-router-dom";
import { auth } from "./firebase/config";

function App() {
  const dispatch = useDispatch<any>();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user.uid);
    } else {
      console.log("non user");
    }
  });
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
