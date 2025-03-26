import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css"

const EndPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || -1;

  useEffect(() => {
    // if (!username) {
    //   navigate("/login");
    //   return;
    // }
    localStorage.removeItem("username"); // מחיקת המשתמש רק כשהמשתמש מגיע לדף הסיום
  }, []);

  return (
    <div className="container mt-5 text-center">
      {score !== -1 && (
        <>
          <h2>כל הכבוד!</h2>
          <p>סיימת את המבחן בהצלחה. הציון שלך: <strong>{score}</strong></p>
        </>
      )}
      <p>נתראה מחר ללמידה חדשה!</p>
      <button className="btn btn-primary" onClick={() => navigate("/")}>חזרה לדף הראשי</button>
    </div>
  );
};

export default EndPage;
