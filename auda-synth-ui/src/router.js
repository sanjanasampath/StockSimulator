/* 
<Router>
<Routes >
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/order" element={<Order />} />
  <Route path="*" element={<h1>Not Found!</h1>} />
</Routes>
</Router> */

import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Wireframe from "./pages/Wireframe";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  }, {
    path: "/register",
    element: <Register />,
  }, {
    path: "/dashboard",
    element: <Dashboard />,
  }, {
    path: "/wireframe",
    element: <Wireframe />,
  }, {
    path: "*",
    element: <h1 className="text-3xl text-red-700 text-center mx-auto">Not Found!</h1>
  }
]);

