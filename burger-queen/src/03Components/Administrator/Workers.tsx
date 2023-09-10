import Swal from "sweetalert2";
import { deleteUsers } from "../../02App/deleteUser";
import { GetUsers } from "../../02App/getUsers";
import add from "../../04Images/add.png";
import edit from "../../04Images/edit.png";
import trashCan from "../../04Images/trashCan.png";
import { User } from "../Interfaces";
import { useEffect, useState } from "react";
import { postUsers } from "../../02App/postUsers";
import { patchUsers } from "../../02App/patchUsers";

export const Workers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = () => {
    GetUsers()
      .then((data) => {
        console.log("data", data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("error", error);
      });
    console.log("se actuailzi");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    console.log("agregar");
    try {
      const content = document.createElement("div");

      content.innerHTML = `
              <div class="flex items-center justify-center mb-2">
                <span class="font-bold text-xl mr-2">ROL:</span>
                <select id="rol" class="swal2-input">
                  <option value="Mesero(a)" }>Mesero(a)</option>
                  <option value="Cocinero(a)">Cocinero(a)</option>
                  <option value="Administrador(a)">Administrador(a)</option>
                </select>
              </div>
              
              <div class="flex items-center justify-center">
                <span class="font-bold text-xl mr-2">EMAIL:</span>
                <input id="email" class="text-xl" placeholder="Ingrese el correo">
              </div>
              <div class="flex items-center justify-center">
                <span class="font-bold text-xl mr-2">CONTRASEÑA:</span>
                <input id="contraseña" class="text-xl" placeholder="Ingresa la contraseña">
              </div>
            `;

      Swal.fire({
        html: content,
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonColor: "#C1D78F",
        confirmButtonColor: "#FF8A8A",
        confirmButtonText: "Agregar",
        focusConfirm: false,
        preConfirm: () => {
          const rolInput = document.getElementById("rol") as HTMLSelectElement;
          const emailInput = document.getElementById(
            "email"
          ) as HTMLInputElement;
          const contraseñaInput = document.getElementById(
            "contraseña"
          ) as HTMLInputElement;
          const rol = rolInput.value;
          const email = emailInput.value;
          const contraseña = contraseñaInput.value;

          if (rolInput && emailInput && contraseñaInput) {
            if (rol && email && contraseña) {
              // Realiza la solicitud POST aquí utilizando
              postUsers(email, contraseña, rol)
                .then((resolve) => {
                  if (resolve && resolve.status === 201) {
                    Swal.fire({
                      icon: "success",
                      title: "Usuario agregado con éxito",
                      confirmButtonColor: "#C1D78F",
                    });
                    fetchUsers();
                    return resolve;
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Error al agregar el usuario",
                      confirmButtonColor: "#C1D78F",
                    });
                  }
                })
                .catch((error) => {
                  console.error("error", error);
                });
            } else {
              Swal.fire({
                icon: "error",
                title: "Campos incompletos",
                confirmButtonColor: "#C1D78F",
              });
            }
          }
          return null;
        },
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
    return null;
  };
  const handleEdit = (user: User): void => {
    try {
      const content = document.createElement("div");

      content.innerHTML = `
          <div class="flex items-center justify-center mb-2">
            <span class="font-bold text-xl mr-2">ROL:</span>
            <select id="rol" class="swal2-input">
              <option value="mesero" }>Mesero(a)</option>
              <option value="cocina">Cocinero(a)</option>
              <option value="Administrador(a)">Administrador(a)</option>
            </select>
          </div>
          
          <div class="flex items-center justify-center">
            <span class="font-bold text-xl mr-2">EMAIL:</span>
            <input id="email" class="text-xl" placeholder="Ingrese el correo" value="${user.email}">
          </div>
          <div class="flex items-center justify-center">
            <span class="font-bold text-xl mr-2">CONTRASEÑA:</span>
            <input id="contraseña" class="text-xl" placeholder="Ingresa la contraseña">
          </div>
        `;

      Swal.fire({
        html: content,
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonColor: "#C1D78F",
        confirmButtonColor: "#FF8A8A",
        confirmButtonText: "Editar",
        focusConfirm: false,
        preConfirm: () => {
          const rolInput = document.getElementById("rol") as HTMLSelectElement;
          const emailInput = document.getElementById(
            "email"
          ) as HTMLInputElement;
          const contraseñaInput = document.getElementById(
            "contraseña"
          ) as HTMLInputElement;
          const rol = rolInput.value;
          const email = emailInput.value;
          const contraseña = contraseñaInput.value;

          if (rolInput && emailInput) {
            if (rol && email && contraseña) {
              // Realiza la solicitud PATCH aquí utilizando la función patchUsers
              patchUsers(user.id, email, contraseña, rol)
                .then((response) => {
                  if (response && response.status === 200) {
                    Swal.fire({
                      icon: "success",
                      title: "Usuario editado con éxito",
                      confirmButtonColor: "#C1D78F",
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Error al editar el usuario",
                      confirmButtonColor: "#C1D78F",
                    });
                  }

                  fetchUsers();

                  return response;
                })
                .catch((error) => {
                  console.error("Error al hacer la solicitud PATCH", error);
                });
            } else {
              Swal.fire({
                icon: "error",
                title: "Campos incompletos",
                confirmButtonColor: "#C1D78F",
              });
            }
          }
          return null;
        },
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  const handleDelete = (user: User): void => {
    Swal.fire({
      title: "Desea eliminar el usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF8A8A",
      cancelButtonColor: "#C1D78F",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
        deleteUsers(user.id)
          .then((resolve) => {
            console.log("eliminado");
            fetchUsers();
            return resolve;
          })
          .catch((error) => {
            console.error("error", error);
          });
      }
    });
  };

  return (
    <>
      <div className="flex justify-center">
        <img src={add} className="h-[90px] w-[90px]" onClick={handleAdd} />
      </div>
      {users.map((user) => (
        <article
          key={user.id}
          className="bg-press grid grid-cols-4 h-auto flex flex-col text-[1.1rem] p-[20px] mb-[25px] text-darkBrown font-extrabold border-[0.1px] border-brownText rounded-25  shadow-notPressShadow opacity-70"
        >
          <div className="text-xl col-span-2">
            <div>
              <p>
                ROL:<span>{user.role}</span>
              </p>
            </div>
            <div>
              <p>
                EMAIL:<span>{user.email}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={edit}
              className="h-[60px] w-[60px] "
              onClick={() => handleEdit(user)}
            />
          </div>
          <div className="  bg-minusButtom rounded-full flex justify-center">
            <img
              src={trashCan}
              className="h-[50px] w-[40px] flex justify-center"
              onClick={() => handleDelete(user)}
            />
          </div>
        </article>
      ))}
    </>
  );
};
