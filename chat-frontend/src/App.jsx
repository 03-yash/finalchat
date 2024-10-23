import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notuser from "./pages/Notuser";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import SetAvatar from "./pages/SetAvatar";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/notuser" element={<Notuser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="image" element={<SetAvatar />} />
        </Route>
        <Route path="/" element={<Chat />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
