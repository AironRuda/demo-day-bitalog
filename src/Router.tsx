import { Route } from 'react-router';
import {
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import App from './App';
import ActivitiesList from './components/activities/activitiesList/ActivitiesList';
import ActivityContainer from './components/activities/ActivityContainer';
import CreateActivities from './components/activities/CreateActivities';
import UpdateActivity from './components/activities/UpdateActivity';
import Inventory from './components/inventory/Inventory';
import CreateProjects from './components/projects/CreateProjects';
import ProjectContainer from './components/projects/ProjectContainer';
import ProjectList from './components/projects/ProjectsList/ProjectList';
import Team from './components/Team';
import Dashboard from './pages/Dashboard';
import Display from './pages/Display';
import Login from './pages/Login';
import Register from './pages/Register';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Display />} />

      <Route path='app' element={<App />}>
        <Route path='register' element={<Register />} />
        <Route index element={<Login />} />
        <Route path='dashboard' element={<Dashboard />}>
          <Route path='' element={<ProjectContainer />}>
            <Route path='create-project' element={<CreateProjects />} />
            <Route index element={<ProjectList />} />
          </Route>

          <Route path='activities' element={<ActivityContainer />}>
            <Route path='create-activities' element={<CreateActivities />} />
            <Route path='update-project/:id' element={<UpdateActivity />} />
            <Route index element={<ActivitiesList />} />
          </Route>

          <Route path='team' element={<Team />} />
          <Route path='inventory' element={<Inventory />} />
        </Route>
      </Route>
    </>
  )
);

export default router;
