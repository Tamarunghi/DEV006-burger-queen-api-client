import React, { useState } from "react";
import { requestGet } from "../../functions/request";
import { useNavigate } from 'react-router-dom';
import styles from '../Login/Login.module.css';
import burgerQueen from "../../Images/logoWithBG.gif";
import burger from "../../Images/burger.png";


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
      localStorage.setItem("token", token);
      switch (role) {
        case "mesero":
          navigate("/Waiter");
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
      <section className="z-1 w-1/2 h-1/2 p-2 justify-start items-start relative">
        <img src={burgerQueen} alt="burgerQueenLogo" className="absolute top-0 left-0" />
      </section>
      <form onSubmit={handleLogin} className="z-1 ml-[40%] flex flex-col justify-center items-center p-2">
          <label className="mb-4 text-center block text-gray-700  text-[3rem] font-bold mb-[1%]">
            Usuario
          </label>
          <input className="shadow appearance-none border rounded w-[240px] h-[40px] text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-center z-1" type="email" placeholder="example@gmail.com" autoComplete="email" onChange={(e) => setUser(e.target.value)} />
          <label className="mb-6 text-center block text-gray-700 text-[3rem] font-bold mb-[1%]">
            Contraseña
          </label>
          <input className="shadow appearance-none border rounded w-[240px] h-[40px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center z-1" type="password" placeholder="******************" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
          {error ? <p className="text-red-500 text-2xl italic">{error}</p> : null}
        <button type="submit" className="text-[3rem] bg-colorButton hover:bg-emerald-300 text-brownText font-bold mt-[8%] rounded-full w-[365px] h-[70px] z-1">Iniciar sesión</button>
      </form>
      <section className="z-0">
      <img src={burger} alt="burger" className=" h-auto	w-9/12 absolute top-[-34px] right-[-196px] -rotate-135 opacity-50	"/>
      <img src={burger} alt="burger" className="h-auto	w-9/12 absolute bottom-[-71px] left-[-180px] rotate-45 opacity-50	"/>
      </section> 
    </article>
  );
};

export default Login;