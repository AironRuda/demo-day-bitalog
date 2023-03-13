import { lazy, Suspense } from 'react';
import { Route } from 'react-router';
import {
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import App from './App';
import ActivityContainer from './components/activities/ActivityContainer';
import CreateActivities from './components/activities/CreateActivities';
import UpdateActivity from './components/activities/UpdateActivity';
import CreateProjects from './components/projects/CreateProject.tsx/CreateProjects';
import ProjectContainer from './components/projects/ProjectContainer';
import Dashboard from './pages/Dashboard';
import Display from './pages/Display';
import Loading from './pages/Loading';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
const ActivitiesList = lazy(
  () => import('./components/activities/activitiesList/ActivitiesList')
);
const Inventory = lazy(() => import('./components/inventory/Inventory'));
const ProjectList = lazy(
  () => import('./components/projects/ProjectsList/ProjectList')
);
const TeamInfo = lazy(() => import('./components/team/TeamInfo'));

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
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <ProjectList />
                </Suspense>
              }
            />
          </Route>

          <Route path='activities' element={<ActivityContainer />}>
            <Route path='create-activities' element={<CreateActivities />} />
            <Route path='update-project/:id' element={<UpdateActivity />} />
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <ActivitiesList />
                </Suspense>
              }
            />
          </Route>

          <Route
            path='team'
            element={
              <Suspense fallback={<Loading />}>
                <TeamInfo />
              </Suspense>
            }
          />
          <Route
            path='inventory'
            element={
              <Suspense fallback={<Loading />}>
                <Inventory />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </>
  )
);

export default router;
