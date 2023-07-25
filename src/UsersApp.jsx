import { LoginPage } from "./auth/pages/loginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./Routes/UserRoutes";
import { useContext } from "react";
import { AuthContext } from "./auth/context/AuthContext";

export const UsersApp = () => {
  const { login } = useContext(AuthContext);

  return (
    <Routes>
      {login.isAuth ? (
        <Route path="/*" element={<UserRoutes />} />
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};
