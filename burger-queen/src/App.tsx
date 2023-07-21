
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './01Routes/Login';
import {Waiter} from './01Routes/Waiter';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/waiter" element={<Waiter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

  