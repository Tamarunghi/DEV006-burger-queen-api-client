import React, { useState } from "react";
import { requestGet } from "../../functions/request";
import { useNavigate } from 'react-router-dom';
import styles from '../Login/Login.module.css';
import burgerQueen from "../../Images/burgerQueen.gif";
//import burguer from "../../Images/burguer"


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
    <article className="bg-bgLogin">
      <section  className={`${styles.logo}`}
        style={{ backgroundImage: `url(${burgerQueen})` }}></section>
        <form onSubmit={handleLogin}>
      <input className={styles.inputText} type="email" placeholder="email" autoComplete="email" onChange={(e) => setUser(e.target.value)} />
      <input className={styles.inputText} type="password" placeholder="contraseña" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
      {error ? <p>{error}</p> : null}
      <button type="submit">Enviar</button>
      </form>
    </article>
  );
};

export default Login;
