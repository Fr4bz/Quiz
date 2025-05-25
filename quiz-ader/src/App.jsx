import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Array di oggetti per le domande del quiz
// Ogni oggetto contiene:
// - question: la domanda
// - options: un array di 4 opzioni di risposta
// - correct: l'indice (0-3) della risposta corretta
// - explanation: la spiegazione dettagliata della risposta

// Funzione per randomizzare un array (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Funzione per caricare tutti i file domande (json/csv) dalla cartella src/domande
async function loadQuestions() {
  const context = require.context('./domande', false, /\\.(json|csv)$/);
  let allQuestions = [];

  for (const key of context.keys()) {
    if (key.endsWith('.json')) {
      const jsonData = context(key);
      allQuestions = allQuestions.concat(jsonData);
    } else if (key.endsWith('.csv')) {
      const csvData = context(key).default || context(key);
      const lines = csvData.split('\n').filter(Boolean);
      // Salta header
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(';');
        if (cols.length >= 7) {
          const correctMap = {A:0, B:1, C:2, D:3};
          allQuestions.push({
            question: cols[0],
            options: [cols[1], cols[2], cols[3], cols[4]],
            correct: correctMap[cols[5].trim().toUpperCase()] ?? 0,
            explanation: cols[6]
          });
        }
      }
    }
  }
  return shuffleArray(allQuestions);
}

