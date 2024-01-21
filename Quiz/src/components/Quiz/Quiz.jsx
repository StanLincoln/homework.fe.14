import { questions } from "../../utils/questions";
import { useState } from "react";
import "./quiz.css";
import { score } from "../../utils/questions";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(score);
  const [showResult, setShowResult] = useState(false);

  const { question, options, correctAnswer } = questions[currentQuestion];

  const onAnswerClick = (selectedAnswer, index) => {
    if (answerIdx === null) {
      const isCorrect = selectedAnswer === correctAnswer;
      setAnswer(isCorrect);
      setAnswerIdx(index);
    }
  };

  const onClickNext = () => {
    setAnswerIdx(null);
    setResult((prev) =>
      answer
        ? {
            ...prev,
            correctAnswer: prev.correctAnswer + 1,
          }
        : {
            ...prev,
            wrongAnswer: prev.wrongAnswer + 1,
          }
    );
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };

  const onTryAgain = () => {
    setResult(score);
    setShowResult(false);
  };

  return (
    <div className="container">
      {!showResult ? (
        <>
          <h1>Quiz</h1>
          <hr />
          <h2>
            {currentQuestion + 1}. {question}
          </h2>
          <ul>
            {options.map((answer, index) => (
              <li
                onClick={() => onAnswerClick(answer, index)}
                key={answer}
                className={
                  answerIdx !== null
                    ? answer === correctAnswer
                      ? "correct"
                      : answerIdx === index
                      ? "wrong"
                      : null
                    : null
                }
              >
                {answer}
              </li>
            ))}
          </ul>
          <button onClick={onClickNext} disabled={answerIdx === null}>
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </button>
          <div className="index">
            {currentQuestion + 1} of {questions.length} questions
          </div>
        </>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <hr />
          <p>
            Total Questions: <span>{questions.length}</span>
          </p>
          <p>
            Correct Answers: <span>{result.correctAnswer}</span>
          </p>
          <p>
            Wrong Answers: <span>{result.wrongAnswer}</span>
          </p>
          <button onClick={onTryAgain}>Try again</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
