
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import {Waiter} from './components/Waiter';

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

  // email: grace.hopper@systers.xyz,
  // password: "123456"