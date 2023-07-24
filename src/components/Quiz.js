import React, { useState } from "react";
import quizQuestions from "../QuizQuestions";

export default function Quiz(){
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    function handleAnswerClick(isCorrect) {
        if(isCorrect){
            setScore(score + 1)
        }
        const nextQuestion = currentQuestion + 1;
        if(nextQuestion < quizQuestions.length){
            setCurrentQuestion(nextQuestion)
        } else {
            setShowScore(true)
        }
    };
    console.log(quizQuestions)

    return (
        <div className="quiz--container">
            { !showScore && (
                <>
                    <h1>Harry Potter Quiz</h1>
                    <p>Take the quiz below to test your Harry Potter knowledge.</p>
                </>
            )}
            { showScore ? (
                <div className="score">
                    <h2>Your score: { score } out of { quizQuestions.length }</h2>
                    <button onClick={ () => window.location.reload()}>Restart Quiz</button>
                </div>
            ) : (
                <div className="question--container">
                    <h2>Question { currentQuestion + 1 }</h2>
                    <h3>{ quizQuestions[currentQuestion].question }</h3>
                    <div className="question">
                        { quizQuestions[currentQuestion].choices.map((choice, index) => (
                            <button className="choices" key={ index } onClick={() => handleAnswerClick(choice.isCorrect)}>
                                { choice.text }
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

