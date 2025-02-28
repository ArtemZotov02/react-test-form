import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import ErrorPage from "./pages/error/ErrorPage";
import Auth from "./components/auth/Auth";
import EmailsPage from "./pages/emails/EmailPage";

const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

const PublicRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? <Navigate to="/emails" replace /> : <Outlet />;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Auth />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/emails" element={<EmailsPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
