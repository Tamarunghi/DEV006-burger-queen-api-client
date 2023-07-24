import React, { useState } from "react";
import { requestGet } from "../03Components/request";
import { useNavigate } from 'react-router-dom';
// import burger from "../../Images/burger.png";
import {LogoGif} from "../03Components/logoComponent"
import { Background } from "../03Components/background";


const Login: React.FC = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await requestGet(user, password);
      console.log(data);
      const token = data.accessToken;
      console.log(token);
      const role = data.user.role;
      console.log(role);
      const oli = localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("token", token);
      switch (role) {
        case "mesero":
          navigate("/waiter");
          console.log("se rutea para mesero");
          break;
        case "cocina":
          // navigate("/Cocina");
          console.log("se rutea para  cocinero")
          break;
        case "administrador":
          // navigate("/administrador");
          console.log("Se rutea para administrador");
          // Código a ejecutar si el rol es "administrador"
          break;
        default:
          console.log("soy default!")
          // Código a ejecutar si el rol no coincide con ninguno de los casos anteriores
          break;
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <article className="w-[97vw] h-[97vh] flex flex-col justify-start">

      <section className="z-1 w-[45vw] h-[45vh] p-1 justify-start items-start relative">
        <LogoGif/>
      </section>
      <form onSubmit={handleLogin} className="z-1 ml-[10%] flex flex-col justify-center items-center p-1 mt-[-9px]">
          <label className="mb-4 text-center block text-gray-700  text-[3rem] font-bold mb-[1%]">
            Usuario
          </label>
          <input className="shadow appearance-none border rounded w-[325px] h-[50px] text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-center z-1 " type="email"  placeholder="example@gmail.com" autoComplete="email" onChange={(e) => setUser(e.target.value)} style={{ fontSize: '1.5rem' }}/>
          <label className="mb-6 text-center block text-gray-700 text-[3rem] font-bold mb-[1%]">
            Contraseña
          </label>
          <input className="shadow appearance-none border rounded w-[325px] h-[50px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center z-1 " type="password" placeholder="******************" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)}style={{ fontSize: '1.5rem' }} />

      
          {error ? <p className="text-red text-2xl font-bold italic">{error}</p> : null}
        <button type="submit" className="text-[3rem] bg-colorButton hover:bg-emerald-300 text-brownText font-bold mt-[8%] rounded-full w-[365px] h-[70px] z-1">Iniciar sesión</button>
      </form>
      <Background/>
    </article>
  );
};

export default Login;