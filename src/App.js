import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from "./pages/Login";
import ToDo from "./pages/ToDo";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<ToDo />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
