// // export default Test;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import service from "../service";

// const Test = () => {
//   const [questions, setQuestions] = useState([]);
//   const [score, setScore] = useState(0);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const navigate = useNavigate();
//   const username = localStorage.getItem("username");

//   useEffect(() => {
//     if (!username) {
//       navigate("/login");
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const response = await service.getDailyWords(username);
//         const words = response[0]?.words || []; // גישה למילים בתוך המערך הראשון
//         const questionsData = generateTestQuestions(words);
//         setQuestions(questionsData);
//       } catch (error) {
//         console.error("Error loading test questions:", error);
//       }
//     };

//     fetchData();
//   }, [username, navigate]);

//   const generateTestQuestions = (words) => {
//     if (!words || words.length === 0) return [];

//     return words.map((wordObj) => {
//       const correctTranslation = wordObj.translate;
//       const wrongOptions = words
//         .filter((w) => w.translate !== correctTranslation)
//         .map((w) => w.translate);

//       const shuffledOptions = shuffleArray([correctTranslation, ...wrongOptions.slice(0, 2)]);
//       return {
//         word: wordObj.word,
//         options: shuffledOptions,
//         answer: correctTranslation,
//       };
//     });
//   };

//   const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

// const handleAnswer = (option) => {
//   let newScore = score;

//   if (option === questions[currentQuestion].answer) {
//     newScore += 1;
//     setScore(newScore);
//   }

//   const nextQuestion = currentQuestion + 1;
//   if (nextQuestion < questions.length) {
//     setCurrentQuestion(nextQuestion);
//   } else {
//     navigate("/finish", { state: { score: newScore } });
//   }
// };


//   if (questions.length === 0) return <p>טוען שאלות...</p>;

//   return (
//     <div className="container mt-5">
//       <h2>מבחן יומי</h2>
//       <p>מהי המשמעות של המילה: <strong>{questions[currentQuestion].word}</strong>?</p>
//       {questions[currentQuestion].options.map((option, index) => (
//         <button key={index} className="btn btn-outline-primary m-2" onClick={() => handleAnswer(option)}>
//           {option}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Test;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import service from "../service";

// const Test = () => {
//   const [questions, setQuestions] = useState([]);  // שאלות המבחן
//   const [score, setScore] = useState(0);  // הציון הנוכחי
//   const [currentQuestion, setCurrentQuestion] = useState(0);  // אינדקס השאלה הנוכחית
//   const navigate = useNavigate();
//   const username = localStorage.getItem("username");

//   useEffect(() => {
//     if (!username) {
//       navigate("/login");
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         // טוען מילים יומיות מה-API
//         const response = await service.getDailyWords(username);
//         const words = response[0]?.words || [];  // גישה למילים בתוך המערך הראשון

//         // טוען מילים שנלמדו
//         const learnedWordsResponse = await service.getLearnedWords(username);
//         const learnedWords = learnedWordsResponse || [];

//         // יוצר את השאלות
//         const questionsData = generateTestQuestions(words, learnedWords);
//         setQuestions(questionsData);
//       } catch (error) {
//         console.error("Error loading test questions:", error);
//       }
//     };

//     fetchData();
//   }, [username, navigate]);

//   const generateTestQuestions = (words, learnedWords) => {
//     if (!words || words.length === 0) return [];

//     // איחוד של מילים חדשות ומילים שנלמדו
//     const allWords = [...words, ...learnedWords];

//     let usedWords = [];  // מערך למילים שכבר נבחנו
//     return allWords.map((wordObj) => {
//       // אם המילה כבר נבחנה, נוותר עליה
//       if (usedWords.includes(wordObj.word)) return null;

//       const correctTranslation = wordObj.translate;
//       // מסננים את המילים שכבר נבחנו
//       const wrongOptions = allWords
//         .filter((w) => w.translate !== correctTranslation && !usedWords.includes(w.word))
//         .map((w) => w.translate);

//       // מערבבים את התשובות (האפשרות הנכונה + 2 תשובות שגויות)
//       const shuffledOptions = shuffleArray([correctTranslation, ...wrongOptions.slice(0, 2)]);

//       usedWords.push(wordObj.word);  // מסמנים את המילה שנבחרה

//       return {
//         word: wordObj.word,
//         options: shuffledOptions,
//         answer: correctTranslation,
//       };
//     }).filter(Boolean);  // מסנן את המילים שאין להן שאלה
//   };

//   const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

//   const handleAnswer = (option) => {
//     let newScore = score;

//     // אם התשובה נכונה, מוסיפים נקודה לציון
//     if (option === questions[currentQuestion].answer) {
//       newScore += 1;
//       setScore(newScore);
//     }

//     const nextQuestion = currentQuestion + 1;
//     // אם יש שאלות נוספות, עוברים אל השאלה הבאה
//     if (nextQuestion < questions.length) {
//       setCurrentQuestion(nextQuestion);
//     } else {
//       // בסיום המבחן, עוברים לדף סיום ומעבירים את הציון
//       navigate("/finish", { state: { score: newScore } });
//     }
//   };

//   if (questions.length === 0) return <p>טוען שאלות...</p>;

