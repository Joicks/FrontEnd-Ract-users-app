import { useContext, useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/UserService";
import { AuthContext } from "../auth/context/AuthContext";

const initialUsers = [];

const initialUsersForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
  admin: false,
}
const initialErrors = {
  username: "",
  password: "",
  email: "",
};

export const useUsers = () => {
  //manejamos la logica de los usuarios

  const [errors, setErrors] = useState ({initialErrors});

  const [users, dispatch] = useReducer(usersReducer, initialUsers);
  const [userSelected, setUdserSelect] = useState(initialUsersForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  const { login, handlerLogout} = useContext(AuthContext);

  const getUsers = async () => {

    try {
      const result = await findAll();
      console.log(result);
      dispatch({
        type: "loadingUsers",
        payload: result.data,
      });
      
    } catch (error) {
      if(error.response?.status == 401) {
        handlerLogout();
        }
    }
  };

  const handlerAddUser = async (user) => {
    // console.log(user)

    // eslint-disable-next-line no-undef
    if(!login.isAdmin) return;
    let response;

    try {
      if (user.id === 0) {
        response = await save(user);
      } else {
        response = await update(user);
      }

      dispatch({
        type: user.id === 0 ? "addUser" : "updateUser",
        payload: response.data,
      });

      Swal.fire(
        user.id === 0 ? "Usuario Creado" : "Usuario Actualizado",
        user.id === 0
          ? "El usuario ha sido creado con exito"
          : "Usuario ha sido actualizado",
        "success"
      );
      handlerCloseForm();
      navigate("/users");
    } catch (error) {
      if(error.response && error.response.status == 400){
        setErrors(error.response.data);
      }
      else if(error.response && error.response.status == 500 && 
        error.response.data?.message?.includes('constraint')){
        
      if(error.response.data?.message?.includes('UK_username')) {
        setErrors({username: 'El username ya existe!'})
      }
      if(error.response.data?.message?.includes('UK_email')) {
        setErrors({email: 'El email ya existe!'})
      }

    }else if(error.response?.status == 401) {
      handlerLogout();
      }else{
        throw error;
      }
    }
  };

  const handlerRemoveUser = (id) => {
    // console.log(id);

    Swal.fire({
      title: "Estas seguro que desea eliminar?",
      text: "Cuidado el usuario sera eliminado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then( async (result) => {
      if (result.isConfirmed) {
        try {
          await remove(id);
          dispatch({
            type: "removeUser",
            payload: id,
          });
  
          Swal.fire(
            "Usuario eliminado!",
            "El usuario se ha eliminado con exito!",
            "success"
          );
          
        } catch (error) {
          if(error.response?.status == 401) {
            handlerLogout();
            }
        }
      }
    })
  };

  const handlerUSerSerlectedForm = (user) => {
    // console.log(user);
    setVisibleForm(true);
    setUdserSelect({ ...user });
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };

  const handlerCloseForm = () => {
    setVisibleForm(false);
    setUdserSelect(initialUsersForm);
    setErrors({});
  };

  return {
    //atributos que se devulven
    users,
    userSelected,
    initialUsersForm,
    //variable
    visibleForm,
    errors,
    //funciones que usamos
    handlerAddUser,
    handlerRemoveUser,
    handlerUSerSerlectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getUsers,
  };
};
