import React, { useState } from "react";
import { requestGet } from "../03Components/Login/request";
import { LogoGif } from "../03Components/logoComponent";
import { Background } from "../03Components/Background";
import { INavigate } from "../03Components/Interfaces";

const Login: React.FC<INavigate> = ({ navigate }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [logged, setLogged] = useState(false);

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await requestGet(user, password);
      console.log("Respuesta de la solicitud:", data);
      const token = data.accessToken;
      console.log("Token:", token);
      const role = data.user.role;
      console.log("Rol:", role);

      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userId", data.user.id.toString());
      localStorage.setItem("token", token);
      localStorage.setItem("role", data.user.role);

      switch (role) {
        case "mesero":
          setLogged(true);
          navigate("/waiter");
          console.log("se rutea para mesero");
          break;
        case "cocina":
          setLogged(true);
          navigate("/chef");
          console.log("se rutea para  cocinero");
          break;
        case "administrador":
          // setLogged(true);
          // navigate("/administrador");
          console.log("Se rutea para administrador");
          // Código a ejecutar si el rol es "administrador"
          break;
        default:
          console.log("soy default!");
          // Código a ejecutar si el rol no coincide con ninguno de los casos anteriores
          break;
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <article className="w-[97vw] h-[97vh] flex flex-col justify-start">
      <section className="z-1 w-[45vw] h-[45vh] p-1 justify-start items-start hm:mt-[-18px]">
        <LogoGif />
      </section>
      <form
        onSubmit={handleLogin}
        className="z-1 h-[382px] w-[500px] ml-[39%] flex flex-col justify-center items-center text-ce p-1 hm:mt-[-9px] hm:ml-[50%]"
      >
        <label className="text-crema border-brownText mb-6 text-center block text-[3rem] font-bold mb-[1%] drop-shadow-[4px_4px_0.5px_#65362A]">
          Usuario
        </label>
        <input
          className="shadow appearance-none border rounded w-[325px] h-[50px] text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-center z-1 "
          type="email"
          placeholder="example@gmail.com"
          autoComplete="email"
          onChange={(e) => setUser(e.target.value)}
          style={{ fontSize: "1.5rem" }}
        />
        <label className="text-crema border-brownText mb-6 text-center block text-[3rem] font-bold mb-[1%] drop-shadow-[4px_4px_0.5px_#65362A]">
          Contraseña
        </label>
        <input
          className="shadow appearance-none border rounded w-[325px] h-[50px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center z-1 "
          type="password"
          placeholder="******************"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ fontSize: "1.5rem" }}
        />

        {error ? (
          <p className="text-red text-2xl font-bold italic">{error}</p>
        ) : null}
        <button
          type="submit"
          className="text-[3rem] bg-colorButton hover:bg-buttonHover text-brownText font-bold mt-[8%] rounded-full w-[365px] h-[70px] z-1"
        >
          Iniciar sesión
        </button>
      </form>
      <Background />
    </article>
  );
};

export default Login;
