/**
 * @file app.jsx
 * @description Root component of the React application, handling routing and rendering different pages based on authentication status.
 * @author jhludwolf
 * @created May 18, 2023
 */

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Transfer from "./pages/transfer";
import Expenses from "./pages/expenses";
import Login from "./pages/login";
import { useSelector } from "react-redux";
import Balance from "./pages/balances";
import Register from "./pages/register";

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const PublicRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/*" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/balance" element={<Balance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
