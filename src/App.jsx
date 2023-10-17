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
      path="/Home"
      element={<Home />}
      />
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
