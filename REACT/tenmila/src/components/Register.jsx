// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import service from "../service";

// const saveUser = (username) => {
//   localStorage.setItem("username", username);
// };

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [level, setLevel] = useState(1);
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     try {
//       const user = await service.getByUserName(username);
//       if (user && user.username == username) {
//         prompt("שם משתמש תפוס, הכנס שם אחר")
//       }
//       else {
//         service.addUser(level, username, password)
//         saveUser(username);
//         navigate("/personal-area");
//       }
//     }
//     catch (error) {
//       console.error('Error fetchung register:', error)
//       throw error;
//     }
//   }

//   return (
//     <div className="container mt-5">
//       <h2>הרשמה</h2>
//       <input
//         type="text"
//         placeholder="שם משתמש"
//         className="form-control"
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="סיסמה"
//         className="form-control mt-2"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <input
//         list="levels"
//         placeholder="בחר רמה"
//         className="form-control mt-2"
//         onChange={(e) => setLevel({ מתחיל: 1, מתקדם: 2, מקצועי: 3, }[e.target.value] || 1)}
//       />
//       <datalist id="levels">
//         <option value="מתחיל" />
//         <option value="מתקדם" />
//         <option value="מקצועי" />
//       </datalist>
//       <button className="btn btn-primary mt-3" onClick={handleSignup}>
//         הירשם
//       </button>
//       <p className="mt-2">
//         <Link to="/login">כבר רשום? התחבר כאן</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import service from "../service";
import "../index.css"

const saveUser = (username) => {
  localStorage.setItem("username", username);
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (!username || !password) {
        setError("נא למלא שם משתמש וסיסמה");
        return;
      }

      // בדיקת קיום המשתמש
      const user = await service.getIsExistUser(username);
      // if (user) {
      //   setError("שם המשתמש כבר תפוס, בחר שם אחר");
      //   return;
      // }

      // הוספת המשתמש
      await service.addUser(level, username, password);
      saveUser(username);
      navigate("/personal-area");
    } catch (error) {
      console.error("Error during registration:", error);
      setError("שם המשתמש כבר תפוס, בחר שם אחר");
    }
  };

  return (
    <div className="container mt-5">
      <h2>הרשמה</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <input
        type="text"
        placeholder="שם משתמש"
        className="form-control"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="סיסמה"
        className="form-control mt-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        list="levels"
        placeholder="בחר רמה"
        className="form-control mt-2"
        onChange={(e) =>
          setLevel(e.target.value === "מתחיל" ? 1 : e.target.value === "מתקדם" ? 2 : 3)
        }
      />
      <datalist id="levels">
        <option value="מתחיל" />
        <option value="מתקדם" />
        <option value="מקצועי" />
      </datalist>
      <button className="btn btn-primary mt-3" onClick={handleSignup}>
        הירשם
      </button>
      <p className="mt-2">
        <Link to="/login">כבר רשום? התחבר כאן</Link>
      </p>
    </div>
  );
};

export default Register;
