/* eslint-disable react/prop-types */

import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { AuthContext } from "../auth/context/AuthContext";


export const UserRow = ({ id, username, email, admin}) => {

  const {handlerUSerSerlectedForm, handlerRemoveUser} = useContext(UserContext); 
  const { login} = useContext(AuthContext);

  return (
    <tr>
              <td>{id}</td>
              <td>{username}</td>
              <td>{email}</td>

              {/* eslint-disable-next-line no-undef */}
              {!login.isAdmin || <>
              <td>
                <button type="button" className="btn btn-secondary btn-sm"
                onClick={() => handlerUSerSerlectedForm({
                  id,
                  username,
                  email,
                  admin
                  
                })}>
                  update
                </button>
              </td>
               
              <td>
                <NavLink className={'btn btn-secondary btn-sm'}
                to={'/users/edit/' + id} >
                update route
                </NavLink>
              </td>

              <td>
                <button type="button" className="btn btn-danger btn-sm"
                onClick={() => handlerRemoveUser(id)}>
                  remove
                </button>
              </td>
              </>
              }
            </tr>
  )
}