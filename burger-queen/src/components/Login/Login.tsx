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
      <section className="w-1/2 h-1/2 p-2 justify-start items-start relative">
        <img src={burgerQueen} alt="burgerQueenLogo" className="absolute top-0 left-0" />
      </section>
      <form onSubmit={handleLogin} className="mr-[10%] flex flex-col justify-end items-end p-2">
        <div className="mb-4">
          <label className="block text-gray-700  text-sm font-bold mb-2">
            Usuario
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center" type="email" placeholder="example@gmail.com" autoComplete="email" onChange={(e) => setUser(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contraseña
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-center" type="password" placeholder="******************" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
          {error ? <p className="text-red-500 text-xs italic">{error}</p> : null}
        </div>
        <button type="submit" className="bg-colorButton hover:bg-emerald-300 text-brownText font-bold py-2 px-4 rounded-full w-40 h-15">Iniciar sesión</button>
      </form>
      <section>
      <img src={burger} alt="burger" className=" h-auto	w-9/12 absolute top-[-34px] right-[-127px] -rotate-135 -z-1 opacity-50	"/>
      <img src={burger} alt="burger" className="h-auto	w-9/12 absolute bottom-[68px] left-[-180px] rotate-45 -z-1 opacity-50	"/>
      </section>
    </article>
  );
};

export default Login;