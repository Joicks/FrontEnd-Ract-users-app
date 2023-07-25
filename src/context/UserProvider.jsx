/* eslint-disable react/prop-types */
import { useUsers } from "../hooks/useUsers";
import { UserContext } from "./UserContext"


export const UserProvider = ({children}) => {
 
  const {
    users,
    userSelected,
    initialUsersForm,
    visibleForm,
    errors,
    handlerAddUser,
    handlerRemoveUser,
    handlerUSerSerlectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getUsers,
    
  } = useUsers();

  return (
    <UserContext.Provider  value={
      {
        users,
        userSelected,
        initialUsersForm,
        visibleForm,
        errors,
        handlerAddUser,
        handlerRemoveUser,
        handlerUSerSerlectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,
      }
    } >
      {children}
    </UserContext.Provider>

  )
}