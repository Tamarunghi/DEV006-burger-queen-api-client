import Swal from "sweetalert2";
// import { patchUsers } from "../../02App/patchUsers";
import { useEffect, useState } from "react";
import { GetUsers } from "../../02App/getUsers";
import { User } from "../Interfaces";

export const EditPopup: React.FC = () => {
  // const [users, setUsers] = useState<User[]>([]);
  // useEffect(() => {
  //   GetUsers()
  //     .then((data) => {
  //       console.log("data", data);
  //       setUsers(data);
  //     })
  //     .catch((error) => {
  //       console.error("error", error);
  //     });
  // }, []);

  try {
    const content = document.createElement("div");

    content.innerHTML = `
        <div class="flex items-center justify-center mb-2">
          <span class="font-bold text-xl mr-2">ROL:</span>
          <select id="rol" class="swal2-input">
            <option value="mesa">Mesero(a)</option>
            <option value="cocina">Cocinero(a)</option>
            <option value="administracion">Administrador(a)</option>
          </select>
        </div>
        
        <div class="flex items-center justify-center">
          <span class="font-bold text-xl mr-2">EMAIL:</span>
          <input id="email" class="text-xl" placeholder="Ingrese el correo">*
        </div>
        <div class="flex items-center justify-center">
          <span class="font-bold text-xl mr-2">CONTRASEÑA:</span>
          <input id="contraseña" class="text-xl" placeholder="Ingresa la contraseña">*
        </div>
      `;

    const rolInput = document.getElementById("rol") as HTMLSelectElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const contraseñaInput = document.getElementById(
      "contraseña"
    ) as HTMLInputElement;
    const rol = rolInput.value;
    const email = emailInput.value;
    const contraseña = contraseñaInput.value;

    Swal.fire({
      html: content,
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonColor: "#C1D78F",
      confirmButtonColor: "#FF8A8A",
      confirmButtonText: "Editar",
      focusConfirm: false,
      preConfirm: () => {
        if (rolInput && emailInput) {
          if (rol && email && contraseña) {
            return { rol, email, contraseña };
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
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        // const formData = result.value;
        const toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        toast.fire({
          icon: "success",
          title: `<span style="font-size: 1.5rem;">Editado</span>`,
        });
        console.log(result);
        // users.map((user) => {
        //   patchUsers(user.id, email, contraseña, rol)
        //     .then((result) => {
        //       return result;
        //     })
        //     .catch((error) => {
        //       console.error("error", error);
        //     });
        // });
      }
    });
  } catch (error) {
    console.error("Error occurred:", error);
  }

  return null;
};
