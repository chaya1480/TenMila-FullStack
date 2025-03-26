// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import service from "../service";

// const PersonalArea = () => {
//   const navigate = useNavigate();
//   const username = localStorage.getItem("username");

//   const [words, setWords] = useState([]);
//   const [learnedWords, setlearnedWords] = useState([]);
//   const [alreadyTest, setAlreadyTest] = useState(false);

//   useEffect(() => {
//     if (!username) {
//       navigate("/login");
//       return;
//     }
    
//     const fetchData = async () => {
//       try {
//         await service.setDate(username); 

//         const userDate = await service.getUserDate(username);
//         const today = new Date().toISOString().split("T")[0];

//         if (userDate) {
//           const userDateFormatted = new Date(userDate).toISOString().split("T")[0];

//           if (userDateFormatted === today) {
//             setAlreadyTest(true);
//             return;
//           }
//         }
//         const learnedWordsList = await service.getLearnedWords(username);
//         setlearnedWords(learnedWordsList);
        
//         const userIndex = await service.getUserIndex(username);
//         if (userIndex !== null) {
//           const wordsList = await service.getWordsByIndex(userIndex);
//           setWords(wordsList);

//           await service.setDate(username);
//           await service.setDailyWords(username, wordsList);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [username]);

//   const handleFinish = () => {
//     if (window.confirm("תרצה להיבחן היום?")) {
//       navigate("/test");
//     } else {
//       localStorage.removeItem("username");
//       navigate("/finish");
//     }
//   };

//   const learnedWord = () => {
//     {
//       learnedWords.length > 0 ? (
//         <ul className="list-group">
//           {learnedWords.map((word) => (
//             <li key={word._id} className="list-group-item">
//               {word.word} - {word.translate}
//             </li>
//           ))}
//         </ul>
//       ) : (
//       <p>טוען מילים...</p>
//     )
//     }
//   };

//   if (alreadyTest) {
//     return (
//       <div className="container mt-5">
//         <h2>{username}, למדת את המילים היומיות</h2>
//         <h4>מחכים לך מחר!!</h4>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-5">
//       <h2>ברוך הבא, {username}</h2>
//       <h4>המילים היומיות שלך:</h4>
//       {words.length > 0 ? (
//         <ul className="list-group">
//           {words.map((word) => (
//             <li key={word._id} className="list-group-item">
//               {word.word} - {word.translate}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>טוען מילים...</p>
//       )}
//       <button className="btn btn-success mt-3" onClick={handleFinish}>
//         סיום
//       </button>
//       <button className="btn btn-success mt-3" onClick={learnedWord}>
//         מה אני כבר יודעת?
//       </button>
//     </div>
//   );
// };

// export default PersonalArea;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import service from "../service";
import "../index.css"

const PersonalArea = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [words, setWords] = useState([]);
  const [learnedWords, setlearnedWords] = useState([]);
  const [alreadyTest, setAlreadyTest] = useState(false);

  useEffect(() => {
    if (!username) {
      navigate("/login");
      return;
    }
    
    const fetchData = async () => {
      try {
        const userDate = await service.getUserDate(username);
        const today = new Date().toISOString().split("T")[0];

        if (userDate) {
          const userDateFormatted = new Date(userDate).toISOString().split("T")[0];

          if (userDateFormatted === today) {
            setAlreadyTest(true);
            return;
          }
        }
        const learnedWordsList = await service.getLearnedWords(username);
        setlearnedWords(learnedWordsList);
        
        const userIndex = await service.getUserIndex(username);
        if (userIndex !== null) {
          const wordsList = await service.getWordsByIndex(userIndex);
          setWords(wordsList);

          await service.setDate(username);
          await service.setDailyWords(username, wordsList);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  const handleFinish = () => {
    if (window.confirm("תרצה להיבחן היום?")) {
      navigate("/test");
    } else {
      localStorage.removeItem("username");
      navigate("/finish");
    }
  };

  if (alreadyTest) {
    return (
      <div className="container mt-5 personal-area">
        <h2>{username}, למדת את המילים היומיות</h2>
        <h4>מחכים לך מחר!!</h4>
      </div>
    );
  }

  return (
    <div className="container mt-5 personal-area">
      <h2>ברוך הבא, {username}</h2>
      <h4>המילים היומיות שלך:</h4>
      {words.length > 0 ? (
        <ul className="word-list">
          {words.map((word) => (
            <li key={word._id} className="word-item">
              <span className="word-text">{word.word}</span>
              <span className="word-translation">{word.translate}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>טוען מילים...</p>
      )}
      <button className="btn-finish" onClick={handleFinish}>
        סיום
      </button>
    </div>
  );
};

export default PersonalArea;
