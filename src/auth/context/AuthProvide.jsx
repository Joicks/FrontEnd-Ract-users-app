/* eslint-disable react/prop-types */
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./AuthContext";

export const AuthProvide = ({ children }) => {

  const { login, handlerLogin, handlerLogout } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        login,
        handlerLogin,
        handlerLogout,
      }}>
        { children }
      </AuthContext.Provider>
  );
};
