import { useState, useEffect, use } from "react";
import { Question } from "@/interfaces";
import Options from "@/components/Options";
import Timer from "@/components/Timer";

interface QuestionProps {
    allQuestions: Question[];
    totalQuestions: number;
    endQuizCallback: (bool: boolean) => void;
}

const QuestionComponent: React.FC<QuestionProps> = (props) => {

    const questionsQueue: Question[] = props.allQuestions;

    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
    const [totalScore, setTotalScore] = useState<number>(0);
    const [timerKey, setTimerKey] = useState<number>(0);    

    const handleScore = (score: number) => {
        setTotalScore(totalScore + score)
    }

    const handleQuestion = () => {
        // time-out to show the correct answer
        setTimeout(() => {
        if (questionsQueue.length >= 0) {
            const question = questionsQueue.shift()
            console.log(questionsQueue.length)
            setCurrentQuestion(question || null)
            setTimerKey((key) => key + 1)
        } else {
            props.endQuizCallback(true)
        }
        }, 2000)
    }

    // runs once, when the component is rendered
    useEffect(() => {
        handleQuestion()
    }, [])        

    return (
        <div className="flex flex-col h-screen">
          <div
            className="flex-1 bg-cover bg-center p-4 flex items-center justify-between"
            style={{ backgroundImage: `url(${currentQuestion?.data.imageUrl})` }}
          >
            <div className="text-lg font-semibold text-white">
              {totalScore} / {props.totalQuestions}
            </div>
            <div className="text-white">
              {currentQuestion && (
                <Timer
                  resetkey={timerKey}
                  timer={currentQuestion?.data.time || 0}
                  timerCallBack={() => {handleQuestion()}}
                />
              )}
            </div>
          </div>
          <div className="flex-1 p-4">
            <span className="text-xl font-semibold">
              {currentQuestion?.data.question}
            </span>
            <div className="mt-4">
              <Options
                options={currentQuestion?.data.options}
                answer={currentQuestion?.data.answer}
                scoreCallback={handleScore}
                selectedCallback={() => handleQuestion()}
              />
            </div>
          </div>
        </div>
      );
    };

export default QuestionComponent;