//   return (
//     <div className="container mt-5">
//       <h2>מבחן יומי</h2>
//       <p>מהי המשמעות של המילה: <strong>{questions[currentQuestion].word}</strong>?</p>
//       {questions[currentQuestion].options.map((option, index) => (
//         <button
//           key={index}
//           className="btn btn-outline-primary m-2"
//           onClick={() => handleAnswer(option)}
//         >
//           {option}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Test;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import service from "../service";
import "../index.css"

const Test = () => {
  const [questions, setQuestions] = useState([]);  // שאלות המבחן
  const [score, setScore] = useState(0);  // הציון הנוכחי
  const [currentQuestion, setCurrentQuestion] = useState(0);  // אינדקס השאלה הנוכחית
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // טוען מילים יומיות מה-API
        const response = await service.getDailyWords(username);
        const words = response[0]?.words || [];  // גישה למילים בתוך המערך הראשון

        // טוען מילים שנלמדו
        const learnedWordsResponse = await service.getLearnedWords(username);
        const learnedWords = learnedWordsResponse || [];

        // יוצר את השאלות
        const questionsData = generateTestQuestions(words, learnedWords);
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error loading test questions:", error);
      }
    };

    fetchData();
  }, [username, navigate]);

  /**
   * פונקציה ליצירת שאלות מבחן מתוך המילים החדשות והמילים שנלמדו
   * @param {Array} words - מילים יומיות שנשלחו מהשרת
   * @param {Array} learnedWords - מילים שנלמדו בעבר
   * @returns {Array} - מערך שאלות המבחן
   */
  const generateTestQuestions = (words, learnedWords) => {
    if (!words || words.length === 0) return [];

    const allWords = [...words, ...learnedWords]; // מאגר כל המילים
    let usedWords = new Set(); // מילים שהופיעו בשאלות
    let questions = [];

    // יצירת 8 השאלות הראשונות עם דרישה שהתשובות השגויות לא יכילו מילים שכבר הופיעו בשאלות
    for (let wordObj of allWords) {
      if (questions.length >= 8) break;

      if (usedWords.has(wordObj.word)) continue;
      const correctTranslation = wordObj.translate;

      // בחירת תשובות שגויות שאינן בשימוש קודם
      let wrongOptions = allWords
        .filter((w) => w.translate !== correctTranslation && !usedWords.has(w.word))
        .map((w) => w.translate);

      shuffleArray(wrongOptions);

      // אם אין מספיק אפשרויות שגויות, ממשיכים למילה הבאה
      if (wrongOptions.length < 2) continue;

      // יצירת השאלה
      questions.push({
        word: wordObj.word,
        options: shuffleArray([correctTranslation, ...wrongOptions.slice(0, 2)]),
        answer: correctTranslation,
      });

      usedWords.add(wordObj.word);
    }

    // יצירת 2 השאלות האחרונות
    // יצירת 2 השאלות האחרונות עם אפשרות שהתשובות השגויות יכללו מילים שנבחנו עליהן
    while (questions.length < 10 && allWords.length > 0) {
      let wordObj = allWords.pop(); // לוקחים מילה חדשה למבחן
      const correctTranslation = wordObj.translate;
      console.log(`${wordObj.word}-----------------------------------------------------`)

      // בחירת תשובות שגויות ללא מגבלה על מילים שכבר הופיעו
      let wrongOptions = allWords
        .filter((w) => w.translate !== correctTranslation)
        .map((w) => w.translate);

      shuffleArray(wrongOptions);

      // וידוא שיש שלוש אפשרויות (תשובה נכונה + 2 שגויות)
      if (wrongOptions.length < 2) continue;

      const shuffledOptions = shuffleArray([correctTranslation, wrongOptions[0], wrongOptions[1]]);

      questions.push({
        word: wordObj.word,
        options: shuffledOptions,
        answer: correctTranslation,
      });
      usedWords.add(wordObj.word);
    }

    return questions;
  };

  /**
   * פונקציה לערבוב תשובות באופן רנדומלי
   * @param {Array} array - מערך התשובות
   * @returns {Array} - מערך תשובות מעורבב
   */
  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  /**
   * פונקציה לטיפול בתשובה שנבחרה
   * @param {string} option - התשובה שנבחרה
   */
  const handleAnswer = (option) => {
    let newScore = score;

    // אם התשובה נכונה, מוסיפים נקודה לציון
    if (option === questions[currentQuestion].answer) {
      newScore += 1;
      setScore(newScore);
    }

    const nextQuestion = currentQuestion + 1;
    // אם יש שאלות נוספות, עוברים אל השאלה הבאה
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // בסיום המבחן, עוברים לדף סיום ומעבירים את הציון
      navigate("/finish", { state: { score: newScore } });
    }
  };

  // אם לא נטענו שאלות, מציגים הודעה
  if (questions.length === 0) return <p>טוען שאלות...</p>;

  return (
    <div className="container mt-5">
      <h2>מבחן יומי</h2>
      <p>מהי המשמעות של המילה: <strong>{questions[currentQuestion].word}</strong>?</p>
      {questions[currentQuestion].options.map((option, index) => (
        <button
          key={index}
          className="btn btn-outline-primary m-2"
          onClick={() => handleAnswer(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Test;
