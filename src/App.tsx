import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-white h-[100vh]">
      <Outlet />
    </div>
  );
}

export default App;
