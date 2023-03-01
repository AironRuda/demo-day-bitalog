import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux/es/exports";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchUser } from "./context/userSlice";
import { auth } from "./firebase/config";

function App() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user.uid);
      dispatch(fetchUser(user.uid));
      navigate("/");
    } else {
      navigate("login");
    }
  });

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
