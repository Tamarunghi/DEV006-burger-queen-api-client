import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Login from "./01Routes/Login";
import { Chef } from "./01Routes/Chef";
import { Waiter } from "./01Routes/Waiter";
import { ProtectedRoute } from "./ProtectedRoute";

const NotFound = () => {
  return <Navigate to="/" />;
};

const Myroute = () => {
  const navigate = useNavigate();
  // Supongo que obtienes el estado de autenticación de alguna manera
  const logged = true; // Cambia esto según la lógica de tu aplicación

  return (
    <Routes>
      <Route path="/" element={<Login navigate={navigate} />} />
      <Route path="/waiter" element={
        // <ProtectedRoute logged={logged} allowedRoles={['mesero']}>
          <Waiter />
        // </ProtectedRoute>
      } />
      <Route path="/chef" element={
        // <ProtectedRoute logged={logged} allowedRoles={['cocina']}>
          <Chef />
        // </ProtectedRoute>
      } />
      {/* Ruta comodín para redirigir a Login en caso de ruta incorrecta */}
      <Route path="*" element={<NotFound />} />
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