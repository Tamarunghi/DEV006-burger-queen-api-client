import Swal from "sweetalert2";

export const EditPopup = async () => {
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

        if (rolInput && emailInput) {
          const rol = rolInput.value;
          const email = emailInput.value;
          return { rol, email };
        }
        return null;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        // const formData = result.value;

        Swal.fire(`Editado`);
      }
    });
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
