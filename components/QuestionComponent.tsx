import { useState, useEffect, useRef, MutableRefObject } from "react";
import { Question } from "@/interfaces";
import Options from "@/components/Options";
import Timer from "@/components/Timer";
import RotateLoader from "react-spinners/RotateLoader";

interface QuestionProps {
  allQuestions: Question[];
  totalQuestions: MutableRefObject<number>;
  totalScore: number;
  setTotalScore: (score: number) => void;
  quizStatus: boolean | null;
  setQuizStatus: (status: boolean) => void;
}

const QuestionComponent: React.FC<QuestionProps> = (props) => {

  const questionsQueue: Question[] = useRef([...props.allQuestions]).current;

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const {totalScore, setTotalScore} = props;
  const [timerKey, setTimerKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<number | undefined>(undefined);

  const loadNextQuestion = () => {

    setTimeout(() => {
      if (questionsQueue.length !== 0) {
          // dequeue the next question
          const nextQuestion = questionsQueue.shift() || null;
          setCurrentQuestion(nextQuestion);
          setIsLoading(true);
          setTimerKey(timerKey + 1);
          setIsLoading(false);
      }
      else {
          props.setQuizStatus(false);
        }
    }, 1000);
  }

  const handleAnswer = (selectedOption: number) => {
      if (selectedOption === currentQuestion?.data.answer) {
          setTotalScore(totalScore + 1);
      }
      loadNextQuestion();
  }
  
  const handleQuestion = (selectedOption?: number) => {
      // set time out to show the correct answer
      if (selectedOption !== undefined) {
          handleAnswer(selectedOption);
      }
  }
  // runs once, when the component is rendered
  useEffect(() => {
    loadNextQuestion();      
  }, [])
  
  // runs everytime an option is selected
  useEffect(() => {
    handleQuestion(selected)
  }, [selected])

  useEffect(() => {
    setSelected(undefined);
  }, [currentQuestion])

  return (
      <div className="flex flex-col h-screen">
        {isLoading ? (
          <div className="flex-1 bg-cover bg-center p-12 flex items-center justify-center">
            <RotateLoader color={"#DE28B7"} loading={isLoading} size={30} margin={30} />
          </div>
        ) : (
          <>
            <div
              className="flex-1 bg-cover bg-center p-2 flex items-center justify-between"
              style={{ backgroundImage: `url(${currentQuestion?.data.imageUrl})` }}
            >
              <div className="flex flex-col text-lg font-semibold text-black backdrop-blur-md bg-white bg-opacity-10 rounded-full p-4">
                  <span className="text-lg font-semibold">
                    Score: {totalScore}
                  </span>
                  <span className="text-lg font-semibold">
                    Question: {props.totalQuestions.current - questionsQueue.length} / {props.totalQuestions.current}
                  </span>
                </div>
                <div>
                  {currentQuestion && (
                    <Timer
                      resetkey={timerKey}
                      timer={currentQuestion?.data.time || 10}
                      timerCallBack={() => {
                        loadNextQuestion();
                      }}
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
                    selected={selected}
                    setSelected={setSelected}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      );
}
      
export default QuestionComponent;