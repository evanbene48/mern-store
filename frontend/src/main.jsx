import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import { Provider } from "react-redux";

//Auth
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";

import PrivateRoute from "./components/PrivateRoute.jsx";
import { Profile } from "./pages/User/Profile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="" element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <RouterProvider router={router} />
// )
