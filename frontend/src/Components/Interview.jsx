import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import styled from "styled-components";
import Webcam from "react-webcam";
import { MdCopyAll } from "react-icons/md";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader } from "./Loader ";

export const Interview = () => {
  const { transcript, browserSupportsSpeechRecognition, resetTranscript, listening } = useSpeechRecognition();
  const [text, setText] = useState("");
  const [isCopied, setCopied] = useClipboard(text);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeed, setShowFeed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const techStack = searchParams.get("techStack") || "";
  const [questions, setQuestions] = useState([]);
  const [render, setRender] = useState(false);
  const [feedBack, setFeedBack] = useState("");
  const [cameraError, setCameraError] = useState(null);

  const videoConstraints = {
    width: 320,
    height: 240,
    facingMode: "user",
  };

  const start = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const stop = () => {
    SpeechRecognition.stopListening();
  };

  const handleClear = () => {
    resetTranscript();
    setText("");
  };

  const handleNextQuestion = () => {
    setShowFeed(false);
    resetTranscript();
    setText("");

    if (currentIndex === questions.length - 1) {
      navigate("/thankyou");
    } else {
      setCurrentIndex((prev) => prev + 1);
    }

    window.speechSynthesis.cancel();
  };

  const handlePrevious = () => {
    setShowFeed(false);
    resetTranscript();
    setText("");
    setCurrentIndex((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
    window.speechSynthesis.cancel();
  };

  useEffect(() => {
    if (!techStack) return;
    setRender(true);
    axios
      .get(`http://localhost:9090/questions/get?techStack=${techStack}`)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, [techStack]);

  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSubmit = () => {
    if (!questions.length) return;

    setShowFeed(true);
    setIsLoading(true);
    SpeechRecognition.stopListening();

    const prompt = `Question: ${questions[currentIndex]?.question} Answer: ${transcript} Give feedback. Rate Subject Matter Expertise and Communication (0-10). Do not mention AI.`;

    axios
      .post("http://localhost:9090/bot/chat", { prompt })
      .then((res) => {
        setFeedBack(res.data);
        setIsLoading(false);
        const utterance = new SpeechSynthesisUtterance(res.data);
        window.speechSynthesis.speak(utterance);
      })
      .catch((error) => {
        console.error("Feedback API error:", error);
        setIsLoading(false);
      });
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  return (
    <div>
      {render && (
        <DIV>
          {showFeed ? (
            <div className="feedback-container">
              <div className="feedback">
                <div className="student-answer">
                  <h1 className="student-answer-heading">Your Answer</h1>
                  <p>{transcript}</p>
                </div>
                <div className="chat-feedback">
                  {!isLoading && <p className="feedback-heading">Feedback</p>}
                  {isLoading ? (
                    <div className="loader">
                      <Loader />
                    </div>
                  ) : (
                    <p>{feedBack}</p>
                  )}
                </div>
              </div>
              {!isLoading && (
                <div className="next-prev-container">
                  <button className="next-Question-btn" onClick={handlePrevious}>
                    Previous Question
                  </button>
                  <button className="next-Question-btn" onClick={handleNextQuestion}>
                    Next Question
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="question-and-cam-container">
                <div className="question-container">
                  <h1>Question {currentIndex + 1}</h1>
                  <p className="question">
                    {currentIndex + 1}. {questions[currentIndex]?.question}
                  </p>
                  <p className="Caution">
                    Caution: Please do not refresh or use the browser navigation buttons. Doing so will reset your progress and the interview will restart from the beginning.
                  </p>
                </div>
                <div className="cam-container">
                  {cameraError ? (
                    <p className="camera-error">{cameraError}</p>
                  ) : (
                    <Webcam
                      audio={false}
                      height={240}
                      width={320}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                      onUserMedia={() => setCameraError(null)}
                      onUserMediaError={() => setCameraError("Please enable camera access.")}
                    />
                  )}
                </div>
              </div>

              <p
                style={{
                  fontWeight: "bold",
                  color: listening ? "green" : "red",
                  textAlign: "center",
                }}
              >
                Mic: {listening ? "Listening..." : "Not Listening"}
              </p>

              <div className="speech-text-container">
                {transcript ? (
                  transcript
                ) : (
                  <h2 className="your_answer">
                    Click on Start button and start speaking, then submit your answer after completing.
                  </h2>
                )}
              </div>

              <div className="btn-contianer">
                <div>
                  <button className="btn copy" onClick={setCopied}>
                    {isCopied ? "Copied!" : "Copy"} <MdCopyAll className="copy-icon" />
                  </button>
                </div>
                <div>
                  <button className="btn" onClick={start}>Start</button>
                  <button className="btn stop" onClick={stop}>Stop</button>
                  <button className="btn" onClick={handleClear}>Clear</button>
                  <button className="btn" onClick={handleSubmit} disabled={!transcript}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </DIV>
      )}
    </div>
  );
};

// Optional: Add your styled-components (DIV) here if not imported externally

const DIV = styled.div`
  .speech-text-container {
    width: 90%;
    height: 250px;
    border: solid lightgray 1px;
    border-radius: 5px;
    margin: auto;
    margin-top: 10px;
    padding: 20px;
    text-align: start;
  }

  .question-and-cam-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 93%;
    margin: auto;
    margin-bottom: 20px;
  }

  .question-container {
    width: 60%;
    text-align: left;
    padding: 20px;
  }

  .cam-container {
    width: 320px;
    height: 240px;
    border: 2px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .camera-error {
    color: red;
    font-weight: bold;
    text-align: center;
  }

  .question {
    font-size: 18px;
    margin-left: 20px;
  }

  .your_answer {
    margin-left: 20px;
  }

  .btn-contianer {
    display: flex;
    justify-content: space-between;
    width: 94%;
    margin: auto;
  }

  .btn {
    padding: 10px 25px;
    border: solid lightgray 1px;
    margin: 10px 15px;
    border-radius: 5px;
    background-color: #05396b;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    color: white;
    font-weight: 700;
  }

  .btn:hover {
    background-color: #97afc6;
    color: white;
  }

  .copy {
    background-color:#05396b;
    font-weight: 900;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    display: flex;
    align-items: center;
  }

  .stop {
    background-color: #ff3d3d;
  }

  .stop:hover {
    background-color: #ddacac;
  }

  .copy-icon {
    font-size: 20px;
  }

  .feedback-container {
    padding: 20px;
    background-color: #0a2640;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .feedback {
    display: flex;
    justify-content: space-between;
  }

  .student-answer {
    width: 640px;
    height: 560px;
    border: solid lightgray 1px;
    background-color:rgb(21, 23, 24);
    color: white;
    text-align: left;
    padding: 0px 30px;
    border-radius: 5px;
    margin-right: 20px;
  }

  .chat-feedback {
    width: 700px;
    height: 560px;
    border: solid lightgray 1px;
    background-color: white;
    text-align: left;
    padding: 0px 30px;
    border-radius: 5px;
  }

  .student-answer-heading {
    color:rgb(235, 242, 243);
  }

  .feedback-heading {
    font-size: 25px;
  }

  .next-Question-btn {
    padding: 10px 20px;
    margin: 10px;
    margin-top: 30px;
    border-radius: 3px;
    width: 200px;
    background-color:rgb(92, 162, 219);
    color: black;
    font-weight: 600;
    border: solid black 1px;
  }

  .next-Question-btn:hover {
    background-color: white;
    color: black;
  }

  .Caution {
    font-size: 13px;
    border: solid red 1px;
    padding: 10px;
    border-radius: 5px;
    background-color: #fac8c8;
  }

  .next-prev-container {
    display: flex;
  }

  .loader {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;
