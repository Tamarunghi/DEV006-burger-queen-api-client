import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./01Routes/Login";
import { Waiter } from "./01Routes/Waiter";

const Myroute = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Login navigate={navigate} />} />
      <Route path="/waiter" element={<Waiter />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Myroute />
    </BrowserRouter>
  );
};

export default App;
