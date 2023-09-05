import React, { useState } from "react";
import Swal from "sweetalert2";
import { postUsers } from "../../../02App/postUsers";

export const addPopup: React.FC = () => {
  const [formData, setFormData] = useState({
    rol: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const { rol, email, password } = formData;

      if (rol && email && password) {
        const response = await postUsers(email, password, rol);

        if (response && response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Usuario agregado con éxito",
            confirmButtonColor: "#C1D78F",
          });
          // Limpiar el formulario después de agregar el usuario
          setFormData({
            rol: "",
            email: "",
            password: "",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al agregar el usuario",
            confirmButtonColor: "#C1D78F",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Campos incompletos",
          confirmButtonColor: "#C1D78F",
        });
      }
    } catch (error) {
      console.error("Error al hacer la solicitud POST", error);
      Swal.fire({
        icon: "error",
        title: "Error al hacer la solicitud POST",
        confirmButtonColor: "#C1D78F",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-2">
        <span className="font-bold text-xl mr-2">ROL:</span>
        <select
          name="rol"
          className="swal2-input"
          value={formData.rol}
          onChange={handleChange}
        >
          <option value="mesero">Mesero(a)</option>
          <option value="cocina">Cocinero(a)</option>
          <option value="administrador">Administrador(a)</option>
        </select>
      </div>

      <div className="flex items-center justify-center">
        <span className="font-bold text-xl mr-2">EMAIL:</span>
        <input
          name="email"
          className="text-xl"
          placeholder="Ingrese el correo"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center justify-center">
        <span className="font-bold text-xl mr-2">CONTRASEÑA:</span>
        <input
          name="password"
          type="password"
          className="text-xl"
          placeholder="Ingresa la contraseña"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSubmit}>Agregar Usuario</button>
    </div>
  );
};
