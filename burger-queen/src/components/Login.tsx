import React, { useState } from "react";
import { requestGet } from "../functions/request";

const Login: React.FC = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const token = await requestGet(user, password);
      localStorage.setItem("token", token);
      console.log("hasta aqui , todo bien");
    } catch (error :any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="email"
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="password"
        placeholder="contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error ? <p>{error}</p> : null}
      <button onClick={handleLogin}>Enviar</button>
    </div>
  );
};

export default Login;
