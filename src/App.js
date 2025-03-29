import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import TypingTest from "./components/TypingTest";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import SessionsPage from "./pages/SessionsPage";

function App() {
  const { user } = useContext(AuthContext); // Check if user is logged in
  //console.log(user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/typing-test" element={user ? <TypingTest /> : <Navigate to="/login" />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/sessions" element={user ? <SessionsPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
