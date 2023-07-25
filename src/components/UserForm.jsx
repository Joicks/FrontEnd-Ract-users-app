/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
// import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";



export const UserForm = ({userSelected, handlerCloseForm}) => {

  const {initialUsersForm, handlerAddUser, errors} = useContext(UserContext);

  const [userForm, setUserForm] = useState(initialUsersForm);

  const [checked, setChecked] = useState(userForm.admin);

  const {id, username, password, email, admin} = userForm;


  useEffect(() => {
    setUserForm({
      ...userSelected,
      password: '',
    });
  }, [userSelected]);

  const onImputChange = ({target}) => {

   const {name, value} = target;
   setUserForm({
    ...userForm,
    [name]: value,
   })

  }

  const onCheckboxChange = () => {
    setChecked(!checked);
    setUserForm({
        ...userForm,
      admin: checked,
      }
    )

  }


  const onSubmit = (event) => {
    event.preventDefault();
    //evitamos enviar formulario vacio
    // if(!username || (!password && id === 0) || !email){

    //   Swal.fire(
    //     'Error de validacion',
    //     'Debe completar los campos del formulario',
    //     'error'
    //   )

    //   return;
    // }
    // if(!email.includes('@')){
    //   Swal.fire(
    //     'Error de validacion email',
    //     'El email debe ser valido incluir un @',
    //     'error'
    //   )
    //   return;
    // }

    // console.log(userForm)

    //guardar el userForm en el listado de usuarios
    handlerAddUser(userForm);
    // setUserForm(initialUsersForm);
  }

  const onCloseForm = () => {
    handlerCloseForm();
    setUserForm(initialUsersForm);
  }

  return(
    <form onSubmit={onSubmit}>
      <input 
      className="form-control my-3 w-75"
      placeholder="Username"
      name="username"
      value={username}
      onChange={onImputChange}/>
      <p className="text-danger">{errors?.username}</p>

      {id > 0 ||
      <input 
      className="form-control my-3 w-75"
      placeholder="Password"
      type="password"
      name="password"
      value={password}
      onChange={onImputChange}/>}
      <p className="text-danger">{errors?.password}</p>

      <input 
      className="form-control my-3 w-75"
      placeholder="email"
      name="email"
      value={email}
      onChange={onImputChange}/>
      <p className="text-danger">{errors?.email}</p>

      <div className="my-3 form-check">
        <input type="checkbox"
        name="admin"
        checked={admin}
        className="form-check-input"
        onChange={onCheckboxChange}
        />
      <label className="form-check-label">Admin</label> 
      </div>
      
      <input type="hidden"
      name="id"
      value={id} />

      <button 
      className="btn btn-primary"
      type="submit">
        {id > 0 ? 'Editar' : 'Crear'}
      </button>

      { !handlerCloseForm ||
      <button className="btn btn-primary mx-2" type="button" 
      onClick={() => onCloseForm()}>
        Cerrar
      </button>
      }
    </form>
  )
}