import { Route, Routes } from "react-router";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import ActivityContainer from "./components/activities/ActivityContainer";
import Inventory from "./components/Inventory";
import ProjectContainer from "./components/projects/ProjectContainer";
import Team from "./components/Team";
import Dashboard from "./pages/Dashboard";
import Display from "./pages/Display";
import Login from "./pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Display />} />

      <Route path="app" element={<App />}>
        <Route index element={<Login />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="projects" element={<ProjectContainer />}>
            <Route index />
            <Route path="create-project" />
          </Route>

          <Route path="activities" element={<ActivityContainer />}>
            <Route index />
            <Route path="create-activities" />
          </Route>

          <Route path="team" element={<Team />} />
          <Route path="inventory" element={<Inventory />} />
        </Route>
      </Route>
    </>
  )
);

export default router;
