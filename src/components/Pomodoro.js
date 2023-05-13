import React, { useState, useEffect } from "react";
import "../pomodoro.css"

const Pomodoro = () => {
 
  const  [sessionType,setSessionType] = useState("Pomodoro");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroLength, setPomodoroLength] = useState(25);
  const [shortBreakLength, setShortBreakLength] = useState(5);
  const [longBreakLength, setLongBreakLength] = useState(15);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let intervalId = null;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft === 0) {
            clearInterval(intervalId);
            return 0;
          } else {
            return timeLeft - 1;
          }
        });
      }, 1000);
    } else if (!isRunning && timeLeft !== 0) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  const handleSessionTypeClick = sessionType => {
    switch (sessionType) {
      case "Pomodoro":
        setSessionType("Pomodoro");
        setTimeLeft(pomodoroLength * 60);
        break;
      case "Short Break":
        setSessionType("Short Break");
        setTimeLeft(shortBreakLength * 60);
        break;
      case "Long Break":
        setSessionType("Long Break");
        setTimeLeft(longBreakLength * 60);
        break;
      default:
        break;
    }
  };



  // const handlePomodoroLengthChange = e => {
  //   setPomodoroLength(e.target.value);
  //   if (sessionType === "Pomodoro") {
  //     setTimeLeft(e.target.value * 60);
  //   }
  // };

  // const handleShortBreakLengthChange = e => {
  //   setShortBreakLength(e.target.value);
  //   if (sessionType === "Short Break") {
  //     setTimeLeft(e.target.value * 60);
  //   }
  // };

  // const handleLongBreakLengthChange = e => {
  //   setLongBreakLength(e.target.value);
  //   if (sessionType === "Long Break") {
  //     setTimeLeft(e.target.value * 60);
  //   }
  // };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setSessionType("Pomodoro");
    setTimeLeft(pomodoroLength * 60);
    setIsRunning(false);
  };

  return (
    <div className=" parent" >
     <div className=" container" >
       <div >
         <button className="session-type-button" onClick={() => handleSessionTypeClick("Pomodoro")}>
           Pomodoro
         </button>
        
         <button className="session-type-button" onClick={() => handleSessionTypeClick("Short Break")}>
           Short Break
         </button>
         
         <button className="session-type-button" onClick={() => handleSessionTypeClick("Long Break")}>
           Long Break
         </button>
         
       </div>
       <div className="timer-container">
         {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
       </div>
       <div >
         <button className="control-button" onClick={handleStartPause}>
           {isRunning ? "Pause" : "Start"}
         </button>
         
       </div>

       <div>
       <button className="setting-button" onClick={() => setShowModal(true)}>
        Reset
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <input
              type="number"
              value={pomodoroLength}
              onChange={(e) => setPomodoroLength(e.target.value)}
            />
            <input
              type="number"
              value={shortBreakLength}
              onChange={(e) => setShortBreakLength(e.target.value)}
            />
            <input
              type="number"
              value={longBreakLength}
              onChange={(e) => setLongBreakLength(e.target.value)}
            />
            <button className="control-button" onClick={handleReset}>
              OK
            </button>
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
       </div>

     </div>
     </div>   
   );
 };
 
 export default Pomodoro;