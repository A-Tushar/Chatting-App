import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from './page/Registration'
import Login from './page/Login';
import { ToastContainer, toast } from 'react-toastify';
import Home from './page/Home';
import Forgetpassword from './page/Forgetpassword';
import Massage from './page/Massage';
import Notification from './page/Notification';
import Rootlayout from './components/Rootlayout';
import Settings from './page/Settings';


const router = createBrowserRouter(
  createRoutesFromElements(
   <Route>
      <Route
      path="/"
      element={<Registration />}
      />
      <Route
      path="/login"
      element={<Login />}
      />
      <Route
      path="/"
      element={<Rootlayout />}
      > 
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/massage"
            element={<Massage/>}
          />
          <Route
            path="/notifications"
            element={<Notification/>}
          />
          <Route
            path="/settings"
            element={<Settings />}
          />
      </Route>
      <Route
      path="/forgetpassword"
      element={<Forgetpassword />}
      />
   </Route>
  )
);

function App() {

  return (
    <>
        <RouterProvider router={router} />
        <ToastContainer />
    </>
  )
}

export default App
