import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from './page/Registration'
import Login from './page/Login';

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
    
   </Route>
  )
);

function App() {

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
