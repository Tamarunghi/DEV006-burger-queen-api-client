import Swal from "sweetalert2";
import { User } from "../../Interfaces";
import { patchUsers } from "../../../02App/patchUsers"; // Asegúrate de importar la función de patchUsers
import { GetUsers } from "../../../02App/getUsers";
import { useEffect } from "react";

interface EditPopupProps {
  user: User;
  fetchUsers: any;
}

export const EditPopup: React.FC<EditPopupProps> = ({ user, fetchUsers }) => {
  try {
    const content = document.createElement("div");

    content.innerHTML = `
               
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
        const emailInput = document.getElementById("email") as HTMLInputElement;
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
                console.log("response", response);
                Swal.fire({
                  icon: "success",
                  title: "Usuario editado con éxito",
                  confirmButtonColor: "#C1D78F",
                });
                fetchUsers();

                return response;

                // if (response && response.status === 200) {
                //   console.log("id", user.id, "response", response);
                //   // Éxito: muestra un mensaje de éxito

                // } else {
                //   // Error: muestra un mensaje de error
                //   console.log("id", user.id, "response", response.status);
                //   Swal.fire({
                //     icon: "error",
                //     title: "Error al editar el usuario",
                //     confirmButtonColor: "#C1D78F",
                //   });
                // }
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

  return null;
};
