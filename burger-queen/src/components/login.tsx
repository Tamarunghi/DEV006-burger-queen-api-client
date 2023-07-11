import React, { useState } from "react";
import { requestGet } from "../functions/request";

const Login: React.FC = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    requestGet(user, password)
      .then((token) => {
        localStorage.setItem("token", token);
        console.log("hasta aqui , todo bien");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div>
      <input type="email" placeholder="email" onChange={(e)=>setUser(e.target.value)}/>
      <input type="password" placeholder="contraseña" onChange={(e)=>setPassword(e.target.value)}/>
      {error ? <p>{error}</p> : null}
      <button onClick={handleLogin}>Enviar</button>
    </div>
  );
};

export default Login;