// Component principale del quiz
function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Carica le domande all'avvio
  useEffect(() => {
    loadQuestions().then(setQuestions);
  }, []);

  // Gestisce la selezione di una risposta
  const handleAnswerSelect = (index) => {
    if (!showFeedback) { // Permette di selezionare solo se il feedback non è ancora mostrato
      setSelectedAnswer(index);
    }
  };

  // Verifica la risposta selezionata
  const handleCheckAnswer = () => {
    if (selectedAnswer !== null) {
      setShowFeedback(true);
      if (selectedAnswer === currentQuestion.correct) {
        setScore(score + 1);
      }
    } else {
      // Mostra un messaggio all'utente se non ha selezionato nulla
      alert("Seleziona una risposta prima di verificare!");
    }
  };

  // Passa alla prossima domanda o completa il quiz
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  // Resetta il quiz per ricominciare
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizCompleted(false);
  };

  // Stili per le opzioni di risposta
  const getOptionClasses = (index) => {
    let classes = "w-full p-3 mb-2 text-left rounded-lg transition-colors duration-200 ";
    if (showFeedback) {
      if (index === currentQuestion.correct) {
        classes += "bg-green-500 text-white font-bold"; // Risposta corretta
      } else if (index === selectedAnswer) {
        classes += "bg-red-500 text-white font-bold"; // Risposta sbagliata selezionata
      } else {
        classes += "bg-gray-200 text-gray-700 cursor-not-allowed"; // Altre risposte
      }
    } else {
      classes += "bg-blue-100 hover:bg-blue-200 text-blue-800 cursor-pointer";
      if (index === selectedAnswer) {
        classes += " ring-2 ring-blue-500"; // Evidenzia la selezione
      }
    }
    return classes;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Quiz Addetto Riscossione</h1>

        {quizCompleted ? (
          // Schermata finale del quiz
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quiz Completato!</h2>
            <p className="text-xl text-gray-600 mb-6">
              Il tuo punteggio finale è: <span className="font-bold text-blue-600">{score}</span> su <span className="font-bold text-blue-600">{questions.length}</span>
            </p>
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
            >
              Ricomincia Quiz
            </button>
          </div>
        ) : (
          // Schermata del quiz in corso
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Domanda {currentQuestionIndex + 1} di {questions.length}
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={getOptionClasses(index)}
                  disabled={showFeedback} // Disabilita i pulsanti dopo la verifica
                >
                  {String.fromCharCode(65 + index)}. {option}
                </button>
              ))}
            </div>

            {!showFeedback && (
              <button
                onClick={handleCheckAnswer}
                className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200"
                disabled={selectedAnswer === null} // Disabilita se nessuna risposta è selezionata
              >
                Verifica Risposta
              </button>
            )}

            {showFeedback && (
              <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
                <h3 className={`text-lg font-bold ${selectedAnswer === currentQuestion.correct ? 'text-green-700' : 'text-red-700'} mb-2`}>
                  {selectedAnswer === currentQuestion.correct ? "Corretto!" : "Sbagliato!"}
                </h3>
                <p className="text-gray-700 mb-4">
                  <span className="font-semibold">Spiegazione:</span> {currentQuestion.explanation}
                </p>
                <button
                  onClick={handleNextQuestion}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
                >
                  {currentQuestionIndex < questions.length - 1 ? "Prossima Domanda" : "Termina Quiz"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

// function App() {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [showFeedback, setShowFeedback] = useState(false);
//   const [score, setScore] = useState(0);
//   const [quizCompleted, setQuizCompleted] = useState(false);

//   const currentQuestion = questions[currentQuestionIndex];

//   // Gestisce la selezione di una risposta
//   const handleAnswerSelect = (index) => {
//     if (!showFeedback) { // Permette di selezionare solo se il feedback non è ancora mostrato
//       setSelectedAnswer(index);
//     }
//   };

//   // Verifica la risposta selezionata
//   const handleCheckAnswer = () => {
//     if (selectedAnswer !== null) {
//       setShowFeedback(true);
//       if (selectedAnswer === currentQuestion.correct) {
//         setScore(score + 1);
//       }
//     } else {
//       // Mostra un messaggio all'utente se non ha selezionato nulla
//       alert("Seleziona una risposta prima di verificare!");
//     }
//   };

//   // Passa alla prossima domanda o completa il quiz
//   const handleNextQuestion = () => {
//     setSelectedAnswer(null);
//     setShowFeedback(false);
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       setQuizCompleted(true);
//     }
//   };

//   // Resetta il quiz per ricominciare
//   const handleRestartQuiz = () => {
//     setCurrentQuestionIndex(0);
//     setSelectedAnswer(null);
//     setShowFeedback(false);
//     setScore(0);
//     setQuizCompleted(false);
//   };

//   // Stili per le opzioni di risposta
//   const getOptionClasses = (index) => {
//     let classes = "w-full p-3 mb-2 text-left rounded-lg transition-colors duration-200 ";
//     if (showFeedback) {
//       if (index === currentQuestion.correct) {
//         classes += "bg-green-500 text-white font-bold"; // Risposta corretta
//       } else if (index === selectedAnswer) {
//         classes += "bg-red-500 text-white font-bold"; // Risposta sbagliata selezionata
//       } else {
//         classes += "bg-gray-200 text-gray-700 cursor-not-allowed"; // Altre risposte
//       }
//     } else {
//       classes += "bg-blue-100 hover:bg-blue-200 text-blue-800 cursor-pointer";
//       if (index === selectedAnswer) {
//         classes += " ring-2 ring-blue-500"; // Evidenzia la selezione
//       }
//     }
//     return classes;
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Quiz Addetto Riscossione</h1>

//         {quizCompleted ? (
//           // Schermata finale del quiz
//           <div className="text-center">
//             <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quiz Completato!</h2>
//             <p className="text-xl text-gray-600 mb-6">
//               Il tuo punteggio finale è: <span className="font-bold text-blue-600">{score}</span> su <span className="font-bold text-blue-600">{questions.length}</span>
//             </p>
//             <button
//               onClick={handleRestartQuiz}
//               className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
//             >
//               Ricomincia Quiz
//             </button>
//           </div>
//         ) : (
//           // Schermata del quiz in corso
//           <div>
//             <p className="text-sm text-gray-500 mb-2">
//               Domanda {currentQuestionIndex + 1} di {questions.length}
//             </p>
//             <h2 className="text-xl font-semibold text-gray-800 mb-6">
//               {currentQuestion.question}
//             </h2>

//             <div className="space-y-3 mb-6">
//               {currentQuestion.options.map((option, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleAnswerSelect(index)}
//                   className={getOptionClasses(index)}
//                   disabled={showFeedback} // Disabilita i pulsanti dopo la verifica
//                 >
//                   {String.fromCharCode(65 + index)}. {option}
//                 </button>
//               ))}
//             </div>

//             {!showFeedback && (
//               <button
//                 onClick={handleCheckAnswer}
//                 className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200"
//                 disabled={selectedAnswer === null} // Disabilita se nessuna risposta è selezionata
//               >
//                 Verifica Risposta
//               </button>
//             )}

//             {showFeedback && (
//               <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
//                 <h3 className={`text-lg font-bold ${selectedAnswer === currentQuestion.correct ? 'text-green-700' : 'text-red-700'} mb-2`}>
//                   {selectedAnswer === currentQuestion.correct ? "Corretto!" : "Sbagliato!"}
//                 </h3>
//                 <p className="text-gray-700 mb-4">
//                   <span className="font-semibold">Spiegazione:</span> {currentQuestion.explanation}
//                 </p>
//                 <button
//                   onClick={handleNextQuestion}
//                   className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
//                 >
//                   {currentQuestionIndex < questions.length - 1 ? "Prossima Domanda" : "Termina Quiz"}
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
