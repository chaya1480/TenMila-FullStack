import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import service from "../service";
import "../index.css"

const saveUser = (username) => localStorage.setItem("username", username);

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await service.getByUserName(username);
    if (String(user.username) == String(username) && String(user.password) == String(password)) {
      saveUser(username);
      navigate("/personal-area");
    }
    else
      alert("הפרטים שגויים")
  };

  return (
    <div className="container mt-5">
      <h2>התחברות</h2>
      <input type="text" placeholder="שם משתמש" className="form-control" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="סיסמה" className="form-control mt-2" onChange={(e) => setPassword(e.target.value)} />
      <button className="btn btn-primary mt-3" onClick={handleLogin}>התחבר</button>
      <p className="mt-2"><Link to="/signup">עדיין לא רשום? הירשם כאן</Link></p>
    </div>
  );
};

export default Login;
