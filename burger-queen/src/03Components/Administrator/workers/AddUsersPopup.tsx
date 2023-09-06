import Swal from "sweetalert2";
import { postUsers } from "../../../02App/postUsers";
interface AddPopupProps {
  fetchUsers: () => void;
}

export const AddUsersPopup: React.FC<AddPopupProps> = ({ fetchUsers }) => {
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
        const emailInput = document.getElementById("email") as HTMLInputElement;
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
                Swal.fire({
                  icon: "success",
                  title: "Usuario agregado con éxito",
                  confirmButtonColor: "#C1D78F",
                });
                fetchUsers();
                return resolve;
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
