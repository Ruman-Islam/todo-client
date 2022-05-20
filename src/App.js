import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from "./pages/Login";
import ToDo from "./pages/ToDo";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import PrivateRoute from "./authentication/PrivateRoute";

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={
            <PrivateRoute>
              <ToDo />
            </PrivateRoute>} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
