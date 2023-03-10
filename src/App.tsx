import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-white w-screen h-screen">
      <Outlet />
    </div>
  );
}

export default App;
