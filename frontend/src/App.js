import { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./state/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  // useContextでどこからでも、userの状態を取ってこれる
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={user ? <Home /> : <Register />} /> */}
        {/* ユーザーがいればホームComponent、いなければ新規登録のComponentへ */}

        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        {/* <Navigate to="/" />は、リダイレクト用のComponent */}

        {/* <Route path="/register" element={<Register />} /> */}
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
