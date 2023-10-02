interface QuizEndProps {
    totalScore: number;
    setTotalScore: (score: number) => void;
    setQuizStatus: (status: boolean) => void;
}


const QuizEnd: React.FC<QuizEndProps> = (props) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            Final Score: {props.totalScore}
            <button
                className="mt-8 px-4 py-2 bg-purple-500 text-white rounded-md"
                onClick={() => props.setQuizStatus(true)}
            >
                Restart Quiz
            </button>
        </div>

    );
}

export default QuizEnd;