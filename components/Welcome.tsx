interface WelcomeProps {
  setQuizStatus: (status: boolean) => void;
}


const Welcome: React.FC<WelcomeProps> = (props) => {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome to the Quiz!
      </h1>
      <button
        className="mt-8 px-4 py-2 bg-purple-500 text-white rounded-md"
        onClick={() => props.setQuizStatus(true)}
      >
        Start
      </button>
    </div>
  );
};

export default Welcome;